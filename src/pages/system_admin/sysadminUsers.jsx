import React from 'react';
import 'remixicon/fonts/remixicon.css';
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';

export default function UsersPage() {
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <SysAdminHeader />
                <div className="flex py-10 px-3 items-center mt-0 space-y-2 ">
                <img src={userIcon} alt="UserIcon" className="w-12 h-10 ml-6" />
                    
                       <div className='bg-blue-600 '>
                        
                       </div>
                    
                </div>
            </main>
        </div>
    );
}
