import React, { useState } from 'react';

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentLocation, setDepartmentLocation] = useState('');
  const [departmentEmail, setDepartmentEmail] = useState('');
  const [departmentContactNo, setDepartmentContactNo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('Department Name:', departmentName);
    console.log('Department Location:', departmentLocation);
    console.log('Department Email:', departmentEmail);
    console.log('Department Contact No:', departmentContactNo);
    // Clear the form after submission
    setDepartmentName('');
    setDepartmentLocation('');
    setDepartmentEmail('');
    setDepartmentContactNo('');
  };

  return (
    <div className=" m-5 bg-white shadow-md rounded-lg">
      <div className="bg-yellow-500 p-5 rounded-t-lg">
        <p className="text-xl font-bold text-black">New Department Information</p>
      </div>
      <form onSubmit={handleSubmit} className="items items-center">
        <div className='flex'>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentName">
            Office Name
          </label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentLocation">
            Location
          </label>
          <input
            type="text"
            id="departmentLocation"
            name="departmentLocation"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentLocation}
            onChange={(e) => setDepartmentLocation(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentEmail">
            Email
          </label>
          <input
            type="email"
            id="departmentEmail"
            name="departmentEmail"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentEmail}
            onChange={(e) => setDepartmentEmail(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentContactNo">
            Contact No.
          </label>
          <input
            type="tel"
            id="departmentContactNo"
            name="departmentContactNo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentContactNo}
            onChange={(e) => setDepartmentContactNo(e.target.value)}
            required
          />
        </div>
         </div>
         <div className='flex'>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentName">
            Office Name
          </label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentLocation">
            Location
          </label>
          <input
            type="text"
            id="departmentLocation"
            name="departmentLocation"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentLocation}
            onChange={(e) => setDepartmentLocation(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentEmail">
            Email
          </label>
          <input
            type="email"
            id="departmentEmail"
            name="departmentEmail"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentEmail}
            onChange={(e) => setDepartmentEmail(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentContactNo">
            Contact No.
          </label>
          <input
            type="tel"
            id="departmentContactNo"
            name="departmentContactNo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentContactNo}
            onChange={(e) => setDepartmentContactNo(e.target.value)}
            required
          />
        </div>
         </div>
         <button
          type="submit"
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}
