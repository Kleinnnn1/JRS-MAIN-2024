import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StaffStatCard";
import NotificationAndCalendar from "../../../components/StaffCalendar";


export default function StaffContentDash() {
  const navigate = useNavigate();
  return (
    <>
      <SearchBar title="Dashboard" />
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
      <NotificationAndCalendar />
    </>
  );
}
