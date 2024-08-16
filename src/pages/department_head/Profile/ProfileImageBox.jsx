import ProfileImage from "./ProfileImage";

export default function ProfileImageBox() {
  return (
    <div className="border border-black w-80 h-[40vh] p-10">
      <div className="flex flex-col items-center text-center text-white">
        <ProfileImage />
        <p className="font-semibold text-xm text-black">
          Kenneth Jhun N. Balino
        </p>

        <p className="text-sm text-black">balino.kennethjhun@gmail.com</p>
        <p className="text-xm text-black">Department Head</p>
      </div>
    </div>
  );
}
