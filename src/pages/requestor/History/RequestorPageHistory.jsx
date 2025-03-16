import { useState, useEffect } from "react"; // Import only once
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "../JobRequest/RequestorJobRequestForm";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";
import Logo from "../../../assets/images/Loading_2.gif";


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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLogo, setShowLogo] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleMakeRequest = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      fetchRequests();
    }, 1000);
    return () => clearTimeout(logoTimer);
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const currentUser = await getCurrentUser();
      if (!currentUser || !currentUser.idNumber) {
        throw new Error("Unable to fetch current user information.");
      }

      const { data: requests, error } = await supabase
        .from("Request")
        .select(
          "requestId, description, jobCategory, image, status, requestDate, priority, idNumber"
        )
        .eq("idNumber", currentUser.idNumber)
        .eq("status", "Completed") // Filter requests by status = "Completed"
        .order("requestDate", { ascending: true });

      if (error) throw error;

      setRequests(requests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("public:Request")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
        async (payload) => {
          const { eventType } = payload;

          if (
            eventType === "INSERT" ||
            eventType === "UPDATE" ||
            eventType === "DELETE"
          ) {
            await fetchRequests(); // Re-fetch all data on changes
          }
        }
      )
      .subscribe();

    fetchRequests(); // Initial fetch

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const openImageModal = (src) => {
    setImageSrc(src);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setImageSrc("");
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

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {showLogo ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
          <p className="mt-4 text-gray-500">Loading, please wait...</p>
        </div>
      ) : (
        <>
          <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <SearchBar title="My Completed Requests" />
            <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {error && <p className="text-red-600">{error}</p>}

          <Table
            columns={tableHeaders.length}
            rows={paginatedRequests.length}
            content={mapRequestData(paginatedRequests, handleDetailsClick)}
            headers={tableHeaders}
          />

          <ReusablePagination
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />

          {isModalOpen && (
            <div
              id="modalBackdrop"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
                <button
                  onClick={closeModal}
                  className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10"
                >
                  &times;
                </button>
                <RequestorJobRequestForm closeModal={closeModal} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const mapRequestData = (requests, handleDetailsClick) =>
  requests.map((request) => [
    request.requestId,
    request.description,
    request.jobCategory,
    request.office || "N/A",
    <span
      onClick={() => handleDetailsClick(request)}
      className="cursor-pointer text-blue-500 hover:text-blue-700"
    >
      View
    </span>,
  ]);
