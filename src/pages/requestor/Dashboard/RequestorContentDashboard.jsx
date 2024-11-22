import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import { FaHourglassStart, FaClock, FaCheckCircle, FaRegHandPointer } from 'react-icons/fa';  // Import relevant icons

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
      </div>

      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StatusCard
          title="Pending"
          count={1}
          bgColor="bg-blue-50"
          icon={<FaClock />}  
          iconCOlo
          // titleColor="text-red-500" 
          iconColor="text-red-600" 
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={0}
          bgColor="bg-blue-50"
          icon={<FaHourglassStart />}  
          // titleColor="text-yellow-500" 
          iconColor="text-yellow-600"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor="bg-blue-50"
          icon={<FaCheckCircle />}  
             iconColor="text-green-600"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Referral"
          count={0}
          bgColor="bg-blue-50"
          icon={<FaRegHandPointer />}  
           iconColor="text-purple-600"
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
