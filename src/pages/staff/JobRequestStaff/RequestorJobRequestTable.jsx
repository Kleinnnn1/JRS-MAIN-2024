import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "./RequestorJobRequestForm";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";

const tableHeaders = [
  "Request ID",
  "Job Description",
  "Job Category",
  "Office",
  // "Assigned Staff",
  // "Image",
  "Status",
  //  "Date Requested",
  "Priority",
  "Actions",
];

export default function RequestorJobRequestTable() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleMakeRequest = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

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
        .neq("status", "Completed") // Add this filter
        .order("requestDate", { ascending: true });

      if (error) throw error;

      const { data: assignments, error: assignmentError } = await supabase
        .from("Department_request_assignment")
        .select("requestId, staffName, deptId");

      if (assignmentError) throw assignmentError;

      const { data: departments, error: departmentError } = await supabase
        .from("Department")
        .select("deptId, deptName");

      if (departmentError) throw departmentError;

      const requestsWithDepartments = requests.map((request) => {
        const assignmentsForRequest = assignments.filter(
          (assignment) => assignment.requestId === request.requestId
        );

        const departmentNames = [
          ...new Set(
            assignmentsForRequest.map((assignment) => {
              const department = departments.find(
                (dept) => dept.deptId === assignment.deptId
              );
              return department ? department.deptName : "Unknown Department";
            })
          ),
        ].join(", ");

        return {
          ...request,
          departmentNames,
          staffNames: assignmentsForRequest
            .map((assignment) => assignment.staffName)
            .join(", "),
        };
      });

      setRequests(requestsWithDepartments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAndSetRequests = async () => {
    try {
      setLoading(true);
      await fetchRequests(); // Re-fetch all data
    } catch (err) {
      console.error("Error fetching updated requests:", err.message);
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
            await fetchAndSetRequests(); // Re-fetch all data on changes
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
    navigate(`/staff/my_request/detail/${request.requestId}`, {
      state: { requestData: request },
    });
  };

  const tableContent =
    paginatedRequests.length > 0
      ? mapRequestData(paginatedRequests, openImageModal, handleDetailsClick)
      : [[]];

  return (
    <div className="max-w-full -mt-14 mx-auto p-2 m-5 bg-white rounded-lg shadow-lg">
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <SearchBar title="Job Requests" />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
          <button
            onClick={handleMakeRequest}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-2 rounded-md"
          >
            Make Request
          </button>
          <ReusableSearchTerm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {error && <p className="text-red-600">{error}</p>}

      <Table
        columns={10}
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

      {isModalOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutsideModal}
        >
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
              aria-label="Close Modal"
            >
              &times;
            </button>
            <RequestorJobRequestForm closeModal={closeModal} />
          </div>
        </div>
      )}

      {imageModalOpen && (
        <div
          id="imageModalBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeImageModal}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
              aria-label="Close Image Modal"
            >
              &times;
            </button>
            <img src={imageSrc} alt="Full view" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

const mapRequestData = (requests, openImageModal, handleDetailsClick) => {
  const getPriorityClass = (level) => {
    switch (level) {
      case "High":
        return "bg-red-400";
      case "Medium":
        return "bg-yellow-300";
      case "Low":
        return "bg-green-300";
      default:
        return "bg-gray-300";
    }
  };

  return requests.map((request) => {
    const formattedDate = new Date(request.requestDate)
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");

    return [
      request.requestId,
      request.description,
      request.jobCategory,
      request.departmentNames || "N/A",
      // request.staffNames || "N/A",
      request.status,
      <span
        className={`px-2 py-1 rounded-md ${getPriorityClass(request.priority)}`}
      >
        {request.priority}
      </span>,
      <span
        onClick={() => handleDetailsClick(request)}
        className="cursor-pointer text-blue-500 hover:text-blue-700"
      >
        Details
      </span>,
    ];
  });
};
