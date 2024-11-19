import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatusCard
          title="BGMS"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="MEWS"
          count={0}
          bgColor="bg-sky-200"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="CSWS"
          count={0}
          bgColor="bg-green-400"
          onClick={() => navigate("/requestor/job_request")}
        />

      </div>

      {/* Main Content Section */}

    </>
  );
}
