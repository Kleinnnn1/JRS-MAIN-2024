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
              {/* Request ID */}
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
                <span className="block text-2xl text-gray-800 font-normal leading-relaxed">
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

              {/* PRIORITY */}
              <div className="mb-10">
                <span className="block text-sm text-gray-600 mb-1 font-medium">
                  Priority:
                </span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xl font-semibold ${
                    PRIORITY_COLORS[priority] || "bg-gray-300 text-black"
                  }`}
                >
                  {priority || "No Priority"}
                </span>
              </div>
            </div>
            <p className="mb-4">
              <span className="font-semibold  m-4">Assigned Staff:</span> <br />
              <span className="m-4 text-xl">{assignedStaffName}</span>
            </p>
            <div className="-mt-8 m-4">
              {/* Assign Button */}
              {status !== "Ongoing" && status !== "Completed" && (
                <button
                  onClick={handleAssign}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-32"
                >
                  Assign
                </button>
              )}
              {/* Remarks Section */}

              {/* Remarks Section */}
              <label htmlFor="remarks" className="block font-semibold mb-2 mt-10">
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
              <button
                onClick={handleSaveRemarks}
                className={`mt-4 bg-green-600 text-white px-4 py-2 rounded mr-4 ${
                  isSaving
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
                disabled={isSaving} // Disable only when saving
              >
                Save Remarks
              </button>

              <button
                onClick={async () => {
                  try {
                    // Fetch the data for the specific requestId from the "Request" table
                    const { data, error } = await supabase
                      .from("Request")
                      .select("completedCertificate")
                      .eq("requestId", requestId)
                      .single();

                    // Check for errors or if no certificate exists
                    if (error || !data?.completedCertificate) {
                      alert("No certificate available for this request.");
                      navigate("/department_head/job_completed"); // Redirect if no certificate
                      return;
                    }

                    // Navigate to the certificate view if it exists
                    navigate(`/department_head/view_certificate/${requestId}`);
                  } catch (err) {
                    console.error("Error verifying certificate:", err);
                    alert("An unexpected error occurred. Please try again.");
                  }
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mr-4"
              >
                View Certificate
              </button>
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={() => closeModal("isTransferModalOpen")}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Transfer Request</h3>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Department:
                </label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleTransfer}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        <ModalForm isOpen={modalState.isAssignModalOpen} closeModal={() => closeModal("isAssignModalOpen")} />
      </div>
    </div>
  );
}
