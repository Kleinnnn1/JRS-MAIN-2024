import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ModalForm from "./ModalForm";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import supabase from "../../../service/supabase";

const PRIORITY_COLORS = {
  High: "bg-red-500 text-white",
  Medium: "bg-yellow-500 text-black",
  Low: "bg-green-500 text-white",
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";

  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${month} ${day} ${year}, ${hours}:${minutes} ${ampm}`;
};

export default function RequestDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    isAssignModalOpen: false,
    isImageModalOpen: false,
    isTransferModalOpen: false, // New state for transfer modal
  });
  const [isSaving, setIsSaving] = useState(false);
  const [assignedStaffName, setAssignedStaffName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

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
    status,
    remarks: initialRemarks,
  } = location.state || {};

  const [remarks, setRemarks] = useState(initialRemarks || ""); // Initialize remarks

  useEffect(() => {
    fetchAssignedStaff();

    const channel = supabase
      .channel(`request-${requestId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Department_request_assignment",
          filter: `requestId=eq.${requestId}`,
        },
        fetchAssignedStaff
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId]);

  const openModal = (key) =>
    setModalState((prev) => ({ ...prev, [key]: true }));
  const closeModal = (key) =>
    setModalState((prev) => ({ ...prev, [key]: false }));

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
    openModal("isAssignModalOpen");
  };

  const handleSaveRemarks = async () => {
    if (!remarks.trim()) {
      toast.error("Remarks cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("Request")
        .update({ remarks })
        .eq("requestId", requestId);

      if (error) {
        toast.error("Failed to save remarks. Please try again.");
      } else {
        toast.success("Remarks saved successfully.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePriority = async () => {
    if (!selectedPriority) {
      toast.error("Please select a priority level.");
      return;
    }

    try {
      const { error } = await supabase
        .from("Request")
        .update({ priority: selectedPriority })
        .eq("requestId", requestId);

      if (error) {
        toast.error("Failed to transfer the request. Please try again.");
      } else {
        toast.success("Successfully Set Priority Level.");
        closeModal("isTransferModalOpen");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleTransfer = async () => {
    if (!selectedDepartment) {
      toast.error("Please select a department.");
      return;
    }

    try {
      const { error } = await supabase
        .from("Department_request_assignment")
        .update({ deptId: selectedDepartment })
        .eq("requestId", requestId);

      if (error) {
        toast.error("Failed to transfer the request. Please try again.");
      } else {
        toast.success("Request successfully transferred.");
        closeModal("isTransferModalOpen");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  const fetchAssignedStaff = async () => {
    try {
      const { data, error } = await supabase
        .from("Department_request_assignment")
        .select("staffName")
        .eq("requestId", requestId);

      if (error || !data.length) {
        setAssignedStaffName("No Assigned Staff");
      } else {
        const staffNames = data.map((item) => item.staffName).join(", ");
        setAssignedStaffName(staffNames || "");
      }
    } catch {
      setAssignedStaffName("No Assigned Staff");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white -mt-5 shadow-lg rounded-lg p-4">
        <h2 className="text-3xl font-bold text-center bg-custom-blue text-white py-3 rounded-lg">
          Job Request Details
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mt-6">
          {/* Left Section */}
          <div>
            <div className="space-y-4 m-4">
              {/* Request ID  */}
              <div>
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Request Id:
                </span>
                <span className="block text-2xl text-gray-900 font-semibold tracking-wide">
                  {requestId || "No requestId provided"}
                </span>
              </div>

              {/* REQUESTOR */}
              <div>
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Requestor:
                </span>
                <span className="block text-2xl text-gray-900 font-semibold tracking-wide">
                  {fullName || "N/A"}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div>
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Description:
                </span>
                <span className="block text-2xl text-gray-800 font-semibold leading-relaxed">
                  {description || "No description provided"}
                </span>
              </div>

              {/* JOB CATEGORY */}
              <div>
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Job Category:
                </span>
                <span className="block text-2xl text-gray-900 font-semibold tracking-wide">
                  {jobCategory || "Unknown Category"}
                </span>
              </div>

              {/* Date Submitted */}
              <div>
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Date Submitted:
                </span>
                <span className="block text-2xl text-gray-800 font-medium">
                  {formatDate(requestDate)}
                </span>
              </div>

              {/* LOCATION */}
              <div className="mb-10">
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Location:
                </span>
                <span className="block text-2xl text-gray-900 font-semibold tracking-wide">
                  {requestLocation || "Unknown Location"}
                </span>
              </div>
            </div>
            {/* PRIORITY */}
            <div className="priority-section">
              <p className="mb-2">
                <span className="font-semibold m-3">Priority Level:</span>
              </p>
              <label htmlFor="priority-select" className="sr-only">
                Select Priority
              </label>
              <select
                id="priority-select"
                value={selectedPriority} // Fixed state reference
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="p-2 border rounded ml-3"
              >
                <option value="">Select Priority</option>
                <option className="bg-green-500 text-white" value="Low">
                  Low
                </option>
                <option className="bg-yellow-500 text-white" value="Medium">
                  Medium
                </option>
                <option className="bg-red-500 text-white" value="High">
                  High
                </option>
              </select>
              <button
                onClick={handlePriority}
                className="bg-blue-600 text-white ml-4 p-1 rounded  w-32"
              >
                Set Priority
              </button>
            </div>

            {/* ASSIGN STAFF */}
            <p className="mb-4 mt-4">
              <span className="font-semibold  m-4">Assigned Staff:</span> <br />
              <span className="m-4 text-xl">{assignedStaffName}</span>
            </p>
            <div className="-mt-8 m-4">
              {/* Assign Button */}
              {status !== "Ongoing" && status !== "Completed" && (
                <button
                  onClick={handleAssign}
                  className="bg-blue-600 mt-5 text-white p-1 rounded hover:bg-blue-700 w-32"
                >
                  Assign
                </button>
              )}
              {/* Remarks Section */}

              {/* Remarks Section */}
              <label
                htmlFor="remarks"
                className="block font-semibold mb-2 mt-10"
              >
                Remarks:
              </label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows="4"
                className="w-full border rounded p-2"
                placeholder="Add your remarks here..."
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSaveRemarks}
                  className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded ${
                    isSaving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                  disabled={isSaving}
                >
                  Save Remarks
                </button>

                {status !== "Ongoing" && status !== "Completed" && (
                  <button
                    onClick={() => openModal("isTransferModalOpen")}
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-40 mt-4"
                  >
                    Transfer Request
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] bg-gray-200 mx-auto"></div>

          {/* Right Section */}
          <div>
            {image ? (
              <img
                src={image}
                className="rounded-lg border mt-2 cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => openModal("isImageModalOpen")}
              />
            ) : (
              <p className="text-gray-500 italic text-center mt-4">
                No image available
              </p>
            )}
          </div>
        </div>

        {/* Modals */}
        {modalState.isTransferModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
              <h2 className="text-xl font-bold mb-4">Transfer Request</h2>
              <p className="text-gray-700 mb-4">
                Choose a department to transfer:
              </p>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="" className="hidden">
                  Select Department
                </option>
                <option value="1">BGMS</option>
                <option value="2">CSWS</option>
                <option value="3">MEWS</option>
              </select>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleTransfer}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Transfer
                </button>
                <button
                  onClick={() => closeModal("isTransferModalOpen")}
                  className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assignment Modal */}
        <ModalForm
          isOpen={modalState.isAssignModalOpen}
          onClose={() => closeModal("isAssignModalOpen")}
        />
        <button
          className="m-4 -mt-16 text-blue-500 font-bold underline"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        {status == "Completed" && (
          <button
            className="mt-4 text-white bg-purple-500 font-bold px-4 py-2 rounded"
            onClick={() =>
              navigate(`/department_head/certificateCompleted/${requestId}`)
            }
          >
            View Certificate
          </button>
        )}
      </div>
    </div>
  );
}
