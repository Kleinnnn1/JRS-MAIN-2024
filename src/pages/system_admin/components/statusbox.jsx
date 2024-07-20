import React from 'react';
import 'remixicon/fonts/remixicon.css';
import deptIcon from '/src/assets/images/SysAdIcons/deptIcon.png'

const StatusBox = ({ deptHed }) => {
    return (
        <div>
        <div className='flex items-center justify-between'>
            <div className='bg-blue-500 h-10 flex items-center text-white font-bold px-4 mt-6 ml-10 rounded'>
                ADD NEW DEPARTMENT
            </div>
            <div className='flex '>
                <div className='flex items-center bg-gray-300 h-10 flex items-center text-white font-bold  mt-6 rounded' >Type Here .................</div>
                <div className='bg-blue-500 h-10 flex items-center text-white font-bold px-4 mr-10 mt-6 ml-2 rounded'>
                Search
                </div>
            </div>
        </div>

        <div className='bg-blue-100 mt-5 m-2 ml-8 mr-10 p-4 text-white font-bold'>
       

            <div className='flex justify-between mr-20 '>
                <div className='flex'>
                <img src={deptIcon} alt="Department Icon" className="w-6 h-6" />
                <p className='font-thin text-custom-blue ml-2'>BUILDING AND GROUNDS MAINTENANCE SECTION</p>
                </div>
                <div className='flex items-center '>
                <p className='ml-20  text-black mr-2'>Status: </p>
                <div className="h-3 w-3 bg-green-600 rounded-full mr-2"></div>
                <p className='text-black'>ACTIVE</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/3'>
                    <p className='mt-4 text-black'>Director/Head</p>
                    <div className='border rounded text-gray-600 p-2 bg-gray-300'>Xxxxxxxx X. Xxxxxxx</div>
                    <p className='mt-4 text-black'>Assistant Head</p>
                    <div className='border rounded text-gray-600 p-2 bg-gray-300'>Xxxxxxxx X. Xxxxxxx</div>
                </div>
                <div className='w-1/3 mt-5 ml-10 m-2'>
                    <p className=' text-black'>No. of Employees/Staff: </p>
                    <p className=' mt-4 text-black'>No. of Requests:</p>
                </div>
                <div className='p-2 w-1/3 flex flex-col items-end'>
                    <div className='m-2 w-20 bg-green-600  text-center text-white rounded '>Activate</div>
                    <div className='m-2 w-20 bg-red-600 text-center text-white rounded '>Deactivate</div>
                    <div className='m-2 w-20 bg-yellow-500 text-center text-white rounded '>Edit</div>
                    <div className='m-2 w-20 bg-gray-500 text-center text-white rounded '>View</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default StatusBox