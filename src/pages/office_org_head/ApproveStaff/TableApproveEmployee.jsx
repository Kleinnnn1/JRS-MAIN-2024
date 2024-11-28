import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";
import ButtonApproveEmployeeTable from "./ButtonApproveEmployeeTable";

const tableHeaders = [
  "Employee ID",
  "Job Position",
  "Full Name",
  "Email",
  "Action",
];

export default function TableApproveEmployee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(""); // Notification message

  const tableContent = [
    {
      requesterId: "1. 20241",
      job: "Carpenter",
      staffName: "Cardo Dalisay",
      email: "cardo@gmail.com",
    },
    // Add more employee data here...
  ];

  // Filtering based on search term
  const filteredEmployees = tableContent.filter(
    (employee) =>
      employee.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle Approve and Decline actions
  const handleAction = (id, action) => {
    setNotification(
      action === "approve" ? `Approved ID: ${id}` : `Declined ID: ${id}`
    );
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg relative">
      <div className="bg-custom-blue py-2 px-4 flex flex-col sm:flex-row justify-between items-center rounded-t-lg">
        <SearchBar title="Staff Approval" />
        <div className="flex flex-col sm:flex-row sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
          <ButtonApproveEmployeeTable
            onClick={() => navigate("/department_head/ApproveStaff/approval")}
          />
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      {/* Notification Display (Floating) */}
      {notification && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm px-4 py-2 rounded shadow z-50">
          {notification}
        </div>
      )}

      <div className="overflow-x-auto">
        <Table
          columns={6}
          rows={paginatedEmployees.length}
          content={paginatedEmployees.map((employee, index) => [
            <span key={`requesterId-${index}`}>{employee.requesterId}</span>,
            <span key={`job-${index}`}>{employee.job}</span>,
            <span key={`staffName-${index}`}>{employee.staffName}</span>,
            <span key={`email-${index}`}>{employee.email}</span>,
            <span
              key={`action-${index}`}
              className="flex justify-left items-center space-x-4"
            >
              <button
                type="button"
                className="bg-green-500 px-4 py-2 font-bold rounded text-white"
                onClick={() => handleAction(employee.requesterId, "approve")}
              >
                Approve
              </button>
              <button
                type="button"
                className="bg-red-500 px-4 py-2 font-bold rounded text-white"
                onClick={() => handleAction(employee.requesterId, "decline")}
              >
                Decline
              </button>
            </span>,
          ])}
          headers={tableHeaders.map((header, index) => (
            <th
              key={index}
              className={`text-center ${index === 4 ? "text-center" : ""}`}
            >
              {header}
            </th>
          ))}
        />
      </div>

      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
