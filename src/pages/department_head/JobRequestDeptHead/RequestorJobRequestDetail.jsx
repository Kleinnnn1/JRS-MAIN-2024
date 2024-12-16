import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase"; // Ensure Supabase is configured correctly

export default function JobRequestDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestData = {} } = location.state || {};
  const requestId = requestData.requestId;
  const [jobRequest, setJobRequest] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const stages = ["Pending", "Ongoing", "Completed", "Satisfaction Survey"];

  useEffect(() => {
    const fetchJobRequest = async () => {
      try {
        setLoading(true);

        // Fetch job request details
        const { data, error } = await supabase
          .from("Request")
          .select(
            "requestId, requestDate, location, jobCategory, priority, description, image, remarks, status"
          )
          .eq("requestId", requestId)
          .single();

        if (error) throw new Error(error.message);

        // Format the requestDate
        const formattedDate = new Date(data.requestDate)
          .toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "");

        // Fetch assignments related to the specific requestId
        const { data: assignments, error: assignmentError } = await supabase
          .from("Department_request_assignment")
          .select("requestId, staffName, deptId")
          .eq("requestId", requestId);

        if (assignmentError) throw assignmentError;

        // Fetch department details
        const { data: departments, error: departmentError } = await supabase
          .from("Department")
          .select("deptId, deptName");

        if (departmentError) throw departmentError;

        // Find the department name associated with the request
        const departmentName =
          assignments.length > 0
            ? departments.find((dept) => dept.deptId === assignments[0].deptId)
                ?.deptName
            : "Unknown Department";

        // Extract and log staff names for debugging
        const staffNames = assignments.map(
          (assignment) => assignment.staffName
        );
        console.log("Matched Staff Names for Request:", staffNames);

        setJobRequest({
          ...data,
          requestDate: formattedDate, // Use the formatted date
          departmentName,
          staffName: staffNames.join(", "),
        });

        // Fetch tracking information to determine the last status
        const { data: trackingData, error: trackingFetchError } = await supabase
          .from("Tracking")
          .select("details, timestamp")
          .eq("requestId", requestId)
          .order("timestamp", { ascending: false })
          .limit(1);

        if (trackingFetchError) throw new Error(trackingFetchError.message);

        setTrackingData(trackingData);

        // Insert into Tracking table if status has changed
        if (
          trackingData.length > 0 &&
          trackingData[0].details.includes(data.status)
        ) {
          return;
        }

        let trackingDetails = "";

        if (data.status === "Pending") {
          trackingDetails = `Job request is pending at ${departmentName}.`;
        } else if (data.status === "Ongoing") {
          trackingDetails = `Job request is still Ongoing at ${departmentName}.`;
        } else if (data.status === "In Progress") {
          trackingDetails = `Job request is now In Progress by ${departmentName}.`;
        } else if (data.status === "Completed") {
          trackingDetails = `Job request is already Completed by ${departmentName}.`;
        }

        if (trackingDetails) {
          const { error: trackingError } = await supabase
            .from("Tracking")
            .insert([
              {
                requestId: data.requestId,
                details: trackingDetails,
                timestamp: new Date().toISOString(),
              },
            ]);

          if (trackingError) throw new Error(trackingError.message);
        }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchJobRequest();
    }
  }, [requestId]);

  const currentStage = stages.indexOf(jobRequest?.status || "Requested");

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!jobRequest) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-500">
          Error: Job request not found
        </h2>
        <button
          className="bg-gray-700 p-5 text-white py-2 px-4 rounded mt-4"
          onClick={() => navigate(-1)}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!jobRequest) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-500">
          Error: Job request not found
        </h2>
        <button
          className="bg-gray-700 p-5 text-white py-2 px-4 rounded mt-4"
          onClick={() => navigate(-1)}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="p-6">
      <button
        className="bg-gray-700 p-5 text-white py-2 px-4 rounded"
        onClick={() => navigate(-1)}
      >
        Back to Dashboard
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Job Request Details Card */}
        <div className="bg-white rounded-r-xl border shadow-xl shadow-black/5 h-full flex flex-col">
          <div className="p-4 flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Job Request Details
            </h2>
            s
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Request ID
                </label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 p-2"
                  value={jobRequest.requestId || "Not Available"}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 p-2"
                  value={jobRequest.location || "Not Available"}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Request Date
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 p-2"
                  value={jobRequest.requestDate || "Not Available"}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Priority Level
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 p-2"
                  value={jobRequest.priority || "Not Available"}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Job Category
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 p-2"
                  value={jobRequest.jobCategory || "Not Available"}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Assigned Department
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 p-2"
                  value={jobRequest.departmentName || "Not Available"}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xl font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 p-2"
                  rows="3"
                  value={jobRequest.description || "No description available."}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xl font-medium text-gray-700">
                  Assigned Staff
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 p-2"
                  rows="3"
                  value={jobRequest.staffName || "No staff available."}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xl font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 p-2"
                  rows="3"
                  value={jobRequest.remarks || "No remarks available."}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xl font-medium text-gray-700">
                  Image
                </label>
                <img
                  src={jobRequest.image}
                  alt="Job Request Attachment"
                  className="mt-2 max-w-full h-auto border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-end space-x-4">
            <button
              onClick={() => navigate("/requestor/english_version")}
              className={`py-2 px-4 rounded ${
                jobRequest.status === "Completed"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={jobRequest.status !== "Completed"}
            >
              Client Satisfaction Survey
            </button>

            <button
              // onClick={() => navigate("/requestor/english_version")}
              className={`py-2 px-4 rounded ${
                jobRequest.status === "Completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={jobRequest.status !== "Completed"}
            >
              View Certificate
            </button>
          </div>
        </div>

        {/* Job Request Tracking Card */}
        <div className="bg-white border shadow-md shadow-black/5 rounded-md h-full flex flex-col">
          <div className="p-4 flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Job Request Tracking
            </h2>
            <div className="flex items-center justify-between">
              {stages.map((stage, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        index <= currentStage
                          ? "border-green-500 bg-green-100"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= currentStage ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {index <= currentStage ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : null}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 mt-2">{stage}</span>
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        index < currentStage ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-6 overflow-x-auto">
              <div className="text-lg font-semibold text-black">
                Tracking Information
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trackingData.map((track, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {track.details}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(track.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {trackingData.length === 0 && (
                    <tr>
                      <td
                        className="px-6 py-4 text-gray-500 text-center"
                        colSpan={2}
                      >
                        No tracking data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import supabase from "../../../service/supabase"; // Ensure Supabase is configured correctly

// export default function JobRequestDetail() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { requestData = {} } = location.state || {};
//   const requestId = requestData.requestId;
//   const [jobRequest, setJobRequest] = useState(null);
//   const [trackingData, setTrackingData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const stages = [
//     "Pending",
//     "Ongoing",
//     "In Progress",
//     "Completed",
//     "Satisfaction Survey",
//   ];

//   useEffect(() => {
//     const fetchJobRequest = async () => {
//       try {
//         setLoading(true);

//         // Fetch job request details
//         const { data, error } = await supabase
//           .from("Request")
//           .select(
//             "requestId, requestDate, location, jobCategory, priority, description, image, remarks, status"
//           )
//           .eq("requestId", requestId)
//           .single();

//         if (error) throw new Error(error.message);

//         // Fetch assignments to get the department names
//         const { data: assignments, error: assignmentError } = await supabase
//           .from("Department_request_assignment")
//           .select("staffName, deptId")
//           .eq("requestId", requestId);

//         if (assignmentError) throw assignmentError;

//         const { data: departments, error: departmentError } = await supabase
//           .from("Department")
//           .select("deptId, deptName");

//         if (departmentError) throw departmentError;

//         // Find the department name associated with the request
//         const departmentName =
//           assignments.length > 0
//             ? departments.find((dept) => dept.deptId === assignments[0].deptId)
//                 ?.deptName
//             : "Unknown Department";

//         setJobRequest({ ...data, departmentName });

//         // Fetch tracking information to determine the last status
//         const { data: trackingData, error: trackingFetchError } = await supabase
//           .from("Tracking")
//           .select("details, timestamp")
//           .eq("requestId", requestId)
//           .order("timestamp", { ascending: false })
//           .limit(1); // Only fetch the latest tracking entry

//         if (trackingFetchError) throw new Error(trackingFetchError.message);

//         setTrackingData(trackingData);

//         // Insert into Tracking table if status has changed
//         if (
//           trackingData.length > 0 &&
//           trackingData[0].details.includes(data.status)
//         ) {
//           // If the last status is the same as the current status, skip the insert
//           return;
//         }

//         let trackingDetails = "";

//         if (data.status === "Pending") {
//           trackingDetails = `Job request is pending at ${departmentName}.`;
//         } else if (data.status === "Ongoing") {
//           trackingDetails = `Job request is still Ongoing at ${departmentName}.`;
//         } else if (data.status === "In Progress") {
//           trackingDetails = `Job request is now In Progress by ${departmentName}.`;
//         } else if (data.status === "Completed") {
//           trackingDetails = `Job request is already Completed by ${departmentName}.`;
//         }

//         // Insert the new tracking entry if there's a status change
//         if (trackingDetails) {
//           const { error: trackingError } = await supabase
//             .from("Tracking")
//             .insert([
//               {
//                 requestId: data.requestId,
//                 details: trackingDetails,
//                 timestamp: new Date().toISOString(),
//               },
//             ]);

//           if (trackingError) throw new Error(trackingError.message);
//         }
//       } catch (err) {
//         console.error("Error:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (requestId) {
//       fetchJobRequest();
//     }
//   }, [requestId]);

//   const currentStage = stages.indexOf(jobRequest?.status || "Requested");

//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   if (!jobRequest) {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-bold text-red-500">
//           Error: Job request not found
//         </h2>
//         <button
//           className="bg-gray-700 p-5 text-white py-2 px-4 rounded mt-4"
//           onClick={() => navigate(-1)}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <button
//         className="bg-gray-700 p-5 text-white py-2 px-4 rounded"
//         onClick={() => navigate(-1)}
//       >
//         Back to Dashboard
//       </button>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {/* Job Request Details Card */}
//         <div className="bg-white rounded-r-xl border shadow-xl shadow-black/5 h-full flex flex-col">
//           <div className="p-4 flex-grow">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Job Request Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//               <div>
//                 <label className="block text-xl font-medium text-gray-700">
//                   Request ID
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-2 block w-full border border-gray-300 p-2"
//                   value={jobRequest.requestId || "Not Available"}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium text-gray-700">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   value={jobRequest.location || "Not Available"}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium text-gray-700">
//                   Request Date
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   value={jobRequest.requestDate || "Not Available"}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium text-gray-700">
//                   Priority Level
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   value={jobRequest.priority || "Not Available"}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium text-gray-700">
//                   Job Category
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   value={jobRequest.jobCategory || "Not Available"}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label className="block text-xl font-medium text-gray-700">
//                   Assigned Department
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   value={jobRequest.departmentNames || "Not Available"}
//                   readOnly
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xl font-medium text-gray-700">
//                   Job Description
//                 </label>
//                 <textarea
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   rows="3"
//                   value={jobRequest.description || "No description available."}
//                   readOnly
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xl font-medium text-gray-700">
//                   Assigned Staff
//                 </label>
//                 <textarea
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   rows="3"
//                   value={jobRequest.staffNames || "No staff available."}
//                   readOnly
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xl font-medium text-gray-700">
//                   Remarks
//                 </label>
//                 <textarea
//                   className="mt-1 block w-full border border-gray-300 p-2"
//                   rows="3"
//                   value={jobRequest.remarks || "No remarks available."}
//                   readOnly
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xl font-medium text-gray-700">
//                   Image
//                 </label>
//                 <img
//                   src={jobRequest.image}
//                   alt="Job Request Attachment"
//                   className="mt-2 max-w-full h-auto border border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="p-4 flex justify-end space-x-4">
//             <button className="bg-blue-500 text-white py-2 px-4 rounded">
//               Update
//             </button>
//           </div>
//         </div>

//         {/* Job Request Tracking Card */}
//         <div className="bg-white border shadow-md shadow-black/5 rounded-md h-full flex flex-col">
//           <div className="p-4 flex-grow">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Job Request Tracking
//             </h2>
//             <div className="flex items-center justify-between">
//               {stages.map((stage, index) => (
//                 <React.Fragment key={index}>
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                         index <= currentStage
//                           ? "border-green-500 bg-green-100"
//                           : "border-gray-300 bg-white"
//                       }`}
//                     >
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                           index <= currentStage ? "bg-green-500" : "bg-gray-300"
//                         }`}
//                       >
//                         {index <= currentStage ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5 text-white"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         ) : null}
//                       </div>
//                     </div>
//                     <span className="text-sm text-gray-700 mt-2">{stage}</span>
//                   </div>
//                   {index < stages.length - 1 && (
//                     <div
//                       className={`flex-1 h-1 ${
//                         index < currentStage ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//             <div className="mt-6 overflow-x-auto">
//               <div className="text-lg font-semibold text-black">
//                 Tracking Information
//               </div>
//               <table className="min-w-full divide-y divide-gray-200 mt-4">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Timestamp
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {trackingData.map((track, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {track.details}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {new Date(track.timestamp).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                   {trackingData.length === 0 && (
//                     <tr>
//                       <td
//                         className="px-6 py-4 text-gray-500 text-center"
//                         colSpan={2}
//                       >
//                         No tracking data available.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
