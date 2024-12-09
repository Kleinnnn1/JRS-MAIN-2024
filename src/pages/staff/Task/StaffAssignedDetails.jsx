import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import supabase from "../../../service/supabase"; // Adjust the import path based on your setup

export default function RequestDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    requestId,
    fullName = "N/A", // Default value if state is undefined
    description = "No description provided",
    location: requestLocation = "Unknown Location",
    priority = "No Priority",
  } = location.state || {}; // Use optional chaining to avoid errors if state is undefined

  const [startDate, setStartDate] = useState(null); // State for "Set Date Started"
  const [extensionDate, setExtensionDate] = useState(null); // State for "Set Extension Date"
  const [expectedDueDate, setExpectedDueDate] = useState(null); // State for "Set Expected Due Date"
  const [remarks, setRemarks] = useState(""); // Remarks field
  const [error, setError] = useState("");

  const handleSetComplete = async () => {
    if (!requestId) {
      setError("Invalid request. Request ID is missing.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Request")
        .update({
          dateStarted: startDate,
          extensionDate: extensionDate || null, // Optional field
          expectedDueDate: expectedDueDate || null, // Optional field
          remarks,
        })
        .eq("requestId", requestId);

      if (error) {
        console.error("Error updating request:", error.message);
        setError("Failed to update the request.");
      } else {
        console.log("Request updated successfully:", data);
        alert("Job request updated successfully!");
        navigate(-1); // Go back after submission
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleJobComplete = async () => {
    try {
      const { data, error } = await supabase
        .from("Request")
        .update({
          status: "completed",
        })
        .eq("requestId", requestId);

      if (error) {
        console.error("Error updating job status:", error.message);
        setError("Failed to mark the job as completed.");
      } else {
        console.log("Job status updated to completed:", data);
        alert("Job marked as completed successfully!");
        navigate(-1); // Go back after submission
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
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
            <strong>Requestor:</strong> {fullName}
          </div>
          <div className="mb-4">
            <strong>Description:</strong> {description}
          </div>
          <div className="mb-4">
            <strong>Location:</strong> {requestLocation}
          </div>
          <div className="mb-4">
            <strong>Priority:</strong>
            <span
              className={`px-2 py-1 rounded ${
                priority === "High"
                  ? "bg-red-500 text-white"
                  : priority === "Medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {priority}
            </span>
          </div>

          {/* Start Date Picker */}
          <div className="mb-4">
            <strong>Set Start Date:</strong>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
            />
          </div>

          {/* Expected Due Date Picker */}
          <div className="mb-4">
            <strong>Set Expected Due Date:</strong>
            <DatePicker
              selected={expectedDueDate}
              onChange={(date) => setExpectedDueDate(date)}
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
            />
          </div>

          {/* Extension Date Picker */}
          <div className="mb-4">
            <strong>Set Extension Date:</strong>
            <DatePicker
              selected={extensionDate}
              onChange={(date) => setExtensionDate(date)}
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
            />
          </div>

          {/* Remarks */}
          <div className="mt-6">
            <label htmlFor="remarks" className="block font-bold mb-2">
              Remarks:
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="4"
              className="w-full p-2 border rounded-lg"
              placeholder="Add your remarks here..."
            />
          </div>

          {/* Display Validation Error */}
          {error && (
            <div className="text-red-500 font-bold text-sm mb-4">{error}</div>
          )}

          {/* Action Buttons */}
          <button
            className="mt-4 text-white bg-green-400 font-bold px-4 py-2 rounded"
            onClick={handleSetComplete}
          >
            Submit
          </button>
          <button
            className="ml-4 text-blue-500 bg-blue-400 font-bold px-4 py-2 rounded"
            onClick={handleJobComplete}
          >
            Mark Job as Completed
          </button>
          <button
            className="ml-4 text-blue-500 font-bold underline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
