import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import ReusableCalendar from "../../../components/ReusableCalendar";
import ReusableNotification from "../../../components/ReusableNotification";

export default function StaffContentDash() {
  const navigate = useNavigate();
  const statusCardColor = "bg-blue-50"; // Customize color as per your theme

  return (
    <>
      {/* Header Section */}
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      {/* Status Cards - Full Width */}
      <div className="flex flex-col lg:flex-row w-full p-6 gap-6">
        <StatusCard
          count={1}
          title="Ongoing"
          bgColor={statusCardColor}
          onClick={() => navigate("/Staff/StaffImagePage")}
          gridSpan="w-full" // Full width for this card
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor={statusCardColor}
          onClick={() => navigate("/Staff/StaffSendCert")}
          gridSpan="w-full" // Full width for this card
        />
      </div>

      {/* Main Content Section (Two Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 rounded-lg">
        {/* Left Side (Notifications) */}
        <div className="col-span-2">
          <ReusableNotification />
        </div>

        {/* Right Side (Calendar) */}
        <div className="lg:col-span-1">
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}
