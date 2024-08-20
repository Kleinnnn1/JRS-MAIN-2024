import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import RequestorNotificationAndCalendar from "./RequestorNotificationAndCalendar";

export default function ContentDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <SearchBar title="Dashboard" />
      <div className="flex p-6 gap-6">
        <StatusCard
          title="Pending"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/")}
        />
        <StatusCard
          title="Approved"
          count={0}
          bgColor="bg-sky-200"
          onClick={() => navigate("/")}
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor="bg-green-400"
          onClick={() => navigate("/")}
        />
        <StatusCard
          title="Referral"
          count={1}
          bgColor="bg-purple-400"
          onClick={() => navigate("/")}
        />
      </div>
      <RequestorNotificationAndCalendar />
    </>
  );
}
