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
      (path !== "/department_head" && currentPath.startsWith(path))
    );
  };
  return (
    <>
      <SidebarItem
        name="Home"
        image={iconHome}
        onClick={() => navigate("/department_head/dashboard")}
        bold={isActive("/department_head/dashboard")}
      />
      {/* <SidebarItem
        name="My Profile"
        onClick={() => navigate("/department_head/myprofile")}
        image={iconProfile}
        bold={isActive("/department_head/myprofile")}
      /> */}
      <SidebarItem
        name="Job Request"
        onClick={() => navigate("/department_head/job_request")}
        image={iconRequest}
        bold={isActive("/department_head/job_request")}
      />
      <SidebarItem
        name="Job Ongoing"
        onClick={() => navigate("/department_head/job_ongoing")}
        image={iconRequest}
        bold={isActive("/department_head/job_ongoing")}
      />
      <SidebarItem
        name="Job Completed"
        onClick={() => navigate("/department_head/job_completed")}
        image={iconRequest}
        bold={isActive("/department_head/job_completed")}
      />

      <SidebarItem
        name="Staff"
        onClick={() => navigate("/department_head/employee")}
        image={iconEmployee}
        bold={isActive("/department_head/employee")}
      />
      <SidebarItem
        name="Approve Staff"
        onClick={() => navigate("/department_head/approve_employee")}
        image={iconEmployee}
        bold={isActive("/department_head/approve_employee")}
      />
      <SidebarItem
        name="Report"
        onClick={() => navigate("/department_head/report")}
        image={iconReport}
        bold={isActive("/department_head/report")}
      />
      {/* <SidebarItem
        name="Referral"
        onClick={() => navigate("/department_head/referral")}
        image={iconReport}
        bold={isActive("/department_head/referral")}
      /> */}
      <SidebarItem
        name="History"
        onClick={() => navigate("/department_head/history")}
        image={iconDate}
        bold={isActive("/department_head/history")}
      />
      <SidebarItem
        name="Certificate of Job Completion"
        onClick={() => navigate("/department_head/approving_of_job_completion")}
        image={iconRequest}
        bold={isActive("/department_head/approving_of_job_completion")}
      />
       <SidebarItem
        name="My Request"
        onClick={() => navigate("/department_head/make_requestDeptHead")}
        image={iconRequest}
        bold={isActive("/department_head/make_requestDeptHead")}
      />
      {/*Create new user */}
      {/* <SidebarItem
        name="User"
        onClick={() => navigate("/department_head/user")}
        image={iconRequest}
        bold={isActive("/department_head/user")}
      /> */}
      {/*add new keyword */}
      <SidebarItem
        name="Add Keyword"
        onClick={() => navigate("/department_head/add_keyword")}
        image={iconRequest}
        bold={isActive("/department_head/user")}
      />
    </>
  );
}
