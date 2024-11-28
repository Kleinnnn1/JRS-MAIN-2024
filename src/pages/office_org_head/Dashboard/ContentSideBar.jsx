import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png";
import iconProfile from "../../../assets/images/iconProfile.png";
import iconRequest from "../../../assets/images/iconRequest.png";
import iconEmployee from "../../../assets/images/iconEmployee.png";
import iconReport from "../../../assets/images/iconReport.png";
import iconDate from "../../../assets/images/iconDate.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function ContentSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  const isActive = (path) => {
    return (
      currentPath === path ||
      (path !== "/office_head" && currentPath.startsWith(path))
    );
  };

  return (
    <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <SidebarItem
        name="Home"
        image={iconHome}
        onClick={() => navigate("/office_head/dashboard")}
        bold={isActive("/office_head/dashboard")}
      />
      <SidebarItem
        name="My Profile"
        onClick={() => navigate("/office_head/myprofile")}
        image={iconProfile}
        bold={isActive("/office_head/myprofile")}
      />
      {/* <SidebarItem
        name="Job Request"
        onClick={() => navigate("/office_head/job_request")}
        image={iconRequest}
        bold={isActive("/office_head/job_request")}
      /> */}
      <SidebarItem
        name="Staff"
        onClick={() => navigate("/office_head/staff")}
        image={iconEmployee}
        bold={isActive("/office_head/staff")}
      />
      {/* <SidebarItem
        name="Approve Staff"
        onClick={() => navigate("/office_head/approve_employee")}
        image={iconEmployee}
        bold={isActive("/office_head/approve_employee")}
      /> */}
      <SidebarItem
        name="Report"
        onClick={() => navigate("/office_head/report")}
        image={iconReport}
        bold={isActive("/office_head/report")}
      />
      {/* <SidebarItem
        name="Referral"
        onClick={() => navigate("/office_head/referral")}
        image={iconReport}
        bold={isActive("/office_head/referral")}
      /> */}
      {/* <SidebarItem
        name="History"
        onClick={() => navigate("/office_head/history")}
        image={iconDate}
        bold={isActive("/office_head/history")}
      /> */}
      <SidebarItem
        name="My Request"
        onClick={() => navigate("/office_head/my_requests")}
        image={iconRequest}
        bold={isActive("/office_head/my_requests")}
      />
      {/*Create new user */}
      <SidebarItem
        name="Approve Staff"
        onClick={() => navigate("/office_head/approve_staff")}
        image={iconRequest}
        bold={isActive("/office_head/approve_staff")}
      />
      {/*add new keyword */}
    </div>
  );
}
