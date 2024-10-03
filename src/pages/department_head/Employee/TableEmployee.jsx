import React, { useState } from "react";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ButtonAddEmployeeTable from "./ButtonAddEmployeeTable";
import { useNavigate } from "react-router-dom";
import ButtonHistory from "./ButtonHistory";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
      <SearchBar title="Employee Records" />
      <div className="flex space-x-4">
      
        <ButtonAddEmployeeTable
          onClick={() => navigate("/department_head/employee/add")}
        />
        <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
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
            <ReusableViewButton
              onClick={() => navigate("/department_head/employee/view")}
            />
            <ButtonHistory
              onClick={() => navigate("/department_head/employee/history")}
            />
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
    </div>
  );
}
