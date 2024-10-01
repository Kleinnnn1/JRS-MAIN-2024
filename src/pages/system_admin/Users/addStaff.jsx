import React, { useState } from 'react';

import Swal from 'sweetalert2';

export default function AddNewAdmin() {
  const [AdminID, setAdminID] = useState('');
  const [AdminOffice, setOffice] = useState('');
  const [AdminName, setAdminName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Position, setPosition] = useState('');
  const [Status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('Admin AdminID:', AdminID);
    console.log('Admin AdminOffice:', AdminOffice);
    console.log('Admin AdminName:', AdminName);
    console.log('Admin Birthday:', Birthday);
    console.log('Position:', Position);
    console.log('Status:', Status);

    // Display success message
    Swal.fire('Success', 'Successfully Added New Admin', 'success');

    // Clear the form after submission
    setAdminID('');
    setOffice('');
    setAdminName('');
    setBirthday('');
    setPosition('');
    setStatus('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Display cancellation message
    Swal.fire('Cancelled', 'Admin addition was cancelled', 'error');
  };

  return (
    <div className="m-5 bg-white shadow-md rounded-lg">
      <div className="bg-yellow-500 p-5 rounded-t-lg">
        <p className="text-xl font-bold text-gray-600">New Admin Information</p>
      </div>
      <form className="items items-center">
        <div className='flex'>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="AdminID">
              Admin ID
            </label>
            <input
              type="text"
              id="AdminID"
              name="AdminID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={AdminID}
              onChange={(e) => setAdminID(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="AdminOffice">
            Admin Office
            </label>
            <input
              type="text"
              id="AdminOffice"
              name="AdminOffice"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={AdminOffice}
              onChange={(e) => setOffice(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="AdminName">
            AdminName
            </label>
            <input
              type="email"
              id="AdminName"
              name="AdminName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={AdminName}
              onChange={(e) => setAdminName(e.target.value)}
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
              Admin Position
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
