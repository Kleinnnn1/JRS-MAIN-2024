import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertRequest } from "../../../service/apiRequestorRequestTable";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// SysAdminAddNewStaff Component
export default function SysAdminAddNewStaff({ closeModal }) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation({
    mutationFn: insertRequest,
    onSuccess: () => {
      toast.success("Successfully Registered New User");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit = (data) => {
    mutate(data);
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
        Staff Registration Form
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Employee ID */}
          <input
            type="text"
            placeholder="Employee ID"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            {...register("employeeId", { required: "Employee ID is required" })}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
          )}

          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}

          {/* Birthday */}
          <input
            type="date"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            {...register("birthday", { required: "Birthday is required" })}
          />
          {errors.birthday && (
            <p className="text-red-500 text-sm">{errors.birthday.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Department */}
          <input
            type="text"
            placeholder="Department"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            {...register("department", { required: "Department is required" })}
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}
        </div>

        {/* Submit Button */}
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

SysAdminAddNewStaff.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
