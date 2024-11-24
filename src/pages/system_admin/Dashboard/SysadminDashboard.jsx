import 'remixicon/fonts/remixicon.css';
import numberOfRequests from '/src/assets/images/SysAdIcons/numofreq.png';
import numberOfUsers from '/src/assets/images/SysAdIcons/numofusers.png';
import numberOfEmployees from '/src/assets/images/SysAdIcons/numofemployees.png';
import maintenanceDept from '/src/assets/images/SysAdIcons/Maintenancedept.png';
import Calendar from "../components/samplecal"
import StatsCard from "../components/StatsCard";
import StatusCard from "../components/StatusCard";
import SearchBar from '../../../components/SearchBar';

export default function SysadminDashboard() {
    const statusCardColor = "bg-blue-50";
    return (
        <div>
            <SearchBar title="Dashboard" />
            <div className="flex">
                <div className="grid grid-cols-2 gap-5 p-11 flex justify-center">
                    <StatsCard 
                        title="Total Number of Requests" 
                        value="15,400" 
                        dateRange="May 24 - June 01" 
                        iconSrc={numberOfRequests} 
                        textColor="text-blue-400" 
                    />
                    <StatsCard 
                        title="Total Number of Users" 
                        value="1,400" 
                        dateRange="May 24 - June 01" 
                        iconSrc={numberOfUsers} 
                        textColor="text-yellow-400" 
                    />
                    <StatsCard 
                        title="Total Number of Employees" 
                        value="1,400" 
                        dateRange="May 24 - June 01" 
                        iconSrc={numberOfEmployees} 
                        textColor="text-green-400" 
                    />
                    <StatsCard 
                        title="Maintenance Departments" 
                        value="3" 
                        dateRange="May 24 - June 01" 
                        iconSrc={maintenanceDept} 
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
    );
}
