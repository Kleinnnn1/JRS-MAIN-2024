import useUserStore from "../../store/useUserStore";
import DefaultImageUser from "../../assets/images/DefaultImageUser.jpg";

export default function Profile() {
  const { userMetadata } = useUserStore();

  return (
    <div className="flex flex-col items-center text-center text-white mb-10 -mt-10">
      <img
        src={userMetadata.avatar || DefaultImageUser}
        alt="Profile"
        className="w-16 h-16 rounded-full  border border-black object-cover mb-2"
      />
      <p className="font-semibold text-xm">
        {userMetadata.fName || "First Name"} {userMetadata.lName || "Last Name"}
      </p>
      <p className="text-xs">{userMetadata.role}</p>
    </div>
  );
}
