import ProfilePic from "/src/assets/images/BabyKaren.jpg";

export default function Profile() {
  return (
    <div className="flex flex-col items-center text-center text-white mb-10 -mt-10">
      <img
        src={ProfilePic}
        alt="Profile"
        className="w-16 h-16 rounded-full  border border-black object-cover mb-2"
      />
      <p className="font-semibold text-xm">Karen C. Cadalo</p>
      <p className="text-xs">Faculty Teacher</p>
    </div>
  );
}
