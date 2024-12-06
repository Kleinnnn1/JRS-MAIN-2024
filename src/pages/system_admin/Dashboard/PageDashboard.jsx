import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo";
import ReusableHeader from "../../../components/ReusableHeader";
import useUserStore from "../../../store/useUserStore";
import DefaultImageUser from "/src/assets/images/DefaultImageUser.jpg";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaHome,
  FaCheckCircle,

  FaSyncAlt,

  FaTasks,
  FaChartPie,
} from "react-icons/fa";

export default function SystemAdDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userMetadata } = useUserStore();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === "/system_admin") {
      navigate("/system_admin/home", { replace: true });
    }
  }, [currentPath, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen text-gray-800 font-inter">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-custom-blue text-white flex flex-col transition-all duration-300 overflow-auto no-scrollbar`}
      >
        {/* Logo and Collapse Button */}
        <div className="flex justify-between items-center p-4">
          {!isSidebarCollapsed && <Logo className="-left-10" />}
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? (
              <FaAngleDoubleRight size={24} />
            ) : (
              <FaAngleDoubleLeft size={24} />
            )}
          </button>
        </div>

        {/* Profile Section */}
        <div
          className={`flex flex-col m-2 items-center transition-all duration-300 ${
            isSidebarCollapsed ? "space-y-0" : "space-y-1"
          }`}
        >
          <div></div>
          <img
            src={userMetadata.avatar || DefaultImageUser}
            alt="Profile"
            className={`rounded-full transition-all duration-300 ${
              isSidebarCollapsed ? "w-12 h-12" : "w-16 h-16"
            }`}
          />
          {!isSidebarCollapsed && (
            <div className="text-center">
              <h2 className="text-sm font-medium">
                {userMetadata.fName} {userMetadata.lName}
              </h2>
              <p className="text-xs text-gray-300">
                {/* {userMetadata.deptName || "No department"} */}
              </p>
              <p className="text-xs text-gray-300">{userMetadata.role || "No Role"}</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <SidebarMenu
          isSidebarCollapsed={isSidebarCollapsed}
          navigate={navigate}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <ReusableHeader
          username={userMetadata.fName}
          profileLink="/system_admin/myprofile"
        />
        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const SidebarMenu = ({ isSidebarCollapsed, navigate }) => {
  const menuItems = [
    { icon: <FaHome />, label: "Home", path: "/system_admin/home" },
    { icon: <FaTasks />, label: "Users", path: "/system_admin/Users" },
    { icon: <FaSyncAlt  />, label: "Department", path: "/system_admin/Departments" },
    { icon: <FaCheckCircle />, label: "History", path: "/system_admin/History" },
    { icon: <FaChartPie />, label: "Report", path: "/system_admin/Reports" },
  ];

  return (
    <ul className="mb-20 space-y-4 p-4">
      <div className="mb-5"></div>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`flex items-center space-x-4 hover:bg-blue-700 p-2 rounded cursor-pointer ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
          onClick={() => navigate(item.path)}
        >
          <span className="text-2xl">{item.icon}</span>
          {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
        </li>
      ))}
    </ul>
  );
};
