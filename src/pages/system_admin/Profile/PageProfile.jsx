import userIcon from "/src/assets/images/SysAdIcons/userIcon.png";
import ProfileContent from "./ContentProfile";
import SearchBar from "../../../components/SearchBar";

export default function SysAdminPageProfile() {
  return (
    <div>
      <SearchBar Title="My Profile"/>
        <ProfileContent />
    </div>
  );
}
