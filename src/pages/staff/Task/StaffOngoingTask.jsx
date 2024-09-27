import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";

const tableHeaders = [
  "Job Description",
  "Requestor",
  "Location",
  "Date Requested",
  "Date Started",
  "Expected Accomplishment Date",
  "Priority Level",
  "Action",
];

export default function TableCertificate() {
  const navigate = useNavigate();

  const tableContent = [
    {
      jobDescription: "Broken Door",
      requestor: "Ms. Charlene V",
      location: "CITC Faculty Office",
      dateRequested: "28-08-2024",
      dateStarted: "28-08-2024",
      expectedCompletionDate: "28-09-2024",
      priorityLevel: "High",
    },
    {
      jobDescription: "Set up projectors",
      requestor: "Mr. John Doe",
      location: "Conference Room A",
      dateRequested: "22-08-2024",
      dateStarted: "23-08-2024",
      expectedCompletionDate: "25-08-2024",
      priorityLevel: "Medium",
    },
    {
      jobDescription: "Clean storage",
      requestor: "Ms. Jane Smith",
      location: "Storage Room",
      dateRequested: "20-08-2024",
      dateStarted: "21-08-2024",
      expectedCompletionDate: "23-08-2024",
      priorityLevel: "Low",
    },
    // Add more rows as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter table content based on search term
  const filteredContent = tableContent.filter((request) =>
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
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
   
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
      <SearchBar title="Ongoing Task" />
      <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table */}
      <Table
        columns={8}
        rows={paginatedContent.length}
        content={paginatedContent.map((request, index) => [
          <span key={`jobDescription-${index}`}>{request.jobDescription}</span>,
          <span key={`requestor-${index}`}>{request.requestor}</span>,
          <span key={`location-${index}`}>{request.location}</span>,
          <span key={`dateRequested-${index}`}>{request.dateRequested}</span>,
          <span key={`dateStarted-${index}`}>{request.dateStarted}</span>,
          <span key={`expectedCompletionDate-${index}`}>{request.expectedCompletionDate}</span>,
          <span key={`priorityLevel-${index}`}>{request.priorityLevel}</span>,
          <ReusableViewButton
            key={`view-btn-${index}`}
            onClick={() => navigate("/staff/StaffImagePage/StaffImageContent")}
          />,
        ])}
        headers={tableHeaders}
      />

      {/* Reusable Pagination Component */}
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