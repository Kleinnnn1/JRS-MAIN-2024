import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';

export default function DepartmentCategory() {
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <SysAdminHeader headerText="DASHBOARD > USERS"/>
                <div className="flex py-10 px-3 items-center mt-0 space-y-2 ">
                <img src={userIcon} alt="UserIcon" className="w-12 h-10 ml-6" />
                    <p className=' ml-3 text-yellow-500 text-xl font-bold'>SELECT DEPARTMENT</p>
                </div>
                <div className='p-5 mt-10 mb-8 bg-custom-blue1 text-center'>
                    <Link to="" className=' text-yellow-500 font-bold text-white '>BGMS</Link>
                </div>
                <div className='p-5 mb-8 bg-custom-blue1 text-center'>
                    <Link className='text-center text-yellow-500 font-bold text-white'>CSWS</Link>
                </div>
                <div className='p-5 mb-8 bg-custom-blue1 text-center'>
                    <Link className='text-center text-yellow-500 font-bold text-white '>MEWS    </Link>
                </div>
            </main>
        </div>
    );
}