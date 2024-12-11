import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CompletedRequestDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    requestId,
    fullName = "N/A", // Default value if state is undefined
    description = "No description provided",
    location: requestLocation = "Unknown Location",
    priority = "No Priority",
    image, // Include the image from state
    dateStarted: initialStartDate,
    extensionDate: initialExtensionDate,
    expectedDueDate: initialExpectedDueDate,
    remarks: initialRemarks,
  } = location.state || {}; // Use optional chaining to avoid errors if state is undefined

  const [startDate] = useState(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [extensionDate] = useState(
    initialExtensionDate ? new Date(initialExtensionDate) : null
  );
  const [expectedDueDate] = useState(
    initialExpectedDueDate ? new Date(initialExpectedDueDate) : null
  );
  const [remarks] = useState(initialRemarks || ""); // Initialize remarks

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
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              disabled
            />
          </div>

          {/* Expected Due Date Picker */}
          <div className="mb-4">
            <strong>Set Expected Due Date:</strong>
            <DatePicker
              selected={expectedDueDate}
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              disabled
            />
          </div>

          {/* Extension Date Picker */}
          <div className="mb-4">
            <strong>Set Extension Date:</strong>
            <DatePicker
              selected={extensionDate}
              className="border rounded p-2 w-full placeholder:text-black"
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              disabled
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
              rows="4"
              className="w-full p-2 border rounded-lg"
              placeholder="Add your remarks here..."
              disabled
            />
          </div>

          <button
            className="mt-4 text-blue-500 font-bold underline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
