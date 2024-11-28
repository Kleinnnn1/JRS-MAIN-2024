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
          ) => [
            `${index + 1}. ${String(requestId)}`, // Sequential number + requestId
            description,
            jobCategory || "N/A",
            deptName || "N/A",
            staffName || "N/A", // If staffName is undefined or null, display "N/A"
            image ? <img src={image} alt="Request" /> : "No Image", // Display image if available, otherwise "No Image"
            status,
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
          ]
        )
      : [[]];

  return formattedData;
}
