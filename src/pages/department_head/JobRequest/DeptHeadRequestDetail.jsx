// import { useNavigate } from "react-router-dom";


// export default function RequestFormDetail() {
//     const { requestId } = useParams();
//     const navigate = useNavigate(); // Access the navigate function to redirect

//     const [request, setRequests] = useState({
//         requestId:  "",
//         description:  "",
//         jobCategory:  "",
//         deptName:  "",
//         image:  "",
//         status:  "",
//         requestDate:  "",
//         priority:  "",
//       });
// const [loading, setLoading] = useState(true);
// const [editing, setEditing] = useState(false); // Flag to track if in editing mode
// useEffect(() => {
//     const fetchRequestDetails = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("Request")
//           .select(`
//         requestId,
//         description,
//         jobCategory,
//         deptName,
//         image,
//         status,
//         requestDate,
//         priority
// `)
//           .eq("requestId", requestId)
//           .single();


//           if (error) throw error;

//           setRequests({
//             requestId:  data.requestId || "N/A",
//             description:  data.description || "N/A",
//             jobCategory: data.jobCategory || "N/A",
//             deptName: data.deptName || "N/A",
//             image:  data.image || "N/A",
//             status:  data.status || "N/A",
//             priority: data.priority || "N/A",
//             requestDate: data.requestDate || "N/A",
//             dateCreated: new Date(data.created_at).toLocaleDateString(),
//           });

//         } catch (err) {
//             console.error("Error fetching request data:", err);
            
//           } finally {
//             setLoading(false);
//           }
//         };
    
        
//     fetchRequestDetails();
// }, [requestId]); // Runs once when component mounts
// // Handle input changes
// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setrequest((prevRequest) => ({
//       ...prevRequest,
//       [name]: value,
//     }));
//   };

//  // Handle form save action
//  const handleSave = async () => {
//     try {
//       // Ensure that required fields are not empty
//       if (!request.requestId || !request.description || !request.priority) {
//         alert("requestId, description, and priority are required.");
//         return;
//       }

//         // Perform the update query
//         const { error } = await supabase
//         .from("User")
//         .update({
//             requestId: request.requestId,
//             description: request.description,
//             jobCategory: request.jobCategory,
//             deptName: request.contactNumber,
//             image: request.image,
//             status: request.status,
//             requestDate: request.requestDate,
//             priority: request,priority
//         })
//         .eq("requestId", requestId); // Update only the record with the matching ID

//         if (error) throw error; // Handle any error returned from Supabase
//             // Inform the user about successful update
//             alert("request updated successfully!");

//             // Redirect back to the table after successful update
//             navigate("/department_head/job_request"); 

//         } catch (err) {
//             console.error("Error updating admin da ta:", err);
//             alert("Failed to update staff details.");
//           }
//         };
//         if (loading) return <div>Loading...</div>; // Display loading message while data is being fetched

// return (
// <div className="flex flex-wrap">
//     {/* Column 1 */}
//     <div className="w-full md:w-1/2 p-4">
//       <p>Content for the first column</p>
//     </div>

//     {/* Column 2 */}
//     <div className="w-full md:w-1/2 p-4">
//       <p>Content for the second column</p>
//     </div>
//   </div>        
// );

//     }

//RequestDetailPage
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalForm from "./ModalForm";
import { useAssignmentStore } from "../../../store/useAssignmentStore";

export default function RequestDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [remarks, setRemarks] = useState(""); // State for remarks input

  const {
    fullName,
    description,
    location: requestLocation,
    jobCategory,
    requestDate,
    image,
    priority,
    deptReqAssId,
    requestId,
    idNumber,
  } = location.state || {}; // Destructure data passed via navigation

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAssign = () => {
    useAssignmentStore
      .getState()
      .setAssignmentData(description, jobCategory, requestLocation, deptReqAssId, requestId, idNumber);
    openModal();
  };

  const handleReferClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const navigateToCurrentJobRequest = () => {
    navigate("/current-job-request"); // Adjust this path based on your route
    setIsDropdownOpen(false); // Close the dropdown
  };

  const navigateToNewJobRequest = () => {
    navigate("/department_head/make_requestDeptHead"); // Adjust this path based on your route
    setIsDropdownOpen(false); // Close the dropdown
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value); // Update remarks state when the input changes
  };

  const handleSaveRemarks = () => {
    // Here, you could save remarks to a backend or handle it as needed
    console.log("Remarks saved:", remarks);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center p-2 rounded bg-yellow-500 mb-6">Job Request Details</h2>
      <div className="flex justify-between items-start">
        {/* Left side: Job Request Details */}
        <div className="flex-1 pr-6">
          <div className="mb-4">
            <strong>Requestor:</strong> {fullName || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Description:</strong> {description || "No description provided"}
          </div>
          <div className="mb-4">
            <strong>Job Category:</strong> {jobCategory || "Unknown Category"}
          </div>
          <div className="mb-4">
            <strong>Date Submitted:</strong> {requestDate || "Invalid Date"}
          </div>
          <div className="mb-4">
            <strong>Location:</strong> {requestLocation || "Unknown Location"}
          </div>
          <div className="mb-4">
            <strong>Priority:</strong>{" "}
            <span
              className={`px-2 py-1 rounded ${
                priority === "High"
                  ? "bg-red-500 text-white"
                  : priority === "Medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {priority || "No Priority"}
            </span>
          </div>
          
        </div>

        {/* Right side: Image */}
        {image && (
          <div className="w-1/3">
            <strong>Image:</strong>
            <img
              src={image}
              alt="Job Request"
              className="w-full h-auto mt-2 rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* Remarks Input Field */}
      <div className="mt-6">
        <label htmlFor="remarks" className="block font-bold mb-2">
          Remarks:
        </label>
        <textarea
          id="remarks"
          value={remarks}
          onChange={handleRemarksChange}
          rows="4"
          className="w-full p-2 border rounded-lg"
          placeholder="Add your remarks here..."
        />
      </div>

      {/* Save Remarks Button */}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-blue-600 mb-5 text-white rounded hover:bg-blue-700"
          onClick={handleSaveRemarks}
        >
          Save Remarks
        </button>
      </div>
      <button
            className="px-4 py-2  bg-blue-600 font-bold text-white rounded hover:bg-blue-700"
            onClick={handleAssign}
          >
            Assign
          </button>
      {/* Refer Button with Dropdown */}
      <div className="mt-3">
        <button
          className="px-4 py-2 bg-green-600 font-bold text-white rounded hover:bg-green-700"
          onClick={handleReferClick}
        >
          Refer
        </button>

        {isDropdownOpen && (
          <div className="mt-2 bg-white shadow-lg rounded-lg w-48 absolute z-10 border">
            <button
              className="block px-4 py-2 text-left text-blue-600 hover:bg-gray-200 w-full"
              onClick={navigateToCurrentJobRequest}
            >
              Current Job Request
            </button>
            <button
              className="block px-4 py-2 text-left text-blue-600 hover:bg-gray-200 w-full"
              onClick={navigateToNewJobRequest}
            >
              New Job Request
            </button>
          </div>
        )}
      </div>

      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => console.log("Modal submitted")}
      />
      <button
        className="ml-2 mt-4 text-blue-500 font-bold underline"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}