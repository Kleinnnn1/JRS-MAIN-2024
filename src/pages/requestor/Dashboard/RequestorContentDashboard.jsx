import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import { FaHourglassStart, FaClock, FaCheckCircle, FaRegHandPointer } from 'react-icons/fa'; 
import { useQuery } from "@tanstack/react-query";
import { getRequestorRequest } from "../../../service/apiRequestorRequestTable";

export default function ContentDashboard() {
  const navigate = useNavigate();
  const statusCardColor = "bg-blue-50";

  // Fetch requests with status 'Pending'
  const { data: requests = [], error } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequestorRequest,
  });

  // Count the number of pending requests
  const pendingCount = requests.length;

  if (error) {
    console.error("Error fetching requests:", error);
  }

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StatusCard
          title="Pending"
          count={pendingCount} // Display the count of pending requests
          icon={<FaClock />}
          iconColor="text-red-400"
          titleColor="text-red-500"
          bgColor={statusCardColor}
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={0}
          bgColor={statusCardColor}
          icon={<FaHourglassStart />}
          iconColor="text-yellow-400"
          titleColor="text-yellow-500"
          onClick={() => navigate("/requestor/job_ongoing")}
        />
        <StatusCard
          title="Completed"
          bgColor={statusCardColor}
          count={0}
          icon={<FaCheckCircle />}
          titleColor="text-green-500"
          iconColor="text-green-500"
          onClick={() => navigate("/requestor/job_completed")}
        />
        <StatusCard
          title="Referral"
          count={0}
          icon={<FaRegHandPointer />}
          bgColor={statusCardColor}
          titleColor="text-purple-500"
          iconColor="text-purple-500"
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
        <div className="lg:col-span-1 rounded-lg">
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}
