import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import supabase from "../../../service/supabase";
import { getDeptHeadJobRequest } from "../../../service/apiDeptHeadRequestTable";
import { getCurrentUser } from "../../../service/apiAuth";

const tableHeaders = [

  "Requestor",
  "Job Description",
  "Job Category",
  "Location",
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
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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
      location || "Unknown Location",
      priority ? (
        <span className={getPriorityClass(priority)}>{priority}</span>
      ) : (
        <span className="text-gray-500">No Priority</span>
      ),
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div className="text-center text-red-500">Error: {error}</div>;
  // }

  return (
    <div className="-mb-20 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className=" py-4 px-6 bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
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
