import React from 'react';
import 'remixicon/fonts/remixicon.css';
import LogoJRS from '/src/assets/images/logo_JRS.png';
import HomeSidebarIcon from '/src/assets/images/SysAdIcons/home.png';
import SettingsSidebarIcon from '/src/assets/images/SysAdIcons/settings.png';
import DepartmentSidebarIcon from '/src/assets/images/SysAdIcons/department.png';
import HistorySidebarIcon from '/src/assets/images/SysAdIcons/history.png';
import LogoutSidebarIcon from '/src/assets/images/SysAdIcons/logout.png';

export default function SysadminDashboard() {
    return (
        <div className="text-gray-800 font-inter">
            {/* SIDEBAR CONTENT */}
            <div className="fixed left-0 top-0 w-64 h-full bg-custom-blue p-4 z-50 sidebar-menu transition-transform">
                <a href="#" className="flex items-center mb-4">
                    <img src={LogoJRS} alt="Logo" className="w-30 h-20 rounded object-cover" />
                </a>
                {/* SIDEBAR 5 ICONS */}
                <ul className="mt-6 space-y-2">
                    {/* SIDEBAR: Dashboard */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                            <img src={HomeSidebarIcon} alt="Home Icon" className="w-8 h-6 mr-3" />
                            <span className="text-sm">Dashboard</span>
                        </a>
                        <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                            <img src={HomeSidebarIcon} alt="Home Icon" className="w-8 h-6 ml-3" />
                            <span className="text-sm">Analytics</span>
                        </a>
                        </li>





                    </li>
                      {/* SIDEBAR: Department */}
                      <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                            <img src={DepartmentSidebarIcon} alt="Home Icon" className="w-10 h-8 mr-2" />
                            <span className="text-sm">Department</span>
                        </a>
                    </li>
                      {/* SIDEBAR: History */}
                      <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                            <img src={HistorySidebarIcon} alt="History Icon" className="w-10 h-8 mr-2" />
                            <span className="text-sm">History</span>
                        </a>
                    </li>
                    {/* SIDEBAR: Settings */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                            <img src={SettingsSidebarIcon} alt="Settings Icon" className="w-10 h-8 mr-2" />
                            <span className="text-sm">Settings</span>
                        </a>
                    </li>
                    {/* SIDEBAR: Logout */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white">
                            <img src={LogoutSidebarIcon} alt="Logout Icon" className="w-9 h-8 mr-2" />
                            <span className="text-sm">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* END OF SIDEBAR CONTENT */}

            {/* MAIN BODY */}
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                {/* HORIZONTAL NAVBAR */}
                <div className="py-2 px-6 bg-yellow-400 flex items-center min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <button type="button" className="text-lg text-gray-600 sidebar-toggle">
                        <i className="ri-menu-line"></i>
                    </button>
                    <a href="#" className="text-xs ml-8">joms@ustp.edu.ph +384-3478-984</a>
                </div>
                {/* END OF HORIZONTAL NAVBAR */}

                {/* MAIN BODY CONTENT */}
                {/* TEXT DASHBOARD */}
                <p className="font-bold text-xl py-4 px-6 font-inter">WELCOME</p>

               
                {/* END OF MAIN CONTENT */}
            </main>
        
        </div>
    );
}
