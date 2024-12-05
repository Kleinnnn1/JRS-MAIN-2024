import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import { useQuery } from "@tanstack/react-query";
import { getDeptHeadOngoingJobRequest } from "../../../service/apiDeptHeadOngoingRequestTable";

// Define priority styling
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

// Table headers
const tableHeaders = [
  "Requestor",
  "Job Description",
  "Job Position",
  "Location",
  "Image",
  "Priority",
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

  // Format the fetched data into table content
  const tableContent =
    request.length > 0
      ? request.map(
          (
            { fullName, description, jobCategory, location, image, priority },
            index
          ) => [
            `${index + 1}. ${String(fullName || "N/A")}`, // Display "N/A" if requestor is missing
            description || "N/A",
            jobCategory || "N/A",
            location || "N/A",
            image ? (
              <img src={image} alt="Request" className="h-12 w-12" />
            ) : (
              "No Image"
            ),
            priority ? (
              <span className={getPriorityClass(priority)}>{priority}</span>
            ) : (
              "N/A"
            ), // Apply styling to priority
            <button
              className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
              onClick={() => navigate(`/requests/view/${index}`)}
            >
              View
            </button>,
          ]
        )
      : [[]];

  // Filter the table content based on the search term
  const filteredContent = tableContent.filter((row) => {
    const requestor = row[0] ? row[0].toLowerCase() : "";
    const jobDescription = row[1] ? row[1].toLowerCase() : "";
    const jobType = row[2] ? row[2].toLowerCase() : "";
    const location = row[3] ? row[3].toLowerCase() : "";

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
    console.log(error);
  }

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Job Ongoing" showInput={true} />

        {/* Search Term Component */}
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
          content={paginatedContent}
          headers={tableHeaders}
        />
      ) : (
        <p className="text-center text-gray-500">No ongoing jobs found</p>
      )}

      {/* Pagination */}
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
