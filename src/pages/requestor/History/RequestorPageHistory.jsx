import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "../JobRequest/RequestorJobRequestForm";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";
import Logo from "../../../assets/images/logo.png"; // Logo for initial loading

const tableHeaders = [
  "Request ID",
  "Job Description",
  "Job Category",
  "Office",
  "Actions",
];

export default function JobRequestHistory() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
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
        .select("requestId, description, jobCategory, status, requestDate, priority, idNumber")
        .eq("idNumber", currentUser.idNumber)
        .eq("status", "Completed")
        .order("requestDate", { ascending: true });

      if (error) throw error;

      setRequests(requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  const handleDetailsClick = (request) => {
    navigate(`/requestor/job_request_detail/${request.requestId}`, {
      state: { requestData: request },
    });
  };

  const tableContent =
    paginatedRequests.length > 0
      ? paginatedRequests.map((request) => [
          request.requestId,
          request.description,
          request.jobCategory,
          request.departmentNames || "N/A",
          <span
            onClick={() => handleDetailsClick(request)}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            Details
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
      ) : loading ? (
        // **Show loading animation while fetching data**
        <div className="flex justify-center items-center min-h-screen">
          <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      ) : (
        <>
          <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <SearchBar title="My Completed Request" />
            <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {error && <p className="text-red-600">{error}</p>}

          <Table columns={5} rows={paginatedRequests.length} content={tableContent} headers={tableHeaders} />

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
