import React from 'react';
import 'remixicon/fonts/remixicon.css';
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';
import StatusBox from './components/statusbox';

export default function Departments() {
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <SysAdminHeader headerText="DEPARTMENTS"/>
              <div className='bg-custom-blue m-2 p-4 text-white font-bold'>ALL DEPARTMENTS</div>
            <StatusBox/>
             


            </main>
        </div>
    );
}
