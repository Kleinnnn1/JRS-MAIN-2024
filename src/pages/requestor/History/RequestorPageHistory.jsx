import { useState, useEffect } from "react";
import SearchBar from '../../../components/SearchBar';
import SearchItem from '../../../components/SearchItem'; // Import the SearchItem component

export default function JobRequestHistory() {
  const [jobRequests, setJobRequests] = useState([
    {
      requestId: "REQ123",
      requestor: "Karen C. Cadalo",
      workDescription: "Fixing computer issues in Room 101",
      category: "IT Support",
      noOfPerson: 2,
      department: "IT Department",
      processedBy: "John Doe",
      photo: "https://via.placeholder.com/150", // Placeholder image URL for now
      status: "Completed",
      dateRequested: "2024-09-01",
      dateCompleted: "2024-09-03",
    },
    {
      requestId: "REQ124",
      requestor: "Mark Smith",
      workDescription: "Room cleaning service for conference hall",
      category: "Maintenance",
      noOfPerson: 3,
      department: "Facilities",
      processedBy: "Jane Doe",
      photo: "https://via.placeholder.com/150", // Placeholder image URL for now
      status: "Pending",
      dateRequested: "2024-09-05",
      dateCompleted: "-",
    },
    {
      requestId: "REQ125",
      requestor: "Emily Davis",
      workDescription: "Set up projectors and sound systems",
      category: "Event Support",
      noOfPerson: 5,
      department: "AV Department",
      processedBy: "Michael Brown",
      photo: "https://via.placeholder.com/150", // Placeholder image URL for now
      status: "In Progress",
      dateRequested: "2024-09-07",
      dateCompleted: "-",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(jobRequests);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = jobRequests.filter((job) =>
      job.requestor.toLowerCase().includes(lowerCaseQuery) ||
      job.workDescription.toLowerCase().includes(lowerCaseQuery) ||
      job.status.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRequests(filtered);
  }, [searchQuery, jobRequests]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewClick = (requestId) => {
    alert(`Viewing details for Request ID: ${requestId}`);
  };

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

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      {/* Table Header */}
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Job Request History" />
        <div className="flex space-x-2">
          {/* Replace inline search with SearchItem */}
          <SearchItem searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-2">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Request ID</th>
              <th className="py-3 px-6 text-left">Requestor</th>
              <th className="py-3 px-6 text-left">Work Description</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">No. of Person</th>
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Processed by</th>
              <th className="py-3 px-6 text-left">Photo</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date Requested</th>
              <th className="py-3 px-6 text-left">Date Completed</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {paginatedRequests.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4">
                  No matching results found
                </td>
              </tr>
            ) : (
              paginatedRequests.map((job, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{job.requestId}</td>
                  <td className="py-3 px-6 text-left">{job.requestor}</td>
                  <td className="py-3 px-6 text-left">{job.workDescription}</td>
                  <td className="py-3 px-6 text-left">{job.category}</td>
                  <td className="py-3 px-6 text-left">{job.noOfPerson}</td>
                  <td className="py-3 px-6 text-left">{job.department}</td>
                  <td className="py-3 px-6 text-left">{job.processedBy}</td>
                  <td className="py-3 px-6 text-left">
                    <img src={job.photo} alt="Job" className="h-10 w-10 object-cover rounded" />
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{job.dateRequested}</td>
                  <td className="py-3 px-6 text-left">{job.dateCompleted}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleViewClick(job.requestId)}
                      className="bg-blue-500 text-white py-1 px-3 rounded text-xs hover:bg-blue-600"
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
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
