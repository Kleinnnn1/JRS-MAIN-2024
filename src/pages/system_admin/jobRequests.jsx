import React from 'react';
import 'remixicon/fonts/remixicon.css';
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';
import ContentJobRequest from '../ContentJobRequests';
import ReusableSearchBar from './components/ReusableSearchBar';
import { Outlet, useOutlet } from "react-router-dom";

export default function Job_requests() {
     const otherContent = useOutlet(); // Get the current outlet
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <SysAdminHeader headerText="DASHBOARD > JOB REQUESTS > ALL"/>
              <div className='bg-custom-blue rounded m-2 p-4 text-white font-bold'>ALL JOB REQUESTS</div>
              <ReusableSearchBar ButtonTitle='ADD NEW REQUEST'/>
              {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <ContentJobRequest />
      )}
            </main>
        </div>
    );
}
