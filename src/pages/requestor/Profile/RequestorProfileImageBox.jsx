import ProfileImage from "./RequestorProfileImage";

export default function RequestorProfileImageBox() {
  return (
    <div className="shadow-xl border w-80 h-[40vh] p-10">
      <div className="flex flex-col items-center text-center text-white">
        <ProfileImage />
        <p className="font-semibold text-xm text-black">
          Karen C. Cadalo
        </p>

        <p className="text-sm text-black">cadalo.karen@gmail.com</p>
        <p className="text-xm text-black">Faculty Teacher</p>
      </div>
    </div>
  );
}
