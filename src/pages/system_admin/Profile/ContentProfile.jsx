import ContentAndHeader from "./ContentAndHeader";
import ProfileInformationBox from "./ProfileInformationBox";  
import ProfileTab from "./ProfileTab";
import UserInformation from "./UserInformation";
import { useNavigate, Outlet, useOutlet } from "react-router-dom";

export default function ContentProfile() {
  const navigate = useNavigate();
  const otherContent = useOutlet();
  return (
    <div className="flex justify-center items-start">
      
      
      <ProfileInformationBox>
        <ContentAndHeader
          content={otherContent ? <Outlet /> : <UserInformation />}
        >
          <div className="flex justify-center space-x-4">
            <ProfileTab
              name="User Account"
              onClick={() =>
                navigate("/system_admin/myprofile/user_account")
              }
            />
            <ProfileTab
              name="Change Avatar"
              onClick={() =>
                navigate("/system_admin/myprofile/change_avatar")
              }
            />
            <ProfileTab
              name="Change Password"
              onClick={() =>
                navigate("/system_admin/myprofile/change_password")
              }
            />
          </div>
        </ContentAndHeader>
      </ProfileInformationBox>
      
    </div>
  );
}
