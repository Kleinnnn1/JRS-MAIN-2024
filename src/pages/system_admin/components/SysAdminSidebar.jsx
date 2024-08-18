import { useNavigate } from 'react-router-dom';
import HomeSidebarIcon from '/src/assets/images/SysAdIcons/home.png';
import SettingsSidebarIcon from '/src/assets/images/SysAdIcons/settings.png';
import DepartmentSidebarIcon from '/src/assets/images/SysAdIcons/department.png';
import HistorySidebarIcon from '/src/assets/images/SysAdIcons/history.png';
import LogoutSidebarIcon from '/src/assets/images/SysAdIcons/logout.png';
import SubcategoryIcon from '/src/assets/images/SysAdIcons/subcategory.png';
import SideBarProfile from './profile';
import SideBarMenu from './Logo';
import PersonIcon from '@mui/icons-material/Person';
import { FileOpen } from '@mui/icons-material';
import { Home } from '@mui/icons-material';


export default function Sidebar() {
    const navigate = useNavigate();

   

    return (
        <div className="fixed left-0 top-0 w-64 h-full bg-custom-blue p-4 z-50 sidebar-menu transition-transform">
            <SideBarMenu />
            <SideBarProfile />

            <ul className="mt-2 space-y-2">
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin')}
                        className="flex items-center px-5 py-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <Home className="mr-5" />
                        <span className="text-sm">Dashboard</span>
                    </div>
                </li>
               <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Users')}
                        className="flex items-center px-5 py-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <PersonIcon className="mr-5 text-gray-300" />
                        <span className="text-sm">Users</span>
                    </div>
                    </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Job_Requests')}
                        className="flex items-center px-5 py-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <FileOpen className="mr-5 text-gray-300" />
                        <span className="text-sm">Job Requests</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Departments')}
                        className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={DepartmentSidebarIcon} alt="Department Icon" className="w-12 h-11 mr-2 " />
                        <span className="text-sm">Department</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/History')}
                        className="flex items-center px-2 py-1 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={HistorySidebarIcon} alt="History Icon" className="w-10 h-8 mr-4" />
                        <span className="text-sm">History</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Settings')}
                         className="flex items-center px-2 py-1 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={SettingsSidebarIcon} alt="Settings Icon" className="w-10 h-8 mr-4" />
                        <span className="text-sm">Settings</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('#')}
                        className="flex items-center px-2 py-1 text-gray-300 hover:bg-blue-980 hover:bg-yellow-600 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={LogoutSidebarIcon} alt="Logout Icon" className="w-9 h-8 mr-5" />
                        <span className="text-sm">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
