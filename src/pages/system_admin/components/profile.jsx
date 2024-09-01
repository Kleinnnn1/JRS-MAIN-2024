import ProfilePic from "/src/assets/images/SysAdIcons/Saturo_Gojo.png";

function SideBarProfile() {
  return (
    <div className="flex flex-col items-center text-center text-white mb-10 mt-2">
      <img
        src={ProfilePic}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover mb-2"
      />
      <p className="font-bold text-xs">Saturo Gojo</p>
      <p className="text-xs">System Administrator</p>
    </div>
  );
}

export default SideBarProfile;