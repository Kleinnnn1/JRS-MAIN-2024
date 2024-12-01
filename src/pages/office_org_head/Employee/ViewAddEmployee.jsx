import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getCurrentUser } from "../../../service/apiAuth"; // Import the getCurrentUser function

export default function OfficeHeadViewAddStaff({ closeModal }) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [staffAccount, setStaffAccount] = useState({
    idNumber: "",
    fName: "",
    lName: "",
    birthDate: "",
    email: "@gmail.com",
    contactNumber: "",
    password: "12345678",
    deptId: "", // deptId will be set from currentUser
    jobCategory: "office staff",
    userRole: "requestor", // Default userRole set to "staff"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { signup } = useSignUp();

  useEffect(() => {
    const fetchUserAndDepartments = async () => {
      setLoading(true);

      try {
        const user = await getCurrentUser();
        if (user && user.deptId) {
          setStaffAccount((prevAccount) => ({
            ...prevAccount,
            deptId: user.deptId, // Set deptId from currentUser
          }));
        }
      } catch (error) {
        toast.error("Failed to fetch user data.");
        console.error(error);
      }

      setLoading(false);
    };

    fetchUserAndDepartments();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    const { idNumber, fName, lName, birthDate, email, contactNumber, password, deptId, jobCategory, userRole } = data;

    const newAccount = {
      idNumber,
      fName,
      lName,
      birthDate,
      email,
      contactNumber,
      password,
      deptId,
      jobCategory,
      userRole,
    };

    try {
      await signup(newAccount); // Call the signup API
      toast.success("Staff added successfully.");
      closeModal(); // Close the modal
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
        onClick={closeModal} // Close the modal
        aria-label="Close Modal"
      >
        &times;
      </button>
      <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
        Staff Registration Form
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Id Number */}
        <div className="space-y-4">
          <input
            {...register("idNumber", { required: "Id number is required" })}
            type="text"
            placeholder="Id number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber.message}</p>}

          {/* First Name */}
          <input
            {...register("fName", { required: "First name is required" })}
            type="text"
            placeholder="First Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.fName && <p className="text-red-500 text-sm">{errors.fName.message}</p>}

          {/* Last Name */}
          <input
            {...register("lName", { required: "Last name is required" })}
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.lName && <p className="text-red-500 text-sm">{errors.lName.message}</p>}

          {/* Birth Date */}
          <input
            {...register("birthDate", { required: "Birth date is required" })}
            type="date"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}

          {/* Email */}
          <input
            {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" } })}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Contact Number */}
          <input
            {...register("contactNumber", { required: "Contact number is required" })}
            type="text"
            placeholder="Contact Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}

          {/* Password */}
          <div className="relative">
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* DeptId (readonly) */}
          <input
            {...register("deptId")}
            type="text"
            value={staffAccount.deptId}
            readOnly
            className="hidden w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Job Category (hidden, set by default) */}
          <input
            {...register("jobCategory")}
            type="text"
            value={staffAccount.jobCategory}
            readOnly
            className="hidden w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
}
