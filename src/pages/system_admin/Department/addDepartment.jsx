import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function SysAdminAddDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentLocation, setDepartmentLocation] = useState('');
  const [departmentEmail, setDepartmentEmail] = useState('');
  const [departmentContactNo, setDepartmentContactNo] = useState('');
  const [DeptDescription, setDeptDescription] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [assistantCoHead, setAssistantCoHead] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('Department Name:', departmentName);
    console.log('Department Location:', departmentLocation);
    console.log('Department Email:', departmentEmail);
    console.log('Department Contact No:', departmentContactNo);
    console.log('Description:', DeptDescription);

    // Display success message
    Swal.fire('Success', 'Successfully Added New Department', 'success');

    // Clear the form after submission
    setDepartmentName('');
    setDepartmentLocation('');
    setDepartmentEmail('');
    setDepartmentContactNo('');
    setDeptDescription('');
    setDepartmentHead('');
    setAssistantCoHead('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Display cancellation message
    Swal.fire('Cancelled', 'Department addition was cancelled', 'error');
  };

  return (
    <section className="bg-white rounded-lg p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl">
        {/* Modal Header */}
        <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded mb-4">
          New Department Information
        </header>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="m-5">
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
            <div className="m-5">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="assistantCoHead">
                Assistant/ Co-Head
              </label>
              <input
                type="text"
                id="assistantCoHead"
                name="assistantCoHead"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={assistantCoHead}
                onChange={(e) => setAssistantCoHead(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Department Description */}
          <div className="m-5">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="DeptDescription">
              Dept Description
            </label>
            <textarea
              id="DeptDescription"
              name="DeptDescription"
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={DeptDescription}
              onChange={(e) => setDeptDescription(e.target.value)}
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
