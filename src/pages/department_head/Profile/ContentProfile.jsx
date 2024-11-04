import ContentAndHeader from "./ContentAndHeader";
import ProfileInformationBox from "./ProfileInformationBox";
import ProfileTab from "./ProfileTab";
import UserInformation from "./UserInformation";
import { useNavigate, Outlet, useOutlet, useLocation } from "react-router-dom";

export default function ContentProfile() {
  const navigate = useNavigate();
  const location = useLocation();
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
              className={
                location.pathname === "/department_head/myprofile/user_account"
                  ? "font-bold"
                  : ""
              }
              onClick={() =>
                navigate("/department_head/myprofile/user_account")
              }
            />
            <ProfileTab
              name="Change Avatar"
              className={
                location.pathname === "/department_head/myprofile/change_avatar"
                  ? "font-bold"
                  : ""
              }
              onClick={() =>
                navigate("/department_head/myprofile/change_avatar")
              }
            />
            <ProfileTab
              name="Change Password"
              className={
                location.pathname ===
                "/department_head/myprofile/change_password"
                  ? "font-bold"
                  : ""
              }
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
