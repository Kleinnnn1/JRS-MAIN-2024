import { useState } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "./RequestorJobRequestForm";
import { useQuery } from "@tanstack/react-query";
import { getRequestorRequest } from "../../../service/apiRequestorRequestTable";
import RequestorJobRequestData from "./RequestorJobRequestData";

const tableHeaders = [
  "Request ID",
  "Job Description",
  "Job Position",
  "Process by Department",
  "Staff Assigned",
  "Image",
  "Status",
  "Date Requested",
  "Date Completed",
  "Actions",
];

export default function RequestorJobRequestTable() {
  const { data: request = [], error } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequestorRequest,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMakeRequest = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  const handleJobRequestSubmit = () => {
    // Handle new requests here if necessary
    closeModal();
  };

  // Filter job requests based on search term and sort by Date Requested
  const filteredRequests = request
    .filter(
      (request) =>
        request.requestor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));

  // Sort by Date Requested in descending order

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Create table content or show no data message
  const tableContent = RequestorJobRequestData(paginatedRequests) || []; // Use paginated requests

  // UI LAYOUT
  return (
    <div className="max-w-full mx-auto p-6 m-5 bg-white rounded-lg shadow-lg">
      {/* Header with Make Request and Search */}
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <SearchBar title="Job Requests" />
        <div className="flex space-x-4">
          <button
            onClick={handleMakeRequest}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Make Request
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Table */}
      <Table
        columns={10}
        rows={paginatedRequests.length}
        content={tableContent}
        headers={tableHeaders}
      />

      {/* Pagination */}
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

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
            {/* Render the form component and pass onSubmit handler */}
            <RequestorJobRequestForm
              onSubmit={handleJobRequestSubmit}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import PropTypes from "prop-types";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import Table from "../../../components/Table";
// import SearchBar from "../../../components/SearchBar";
// import RequestorJobRequestForm from "./RequestorJobRequestForm";

// const tableHeaders = [
//   "Request ID",
//   //"Requestor",
//   "Work Description",
//   "Category",
//   //"No. of Person",
//   "Department",
//   "Processed by",
//   "Image",
//   "Status",
//   "Date Requested",
//   "Date Completed",
//   "Actions",
// ];

// export default function RequestorJobRequestTable({ jobRequests }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const [allJobRequests, setAllJobRequests] = useState(jobRequests);

//   const handleMakeRequest = () => setIsModalOpen(true); // Open modal for request form
//   const closeModal = () => setIsModalOpen(false); // Close modal

//   // Handle click outside modal to close
//   const handleClickOutsideModal = (e) => {
//     if (e.target.id === "modalBackdrop") closeModal();
//   };

//   // Handle form submission and update job requests
//   const handleJobRequestSubmit = (newRequests) => {
//     setAllJobRequests([...allJobRequests, ...newRequests]);
//     closeModal();
//   };

//   // Filter job requests based on search term
//   const filteredRequests = allJobRequests.filter(
//     (request) =>
//       request.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
//   const paginatedRequests = filteredRequests.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-green-100 text-green-700";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "In Progress":
//         return "bg-blue-100 text-blue-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const tableContent = paginatedRequests.map((request, index) => [
//     <span key={`requestId-${index}`}>{request.id}</span>,
//     //<span key={`requestor-${index}`}>{request.requestor}</span>,
//     <span key={`workDescription-${index}`}>{request.description}</span>,
//     <span key={`category-${index}`}>{request.category}</span>,
//     //<span key={`noOfPerson-${index}`}>{request.persons}</span>,
//     <span key={`department-${index}`}>{request.department}</span>,
//     <span key={`processedBy-${index}`}>{request.processedBy}</span>,
//     <img
//       key={`photo-${index}`}
//       src={request.photo}
//       alt="Job"
//       className="h-10 w-10 object-cover rounded"
//     />,
//     <span
//       key={`status-${index}`}
//       className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(
//         request.status
//       )}`}
//     >
//       {request.status}
//     </span>,
//     <span key={`dateRequested-${index}`}>{request.dateRequested}</span>,
//     <span key={`dateCompleted-${index}`}>{request.dateCompleted}</span>,
//     <button
//       key={`view-btn-${index}`}
//       className="bg-blue-500 text-white px-4 py-1 rounded-md"
//     >
//       View
//     </button>,
//   ]);

//   // UI LAYOUT
//   return (
//     <div className="max-w-full mx-auto p-6 m-5 bg-white rounded-lg shadow-lg">
//       {/* Header with Make Request and Search */}
//       <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
//         <SearchBar title="Job Requests" />
//         <div className="flex space-x-4">
//           <button
//             onClick={handleMakeRequest}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
//           >
//             Make Request
//           </button>
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>
//       </header>

//       {/* Table */}
//       <Table
//         columns={10}
//         rows={paginatedRequests.length}
//         content={tableContent}
//         headers={tableHeaders}
//       />

//       {/* Pagination */}
//       <ReusablePagination
//         rowsPerPage={rowsPerPage}
//         setRowsPerPage={setRowsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />

//       {/* Modal for the job request form */}
//       {isModalOpen && (
//         <div
//           id="modalBackdrop"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClickOutsideModal}
//         >
//           <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
//             <button
//               onClick={closeModal}
//               className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
//               aria-label="Close Modal"
//             >
//               &times;
//             </button>
//             {/* Render the form component and pass onSubmit handler */}
//             <RequestorJobRequestForm onSubmit={handleJobRequestSubmit} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // PropTypes validation
// RequestorJobRequestTable.propTypes = {
//   jobRequests: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       requestor: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       category: PropTypes.string.isRequired,
//       persons: PropTypes.number.isRequired,
//       department: PropTypes.string.isRequired,
//       processedBy: PropTypes.string.isRequired,
//       photo: PropTypes.string,
//       status: PropTypes.string.isRequired,
//       dateRequested: PropTypes.string.isRequired,
//       dateCompleted: PropTypes.string,
//     })
//   ).isRequired,
// };
