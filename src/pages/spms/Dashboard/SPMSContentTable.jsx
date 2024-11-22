import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import ReusableViewButton from "../../../components/ReusableViewButton";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";

const tableHeaders = [
  "Timestamp",
  "Requestor",
  "Work Description",
  "Category",
  "No. of Person",
  "Department",
  "Processed by",
  "Photo",
  "Status",
  "Date Requested",
  "Date Completed",
  "Actions",
];

export default function SPMSContentTable() {
  const navigate = useNavigate();

  const [jobRequests, setJobRequests] = useState([
    {
      requestId: "REQ123",
      requestor: "Karen C. Cadalo",
      workDescription: "Fixing computer issues in Room 101",
      category: "IT Support",
      noOfPerson: 2,
      department: "IT Department",
      processedBy: "John Doe",
      photo: "https://via.placeholder.com/150",
      status: "Completed",
      dateRequested: "2024-09-01",
      dateCompleted: "2024-09-03",
    },
    
    // More job request data...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering based on search term
  const filteredRequests = jobRequests.filter(
    (job) =>
      job.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.workDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <button className="bg-green-500 p-2     rounded-lg">Download</button>

        {/* Reusable Search Term component */}
        <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table */}
      <Table
        columns={12}
        rows={paginatedRequests.length}
        content={paginatedRequests.map((job, index) => [
          <span key={`requestId-${index}`}>{job.requestId}</span>,
          <span key={`requestor-${index}`}>{job.requestor}</span>,
          <span key={`workDescription-${index}`}>{job.workDescription}</span>,
          <span key={`category-${index}`}>{job.category}</span>,
          <span key={`noOfPerson-${index}`}>{job.noOfPerson}</span>,
          <span key={`department-${index}`}>{job.department}</span>,
          <span key={`processedBy-${index}`}>{job.processedBy}</span>,
          <img key={`photo-${index}`} src={job.photo} alt="Job" className="h-10 w-10 object-cover rounded" />,
          <span key={`status-${index}`} className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(job.status)}`}>
            {job.status}
          </span>,
          <span key={`dateRequested-${index}`}>{job.dateRequested}</span>,
          <span key={`dateCompleted-${index}`}>{job.dateCompleted}</span>,
          <ReusableViewButton key={`view-btn-${index}`} onClick={() => navigate(`/job-requests/${job.requestId}`)} />,
        ])}
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
    </div>
  );
}
