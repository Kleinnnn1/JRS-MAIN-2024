import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";

// Define table headers
const tableHeaders = [
  "Requestor",
  "Job Description",
  "Location",
  "Priority",
  "Action",
];

// Helper function to get priority class
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
export default function TableAssignedCompleted() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();

        const { data, error } = await supabase
          .from("Request")
          .select(
            `
          requestId,
          User(fullName),
          description,
          location,
          image,
          dateCompleted,
          dateStarted,
          expectedDueDate,
          extensionDate,
          priority,
          remarks,
          Department_request_assignment (
            staffName
          )
        `
          )
          .eq("status", "Completed");

        if (error) {
          throw new Error("Data could not be loaded");
        }

        const filteredData = data.filter((item) => {
          const staffNames = item.Department_request_assignment.map(
            (assign) => assign.staffName
          );
          return staffNames.includes(currentUser.fullName);
        });

        setRequests(filteredData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err.message);
        setError("Failed to load job assignments.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  }

  const filteredRequests = requests
    .filter(
      (req) =>
        req.User.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.dateCompleted) - new Date(b.dateCompleted));

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const tableContent =
    paginatedRequests.length > 0
      ? paginatedRequests.map(
          (
            {
              requestId,
              User,
              description,
              location,
              image,
              priority,
              dateStarted,
              expectedDueDate,
              extensionDate,
              dateCompleted,
              remarks,
            },
            index
          ) => [
            `${index + 1}. ${String(User.fullName)}`,
            description,
            location,
            priority ? (
              <span className={getPriorityClass(priority)}>{priority}</span>
            ) : (
              "N/A"
            ),
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
              onClick={() => {
                navigate(`/staff/job_assigned/details/${requestId}`, {
                  state: {
                    requestId,
                    fullName: User.fullName,
                    description,
                    location,
                    priority,
                    image,
                    dateStarted,
                    expectedDueDate,
                    extensionDate,
                    dateCompleted,
                    remarks,
                  },
                });
              }}
            >
              View
            </button>,
          ]
        )
      : [[]];

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-lg">
        <div className="mb-2 md:mb-0">
          <SearchBar title="Completed Assigned Job" />
        </div>
        <div className="w-full md:w-auto">
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <Table
        columns={8}
        rows={paginatedRequests.length}
        content={tableContent}
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
