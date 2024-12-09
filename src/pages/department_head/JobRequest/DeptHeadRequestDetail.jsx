import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalForm from "./ModalForm";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import supabase from "../../../service/supabase";

export default function RequestDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [assignedStaffName, setAssignedStaffName] = useState(""); // New state for staff names

  const {
    fullName,
    description,
    location: requestLocation,
    jobCategory,
    requestDate,
    image,
    priority,
    deptReqAssId,
    requestId,
    idNumber,
    staffName,
  } = location.state || {};

  // Fetch assigned staff and set up real-time subscription
  useEffect(() => {
    fetchAssignedStaff(); // Initial fetch of assigned staff

    // Subscribe to the real-time changes in the Department_request_assignment table
    const channel = supabase
      .channel(`request-${requestId}`) // Create a unique channel per requestId
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Department_request_assignment",
          filter: `requestId=eq.${requestId}`,
        },
        (payload) => {
          console.log("Real-time update:", payload);
          fetchAssignedStaff(); // Re-fetch assigned staff data when an update occurs
        }
      )
      .subscribe();

    // Cleanup the subscription when the component is unmounted
    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId]); // Re-run when requestId changes

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  const handleAssign = () => {
    useAssignmentStore
      .getState()
      .setAssignmentData(
        description,
        jobCategory,
        requestLocation,
        deptReqAssId,
        requestId,
        idNumber
      );
    openModal();
  };

  const handleReferClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToCurrentJobRequest = () => {
    navigate("/current-job-request");
    setIsDropdownOpen(false);
  };

  const navigateToNewJobRequest = () => {
    navigate("/department_head/make_requestDeptHead");
    setIsDropdownOpen(false);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleSaveRemarks = async () => {
    if (!remarks.trim()) {
      alert("Remarks cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from("Request")
        .update({ remarks })
        .eq("requestId", requestId);

      if (error) {
        console.error("Error saving remarks:", error.message);
        alert("Failed to save remarks. Please try again.");
      } else {
        console.log("Remarks saved successfully:", data);
        alert("Remarks saved successfully.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchAssignedStaff = async () => {
    try {
      const { data, error } = await supabase
        .from("Department_request_assignment") // Correct table name
        .select("staffName") // Select staffName
        .eq("requestId", requestId); // Filter by requestId

      if (error) {
        console.error("Error fetching staff names:", error.message);
        setAssignedStaffName("No Assigned Staff");
      } else {
        const staffNames = data.map((item) => item.staffName).join(", ");
        setAssignedStaffName(staffNames || "No Assigned Staff");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setAssignedStaffName("No Assigned Staff");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg m-10 mt-10">
      <h2 className="text-2xl font-bold text-center p-2 rounded bg-yellow-500 mb-6">
        Job Request Details
      </h2>
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-6">
          <div className="mb-4">
            <strong>Requestor:</strong> {fullName || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Description:</strong>{" "}
            {description || "No description provided"}
          </div>
          <div className="mb-4">
            <strong>Job Category:</strong> {jobCategory || "Unknown Category"}
          </div>
          <div className="mb-4">
            <strong>Date Submitted:</strong> {requestDate || "Invalid Date"}
          </div>
          <div className="mb-4">
            <strong>Location:</strong> {requestLocation || "Unknown Location"}
          </div>
          <div className="mb-4">
            <strong>RequestId:</strong> {requestId || "Unknown Location"}
          </div>
          <div className="mb-4">
            <strong>Assigned:</strong>{" "}
            {assignedStaffName || "No Assigned Staff"}{" "}
            {/* Display assigned staff names */}
          </div>
          <div className="mb-4">
            <strong>Priority:</strong>{" "}
            <span
              className={`px-2 py-1 rounded ${
                priority === "High"
                  ? "bg-red-500 text-white"
                  : priority === "Medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {priority || "No Priority"}
            </span>
          </div>

          <div className="mt-6">
            <label htmlFor="remarks" className="block font-bold mb-2">
              Remarks:
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={handleRemarksChange}
              rows="4"
              className="w-full p-2 border rounded-lg"
              placeholder="Add your remarks here..."
            />
          </div>

          <div className="flex justify-start mt-3">
            <button
              className={`p-1 bg-yellow-600 mb-10 text-white rounded hover:bg-blue-700 ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSaveRemarks}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Remarks"}
            </button>
          </div>
        </div>

        {image && (
          <div className="w-1/2">
            <strong>Image:</strong>
            <img
              src={image}
              alt="Job Request"
              className="w-full h-auto mt-2 rounded-lg border cursor-pointer"
              onClick={openImageModal}
            />
          </div>
        )}
      </div>

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <img
              src={image}
              alt="Job Request"
              className="w-full h-auto rounded-lg"
            />
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={closeImageModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          className="p-2 bg-blue-600 font-bold text-white rounded hover:bg-blue-700"
          onClick={handleAssign}
        >
          Assign
        </button>

        <div>
          <button
            className="p-2 bg-green-600 font-bold text-white rounded hover:bg-green-700"
            onClick={handleReferClick}
          >
            Transfer
          </button>
          {isDropdownOpen && (
            <div className="mt-2 bg-white shadow-lg rounded-lg w-48 absolute z-10 border">
              <button
                className="block px-4 py-2 text-left text-blue-600 hover:bg-gray-200 w-full"
                onClick={navigateToCurrentJobRequest}
              >
                Current Job Request
              </button>
              <button
                className="block px-4 py-2 text-left text-blue-600 hover:bg-gray-200 w-full"
                onClick={navigateToNewJobRequest}
              >
                New Job Request
              </button>
            </div>
          )}
        </div>
      </div>

      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => console.log("Modal submitted")}
      />

      <button
        className="ml-2 mt-4 text-blue-500 font-bold underline"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
