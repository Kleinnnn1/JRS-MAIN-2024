import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { insertReferral } from "../../../service/apiReferral"; // Import the insert function
import toast from "react-hot-toast";
import FormRow from "./FormRow";

export default function TestFormReferral() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: insertReferral, // Use the correct function here
    onSuccess: () => {
      toast.success("Job Request Successfully Submitted");
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //for inserting data in supabase

  function onSubmit(data) {
    // Ensure the keys here match your database column names
    const formattedData = {
      job_description: data.jobDescription,
      job_type: data.jobType,
      requestor_name: data.requesterName,
      location: data.location,
      image: data.image,
    };
    mutate({ ...formattedData, image: data.image.at(0) });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Job Description" error={errors.jobDescription?.message}>
        <input
          id="jobDescription"
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          placeholder="Enter job description"
          {...register("jobDescription", {
            required: "This field is required",
            validate: {
              minWords: (value) => {
                const words = value.trim().split(/\s+/);
                return (
                  words.length >= 2 ||
                  "Job description should be at least two words"
                );
              },
            },
          })}
        />
      </FormRow>

      <FormRow label="Job Type" error={errors.jobType?.message}>
        <input
          id="jobType"
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          placeholder="Enter job type"
          {...register("jobType", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Name" error={errors.requesterName?.message}>
        <input
          id="requesterName"
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          placeholder="Enter name"
          {...register("requesterName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Location" error={errors.location?.message}>
        <input
          id="location"
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          placeholder="Enter location"
          {...register("location", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Image" error={errors.image?.message}>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="mt-1 block p-2"
          {...register("image", {
            required: "Image is required",
          })}
        />
      </FormRow>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
