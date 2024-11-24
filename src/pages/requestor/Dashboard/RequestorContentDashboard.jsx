import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import { FaHourglassStart, FaClock, FaCheckCircle, FaRegHandPointer } from 'react-icons/fa'; 

export default function ContentDashboard() {
  const navigate = useNavigate();

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
          icon={<FaClock />}
          // iconColor="text-gray-400" 
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={0}
          icon={<FaHourglassStart />}
          // iconColor="text-yellow-500"
          onClick={() => navigate("/requestor/job_ongoing")}
        />
        <StatusCard
          title="Completed"
          count={0}
          icon={<FaCheckCircle />}
          // iconColor="text-green-500"
          onClick={() => navigate("/requestor/job_completed")}
        />
        <StatusCard
          title="Referral"
          count={0}
          icon={<FaRegHandPointer />}
          // iconColor="text-blue-500"
          onClick={() => navigate("/requestor/job_referral")}
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
