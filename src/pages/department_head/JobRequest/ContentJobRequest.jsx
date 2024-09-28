import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Import ReusableSearchTerm
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";
import ReusableDropDownButton from "../../../components/ReusableDropDownButton";

const options = [
  { value: "1", label: "CSWS" },
  { value: "2", label: "MEWS" },
  { value: "3", label: "BGMS" },
];

const tableHeaders = [
  "Requester Id",
  "Job Description",
  "Job Type",
  "Requestor",
  "Date Submitted",
  "Location",
  "Action",
];

export default function ContentJobRequest() {
  const navigate = useNavigate();

  // State for pagination, search, and table data
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for the table
  const tableContent = [
    {
      requesterId: "20241",
      jobDescription: "Broken Door",
      jobType: "Carpenter",
      requestor: "Cardo Dalisay",
      dateSubmitted: "28 - 07 - 2024",
      location: "CITC Building 3rd floor Room 309",
    },

    // Add more rows as necessary
  ];

  // Filter the table content based on the search term
  const filteredContent = tableContent.filter(
    (request) =>
      request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <SearchBar title="Job Request" showInput={true} />

          {/* ReusableSearchTerm for search functionality */}
          <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table */}
        {paginatedContent.length > 0 ? (
          <Table
            columns={7}
            rows={paginatedContent.length}
            content={paginatedContent.map((request, index) => [
              <span key={`requesterId-${index}`}>{request.requesterId}</span>,
              <span key={`jobDescription-${index}`}>{request.jobDescription}</span>,
              <span key={`jobType-${index}`}>{request.jobType}</span>,
              <span key={`requestor-${index}`}>{request.requestor}</span>,
              <span key={`dateSubmitted-${index}`}>{request.dateSubmitted}</span>,
              <span key={`location-${index}`}>{request.location}</span>,
              <>
                <ReusableViewButton
                  key={`view-btn-${index}`}
                  onClick={() => navigate("/department_head/job_request/view")}
                />
                <ReusableDropDownButton key={`dropdown-${index}`} options={options} />
              </>,
            ])}
            headers={tableHeaders}
          />
        ) : (
          <p className="text-center text-gray-500">No job requests found</p>
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
