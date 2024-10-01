import ProfilePic from "/src/assets/images/raphael.jpg";

export default function StaffProfile() {
  return (
    <div className="flex flex-col items-center text-center text-white mb-10 -mt-10">
      <img
        src={ProfilePic}
        alt="Profile"
        className="w-16 h-16 rounded-full  border border-black object-cover mb-2"
      />

      <p className="font-semibold text-xm">Raphael Albiso</p> {/* Sample only, database fetching involved here */}
      <p className="text-xs">Staff</p>{/* Constant */}
    </div>
  );
}
