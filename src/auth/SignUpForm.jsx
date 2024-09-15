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
    fname,
    lname,
    idnumber,
    email,
    password,
    userrole,
    contactnumber,
    departmentid,
    jobid,
  }) {
    signup(
      {
        fname,
        lname,
        idnumber,
        email,
        password,
        userrole,
        contactnumber,
        departmentid,
        jobid,
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

      <FormRow label="First Name" error={errors.fname?.message}>
        <input
          id="fname"
          name="fname"
          type="text"
          {...register("fname", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Last Name" error={errors.lname?.message}>
        <input
          id="lname"
          name="lname"
          type="text"
          {...register("lname", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="ID Number" error={errors.idnumber?.message}>
        <input
          id="idnumber"
          name="idnumber"
          type="text"
          {...register("idnumber", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Email" error={errors.email?.message}>
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
      </FormRow>

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

      <FormRow label="User Role" error={errors.userrole?.message}>
        <select
          id="userrole"
          name="userrole"
          {...register("userrole", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a role</option>
          <option value="requestor">Requestor</option>
          <option value="system admin">System Admin</option>
          <option value="staff">Staff</option>
          <option value="department head">Department Head</option>
        </select>
      </FormRow>

      <FormRow label="Contact Number" error={errors.contactnumber?.message}>
        <input
          id="contactnumber"
          name="contactnumber"
          type="text"
          {...register("contactnumber", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Department ID" error={errors.departmentid?.message}>
        <input
          id="departmentid"
          name="departmentid"
          type="text"
          {...register("departmentid", { required: "This field is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </FormRow>

      <FormRow label="Job ID" error={errors.jobid?.message}>
        <input
          id="jobid"
          name="jobid"
          type="text"
          {...register("jobid", { required: "This field is required" })}
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
