import ProfileImage from "./StaffProfileImage";

export default function ProfileImageBox() {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg w-80 h-[40vh] p-6 bg-white flex flex-col items-center ml-12">
      <div className="flex flex-col items-center text-center">
        <ProfileImage className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4" />
        <p className="font-semibold text-lg text-gray-800 mt-10 mb-1">
          Raphael Albiso
        </p>
        <p className="text-sm text-gray-600 mb-2">
          albiso.raphael03@gmail.com
        </p>
        <p className="text-sm text-gray-600">
          Staff
        </p>
      </div>
    </div>
  );
}
