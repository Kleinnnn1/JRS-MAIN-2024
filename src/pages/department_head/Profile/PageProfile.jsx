import SearchBar from "../../../components/SearchBar";
import ProfileContent from "./ContentProfile";

export default function ProfilePage() {
  return (
    <div>
      <SearchBar title="My Profile"/>
        <ProfileContent />
    </div>
  );
}
