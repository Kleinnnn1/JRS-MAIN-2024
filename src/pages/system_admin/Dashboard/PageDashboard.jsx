import SysadminDashboard from "./SysadminDashboard";
import MainBody from "../MainBody";
import SysAdminHeader from "../components/sysadminHeader";
import SysAdminSidebar from "../components/SysAdminSidebar";
import { Outlet, useOutlet } from "react-router-dom";

export default function SystemAdDashboard (){
    const otherContent = useOutlet();

    return(
        <>
        <SysAdminSidebar />
    
        <MainBody>
        <SysAdminHeader/>
        {otherContent ? <Outlet /> : <SysadminDashboard />}
      </MainBody>
     
      </>  
    );

}