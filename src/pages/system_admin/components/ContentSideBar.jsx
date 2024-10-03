import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "../../../components/SidebarItem";
import iconLogoutSideBar from "../../../assets/images/iconLogoutSideBar.png";
import iconReport from "../../../assets/images/iconReport.png";
import iconHome from "../../../assets/images/iconHome.png";
import iconRequest from "../../../assets/images/iconRequest.png";
import iconEmployee from "../../../assets/images/iconEmployee.png";
import iconFile from "../../../assets/images/iconFile.png";
import iconProfile from "../../../assets/images/iconProfile.png";

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
      (path !== "/system_admin" && currentPath.startsWith(path))
    );
  };

  return (
    <>
      <SidebarItem
        name="Dashboard"
        image={iconHome}
        onClick={() => handleNavigation("/system_admin")}
        bold={isActive("/system_admin")}
      />
      <SidebarItem
        name="Users"
        image={iconEmployee}
        onClick={() => handleNavigation("/system_admin/Users")}
        bold={isActive("/system_admin/Users")}
      />
      <SidebarItem
        name="Job Request"
        image={iconRequest}
        onClick={() => handleNavigation("/system_admin/Job_Requests")}
        bold={isActive("/system_admin/Job_Requests")}
      />
      <SidebarItem
        name="Department"
        image={iconProfile}
        onClick={() => handleNavigation("/system_admin/Departments")}
        bold={isActive("/system_admin/Departments")}
      />
      <SidebarItem
        name="History"
        image={iconFile}
        onClick={() => handleNavigation("/system_admin/History")}
        bold={isActive("/system_admin/History")}
      />
      <SidebarItem
        name="Reports"
        image={iconReport}
        onClick={() => handleNavigation("/system_admin/Reports")}
        bold={isActive("/system_admin/Reports")}
      />
      <SidebarItem
        name="Logout"
        image={iconLogoutSideBar}
        onClick={() => handleNavigation("/department_head/user")}
        bold={isActive("/department_head/user")}
      />
    </>
  );
}
