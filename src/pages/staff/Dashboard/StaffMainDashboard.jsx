import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaHome,
  FaTasks,
  FaFileAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaChartPie,
} from "react-icons/fa";
import Logo from "../../../components/Logo";
import ReusableHeader from "../../../components/ReusableHeader";
import useUserStore from "../../../store/useUserStore";
import DefaultImageUser from "/src/assets/images/DefaultImageUser.jpg";

export default function StaffMainDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userMetadata } = useUserStore();
  const currentPath = location.pathname;

  // Redirect to /staff/home when mounted at /staff
  useEffect(() => {
    if (currentPath === "/staff") {
      navigate("/staff/home", { replace: true });
    }
  }, [currentPath, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-slate-200 text-gray-800 font-inter">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-custom-blue rounded-br-xl text-white flex flex-col transition-all duration-300 overflow-auto no-scrollbar`}
      >
        {/* Logo and Collapse Button */}
        <div
          className={`flex mb-2 items-center ${
            isSidebarCollapsed ? "justify-center" : "justify-between"
          } p-4`}
        >
          {!isSidebarCollapsed && <Logo />}
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
          className={`flex flex-col -mt-5 items-center m-4 ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          <img
            src={userMetadata.avatar || DefaultImageUser}
            alt="Profile"
            className="rounded-full w-16 h-16"
          />
          <div className="text-center mt-2">
            <h2 className="text-sm font-medium">
              {userMetadata.fName} {userMetadata.lName}
            </h2>
            <p className="text-xs text-gray-300">
              {userMetadata.deptName || "No department"}
            </p>
            <p className="text-xs text-gray-300">
              {userMetadata.role || "No Role"}
            </p>
          </div>
        </div>

        {/* Divider Below Profile */}
        <div
          className={`border-t border-gray-300 my-4 mx-2 ${
            isSidebarCollapsed ? "hidden" : ""
          }`}
        ></div>

        {/* Menu Items */}
        <SidebarMenu
          isSidebarCollapsed={isSidebarCollapsed}
          currentPath={currentPath}
          navigate={navigate}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <ReusableHeader
          username={userMetadata.fName}
          profileLink="/staff/staff_profile"
        />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const SidebarMenu = ({ isSidebarCollapsed, currentPath, navigate }) => {
  const menuItems = [
    { icon: <FaHome />, label: "Home", path: "/staff/home" },
    { icon: <FaTasks />, label: "Assigned Job", path: "/staff/job_assigned" },
    {
      icon: <FaSyncAlt />,
      label: "Send Certificate",
      path: "/staff/StaffSendCert",
    },
    { icon: <FaCheckCircle />, label: "Completed", path: "/staff/Completed" },
    { icon: <FaFileAlt />, label: "My Request", path: "/staff/my_request" },
    { icon: <FaChartPie />, label: "Add Keyword", path: "/staff/add_keyword" },
  ];

  return (
    <ul className="space-y-4 p-4">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`flex m-1 items-center space-x-4 p-2 rounded cursor-pointer ${
            currentPath === item.path
              ? "bg-yellow-100 m-1 text-black"
              : "hover:bg-gray-700"
          }`}
          onClick={() => navigate(item.path)}
        >
          <span
            className={`text-2xl ${
              currentPath === item.path ? "text-black" : "text-white"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-sm transition-all duration-300 ${
              isSidebarCollapsed
                ? "opacity-0 translate-x-[-10px] pointer-events-none"
                : "opacity-100 translate-x-0"
            } ${currentPath === item.path ? "text-black" : "text-white"}`}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
};
