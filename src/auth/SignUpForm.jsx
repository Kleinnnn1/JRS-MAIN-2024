import imageRegister from "/src/assets/images/register.png";
import FormRow from "../components/ReusableFormRow";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpForm() {
  const navigate = useNavigate();
  const { signup } = useSignUp();
  const [userRole, setUserRole] = useState(""); // Track selected user role
  const [step, setStep] = useState(1); // Step tracker (1 = basic info, 2 = role-specific info)
  const {
    register,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    trigger,
  } = useForm({ mode: "onChange" }); // Use "onChange" to validate in real-time

  function onSubmit({
    fName,
    lName,
    idNumber,
    email,
    password,
    userRole,
    contactNumber,
    deptId,
    jobId,
    dateOfBirth, // Include dateOfBirth in the onSubmit function
  }) {
    signup(
      {
        fName,
        lName,
        idNumber,
        email,
        password,
        userRole,
        contactNumber,
        deptId,
        jobId,
        dateOfBirth, // Pass dateOfBirth along with the other data
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value); // Update userRole based on selection
  };

  const handleNextStep = async () => {
    // Trigger validation for the current step before proceeding to the next
    const isValidStep = await trigger();
    if (isValidStep) {
      if (step === 1) {
        setStep(2); // Move to next step (user role info)
      }
    }
  };

  const handleBackStep = () => {
    setStep(1); // Move back to step 1 (basic info)
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    // You can call onSubmit or perform additional actions
    handleSubmit(onSubmit)();
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl h-full w-full object-cover"
            src={imageRegister}
            alt="USTP Logo"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 px-8 md:px-20">
          <h2 className="font-bold text-2xl text-[#002D74]">Sign Up</h2>
          <p className="text-xs mt-4 text-[#002D74]">Create a new account</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-5"
          >
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <>
                {/* First Name Input */}
                <FormRow label="First Name" error={errors.fName?.message}>
                  <input
                    id="fName"
                    type="text"
                    {...register("fName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "First name can't exceed 50 characters",
                      },
                    })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>

                {/* Last Name Input */}
                <FormRow label="Last Name" error={errors.lName?.message}>
                  <input
                    id="lName"
                    type="text"
                    {...register("lName", { required: "Last name is required" })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>

                {/* ID Number Input */}
                <FormRow label="ID Number" error={errors.idNumber?.message}>
                  <input
                    id="idNumber"
                    type="text"
                    {...register("idNumber", {
                      required: { value: true, message: "ID is required" },
                      minLength: {
                        value: 5,
                        message: "ID Number must be at least 5 characters long",
                      },
                      maxLength: {
                        value: 50,
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "ID Number must only contain numbers",
                      },
                    })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>

                {/* Email Input */}
                <FormRow label="Email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email address",
                      },
                    })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>

                {/* Password Input */}
                <FormRow label="Password" error={errors.password?.message}>
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>

                {/* Confirm Password Input */}
                <FormRow label="Confirm Password" error={errors.passwordConfirm?.message}>
                  <input
                    id="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm", {
                      required: "Confirm Password is required",
                      validate: {
                        matchesPreviousPassword: (value) =>
                          value === getValues("password") || "Passwords must match",
                      },
                    })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>

                {/* Date of Birth Input */}
                <FormRow label="Date of Birth" error={errors.dateOfBirth?.message}>
                  <input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth", {
                      required: "Date of Birth is required",
                      validate: {
                        isAdult: (value) => {
                          // Ensure user is at least 18 years old
                          const age = new Date().getFullYear() - new Date(value).getFullYear();
                          return age >= 18 || "You must be at least 18 years old";
                        },
                      },
                    })}
                    className="p-2 mt-1 rounded-xl border w-full"
                  />
                </FormRow>
              </>
            )}

            {/* Step 2: User Role & Additional Fields */}
            {step === 2 && (
              <>
                {/* User Role Select */}
                <FormRow label="User Role" error={errors.userRole?.message}>
                  <select
                    id="userRole"
                    {...register("userRole", { required: "This field is required" })}
                    className="p-2 mt-1 rounded-xl border w-full"
                    onChange={handleUserRoleChange}
                  >
                    <option value="">Select a role</option>
                    <option value="requestor">Requestor</option>
                    <option value="system admin">System Admin</option>
                    <option value="staff">Staff (CSWS, MEWS, and BGMS)</option>
                    <option value="department head">Department Head</option>
                  </select>
                </FormRow>

                {/* Conditionally Rendered Fields */}
                {userRole && (
                  <>
                    {/* Contact Number Input */}
                    <FormRow label="Contact Number" error={errors.contactNumber?.message}>
                      <input
                        id="contactNumber"
                        type="text"
                        {...register("contactNumber", { required: "This field is required" })}
                        className="p-2 mt-1 rounded-xl border w-full"
                      />
                    </FormRow>

                    {/* Department ID Input */}
                    <FormRow label="Department ID" error={errors.deptId?.message}>
                      <input
                        id="deptId"
                        type="text"
                        {...register("deptId", { required: "This field is required" })}
                        className="p-2 mt-1 rounded-xl border w-full"
                      />
                    </FormRow>

                    {/* Job ID Input */}
                    <FormRow label="Job ID" error={errors.jobId?.message}>
                      <input
                        id="jobId"
                        type="text"
                        {...register("jobId", { required: "This field is required" })}
                        className="p-2 mt-1 rounded-xl border w-full"
                      />
                    </FormRow>
                  </>
                )}
              </>
            )}

            <div className="mt-6">
              {/* Button Container with Flexbox */}
              <div className="flex justify-between items-center gap-4">
                {/* Back Button - Only visible on Step 2 */}
                {step === 2 && (
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="bg-white border border-gray-400 text-gray-700 rounded-xl py-2 px-6 hover:bg-gray-100 duration-300 w-full"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* Next Button - Only visible on Step 1 */}
                {step === 1 && (
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-[#002D74] text-white rounded-xl py-2 px-6 hover:opacity-90 duration-300 w-full"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Sign Up Button - Only visible on Step 2 */}
                {step === 2 && (
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={handleSignUp}
                      className="bg-[#002D74] text-white rounded-xl py-2 px-6 hover:opacity-90 duration-300 w-full"
                    >
                      Create
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Sign In Link - Show only in Step 1 */}
          {step === 1 && (
            <div className="mt-4 text-center">
              <span className="text-sm text-[#002D74]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#002D74] font-semibold"
                >
                  Sign In
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
