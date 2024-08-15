
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';

import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';

export default function UsersPage() {
    return (

          
            <main >
                
                <div className="flex py-10 items-center mt-0 space-y-2 ">
                <img src={userIcon} alt="UserIcon" className="w-12 h-10 ml-6" />
                    <p className='  text-yellow-500 text-xl font-bold'>MANAGE USERS</p>
                </div>
                <div className='p-5 mt-10 mb-8 bg-custom-blue1 text-center'>
                    <Link to="/Dept_Category" className=' text-yellow-500 font-bold text-white '>DEPARTMENT HEADS</Link>
                </div>
                <div className='p-5 mb-8 bg-custom-blue1 text-center'>
                    <Link className='text-center text-yellow-500 font-bold text-white'>DEPARTMENT STAFFS</Link>
                </div>
                <div className='p-5 mb-8 bg-custom-blue1 text-center'>
                    <Link className='text-center text-yellow-500 font-bold text-white '>CLIENTS</Link>
                </div>
            </main>

    );
}
