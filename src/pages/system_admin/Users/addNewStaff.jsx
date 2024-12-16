import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../../auth/useSignUp";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase";

export default function SysAdminAddNewStaff({ closeModal }) {
  const { handleSubmit } = useForm();
  const { signup } = useSignUp();
  const [jobAccounts, setJobAccounts] = useState([
    {
      id: 1,
      idNumber: "",
      fName: "",
      lName: "",
      birthDate: "",
      sex: "",
      email: "",
      contactNumber: "",
      password: "User1234_",
      deptId: "",
      jobCategory: "",
      jobCategories: [],
      userRole: "staff",
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define job categories for each deptId
  const jobCategoryMap = {
    1: [
      "Cluster Leader",
      "Street Sweeper & Ground Sweeper",
      "Busser",
      "Gardener/Landscaper",
      "Housekeeper",
      "Campus Grass & Bushes Maintainer",
    ],
    2: [
      "Foreman",
      "Architect",
      "Welder",
      "Painter",
      "Draftsman",
      "Tile Setter",
      "Plumber",
      "Carpenter",
      "Engineer",
      "Laborer",
    ],
    3: [
      "Electrician",
      "Aircon Technicians",
      "Elevator Attendants",
      "Gymnasium Staff",
    ],
  };


  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Department")
        .select("deptId, deptName")
        .in("deptId", [1, 2, 3]);

      if (error) {
        toast.error("Failed to load departments.");
      } else {
        setDepartments(data);
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = (id, deptId) => {
    const jobCategoriesForDept = jobCategoryMap[deptId] || [];
    setJobAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? {
              ...account,
              deptId,
              jobCategory: "",
              jobCategories: jobCategoriesForDept,
            }
          : account
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    if (field === "idNumber" || field === "contactNumber") {
      // Ensure idNumber and contactNumber contain only numbers
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setJobAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === id ? { ...account, [field]: numericValue } : account
        )
      );
    } else {
      setJobAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === id ? { ...account, [field]: value } : account
        )
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&_*])[A-Za-z\d!@#$%^&_*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateBirthDate = (birthDate) => {
    const year = parseInt(birthDate.split("-")[0], 10); // Extract the year part
    return year <= 9999; // Ensure the year does not exceed 4 digits
  };

  const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^[0-9]{11}$/; // Allows only numeric characters
    return contactNumberRegex.test(contactNumber);
  };

  
  const onSubmit = () => {
    const hasEmptyFields = jobAccounts.some(
      (account) =>
        !account.idNumber ||
        !account.fName ||
        !account.lName ||
        !account.birthDate ||
        !account.sex ||
        !account.email ||
        !account.contactNumber ||
        !account.password ||
        !account.deptId ||
        !account.jobCategory
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    const invalidBirthDates = jobAccounts.some(
      (account) => !validateBirthDate(account.birthDate)
    );

    if (invalidBirthDates) {
      toast.error("Birthdate year must not exceed 4 digits.");
      return;
    }

    const invalidContactNumbers = jobAccounts.some(
      (account) => !validateContactNumber(account.contactNumber)
    );

    if (invalidContactNumbers) {
      toast.error("Contact number must have at least 11 digits.");
      return;
    }

    const invalidPasswords = jobAccounts.some(
      (account) => !validatePassword(account.password)
    );

    if (invalidPasswords) {
      toast.error(
        "Password must be at least 8 characters long and include at least one special character."
      );
      return;
    }

    jobAccounts.forEach((account) => {
      const newAccount = {
        idNumber: account.idNumber,
        fName: account.fName,
        lName: account.lName,
        birthDate: account.birthDate,
        sex: account.sex, // Ensure this field is passed
        email: account.email,
        contactNumber: account.contactNumber,
        password: account.password,
        deptId: account.deptId,
        jobCategory: account.jobCategory,
        userRole: account.userRole,
      };
  
      signup(newAccount);
    });
  
    toast.success("Staff Account Successfully Created");
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <header className="text-lg font-semibold text-white bg-custom-blue rounded-t p-4 text-center">
          Staff Registration Form
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          {jobAccounts.map((account) => (
            <div key={account.id}>
              <h2 className="font-semibold text-md mt-4 mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Staff ID Number */}
                <div>
                  <label className="block text-sm font-medium">
                    Staff ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Staff ID"
                    className="w-full border rounded p-2"
                    value={account.idNumber}
                    onChange={(e) =>
                      handleInputChange(account.id, "idNumber", e.target.value)
                    }
                    required
                  />
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full border rounded p-2"
                    value={account.fName}
                    onChange={(e) =>
                      handleInputChange(account.id, "fName", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full border rounded p-2"
                    value={account.lName}
                    onChange={(e) =>
                      handleInputChange(account.id, "lName", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border rounded p-2"
                    value={account.email}
                    onChange={(e) =>
                      handleInputChange(account.id, "email", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-medium">
                    Birth Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={account.birthDate}
                    onChange={(e) =>
                      handleInputChange(account.id, "birthDate", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Sex */}
                <div>
                  <label className="block text-sm font-medium">
                    Sex <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    value={account.sex}
                    onChange={(e) =>
                      handleInputChange(account.id, "sex", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Contact Number"
                    className="w-full border rounded p-2"
                    value={account.contactNumber}
                    onChange={(e) =>
                      handleInputChange(
                        account.id,
                        "contactNumber",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm  font-medium">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="w-full border rounded p-2"
                      value={account.password}
                      onChange={(e) =>
                        handleInputChange(
                          account.id,
                          "password",
                          e.target.value
                        )
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <hr className="mt-8"></hr>
              <h2 className="font-semibold text-md mt-6 mb-2">
                Department Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2"></div>
                <div>
                  <label className="block text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    value={account.deptId}
                    onChange={(e) =>
                      handleDepartmentChange(account.id, Number(e.target.value))
                    }
                    required
                  >
                    <option value="" disabled>
                      {loading ? "Loading Departments..." : "Select Department"}
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.deptId} value={dept.deptId}>
                        {dept.deptName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Job Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    value={account.jobCategory}
                    onChange={(e) =>
                      handleInputChange(
                        account.id,
                        "jobCategory",
                        e.target.value
                      )
                    }
                    disabled={!account.deptId}
                    required
                  >
                    <option value="" disabled>
                      {account.deptId
                        ? "Select Job Category"
                        : "Select a department first"}
                    </option>
                    {account.jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Staff
          </button>
        </form>
      </div>
    </div>
  );
}

SysAdminAddNewStaff.propTypes = {
  closeModal: PropTypes.func,
};
