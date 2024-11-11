import SetDate from "./SetDate";

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

export default function StaffAssignJobData(requests) {
  // Format the fetched data
  const formattedData =
    requests.length > 0
      ? requests.map(
          (
            {
              requestor,
              description,
              location,
              image,
              requestDate,
              dateStarted,
              dateCompleted,
              priority,
            },
            index
          ) => [
            `${index + 1}. ${String(requestor)}`, // Sequential number + requestId
            description,
            location,
            image ? <img src={image} alt="Request" /> : "No Image", // Display image if available, otherwise "No Image"
            requestDate
              ? new Date(requestDate).toLocaleString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A",

            <SetDate />,
            <SetDate />,
            priority ? (
              <span className={getPriorityClass(priority)}>{priority}</span>
            ) : (
              "N/A"
            ), // Apply styling to priority
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
              Job Complete
            </button>,
          ]
        )
      : [[]];

  return formattedData;
}
