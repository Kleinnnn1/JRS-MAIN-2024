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

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalForm from "./ModalForm";

export default function JobRequestDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(location.state || {});

  // Function to open the modal with selected request
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle staff assignment submission
  const handleAssignStaff = () => {
    // You can handle assignment logic here
    console.log("Assigning staff to:", selectedRequest);
    closeModal();
  };

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-lg rounded-lg">
      {/* Job Request Details */}
      <h2 className="text-2xl font-semibold mb-4">Job Request Details</h2>
      <p><strong>Requestor: </strong>{selectedRequest.fullName}</p>
      <p><strong>Description: </strong>{selectedRequest.description}</p>
      <p><strong>Job Category: </strong>{selectedRequest.jobCategory}</p>
      <p><strong>Location: </strong>{selectedRequest.location}</p>
      <p><strong>Date Submitted: </strong>{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
      <p><strong>Priority: </strong><span className="text-xl">{selectedRequest.priority}</span></p>
      {selectedRequest.image && <img src={selectedRequest.image} alt="Job Request" className="my-4" />}
      
      {/* Assign Staff Button */}
      <button
        className="px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-600 text-white mr-2"
        onClick={openModal}
      >
        Assign Staff
      </button>

      {/* Modal for assigning staff */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAssignStaff}
      />
    </div>
  );
}