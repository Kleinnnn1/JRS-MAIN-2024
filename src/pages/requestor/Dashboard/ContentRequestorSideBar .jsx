import SidebarItem from "../../../components/SidebarItem";

import iconHome from "../../../assets/images/iconHome.png";         // HOME ICON
import iconProfile from "../../../assets/images/iconProfile.png";   // PROFILE ICON
import iconRequest from "../../../assets/images/iconRequest.png";   // REQUEST ICON
import iconEmployee from "../../../assets/images/iconEmployee.png"; // 
import iconReport from "../../../assets/images/iconReport.png";
import iconDate from "../../../assets/images/iconDate.png";
import { useNavigate } from "react-router-dom";

export default function ContentRequestorSideBar() {
  const navigate = useNavigate();

  return (
    <>
    {/* HOME ICON */}
      <SidebarItem
        name="Home"
        image={iconHome}
        onClick={() => navigate("/")}
      />
    {/* MY PROFILE ICON*/}
      <SidebarItem
        name="My Profile"
        onClick={() => navigate("/")}
        image={iconProfile}
      />
    {/* SCHEDULES*/}
      <SidebarItem
        name="Schedules"
        onClick={() => navigate("/")}
        image={iconRequest}
      />
      <SidebarItem
        name="Job Ongoing"
        onClick={() => navigate("/")}
        image={iconRequest}
      />
      <SidebarItem
        name="Job Completed"
        onClick={() => navigate("/")}
        image={iconRequest}
      />

      <SidebarItem
        name="Employee"
        onClick={() => navigate("/")}
        image={iconEmployee}
      />
      <SidebarItem
        name="Report"
        onClick={() => navigate("/")}
        image={iconReport}
      />
      <SidebarItem
        name="Referral"
        onClick={() => navigate("/")}
        image={iconReport}
      />
      <SidebarItem
        name="History"
        onClick={() => navigate("/")}
        image={iconDate}
      />
      <SidebarItem
        name="Certificate of Job Completion"
        onClick={() => navigate("/")}
        image={iconRequest}
      />
    </>
  );
}
