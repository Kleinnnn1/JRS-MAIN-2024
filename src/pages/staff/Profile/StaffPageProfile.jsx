import SearchBar from "../../../components/SearchBar";
import ReusableContent from "../../../components/ReusableContent";
import ProfileContent from "./StaffContentProfile";

export default function StaffProfilePage() {
  return (
    <>
      <SearchBar title="Profile" />

      <ReusableContent>
        <ProfileContent />
      </ReusableContent>
    </>
  );
}
