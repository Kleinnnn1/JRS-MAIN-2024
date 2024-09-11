import ProfileImage from "./ProfileImage";
import useUserStore from "../../../store/useUserStore";

export default function ProfileImageBox() {
  const { userMetadata } = useUserStore();
  return (
    <div className="border border-black w-80 h-[40vh] p-10">
      <div className="flex flex-col items-center text-center text-white">
        <ProfileImage />
        <p className="font-semibold text-xm text-black">
          {userMetadata.fname} {userMetadata.lname}
        </p>

        <p className="text-sm text-black">{userMetadata.email}</p>
        <p className="text-xm text-black">{userMetadata.role}</p>
      </div>
    </div>
  );
}
