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
  FaTasks,
  FaCheckCircle,
  FaSyncAlt,
  FaHistory,
  FaAward,
  FaChartPie,
  FaUsers,
  FaFileAlt,
  FaLightbulb,
} from "react-icons/fa";

export default function DepartmentHeadDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { userMetadata } = useUserStore();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === "/department_head") {
      navigate("/department_head/dashboard", { replace: true });
    }
  }, [currentPath, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex bg-slate-200 h-screen text-gray-800 font-inter">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-custom-blue text-white flex flex-col transition-all duration-300 overflow-auto no-scrollbar`}
      >
        {/* Logo and Collapse Button */}
        <div
          className={`flex  items-center ${
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
          className={`flex flex-col mb-10 items-center ${
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
          className={`border-t border-gray-300 my-2 mx-2 ${
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
          profileLink="/department_head/myprofile"
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
    { icon: <FaHome />, label: "Home", path: "/department_head/dashboard" },
    {
      icon: <FaTasks />,
      label: "Job Request",
      path: "/department_head/job_request",
    },
    {
      icon: <FaSyncAlt />,
      label: "Job Ongoing",
      path: "/department_head/job_ongoing",
    },
    {
      icon: <FaCheckCircle />,
      label: "Job Completed",
      path: "/department_head/job_completed",
    },
    { icon: <FaUsers />, label: "Staff", path: "/department_head/employee" },
    { icon: <FaChartPie />, label: "Report", path: "/department_head/report" },
    // { icon: <FaHistory />, label: "History", path: "/department_head/history" },
    {
      icon: <FaAward />,
      label: "Certificate of Job Completion",
      path: "/department_head/approving_of_job_completion",
    },
    {
      icon: <FaFileAlt />,
      label: "My Request",
      path: "/department_head/my_request",
    },
    {
      icon: <FaCheckCircle />,
      label: "My Completed Request",
      path: "/department_head/my_request/completed",
    },
    {
      icon: <FaLightbulb />,
      label: "Add Keyword",
      path: "/department_head/add_keyword",
    },
  ];

  return (
    <ul className="space-y-4 p-4">
      <div></div>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`flex items-center space-x-4 p-2 rounded cursor-pointer ${
            currentPath === item.path
              ? "bg-yellow-100 text-black"
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
