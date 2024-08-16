import 'remixicon/fonts/remixicon.css';
import userIcon from "/src/assets/images/SysAdIcons/userIcon.png";
import UserType from "/src/pages/system_admin/Users/UserType"; // Capitalize the component name
import { Outlet, useOutlet } from "react-router-dom";


export default function UsersPage() {
    const otherContent = useOutlet(); // Get the current outlet
    return (
        <div className="text-gray-800 font-inter">
            <div className="flex items-center rounded bg-custom-blue m-2 p-2">
                <img src={userIcon} alt="UserIcon" className="w-9 h-9 ml-4" />
                <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>MANAGE USERS</p>
            </div>
            {otherContent ? (
                <Outlet /> // Render nested routes if present
            ) : (
                <UserType />
            )}
            
        </div>
    );
}
