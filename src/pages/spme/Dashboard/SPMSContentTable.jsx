import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import { saveAs } from "file-saver"; // Install this package: `npm install file-saver`

const tableHeaders = [
  "CSSID", 
  "Date",
  "Name", 
  "email",
  "clientType",
  "role",
  "sex",
  "age",
  "region",
  "campus",
  "transactedOffice",
  "serviceAvailed",
  "ccAwareness",  
  "ccVisibility",
  "ccHelp",
  "SQD0",
  "SQD1",
  "SQD2",  
  "SQD3",
  "SQD4",
  "SQD5",
  "SQD6",
  "SQD7",
  "SQD8",
  "comments",
];

export default function SPMSContentTable() {
  const navigate = useNavigate();

  // Temporary example data
  const [jobRequests, setJobRequests] = useState([
    {
      CSSID: "CSS-001",
      Date: "2023-12-01",
      Name: "A",
      email: "johndoe@example.com",
      clientType: "Student",
      role: "User",
      sex: "Male",
      age: "25",
      region: "Region A",
      campus: "Main",
      transactedOffice: "Office 1",
      serviceAvailed: "Counseling",
      ccAwareness: "Yes",
      ccVisibility: "High",
      ccHelp: "Yes",
      SQD0: "4",
      SQD1: "5",
      SQD2: "4",
      SQD3: "4",
      SQD4: "5",
      SQD5: "4",
      SQD6: "3",
      SQD7: "5",
      SQD8: "4",
      comments: "Good service",
    },
    {
      CSSID: "CSS-001",
      Date: "2023-12-02",
      Name: "B",
      email: "johndoe@example.com",
      clientType: "Student",
      role: "User",
      sex: "Male",
      age: "25",
      region: "Region A",
      campus: "Main",
      transactedOffice: "Office 1",
      serviceAvailed: "Counseling",
      ccAwareness: "Yes",
      ccVisibility: "High",
      ccHelp: "Yes",
      SQD0: "4",
      SQD1: "5",
      SQD2: "4",
      SQD3: "4",
      SQD4: "5",
      SQD5: "4",
      SQD6: "3",
      SQD7: "5",
      SQD8: "4",
      comments: "Good service",
    },
    {
      CSSID: "CSS-001",
      Date: "2023-12-03",
      Name: "C",
      email: "johndoe@example.com",
      clientType: "Student",
      role: "User",
      sex: "Male",
      age: "25",
      region: "Region A",
      campus: "Main",
      transactedOffice: "Office 1",
      serviceAvailed: "Counseling",
      ccAwareness: "Yes",
      ccVisibility: "High",
      ccHelp: "Yes",
      SQD0: "4",
      SQD1: "5",
      SQD2: "4",
      SQD3: "4",
      SQD4: "5",
      SQD5: "4",
      SQD6: "3",
      SQD7: "5",
      SQD8: "4",
      comments: "Good service",
    },
    {
      CSSID: "CSS-001",
      Date: "2023-12-04",
      Name: "D",
      email: "johndoe@example.com",
      clientType: "Student",
      role: "User",
      sex: "Male",
      age: "25",
      region: "Region A",
      campus: "Main",
      transactedOffice: "Office 1",
      serviceAvailed: "Counseling",
      ccAwareness: "Yes",
      ccVisibility: "High",
      ccHelp: "Yes",
      SQD0: "4",
      SQD1: "5",
      SQD2: "4",
      SQD3: "4",
      SQD4: "5",
      SQD5: "4",
      SQD6: "3",
      SQD7: "5",
      SQD8: "4",
      comments: "Good service",
    },
    {
      CSSID: "CSS-001",
      Date: "2023-12-05",
      Name: "E",
      email: "johndoe@example.com",
      clientType: "Student",
      role: "User",
      sex: "Male",
      age: "25",
      region: "Region A",
      campus: "Main",
      transactedOffice: "Office 1",
      serviceAvailed: "Counseling",
      ccAwareness: "Yes",
      ccVisibility: "High",
      ccHelp: "Yes",
      SQD0: "4",
      SQD1: "5",
      SQD2: "4",
      SQD3: "4",
      SQD4: "5",
      SQD5: "4",
      SQD6: "3",
      SQD7: "5",
      SQD8: "4",
      comments: "Good service",
    },
    // Add more example entries as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(""); // For date range start
  const [endDate, setEndDate] = useState(""); // For date range end

  // Filter by search term and date range
  const filteredRequests = jobRequests.filter((job) => {
    const jobDate = new Date(job.Date);
    const isWithinDateRange =
      (!startDate || new Date(startDate) <= jobDate) &&
      (!endDate || new Date(endDate) >= jobDate);

    return (
      isWithinDateRange &&
      Object.values(job)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Export to CSV
  const handleDownload = () => {
    const headers = tableHeaders.join(",");
    const rows = filteredRequests.map((job) =>
      tableHeaders.map((header) => job[header] || "").join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `job_requests_${startDate || "all"}_${endDate || "all"}.csv`);
  };

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <div className="flex text-white items-center space-x-2">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          Download
        </button>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 text-black p-1 rounded border"
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 text-black p-1 rounded border"
            />
          </label>
        </div>

        <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table */}
      <Table
        columns={tableHeaders.length}
        rows={paginatedRequests.length}
        content={paginatedRequests.map((job, index) =>
          tableHeaders.map((header) => (
            <span key={`${header}-${index}`}>{job[header] || "n/a"}</span>
          ))
        )}
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
