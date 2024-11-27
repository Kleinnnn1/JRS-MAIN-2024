import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Table from '../../../components/Table';
import { useNavigate } from "react-router-dom";
import ReusableViewButton from './ReusableViewButon';
import ButtonAddDepartment from '../Department/buttonAddDep';
import Swal from 'sweetalert2';

// Modal Form (SysAdminAddDepartment)
const SysAdminAddDepartment = ({ closeModal }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentLocation, setDepartmentLocation] = useState('');
  const [departmentEmail, setDepartmentEmail] = useState('');
  const [departmentContactNo, setDepartmentContactNo] = useState('');
  const [DeptDescription, setDeptDescription] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [assistantCoHead, setAssistantCoHead] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
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

    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Header */}
        <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded-t-lg relative">
          Add Department
        </header>
        
        {/* Modal Body */}
        <form className="mt-5" onSubmit={handleSubmit}>
          {/* Department Name */}
          <div>
            <label className="text-gray-700 font-bold mb-10" htmlFor="departmentName">
              Department Name
            </label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>
          {/* Add Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeptTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const tableHeaders = [
    "Department/Section",
    "Head",
    "Status",
    "Location",
    "Action",
  ];

  const tableContent = [
    [
      "1. Building And Grounds Maintenance Section",
      "Thomas Xxxxx",
      "Active",
      "Bldg 2",
      <ReusableViewButton onClick={() => navigate("/")} />,
    ],
    [
      "2. Civil and Sanitary Works Section",
      "Engr. Balabis Xxxxx",
      "Active",
      "Bldg 5, Room 110",
      <ReusableViewButton onClick={() => navigate("/")} />,
    ],
    [
      "3. Mechanical And Electrical Works Section",
      "Thomas Xxxxx",
      "Active",
      "DRER Right side",
      <ReusableViewButton onClick={() => navigate("/system_admin/Departments/view")} />,
    ],
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <ButtonAddDepartment onClick={handleOpenModal} />
      <Table columns={5} rows={tableContent.length} content={tableContent} headers={tableHeaders} />
      {isModalOpen && <SysAdminAddDepartment closeModal={handleCloseModal} />}
    </>
  );
};

export default DeptTable;
