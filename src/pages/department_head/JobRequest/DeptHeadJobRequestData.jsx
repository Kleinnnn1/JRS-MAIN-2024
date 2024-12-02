import ReusableDropDownButton from "../../../components/ReusableDropDownButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAssignmentStore } from "../../../store/useAssignmentStore";

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

export default function DeptHeadRequestData(requests) {
  const navigate = useNavigate(); // Initialize navigate

  // Ensure requests is always an array
  if (!Array.isArray(requests)) {
    return [];
  }

  // Format the fetched data
  return requests.map(
    (
      {
        fullName,
        description,
        location,
        jobCategory,
        requestDate,
        image,
        priority,
        // deptReqAssId,
        requestId,
        idNumber,
      },
      index
    ) => [
      `${index + 1}. ${String(fullName)}`, // Sequential number + fullName name
      description,
      jobCategory,
      new Date(requestDate).toLocaleDateString(), // Format request date
      location,

      image ? <img src={image} alt="Request" /> : "No Image",
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
          navigate(`/department_head/job_request/detail/${requestId}`, {
      state: {
        fullName,
        description,
        location,
        jobCategory,
        requestDate,
        image,
        priority,
        requestId,
        idNumber,
      },
    });
        }}
      >
        View
      </button>,
    ]
  );
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
//           { fullName, description, location, jobCategory, requestDate, image },
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
