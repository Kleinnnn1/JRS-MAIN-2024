import ProfilePic from "/src/assets/images/SysAdIcons/Saturo_Gojo.png";
import useUserStore from "../../../store/useUserStore";
import DefaultImageUser from "../../../assets/images/DefaultImageUser.jpg";

function SideBarProfile() {
  const { userMetadata } = useUserStore();
  return (
    <div className="flex flex-col items-center text-center text-white mb-10 mt-2">
      <img
        src={userMetadata.avatar || DefaultImageUser}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover mb-2"
      />
      <p className="font-bold text-xs">
        {userMetadata.fname} {userMetadata.lname}
      </p>
      <p className="text-xs">{userMetadata.role}</p>
    </div>
  );
}

export default SideBarProfile;
