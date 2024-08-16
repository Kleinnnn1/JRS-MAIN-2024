import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import NotificationAndCalendar from "../../../components/NotificationAndCalendar";

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
      <NotificationAndCalendar />
    </>
  );
}
