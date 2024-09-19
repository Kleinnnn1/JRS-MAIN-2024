import ContentAndHeader from "./RequestorContentAndHeader";
import ProfileInformationBox from "./RequestorProfileInformationBox";
import ProfileTab from "./RequestorProfileTab";
import UserInformation from "./RequestorUserInformation";
import { useNavigate, Outlet, useOutlet } from "react-router-dom";

export default function RequestorContentProfile() {
  const navigate = useNavigate();
  const otherContent = useOutlet();
  return (
    <div className="flex justify-center items-start">
      

      <ProfileInformationBox>
        <ContentAndHeader
          content={otherContent ? <Outlet /> : <UserInformation />}
        >
          
          <div className="flex justify-end space-x-4">
            <ProfileTab
              name="User Account"
              onClick={() =>
                navigate("/requestor/requestor_profile/user_account")
              }
            />
            <ProfileTab
              name="Change Avatar"
              onClick={() =>
                navigate("/requestor/requestor_profile/change_avatar")
              }
            />
            <ProfileTab
              name="Change Password"
              onClick={() =>
                navigate("/requestor/requestor_profile/change_password")
              }
            />
          </div>
        </ContentAndHeader>
      </ProfileInformationBox>
    </div>
  );
}
