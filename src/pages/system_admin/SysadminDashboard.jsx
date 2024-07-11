import React from 'react';
import 'remixicon/fonts/remixicon.css';
import WelcomSysAdIcon from '/src/assets/images/SysAdIcons/welcomesysad.png';
import numberOdRequests from '/src/assets/images/SysAdIcons/numofreq.png';
import numberOdUsers from '/src/assets/images/SysAdIcons/numofusers.png';
import numberOdEmployees from '/src/assets/images/SysAdIcons/numofemployees.png';
import maintenancedept from '/src/assets/images/SysAdIcons/maintenancedept.png';
import Calendar from './components/samplecal'

import SysAdminSidebar from './components/SysAdminSidebar';

export default function SysadminDashboard() {
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
            
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <div className="py-2 px-6 bg-yellow-400 flex items-center min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <button type="button" className="text-lg text-gray-600 sidebar-toggle">
                        <i className="ri-menu-line"></i>
                    </button>
                    <a href="#" className="text-xs ml-8">joms@ustp.edu.ph +384-3478-984</a>
                </div>
                <div className="flex items-center mt-0 space-y-2 px-7 py-4">
                    <img src={WelcomSysAdIcon} alt="Home Icon" className="w-11 h-10 mr-3" />
                    <div className="flex flex-col">
                        <p className="font-bold text-xl font-inter">WELCOME Leo</p>
                        <p className="text-xs font-inter mt-1">System Admin</p>
                    </div>
                </div>

                <div className="flex ">
                    <div className="grid grid-cols-2 gap-5 p-11">
                        {/* Total Number of Requests */}
                        <div className="bg-white border border-gray-300 rounded p-4 w-80">
                            <p className="text-xs font-inter text-left">Total Number of Requests</p>
                            <div className="flex items-center mt-4">
                                <div>
                                    <p className="text-blue-400 font-bold text-xl font-inter">15,400</p>
                                    <p className="text-xs font-inter text-left">May 24 - June 01</p>
                                </div>
                                <img src={numberOdRequests} alt="Number of Requests Icon" className="w-14 h-12 ml-20 mb-5" />
                            </div>
                        </div>

                        {/* Total Number of Users */}
                        <div className="bg-white border border-gray-300 rounded p-4 w-80">
                            <p className="text-xs font-inter text-left">Total Number of Users</p>
                            <div className="flex items-center mt-4">
                                <div>
                                    <p className="text-yellow-400 font-bold text-xl font-inter">1,400</p>
                                    <p className="text-xs font-inter text-left">May 24 - June 01</p>
                                </div>
                                <img src={numberOdUsers} alt="Number of Users Icon" className="w-14 h-12 ml-20 mb-5" />
                            </div>
                        </div>

                        {/* Total Number of Employees */}
                        <div className="bg-white border border-gray-300 rounded p-4 w-80">
                            <p className="text-xs font-inter text-left">Total Number of Employees</p>
                            <div className="flex items-center mt-4">
                                <div>
                                    <p className="text-green-400 font-bold text-xl font-inter">1,400</p>
                                    <p className="text-xs font-inter text-left">May 24 - June 01</p>
                                </div>
                                <img src={numberOdEmployees} alt="Number of Employees Icon" className="w-14 h-12 ml-20 mb-5" />
                            </div>
                        </div>

                        {/* Maintenance Departments */}
                        <div className="bg-white border border-gray-300 rounded p-4 w-80">
                            <p className="text-xs font-inter text-left">Maintenance Departments</p>
                            <div className="flex items-center mt-4">
                                <div>
                                    <p className="text-blue-400 font-bold text-xl font-inter">3</p>
                                    <p className="text-xs font-inter text-left">May 24 - June 01</p>
                                </div>
                                <img src={maintenancedept} alt="Maintenance Departments Icon" className="w-14 h-12 ml-20 mb-5" />
                            </div>
                        </div>
                       
                        
                    </div>
                     <div className = ""><Calendar/></div>
                </div>

                <div className="bg-white border border-gray-300 rounded p-4 ml-9 mt-4 py-4 w-3/4">
                            <p className="text-xs font-inter text-left">Maintenance Departments</p>
                            <div className="flex items-center mt-4">
                                <div>
                                    <p className="text-blue-400 font-bold text-xl font-inter">3</p>
                                    <p className="text-xs font-inter text-left">May 24 - June 01</p>
                                </div>
                                <img src={maintenancedept} alt="Maintenance Departments Icon" className="w-14 h-12 ml-20 mb-5" />
                            </div>
                        </div>


            </main>
        </div>
    );
}
