import iconFile from "../../../assets/images/iconProfile.png"; // Adjust path as necessary
import ReusableContent from "../../../components/ReusableContent";
import ProfileContent from "./RequestorContentProfile";

export default function RequestorProfilePage() {
  return (
    <>
      {/* Dashboard Header */}
      <div className="my-4 mx-3 py-2 px-4 bg-blue-950 flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-md shadow-black/5 rounded-xl">
        <div className="flex items-center mb-4 lg:mb-0">
          <img src={iconFile} alt="Folder Icon" className="h-6 w-6 mr-4" />
          <h1 className="text-2xl font-medium text-white">Profile</h1>
        </div>
      </div>

      <ReusableContent>
        <ProfileContent />
      </ReusableContent>
    </>
  );
}
