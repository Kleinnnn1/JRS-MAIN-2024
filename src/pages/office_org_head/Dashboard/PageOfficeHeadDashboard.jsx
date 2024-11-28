import Logo from "../../../components/Logo";
import Profile from "./Profile";
import ReusableHeader from "../../../components/ReusableHeader";
import SideBar from "../../../components/SideBar";
import HorizontalNavBar from "../../../components/HorizontalNavBar";
import MainBody from "./MainBody";
import { useOutlet, Outlet } from "react-router-dom";
import ContentDashboard from "./ContentDashboard";
import ContentSideBar from "./ContentSideBar";
import profilePic from "../../../assets/images/kennimg.jpg";

export default function OfficeHeadDashboard() {
  const otherContent = useOutlet();

  return (
    <div className="text-gray-800 font-inter">
      <SideBar>
        <Logo />
        <Profile />
        <ContentSideBar />
      </SideBar>

      <MainBody>
        <HorizontalNavBar profileRoute="/office_head/myprofile" />

        {/* <ReusableHeader
          profilePicture={profilePic}
          username="Kenneth"
          profileLink="/system_admin/myprofile"
        /> */}
        {otherContent ? <Outlet /> : <ContentDashboard />}
      </MainBody>
    </div>
  );
}
