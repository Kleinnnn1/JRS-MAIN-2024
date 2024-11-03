export default function DeptHeadOngoingRequestData(requests) {
  // Format the fetched data only if requests are available
  const formattedData =
    requests.length > 0
      ? requests.map(
          (
            {
              requestor,
              description,
              jobPosition,
              staffName,
              requestDate,
              location,
              image,
              priority,
              dateStarted,
              dateCompleted,
            },
            index
          ) => [
            `${index + 1}. ${String(requestor)}`, // Display "N/A" if requestor is missing
            description || "N/A",
            jobPosition || "N/A",
            staffName || "N/A",
            requestDate ? new Date(requestDate).toLocaleDateString() : "N/A",
            location || "N/A",
            image ? <img src={image} alt="Request" /> : "No Image",
            priority || "N/A",
            dateStarted ? new Date(dateStarted).toLocaleDateString() : "N/A",
            dateCompleted
              ? new Date(dateCompleted).toLocaleDateString()
              : "N/A",
          ]
        )
      : [];

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
