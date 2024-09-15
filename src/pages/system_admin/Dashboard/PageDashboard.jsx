import SysadminDashboard from "./SysadminDashboard";
import MainBody from "../MainBody";
import ReusableHeader from "../../../components/ReusableHeader";
import SysAdminSidebar from "../components/SysAdminSidebar";
import profilePic from '/src/assets/images/SysAdIcons/Saturo_Gojo.png';
import { Outlet, useOutlet } from "react-router-dom";

export default function SystemAdDashboard (){
    const otherContent = useOutlet();

    return(
        <>
        <SysAdminSidebar />
    
        <MainBody>
        <ReusableHeader
        profilePicture={profilePic}
        username="Leokanette"
        profileLink="/system_admin/myprofile"
        
        />
        
        {otherContent ? <Outlet /> : <SysadminDashboard />}
      </MainBody>
     
      </>  
    );

}