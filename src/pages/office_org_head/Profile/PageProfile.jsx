import SearchBar from "../../../components/SearchBar";
import ProfileContent from "./ContentProfile";

export default function OfficeHeadProfilePage() {
  return (
    <>
    <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Profile" showInput={true} />
      </div>
      <ProfileContent />
    </>
  );
}
