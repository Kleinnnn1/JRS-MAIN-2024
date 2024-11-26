import React, { useState } from "react";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ButtonHistory from "./ButtonHistory";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";
import ViewAddStaff from "./ViewAddEmployee"; // Import your form component

const tableHeaders = [
  "Requester Id",
  "Job",
  "Staff Name",
  "Date Hired",
  "Schedule",
  "Status",
  "Action",
];

export default function TableEmployee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const tableContent = [
    {
      requesterId: "1. 20241",
      job: "Carpenter",
      staffName: "Cardo Dalisay",
      dateHired: "28 - 07 - 2024",
      schedule: "Monday to Saturday",
      status: "Active",
    },
    // Add more employee data here...
  ];

  // Filtering based on search term
  const filteredEmployees = tableContent.filter(
    (employee) =>
      employee.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Modal component with round yellow close button outside
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-[-20px] right-[-20px] text-2xl bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-500"
            aria-label="Close Modal"
          >
            ×
          </button>

          {/* Modal Content */}
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Staff Records" />
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on button click
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Add New Staff
          </button>
          <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={7}
        rows={paginatedEmployees.length}
        content={paginatedEmployees.map((employee, index) => [
          <span key={`requesterId-${index}`}>{employee.requesterId}</span>,
          <span key={`job-${index}`}>{employee.job}</span>,
          <span key={`staffName-${index}`}>{employee.staffName}</span>,
          <span key={`dateHired-${index}`}>{employee.dateHired}</span>,
          <span key={`schedule-${index}`}>{employee.schedule}</span>,
          <span key={`status-${index}`}>{employee.status}</span>,
          <div key={`action-${index}`} className="flex space-x-2">
            <ReusableViewButton />
            <ButtonHistory />
          </div>,
        ])}
        headers={tableHeaders}
      />

      {/* Pagination Component */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal for Add New Employee */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ViewAddStaff />
      </Modal>
    </div>
  );
}
