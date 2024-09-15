import PageSubTitle from '../components/PageTitle';
import userIcon from "/src/assets/images/SysAdIcons/userIcon.png";
import ProfileContent from "./ContentProfile";

export default function SysAdminPageProfile() {
  return (
    <div>
      <PageSubTitle title="MY ACCOUNT" iconSrc={userIcon} />
        <ProfileContent />
    </div>
  );
}
