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
  FaHistory,
  FaAward,
  FaHourglassHalf,
  FaSyncAlt,
  FaPlayCircle,
  FaLightbulb,
  FaFileAlt,
  FaUsers,
  FaTasks,
  FaChartPie,
} from "react-icons/fa";

export default function DepartmentHeadDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
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
                {userMetadata.deptName || "No department"}
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
          profileLink="/department_head/myprofile"
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
    { icon: <FaHome />, label: "Home", path: "/department_head/dashboard" },
    { icon: <FaTasks />, label: "Job Request", path: "/department_head/job_request" },
    { icon: <FaSyncAlt  />, label: "Job Ongoing", path: "/department_head/job_ongoing" },
    { icon: <FaCheckCircle />, label: "Job Completed", path: "/department_head/job_completed" },
    { icon: <FaUsers />, label: "Staff", path: "/department_head/employee" },
    { icon: <FaChartPie />, label: "Report", path: "/department_head/report" },
    { icon: <FaHistory />, label: "History", path: "/department_head/history" },
    { icon: <FaAward />, label: "Certificate of Job Completion", path: "/department_head/approving_of_job_completion" },
    { icon: <FaFileAlt />, label: "My Request", path: "/department_head/make_requestDeptHead" },
    { icon: <FaLightbulb  />, label: "Add Keyword", path: "/department_head/add_keyword" },
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
