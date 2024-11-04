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
              dateRequested,
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
            status,
            new Date(dateRequested).toLocaleString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            new Date(dateCompleted).toLocaleString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            new Date(dateStarted).toLocaleString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            priority || "N/A", // If dateCompleted is null, show "N/A"
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
              Job Complete
            </button>,
          ]
        )
      : [[]];

  return formattedData;
}
