import 'remixicon/fonts/remixicon.css';
import StatusBox from '../components/DepartmentTable';
import ReusableSearchBar from '../components/ReusableSearchBar';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';
import { useState } from 'react';
import AddDepartment from './addDepartment';

export default function Departments() {
    const [isAdding, setIsAdding] = useState(false); // State to manage form visibility

    return (
        <div>
            <main>
                <div className="flex items-center rounded bg-custom-blue m-2 p-2">
                    <img src={userIcon} alt="User Icon" className="w-9 h-9 ml-4" />
                    <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>
                        ALL DEPARTMENTS
                    </p>
                </div>

                {isAdding ? (
                    <AddDepartment /> // Show form if isAdding is true
                ) : (
                    <>
                       
                       <ReusableSearchBar
                            ButtonTitle='Add New Department'
                            onClick={() => setIsAdding(true)} // Pass custom onClick handler
                        />
                        <StatusBox />
                    </>
                )}
            </main>
        </div>
    );
}
