import FormRow from "../components/ReusableFormRow"; // Import the FormRow component
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import imageRegister from "../assets/images/register.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Job options
const jobOptions = [
  { jobId: "CJ002", jobPosition: "Engineer" },
  { jobId: "BJ005", jobPosition: "Busser" },
  { jobId: "CJ008", jobPosition: "Plumber" },
  { jobId: "BJ001", jobPosition: "Housekeeper" },
  { jobId: "CJ009", jobPosition: "Painter" },
  { jobId: "CJ003", jobPosition: "Draftsman" },
  { jobId: "CJ004", jobPosition: "Foreman" },
  { jobId: "CJ007", jobPosition: "Tile Setter" },
  { jobId: "MJ003", jobPosition: "Elevator Attendants" },
  { jobId: "BCL002", jobPosition: "Cluster Leader" },
  { jobId: "CJ005", jobPosition: "Carpenter" },
  { jobId: "MJ001", jobPosition: "Aircon Technicians" },
  { jobId: "BJ004", jobPosition: "Gardener/Landscaper" },
  { jobId: "CJ010", jobPosition: "Laborer" },
  { jobId: "CJ001", jobPosition: "Architect" },
  { jobId: "BJ003", jobPosition: "Campus Grass & Bushes Maintainer" },
  { jobId: "BJ002", jobPosition: "Street Sweeper & Ground Sweeper" },
  { jobId: "CJ006", jobPosition: "Welder" },
  { jobId: "MJ002", jobPosition: "Electrician" },
  { jobId: "BCL001", jobPosition: "Cluster Leader" },
  { jobId: "MJ004", jobPosition: "Gymnasium Staff" },
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

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form submission
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
      },
      {
        onSettled: () => reset(), // Correct way to invoke reset
      }
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
        <div className="md:block hidden w-6/12 h-full">
          <img
            className="rounded-2xl h-full w-full object-cover"
            src={imageRegister}
            alt="USTP Logo"
          />
        </div>
        <form
          className="max-w-lg mx-auto p-6 space-y-4 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

          {/* First Name */}
          <FormRow label="First Name" error={errors.fName?.message}>
            <input
              id="fName"
              name="fName"
              type="text"
              {...register("fName", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* Last Name */}
          <FormRow label="Last Name" error={errors.lName?.message}>
            <input
              id="lName"
              name="lName"
              type="text"
              {...register("lName", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* ID Number */}
          <FormRow label="ID Number" error={errors.idNumber?.message}>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              {...register("idNumber", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* Email */}
          <FormRow label="Email" error={errors.email?.message}>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* Password */}
          <FormRow label="Password (min 8 characters)" error={errors.password?.message}>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* Confirm Password */}
          <FormRow label="Confirm Password" error={errors.passwordConfirm?.message}>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              {...register("passwordConfirm", {
                required: "Confirm Password is required",
                validate: {
                  matchesPreviousPassword: (value) =>
                    value === getValues("password") || "Passwords must match",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* User Role */}
          <FormRow label="User Role" error={errors.userRole?.message}>
            <select
              id="userRole"
              name="userRole"
              {...register("userRole", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="" className="hidden">
                Select a role
              </option>
              <option value="requestor">Requestor</option>
              <option value="system admin">System Admin</option>
              <option value="staff">Staff</option>
              <option value="department head">Department Head</option>
            </select>
          </FormRow>

          {/* Contact Number */}
          <FormRow label="Contact Number" error={errors.contactNumber?.message}>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              {...register("contactNumber", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </FormRow>

          {/* Department ID */}
          <FormRow label="Department ID" error={errors.deptId?.message}>
            <select
              id="deptId"
              name="deptId"
              {...register("deptId", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="" className="hidden">
                Select Department
              </option>
              <option value="D001">BGMS</option>
              <option value="D002">CSWS</option>
              <option value="D003">MEWSs</option>
            </select>
          </FormRow>

          {/* Job Position */}
          <FormRow label="Job Position" error={errors.jobId?.message}>
            <select
              id="jobId"
              name="jobId"
              {...register("jobId", { required: "This field is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="" className="hidden">
                Select Job Position
              </option>
              {jobOptions.map((job) => (
                <option key={job.jobId} value={job.jobId}>
                  {job.jobPosition}
                </option>
              ))}
            </select>
          </FormRow>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded justify-items-center hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>

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
        </form>
      </div>
    </section>
  );
}

export default SignUpForm;
