import SysadminDashboard from "./SysadminDashboard";
import MainBody from "../MainBody";
import ReusableHeader from "../../../components/ReusableHeader";
import profilePic from "/src/assets/images/SysAdIcons/Saturo_Gojo.png";
import { Outlet, useOutlet } from "react-router-dom";
import ContentSideBar from "../components/ContentSideBar";
import SideBar from "../../../components/SideBar";
import Logo from "../../../components/Logo";
import Profile from "./Profile";
import HorizontalNavBar from "../../../components/HorizontalNavBar";

export default function SystemAdDashboard() {
  const otherContent = useOutlet();

  return (
    <>
      <SideBar>
        <Logo />
        <div>
          <Profile />
        </div>
        <ContentSideBar />
      </SideBar>

      <MainBody>
        <HorizontalNavBar profileRoute="/system_admin/myprofile" />
        {/* <ReusableHeader
          profilePicture={profilePic}
          username="Leokanette"
          profileLink="/system_admin/myprofile"
        /> */}

        {otherContent ? <Outlet /> : <SysadminDashboard />}
      </MainBody>
    </>
  );
}
