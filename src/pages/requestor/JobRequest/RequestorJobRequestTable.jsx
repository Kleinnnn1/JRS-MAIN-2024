import { useState } from "react";
import PropTypes from "prop-types";
import RequestorJobRequestForm from "./RequestorJobRequestForm";
import SearchItem from '../../../components/SearchItem'; // Import the SearchItem component
import SearchBar from "../../../components/SearchBar";

export default function RequestorJobRequestTable({ jobRequests }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMakeRequest = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  // Filter job requests based on the search term from SearchItem component
  const filteredRequests = jobRequests.filter((request) => {
    return (
      request.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-full mx-auto p-6 m-5 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
         <SearchBar title ="Job Requests" />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleMakeRequest}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Make Request
          </button>
          {/* Use SearchItem component */}
          <SearchItem searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </header>

      {/* Table */}
      <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-lg border border-white">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 font-semibold text-sm uppercase tracking-wide">
              <th className="px-6 py-3">Request ID</th>
              <th className="px-6 py-3">Requestor</th>
              <th className="px-6 py-3">Work Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">No. of Person</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Processed by</th>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date Requested</th>
              <th className="px-6 py-3">Date Completed</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <tr key={request.id} className="border-t border-white">
                  <td className="px-6 py-4">{request.id}</td>
                  <td className="px-6 py-4">{request.requestor}</td>
                  <td className="px-6 py-4">{request.description}</td>
                  <td className="px-6 py-4">{request.category}</td>
                  <td className="px-6 py-4">{request.persons}</td>
                  <td className="px-6 py-4">{request.department}</td>
                  <td className="px-6 py-4">{request.processedBy}</td>
                  <td className="px-6 py-4">
                    {request.photo ? (
                      <img
                        src={request.photo}
                        alt="Job Request"
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-500">No Photo</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-md text-white ${
                        request.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{request.dateRequested}</td>
                  <td className="px-6 py-4">{request.dateCompleted}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No matching results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-gray-600">
        <div className="flex items-center">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when rows per page changes
            }}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1"
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

      {/* Modal for the job request form */}
      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
              aria-label="Close Modal"
            >
              &times;
            </button>
            {/* Render the form component here */}
            <RequestorJobRequestForm onSubmit={() => closeModal()} />
          </div>
        </div>
      )}
    </div>
  );
}

// Add PropTypes for props validation
RequestorJobRequestTable.propTypes = {
  jobRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      requestor: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      persons: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
      processedBy: PropTypes.string.isRequired,
      photo: PropTypes.string,
      status: PropTypes.string.isRequired,
      dateRequested: PropTypes.string.isRequired,
      dateCompleted: PropTypes.string,
    })
  ).isRequired,
};
