export default function RequestorJobRequestData(requests) {
  // Format the fetched data
  const formattedData =
    requests.length > 0
      ? requests.map(
          (
            {
              requestId,
              description,
              jobPosition,
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
            jobPosition,
            deptName,
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
            priority || "N/A", // If dateCompleted is null, show "N/A"
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
              details
            </button>,
          ]
        )
      : [[]];

  return formattedData;
}
