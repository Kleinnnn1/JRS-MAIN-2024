import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";

export default function ContentDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <SearchBar title="Dashboard" />
      <div className="flex p-6 gap-6">
        <StatusCard
          title="Job Request"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/department_head/job_request")}
        />
        <StatusCard
          title="Ongoing"
          count={0}
          bgColor="bg-sky-200"
          onClick={() => navigate("/department_head/job_ongoing")}
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor="bg-green-400"
          onClick={() => navigate("/department_head/job_completed")}
        />
        <StatusCard
          title="Referral"
          count={0}
          bgColor="bg-purple-400"
          onClick={() => navigate("/department_head/referral")}
        />
      </div>
      <div className="p-2">
        <div className="grid lg:grid-cols-3 h-[50vh]">
          <div className="col-span-2">
            <ReusableNotification />
            </div>
            <ReusableCalendar />
            </div>
          </div>
    </>
  );
}
