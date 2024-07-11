import React from 'react';
import LogoJRS from '/src/assets/images/logo_JRS.png';
import HomeSidebarIcon from '/src/assets/images/SysAdIcons/home.png';
import SettingsSidebarIcon from '/src/assets/images/SysAdIcons/settings.png';
import DepartmentSidebarIcon from '/src/assets/images/SysAdIcons/department.png';
import HistorySidebarIcon from '/src/assets/images/SysAdIcons/history.png';
import LogoutSidebarIcon from '/src/assets/images/SysAdIcons/logout.png';
import SubcategoryIcon from '/src/assets/images/SysAdIcons/subcategory.png';

export default function Sidebar() {
    return (
        <div className="fixed left-0 top-0 w-64 h-full bg-custom-blue p-4 z-50 sidebar-menu transition-transform">
            <a href="#" className="flex items-center mb-4">
                <img src={LogoJRS} alt="Logo" className="w-40 h-40 rounded object-cover" />
            </a>
            <ul className="mt-2 space-y-2">
                <li className="group active">
                    <a href="#" className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={HomeSidebarIcon} alt="Home Icon" className="w-8 h-6 mr-3" />
                        <span className="text-sm">Dashboard</span>
                    </a>
                </li>
                <li className="group active">
                    <a href="#" className="flex items-center px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={SubcategoryIcon} alt="Home Icon" className="w-7 h-8 ml-6" />
                        <span className="text-sm">Analytics</span>
                    </a>
                    <a href="#" className="flex items-center px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={SubcategoryIcon} alt="Home Icon" className="w-7 h-8 ml-6" />
                        <span className="text-sm">Users</span>
                    </a>
                    <a href="#" className="flex items-center px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={SubcategoryIcon} alt="Home Icon" className="w-7 h-8 ml-6" />
                        <span className="text-sm">Job Requests</span>
                    </a>
                </li>
                <li className="group active">
                    <a href="#" className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={DepartmentSidebarIcon} alt="Home Icon" className="w-10 h-8 mr-2" />
                        <span className="text-sm">Department</span>
                    </a>
                </li>
                <li className="group active">
                    <a href="#" className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={HistorySidebarIcon} alt="History Icon" className="w-10 h-8 mr-2" />
                        <span className="text-sm">History</span>
                    </a>
                </li>
                <li className="group active">
                    <a href="#" className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={SettingsSidebarIcon} alt="Settings Icon" className="w-10 h-8 mr-2" />
                        <span className="text-sm">Settings</span>
                    </a>
                </li>
                <li className="group active">
                    <a href="#" className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                        <img src={LogoutSidebarIcon} alt="Logout Icon" className="w-9 h-8 mr-2" />
                        <span className="text-sm">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}