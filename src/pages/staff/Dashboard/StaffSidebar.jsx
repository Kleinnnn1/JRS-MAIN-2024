import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png";
import iconRequest from "../../../assets/images/iconRequest.png";
import iconProfile from "../../../assets/images/iconProfile.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function StaffSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  const isActive = (path) => {
    return (
      currentPath === path ||
      (path !== "/staff" && currentPath.startsWith(path))
    );
  };
        return (
        <>
          <SidebarItem 
            name="Dashboard" 
            image={iconHome}
            onClick={() => navigate("/staff/home")}
            bold={isActive("/staff/home")}
           
          />
             <SidebarItem
             name="Profile"     
             onClick={() => navigate("/Staff/Staffprofile")}
             image={iconProfile}
             bold={isActive("/Staff/Staffprofile")}
        />
            <SidebarItem
             name="My Ongoing Task"     
             onClick={() => navigate("/Staff/ongoing")}
             image={iconRequest}
             bold={isActive("/Staff/ongoing")}
        />
            <SidebarItem
             name="History"     
             onClick={() => navigate("/Staff/CompletedStaff")}
            image={iconRequest}
            bold={isActive("/Staff/CompletedStaff")}
        />
          
          </>
        );
}