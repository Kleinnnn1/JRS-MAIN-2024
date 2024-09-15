import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import FormRow from "../../../components/ReusableFormRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReferral } from "../../../service/apiReferral"; // Import the update function
import toast from "react-hot-toast";

const EditFormReferral = () => {
  const location = useLocation();
  const { state: referral } = location;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobDescription: referral?.job_description || "",
      jobType: referral?.job_type || "",
      requesterName: referral?.requestor_name || "",
      location: referral?.location || "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: ({ id, updatedData }) => updateReferral(id, updatedData), // Call updateReferral
    onSuccess: () => {
      toast.success("Job Request Successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    // Check if the image is a new file or an existing string (URL)
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // Ensure the keys here match your database column names
    const formattedData = {
      job_description: data.jobDescription,
      job_type: data.jobType,
      requestor_name: data.requesterName,
      location: data.location,
      image: image, // Pass the image file or URL
    };

    mutate({ updatedData: formattedData, id: referral.referral_id });
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
          {...register("image")}
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
};

export default EditFormReferral;

// import { useForm } from "react-hook-form";
// import { useLocation } from "react-router-dom";
// import FormRow from "./FormRow";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { insertReferral } from "../../../service/apiReferral"; // Import the insert function
// import toast from "react-hot-toast";

// const EditFormReferral = () => {
//   const location = useLocation();
//   const { state: referral } = location;
//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       jobDescription: referral?.job_description || "",
//       jobType: referral?.job_type || "",
//       requesterName: referral?.requestor_name || "",
//       location: referral?.location || "",
//     },
//   });

//   const { mutate } = useMutation({
//     mutationFn: ({ newReferralData, id }) =>
//       insertReferral(newReferralData, id),
//     onSuccess: () => {
//       toast.success("Job Request Successfully Edited");
//       queryClient.invalidateQueries({ queryKey: ["referrals"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   //for inserting data in supabase

//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];
//     // Ensure the keys here match your database column names
//     const formattedData = {
//       job_description: data.jobDescription,
//       job_type: data.jobType,
//       requestor_name: data.requesterName,
//       location: data.location,
//       image: data.image,
//     };
//     mutate({ ...formattedData, image: image });
//   }

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//       <FormRow label="Job Description" error={errors.jobDescription?.message}>
//         <input
//           id="jobDescription"
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter job description"
//           {...register("jobDescription", {
//             required: "This field is required",
//             validate: {
//               minWords: (value) => {
//                 const words = value.trim().split(/\s+/);
//                 return (
//                   words.length >= 2 ||
//                   "Job description should be at least two words"
//                 );
//               },
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Job Type" error={errors.jobType?.message}>
//         <input
//           id="jobType"
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter job type"
//           {...register("jobType", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Name" error={errors.requesterName?.message}>
//         <input
//           id="requesterName"
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter name"
//           {...register("requesterName", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Location" error={errors.location?.message}>
//         <input
//           id="location"
//           type="text"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter location"
//           {...register("location", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Image" error={errors.image?.message}>
//         <input
//           id="image"
//           type="file"
//           accept="image/*"
//           className="mt-1 block p-2"
//           {...register("image")}
//         />
//       </FormRow>

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default EditFormReferral;
