import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Import your Supabase client

// SysAdminAddNewAdmin Component
export default function SysAdminAddNewAdmin({ closeModal }) {
  const { handleSubmit } = useForm();
  const { signup } = useSignUp(); // Use the signup hook
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      idNumber: "",
      fName: "",
      lName: "",
      birthDate: "",
      email: "",
      password: "12345678",
      contactNumber: "", // Add contactNumber to account state
      deptId: "", // Renamed to deptId
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]); // Store departments from Supabase
  const [loading, setLoading] = useState(true);

  // Fetch departments from Supabase when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("Department")
        .select("deptId, deptName");

      if (error) {
        toast.error("Failed to load departments.");
        console.error(error);
      } else {
        setDepartments(data); // Set departments in state
      }
    };

    fetchDepartments();
  }, []); // Run once when the component mounts

  // Update specific input fields based on their id and field name
  const handleInputChange = (id, field, value) => {
    if (field === "idNumber" || field === "contactNumber") {
      // Ensure idNumber and contactNumber contain only numbers
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === id ? { ...account, [field]: numericValue } : account
        )
      );
    } else {
      setAccounts((prevAccounts) =>
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
    const hasEmptyFields = accounts.some(
      (account) =>
        !account.idNumber ||
        !account.fName ||
        !account.lName ||
        !account.birthDate ||
        !account.email ||
        !account.contactNumber || // Check for contactNumber
        !account.deptId // Check for deptId
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields before submitting.");
      return;
    }

    const invalidBirthDates = accounts.some(
      (account) => !validateBirthDate(account.birthDate)
    );

    if (invalidBirthDates) {
      toast.error("Birthdate year must not exceed 4 digits.");
      return;
    }

    const invalidContactNumbers = accounts.some(
      (account) => !validateContactNumber(account.contactNumber)
    );

    if (invalidContactNumbers) {
      toast.error("Contact number must have at least 11 digits.");
      return;
    }

    const invalidPasswords = accounts.some(
      (account) => !validatePassword(account.password)
    );

    if (invalidPasswords) {
      toast.error(
        "Password must be at least 8 characters long and include at least one special character."
      );
      return;
    }

    // Map accounts to signup payload and assign userRole based on deptId
    accounts.forEach((account) => {
      // Ensure deptId is treated as a number for comparison
      const deptId = Number(account.deptId);
      let userRole = "office head"; // Default role

      // Assign roles based on deptId
      if ([1, 2, 3].includes(deptId)) {
        userRole = "department head";
      } else if (deptId === 122) {
        userRole = "spme"; // Assign 'spme' role for deptId 122
      }

      const newUser = {
        idNumber: account.idNumber,
        fName: account.fName,
        lName: account.lName,
        birthDate: account.birthDate,
        email: account.email,
        contactNumber: account.contactNumber, // Add contactNumber to the payload
        password: "12345678", // Default password
        deptId: deptId, // Ensure deptId is stored as a number
        userRole: userRole, // Set the userRole based on deptId
      };

      signup(newUser); // Call the signup API
    });

    toast.success("Department/Office Head Account Successfully Created");
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

        {/* Modal Header */}
        <header className="text-lg font-semibold text-white bg-custom-blue rounded-t p-4 text-center">
          Department Head Registration Form
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {accounts.map((account) => (
            <div key={account.id} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium">
                    Employee ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Employee ID"
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

                {/* Department Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full-width element */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border rounded p-2"
                      value={account.deptId} // Now uses deptId
                      onChange={(e) =>
                        handleInputChange(account.id, "deptId", e.target.value)
                      } // Update deptId
                      required
                    >
                      <option value="" className="hidden">
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.deptId} value={dept.deptId}>
                          {dept.deptName} {/* Displays department name */}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full p-2 mt-6 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

SysAdminAddNewAdmin.propTypes = {
  closeModal: PropTypes.func,
};
