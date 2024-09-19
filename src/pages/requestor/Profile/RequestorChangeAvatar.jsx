import ChooseImageButton from "./RequestorChooseImageButton";
import SaveChangesButton from "./RequestorSaveChangesButton";

export default function RequestorChangeAvatar() {
  return (
    <div>
      <div className="flex justify-center mt-9">
        <ProfileImage />
      </div>
      <div className="flex justify-center p-4">
        <ChooseImageButton />
      </div>
      <div className="flex justify-end mt-6">
        <SaveChangesButton />
      </div>
    </div>
  );
}
