import MyProfileDropdown from "../../../components/MyProfileDropdown";
import profilePicture from "/src/assets/images/SysAdIcons/Saturo_Gojo.png"; // Import your profile picture

export default function SysAdminHeader() {
  return (
    <div className="py-2 px-6 bg-yellow-400 flex items-center justify-between min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <div className="flex items-center">
        <a href="#" className="text-xs ">
          jrs@ustp.edu.ph +384-3478-984
        </a>
      </div>
      <div className="flex items-center">
        <MyProfileDropdown />
      </div>
    </div>
  );
}
