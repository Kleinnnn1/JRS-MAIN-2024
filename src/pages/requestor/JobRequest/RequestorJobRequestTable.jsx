import { useState } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "./RequestorJobRequestForm";
import { useQuery } from "@tanstack/react-query";
import { getRequestorRequest } from "../../../service/apiRequestorRequestTable";

// Define table headers
const tableHeaders = [
  "Request ID",
  "Job Description",
  "Job Category",
  "Office",
  "Assigned Staff",
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
  const [imageModalOpen, setImageModalOpen] = useState(false); // State to control image modal
  const [imageSrc, setImageSrc] = useState(""); // State to store the clicked image

  const handleMakeRequest = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  const handleJobRequestSubmit = () => {
    closeModal();
  };

  // Function to open image modal
  const openImageModal = (src) => {
    setImageSrc(src); // Set the clicked image source
    setImageModalOpen(true); // Open the modal
  };

  const closeImageModal = () => {
    setImageModalOpen(false); // Close the modal
    setImageSrc(""); // Reset the image source
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

  // Pagination setup
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Create table content using paginated data
  const tableContent = mapRequestData(paginatedRequests, openImageModal) || []; // Use paginated requests

  // UI Layout
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
            <RequestorJobRequestForm
              onSubmit={handleJobRequestSubmit}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModalOpen && (
        <div
          id="imageModalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeImageModal}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
              aria-label="Close Image Modal"
            >
              &times;
            </button>
            <img src={imageSrc} alt="Full view" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

// Rename the function to avoid conflict
const mapRequestData = (requests, openImageModal) => {
  const getPriorityClass = (level) => {
    switch (level) {
      case "High":
        return "bg-red-500 text-white py-1 px-2 rounded";
      case "Medium":
        return "bg-yellow-500 text-black py-1 px-2 rounded";
      case "Low":
        return "bg-green-500 text-white py-1 px-2 rounded";
      default:
        return "";
    }
  };

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800", // Yellow for Pending
    Approved: "bg-green-200 text-green-800", // Green for Approved
    Rejected: "bg-red-200 text-red-800", // Red for Rejected
    InProgress: "bg-blue-200 text-blue-800", // Blue for In Progress
    Completed: "bg-gray-200 text-gray-800", // Gray for Completed
  };

  return requests.map(
    (
      {
        requestId,
        description,
        jobCategory,
        deptName,
        staffName,
        image,
        status,
        requestDate,
        priority,
      },
      index
    ) => {
      const statusClass = statusColors[status] || "bg-white text-black"; // Default class if status not found

      const requestData = [
        `${index + 1}. ${String(requestId)}`, // Sequential number + requestId
        description,
        jobCategory || "N/A",
        deptName || "N/A",
        staffName || "N/A", // If staffName is undefined or null, display "N/A"
        image ? (
          <img
            src={image}
            alt="Request Image"
            className="cursor-pointer"
            onClick={() => openImageModal(image)} // Open image in modal when clicked
          />
        ) : (
          "No Image"
        ), // Display image if available, otherwise "No Image"
        <span className={`py-1 px-3 rounded-md text-center ${statusClass}`}>
          {status}
        </span>, // Apply status color
        new Date(requestDate).toLocaleString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        priority ? (
          <span className={getPriorityClass(priority)}>{priority}</span>
        ) : (
          "N/A"
        ), // Apply styling to priority
        <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
          details
        </button>,
      ];

      return requestData;
    }
  );
};

// import { useState } from "react";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import Table from "../../../components/Table";
// import SearchBar from "../../../components/SearchBar";
// import RequestorJobRequestForm from "./RequestorJobRequestForm";
// import { useQuery } from "@tanstack/react-query";
// import { getRequestorRequest } from "../../../service/apiRequestorRequestTable";
// import DefaultImageUser from "../../../assets/images/DefaultImageUser.jpg";

// // Define table headers
// const tableHeaders = [
//   "Request ID",
//   "Job Description",
//   "Job Category",
//   "Office",
//   "Assigned Staff",
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

//   // Pagination setup
//   const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
//   const paginatedRequests = filteredRequests.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Create table content using paginated data
//   const tableContent = mapRequestData(paginatedRequests) || []; // Use paginated requests

//   // UI Layout
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

// // Rename the function to avoid conflict
// const mapRequestData = (requests) => {
//   const getPriorityClass = (level) => {
//     switch (level) {
//       case "High":
//         return "bg-red-500 text-white py-1 px-2 rounded";
//       case "Medium":
//         return "bg-yellow-500 text-black py-1 px-2 rounded";
//       case "Low":
//         return "bg-green-500 text-white py-1 px-2 rounded";
//       default:
//         return "";
//     }
//   };

//   const statusColors = {
//     Pending: "bg-yellow-200 text-yellow-800", // Yellow for Pending
//     Approved: "bg-green-200 text-green-800", // Green for Approved
//     Rejected: "bg-red-200 text-red-800", // Red for Rejected
//     InProgress: "bg-blue-200 text-blue-800", // Blue for In Progress
//     Completed: "bg-gray-200 text-gray-800", // Gray for Completed
//   };

//   return requests.map(
//     (
//       {
//         requestId,
//         description,
//         jobCategory,
//         deptName,
//         staffName,
//         image,
//         status,
//         requestDate,
//         priority,
//       },
//       index
//     ) => {
//       const statusClass = statusColors[status] || "bg-white text-black"; // Default class if status not found

//       const requestData = [
//         `${index + 1}. ${String(requestId)}`, // Sequential number + requestId
//         description,
//         jobCategory || "N/A",
//         deptName || "N/A",
//         staffName || "N/A", // If staffName is undefined or null, display "N/A"
//         image ? <img src={image} alt="Request Image" /> : "No Image", // Display image if available, otherwise "No Image"
//         <span className={`py-1 px-3 rounded-md text-center ${statusClass}`}>
//           {status}
//         </span>, // Apply status color
//         new Date(requestDate).toLocaleString(undefined, {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         }),
//         priority ? (
//           <span className={getPriorityClass(priority)}>{priority}</span>
//         ) : (
//           "N/A"
//         ), // Apply styling to priority
//         <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
//           details
//         </button>,
//       ];

//       return requestData;
//     }
//   );
// };
