import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Import ReusableSearchTerm
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";

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

export default function JobCompletedContent() {
  const navigate = useNavigate();

  // State for pagination and search
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for table content
  const tableContent = [
    {
      requesterId: "20241",
      jobDescription: "Broken Door",
      jobType: "Carpenter",
      dateFinished: "28 - 07 - 2024",
      assignedTo: "John",
      location: "3rd floor ICT Building Room 309",
      estimatedTime: "2-3 hours",
    },
    {
      requesterId: "20242",
      jobDescription: "Leaky Faucet",
      jobType: "Plumber",
      dateFinished: "29 - 07 - 2024",
      assignedTo: "Jake",
      location: "Admin Office",
      estimatedTime: "1-2 hours",
    },
    // Add more rows as necessary
  ];

  // Filtered content based on the search term
  const filteredContent = tableContent.filter(
    (request) =>
      request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requesterId.includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
        <div className="my-4 mx-3 py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
          <SearchBar title="Completed" showInput={true} />

          {/* ReusableSearchTerm for search functionality */}
          <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table */}
        {paginatedContent.length > 0 ? (
          <Table
            columns={8}
            rows={paginatedContent.length}
            content={paginatedContent.map((request, index) => [
              <span key={`requesterId-${index}`}>{request.requesterId}</span>,
              <span key={`jobDescription-${index}`}>{request.jobDescription}</span>,
              <span key={`jobType-${index}`}>{request.jobType}</span>,
              <span key={`dateFinished-${index}`}>{request.dateFinished}</span>,
              <span key={`assignedTo-${index}`}>{request.assignedTo}</span>,
              <span key={`location-${index}`}>{request.location}</span>,
              <span key={`estimatedTime-${index}`}>{request.estimatedTime}</span>,
              <ReusableViewButton
                key={`view-btn-${index}`}
                onClick={() => navigate("/department_head/job_completed/view")}
              />,
            ])}
            headers={tableHeaders}
          />
        ) : (
          <p className="text-center text-gray-500">No completed jobs found</p>
        )}

        {/* Pagination */}
        <ReusablePagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
