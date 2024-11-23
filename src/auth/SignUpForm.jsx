import FormRow from "../components/ReusableFormRow";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import imageRegister from "../assets/images/register.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const jobOptions = [
  { jobCategory: "CJ002", jobPosition: "Engineer" },
  { jobCategory: "BJ005", jobPosition: "Busser" },
  { jobCategory: "CJ008", jobPosition: "Plumber" },
  { jobCategory: "BJ001", jobPosition: "Housekeeper" },
  { jobCategory: "CJ009", jobPosition: "Painter" },
  { jobCategory: "CJ003", jobPosition: "Draftsman" },
  { jobCategory: "CJ004", jobPosition: "Foreman" },
  { jobCategory: "CJ007", jobPosition: "Tile Setter" },
  { jobCategory: "MJ003", jobPosition: "Elevator Attendants" },
  { jobCategory: "BCL002", jobPosition: "Cluster Leader" },
  { jobCategory: "CJ005", jobPosition: "Carpenter" },
  { jobCategory: "MJ001", jobPosition: "Aircon Technicians" },
  { jobCategory: "BJ004", jobPosition: "Gardener/Landscaper" },
  { jobCategory: "CJ010", jobPosition: "Laborer" },
  { jobCategory: "CJ001", jobPosition: "Architect" },
  { jobCategory: "BJ003", jobPosition: "Campus Grass & Bushes Maintainer" },
  { jobCategory: "BJ002", jobPosition: "Street Sweeper & Ground Sweeper" },
  { jobCategory: "CJ006", jobPosition: "Welder" },
  { jobCategory: "MJ002", jobPosition: "Electrician" },
  { jobCategory: "BCL001", jobPosition: "Cluster Leader" },
  { jobCategory: "MJ004", jobPosition: "Gymnasium Staff" },
];

function SignUpForm() {
  const { signup } = useSignUp();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [selectedUserRole, setSelectedUserRole] = useState(""); // State to track the selected user role

  function onSubmit(data) {
    signup(data, {
      onSettled: () => reset(),
    });
  }

  function handleUserRoleChange(event) {
    setSelectedUserRole(event.target.value); // Update the user role when the selection changes
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-lg max-w-5xl w-full">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            className="rounded-l-2xl object-cover h-full"
            src={imageRegister}
            alt="Sign Up"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Create Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* First Row: First Name and Last Name */}
            <div className="flex space-x-4">
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
            <div className="flex space-x-4">
              <FormRow label="Birth Date" error={errors.birthDate?.message}>
                <input
                  type="date"
                  {...register("birthDate", { required: "Birth Date is required" })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
              <FormRow label="ID Number" error={errors.idNumber?.message}>
                <input
                  type="text"
                  {...register("idNumber", { required: "ID Number is required" })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
            </div>

            {/* Third Row: Email and Contact Number */}
            <div className="flex space-x-4">
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
              <FormRow label="Contact Number" error={errors.contactNumber?.message}>
                <input
                  type="text"
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
            </div>

            {/* Fourth Row: User Role and Department ID */}
            <div className="flex space-x-4">
              <FormRow label="User Role" error={errors.userRole?.message}>
                <select
                  {...register("userRole", { required: "User Role is required" })}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleUserRoleChange} // Trigger the change handler
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="requestor">Requestor</option>
                  <option value="system admin">System Admin</option>
                  <option value="staff">Staff</option>
                  <option value="department head">Department Head</option>
                </select>
              </FormRow>
              <FormRow label="Department" error={errors.deptId?.message}>
                <select
                  {...register("deptId", { required: "Department ID is required" })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="D001">BGMS</option>
                  <option value="D002">CSWS</option>
                  <option value="D003">MEWSs</option>
                </select>
              </FormRow>
            </div>

            {/* Fifth Row: Job Position (Conditional) */}
            {selectedUserRole === "staff" && ( // Only show if User Role is 'staff'
              <FormRow label="Job Position" error={errors.jobCategory?.message}>
                <select
                  {...register("jobCategory", { required: "Job Position is required" })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select Job Position
                  </option>
                  {jobOptions.map((job) => (
                    <option key={job.jobCategory} value={job.jobCategory}>
                      {job.jobPosition}
                    </option>
                  ))}
                </select>
              </FormRow>
            )}

            {/* Sixth Row: Password and Confirm Password */}
            <div className="flex space-x-4">
              <FormRow label="Password" error={errors.password?.message}>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
              <FormRow
                label="Confirm Password"
                error={errors.passwordConfirm?.message}
              >
                <input
                  type="password"
                  {...register("passwordConfirm", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") || "Passwords must match",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </FormRow>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>

            {/* Navigation to Login */}
        <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")} // Navigate to the login page
            >
              Log In
            </span>
          </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
