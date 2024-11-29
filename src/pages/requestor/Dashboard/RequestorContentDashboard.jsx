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

  // Handle any errors while fetching data
  if (error) {
    console.error("Error fetching requests:", error);
  }

  // Count the number of requests in each status
  const pendingCount = requests.filter(request => request.status === "Pending").length;
  const ongoingCount = requests.filter(request => request.status === "InProgress").length;
  const completedCount = requests.filter(request => request.status === "Completed").length;
  const referralCount = requests.filter(request => request.status === "Referral").length;

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
          count={ongoingCount} // Display the count of ongoing requests
          icon={<FaHourglassStart />}
          iconColor="text-yellow-400"
          titleColor="text-yellow-500"
          bgColor={statusCardColor}
          onClick={() => navigate("/requestor/job_ongoing")}
        />
        <StatusCard
          title="Completed"
          count={completedCount} // Display the count of completed requests
          icon={<FaCheckCircle />}
          iconColor="text-green-500"
          titleColor="text-green-500"
          bgColor={statusCardColor}
          onClick={() => navigate("/requestor/job_completed")}
        />
        <StatusCard
          title="Referral"
          count={referralCount} // Display the count of referral requests
          icon={<FaRegHandPointer />}
          iconColor="text-purple-500"
          titleColor="text-purple-500"
          bgColor={statusCardColor}
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
