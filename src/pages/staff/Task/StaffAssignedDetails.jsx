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
    fullName = "N/A",
    description = "No description provided",
    location: requestLocation = "Unknown Location",
    priority = "No Priority",
    image,
    dateStarted: initialStartDate,
    extensionDate: initialExtensionDate,
    expectedDueDate: initialExpectedDueDate,
    remarks: initialRemarks,
    dateCompleted: initialDateCompleted, // Include the initial dateCompleted
  } = location.state || {};

  const [startDate, setStartDate] = useState(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [extensionDate, setExtensionDate] = useState(
    initialExtensionDate ? new Date(initialExtensionDate) : null
  );
  const [expectedDueDate, setExpectedDueDate] = useState(
    initialExpectedDueDate ? new Date(initialExpectedDueDate) : null
  );
  const [remarks, setRemarks] = useState(initialRemarks || "");
  const [dateCompleted, setDateCompleted] = useState(
    initialDateCompleted ? new Date(initialDateCompleted) : null
  ); // New state for dateCompleted
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
          dateStarted: startDate ? startDate.toISOString() : null,
          extensionDate: extensionDate ? extensionDate.toISOString() : null,
          expectedDueDate: expectedDueDate
            ? expectedDueDate.toISOString()
            : null,
          remarks,
        })
        .eq("requestId", requestId);

      if (error) {
        console.error("Error updating request:", error.message);
        setError("Failed to update the request.");
      } else {
        console.log("Request updated successfully:", data);
        alert("Job request updated successfully!");
        navigate(-1);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleJobComplete = async () => {
    try {
      // Get the current time in Philippine Time (PHT)
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Optional: Use 24-hour format
      });
      const parts = formatter.formatToParts(now);

      // Convert the formatted parts to a valid date string
      const formattedDate = `${parts.find((p) => p.type === "year").value}-${
        parts.find((p) => p.type === "month").value
      }-${parts.find((p) => p.type === "day").value}T${
        parts.find((p) => p.type === "hour").value
      }:${parts.find((p) => p.type === "minute").value}:${
        parts.find((p) => p.type === "second").value
      }+08:00`;

      // Save the timestamp as an ISO string for database compatibility
      const phtTimestamp = new Date(formattedDate).toISOString();

      const { data, error } = await supabase
        .from("Request")
        .update({
          status: "Completed",
          dateCompleted: phtTimestamp,
        })
        .eq("requestId", requestId);

      if (error) {
        console.error("Error updating job status:", error.message);
        setError("Failed to mark the job as completed.");
      } else {
        console.log("Job status updated to completed with timestamp:", data);
        alert("Job marked as completed successfully!");
        setDateCompleted(new Date(phtTimestamp)); // Update state for dateCompleted
        navigate(-1);
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

          {/* Display the Image */}
          {image ? (
            <div className="mb-4">
              <strong>Image:</strong>
              <img
                src={image}
                alt="Request"
                className="w-64 h-64 object-cover rounded border"
              />
            </div>
          ) : (
            <div className="mb-4">
              <strong>Image:</strong> No Image Available
            </div>
          )}

          {/* Start Date Picker */}
          <div className="mb-4">
            <strong>Set Start Date:</strong>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              disabled={!!initialStartDate}
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
              disabled={!!initialExpectedDueDate}
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
              disabled={!!initialExtensionDate}
            />
          </div>

          {/* Display Date Completed */}
          {dateCompleted && (
            <div className="mb-4">
              <strong>Date Completed:</strong>{" "}
              {dateCompleted.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}

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
          {!dateCompleted && (
            <div>
              <button
                className="mt-4 text-white bg-green-400 font-bold px-4 py-2 rounded"
                onClick={handleSetComplete}
              >
                Update
              </button>
              <button
                className="ml-4 text-black-500 bg-blue-400 font-bold px-4 py-2 rounded"
                onClick={handleJobComplete}
              >
                Mark Job as Completed
              </button>
            </div>
          )}
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
