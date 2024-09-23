import { useNavigate, useLocation } from "react-router-dom";
import SettingsSidebarIcon from "/src/assets/images/SysAdIcons/settings.png";
import DepartmentSidebarIcon from "/src/assets/images/SysAdIcons/department.png";
import HistorySidebarIcon from "/src/assets/images/SysAdIcons/history.png";
import LogoutSidebarIcon from "/src/assets/images/SysAdIcons/logout.png";
import SideBarMenu from "./Logo";
import PersonIcon from "@mui/icons-material/Person";
import { FileOpen } from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import SideBarProfile from "./profile";

export default function Sidebar() {
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
    <div >
      <SideBarMenu />
      <SideBarProfile />

      <ul className="mt-2 space-y-2">
        <li>
          <div
            onClick={() => handleNavigation("/system_admin")}
            className={`flex items-center px-5 py-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer ${
              isActive("/system_admin")
                ? "bg-white-950 text-white font-bold"
                : ""
            }`}
          >
            <Home className="mr-5" />
            <span className="text-sm">Dashboard</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNavigation("/system_admin/Users")}
            className={`flex items-center px-5 py-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer ${
              isActive("/system_admin/Users")
                ? "bg-white-950 text-white font-bold"
                : ""
            }`}
          >
            <PersonIcon className="mr-5 text-gray-300" />
            <span className="text-sm">Users</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNavigation("/system_admin/Job_Requests")}
            className={`flex items-center px-5 py-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer ${
              isActive("/system_admin/Job_Requests")
                ? "bg-white-950 text-white font-bold"
                : ""
            }`}
          >
            <FileOpen className="mr-5 text-gray-300" />
            <span className="text-sm">Job Requests</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNavigation("/system_admin/Departments")}
            className={`flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer ${
              isActive("/system_admin/Departments")
                ? "bg-white-950 text-white font-bold"
                : ""
            }`}
          >
            <img
              src={DepartmentSidebarIcon}
              alt="Department Icon"
              className="w-12 h-11 mr-2"
            />
            <span className="text-sm">Department</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNavigation("/system_admin/History")}
            className={`flex items-center px-2 py-1 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer ${
              isActive("/system_admin/History")
                ? "bg-white-950 text-white font-bold"
                : ""
            }`}
          >
            <img
              src={HistorySidebarIcon}
              alt="History Icon"
              className="w-10 h-8 mr-4"
            />
            <span className="text-sm">History</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNavigation("/system_admin/Reports")}
            className={`flex items-center px-2 py-1 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer ${
              isActive("/system_admin/Reports")
                ? "bg-white-950 text-white font-bold"
                : ""
            }`}
          >
            <img
              src={SettingsSidebarIcon}
              alt="Reports Icon"
              className="w-10 h-8 mr-4"
            />
            <span className="text-sm">Reports</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNavigation("#")}
            className="flex items-center px-2 py-1 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md cursor-pointer"
          >
            <img
              src={LogoutSidebarIcon}
              alt="Logout Icon"
              className="w-9 h-8 mr-5"
            />
            <span className="text-sm">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
