import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";

export default function JobRequestHistory() {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Search Bar for Job Request History */}
      <SearchBar title="Job Request History" />

      {/* Status Cards Section */}
      <div className="flex p-6 gap-6">
        <StatusCard
          title="Pending Requests"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/requestor/pending_requests")}
        />
        <StatusCard
          title="Ongoing Requests"
          count={0}
          bgColor="bg-sky-200"
          onClick={() => navigate("/requestor/ongoing_requests")}
        />
        <StatusCard
          title="Completed Requests"
          count={0}
          bgColor="bg-green-400"
          onClick={() => navigate("/requestor/completed_requests")}
        />
        <StatusCard
          title="Cancelled Requests"
          count={0}
          bgColor="bg-red-400"
          onClick={() => navigate("/requestor/cancelled_requests")}
        />
      </div>

      {/* Notifications and Calendar Section */}
      <div className="p-2">
        <div className="grid lg:grid-cols-3 h-[50vh]">
          {/* Notifications */}
          <div className="col-span-2">
            <ReusableNotification />
          </div>

          {/* Calendar */}
          <ReusableCalendar />
        </div>
      </div>
    </>
  );
}
