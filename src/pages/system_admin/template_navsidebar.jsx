import React from 'react';
import 'remixicon/fonts/remixicon.css';
import LogoJRS from '/src/assets/images/logo_JRS.png';
import ProfilePic from '/src/assets/images/BabyKaren.jpg';
import HomeSidebarIcon from '/src/assets/images/iconSideBarHome.png';
import MyProfileSidebarIcon from '/src/assets/images/iconMyProfileSideBar.png';
import SchedulesSidebarIcon from '/src/assets/images/iconSchedulesSideBar.png';
import RequestHistorySidebarIcon from '/src/assets/images/iconRequestHistorySideBar.png';
import LogoutSidebarIcon from '/src/assets/images/iconLogoutSideBar.png';

export default function Dashboard() {
    return (
        <body className="text-gray-800 font-inter">
            {/* SIDEBAR CONTENT */}
            <div className="fixed left-0 top-0 w-64 h-full bg-blue-950 p-4 z-50 sidebar-menu transition-transform">
                <a href={Dashboard} className="flex items-center mb-4">
                    <img src={LogoJRS} alt="Logo" className="w-30 h-20 rounded object-cover" />
                </a>

                {/* SIDEBAR PROFILE SECTION */}
                <div className="flex flex-col items-center text-center text-white">
                    <img src={ProfilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover mb-2" />
                    <p className="font-semibold text-xs">Karen C. Cadalo</p>
                    <p className="text-xs">Faculty</p>
                </div>

                {/* SIDEBAR 5 ICONS */}
                <ul className="mt-6 space-y-2">
                    {/* SIDEBAR: HOME */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-blue-950 group-[.active]:text-white">
                            <img src={HomeSidebarIcon} alt="Home Icon" className="w-4 h-4 mr-3" />
                            <span className="text-sm">Home</span>
                        </a>
                    </li>
                    {/* SIDEBAR: MY PROFILE */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-blue-950 group-[.active]:text-white">
                            <img src={MyProfileSidebarIcon} alt="My Profile Icon" className="w-4 h-4 mr-3" />
                            <span className="text-sm">My Profile</span>
                        </a>
                    </li>
                    {/* SIDEBAR: SCHEDULES */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-blue-950 group-[.active]:text-white">
                            <img src={SchedulesSidebarIcon} alt="Schedules Icon" className="w-4 h-4 mr-3" />
                            <span className="text-sm">Schedules</span>
                        </a>
                    </li>
                    {/* SIDEBAR: REQUEST HISTORY */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-blue-950 group-[.active]:text-white">
                            <img src={RequestHistorySidebarIcon} alt="Request History Icon" className="w-4 h-4 mr-3" />
                            <span className="text-sm">Request History</span>
                        </a>
                    </li>
                    {/* SIDEBAR: LOGOUT */}
                    <li className="group active">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-blue-950 group-[.active]:text-white">
                            <img src={LogoutSidebarIcon} alt="Logout Icon" className="w-4 h-4 mr-3" />
                            <span className="text-sm">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* END OF SIDEBAR CONTENT */}

            {/* BODY */}
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">

                {/* STRAIGHT HORIZONTAL NAVBAR */}
                <div className="py-2 px-6 bg-yellow-400 flex items-center min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <button type="button" className="text-lg text-gray-600 sidebar-toggle">
                        <i className="ri-menu-line"></i>
                    </button>
                    <a href="#" className="text-xs ml-8">joms@ustp.edu.ph +384-3478-984</a>
                    <a href="#" className="text-xs font-semibold underline ml-auto">[Take USTP Harmonized Client Satisfaction Survey Online Version]</a>
                </div>
                {/* END OF STRAIGHTHORIZONTAL NAVBAR */}

                {/* MAIN BODY CONTENT */}
                {/* END OF MAIN BODY CONTENT */}

                {/* END OF BODY */}
            </main>
        </body>
    );
}
