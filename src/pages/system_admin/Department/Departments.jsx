import 'remixicon/fonts/remixicon.css';
import StatusBox from '../components/DepartmentTable';
import ReusableSearchBar from '../components/ReusableSearchBar';
import { useState } from 'react';
import AddDepartment from './addDepartment';
import SearchBar from '../../../components/SearchBar';

export default function Departments() {
    const [isAdding, setIsAdding] = useState(false); // State to manage form visibility

    return (
        <div>
            <main>
            <SearchBar title="Departments" />

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
