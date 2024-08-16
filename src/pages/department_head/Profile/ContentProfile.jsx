import ContentAndHeader from "./ContentAndHeader";
import ProfileImageBox from "./ProfileImageBox";
import ProfileInformationBox from "./ProfileInformationBox";
import ProfileTab from "./ProfileTab";
import UserInformation from "./UserInformation";
import { useNavigate, Outlet, useOutlet } from "react-router-dom";

export default function ContentProfile() {
  const navigate = useNavigate();
  const otherContent = useOutlet();
  return (
    <div className="flex justify-between items-start">
      <ProfileImageBox />

      <ProfileInformationBox>
        <ContentAndHeader
          content={otherContent ? <Outlet /> : <UserInformation />}
        >
          <div className="flex justify-end space-x-4">
            <ProfileTab
              name="User Account"
              onClick={() =>
                navigate("/department_head/myprofile/user_account")
              }
            />
            <ProfileTab
              name="Change Avatar"
              onClick={() =>
                navigate("/department_head/myprofile/change_avatar")
              }
            />
            <ProfileTab
              name="Change Password"
              onClick={() =>
                navigate("/department_head/myprofile/change_password")
              }
            />
          </div>
        </ContentAndHeader>
      </ProfileInformationBox>
    </div>
  );
}
