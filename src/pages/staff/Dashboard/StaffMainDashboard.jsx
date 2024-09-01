import Logo from "../../../components/Logo";
import Profile from "./StaffProfile";
import HorizontalNavBar from "../../../components/StaffHoriNavbar";
import SideBar from "../../../components/SideBar";
import StaffScreen from "./StaffScreen";
import { useOutlet, Outlet } from "react-router-dom";
import StaffContentDash from "./StaffContentDash";
import StaffSideBar from "./StaffSidebar";

export default function StaffMainDashboard() {
  const otherContent = useOutlet();

  return (
    <div className="text-gray-800 font-inter">
      <SideBar>
      <Logo />
      <Profile />
      <StaffSideBar />
     </SideBar>

      <StaffScreen>
        <HorizontalNavBar />
        {otherContent ? <Outlet /> : <StaffContentDash />}
      </StaffScreen>
    </div>
  );
}
