import 'remixicon/fonts/remixicon.css';
import { useNavigate, Outlet } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';

export default function UserType() {
    const navigate = useNavigate();

    return (
        <>
            <SearchBar title="Users" />
            <div className='m-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {/* Button 1: USER / REQUESTOR */}
                    <button
                        onClick={() => navigate("/system_admin/Users/reg_users")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                        <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>USER / REQUESTOR</p>
                        </div>
                        <p className='font-thin'>No of Users: </p>
                        <p className='text-center font-thin'>1000</p>
                    </button>

                    {/* Button 2: DEPARTMENT HEAD */}
                    <button
                        onClick={() => navigate("/system_admin/Users/admin")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                        <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>DEPARTMENT HEAD</p>
                        </div>
                        <p className='font-thin'>No of Admin: </p>
                        <p className='text-center font-thin'>1000</p>
                    </button>

                    {/* Button 3: DEPARTMENT STAFF */}
                    <button
                        onClick={() => navigate("/system_admin/Users/staff")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                        <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>DEPARTMENT STAFF</p>
                        </div>
                        <p className='font-thin text-black'>No of Staff: </p>
                        <p className='text-center font-thin'>1000</p>
                    </button>

                    {/* Button 4: SPME */}
                    <button
                        onClick={() => navigate("/system_admin/Users/spme")}
                        className='text-center bg-custom-color border shadow-md rounded-lg hover:scale-105 hover:shadow-lg hover:bg-custom-hover-color transition-all duration-300 font-bold p-10'
                    >
                        <div className='flex justify-center items-center'>
                             <i className='ri-user-star-line text-4xl mr-3'></i>
                            <p className='text-black text-xl font-bold font-sans m-3'>SPME</p>
                        </div>
                        <p className='font-thin'>No of spme users: </p>
                        <p className='text-center font-thin'>1000</p>
                    </button>
                </div>

                <Outlet />
            </div>
        </>
    );
}
