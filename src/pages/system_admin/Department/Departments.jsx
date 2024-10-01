import 'remixicon/fonts/remixicon.css';
import StatusBox from '../components/DepartmentTable';
import ReusableSearchBar from '../components/ReusableSearchBar';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';
import { useState } from 'react';
import AddDepartment from './addDepartment';
import PageSubTitle from '../components/PageTitle';

export default function Departments() {
    const [isAdding, setIsAdding] = useState(false); // State to manage form visibility

    return (
        <div>
            <main>
            <PageSubTitle title="ALL DEPARTMENT" iconSrc={userIcon} />

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
