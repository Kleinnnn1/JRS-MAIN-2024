import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StaffStatCard";
import NotificationAndCalendar from "../../../components/StaffCalendar";
import ReusableCalendar from "../../../components/ReusableCalendar";
import ReusableNotification from "../../../components/ReusableNotification";

export default function StaffContentDash() {
  const navigate = useNavigate();

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      <div className="flex p-6 gap-6">
        <StatusCard
          title="Ongoing"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/Staff/StaffImagePage")}
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor="bg-green-200"
          onClick={() => navigate("/Staff/StaffSendCert")}
        />
      </div>

         {/* Main Content Section */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 rounded-lg">
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
