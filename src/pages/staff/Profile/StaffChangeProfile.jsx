import ChooseImageButton from "./StaffChooseImagebtn";
import ProfileImage from "./StaffProfileImage";
import SaveChangesButton from "./StaffSaveChangesbtn";

export default function ChangeAvatar() {
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
