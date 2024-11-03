import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusableViewButton from "../../../components/ReusableViewButton";
import { useQuery } from "@tanstack/react-query";
import { getDeptHeadOngoingJobRequest } from "../../../service/apiDeptHeadOngoingRequestTable";
import DeptHeadOngoingRequestData from "./DeptHeadOngoingJobRequestData";

const tableHeaders = [
  "Requestor",
  "Job Description",
  "Job Position",
  "Assigned Staff",
  "Location",
  "Image",
  "Prioritization",
  "Start Date",
  "Due Date",
  "Action",
];

export default function ContentJobOngoing() {
  const { data: request = [], error } = useQuery({
    queryKey: ["request"],
    queryFn: getDeptHeadOngoingJobRequest,
  });

  const navigate = useNavigate();

  // State for pagination, search, and data
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for table content
  const tableContent = DeptHeadOngoingRequestData(request) || [];

  // Filter the table content based on the search term
  const filteredContent = tableContent.filter((request) => {
    const requestor = request[0] ? request[0].toLowerCase() : "";
    const jobDescription = request[1] ? request[1].toLowerCase() : "";
    const jobType = request[2] ? request[2].toLowerCase() : "";
    const location = request[4] ? request[4].toLowerCase() : "";

    return (
      requestor.includes(searchTerm.toLowerCase()) ||
      jobDescription.includes(searchTerm.toLowerCase()) ||
      jobType.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (error) {
    return (
      <p className="text-center text-red-500">Error fetching job requests</p>
    );
  }

  return (
    <>
      <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
        <div className="my-4 mx-3 py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
          <SearchBar title="Job Ongoing" showInput={true} />

          {/* Use ReusableSearchTerm for the search functionality */}
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Table */}
        {paginatedContent.length > 0 ? (
          <Table
            columns={tableHeaders.length}
            rows={paginatedContent.length}
            content={paginatedContent} // Pass paginatedContent, not paginatedContent.length
            headers={tableHeaders}
          />
        ) : (
          <p className="text-center text-gray-500">No ongoing jobs found</p>
        )}

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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReusablePagination from "../../../components/ReusablePagination";
// import ReusableSearchTerm from "../../../components/ReusableSearchTerm"; // Import ReusableSearchTerm
// import SearchBar from "../../../components/SearchBar";
// import Table from "../../../components/Table";
// import ReusableViewButton from "../../../components/ReusableViewButton";

// const tableHeaders = [
//   "Requestor",
//   "Job Description",
//   "Job Position",
//   "Assigned Staff",
//   "Location",
//   "Image",
//   "Prioritization",
//   "Start Date",
//   "Due Date",
//   "Action",
// ];

// export default function ContentJobOngoing() {
//   const navigate = useNavigate();

//   // State for pagination, search, and data
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Sample data for table content
//   const tableContent = [
//     {
//       requesterId: "1. Kenn",
//       jobDescription: "Broken Door",
//       jobType: "Carpenter",
//       requestor: "Cardo Dalisay",
//       dateSubmitted: "3rd floor CITC Building Room 309",
//       assignedTo: "image",
//       location: "high ",
//       prioritization: "High",
//     },
//     // Add more rows as necessary
//   ];

//   // Filtered content based on search term
//   const filteredContent = tableContent.filter(
//     (request) =>
//       request.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.requestor.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const totalPages = Math.ceil(filteredContent.length / rowsPerPage);
//   const paginatedContent = filteredContent.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <>
//       <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
//         <div className="my-4 mx-3 py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
//           <SearchBar title="Job Ongoing" showInput={true} />

//           {/* Use ReusableSearchTerm for the search functionality */}
//           <ReusableSearchTerm
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </div>

//         {/* Table */}
//         {paginatedContent.length > 0 ? (
//           <Table
//             columns={9}
//             rows={paginatedContent.length}
//             content={paginatedContent.map((request, index) => [
//               <span key={`requesterId-${index}`}>{request.requesterId}</span>,
//               <span key={`jobDescription-${index}`}>
//                 {request.jobDescription}
//               </span>,
//               <span key={`jobType-${index}`}>{request.jobType}</span>,
//               <span key={`requestor-${index}`}>{request.requestor}</span>,
//               <span key={`dateSubmitted-${index}`}>
//                 {request.dateSubmitted}
//               </span>,
//               <span key={`assignedTo-${index}`}>{request.assignedTo}</span>,
//               <span key={`location-${index}`}>{request.location}</span>,
//               <span key={`prioritization-${index}`}>
//                 {request.prioritization}
//               </span>,
//               <span>2020 - 11 - 24</span>,
//               <ReusableViewButton
//                 key={`view-btn-${index}`}
//                 onClick={() => navigate("/department_head/job_ongoing/view")}
//               />,
//             ])}
//             headers={tableHeaders}
//           />
//         ) : (
//           <p className="text-center text-gray-500">No ongoing jobs found</p>
//         )}

//         {/* ReusablePagination component */}
//         <ReusablePagination
//           rowsPerPage={rowsPerPage}
//           setRowsPerPage={setRowsPerPage}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           totalPages={totalPages}
//         />
//       </div>
//     </>
//   );
// }
