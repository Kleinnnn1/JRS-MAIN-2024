import React, { useState } from "react";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import ReusableViewButton from "../../../components/ReusableViewButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import SendReportButton from "./SendReportButton";
import { useNavigate } from "react-router-dom";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusablePagination from "../../../components/ReusablePagination";

const tableHeaders = [
  "Requester Id",
  "Job Description",
  "Job Type",
  "Date Finished",
  "Assigned to",
  "Location",
  "Estimated Time",
  "Action",
];

export default function TableReport() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tableContent = [
    {
      requesterId: "1. 20241",
      jobDescription: "Broken Door",
      jobType: "Carpenter",
      dateFinished: "28 - 07 - 2024",
      assignedTo: "John",
      location: "3rd floor ICT Building Room 309",
      estimatedTime: "2-3 hours",
    },
    // Add more report data here...
  ];

  // Filtering based on search term
  const filteredReports = tableContent.filter(
    (report) =>
      report.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
      <SearchBar title="Report Table(Total Job Finished in 6 months 33)" />
      <div className="flex space-x-4">

      <SendReportButton
            onClick={() => navigate("/department_head/report/send_report")}
          />
        <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
              </div>
      </div>

      {/* Table */}
      <Table
        columns={8}
        rows={paginatedReports.length}
        content={paginatedReports.map((report, index) => [
          <span key={`requesterId-${index}`}>{report.requesterId}</span>,
          <span key={`jobDescription-${index}`}>{report.jobDescription}</span>,
          <span key={`jobType-${index}`}>{report.jobType}</span>,
          <span key={`dateFinished-${index}`}>{report.dateFinished}</span>,
          <span key={`assignedTo-${index}`}>{report.assignedTo}</span>,
          <span key={`location-${index}`}>{report.location}</span>,
          <span key={`estimatedTime-${index}`}>{report.estimatedTime}</span>,
          <div key={`action-${index}`} className="flex space-x-2">
            <ReusableViewButton
              onClick={() => navigate("/department_head/report/view")}
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
