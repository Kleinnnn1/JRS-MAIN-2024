import 'remixicon/fonts/remixicon.css';
import userIcon from "/src/assets/images/SysAdIcons/userIcon.png";
import UserType from "/src/pages/system_admin/Users/UserType"; // Capitalize the component name
import { Outlet, useOutlet } from "react-router-dom";
import SearchBar from '../../../components/SearchBar';

export default function SysAdminUsersPage() {
    const otherContent = useOutlet(); // Get the current outlet
    return (
        <div className="text-gray-800 font-inter">
             <SearchBar title="Users" />
            {otherContent ? (
                <Outlet /> // Render nested routes if present
            ) : (
                <UserType />
            )}
            
        </div>
    );
}
