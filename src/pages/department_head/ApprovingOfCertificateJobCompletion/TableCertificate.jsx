import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";
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

export default function TableCertificate() {
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
    // Add more content here dynamically
  ];

  // Filtering logic based on search term
  const filteredContent = tableContent.filter(
    (item) =>
      item.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar
          title="Approving Of Job Certificate Completion Table"
          showInput={true}
        />
        <ReusableSearchTerm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Table */}
      <Table
        columns={tableHeaders.length}
        rows={paginatedContent.length}
        content={paginatedContent.map((item, index) => [
          <span key={`requesterId-${index}`}>{item.requesterId}</span>,
          <span key={`jobDescription-${index}`}>{item.jobDescription}</span>,
          <span key={`jobType-${index}`}>{item.jobType}</span>,
          <span key={`dateFinished-${index}`}>{item.dateFinished}</span>,
          <span key={`assignedTo-${index}`}>{item.assignedTo}</span>,
          <span key={`location-${index}`}>{item.location}</span>,
          <span key={`estimatedTime-${index}`}>{item.estimatedTime}</span>,
          <div key={`action-${index}`} className="flex space-x-2">
            <ReusableViewButton
              onClick={() =>
                navigate("/department_head/approving_of_job_completion/content")
              }
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
