import Logo from "../../../components/Logo";
import Profile from "./Profile";
import HorizontalNavBar from "../../../components/HorizontalNavBar";
import SideBar from "../../../components/SideBar";
import MainBody from "./MainBody";
import { useOutlet, Outlet } from "react-router-dom";

import ContentDashboard from "./ContentDashboard";
import ContentSideBar from "./ContentSideBar";

export default function DepartmentHeadDashboard() {
  const otherContent = useOutlet();

  return (
    <div className="text-gray-800 font-inter">
      <SideBar>
        <Logo />
        <Profile />
        <ContentSideBar />
      </SideBar>

      <MainBody>
        <HorizontalNavBar />
        {otherContent ? <Outlet /> : <ContentDashboard />}
      </MainBody>
    </div>
  );
}
