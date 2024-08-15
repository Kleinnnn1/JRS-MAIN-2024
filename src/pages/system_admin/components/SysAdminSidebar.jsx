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
                        className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={HomeSidebarIcon} alt="Home Icon" className="w-8 h-6 mr-3" />
                        <span className="text-sm">Dashboard temporary</span>
                    </div>
                </li>
               <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Users')}
                        className="flex items-center px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <PersonIcon className="w-7 h-8 ml-6 text-gray-300" />
                        <span className="text-sm">Users</span>
                    </div>
                    </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Job_Requests')}
                        className="flex items-center px-4 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={SubcategoryIcon} alt="Home Icon" className="w-7 h-8 ml-6" />
                        <span className="text-sm">Job Requests</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('/system_admin/Departments')}
                        className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={DepartmentSidebarIcon} alt="Department Icon" className="w-10 h-8 mr-2" />
                        <span className="text-sm">Department</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('#')}
                        className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={HistorySidebarIcon} alt="History Icon" className="w-10 h-8 mr-2" />
                        <span className="text-sm">History</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('#')}
                        className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={SettingsSidebarIcon} alt="Settings Icon" className="w-10 h-8 mr-2" />
                        <span className="text-sm">Settings</span>
                    </div>
                </li>
                <li className="group active">
                    <div
                        onClick={() => navigate('#')}
                        className="flex items-center px-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md group-[.active]:bg-white-950 group-[.active]:text-white cursor-pointer"
                    >
                        <img src={LogoutSidebarIcon} alt="Logout Icon" className="w-9 h-8 mr-2" />
                        <span className="text-sm">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
