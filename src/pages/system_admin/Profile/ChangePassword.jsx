import { useForm } from "react-hook-form";
import { useLogout } from "../../../auth/useLogout";
import { updatePassword } from "../../../service/apiAuth";
import supabase from "../../../service/supabase"; // Import Supabase client
import toast from "react-hot-toast";
import SaveChangesButton from "../../../components/SaveChangesButton";

export default function SysAdminChangePassword() {
  const { logout } = useLogout();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    // Step 1: Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      setError("confirmNewPassword", {
        type: "manual",
        message: "New password and confirm password do not match.",
      });
      return;
    }

    // Step 2: Reauthenticate the user with the current password
    try {
      // Fetch the current session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        setError("currentPassword", {
          type: "manual",
          message: "Failed to retrieve session.",
        });
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email, // The user's email from the session
        password: currentPassword, // The current password entered by the user
      });

      if (signInError) {
        setError("currentPassword", {
          type: "manual",
          message: "Current password is incorrect.",
        });
        return;
      }

      // Step 3: If reauthentication is successful, update the password
      await updatePassword({ password: newPassword });
      toast.success("Password successfully updated!");
      logout(); // Optionally log out after password change
    } catch (error) {
      console.error("Error changing password:", error.message);
      toast.error("Failed to update password.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center mt-5 ml-5">
        <label htmlFor="currentPassword" className="mb-2">
          Current Password
        </label>
        <input
          id="currentPassword"
          type="password"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
        {errors.currentPassword && (
          <p className="text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>
      <div className="flex flex-col items-center mt-5 ml-5">
        <label htmlFor="newPassword" className="mb-2">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "New password must be at least 8 characters long",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}
      </div>
      <div className="flex flex-col items-center mt-5 ml-5">
        <label htmlFor="confirmNewPassword" className="mb-2">
          Confirm New Password
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          {...register("confirmNewPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.confirmNewPassword && (
          <p className="text-red-500">{errors.confirmNewPassword.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <SaveChangesButton />
      </div>
    </form>
  );
}
