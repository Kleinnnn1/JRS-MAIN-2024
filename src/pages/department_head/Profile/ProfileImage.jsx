import ProfilePic from "/src/assets/images/kennimg.jpg";

export default function ProfileImage() {
  return (
    <img
      src={ProfilePic}
      alt="Profile"
      className="w-[20vh] h-[20vh] rounded-full  border border-black object-cover"
    />
  );
}
