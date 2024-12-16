import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import { saveAs } from "file-saver";

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
  const [jobRequests, setJobRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Map table headers to database column names
  const fieldMapping = {
    CSSID: "css_id",
    Date: "date",
    Name: "name",
    email: "email",
    clientType: "clientType",
    role: "role",
    sex: "sex",
    age: "age",
    region: "region",
    campus: "campus",
    transactedOffice: "transactedOffice",
    serviceAvailed: "serviceAvailed",
    ccAwareness: "ccAwareness",
    ccVisibility: "ccVisibility",
    ccHelp: "ccHelp",
    SQD0: "SQD0",
    SQD1: "SQD1",
    SQD2: "SQD2",
    SQD3: "SQD3",
    SQD4: "SQD4",
    SQD5: "SQD5",
    SQD6: "SQD6",
    SQD7: "SQD7",
    SQD8: "SQD8",
    comments: "comments",
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Client_satisfaction_survey")
        .select("*");
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setJobRequests(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter by search term and date range
  const filteredRequests = jobRequests.filter((job) => {
    const jobDate = new Date(job.date);
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
      tableHeaders
        .map((header) =>
          header === "Date"
            ? `"${job[fieldMapping[header]]}"`
            : job[fieldMapping[header]] || ""
        )
        .join(",")
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
          <label className="flex items-center space-x-2">
            <span>Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-black p-1 rounded border"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span>End Date:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-black p-1 rounded border"
            />
          </label>
        </div>

        <ReusableSearchTerm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={tableHeaders.length}
          rows={paginatedRequests.length}
          content={paginatedRequests.map((job, index) =>
            tableHeaders.map((header) => (
              <span key={`${header}-${index}`}>
                {job[fieldMapping[header]] || "n/a"}
              </span>
            ))
          )}
          headers={tableHeaders}
        />
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
