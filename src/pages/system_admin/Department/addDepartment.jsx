import React, { useState } from 'react';

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('Department Name:', departmentName);
    console.log('Department Head:', departmentHead);
    // Clear the form after submission
    setDepartmentName('');
    setDepartmentHead('');
  };

  return (
    <div className="max-w-s m-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentName">
            Department Name
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="departmentHead">
            Department Head
          </label>
          <input
            type="text"
            id="departmentHead"
            name="departmentHead"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
            required
          />
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
