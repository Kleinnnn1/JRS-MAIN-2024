import React from 'react';
import 'remixicon/fonts/remixicon.css';
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';

export default function Job_requests() {
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <SysAdminHeader headerText="DASHBOARD > JOB REQUESTS"/>
              
            </main>
        </div>
    );
}
