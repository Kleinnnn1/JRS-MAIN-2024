import { useOutlet } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Logo from "../../../components/Logo";
import ProfileRequestor from "../Dashboard/ProfileRequestor";
import ContentRequestorSideBar from "../Dashboard/ContentRequestorSideBar ";

export default function RequestorDashboard() {
    const otherContent = useOutlet();

    return (
        <div className="text-gray-800 font-inter">
            <SideBar>
                <Logo />
                <ProfileRequestor />
                <ContentRequestorSideBar />
                
            </SideBar>
        </div>
    );
}