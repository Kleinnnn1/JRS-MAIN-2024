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

export default function DeptHeadOngoingRequestData(requests) {
  // Format the fetched data only if requests are available
  const formattedData =
    requests.length > 0
      ? requests.map(
          (
            { fullName, description, jobCategory, location, image, priority },
            index
          ) => [
            `${index + 1}. ${String(fullName)}`, // Display "N/A" if requestor is missing
            description || "N/A",
            jobCategory || "N/A",
            location || "N/A",
            image ? <img src={image} alt="Request" /> : "No Image",
            priority ? (
              <span className={getPriorityClass(priority)}>{priority}</span>
            ) : (
              "N/A"
            ), // Apply styling to priority
            <button className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2">
              view
            </button>,
          ]
        )
      : [[]];

  return formattedData;
}

// export default function DeptHeadOngoingRequestData(requests) {
//   // Format the fetched data

//   const formattedData =
//     requests.length > 0
//       ? requests.map(
//           (
//             {
//               requestor,
//               description,
//               jobPosition,
//               staffName,
//               requestDate,
//               location,
//               image,
//               priority,
//               dateStarted,
//               dateCompleted,
//             },
//             index
//           ) => [
//             `${index + 1}. ${String(requestor)}`, // Sequential number + requestor name
//             description,
//             jobPosition,
//             staffName,
//             new Date(requestDate).toLocaleDateString(), // Format request date
//             location,
//             image ? <img src={image} alt="Request" /> : "No Image",
//             priority || "N/A",
//             dateStarted,
//             dateCompleted,
//             <button>view details</button>,
//           ]
//         )
//       : [[]];

//   return formattedData;
// }
