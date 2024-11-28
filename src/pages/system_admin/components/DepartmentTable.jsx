import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import Table from "../../../components/Table";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";

const DeptTable = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeaders = [
    "Department Id",
    "Department Name",
    "Department/Office Head",
    "Action",
  ];

  const departments = [
    {
      name: "Building And Grounds Maintenance Section",
      head: "Thomas Xxxxx",
      status: "Active",
      location: "Bldg 2",
    },
    {
      name: "Civil and Sanitary Works Section",
      head: "Engr. Balabis Xxxxx",
      status: "Active",
      location: "Bldg 5, Room 110",
    },
    {
      name: "Mechanical And Electrical Works Section",
      head: "Thomas Xxxxx",
      status: "Active",
      location: "DRER Right side",
    },
    // Add more department data here...
  ];

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const tableContent = paginatedDepartments.map((department, index) => [
    department.name,
    department.head,
    department.status,
  ]);

  return (
    <div className="p-6 mx-5 mt-10 bg-white rounded-lg shadow-lg">
      {/* Header with Search */}
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <SearchBar title="Departments" />
        <ReusableSearchTerm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>

      {/* Table */}
      <Table
        columns={5}
        rows={paginatedDepartments.length}
        content={tableContent}
        headers={tableHeaders}
      />

      {/* Pagination */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DeptTable;

// import React, { useState } from 'react';
// import 'remixicon/fonts/remixicon.css';
// import Table from '../../../components/Table';
// import ReusablePagination from '../../../components/ReusablePagination';
// import ReusableSearchTerm from '../../../components/ReusableSearchTerm';
// import { useNavigate } from "react-router-dom";
// import ReusableViewButton from '../../../components/ReusableViewButton';
// import ButtonAddDepartment from '../Department/buttonAddDep';
// import SearchBar from '../../../components/SearchBar';
// import Swal from 'sweetalert2';

// // Modal Form (SysAdminAddDepartment)
// const SysAdminAddDepartment = ({ closeModal }) => {
//   const [departmentName, setDepartmentName] = useState('');
//   const [departmentLocation, setDepartmentLocation] = useState('');
//   const [departmentEmail, setDepartmentEmail] = useState('');
//   const [departmentContactNo, setDepartmentContactNo] = useState('');
//   const [DeptDescription, setDeptDescription] = useState('');
//   const [departmentHead, setDepartmentHead] = useState('');
//   const [assistantCoHead, setAssistantCoHead] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission
//     console.log('Department Name:', departmentName);
//     console.log('Department Location:', departmentLocation);
//     console.log('Department Email:', departmentEmail);
//     console.log('Department Contact No:', departmentContactNo);
//     console.log('Description:', DeptDescription);

//     // Display success message
//     Swal.fire('Success', 'Successfully Added New Department', 'success');

//     // Clear the form after submission
//     setDepartmentName('');
//     setDepartmentLocation('');
//     setDepartmentEmail('');
//     setDepartmentContactNo('');
//     setDeptDescription('');
//     setDepartmentHead('');
//     setAssistantCoHead('');

//     // Close the modal after submission
//     closeModal();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white rounded-lg p-4  max-w-2xl relative">
//         {/* Close Button */}
//         <button
//           onClick={closeModal}
//           className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
//           aria-label="Close Modal"
//         >
//           &times;
//         </button>

//         {/* Modal Header */}
//         <header className="w-full text-lg p-5 font-semibold bg-custom-blue text-center text-white rounded-lg relative">
//           Add Department
//         </header>

//         {/* Modal Body */}
//         <form className="mt-5" onSubmit={handleSubmit}>
//           {/* Department Name */}
//           <div>
//             <label className="text-gray-700 font-bold mb-10" htmlFor="departmentName">
//               Department Name
//             </label>
//             <input
//               type="text"
//               id="departmentName"
//               name="departmentName"
//               className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={departmentName}
//               onChange={(e) => setDepartmentName(e.target.value)}
//               required
//             />
//           </div>
//           {/* Add Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const DeptTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const tableHeaders = [
//     "Department/Section",
//     "Head",
//     "Status",
//     "Location",
//     "Action",
//   ];

//   const departments = [
//     {
//       name: "Building And Grounds Maintenance Section",
//       head: "Thomas Xxxxx",
//       status: "Active",
//       location: "Bldg 2",
//     },
//     {
//       name: "Civil and Sanitary Works Section",
//       head: "Engr. Balabis Xxxxx",
//       status: "Active",
//       location: "Bldg 5, Room 110",
//     },
//     {
//       name: "Mechanical And Electrical Works Section",
//       head: "Thomas Xxxxx",
//       status: "Active",
//       location: "DRER Right side",
//     },
//     // Add more department data here...
//   ];

//   const filteredDepartments = departments
//     .filter((department) =>
//       department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department.location.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage);
//   const paginatedDepartments = filteredDepartments.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const tableContent = paginatedDepartments.map((department, index) => [
//     department.name,
//     department.head,
//     department.status,
//     department.location,
//     <ReusableViewButton onClick={() => navigate("/system_admin/Departments/view")} />,
//   ]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div className="mx-auto p-6 m-5 bg-white rounded-lg shadow-lg">
//       {/* Header with Add Department and Search */}
//       <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
//       <SearchBar title="Departments" />
//         <div className="flex space-x-4">
//           <ButtonAddDepartment onClick={handleOpenModal} />
//           <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         </div>
//       </header>

//       {/* Table */}
//       <Table columns={5} rows={paginatedDepartments.length} content={tableContent} headers={tableHeaders} />

//       {/* Pagination */}
//       <ReusablePagination
//         rowsPerPage={rowsPerPage}
//         setRowsPerPage={setRowsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />

//       {/* Modal for adding department */}
//       {isModalOpen && <SysAdminAddDepartment closeModal={handleCloseModal} />}
//     </div>
//   );
// };

// export default DeptTable;
