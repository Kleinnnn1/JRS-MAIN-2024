import React from 'react';
import 'remixicon/fonts/remixicon.css';
import deptIcon from '/src/assets/images/SysAdIcons/deptIcon.png'

const StatusBox = ({ deptHed }) => {
    return (

        <div className='bg-blue-100 mt-8 m-2 p-4 text-white font-bold'>
            <div className='flex items-center'>
                <img src={deptIcon} alt="Department Icon" />
                <p className='font-thin text-custom-blue'>BUILDING AND GROUNDS MAINTENANCE SECTION</p>
            </div>

            <p className='mt-4 text-black'>Director/Head</p>
            
            <div className='border rounded w-1/4 p-2 bg-gray-300'></div>
            <p className='mt-4 text-black'>Assistant Head</p>
            <div className='border rounded w-1/4 p-2 bg-gray-300'></div>
            <div className='p-2 '>
                <div className='m-2 bg-green-500 text-white rounded '>Activate</div>
                <div className='m-2 bg-red-500 text-white rounded '>Deactivate</div>
                <div className='m-2 bg-yellow-500 text-white rounded '>Update</div>
               
            </div>
        </div>

    )
}

export default StatusBox