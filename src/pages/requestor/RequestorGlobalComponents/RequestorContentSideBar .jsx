import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png";         // HOME ICON
import iconProfile from "../../../assets/images/iconProfile.png";   // PROFILE ICON
import iconRequest from "../../../assets/images/iconRequestHistory.png";   // REQUEST ICON
import iconSchedule from "../../../assets/images/iconSchedule.png"; // SCHEDULE ICON
import iconLogout from "../../../assets/images/iconLogoutSideBar.png";  // LOGOUT
import iconHistory from "../../../assets/images/iconHistory.png"; // HISTORY

export default function ContentRequestorSideBar() {
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
        image={iconHome}
        onClick={() => navigate("/requestor/home")}
        isActive={isActive("/requestor/home")}
      />
      {/* MY PROFILE ICON */}
      <SidebarItem
        name="My Profile"
        onClick={() => navigate("/requestor/requestor_profile")}
        image={iconProfile}
        isActive={isActive("/requestor/requestor_profile")}
      />
      {/* SCHEDULES */}
      <SidebarItem
        name="Schedules"
        onClick={() => navigate("/requestor/requestor_schedule")}
        image={iconSchedule}
        isActive={isActive("/requestor/requestor_schedule")}
      />
      {/* HISTORY */}
      <SidebarItem
        name="History"
        onClick={() => navigate("/requestor/job_request_history")}
        image={iconHistory}
        isActive={isActive("/requestor/job_request_history")}
      />
      {/* REQUEST */}
      <SidebarItem
        name="Request"
        onClick={() => navigate("/requestor/job_request")}
        image={iconRequest}
        isActive={isActive("/requestor/job_request")}
      />
    </>
  );
}
