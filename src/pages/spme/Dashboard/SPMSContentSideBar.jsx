import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png"; // HOME ICON
import iconProfile from "../../../assets/images/iconProfile.png"; // PROFILE ICON
import iconRequest from "../../../assets/images/iconRequestHistory.png"; // REQUEST ICON
import iconSchedule from "../../../assets/images/iconSchedule.png"; // SCHEDULE ICON
import iconHistory from "../../../assets/images/iconHistory.png"; // HISTORY

export default function SPMSContentSideBar() {
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate to different routes

  const currentPath = location.pathname;

  const isActive = (path) => {
    // Check if the current path is exactly the path or is a nested route under it
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <>
      {/* HOME ICON */}
      <SidebarItem
        name="Home"
        onClick={() => navigate("/spme")}
        image={iconHome}
        isActive={isActive("/spme")}
      />
      {/* Make request ICON*/}
      <SidebarItem
        name="Make Request"
        onClick={() => navigate("/spme/make_requestSpme")}
        image={iconProfile}
        isActive={isActive("/spme/make_requestSpme")}
      />
      {/* MY PROFILE ICON */}
      <SidebarItem
        name="Download Report"
        onClick={() => navigate("")}
        image={iconProfile}
        isActive={isActive("/requestor/requestor_profile")}
      />

      {/* SCHEDULES */}
      {/* <SidebarItem
        name="Schedules"
        onClick={() => navigate("/requestor/requestor_schedule")}
        image={iconSchedule}
        isActive={isActive("/requestor/requestor_schedule")}
      /> */}
      {/* HISTORY */}
      {/* <SidebarItem
        name="Reports"
        onClick={() => navigate("/requestor/job_request_history")}
        image={iconHistory}
        isActive={isActive("#")}
      />  */}
      {/* REQUEST */}
      {/* <SidebarItem
        name="Request"
        onClick={() => navigate("/requestor/job_request")}
        image={iconRequest}
        isActive={isActive("/requestor/job_request")}
      /> */}
    </>
  );
}
