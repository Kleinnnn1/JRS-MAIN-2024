import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import SetDate from "./SetDate";
import { useQuery } from "@tanstack/react-query";
import { getJobAssign } from "../../../service/apiStaffTable";
import StaffAssignJobData from "./StaffAssignJobData";

const tableHeaders = [
  "Requestor",
  "Job Description",
  "Location",
  "Image",
  "Date Assigned",
  "Date Started",
  "Set Assesment",
  "Priority",
  "Action",
];

export default function TableCertificate() {
  const { data: request = [], error } = useQuery({
    queryKey: ["request"],
    queryFn: getJobAssign,
  });
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  const tableContent = StaffAssignJobData(paginatedRequests) || [];

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Assigned Job" />
        <ReusableSearchTerm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Table */}
      <Table
        columns={8}
        rows={paginatedRequests.length}
        content={tableContent}
        headers={tableHeaders}
      />

      {/* Reusable Pagination Component */}
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
// import { useNavigate } from "react-router-dom";
// import SearchBar from "../../../components/SearchBar";
// import Table from "../../../components/Table";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
// import SetDate from "./SetDate";

// const tableHeaders = [
//   "Requestor",
//   "Job Description",
//   "Location",
//   "Image",
//   "Date Started",
//   "Set Due Date",
//   "Priority",
//   "Action",
// ];

// export default function TableCertificate() {
//   const navigate = useNavigate();

//   const tableContent = [
//     {
//       jobDescription: "Broken Door",
//       requestor: "Ms. Charlene V",
//       location: "CITC Faculty Office",
//       dateRequested: "28-08-2024",
//       // dateStarted: "N/A",
//       //  expectedCompletionDate: "Set Date",
//       priorityLevel: "High",
//     },
//     {
//       jobDescription: "Set up projectors",
//       requestor: "Mr. John Doe",
//       location: "Conference Room A",
//       dateRequested: "22-08-2024",
//       //  dateStarted: "N/A",
//       //  expectedCompletionDate: "Set Date",
//       priorityLevel: "Medium",
//     },
//     {
//       jobDescription: "Clean storage",
//       requestor: "Ms. Jane Smith",
//       location: "Storage Room",
//       dateRequested: "20-08-2024",
//       //  dateStarted: "N/A",
//       //  expectedCompletionDate: "Set Date",
//       priorityLevel: "Low",
//     },
//     // Add more rows as needed
//   ];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Function to get highlight class based on priority level
//   const getPriorityClass = (level) => {
//     switch (level) {
//       case "High":
//         return "bg-red-500 text-white py-1 px-2 rounded"; // Red for High
//       case "Medium":
//         return "bg-yellow-500 text-black py-1 px-2 rounded"; // Yellow for Medium
//       case "Low":
//         return "bg-green-500 text-white py-1 px-2 rounded"; // Green for Low
//       default:
//         return ""; // No highlight
//     }
//   };

//   // Filter table content based on search term
//   const filteredContent = tableContent.filter(
//     (request) =>
//       request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
//   const paginatedContent = filteredContent.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
//       <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
//         <SearchBar title="Assigned Job" />
//         <ReusableSearchTerm
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         />
//       </div>

//       {/* Table */}
//       <Table
//         columns={8}
//         rows={paginatedContent.length}
//         content={paginatedContent.map((request, index) => [
//           <span key={`jobDescription-${index}`}>{request.jobDescription}</span>,
//           <span key={`requestor-${index}`}>{request.requestor}</span>,
//           <span key={`location-${index}`}>{request.location}</span>,
//           <span>image</span>,
//           <SetDate />,
//           <SetDate />,
//           // <button className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2">
//           //   Set Date
//           // </button>,
//           <span
//             key={`priorityLevel-${index}`}
//             className={getPriorityClass(request.priorityLevel)}
//           >
//             {request.priorityLevel}
//           </span>,
//           <button className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2">
//             Completed
//           </button>,
//         ])}
//         headers={tableHeaders}
//       />

//       {/* Reusable Pagination Component */}
//       <ReusablePagination
//         rowsPerPage={rowsPerPage}
//         setRowsPerPage={setRowsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />
//     </div>
//   );
// }
