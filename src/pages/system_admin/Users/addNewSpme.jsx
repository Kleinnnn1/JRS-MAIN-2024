import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignUp } from "../../../auth/useSignUp";
import FormRow from "../../../components/ReusableFormRow";
import toast from "react-hot-toast";

// SysAdminAddNewSpme Component
function SysAdminAddNewSpme() {
  const { signup } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();
  let passwordToggleTimeout;

  // Submit Handler
  const onSubmit = (data) => {
    const formData = { ...data, userRole: "requestor" };
    signup(formData, {
      onSettled: () => reset(),
    });
    toast.success("Account created successfully!");
    navigate("/some-page"); // Adjust the route as needed.
  };

  // Password Validation
  const validatePassword = (password) => {
    const rules = [
      { regex: /.{8,}/, error: "Password must be at least 8 characters." },
      {
        regex: /[a-z]/,
        error: "Password must contain at least one lowercase letter.",
      },
      {
        regex: /[A-Z]/,
        error: "Password must contain at least one uppercase letter.",
      },
      { regex: /\d/, error: "Password must contain at least one number." },
      {
        regex: /[@$!%*?&]/,
        error: "Password must contain at least one special character.",
      },
    ];

    for (const rule of rules) {
      if (!rule.regex.test(password)) {
        setPasswordError(rule.error);
        setIsPasswordValid(false);
        return;
      }
    }

    setPasswordError("");
    setIsPasswordValid(true);
  };

  // Handle Numeric Input
  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value; // Automatically filter out non-numeric characters.
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    if (!showPassword) {
      passwordToggleTimeout = setTimeout(() => setShowPassword(false), 3000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(passwordToggleTimeout); // Cleanup timeout on unmount.
  }, []);

  return (
    <section className="bg-white rounded-lg flex items-center justify-center">
      <div className="flex flex-col justify-center rounded-full p-6 ">
        {/* Modal Header */}
        <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
          SPME Account Form
        </header>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRow label="First Name" error={errors.fName?.message}>
              <input
                type="text"
                {...register("fName", { required: "First Name is required" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </FormRow>
            <FormRow label="Last Name" error={errors.lName?.message}>
              <input
                type="text"
                {...register("lName", { required: "Last Name is required" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </FormRow>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRow label="Birth Date" error={errors.birthDate?.message}>
              <input
                type="date"
                {...register("birthDate", {
                  required: "Birth Date is required",
                })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </FormRow>
            <FormRow label="Employee Id" error={errors.idNumber?.message}>
              <input
                type="text"
                {...register("idNumber", { required: "ID Number is required" })}
                onInput={handleNumberInput}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </FormRow>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRow label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address.",
                  },
                })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </FormRow>
            <FormRow
              label="Contact Number"
              error={errors.contactNumber?.message}
            >
              <input
                type="text"
                {...register("contactNumber", {
                  required: "Contact Number is required",
                })}
                onInput={handleNumberInput}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </FormRow>
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1">
            <FormRow label="Password" error={errors.password?.message}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  onChange={(e) => validatePassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </FormRow>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={!isPasswordValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SysAdminAddNewSpme;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { insertRequest } from "../../../service/apiRequestorRequestTable";
// import toast from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// // SysAdminAddNewAdmin Component
// export default function SysAdminAddNewSpme({ closeModal }) {
//   const { handleSubmit } = useForm();
//   const queryClient = useQueryClient();
//   const [jobRequests, setJobRequests] = useState([
//     {
//       id: 1,
//       idNumber: "",
//       firstName: "",
//       lastName: "",
//       birthday: "",
//       email: "",
//       password: "",
//     },
//   ]);
//   const [showPassword, setShowPassword] = useState(false);

//   const { mutate } = useMutation({
//     mutationFn: insertRequest,
//     onSuccess: () => {
//       toast.success("Successfully Registered New User");
//       queryClient.invalidateQueries({ queryKey: ["requests"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   // Update specific input fields based on their id and field name
//   const handleInputChange = (id, field, value) => {
//     setJobRequests((prevRequests) =>
//       prevRequests.map((request) =>
//         request.id === id ? { ...request, [field]: value } : request
//       )
//     );
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const onSubmit = () => {
//     const hasEmptyFields = jobRequests.some(
//       (request) =>
//         !request.idNumber ||
//         !request.firstName ||
//         !request.lastName ||
//         !request.birthday ||
//         !request.email ||
//         !request.password
//     );

//     if (hasEmptyFields) {
//       toast.error("Please fill out all required fields before submitting.");
//       return;
//     }

//     jobRequests.forEach((request) => mutate(request));
//     toast.success("Successfully Submitted.");
//     closeModal();
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//       {/* Close Modal Button */}
//       <button
//         className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
//         onClick={closeModal}
//         aria-label="Close Modal"
//       >
//         &times;
//       </button>

//       {/* Modal Header */}
//       <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
//         SPME Registration Form
//       </header>

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {jobRequests.map((request) => (
//           <div key={request.id} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Employee ID"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.idNumber}
//               onChange={(e) =>
//                 handleInputChange(request.id, "idNumber", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.firstName}
//               onChange={(e) =>
//                 handleInputChange(request.id, "firstName", e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.lastName}
//               onChange={(e) =>
//                 handleInputChange(request.id, "lastName", e.target.value)
//               }
//               required
//             />
//             <input
//               type="date"
//               placeholder="Birthday"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.birthday}
//               onChange={(e) =>
//                 handleInputChange(request.id, "birthday", e.target.value)
//               }
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={request.email}
//               onChange={(e) =>
//                 handleInputChange(request.id, "email", e.target.value)
//               }
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 value={request.password}
//                 onChange={(e) =>
//                   handleInputChange(request.id, "password", e.target.value)
//                 }
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-2 text-gray-500"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Submit Button Inside Form */}
//         <div className="text-right mt-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// SysAdminAddNewSpme.propTypes = {
//   closeModal: PropTypes.func.isRequired,
// };
