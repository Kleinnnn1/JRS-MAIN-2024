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

const tableHeaders = [
  "Request ID",
  "Description",
  "Job Category",
  "Office",
  // "Assigned Staff",
  "Status",
  // "Date Requested",
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

  const handleMakeRequest = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser || !currentUser.idNumber) {
        throw new Error("Unable to fetch current user information.");
      }

      // Fetch the user's requests to check for `completedCertificate`
      const { data: requests, error } = await supabase
        .from("Request")
        .select("requestId, completedCertificate")
        .eq("idNumber", currentUser.idNumber);

      if (error) throw error;

      // Check if any request lacks a `completedCertificate`
      const hasIncompleteCertificate = requests.some(
        (request) => !request.completedCertificate
      );

      if (hasIncompleteCertificate) {
        toast.error(
          "Please answer the client satisfaction form and timestamp the job completed form first before creating another request."
        );
        return;
      }

      // Allow the user to make a new request
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

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
        .neq("status", "Completed") // Exclude requests with status = "Completed"
        .order("requestDate", { ascending: false });

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
    navigate(`/department_head/job_request_detail/${request.requestId}`, {
      state: { requestData: request },
    });
  };

  const tableContent =
    paginatedRequests.length > 0
      ? mapRequestData(paginatedRequests, openImageModal, handleDetailsClick)
      : [[]];

  return (
    <div className="max-w-full -mt-1 mx-auto p-6 m-5 bg-white rounded-lg shadow-lg">
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
  // const getPriorityClass = (level) => {
  //   switch (level) {
  //     case "High":
  //       return "bg-red-400";
  //     case "Medium":
  //       return "bg-yellow-300";
  //     case "Low":
  //       return "bg-green-300";
  //     default:
  //       return "bg-gray-300";
  //   }
  // };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-300";
      case "Ongoing":
        return "bg-blue-300";
      case "Completed":
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
      <span
        className={`px-2 py-1 rounded-md ${getStatusClass(request.status)}`}
      >
        {request.status}
      </span>,
      //   formattedDate,
      request.priority,
      // <span
      //   className={`px-2 py-1 rounded-md ${getPriorityClass(request.priority)}`}
      // >
      //   {request.priority}
      // </span>,
      <span
        onClick={() => handleDetailsClick(request)}
        className="cursor-pointer text-blue-500 hover:text-blue-700"
      >
        View
      </span>,
    ];
  });
};
