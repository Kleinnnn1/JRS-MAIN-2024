import ContentAndHeader from "./StaffContentHeader";
import ProfileInformationBox from "./StaffProfileInformationBox";
import ProfileTab from "./StaffProfileTab";
import UserInformation from "./StaffUserInfo";
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
              name="Profile"
              onClick={() => navigate("/Staff/Staffprofile")}
            />
            <ProfileTab
              name="Change Avatar"
              onClick={() => navigate("/Staff/Staffprofile/Staffchange_avatar")}
            />
            <ProfileTab
              name="Change Password"
              onClick={() =>
                navigate("/Staff/Staffprofile/Staffchange_password")
              }
            />
          </div>
        </ContentAndHeader>
      </ProfileInformationBox>
    </div>
  );
}
