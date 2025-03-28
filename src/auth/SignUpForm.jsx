import FormRow from "../components/ReusableFormRow";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import imageRegister from "../assets/images/register.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import supabase from "../service/supabase"; // Import Supabase client
import toast from "react-hot-toast"; // Import toast

function SignUpForm() {
  const { signup } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [passwordError, setPasswordError] = useState(""); // Store password validation error messages
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Track if password is valid
  const [isPasswordMatch, setIsPasswordMatch] = useState(true); // Track if passwords match

  const [departments, setDepartments] = useState([]); // Store departments from Supabase

  const navigate = useNavigate();

  // Fetch departments from Supabase when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("Department")
        .select("deptId, deptName")
        .neq("deptId", 1) // Exclude deptId = 1
        .neq("deptId", 2) // Exclude deptId = 2
        .neq("deptId", 3); // Exclude deptId = 3

      if (error) {
        console.error(error);
      } else {
        setDepartments(data); // Set departments in state
      }
    };

    fetchDepartments();
  }, []);

  function onSubmit(data) {
    // Add userRole with default value "requestor" before submitting
    const formData = {
      ...data,
      userRole: "unverified", // Set the default user role
    };

    signup(formData, {
      onSuccess: () => {
        toast.success(
          "Sign up successful! Please wait for the approval of your account."
        ); // Success toast
        // Navigate to login page after successful sign up
        navigate("/login");
      },
      onSettled: () => reset(),
    });
  }

  // Real-time password validation
  const validatePassword = (password) => {
    const lowercase = /[a-z]/;
    const uppercase = /[A-Z]/;
    const number = /\d/;
    const specialCharacter = /[@$!%*?&]/;
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setIsPasswordValid(false);
    } else if (!lowercase.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      setIsPasswordValid(false);
    } else if (!uppercase.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      setIsPasswordValid(false);
    } else if (!number.test(password)) {
      setPasswordError("Password must contain at least one number.");
      setIsPasswordValid(false);
    } else if (!specialCharacter.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  // Real-time confirm password validation
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== getValues("password")) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  // Real-time number validation
  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.setCustomValidity("This field should only contain numbers.");
    } else {
      e.target.setCustomValidity("");
    }
  };

  // Function to toggle password visibility and start timer
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the password visibility
    if (!showPassword) {
      // If the password is being shown, start the 3-second timer to auto-hide
      setTimeout(() => setShowPassword(false), 3000);
    }
  };

  // Function to toggle confirm password visibility and start timer
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState); // Toggle the confirm password visibility
    if (!showConfirmPassword) {
      // If the confirm password is being shown, start the 3-second timer to auto-hide
      setTimeout(() => setShowConfirmPassword(false), 3000);
    }
  };

  return (
    <section className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-lg max-w-4xl w-full h-auto p-4">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            className="rounded-l-2xl object-cover h-full"
            src={imageRegister}
            alt="Sign Up"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 flex flex-col justify-center px-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
            Create Your Account
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* First Row: First Name and Last Name */}
            <div className="flex space-x-3">
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

            {/* Second Row: Birth Date and ID Number */}
            <div className="flex space-x-3">
              <FormRow label="Birth Date" error={errors.birthDate?.message}>
                <input
                  type="date"
                  {...register("birthDate", {
                    required: "Birth Date is required",
                    validate: (value) => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      const age = today.getFullYear() - birthDate.getFullYear();
                      const monthDifference =
                        today.getMonth() - birthDate.getMonth();
                      if (
                        monthDifference < 0 ||
                        (monthDifference === 0 &&
                          today.getDate() < birthDate.getDate())
                      ) {
                        return (
                          age - 1 >= 18 || "User must be at least 18 years old."
                        );
                      }
                      return age >= 18 || "User must be at least 18 years old.";
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
              <FormRow label="ID Number" error={errors.idNumber?.message}>
                <input
                  type="text"
                  {...register("idNumber", {
                    required: "ID Number is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "ID Number must contain only numbers",
                    },
                    onChange: handleNumberInput,
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
            </div>

            {/* Third Row: Email and Contact Number */}
            <div className="flex space-x-3">
              <FormRow label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address",
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
                    pattern: {
                      value: /^\d+$/,
                      message: "Contact Number must contain only numbers",
                    },
                    onChange: handleNumberInput,
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
            </div>

            {/* Department Dropdown */}
            <FormRow label="Department" error={errors.deptId?.message}>
              <select
                {...register("deptId", { required: "Department is required" })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" className="hidden">
                  Select Department
                </option>
                {departments.map((dept) => (
                  <option key={dept.deptId} value={dept.deptId}>
                    {dept.deptName}
                  </option>
                ))}
              </select>
            </FormRow>

            {/* Password and Confirm Password */}
            <div className="flex space-x-3">
              <FormRow label="Password" error={errors.password?.message}>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      onChange: (e) => validatePassword(e.target.value),
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </FormRow>

              <FormRow
                label="Confirm Password"
                error={errors.confirmPassword?.message}
              >
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: validateConfirmPassword,
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {!isPasswordMatch && (
                  <p className="text-red-500 text-sm">Passwords do not match</p>
                )}
              </FormRow>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
              disabled={!isPasswordValid || !isPasswordMatch}
            >
              Sign Up
            </button>
            {/* Already have an account */}
            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
