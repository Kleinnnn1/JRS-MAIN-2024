import ReusableContent from "../../../components/ReusableContent";
import ProfileContent from "./RequestorContentProfile";
import SearchBar from "../../../components/SearchBar";

export default function RequestorProfilePage() {
  return (
    <>
      {/* Dashboard Header */}
      <div className="my-4 mx-3 py-2 px-4 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 s">
        <SearchBar title="Profile" />
      </div>

      <ReusableContent>
        <ProfileContent />
      </ReusableContent>
    </>
  );
}
