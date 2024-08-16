
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import UserContent from './ContentUsers';

import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';
import ReusableSearchBar from '../components/ReusableSearchBar';

export default function UsersPage() {
    return (

          
            <main >
              
                
              <div className="flex items-center bg-custom-blue m-2 p-4">
                <img src={userIcon} alt="UserIcon" className="w-9 h-9 ml-4" />
                <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>MANAGE USERS</p>
            </div>
                <ReusableSearchBar ButtonTitle='ADD NEW USER'/>
                <UserContent/>
            </main>

    );
}
