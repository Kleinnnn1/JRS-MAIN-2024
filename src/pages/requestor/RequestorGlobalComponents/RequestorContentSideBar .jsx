import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png";         // HOME ICON
import iconProfile from "../../../assets/images/iconProfile.png";   // PROFILE ICON
import iconRequest from "../../../assets/images/iconRequestHistory.png";   // REQUEST ICON
import iconSchedule from "../../../assets/images/iconSchedule.png"; //SCHEDULE ICON
import iconLogout from "../../../assets/images/iconLogoutSideBar.png";
import { useNavigate } from "react-router-dom";

export default function ContentRequestorSideBar() {
  const navigate = useNavigate();

  return (
    <>
    {/* HOME ICON */}
      <SidebarItem
        name="Home"
        image={iconHome}
        onClick={() => navigate("/requestor/home")}
      />
    {/* MY PROFILE ICON*/}
      <SidebarItem
        name="My Profile"
        onClick={() => navigate("/")}
        image={iconProfile}
      />
    {/* SCHEDULES*/}
      <SidebarItem
        name="Schedules"
        onClick={() => navigate("/")}
        image={iconSchedule}
      />
      {/* REQUEST */}
      <SidebarItem
        name="Request"
        onClick={() => navigate("/requestor/job_request")}
        image={iconRequest}
      />
      {/* LOGOUT */}
      <SidebarItem
        name="Logout"
        onClick={() => navigate("/")}
        image={iconLogout}
      />
    </>
  );
}
