
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
               <div className='flex justify-around p-10 '>
                <div className=' text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5'>
                        <p className='text-xs m-2 text-white-600'>Click to view</p>
                        <p className='text-yellow-500 m-3'>USER / REQUESTOR</p>
                        <p className='font-thin'>No of Users: </p>
                        <p className='text-center'>1000</p>
                </div>
                <div className=' text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5'>
                        <p className='text-xs m-2 text-white-600'>Click to view</p>
                        <p className='text-yellow-500 m-3'>ADMIN / DEPARTMENT HEAD</p>
                        <p className='font-thin'>No of Admin: </p>
                        <p className='text-center'>1000</p>
                </div>
                <div className=' text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5'>
                        <p className='text-xs m-2 text-white-600'>Click to view</p>
                        <p className='text-yellow-500 m-3'>DEPARTMENT STAFF</p>
                        <p className='font-thin'>No of Staff: </p>
                        <p className='text-center'>1000</p>
                </div>
               </div>
            </main>

    );
}
