import 'remixicon/fonts/remixicon.css';
import { useNavigate,Outlet } from 'react-router-dom';



export default function UserType() { // Capitalized the component name
    const navigate = useNavigate();

    return (
        <div className='flex justify-evenly'>
           
            <div className='flex justify-around '>
                <button
                    onClick={() => navigate("/system_admin/Users/reg_users")}
                    className={'text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5 '}
                >
                    <p className='text-xs m-2 text-white'>Click to view</p>
                    <p className='text-yellow-500 m-3'>USER / REQUESTOR</p>
                    <p className='font-thin'>No of Users: </p>
                    <p className='text-center'>1000</p>
                </button>
                <button
                    onClick={() => navigate("/system_admin/Users/admin")} // Update the navigation path or use the handleClick if it does something
                    className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5'
                >
                    <p className='text-xs m-2 text-white'>Click to view</p>
                    <p className='text-yellow-500 m-3'>DEPARTMENT HEAD</p>
                    <p className='font-thin'>No of Admin: </p>
                    <p className='text-center'>1000</p>
                </button>
                <button
                    onClick={() => navigate("/system_admin/Users/admin")} // Update the navigation path or use the handleClick if it does something
                    className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5'
                >
                    <p className='text-xs m-2 text-white'>Click to view</p>
                    <p className='text-yellow-500 m-3'>SYSTEM ADMIN</p>
                    <p className='font-thin'>No of System Admin: </p>
                    <p className='text-center'>1000</p>
                </button>
                <button
                    onClick={() => navigate("/system_admin/Users/staff")} // Update the navigation path or use the handleClick if it does something
                    className='text-center bg-custom-blue text-white border border-zinc-700 rounded font-bold p-20 m-5'
                >
                    <p className='text-xs m-2 text-white'>Click to view</p>
                    <p className='text-yellow-500 m-3'>DEPARTMENT STAFF</p>
                    <p className='font-thin'>No of Staff: </p>
                    <p className='text-center'>1000</p>
                </button>
            </div>
            <Outlet/>
        </div>
    );
}
