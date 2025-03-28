import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import ReusableCalendar from "../../../components/ReusableCalendar";
import StaffNotification from "./StaffNotificationAndCalendar";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";
import { FaHourglassStart, FaCheckCircle } from "react-icons/fa";

export default function StaffContentDash() {
  const navigate = useNavigate();
  const statusCardColor = "bg-white"; // Customize color as per your theme

  // State for Ongoing and Completed counts
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update `isMobile` state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Get the current user's full name
        const currentUser = await getCurrentUser();
        const staffFullName = currentUser?.fullName;

        if (!staffFullName) {
          console.error("Error: Could not fetch the current user's full name.");
          return;
        }

        // Fetch Ongoing count
        const { count: ongoing, error: ongoingError } = await supabase
          .from("Request")
          .select("*, Department_request_assignment!inner(staffName)", {
            count: "exact",
          }) // Inner join on Department_request_assignment
          .eq("Department_request_assignment.staffName", staffFullName)
          .eq("status", "Ongoing");

        // Fetch Completed count
        const { count: completed, error: completedError } = await supabase
          .from("Request")
          .select("*, Department_request_assignment!inner(staffName)", {
            count: "exact",
          }) // Inner join on Department_request_assignment
          .eq("Department_request_assignment.staffName", staffFullName)
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
      <div className="flex flex-col lg:flex-row w-full p-6 gap-6 -mt-2">
        <StatusCard
          count={ongoingCount}
          title="Ongoing"
          icon={<FaHourglassStart />}
          bgColor={statusCardColor}
          iconColor="text-yellow-400"
          titleColor="text-yellow-500"
          gridSpan="w-full" // Full width for this card
        />
        <StatusCard
          count={completedCount}
          title="Completed"
          bgColor={statusCardColor}
          icon={<FaCheckCircle />}
          iconColor="text-green-500"
          titleColor="text-green-500"
          gridSpan="w-full" // Full width for this card
        />
      </div>

      {/* Main Content Section (Two Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 rounded-lg">
        {/* Left Side (Notifications) */}
        <div className="col-span-2 m-4 -mt-1">
          <StaffNotification />
        </div>

        {/* Right Side (Calendar) - Hidden on Mobile */}
        {!isMobile && (
          <div className="lg:col-span-1 -mt-1">
            <ReusableCalendar />
          </div>
        )}
      </div>
    </>
  );
}
