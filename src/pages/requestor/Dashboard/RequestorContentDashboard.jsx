import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import RequestorJobRequestForm from "../JobRequest/RequestorJobRequestForm"; // Import the form component

export default function ContentDashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Function to handle opening the modal
  const handleMakeRequestClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.id === "modalBackdrop") {
      closeModal();
    }
  };

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />

        {/* Centered Buttons */}
        <div className="flex justify-center space-x-4">
          {/* USTP Harmonized Client Satisfaction Survey Button */}
          {/* <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200"
            onClick={() => navigate("/requestor/select")}
          >
            USTP Harmonized Client Satisfaction Survey
          </button> */}
{/* 
          Make Request Button */}
          {/* <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200"
            onClick={handleMakeRequestClick} // Open the modal on click
          >
            Make Request
          </button> */}
        </div>
      </div>

      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StatusCard
          title="Pending"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={0}
          bgColor="bg-sky-200"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor="bg-green-400"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Referral"
          count={1}
          bgColor="bg-purple-400"
          onClick={() => navigate("/requestor/job_request")}
        />
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Side (Notifications) */}
        <div className="col-span-2">
          <ReusableNotification />
        </div>

        {/* Right Side (Calendar) */}
        <div className="lg:col-span-1 p-4 bg-white shadow-lg rounded-lg">
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}

// Modal for Job Request Form
// {isModalOpen && (
//   <div
//     id="modalBackdrop"
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//     onClick={handleClickOutsideModal} // Close modal when clicked outside
//   >
//     <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full relative">
//       <button
//         onClick={closeModal}
//         className="absolute -top-4 -right-4 bg-yellow-300 text-black text-4xl rounded-full h-10 w-10 flex items-center justify-center border-4 border-yellow-300 hover:bg-gray-100 hover:text-red-600 shadow-lg"
//         aria-label="Close Modal"
//       >
//         &times;
//       </button>
//       {/* Render the job request form here */}
//       <RequestorJobRequestForm onSubmit={closeModal} />
//     </div>
//   </div>
// )}
