import { useState } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import ModalForm from "./ModalForm";
import ReusableDropDownButton from "../../../components/ReusableDropDownButton";
import { useQuery } from "@tanstack/react-query";
import { getDeptHeadJobRequest } from "../../../service/apiDeptHeadRequestTable";
import { useAssignmentStore } from "../../../store/useAssignmentStore";

// Define table headers
const tableHeaders = [
  "Requestor",
  "Job Description",
  "Job Category",
  "Date Submitted",
  "Location",
  "Image",
  "Priority",
  "Action", // Removed Referral column
];

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

export default function ContentJobRequest() {
  const { data: requests = [], error } = useQuery({
    queryKey: ["requests"],
    queryFn: getDeptHeadJobRequest,
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // State for the image modal
  const [isImageModalOpen, setImageModalOpen] = useState(false); // State to control image modal
  const [imageSrc, setImageSrc] = useState(""); // State to store the clicked image

  const referralOptions = [
    { value: "1", label: "CSWS" },
    { value: "2", label: "MEWS" },
    { value: "3", label: "BGMS" },
  ];

  // Function to open the image modal
  const openImageModal = (src) => {
    setImageSrc(src); // Set the clicked image source
    setImageModalOpen(true); // Open the modal
  };

  const closeImageModal = () => {
    setImageModalOpen(false); // Close the modal
    setImageSrc(""); // Reset the image source
  };

  // Function to open the assignment modal
  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // Format request data
  const formattedData =
    requests.length > 0
      ? requests.map(
          (
            {
              fullName,
              description,
              location,
              jobCategory,
              requestDate,
              image,
              priority,
              deptReqAssId,
              requestId,
              idNumber,
            },
            index
          ) => [
            `${index + 1}. ${fullName || "N/A"}`, // Sequential number + fullName or "N/A" if missing
            description || "No description provided", // Fallback for missing description
            jobCategory || "Unknown Category", // Fallback for missing job category
            requestDate
              ? new Date(requestDate).toLocaleDateString()
              : "Invalid Date", // Fallback for invalid date
            location || "Unknown Location", // Fallback for missing location
            image ? (
              <img
                src={image}
                alt="Request"
                className="w-12 h-12 cursor-pointer"
                onClick={() => openImageModal(image)} // Open image in modal when clicked
              />
            ) : (
              "No Image"
            ), // Display image if available
            priority ? (
              <span className={getPriorityClass(priority)}>{priority}</span>
            ) : (
              <span className="text-gray-500">No Priority</span>
            ), // Apply priority styling or fallback
            <ReusableDropDownButton
              key={`dropdown-${index}`}
              options={referralOptions}
            />,
            <button
              key={`assign-btn-${index}`}
              className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
              onClick={() => {
                useAssignmentStore
                  .getState()
                  .setAssignmentData(
                    description,
                    jobCategory,
                    location,
                    deptReqAssId,
                    requestId,
                    idNumber
                  );

                console.log("Assigned Data:", {
                  fullName,
                  description,
                  location,
                  jobCategory,
                  requestDate,
                  image,
                  deptReqAssId,
                  requestId,
                  idNumber,
                });

                openModal();
              }}
            >
              Assign
            </button>,
          ]
        )
      : [[]]; // Return an empty array if no requests are available

  // Filter data based on search term
  const filteredContent = formattedData.filter((request) => {
    const jobDescription = request[1] ? request[1].toLowerCase() : "";
    const jobType = request[2] ? request[2].toLowerCase() : "";
    const requestor = request[0] ? request[0].toLowerCase() : "";
    const location = request[4] ? request[4].toLowerCase() : "";

    return (
      jobDescription.includes(searchTerm.toLowerCase()) ||
      jobType.includes(searchTerm.toLowerCase()) ||
      requestor.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex justify-between items-center rounded-t-lg">
        <SearchBar title="Job Request" showInput={true} />
        <ReusableSearchTerm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Table */}
      <Table
        columns={tableHeaders.length}
        rows={paginatedContent.length}
        content={paginatedContent} // Use paginated content here
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

      {/* Modal */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => console.log(selectedRequest)}
      />

      {/* Image Modal */}
      {isImageModalOpen && (
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

// import { useState } from "react";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import SearchBar from "../../../components/SearchBar";
// import Table from "../../../components/Table";
// import { useQuery } from "@tanstack/react-query";
// import { getDeptHeadJobRequest } from "../../../service/apiDeptHeadRequestTable";
// import DeptHeadRequestData from "../../department_head/JobRequest/DeptHeadJobRequestData";
// import ModalForm from "./ModalForm";

// const tableHeaders = [
//   "Requestor",
//   "Job Description",
//   "Job Category",
//   "Date Submitted",
//   "Location",
//   "Image",
//   "Priority",
//   "Referral",
//   "Action",
// ];

// export default function ContentJobRequest() {
//   const { data: request = [], error } = useQuery({
//     queryKey: ["requests"],
//     queryFn: getDeptHeadJobRequest,
//   });

//   // State for pagination, search, table data, and modal
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   // Function to open the modal with selected request
//   const openModal = (request) => {
//     setSelectedRequest(request);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRequest(null);
//   };

//   // Fetch data from DeptHeadRequestData component
//   const tableContent = DeptHeadRequestData(request, openModal) || [];

//   // Filter the table content based on the search term
//   const filteredContent = tableContent.filter((request) => {
//     const jobDescription = request[1] ? request[1].toLowerCase() : "";
//     const jobType = request[2] ? request[2].toLowerCase() : "";
//     const requestor = request[0] ? request[0].toLowerCase() : "";
//     const location = request[4] ? request[4].toLowerCase() : "";

//     return (
//       jobDescription.includes(searchTerm.toLowerCase()) ||
//       jobType.includes(searchTerm.toLowerCase()) ||
//       requestor.includes(searchTerm.toLowerCase()) ||
//       location.includes(searchTerm.toLowerCase())
//     );
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
//   const paginatedContent = filteredContent.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // if (error) {
//   //   return (
//   //     <p className="text-center text-red-500">Error fetching job requests</p>
//   //   );
//   // }

//   return (
//     <>
//       <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
//         <div className="my-4 mx-3 py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
//           <SearchBar title="Job Request" showInput={true} />
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>

//         {/* Table */}
//         {paginatedContent.length > 0 ? (
//           <Table
//             columns={tableHeaders.length}
//             rows={paginatedContent.length}
//             content={paginatedContent} // Use paginated content here
//             headers={tableHeaders}
//           />
//         ) : (
//           <p className="text-center text-gray-500">No job requests found</p>
//         )}

//         {/* Pagination */}
//         <ReusablePagination
//           rowsPerPage={rowsPerPage}
//           setRowsPerPage={setRowsPerPage}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           totalPages={totalPages}
//         />

//         {/* Modal for assigning staff */}
//         <ModalForm
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           onSubmit={() => console.log(selectedRequest)}
//         />
//       </div>
//     </>
//   );
// }
