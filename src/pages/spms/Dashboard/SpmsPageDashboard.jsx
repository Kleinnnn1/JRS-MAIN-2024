import { Outlet, useOutlet } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Logo from "../../../components/Logo";
import HorizontalNavBar from "../../../components/HorizontalNavBar";
import SPMSContentSideBar from "./SPMSContentSideBar";
import ProfileSPMS from "./SPMSProfile";
import SPMSMainBody from "./SPMSMainBody";
import ContentDashboard from "./SPMSContentDashboard";


export default function SPMSDashboard() {
  const otherContent = useOutlet();

  return (
    <div className="text-gray-800 font-inter">
      <SideBar>
        <Logo />
        <ProfileSPMS />
        <SPMSContentSideBar />
      </SideBar>
      <SPMSMainBody>
        <HorizontalNavBar profileRoute="" />
        <h1 className="justify-items-center"> SPMS </h1>
        {otherContent ? <Outlet /> : <ContentDashboard />}
      </SPMSMainBody>
    </div>
  );
}
