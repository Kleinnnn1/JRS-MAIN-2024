import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import { FaHourglassStart, FaClock, FaCheckCircle, FaRegHandPointer } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Adjust the path as necessary

export default function ContentDashboard() {
  const navigate = useNavigate();
  const statusCardColor = "bg-blue-50";
  
  const [counts, setCounts] = useState({
    pending: 0,
    ongoing: 0,
    completed: 0,
    referral: 0,
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
          .eq("status", "InProgress");
  
        const { data: completedData, error: completedError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Completed");
  
        const { data: referralData, error: referralError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Referral");
  
        // Log errors explicitly if they occur
        if (pendingError) console.error("Pending Error:", pendingError);
        if (ongoingError) console.error("Ongoing Error:", ongoingError);
        if (completedError) console.error("Completed Error:", completedError);
        if (referralError) console.error("Referral Error:", referralError);
  
        // Check if data is fetched correctly before updating state
        if (!pendingError && !ongoingError && !completedError && !referralError) {
          setCounts({
            pending: pendingData?.length || 0,
            ongoing: ongoingData?.length || 0,
            completed: completedData?.length || 0,
            referral: referralData?.length || 0,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
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
        <StatusCard
          title="Referral"
          count={counts.referral} // Display the count of referral requests
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
