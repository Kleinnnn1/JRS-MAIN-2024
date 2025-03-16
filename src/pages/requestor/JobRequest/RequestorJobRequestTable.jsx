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
import Logo from "../../../assets/images/Loading_2.gif";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLogo, setShowLogo] = useState(true);
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
    }, 1000);
    return () => clearTimeout(logoTimer);
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      if (!currentUser?.idNumber) throw new Error("Unable to fetch user info.");

      const { data: requests, error } = await supabase
        .from("Request")
        .select("requestId, description, jobCategory, image, status, requestDate, priority, idNumber")
        .eq("idNumber", currentUser.idNumber)
        .neq("status", "Completed")
        .order("requestDate", { ascending: false });

      if (error) throw error;

      setRequests(requests || []);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("public:Request")
      .on("postgres_changes", { event: "*", schema: "public", table: "Request" }, fetchRequests)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  const handleMakeRequest = () => {
    setIsModalOpen(true);
  };

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
            <SearchBar title="Job Requests" />
            <div className="flex space-x-4">
              <button
                onClick={handleMakeRequest}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                Make Request
              </button>
              <ReusableSearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </header>

          {error && <p className="text-red-600">{error}</p>}


            <Table columns={10} rows={paginatedRequests.length} content={mapRequestData(paginatedRequests, handleDetailsClick)} headers={tableHeaders} />


          <ReusablePagination
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />

          {isModalOpen && (
            <div id="modalBackdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
              <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg">
                  &times;
                </button>
                <RequestorJobRequestForm closeModal={() => setIsModalOpen(false)} />
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
    request.departmentNames || "N/A",
    <span className={`px-2 py-1 rounded-md ${request.status === "Pending" ? "bg-yellow-300" : request.status === "Ongoing" ? "bg-blue-300" : "bg-green-300"}`}>
      {request.status}
    </span>,
    request.priority,
    <span onClick={() => handleDetailsClick(request)} className="cursor-pointer text-blue-500 hover:text-blue-700">
      View
    </span>,
  ]);
