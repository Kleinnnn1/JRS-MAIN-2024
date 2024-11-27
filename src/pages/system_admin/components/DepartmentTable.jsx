import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Swal from 'sweetalert2';

const SysAdminAddDepartment = ({ closeModal }) => {
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the department name is provided
    if (!departmentName) {
      Swal.fire('Error', 'Department Name is required', 'error');
      return;
    }

    // Handle form submission, e.g., send data to an API or update state
    console.log('Department Name:', departmentName);

    // Display success message
    Swal.fire('Success', 'Successfully Added New Department', 'success');

    // Clear the form after submission
    setDepartmentName('');

    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        {/* Modal Header with X Button */}
        <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded-t mb-4 flex justify-between items-center">
          <span>Add Department</span>
          <button
            onClick={closeModal}
            className="text-white text-xl font-semibold"
          >
            &times;
          </button>
        </header>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Office Name */}
          <div className="">
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SysAdminAddDepartment;
