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
      fName: userMetadata.fName,
      lName: userMetadata.lName,
      contact: userMetadata.contactNumber,
    },
  });

  // Update form values when userMetadata changes
  useEffect(() => {
    reset({
      fName: userMetadata.fName,
      lName: userMetadata.lName,
      contact: userMetadata.contactNumber,
    });
  }, [userMetadata, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Update user information in Supabase
      await updateUserInformation({
        fName: data.fName,
        lName: data.lName,
        contactNumber: data.contact,
      });

      // Update Zustand store
      setUserMetadata({
        fName: data.fName,
        lName: data.lName,
        contactNumber: data.contact,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name */}
      <div className="flex flex-col items-center">
        <label htmlFor="fName" className="font-bold text-center mt-9">
          First Name
        </label>
        <input
          id="fName"
          type="text"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("fName", {
            required: "First name is required",
          })}
        />
        {errors.fName && <p className="text-red-500">{errors.fName.message}</p>}
      </div>

      {/* Last Name */}
      <div className="flex flex-col items-center">
        <label htmlFor="lName" className="font-bold text-center">
          Last Name
        </label>
        <input
          id="lName"
          type="text"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("lName", {
            required: "Last name is required",
          })}
        />
        {errors.lName && <p className="text-red-500">{errors.lName.message}</p>}
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
          value={userMetadata?.email || ""}
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
