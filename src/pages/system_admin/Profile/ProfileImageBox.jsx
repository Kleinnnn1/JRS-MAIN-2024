import ProfileImage from "./ProfileImage";

export default function ProfileImageBox() {
  return (
    <div className="border border-black w-80 h-[40vh] m-10 p-10">
      <div className="flex flex-col items-center text-center text-white">
        <ProfileImage />
        <p className="font-semibold text-xm text-black">
        Saturo Gojo
        </p>

        <p className="text-sm text-black">SaturoGojo@gmail.com</p>
        <p className="text-xm text-black">System Administrartor</p>
      </div>
    </div>
  );
}
