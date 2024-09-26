import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableNextButton from "../../../components/ReusableNextButton";
import ReusablePreviousButton from "../../../components/ReusablePreviousButton";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";

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
  
  // Sample data for the table
  const tableContent = [
    {
      jobDescription: "Broken Door",
      requestor: "Ms. Charlene V",
      location: "CITC Faculty Office",
      dateRequested: "28 - 08 - 2024",
      dateStarted: "28 - 08 - 2024",
      expectedCompletionDate: "28 - 09 - 2024",
      priorityLevel: "High",
    },
    // Add more data as needed
  ];

  // State for search term, rows per page, current page
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // Filter the table content based on the search term
  const filteredContent = tableContent.filter((request) => {
    return (
      request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar 
          title="Ongoing Tasks" 
          showInput={true}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table
        columns={8}
        rows={paginatedContent.length}
        content={paginatedContent.map((request) => [
          request.jobDescription,
          request.requestor,
          request.location,
          request.dateRequested,
          request.dateStarted,
          request.expectedCompletionDate,
          request.priorityLevel,
          <ReusableViewButton
            onClick={() =>
              navigate("/staff/StaffImagePage/StaffImageContent")
            }
          />,
        ])}
        headers={tableHeaders}
      />

      {/* Pagination and Rows per page */}
      <div className="flex items-center justify-between ml-4 mr-4 text-sm">
        {/* Rows per page selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className="text-gray-700">
            Rows per page:
          </label>
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when rows per page changes
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-700"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>

        {/* Pagination buttons */}
        <div>
          <ReusablePreviousButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
          />
          <ReusableNextButton
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          />
        </div>
      </div>
    </>
  );
}
