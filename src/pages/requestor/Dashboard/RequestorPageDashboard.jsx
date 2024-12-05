import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BsHouseDoor,
  BsCalendar,
  BsClockHistory,
  BsFileText,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import Logo from "../../../components/Logo";
import ReusableHeader from "../../../components/ReusableHeader";
import RequestorMainBody from "../Dashboard/RequestorMainBody";
import profilePic from "../../../assets/images/BabyKaren.jpg";
import useUserStore from "../../../store/useUserStore";
import DefaultImageUser from "/src/assets/images/DefaultImageUser.jpg";

export default function RequestorDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); // State for sidebar collapse
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate to different routes
  const { userMetadata } = useUserStore();
  const currentPath = location.pathname;

  // Redirect to /requestor/home when the dashboard is mounted and no specific route is visited
  useEffect(() => {
    if (currentPath === "/requestor") {
      navigate("/requestor/home", { replace: true });
    }
  }, [currentPath, navigate]);

  const isActive = (path) => {
    // Check if the current path is exactly the path or is a nested route under it
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed); // Toggle sidebar state
  };

  return (
    <div className="flex h-screen text-gray-800 font-inter">
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-custom-blue text-white flex flex-col transition-all duration-300 overflow-auto no-scrollbar`}
      >
        {/* Logo and Collapse Button */}
        <div className="flex justify-between p-4">
          {!isSidebarCollapsed && <Logo className="-left-10" />}
          <button
            className="text-white from-neutral-900 focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? (
              <BsChevronDoubleLeft size={24} />
            ) : (
              <BsChevronDoubleRight size={24} />
            )}
          </button>
        </div>

        {/* Profile Section */}
        <div
          className={`flex flex-col items-center transition-all duration-300 ${
            isSidebarCollapsed ? "space-y-0" : "space-y-1"
          }`}
        >
          {/* Profile Picture */}
          <img
            src={userMetadata.avatar || DefaultImageUser}
            alt="Profile"
            className={`rounded-full transition-all duration-300 ${
              isSidebarCollapsed ? "w- h-12" : "w-16 h-16"
            }`}
          />
          {/* Profile Details */}
          {!isSidebarCollapsed && (
            <div className="text-center">
              <h2 className="text-sm font-medium">
                {userMetadata.fName} {userMetadata.lName}
              </h2>
              <p className="text-xs text-gray-300">
                {userMetadata.deptName || "No department"}
              </p>
              <p className="text-xs text-gray-300">Requestor</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 space-y-4 overflow-auto no-scrollbar">
          <SidebarMenu
            isSidebarCollapsed={isSidebarCollapsed}
            navigate={navigate}
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <ReusableHeader
          profilePicture={profilePic}
          username="Karen"
          profileLink="/requestor/requestor_profile"
        />
        {/* Main Content */}
        <RequestorMainBody>
          <Outlet />
        </RequestorMainBody>
      </div>
    </div>
  );
}

const SidebarMenu = ({ isSidebarCollapsed, navigate }) => {
  const menuItems = [
    { icon: <BsHouseDoor />, label: "Home", path: "/requestor/home" },
    { icon: <BsCalendar />, label: "Schedules", path: "/requestor/requestor_schedule" },
    { icon: <BsClockHistory />, label: "History", path: "/requestor/job_request_history" },
    { icon: <BsFileText />, label: "My Requests", path: "/requestor/job_request" },
  ];

  return (
    <ul className="mb-20 space-y-4 p-4">
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
