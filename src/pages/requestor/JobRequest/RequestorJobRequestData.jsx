// Import or define getPriorityClass
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
  // Define status color based on request status
  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800", // Yellow for Pending
    Approved: "bg-green-200 text-green-800", // Green for Approved
    Rejected: "bg-red-200 text-red-800", // Red for Rejected
    InProgress: "bg-blue-200 text-blue-800", // Blue for In Progress
    Completed: "bg-gray-200 text-gray-800", // Gray for Completed
  };

  // Format the fetched data
  const formattedData =
    requests.length > 0
      ? requests.map(
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
          ) => {
            // Get status color class
            const statusClass = statusColors[status] || "bg-white text-black"; // Default class if status not found

            return [
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
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                details
                
              </button>,
            ];
          }
        )
      : [[]]; // Return an empty array if no requests

  return formattedData;
}
