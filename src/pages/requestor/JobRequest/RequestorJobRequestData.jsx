import { useNavigate } from "react-router-dom"; // Import useNavigate
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

export default function RequestorJobRequestData(requests) {
  const navigate = useNavigate(); // Initialize navigate
  
  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800", // Yellow for Pending
    Approved: "bg-green-200 text-green-800", // Green for Approved
    Rejected: "bg-red-200 text-red-800", // Red for Rejected
    InProgress: "bg-blue-200 text-blue-800", // Blue for In Progress
    Completed: "bg-gray-200 text-gray-800", // Gray for Completed
  };

  // Ensure requests is always an array
  if (!Array.isArray(requests)) {
    return [];
  }

  // Format the fetched data
  return requests.map(
    (
      {
              requestId,
              description,
              jobCategory,
              deptName,
              staffName,
              image,
              status,
              requestDate,
              priority,
            },
            index
          ) =>[
              `${index + 1}. ${String(requestId)}`, // Sequential number + requestId
              description,
              jobCategory || "N/A",
              deptName || "N/A",
              staffName || "N/A", // If staffName is undefined or null, display "N/A"
              image ? <img src={image} alt="Request" /> : "No Image", // Display image if available, otherwise "No Image"
              <span
                className={`py-1 px-3 rounded-md text-center ${statusClass}`}
              >
                {status}
              </span>, // Apply status color
              new Date(requestDate).toLocaleString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
              priority ? (
                <span className={getPriorityClass(priority)}>{priority}</span>
              ) : (
                "N/A"
              ), // Apply styling to priority
              <button
              key={`view-btn-${index}`}
              className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
              onClick={() => {
                // Navigate to the job request details page
                navigate(`/job_request_detail/${requestId}`, {
            state: {
              requestId,
              description,
              jobCategory,
              deptName,
              staffName,
              image,
              status,
              requestDate,
              priority,
            },
          });
              }}
            >
              View
            </button>,
          ]
        );
      }