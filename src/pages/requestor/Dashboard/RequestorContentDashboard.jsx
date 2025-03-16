import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import supabase from "../../../service/supabase";
import RequestorNotification from "./RequestorNotificationAndCalendar";
import { FaHourglassStart, FaClock, FaCheckCircle } from "react-icons/fa";
import { getCurrentUser } from "../../../service/apiAuth";
import Logo from "../../../assets/images/Loading_2.gif"; // Use logo for loading

export default function ContentDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ pending: 0, ongoing: 0, completed: 0 });
  const [showLogo, setShowLogo] = useState(true); // Show logo for 2 seconds

  useEffect(() => {
    // Show logo for 2 seconds before fetching data
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      fetchCounts();
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  const fetchCounts = async () => {
    try {
      // Get current user
      const user = await getCurrentUser();
      if (!user?.idNumber) {
        console.error("User ID number not found");
        return;
      }

      const { idNumber } = user;

      // Fetch counts for each status
      const { count: pendingCount, error: pendingError } = await supabase
        .from("Request")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending")
        .eq("idNumber", idNumber);

      const { count: ongoingCount, error: ongoingError } = await supabase
        .from("Request")
        .select("*", { count: "exact", head: true })
        .eq("status", "Ongoing")
        .eq("idNumber", idNumber);

      const { count: completedCount, error: completedError } = await supabase
        .from("Request")
        .select("*", { count: "exact", head: true })
        .eq("status", "Completed")
        .eq("idNumber", idNumber);

      if (pendingError) console.error("Pending Error:", pendingError);
      if (ongoingError) console.error("Ongoing Error:", ongoingError);
      if (completedError) console.error("Completed Error:", completedError);

      setCounts({
        pending: pendingCount || 0,
        ongoing: ongoingCount || 0,
        completed: completedCount || 0,
      });
    } catch (error) {
      console.error("Unexpected error fetching counts:", error);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {showLogo ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
          <p className="mt-4 text-gray-500">Loading, please wait...</p>
        </div>
      ) : (
        <>
          <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
            <SearchBar title="Dashboard" />
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <StatusCard
              title="Pending"
              count={counts.pending}
              icon={<FaClock />}
              iconColor="text-red-400"
              titleColor="text-red-500"
              bgColor="bg-white"
              onClick={() => navigate("/requestor/job_request")}
            />
            <StatusCard
              title="Ongoing"
              count={counts.ongoing}
              icon={<FaHourglassStart />}
              iconColor="text-yellow-400"
              titleColor="text-yellow-500"
              bgColor="bg-white"
              onClick={() => navigate("/requestor/job_request")}
            />
            <StatusCard
              title="Completed"
              count={counts.completed}
              icon={<FaCheckCircle />}
              iconColor="text-green-500"
              titleColor="text-green-500"
              bgColor="bg-white"
              onClick={() => navigate("/requestor/request_completed")}
            />
          </div>

          {/* Notification & Calendar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="col-span-2 -mt-5">
              <RequestorNotification />
            </div>
            <div className="lg:col-span-1 -mt-5 rounded-lg">
              <ReusableCalendar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
