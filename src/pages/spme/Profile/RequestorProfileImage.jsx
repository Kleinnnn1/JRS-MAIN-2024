import ProfilePic from "/src/assets/images/BabyKaren.jpg";

export default function RequestorProfileImage() {
  return (
    <img
      src={ProfilePic}
      alt="Profile"
      className="w-[20vh] h-[20vh] rounded-full   object-cover"
    />
  );
}
