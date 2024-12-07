import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaCheckCircle,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Logo from "../../../components/Logo";
import ReusableHeader from "../../../components/ReusableHeader";
import useUserStore from "../../../store/useUserStore";
import DefaultImageUser from "/src/assets/images/DefaultImageUser.jpg";

export default function SPMSDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); // Sidebar starts expanded
  const location = useLocation();
  const navigate = useNavigate();
  const { userMetadata } = useUserStore();
  const currentPath = location.pathname;

  // Redirect to /spme/home when mounted at /spme
  useEffect(() => {
    if (currentPath === "/spme") {
      navigate("/spme/home", { replace: true });
    }
  }, [currentPath, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-slate-200 text-gray-800 font-inter">
      {/* Sidebar */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        userMetadata={userMetadata}
        currentPath={currentPath}
        navigate={navigate}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <ReusableHeader
          username={userMetadata?.fName || "User"}
          profileLink="/spme/spme_profile"
        />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const Sidebar = ({ isSidebarCollapsed, toggleSidebar, userMetadata, currentPath, navigate }) => {
  return (
    <div
      className={`${isSidebarCollapsed ? "w-20" : "w-64"
        } bg-custom-blue rounded-br-xl text-white flex flex-col transition-all duration-300 overflow-auto no-scrollbar`}
    >
      {/* Logo and Collapse Button */}
      <div
        className={`flex mb-2 items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"
          } p-4`}
      >
        {!isSidebarCollapsed && <Logo />}
        <button className="text-white focus:outline-none" onClick={toggleSidebar}>
          {isSidebarCollapsed ? (
            <FaAngleDoubleRight size={24} />
          ) : (
            <FaAngleDoubleLeft size={24} />
          )}
        </button>
      </div>

      {/* Profile Section */}
      <ProfileSection isSidebarCollapsed={isSidebarCollapsed} userMetadata={userMetadata} />


      {/* Divider Below Profile */}
      <div
        className={`border-t border-gray-300 my-2 mx-2 ${isSidebarCollapsed ? "hidden" : ""
          }`}
      ></div>

      {/* Menu Items */}
      <SidebarMenu
        isSidebarCollapsed={isSidebarCollapsed}
        currentPath={currentPath}
        navigate={navigate}
      />
    </div>
  );
};

const ProfileSection = ({ isSidebarCollapsed, userMetadata }) => (
  <div
    className={`flex flex-col -mt-5 items-center m-4 ${isSidebarCollapsed ? "hidden" : "block"
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
);

const SidebarMenu = ({ isSidebarCollapsed, currentPath, navigate }) => {
  const menuItems = [
    { icon: <FaHome />, label: "Home", path: "/spme/home" },
    { icon: <FaTasks />, label: "My Requests", path: "/spme/make_requestSpme" },
    { icon: <FaCheckCircle />, label: "Download", path: "/spme/download" },
  ];

  return (
    <ul className="space-y-4 p-4">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`flex m-1 items-center space-x-4 p-2 rounded cursor-pointer ${currentPath === item.path ? "bg-yellow-100 text-black" : "hover:bg-gray-700"
            }`}
          onClick={() => navigate(item.path)}
        >
          <span className={`text-2xl ${currentPath === item.path ? "text-black" : "text-white"}`}>
            {item.icon}
          </span>
          <span
            className={`text-sm transition-all duration-300 ${isSidebarCollapsed
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
