import SysadminDashboard from "./SysadminDashboard";
import MainBody from "./MainBody";
import { Outlet, useOutlet } from "react-router-dom";

export default function SystemAdDashboard (){
    const otherContent = useOutlet();

    return(

        <MainBody>
        {otherContent ? <Outlet /> : <SysadminDashboard />}
      </MainBody>
    );

}