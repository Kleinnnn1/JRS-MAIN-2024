import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";

export default function TableCertificate() {
  const navigate = useNavigate();

  const [tableContent] = useState([
    {
      jobDescription: "Broken Door",
      requestor: "Ms. Charlene V",
      location: "CITC Faculty Office",
      dateRequested: "28-08-2024",
      dateStarted: "28-08-2024",
      expectedDate: "28-09-2024",
      priorityLevel: "High",
    },
    {
      jobDescription: "Set up projectors",
      requestor: "Mr. John Doe",
      location: "Conference Room A",
      dateRequested: "22-08-2024",
      dateStarted: "23-08-2024",
      expectedDate: "25-08-2024",
      priorityLevel: "Medium",
    },
    {
      jobDescription: "Clean storage",
      requestor: "Ms. Jane Smith",
      location: "Storage Room",
      dateRequested: "20-08-2024",
      dateStarted: "21-08-2024",
      expectedDate: "23-08-2024",
      priorityLevel: "Low",
    },
    // Add more rows here
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(tableContent);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = tableContent.filter((job) =>
      job.jobDescription.toLowerCase().includes(lowerCaseQuery) ||
      job.requestor.toLowerCase().includes(lowerCaseQuery) ||
      job.location.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRequests(filtered);
  }, [searchQuery, tableContent]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      {/* Table Header */}
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Ongoing Task" />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-2">
          <thead className="bg-yellow-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Job Description</th>
              <th className="py-3 px-6 text-left">Requestor</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Date Requested</th>
              <th className="py-3 px-6 text-left">Date Started</th>
              <th className="py-3 px-6 text-left">Expected Accomplishment Date</th>
              <th className="py-3 px-6 text-left">Priority Level</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {paginatedRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No matching results found
                </td>
              </tr>
            ) : (
              paginatedRequests.map((job, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{job.jobDescription}</td>
                  <td className="py-3 px-6 text-left">{job.requestor}</td>
                  <td className="py-3 px-6 text-left">{job.location}</td>
                  <td className="py-3 px-6 text-left">{job.dateRequested}</td>
                  <td className="py-3 px-6 text-left">{job.dateStarted}</td>
                  <td className="py-3 px-6 text-left">{job.expectedDate}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-medium ${getPriorityClass(
                        job.priorityLevel
                      )}`}
                    >
                      {job.priorityLevel}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      key={`view-btn-${index}`}
                      className="bg-blue-500 text-white py-1 px-3 rounded text-xs hover:bg-blue-600"
                      onClick={() => navigate("/staff/StaffImagePage/StaffImageContent")}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-gray-600">
        <div className="flex items-center">
          <span className="mr-2">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when rows per page changes
            }}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>

        {/* Styled Pagination Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
