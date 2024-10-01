import FormRow from "../components/ReusableFormRow"; // Import the FormRow component
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";

function SignUpForm() {
  const { signup } = useSignUp();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

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
        onSettled: () => reset,
      }
    );
  }

  return (
    <form
      className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg space-y-4 bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <FormRow label="First Name" error={errors.fName?.message}>
        <input
          id="fName"
          name="fName"
          type="text"
          {...register("fName", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Last Name" error={errors.lName?.message}>
        <input
          id="lName"
          name="lName"
          type="text"
          {...register("lName", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="ID Number" error={errors.idNumber?.message}>
        <input
          id="idNumber"
          name="idNumber"
          type="text"
          {...register("idNumber", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

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

      {/* <FormRow label="Email" error={errors.email?.message}>
        <input
          id="email"
          name="email"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow> */}

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
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

      <FormRow label="User Role" error={errors.userRole?.message}>
        <select
          id="userRole"
          name="userRole"
          {...register("userRole", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a role</option>
          <option value="requestor">Requestor</option>
          <option value="system admin">System Admin</option>
          <option value="staff">Staff</option>
          <option value="department head">Department Head</option>
        </select>
      </FormRow>

      <FormRow label="Contact Number" error={errors.contactNumber?.message}>
        <input
          id="contactNumber"
          name="contactNumber"
          type="text"
          {...register("contactNumber", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Department ID" error={errors.deptId?.message}>
        <input
          id="deptId"
          name="deptId"
          type="text"
          {...register("deptId", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Job ID" error={errors.jobId?.message}>
        <input
          id="jobId"
          name="jobId"
          type="text"
          {...register("jobId", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;

{
  /* <FormRow label="Email" error={errors.email?.message}>
        <input
          id="email"
          name="email"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow> */
}
