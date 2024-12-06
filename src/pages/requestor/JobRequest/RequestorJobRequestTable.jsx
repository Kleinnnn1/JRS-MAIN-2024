import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import ReusableSearchTerm from "../../../components/ReusableSearchTerm";
import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "./RequestorJobRequestForm";
import supabase from "../../../service/supabase"; // Ensure you have this setup

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
      const { data: requests, error } = await supabase
        .from("Request")
        .select(
          "requestId, description, jobCategory, image, status, requestDate, priority"
        )
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

      // Combine the data from all queries manually
      const requestsWithDepartments = requests.map((request) => {
        const assignmentsForRequest = assignments.filter(
          (assignment) => assignment.requestId === request.requestId
        );

        // Create a Set to eliminate duplicate department names
        const departmentNames = [
          ...new Set(
            assignmentsForRequest.map((assignment) => {
              const department = departments.find(
                (dept) => dept.deptId === assignment.deptId
              );
              return department ? department.deptName : "Unknown Department";
            })
          ),
        ].join(", "); // Join the unique department names with a comma

        return {
          ...request,
          departmentNames,
          staffNames: assignmentsForRequest
            .map((assignment) => assignment.staffName)
            .join(", "),
        };
      });

      console.log(
        "Fetched requests with unique departments:",
        requestsWithDepartments
      );
      setRequests(requestsWithDepartments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription setup
  useEffect(() => {
    const channel = supabase
      .channel("public:Request")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Request" },
        (payload) => {
          console.log("Change received!", payload);
          const { eventType, new: newData, old } = payload;

          if (eventType === "INSERT") {
            setRequests((prev) => [newData, ...prev]);
          } else if (eventType === "UPDATE") {
            setRequests((prev) =>
              prev.map((request) =>
                request.requestId === newData.requestId ? newData : request
              )
            );
          } else if (eventType === "DELETE") {
            setRequests((prev) =>
              prev.filter((request) => request.requestId !== old.requestId)
            );
          }
        }
      )
      .subscribe();

    // Fetch initial data
    fetchRequests();

    // Cleanup subscription on unmount
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

  const handleDetailsClick = (request) => {
    navigate(`/requestor/job_request_detail/${request.requestId}`, {
      state: {
        ...request,
      },
    });
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
      ? mapRequestData(paginatedRequests, openImageModal, handleDetailsClick)
      : [[]];

  return (
    <div className="max-w-full mx-auto p-6 m-5 bg-white rounded-lg shadow-lg">
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <SearchBar title="Job Requests" />
        <div className="flex space-x-4">
          <button
            onClick={handleMakeRequest}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
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
        return "bg-red-500 text-white py-1 px-2 rounded";
      case "Medium":
        return "bg-yellow-500 text-black py-1 px-2 rounded";
      case "Low":
        return "bg-green-500 text-white py-1 px-2 rounded";
      default:
        return "";
    }
  };

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Approved: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
    InProgress: "bg-blue-200 text-blue-800",
    Completed: "bg-gray-200 text-gray-800",
  };

  return requests.map((request) => {
    const statusClass = statusColors[request.status] || "bg-white text-black";

    // Use the already combined staff names and department names from fetchRequests
    const staffNames = request.staffNames || "No staff assigned";
    const office = request.departmentNames || "N/A";

    return [
      request.requestId,
      request.description,
      request.jobCategory || "N/A",
      office, // Display the deptName as Office
      staffNames, // Display the combined staff names
      request.image ? (
        <img
          src={request.image}
          alt="Request Image"
          className="cursor-pointer"
          onClick={() => openImageModal(request.image)}
        />
      ) : (
        "No Image"
      ),
      <span className={`py-1 px-3 rounded-md text-center ${statusClass}`}>
        {request.status}
      </span>,
      new Date(request.requestDate).toLocaleString(),
      request.priority ? (
        <span className={getPriorityClass(request.priority)}>
          {request.priority}
        </span>
      ) : (
        "N/A"
      ),
      <button
        onClick={() => handleDetailsClick(request)}
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
      >
        Details
      </button>,
    ];
  });
};
