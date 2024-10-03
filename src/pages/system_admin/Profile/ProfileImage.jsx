import ProfilePic from "../../../assets/images/SysAdIcons/Saturo_Gojo.png";

export default function ProfileImage() {
  return (
    <img
      src={ProfilePic}
      alt="Profile"
      className="w-[20vh] h-[20vh] rounded-full  border border-black object-cover"
    />
  );
}
