
import 'remixicon/fonts/remixicon.css';
import numberOdRequests from '/src/assets/images/SysAdIcons/numofreq.png';
import numberOdUsers from '/src/assets/images/SysAdIcons/numofusers.png';
import numberOdEmployees from '/src/assets/images/SysAdIcons/numofemployees.png';
import maintenancedept from '/src/assets/images/SysAdIcons/Maintenancedept.png';
import Calendar from './components/samplecal';
import SysAdminHeader from './components/sysadminHeader';
import SysAdminSidebar from './components/SysAdminSidebar';

import StatsCard from './components/StatsCard';
import StatusCard from './components/StatusCard';


export default function SysadminDashboard() {
    return (
        <div className="text-gray-800 font-inter">
            <SysAdminSidebar />
           
            <div className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <SysAdminHeader headerText="DASHBOARD > ANALYTICS" />
              

                <div className="flex">
                    <div className="grid grid-cols-2 gap-5 p-11 flex justify-center">
                        <StatsCard 
                            title="Total Number of Requests" 
                            value="15,400" 
                            dateRange="May 24 - June 01" 
                            iconSrc={numberOdRequests} 
                            textColor="text-blue-400" 
                        />
                        <StatsCard 
                            title="Total Number of Users" 
                            value="1,400" 
                            dateRange="May 24 - June 01" 
                            iconSrc={numberOdUsers} 
                            textColor="text-yellow-400" 
                        />
                        <StatsCard 
                            title="Total Number of Employees" 
                            value="1,400" 
                            dateRange="May 24 - June 01" 
                            iconSrc={numberOdEmployees} 
                            textColor="text-green-400" 
                        />
                        <StatsCard 
                            title="Maintenance Departments" 
                            value="3" 
                            dateRange="May 24 - June 01" 
                            iconSrc={maintenancedept} 
                            textColor="text-blue-400" 
                        />
                    </div>

                    <div className="mb-10">
                        <Calendar />
                    </div>
                </div>

                <div className="flex justify-around bg-white border border-gray-300 rounded ml-9 mt-4 py-4 mr-10">
                    <StatusCard 
                        title="Pending Job Requests" 
                        count="532" 
                        statusColor="bg-cyan-400" 
                        statusText="new" 
                    />
                    <StatusCard 
                        title="Completed Task" 
                        count="4,569-0.5%" 
                        statusColor="bg-green-500" 
                        statusText="Done" 
                    />
                    <StatusCard 
                        title="Ongoing Job Requests" 
                        count="365" 
                        statusColor="bg-yellow-500" 
                        statusText="In Progress" 
                    />
                </div>
            </div>
        </div>
    );
}
