import SidebarItem from "../../../components/SidebarItem";
import iconHome from "../../../assets/images/iconHome.png";
import iconRequest from "../../../assets/images/iconRequest.png";
import iconProfile from "../../../assets/images/iconProfile.png";
import { useNavigate } from "react-router-dom";

export default function StaffSidebar() {
    const navigate = useNavigate();
        return (
        <>
          <SidebarItem 
            name="Dashboard" 
            image={iconHome}
            onClick={() => navigate("")}
           
          />
             <SidebarItem
             name="Profile"     
             onClick={() => navigate("/Staff/Staffprofile")}
            image={iconProfile}
        />
            <SidebarItem
             name="My Ongoing Task"     
             onClick={() => navigate("/Staff/ongoing")}
             image={iconRequest}
        />
            <SidebarItem
             name="History"     
             onClick={() => navigate("/Staff/CompletedStaff")}
            image={iconRequest}
        />
          
          </>
        );
}