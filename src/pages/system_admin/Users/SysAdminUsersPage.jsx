import { useState, useEffect } from "react";
import 'remixicon/fonts/remixicon.css';
import userIcon from "/src/assets/images/SysAdIcons/userIcon.png";
import UserType from "/src/pages/system_admin/Users/UserType"; // Capitalize the component name
import { useOutlet } from "react-router-dom";
import Logo from "../../../assets/images/Loading_2.gif"; // Corrected import for loading animation

export default function SysAdminUsersPage() {
    const [loading, setLoading] = useState(true);
    const outletContent = useOutlet(); // Get the current outlet

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
                    <p className="mt-4 text-gray-500">Loading, please wait...</p>
                </div>
            ) : (
                outletContent || <UserType />
            )}
        </div>
    );
}
