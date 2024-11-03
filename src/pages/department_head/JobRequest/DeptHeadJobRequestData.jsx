import ReusableDropDownButton from "../../../components/ReusableDropDownButton";
import { useAssignmentStore } from "../../../store/useAssignmentStore";

export default function DeptHeadRequestData(requests, openModal) {
  const options = [
    { value: "1", label: "CSWS" },
    { value: "2", label: "MEWS" },
    { value: "3", label: "BGMS" },
  ];

  // Format the fetched data

  const formattedData =
    requests.length > 0
      ? requests.map(
          (
            {
              requestor,
              description,
              location,
              jobPosition,
              requestDate,
              image,
              priority,
            },
            index
          ) => [
            `${index + 1}. ${String(requestor)}`, // Sequential number + requestor name
            description,
            jobPosition,
            new Date(requestDate).toLocaleDateString(), // Format request date
            location,

            image ? <img src={image} alt="Request" /> : "No Image",
            priority || "N/A",
            <ReusableDropDownButton
              key={`dropdown-${index}`}
              options={options}
            />,

            <button
              key={`assign-btn-${index}`}
              className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
              onClick={() => {
                const {
                  jobPosition,
                  location,
                  deptReqAssId,
                  requestId,
                  idNumber,
                } = requests[index]; // Destructure to get jobPosition and location

                // Save to Zustand
                useAssignmentStore
                  .getState()
                  .setAssignmentData(
                    jobPosition,
                    location,
                    deptReqAssId,
                    requestId,
                    idNumber
                  );

                console.log("Assigned Data:", {
                  requestor,
                  description,
                  location,
                  jobPosition,
                  requestDate,
                  image,
                  deptReqAssId,
                  requestId,
                  idNumber,
                });

                openModal();
              }}
            >
              Assign
            </button>,
          ]
        )
      : [[]];

  return formattedData;
}

// import ReusableDropDownButton from "../../../components/ReusableDropDownButton";
// import { useAssignmentStore } from "../../../store/useAssignmentStore";

// export default function DeptHeadRequestData(requests, openModal) {
//   const options = [
//     { value: "1", label: "CSWS" },
//     { value: "2", label: "MEWS" },
//     { value: "3", label: "BGMS" },
//   ];

//   // Format the fetched data
//   return requests.length > 0
//     ? requests.map(
//         (
//           { requestor, description, location, jobPosition, requestDate, image },
//           index
//         ) => [
//           `${index + 1}. ${String(requestor)}`, // Sequential number + requestor name
//           description,
//           jobPosition,
//           new Date(requestDate).toLocaleDateString(), // Format request date
//           location,
//           <ReusableDropDownButton
//             key={`dropdown-${index}`}
//             options={options}
//           />,
//           image ? <img src={image} alt="Request" /> : "No Image",

//           <button
//             key={`assign-btn-${index}`}
//             className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
//             onClick={() => {
//               const { jobPosition, location } = requests[index]; // Destructure to get jobPosition and location

//               // Save to Zustand
//               useAssignmentStore
//                 .getState()
//                 .setAssignmentData(jobPosition, location);
//               console.log(jobPosition, location);

//               openModal();
//             }}
//           >
//             Assign
//           </button>,
//         ]
//       )
//     : [[]];
// }
