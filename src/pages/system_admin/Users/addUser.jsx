import React, { useState } from 'react';

import Swal from 'sweetalert2';

export default function AddNewUser() {
  const [UserID, setUserID] = useState('');
  const [UserOffice, setOffice] = useState('');
  const [UserName, setUserName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Position, setPosition] = useState('');
  const [Status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('User UserID:', UserID);
    console.log('User UserOffice:', UserOffice);
    console.log('User UserName:', UserName);
    console.log('User Birthday:', Birthday);
    console.log('Position:', Position);
    console.log('Status:', Status);

    // Display success message
    Swal.fire('Success', 'Successfully Added New User', 'success');

    // Clear the form after submission
    setUserID('');
    setOffice('');
    setUserName('');
    setBirthday('');
    setPosition('');
    setStatus('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Display cancellation message
    Swal.fire('Cancelled', 'User addition was cancelled', 'error');
  };

  return (
    <div className="m-5 bg-white shadow-md rounded-lg">
      <div className="bg-yellow-500 p-5 rounded-t-lg">
        <p className="text-xl font-bold text-gray-600">New User Information</p>
      </div>
      <form className="items items-center">
        <div className='flex'>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="UserID">
              User ID
            </label>
            <input
              type="text"
              id="UserID"
              name="UserID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={UserID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="UserOffice">
            User Office
            </label>
            <input
              type="text"
              id="UserOffice"
              name="UserOffice"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={UserOffice}
              onChange={(e) => setOffice(e.target.value)}
              required
            />
          </div>
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="UserName">
            UserName
            </label>
            <input
              type="email"
              id="UserName"
              name="UserName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
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
              User Position
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
        <div className='flex justify-end'>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 m-8 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 m-8 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
