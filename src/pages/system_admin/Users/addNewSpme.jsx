import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignUp } from "../../../auth/useSignUp";
import FormRow from "../../../components/ReusableFormRow";
import toast from "react-hot-toast";

// SysAdminAddNewSpme Component
function SysAdminAddNewSpme({ closeModal }) {
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
      <div className="flex flex-col justify-center rounded-full p-6 relative">
        <button
          onClick={closeModal}
          className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
          aria-label="Close Modal"
        >
          &times;
        </button>
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
