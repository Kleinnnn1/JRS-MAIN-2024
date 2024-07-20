import React from 'react';
import 'remixicon/fonts/remixicon.css';
import WelcomSysAdIcon from '/src/assets/images/SysAdIcons/welcomesysad.png';
import numberOdRequests from '/src/assets/images/SysAdIcons/numofreq.png';
import numberOdUsers from '/src/assets/images/SysAdIcons/numofusers.png';
import numberOdEmployees from '/src/assets/images/SysAdIcons/numofemployees.png';
import maintenancedept from '/src/assets/images/SysAdIcons/Maintenancedept.png';
import Calendar from './components/samplecal'
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';

export default function SysadminDashboard() {
    return (
        <div className="text-gray-800  font-inter">
            <SysAdminSidebar />
           
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
            <SysAdminHeader headerText="DASHBOARD > ANALYTICS" />
                <div className="flex items-center mt-0 space-y-2 px-7 py-4">
                    <img src={WelcomSysAdIcon} alt="Home Icon" className="w-11 h-10 mr-3" />
                    <div className="flex flex-col">
                        <p className="font-bold text-xl font-inter">WELCOME Leo</p>
                        <p className="text-xs font-inter mt-1">System Admin</p>
                    </div>
                </div>

                <div className="flex">
                    <div className="grid grid-cols-2 gap-5 p-11 flex justify-center">
                        {/* Total Number of Requests */}
                        <div className="bg-white border border-gray-300 rounded p-4 w-80">
                            <p className="text-s font-inter text-left">Total Number of Requests</p>
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
                            <p className="text-s font-inter text-left">Total Number of Users</p>
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
                            <p className="text-s font-inter text-left">Total Number of Employees</p>
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
                            <p className="text-s font-inter text-left">Maintenance Departments</p>
                            <div className="flex items-center mt-4">
                                <div>
                                    <p className="text-blue-400 font-bold text-xl font-inter">3</p>
                                    <p className="text-xs font-inter text-left">May 24 - June 01</p>
                                </div>
                                <img src={maintenancedept} alt="Maintenance Departments Icon" className="w-14 h-12 ml-20 mb-5" />
                            </div>
                        </div>
                       
                        
                    </div>
                     <div className = "mb-10"><Calendar/></div>
                </div>

                <div className="flex justify-around bg-white border border-gray-300 rounded  ml-9 mt-4 py-4 mr-10 ">
                        <div className='bg-white ml-6 mr-6'>
                            <p className="text-s flex justify-center font-inter text-left">Pending Job Requests</p>
                            <div className="flex items-center mt-4">
                                <div> 
                                    <p className="text-s text-cyan-400 font-inter ml-4 text-left">532</p>
                                </div>
                                <div className='bg-cyan-400  ml-2 rounded '>
                                <p className="text-xs p-1 ml-2 mr-2 text-white font-inter text-center">new</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white  ml-6 mr-6'>
                            <p className="text-s flex justify-center font-inter text-left">Completed Task</p>
                            <div className="flex items-center mt-4">
                                <div> 
                                    <p className="text-s text-green-500 font-inter ml-4 text-left">4,569-0.5%</p>
                                </div>
                                <div className='bg-green-500  ml-2 rounded '>
                                <p className="text-xs p-1 ml-1 mr-1 text-white font-inter text-center">Done</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white  ml-6 mr-6'>
                            <p className="text-s flex justify-center font-inter text-left">Ongoing Job Requests</p>
                            <div className="flex items-center mt-4">
                                <div> 
                                    <p className="text-s text-yellow-500 font-inter ml-4 text-left">365</p>
                                </div>
                                <div className='bg-yellow-500  ml-2 rounded '>
                                <p className="text-xs p-1  text-white font-inter text-center">In Progress</p>
                                </div>
                            </div>
                        </div>
                </div>


            </main>
        </div>
    );
}
