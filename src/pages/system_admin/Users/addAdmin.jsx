import React, { useState } from 'react';

import Swal from 'sweetalert2';

export default function AddNewStaff() {
  const [StaffID, setStaffID] = useState('');
  const [StaffOffice, setOffice] = useState('');
  const [StaffName, setStaffName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Position, setPosition] = useState('');
  const [Status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('Staff StaffID:', StaffID);
    console.log('Staff StaffOffice:', StaffOffice);
    console.log('Staff StaffName:', StaffName);
    console.log('Staff Birthday:', Birthday);
    console.log('Position:', Position);
    console.log('Status:', Status);

    // Display success message
    Swal.fire('Success', 'Successfully Added New Staff', 'success');

    // Clear the form after submission
    setStaffID('');
    setOffice('');
    setStaffName('');
    setBirthday('');
    setPosition('');
    setStatus('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Display cancellation message
    Swal.fire('Cancelled', 'Staff addition was cancelled', 'error');
  };

  return (
    <div className="m-5 bg-white shadow-md rounded-lg">
      <div className="bg-yellow-500 p-5 rounded-t-lg">
        <p className="text-xl font-bold text-gray-600">New Staff Information</p>
      </div>
      <form className="items items-center">
        <div className='flex'>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="StaffID">
              Staff ID
            </label>
            <input
              type="text"
              id="StaffID"
              name="StaffID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={StaffID}
              onChange={(e) => setStaffID(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="StaffOffice">
            Staff Office
            </label>
            <input
              type="text"
              id="StaffOffice"
              name="StaffOffice"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={StaffOffice}
              onChange={(e) => setOffice(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="StaffName">
            StaffName
            </label>
            <input
              type="email"
              id="StaffName"
              name="StaffName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={StaffName}
              onChange={(e) => setStaffName(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Birthday">
            Birthday
            </label>
            <input
              type="tel"
              id="Birthday"
              name="Birthday"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='flex'>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Position">
              Staff Position
            </label>
            <input
              type="text"
              id="Position"
              name="Position"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Status">
              Status
            </label>
            <input
              type="text"
              id="Status"
              name="Status"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='flex justify-end mr-10'>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 m-2 text-white py-2 px-2 rounded-lg hover:bg-yellow-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 m-2 text-white py-2 px-2 rounded-lg hover:bg-yellow-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
