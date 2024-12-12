import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import { FaHourglassStart, FaClock, FaCheckCircle, FaRegHandPointer } from "react-icons/fa";
import supabase from "../../../service/supabase"; 
import RequestorNotification from "./RequestorNotificationAndCalendar";

export default function ContentDashboard() {
  const navigate = useNavigate();
  const statusCardColor = "bg-white";
  
  const [counts, setCounts] = useState({
    pending: 0,
    ongoing: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch counts for each status
        const { data: pendingData, error: pendingError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Pending");
  
        const { data: ongoingData, error: ongoingError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Ongoing");
  
        const { data: completedData, error: completedError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Completed");
  

        // Log errors explicitly if they occur
        if (pendingError) console.error("Pending Error:", pendingError);
        if (ongoingError) console.error("Ongoing Error:", ongoingError);
        if (completedError) console.error("Completed Error:", completedError);

  
        // Check if data is fetched correctly before updating state
        if (!pendingError && !ongoingError && !completedError ) {
          setCounts({
            pending: pendingData?.length || 0,
            ongoing: ongoingData?.length || 0,
            completed: completedData?.length || 0,
          });
        }
      } catch (error) {
        console.error("Unexpected error fetching counts:", error);
      }
    };
  
    fetchCounts();
  }, []);

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatusCard
          title="Pending"
          count={counts.pending} // Display the count of pending requests
          icon={<FaClock />}
          iconColor="text-red-400"
          titleColor="text-red-500"
          bgColor={statusCardColor}
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={counts.ongoing} // Display the count of ongoing requests
          icon={<FaHourglassStart />}
          iconColor="text-yellow-400"
          titleColor="text-yellow-500"
          bgColor={statusCardColor}
          onClick={() => navigate("/requestor/job_ongoing")}
        />
        <StatusCard
          title="Completed"
          count={counts.completed} // Display the count of completed requests
          icon={<FaCheckCircle />}
          iconColor="text-green-500"
          titleColor="text-green-500"
          bgColor={statusCardColor}
          onClick={() => navigate("/requestor/job_completed")}
        />

      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Side (Notifications) */}
        <div className="col-span-2 -mt-5">
          <RequestorNotification />
        </div>

        {/* Right Side (Calendar) */}
        <div className="lg:col-span-1 -mt-5 rounded-lg">
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}
