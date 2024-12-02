//ContentJobRequest

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add navigation
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import ReusableDropDownButton from "../../../components/ReusableDropDownButton";
import { useQuery } from "@tanstack/react-query";
import { getDeptHeadJobRequest } from "../../../service/apiDeptHeadRequestTable";

const tableHeaders = [
  "Requestor",
  "Job Description",
  "Job Category",
  "Date Submitted",
  "Location",
  "Image",
  "Priority",
  "Action",
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
  const { data: requests = [] } = useQuery({
    queryKey: ["requests"],
    queryFn: getDeptHeadJobRequest,
  });

  const navigate = useNavigate(); // Add navigation hook
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const formattedData = requests.map(
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
        remarks,
      },
      index
    ) => [
      `${index + 1}. ${fullName || "N/A"}`,
      description || "No description provided",
      jobCategory || "Unknown Category",
      requestDate
        ? new Date(requestDate).toLocaleDateString()
        : "Invalid Date",
      location || "Unknown Location",
      image ? (
        <img
          src={image}
          alt="Request"
          className="w-12 h-12 cursor-pointer"
          onClick={() => console.log("Image clicked:", image)}
        />
      ) : (
        "No Image"
      ),
      priority ? (
        <span className={getPriorityClass(priority)}>{priority}</span>
      ) : (
        <span className="text-gray-500">No Priority</span>
      ),
      <button
        className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white"
        onClick={() =>
          navigate(`/department_head/job_request/detail/${requestId}`, {
            state: {
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
              remarks
            },
          })
        }
      >
        View
      </button>,
    ]
  );

  const filteredContent = formattedData.filter((request) =>
    request.some((item) =>
      String(item).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      <Table
        columns={tableHeaders.length}
        rows={paginatedContent.length}
        content={paginatedContent}
        headers={tableHeaders}
      />
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
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
