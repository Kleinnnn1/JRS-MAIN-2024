import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png";
import iconProfile from "../../../assets/images/iconProfile.png";
import iconHistory from "../../../assets/images/iconHistory.png";
import iconSend from "../../../assets/images/iconSend.png";
import iconOngoing from "../../../assets/images/iconOngoing.png";
import { useNavigate } from "react-router-dom";

export default function StaffSidebar() {
  const navigate = useNavigate();
  return (
    <>
      <SidebarItem
        name="Dashboard"
        image={iconHome}
        onClick={() => navigate("")}
      />
      {/* <SidebarItem
             name="Profile"     
             onClick={() => navigate("/Staff/Staffprofile")}
            image={iconProfile}
        /> */}
      <SidebarItem
        name="My Ongoing Task"
        onClick={() => navigate("/Staff/StaffImagePage")}
        image={iconOngoing}
      />
      <SidebarItem
        name="Send Certificate"
        onClick={() => navigate("/Staff/StaffSendCert")}
        image={iconSend}
      />
      <SidebarItem
        name="History"
        onClick={() => navigate("/Staff/History")}
        image={iconHistory}
      />
    </>
  );
}
