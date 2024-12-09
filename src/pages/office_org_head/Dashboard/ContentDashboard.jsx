import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import { FaClipboard, FaHourglassStart, FaCheckCircle, FaRegHandPointer } from 'react-icons/fa';
import OfficeHeadStatusCardAndCalendar from "./OfficeHeadNotificationAndCalendar";
import ReusableCalendar from "../../../components/ReusableCalendar";

export default function OfficeHeadContentDashboard() {
  const navigate = useNavigate();

  const statusCardColor = "bg-blue-50"; // Define a background color for consistency
  const iconColor = "text-black-500"; // Set a color for the icon to make it consistent

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatusCard
          title="Job Request"
          count={0}
          icon={<FaClipboard className="text-md" />}
          bgColor={statusCardColor}
          iconColor="text-red-400"
          titleColor="text-red-500"
          onClick={() => navigate("/department_head/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={0}
          icon={<FaHourglassStart className="text-md" />}
          bgColor={statusCardColor}
          iconColor="text-yellow-400"
          titleColor="text-yellow-500"
          onClick={() => navigate("/department_head/job_ongoing")}
        />
        <StatusCard
          title="Completed"
          count={0}
          icon={<FaCheckCircle className="text-md" />}
          bgColor={statusCardColor}
          titleColor="text-green-500"
          iconColor="text-green-500"
          onClick={() => navigate("/department_head/job_completed")}
        />
      </div>

      {/* Notification and Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left: Notification */}
        <div className="">
          <OfficeHeadStatusCardAndCalendar />
        </div>

        {/* Right: Calendar */}
        <div className="">
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}
