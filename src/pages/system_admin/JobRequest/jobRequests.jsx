import 'remixicon/fonts/remixicon.css';
import ContentJobRequest from './ContentJobRequests';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';
import { Outlet, useOutlet } from "react-router-dom";

export default function SysAdminJob_requests() {
    const otherContent = useOutlet(); // Get the current outlet
    return (
        <div className="text-gray-800 font-inter">
             <div className="flex items-center rounded bg-custom-blue m-2 p-2">
                <img src={userIcon} alt="UserIcon" className="w-9 h-9 ml-4" />
                <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>JOB REQUESTS</p>
            </div>
            
            {otherContent ? (
                <Outlet /> // Render nested routes if present
            ) : (
                <ContentJobRequest />
            )}
        </div>
    );
}
