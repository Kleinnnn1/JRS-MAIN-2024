import SearchBar from "../../../components/SearchBar";
import ReusableContent from "../../../components/ReusableContent";
import ProfileContent from "./ContentProfile";

export default function ProfilePage() {
  return (
    <>
      <SearchBar title="Profile" />

      <ReusableContent>
        <ProfileContent />
      </ReusableContent>
    </>
  );
}
