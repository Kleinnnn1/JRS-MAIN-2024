import { Outlet, useOutlet } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Logo from "../../../components/Logo";
import ProfileRequestor from "../RequestorGlobalComponents/RequestorProfile";
import ContentRequestorSideBar from "../RequestorGlobalComponents/RequestorContentSideBar ";
import HorizontalNavBar from "../RequestorGlobalComponents/RequestorHorizontalNavbar";
import RequestorMainBody from "../Dashboard/RequestorMainBody";
import ContentDashboard from "./RequestorContentDashboard";

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
                <HorizontalNavBar />
                {otherContent ? <Outlet /> : <ContentDashboard />}
            </RequestorMainBody>
        </div>
    );
}