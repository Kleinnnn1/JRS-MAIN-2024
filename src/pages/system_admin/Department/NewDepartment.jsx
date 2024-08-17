import 'remixicon/fonts/remixicon.css';
import StatusBox from '../components/DepartmentTable';
import ReusableSearchBar from '../components/ReusableSearchBar';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';
import { Outlet, useOutlet } from "react-router-dom";
import AddDepartment from './addDepartment';

export default function Departments() {
    const otherContent = useOutlet(); // Get the current outlet
    return (
        <div>
            <main>
                <div className="flex items-center rounded bg-custom-blue m-2 p-2">
                    <img src={userIcon} alt="User Icon" className="w-9 h-9 ml-4" />
                    <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>
                        ALL DEPARTMENTS
                    </p>
                </div>
              
              
                {otherContent ? (
                <Outlet /> // Render nested routes if present
            ) : (
                
                
            )}  <StatusBox />
            </main>
        </div>
    );
}
