import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSignUp } from "../../../auth/useSignUp"; // Import useSignUp hook
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Import your Supabase client

// SysAdminAddNewAdmin Component
export default function SysAdminAddNewAdmin({ closeModal }) {
  const { handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { signup } = useSignUp(); // Use the signup hook
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      idNumber: "",
      fName: "",
      lName: "",
      birthDate: "",
      email: "1@gmail.com",
      password: "12345678",
      contactNumber: "1", // Add contactNumber to account state
      deptId: "", // Renamed to deptId
    },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]); // Store departments from Supabase

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
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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

    toast.success("Successfully Submitted.");
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      {/* Close Modal Button */}
      <button
        className="absolute top-1 right-2 font-bold text-lg text-gray-400 hover:text-red-600"
        onClick={closeModal}
        aria-label="Close Modal"
      >
        &times;
      </button>

      {/* Modal Header */}
      <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4 mt-0">
        Department Head Registration Form
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {accounts.map((account) => (
          <div key={account.id} className="space-y-4">
            <input
              type="text"
              placeholder="Employee ID"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.idNumber}
              onChange={(e) =>
                handleInputChange(account.id, "idNumber", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.fName}
              onChange={(e) =>
                handleInputChange(account.id, "fName", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.lName}
              onChange={(e) =>
                handleInputChange(account.id, "lName", e.target.value)
              }
              required
            />
            <input
              type="date"
              placeholder="birthDate"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.birthDate}
              onChange={(e) =>
                handleInputChange(account.id, "birthDate", e.target.value)
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.email}
              onChange={(e) =>
                handleInputChange(account.id, "email", e.target.value)
              }
              required
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.contactNumber}
              onChange={(e) =>
                handleInputChange(account.id, "contactNumber", e.target.value)
              }
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={account.password}
                onChange={(e) =>
                  handleInputChange(account.id, "password", e.target.value)
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

            {/* Department Dropdown */}
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={account.deptId} // Now uses deptId
              onChange={(e) => {
                handleInputChange(account.id, "deptId", e.target.value); // Update deptId
              }}
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
        ))}

        {/* Submit Button Inside Form */}
        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

SysAdminAddNewAdmin.propTypes = {
  closeModal: PropTypes.func,
};
