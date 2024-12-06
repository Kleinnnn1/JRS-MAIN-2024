import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import ReusableCalendar from "../../../components/ReusableCalendar";
import StaffNotification from "./StaffNotificationAndCalendar";
import supabase from "../../../service/supabase";

export default function StaffContentDash() {
  const navigate = useNavigate();
  const statusCardColor = "bg-blue-50"; // Customize color as per your theme

  // State for Ongoing and Completed counts
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Fetch counts from Supabase
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch Ongoing count
        const { count: ongoing, error: ongoingError } = await supabase
          .from("Request") // Replace with your table name
          .select("*", { count: "exact" })
          .eq("status", "Ongoing");

        // Fetch Completed count
        const { count: completed, error: completedError } = await supabase
          .from("Request") // Replace with your table name
          .select("*", { count: "exact" })
          .eq("status", "Completed");

        // Set state if no errors
        if (!ongoingError) setOngoingCount(ongoing || 0);
        if (!completedError) setCompletedCount(completed || 0);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      {/* Status Cards - Full Width */}
      <div className="flex flex-col lg:flex-row w-full p-6 gap-6">
        <StatusCard
          count={ongoingCount}
          title="Ongoing"
          bgColor={statusCardColor}
          onClick={() => navigate("/Staff/StaffImagePage")}
          gridSpan="w-full" // Full width for this card
        />
        <StatusCard
          count={completedCount}
          title="Completed"
          bgColor={statusCardColor}
          onClick={() => navigate("/Staff/StaffSendCert")}
          gridSpan="w-full" // Full width for this card
        />
      </div>

      {/* Main Content Section (Two Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 rounded-lg">
        {/* Left Side (Notifications) */}
        <div className="col-span-2">
          <StaffNotification />
        </div>

        {/* Right Side (Calendar) */}
        <div className="lg:col-span-1">
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}
