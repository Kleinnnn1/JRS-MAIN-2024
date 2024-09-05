import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import RequestorNotificationAndCalendar from "./RequestorNotificationAndCalendar";
import iconFile from "../../../assets/images/iconDashboard.png"; 

export default function ContentDashboard() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="my-4 mx-3 py-2 px-4 bg-blue-950 flex items-center min-h-20 shadow-md shadow-black/5 rounded-xl">
        <img src={iconFile} alt="Folder Icon" className="h-6 w-6 mr-4" />
        <h1 className="text-2xl font-medium text-white">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
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
      <div className="p-6">
        <RequestorNotificationAndCalendar />
      </div>
    </>
  );
}
