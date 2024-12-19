import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import supabase from "../../../service/supabase";
import { getDeptHeadJobRequest } from "../../../service/apiDeptHeadRequestTable";

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

export default function RequestorJobRequestData(requests) {
  const navigate = useNavigate(); // Initialize navigate
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800", // Yellow for Pending
    Approved: "bg-green-200 text-green-800", // Green for Approved
    Rejected: "bg-red-200 text-red-800", // Red for Rejected
    InProgress: "bg-blue-200 text-blue-800", // Blue for In Progress
    Completed: "bg-gray-200 text-gray-800", // Gray for Completed
  };

  // Fetch initial data
  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);
        const data = await getDeptHeadJobRequest();
        setRequests(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  // Set up real-time listener
  useEffect(() => {
    const subscription = supabase
      .channel("table-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Request",
        },
        async (payload) => {
          console.log("New row inserted:", payload.new);

          // Check if the new request matches the current user's department and is pending
          const { status, Department_request_assignment, ...newRequest } =
            payload.new;
          if (
            status === "Pending" &&
            Department_request_assignment?.deptId ===
              (await getCurrentUser()).deptId
          ) {
            // Add the new request to the existing list
            setRequests((prev) => [...prev, newRequest]);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Format the fetched data
  const formattedData = requests.map(
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
    ) => [
      `${index + 1}. ${String(requestId)}`, // Sequential number + requestId
      description,
      jobCategory || "N/A",
      deptName || "N/A",
      staffName || "N/A", // If staffName is undefined or null, display "N/A"
      image ? <img src={image} alt="Request" /> : "No Image", // Display image if available, otherwise "No Image"
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
      <button
        key={`view-btn-${index}`}
        className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
        onClick={() => {
          // Navigate to the job request details page
          navigate(`/job_request_detail/${requestId}`, {
            state: {
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
          });
        }}
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
    <div className="-mb-20 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex justify-between items-center rounded-t-lg">
        <SearchBar title="Pending" showInput={true} />
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
