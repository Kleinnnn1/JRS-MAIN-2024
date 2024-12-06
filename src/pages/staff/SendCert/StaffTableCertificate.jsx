import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Import ReusableSearchTerm
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";

const tableHeaders = [
  "Job Description",
  "Job Type",
  "Date Started",
  "Date Finished",
  "Location",
  "Priority Level",
  "Duration",
  "Action",
];

export default function StaffTableCertificate() {
  const navigate = useNavigate();

  // State for pagination and search
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const tableContent = [
    {
      jobDescription: "Broken Door",
      jobType: "Carpenter",
      dateStarted: "28 - 07 - 2024",
      dateFinished: "28 - 08 - 2024",
      location: "3rd floor ICT Building Room 309",
      priorityLevel: "High",
      duration: "2 hours",
    },
    // Add more rows if necessary
  ];

  // Function to get highlight class based on priority level
  const getPriorityClass = (level) => {
    switch (level) {
      case "High":
        return "bg-red-500 text-white"; // Red for High
      case "Medium":
        return "bg-yellow-500 text-black"; // Yellow for Medium
      case "Low":
        return "bg-green-500 text-white"; // Green for Low
      default:
        return ""; // No highlight
    }
  };

  // Filtered content based on the search term
  const filteredContent = tableContent.filter(
    (request) =>
      request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <SearchBar title="Send Certificate" showInput={true} />
          <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table */}
        <Table
          columns={8}
          rows={paginatedContent.length}
          content={paginatedContent.map((request, index) => [
            <span key={`jobDescription-${index}`}>{request.jobDescription}</span>,
            <span key={`jobType-${index}`}>{request.jobType}</span>,
            <span key={`dateStarted-${index}`}>{request.dateStarted}</span>,
            <span key={`dateFinished-${index}`}>{request.dateFinished}</span>,
            <span key={`location-${index}`}>{request.location}</span>,
            <span key={`priorityLevel-${index}`} className={`py-1 px-2 rounded ${getPriorityClass(request.priorityLevel)}`}>
              {request.priorityLevel}
            </span>,
            <span key={`duration-${index}`}>{request.duration}</span>,
            <ReusableViewButton
              key={`view-btn-${index}`}
              onClick={() => navigate("/staff/StaffCert")}
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
