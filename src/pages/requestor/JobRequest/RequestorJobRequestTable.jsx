import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "./RequestorJobRequestForm";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";
import toast from "react-hot-toast";
import Logo from "../../../assets/images/Loading_2.gif"; // Use logo for loading

const tableHeaders = [
  "Request ID",
  "Description",
  "Job Category",
  "Office",
  "Status",
  "Priority",
  "Actions",
];

export default function RequestorJobRequestTable() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Initially true for loading logo
  const [showLogo, setShowLogo] = useState(true); // Show logo for 3 seconds
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show the logo for 3 seconds before fetching data
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      fetchRequests();
    }, 3000);

    return () => clearTimeout(logoTimer);
  }, []);

  const fetchRequests = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser || !currentUser.idNumber) {
        throw new Error("Unable to fetch current user information.");
      }

      const { data: requests, error } = await supabase
        .from("Request")
        .select(
          "requestId, description, jobCategory, status, requestDate, priority, idNumber"
        )
        .eq("idNumber", currentUser.idNumber)
        .neq("status", "Completed")
        .order("requestDate", { ascending: false });

      if (error) throw error;

      setRequests(requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Hide loading once data is fetched
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const tableContent =
    paginatedRequests.length > 0
      ? paginatedRequests.map((request) => [
          request.requestId,
          request.description,
          request.jobCategory,
          request.status,
          request.priority,
          <span
            onClick={() => navigate(`/requestor/job_request_detail/${request.requestId}`)}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            View
          </span>,
        ])
      : [[]];

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {showLogo ? (
        // **Show Logo for 3 seconds before fetching data**
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
          <p className="mt-4 text-gray-500">Loading, please wait...</p>
        </div>
      ) : (
        <>
          <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <SearchBar title="Job Requests" />
            <ReusableSearchTerm
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </header>

          {error && <p className="text-red-600">{error}</p>}

          <Table
            columns={6}
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
        </>
      )}
    </div>
  );
}
