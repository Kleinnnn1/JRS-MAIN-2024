import { useEffect } from "react";
import supabase from "../../../service/supabase";
import SaveChangesButton from "./SaveChangesButton";
import useUserStore from "../../../store/useUserStore";
import { updateUserInformation } from "../../../service/apiAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function UserInformation() {
  const { userMetadata, setUserMetadata } = useUserStore(); // Access setUserMetadata

  // Initialize useForm with default values from userMetadata
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset to reset form values
  } = useForm({
    defaultValues: {
      fname: userMetadata.fname,
      lname: userMetadata.lname,
      contact: userMetadata.contactnumber,
    },
  });

  // Update form values when userMetadata changes
  useEffect(() => {
    reset({
      fname: userMetadata.fname,
      lname: userMetadata.lname,
      contact: userMetadata.contactnumber,
    });
  }, [userMetadata, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Update user information in Supabase
      await updateUserInformation({
        fname: data.fname,
        lname: data.lname,
        contactNumber: data.contact,
      });

      // Update Zustand store
      setUserMetadata({
        fname: data.fname,
        lname: data.lname,
        contactnumber: data.contact,
      });

      // Optionally refresh the session to avoid token expiration issues
      const { error: refreshError } = await supabase.auth.refreshSession();

      if (refreshError) {
        console.error("Error refreshing session:", refreshError.message);
        toast.error("Failed to refresh session data.");
        return;
      }

      toast.success("User information successfully updated!");
    } catch (error) {
      console.error("Error updating user information:", error.message);
      toast.error("Failed to update user information.");
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     // Update user information in Supabase
  //     await updateUserInformation({
  //       fname: data.fname,
  //       lname: data.lname,
  //       contactNumber: data.contact,
  //     });

  //     // Update Zustand store
  //     setUserMetadata({
  //       fname: data.fname,
  //       lname: data.lname,
  //       contactnumber: data.contact,
  //     });

  //     toast.success("User information successfully updated!");
  //   } catch (error) {
  //     console.error("Error updating user information:", error.message);
  //     toast.error("Failed to update user information.");
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name */}
      <div className="flex flex-col items-center">
        <label htmlFor="fname" className="font-bold text-center mt-9">
          First Name
        </label>
        <input
          id="fname"
          type="text"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("fname", {
            required: "First name is required",
          })}
        />
        {errors.fname && <p className="text-red-500">{errors.fname.message}</p>}
      </div>

      {/* Last Name */}
      <div className="flex flex-col items-center">
        <label htmlFor="lname" className="font-bold text-center">
          Last Name
        </label>
        <input
          id="lname"
          type="text"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("lname", {
            required: "Last name is required",
          })}
        />
        {errors.lname && <p className="text-red-500">{errors.lname.message}</p>}
      </div>

      {/* Email (Disabled) */}
      <div className="flex flex-col items-center">
        <label htmlFor="email" className="font-bold text-center">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          value={userMetadata.email}
          disabled
        />
      </div>

      {/* Contact Number */}
      <div className="flex flex-col items-center">
        <label htmlFor="contact" className="font-bold text-center">
          Contact Number
        </label>
        <input
          id="contact"
          type="tel"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("contact", {
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Contact number must be digits only",
            },
          })}
        />
        {errors.contact && (
          <p className="text-red-500">{errors.contact.message}</p>
        )}
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <SaveChangesButton />
      </div>
    </form>
  );
}

// import SaveChangesButton from "./SaveChangesButton";
// import useUserStore from "../../../store/useUserStore";
// import { updateUserInformation } from "../../../service/apiAuth";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

// export default function UserInformation() {
//   const { userMetadata, setUserMetadata } = useUserStore(); // Access setUserMetadata

//   // Initialize useForm with default values from userMetadata
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     defaultValues: {
//       fname: userMetadata.fname,
//       lname: userMetadata.lname,
//       contact: userMetadata.contactnumber,
//     },
//   });

//   // Set default values for form inputs
//   setValue("fname", userMetadata.fname);
//   setValue("lname", userMetadata.lname);
//   setValue("contact", userMetadata.contactnumber);

//   // Handle form submission

//   // Handle form submission
//   const onSubmit = async (data) => {
//     try {
//       // Update user information in Supabase
//       await updateUserInformation({
//         fname: data.fname,
//         lname: data.lname,
//         contactNumber: data.contact,
//       });

//       // Update Zustand store
//       setUserMetadata({
//         fname: data.fname,
//         lname: data.lname,
//         contactnumber: data.contact,
//       });

//       toast.success("User information successfully updated!");
//     } catch (error) {
//       console.error("Error updating user information:", error.message);
//       toast.error("Failed to update user information.");
//     }
//   };

//   // const onSubmit = async (data) => {
//   //   try {
//   //     // Update contact number in Supabase (you can also add API call to update fname/lname if needed)
//   //     await updateContactNumber({ contactNumber: data.contact });

//   //     // Update first name, last name, and contact number in Zustand store (userMetadata)
//   //     setUserMetadata({
//   //       fname: data.fname,
//   //       lname: data.lname,
//   //       contactnumber: data.contact,
//   //     });

//   //     toast.success("User information successfully updated!");
//   //     console.log("User information updated successfully.");
//   //   } catch (error) {
//   //     console.error("Error updating user information:", error.message);
//   //   }
//   // };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {/* First Name */}
//       <div className="flex flex-col items-center">
//         <label htmlFor="fname" className="font-bold text-center mt-9">
//           First Name
//         </label>
//         <input
//           id="fname"
//           type="text"
//           className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
//           {...register("fname", {
//             required: "First name is required",
//           })}
//         />
//         {errors.fname && <p className="text-red-500">{errors.fname.message}</p>}
//       </div>

//       {/* Last Name */}
//       <div className="flex flex-col items-center">
//         <label htmlFor="lname" className="font-bold text-center">
//           Last Name
//         </label>
//         <input
//           id="lname"
//           type="text"
//           className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
//           {...register("lname", {
//             required: "Last name is required",
//           })}
//         />
//         {errors.lname && <p className="text-red-500">{errors.lname.message}</p>}
//       </div>

//       {/* Email (Disabled) */}
//       <div className="flex flex-col items-center">
//         <label htmlFor="email" className="font-bold text-center">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
//           value={userMetadata.email}
//           disabled
//         />
//       </div>

//       {/* Contact Number */}
//       <div className="flex flex-col items-center">
//         <label htmlFor="contact" className="font-bold text-center">
//           Contact Number
//         </label>
//         <input
//           id="contact"
//           type="tel"
//           className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
//           {...register("contact", {
//             required: "Contact number is required",
//             pattern: {
//               value: /^[0-9]+$/,
//               message: "Contact number must be digits only",
//             },
//           })}
//         />
//         {errors.contact && (
//           <p className="text-red-500">{errors.contact.message}</p>
//         )}
//       </div>

//       {/* Save Changes Button */}
//       <div className="flex justify-end">
//         <SaveChangesButton />
//       </div>
//     </form>
//   );
// }
