<<<<<<< HEAD:src/pages/requestor/Profile/RequestorChangeAvatar.jsx
import ChooseImageButton from "./RequestorChooseImageButton";
import SaveChangesButton from "./RequestorSaveChangesButton";

export default function RequestorChangeAvatar() {
=======
import { useForm } from "react-hook-form";
import ProfileImage from "./ProfileImage";
import SaveChangesButton from "./SaveChangesButton";
import { updateAvatar } from "../../../service/apiAuth";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../../store/useUserStore";

export default function ChangeAvatar() {
  const { register, handleSubmit } = useForm();
  const { userMetadata, setUserMetadata } = useUserStore(); // Adjust store to have setUserMetaData
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (data) => {
      // Update Zustand store with new avatar URL
      setUserMetadata({
        ...userMetadata,
        avatar: data.avatar, // Assuming API returns the new avatar URL in 'data.avatar'
      });
      toast.success("Avatar Successfully Updated");
      queryClient.invalidateQueries({ queryKey: ["profiles"] }); // Invalidate cache
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    // Custom check for file selection
    if (!data.avatar || data.avatar.length === 0) {
      toast.error("Please select a file.");
      return; // Prevent form submission if no file is selected
    }

    const file = data.avatar[0]; // Get the first file from FileList
    mutate({ avatar: file }); // Call mutation to update avatar
  }

>>>>>>> RaphaelMerge3:src/pages/department_head/Profile/ChangeAvatar.jsx
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mt-9">
        <ProfileImage />
      </div>
      <div className="flex justify-center p-4">
        {/* File input element */}
        <input
          id="avatar"
          type="file"
          accept="image/*"
          className="mt-1 block p-2 border border-black"
          {...register("avatar")}
        />
      </div>
      <div className="flex justify-end mt-6">
        <SaveChangesButton />
      </div>
    </form>
  );
}
