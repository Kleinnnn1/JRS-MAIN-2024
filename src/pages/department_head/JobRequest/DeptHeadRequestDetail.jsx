import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
      alert("Remarks cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("Request")
        .update({ remarks })
        .eq("requestId", requestId);

      if (error) {
        alert("Failed to save remarks. Please try again.");
      } else {
        alert("Remarks saved successfully.");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTransfer = async () => {
    if (!selectedDepartment) {
      alert("Please select a department.");
      return;
    }

    try {
      const { error } = await supabase
        .from("Department_request_assignment")
        .update({ deptId: selectedDepartment })
        .eq("requestId", requestId);

      if (error) {
        alert("Failed to transfer the request. Please try again.");
      } else {
        alert("Request successfully transferred.");
        closeModal("isTransferModalOpen");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
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
            <div className="space-y-4 m-4 text-xl">
              <p>
                <span className="font-semibold mt-12">
                  Requestor:
                  <br />
                </span>
                {fullName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">
                  Description:
                  <br />
                </span>
                {description || "No description provided"}
              </p>
              <p>
                <span className="font-semibold">
                  Job Category:
                  <br />
                </span>{" "}
                {jobCategory || "Unknown Category"}
              </p>
              <p>
                <span className="font-semibold">
                  Date Submitted:
                  <br />
                </span>{" "}
                {formatDate(requestDate)}
              </p>
              <p>
                <span className="font-semibold">
                  Location: <br />
                </span>{" "}
                {requestLocation || "Unknown Location"}
              </p>

              <p>
                <span className="font-semibold mb-10">
                  Priority:
                  <br />
                </span>
                <span
                  className={` px-1 py-1 rounded ${
                    PRIORITY_COLORS[priority] || "bg-gray-300 text-black"
                  }`}
                >
                  {priority || "No Priority"}
                </span>
              </p>
            </div>
            <p>
              <span className="font-semibold text-xl m-4">Assigned Staff:</span>{" "}
              {assignedStaffName}
            </p>
            <div className="mt-2 m-4">
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
              <label
                htmlFor="remarks"
                className="block font-semibold mb-2 mt-4"
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
              <button
                onClick={handleSaveRemarks}
                className={`mt-4 bg-green-600 text-white px-4 py-2 rounded ${
                  isSaving
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
                disabled={isSaving} // Disable only when saving
              >
                Save Remarks
              </button>

              {/* <label
                htmlFor="remarks"
                className="block font-semibold mb-2 mt-4"
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
                disabled={!!initialRemarks} // Disable if there's an initial remark
              />
              {status !== "Completed" && (
                <>
                  {!initialRemarks && (
                    <button
                      onClick={handleSaveRemarks}
                      className={`mt-4 bg-green-600 text-white px-4 py-2 rounded ${
                        isSaving
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-700"
                      }`}
                      disabled={isSaving} // Disable if saving
                    >
                      Save Remarks
                    </button>
                  )}
                </>
              )} */}

              {/* Transfer Request */}
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

          {/* Divider */}
          <div className="hidden lg:block w-[1px] bg-gray-200 mx-auto"></div>

          {/* Right Section */}
          <div>
            {image ? (
              <img
                src={image}
                alt="Image"
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
      </div>
    </div>
  );
}
