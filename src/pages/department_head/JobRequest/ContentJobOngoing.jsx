import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import supabase from "../../../service/supabase"; // Import Supabase client
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
  "Priority",
  "Action",
];

export default function ContentJobOngoing() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for pagination, search, and data
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch initial data from Supabase
  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);
        const data = await getDeptHeadOngoingJobRequest();
        setRequests(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching ongoing job requests:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();

    // Set up a subscription for real-time updates
    const subscription = supabase
      .channel("public:Request")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
        (payload) => {
          console.log("Change received:", payload);
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            fetchRequests(); // Re-fetch data on insert or update
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Format the fetched data into table content
  const tableContent =
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
              remarks,
              status,
            },
            index
          ) => [
            `${index + 1}. ${String(fullName || "N/A")}`, // Display "N/A" if requestor is missing
            description || "N/A",
            jobCategory || "N/A",
            location || "N/A",
            priority,
            <button
              className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white"
              onClick={() => {
                console.log({
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
                  status,
                }); // Log the state object

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
                    remarks,
                    status,
                  },
                });
              }}
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div className="text-center text-red-500">Error: {error}</div>;
  // }

  return (
   <div className="-mb-20 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className=" py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Ongoing" showInput={true} />

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
