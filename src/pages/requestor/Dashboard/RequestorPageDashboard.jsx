import { Outlet, useOutlet } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Logo from "../../../components/Logo";
import ProfileRequestor from "../RequestorGlobalComponents/RequestorProfile";
import ContentRequestorSideBar from "../RequestorGlobalComponents/RequestorContentSideBar ";
import ReusableHeader from "../../../components/ReusableHeader";
import RequestorMainBody from "../Dashboard/RequestorMainBody";
import ContentDashboard from "./RequestorContentDashboard";
import profilePic from "../../../assets/images/BabyKaren.jpg";
import HorizontalNavBar from "../../../components/HorizontalNavBar";
import { NotificationProvider } from "../../../components/NotificationContext";

export default function RequestorDashboard() {
  const otherContent = useOutlet();

  return (
    <div className="text-gray-800 font-inter">
      <SideBar>
        <Logo />
        <ProfileRequestor />
        <ContentRequestorSideBar />
      </SideBar>

      <RequestorMainBody>
        <HorizontalNavBar profileRoute="/requestor/requestor_profile" />
        {/* <ReusableHeader
                
                profilePicture={profilePic}
                username="Karen"
                profileLink="/requestor/requestor_profile"
                
                /> */}
        {otherContent ? <Outlet /> : 
         
         <ContentDashboard/>
       
        }
      </RequestorMainBody>
    </div>
  );
}
