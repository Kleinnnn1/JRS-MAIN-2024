import FormRow from "../components/ReusableFormRow";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import imageRegister from "../assets/images/register.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

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

  const navigate = useNavigate();

  function onSubmit(data) {
    // Add userRole with default value "requestor" before submitting
    const formData = {
      ...data,
      userRole: "requestor", // Set the default user role
    };

    signup(formData, {
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

            {/* Fourth Row: Department */}
            <FormRow label="Department" error={errors.deptId?.message}>
              <select
                {...register("deptId", { required: "Department is required" })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled className="hidden">
                  Select Department
                </option>
                <option value="CDO Bites">CDO Bites</option>
                <option value="CEA Department">CEA Department</option>
                <option value="CITC Department">CITC Department</option>
                <option value="CSTE Department">CSTE Department</option>
                <option value="LRC">LRC</option>
                <option value="Others">Others</option>
              </select>
            </FormRow>

            {/* Fifth Row: Password and Confirm Password */}
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
                      onChange: (e) => {
                        validatePassword(e.target.value);
                      },
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                      showPassword ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={togglePasswordVisibility}
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
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                      onChange: (e) => {
                        validateConfirmPassword(e.target.value);
                      },
                    })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                      showConfirmPassword ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={toggleConfirmPasswordVisibility}
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
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
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

// import FormRow from "../components/ReusableFormRow";
// import { useForm } from "react-hook-form";
// import { useSignUp } from "./useSignUp";
// import imageRegister from "../assets/images/register.png";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

// function SignUpForm() {
//   const { signup } = useSignUp();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//     getValues,
//     setValue,
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
//   const [passwordError, setPasswordError] = useState(""); // Store password validation error messages
//   const [isPasswordValid, setIsPasswordValid] = useState(false); // Track if password is valid
//   const [isPasswordMatch, setIsPasswordMatch] = useState(true); // Track if passwords match

//   const navigate = useNavigate();

//   function onSubmit(data) {
//     signup(data, {
//       onSettled: () => reset(),
//     });
//   }

//   // Real-time password validation
//   const validatePassword = (password) => {
//     const lowercase = /[a-z]/;
//     const uppercase = /[A-Z]/;
//     const number = /\d/;
//     const specialCharacter = /[@$!%*?&]/;
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters.");
//       setIsPasswordValid(false);
//     } else if (!lowercase.test(password)) {
//       setPasswordError("Password must contain at least one lowercase letter.");
//       setIsPasswordValid(false);
//     } else if (!uppercase.test(password)) {
//       setPasswordError("Password must contain at least one uppercase letter.");
//       setIsPasswordValid(false);
//     } else if (!number.test(password)) {
//       setPasswordError("Password must contain at least one number.");
//       setIsPasswordValid(false);
//     } else if (!specialCharacter.test(password)) {
//       setPasswordError("Password must contain at least one special character.");
//       setIsPasswordValid(false);
//     } else {
//       setPasswordError("");
//       setIsPasswordValid(true);
//     }
//   };

//   // Real-time confirm password validation
//   const validateConfirmPassword = (confirmPassword) => {
//     if (confirmPassword !== getValues("password")) {
//       setIsPasswordMatch(false);
//     } else {
//       setIsPasswordMatch(true);
//     }
//   };

//   // Real-time number validation
//   const handleNumberInput = (e) => {
//     const value = e.target.value;
//     if (!/^\d*$/.test(value)) {
//       e.target.setCustomValidity("This field should only contain numbers.");
//     } else {
//       e.target.setCustomValidity("");
//     }
//   };

//   // Function to toggle password visibility and start timer
//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState); // Toggle the password visibility
//     if (!showPassword) {
//       // If the password is being shown, start the 3-second timer to auto-hide
//       setTimeout(() => setShowPassword(false), 3000);
//     }
//   };

//   // Function to toggle confirm password visibility and start timer
//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword((prevState) => !prevState); // Toggle the confirm password visibility
//     if (!showConfirmPassword) {
//       // If the confirm password is being shown, start the 3-second timer to auto-hide
//       setTimeout(() => setShowConfirmPassword(false), 3000);
//     }
//   };

//   return (
//     <section className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-lg max-w-4xl w-full h-auto p-4">
//         {/* Image Section */}
//         <div className="md:w-1/2 hidden md:block">
//           <img
//             className="rounded-l-2xl object-cover h-full"
//             src={imageRegister}
//             alt="Sign Up"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="md:w-1/2 flex flex-col justify-center px-4">
//           <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
//             Create Your Account
//           </h2>
//           <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
//             {/* First Row: First Name and Last Name */}
//             <div className="flex space-x-3">
//               <FormRow label="First Name" error={errors.fName?.message}>
//                 <input
//                   type="text"
//                   {...register("fName", { required: "First Name is required" })}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </FormRow>
//               <FormRow label="Last Name" error={errors.lName?.message}>
//                 <input
//                   type="text"
//                   {...register("lName", { required: "Last Name is required" })}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </FormRow>
//             </div>

//             {/* Second Row: Birth Date and ID Number */}
//             <div className="flex space-x-3">
//               <FormRow label="Birth Date" error={errors.birthDate?.message}>
//                 <input
//                   type="date"
//                   {...register("birthDate", {
//                     required: "Birth Date is required",
//                   })}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </FormRow>
//               <FormRow label="ID Number" error={errors.idNumber?.message}>
//                 <input
//                   type="text"
//                   {...register("idNumber", {
//                     required: "ID Number is required",
//                     pattern: {
//                       value: /^\d+$/,
//                       message: "ID Number must contain only numbers",
//                     },
//                     onChange: handleNumberInput,
//                   })}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </FormRow>
//             </div>

//             {/* Third Row: Email and Contact Number */}
//             <div className="flex space-x-3">
//               <FormRow label="Email" error={errors.email?.message}>
//                 <input
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /\S+@\S+\.\S+/,
//                       message: "Please provide a valid email address",
//                     },
//                   })}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </FormRow>
//               <FormRow
//                 label="Contact Number"
//                 error={errors.contactNumber?.message}
//               >
//                 <input
//                   type="text"
//                   {...register("contactNumber", {
//                     required: "Contact Number is required",
//                     pattern: {
//                       value: /^\d+$/,
//                       message: "Contact Number must contain only numbers",
//                     },
//                     onChange: handleNumberInput,
//                   })}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </FormRow>
//             </div>

//             {/* Fourth Row: Department */}
//             <FormRow label="Department" error={errors.deptId?.message}>
//               <select
//                 {...register("deptId", { required: "Department is required" })}
//                 className="w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="" disabled className="hidden">
//                   Select Department
//                 </option>

//                 <option value="1">BMGS</option>
//                 <option value="2">CSWS</option>
//                 <option value="3">MEWS</option>
//                 <option value="4">Library</option>
//                 <option value="CDO Bites">CDO Bites</option>
//                 <option value="CEA Department">CEA Department</option>
//                 <option value="CITC Department">CITC Department</option>
//                 <option value="CSTE Department">CSTE Department</option>
//                 <option value="LRC">LRC</option>
//                 <option value="Others">Others</option>
//               </select>
//             </FormRow>

//             {/* Fifth Row: Password and Confirm Password */}
//             <div className="flex space-x-3">
//               <FormRow label="Password" error={errors.password?.message}>
//                 <div className="relative w-full">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     {...register("password", {
//                       required: "Password is required",
//                       minLength: {
//                         value: 8,
//                         message: "Password must be at least 8 characters",
//                       },
//                       onChange: (e) => {
//                         validatePassword(e.target.value);
//                       },
//                     })}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                   <span
//                     className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
//                       showPassword ? "opacity-100" : "opacity-50"
//                     }`}
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//                 {passwordError && (
//                   <p className="text-red-500 text-sm">{passwordError}</p>
//                 )}
//               </FormRow>

//               <FormRow
//                 label="Confirm Password"
//                 error={errors.confirmPassword?.message}
//               >
//                 <div className="relative w-full">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     {...register("confirmPassword", {
//                       required: "Confirm Password is required",
//                       validate: (value) =>
//                         value === getValues("password") ||
//                         "Passwords do not match",
//                       onChange: (e) => {
//                         validateConfirmPassword(e.target.value);
//                       },
//                     })}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                   <span
//                     className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
//                       showConfirmPassword ? "opacity-100" : "opacity-50"
//                     }`}
//                     onClick={toggleConfirmPasswordVisibility}
//                   >
//                     {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//                 {!isPasswordMatch && (
//                   <p className="text-red-500 text-sm">Passwords do not match</p>
//                 )}
//               </FormRow>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
//               disabled={!isPasswordValid || !isPasswordMatch}
//             >
//               Sign Up
//             </button>

//             {/* Already have an account */}
//             <div className="text-center mt-4">
//               <p>
//                 Already have an account?{" "}
//                 <span
//                   className="text-blue-500 cursor-pointer"
//                   onClick={() => navigate("/login")}
//                 >
//                   Log In
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SignUpForm;
