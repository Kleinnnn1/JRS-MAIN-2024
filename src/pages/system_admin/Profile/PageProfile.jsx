import ProfileContent from "./ContentProfile";
import SearchBar from "../../../components/SearchBar";

export default function SysAdminPageProfile() {
  return (
    <div>
      <SearchBar title="My Profile"/>
        <ProfileContent />
    </div>
  );
}
