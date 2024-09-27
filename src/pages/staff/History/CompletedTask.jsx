import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusableViewButton from "../../../components/ReusableViewButton";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";

const tableHeaders = [
  "Task ID",
  "Job Description",
  "Job Type",
  "Requestor",
  "Location",
  "Date Started",
  "Accomplished Date",
  "Status",
];

export default function JobCompletedContent() {
  const navigate = useNavigate();

  // State for pagination and search
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const tableContent = [
    {
      taskId: "1001",
      jobDescription: "Broken Door Knob",
      jobType: "Carpentry",
      requestor: "Ms. Charlane Vallar",
      location: "CITC Building",
      dateStarted: "28 - 07 - 2024",
      accomplishedDate: "30 - 07 - 2024",
      status: "Completed",
    },
    // Add more rows as necessary
  ];


  // Filtered content based on the search term
  const filteredContent = tableContent.filter(
    (request) =>
      request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())
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
          <SearchBar title="History" showInput={true} />
          
          {/* ReusableSearchTerm component for searching */}
          <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table */}
        <Table
          columns={8}
          rows={paginatedContent.length}
          content={paginatedContent.map((request, index) => [
            <span key={`taskId-${index}`}>{request.taskId}</span>,
            <span key={`jobDescription-${index}`}>{request.jobDescription}</span>,
            <span key={`jobType-${index}`}>{request.jobType}</span>,
            <span key={`requestor-${index}`}>{request.requestor}</span>,
            <span key={`location-${index}`}>{request.location}</span>,
            <span key={`dateStarted-${index}`}>{request.dateStarted}</span>,
            <span key={`accomplishedDate-${index}`}>{request.accomplishedDate}</span>,
            <span key={`status-${index}`}>{request.status}</span>,
            <ReusableViewButton
              key={`view-btn-${index}`}
              onClick={() => navigate("/staff/StaffSendCert/StaffCert")}
            />,
          ])}
          headers={tableHeaders}
        />

        {/* ReusablePagination component */}
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
