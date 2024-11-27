import 'remixicon/fonts/remixicon.css';
import { useNavigate, Outlet } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';

export default function UserType() {
    const navigate = useNavigate();

    return (
        <>
            <SearchBar title="Users" />
            <div className='m-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Button 1 */}
                    <button
                        onClick={() => navigate("/system_admin/Users/reg_users")}
                        className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-10'
                    >
                        <p className='text-xs m-2 text-white'>Click to view</p>
                        <p className='text-yellow-500 m-3'>USER / REQUESTOR</p>
                        <p className='font-thin'>No of Users: </p>
                        <p className='text-center'>1000</p>
                    </button>

                    {/* Button 2 */}
                    <button
                        onClick={() => navigate("/system_admin/Users/admin")}
                        className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-10'
                    >
                        <p className='text-xs m-2 text-white'>Click to view</p>
                        <p className='text-yellow-500 m-3'>DEPARTMENT HEAD</p>
                        <p className='font-thin'>No of Admin: </p>
                        <p className='text-center'>1000</p>
                    </button>

                    {/* Button 3 */}
                    {/* <button
                        onClick={() => navigate("/system_admin/Users/sysadmin")}
                        className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-10'
                    >
                        <p className='text-xs m-2 text-white'>Click to view</p>
                        <p className='text-yellow-500 m-3'>SYSTEM ADMIN</p>
                        <p className='font-thin'>No of System Admin: </p>
                        <p className='text-center'>1000</p>
                    </button> */}

                    {/* Button 4 */}
                    <button
                        onClick={() => navigate("/system_admin/Users/staff")}
                        className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-10'
                    >
                        <p className='text-xs m-2 text-white'>Click to view</p>
                        <p className='text-yellow-500 m-3'>DEPARTMENT STAFF</p>
                        <p className='font-thin'>No of Staff: </p>
                        <p className='text-center'>1000</p>
                    </button>

                    {/* Button 5 */}
                    <button
                        onClick={() => navigate("/system_admin/Users/spme")}
                        className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-10'
                    >
                        <p className='text-xs m-2 text-white'>Click to view</p>
                        <p className='text-yellow-500 m-3'>SPME</p>
                        <p className='font-thin'>No of spme users: </p>
                        <p className='text-center'>1000</p>
                    </button>
                </div>

                <Outlet />
            </div>
        </>
    );
}
