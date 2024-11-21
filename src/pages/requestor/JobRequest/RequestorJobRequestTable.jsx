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
  "Job Category",
  "Process by",
  "Staff Assigned",
  "Image",
  "Status",
  "Date Requested",
  "Priority",
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
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import Table from "../../../components/Table";
// import SearchBar from "../../../components/SearchBar";
// import RequestorJobRequestForm from "./RequestorJobRequestForm";
// import { useQuery } from "@tanstack/react-query";
// import { getRequestorRequest } from "../../../service/apiRequestorRequestTable";
// import RequestorJobRequestData from "./RequestorJobRequestData";

// const tableHeaders = [
//   "Request ID",
//   "Job Description",
//   "Job Category",
//   "Process by",
//   "Staff Assigned",
//   "Image",
//   "Status",
//   "Date Requested",
//   "Priority",
//   "Actions",
// ];

// export default function RequestorJobRequestTable() {
//   const { data: request = [], error } = useQuery({
//     queryKey: ["requests"],
//     queryFn: getRequestorRequest,
//   });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleMakeRequest = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);
//   const handleClickOutsideModal = (e) => {
//     if (e.target.id === "modalBackdrop") closeModal();
//   };

//   const handleJobRequestSubmit = () => {
//     // Handle new requests here if necessary
//     closeModal();
//   };

//   // Filter job requests based on search term and sort by Date Requested
//   const filteredRequests = request
//     .filter(
//       (request) =>
//         request.requestor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.status?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));

//   // Sort by Date Requested in descending order

//   const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
//   const paginatedRequests = filteredRequests.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Create table content or show no data message
//   const tableContent = RequestorJobRequestData(paginatedRequests) || []; // Use paginated requests

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
//             <RequestorJobRequestForm
//               onSubmit={handleJobRequestSubmit}
//               closeModal={closeModal}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
