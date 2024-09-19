import { useNavigate } from "react-router-dom";

import StatusCard from "../../../components/StatusCard";
import ReusableNotification from "../../../components/ReusableNotification";
import ReusableCalendar from "../../../components/ReusableCalendar";
import iconFile from "../../../assets/images/iconDashboard.png"; 

export default function ContentDashboard() {
  const navigate = useNavigate();

  // Navigation for the buttons
  const handleSurveyClick = () => {
    navigate("/requestor/section_one"); // Update this path to the actual survey route
  };

  const handleMakeRequestClick = () => {
    navigate("/requestor/job_request_form"); // Update this path to the job request form route
  };

  return (
    <>
      {/* Dashboard Header */}
      <div className="my-4 mx-3 py-4 px-6 bg-blue-950 flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        {/* Title and Icon on the Left */}
        <div className="flex items-center mb-4 lg:mb-0">
          <img src={iconFile} alt="Folder Icon" className="h-8 w-8 mr-4" />
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>

        {/* Centered Buttons */}
        <div className="flex justify-center space-x-4">
          {/* USTP Harmonized Client Satisfaction Survey Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200"
            onClick={handleSurveyClick}
          >
            USTP Harmonized Client Satisfaction Survey
          </button>

          {/* Make Request Button */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200"
            onClick={handleMakeRequestClick}
          >
            Make Request
          </button>
        </div>
      </div>
      
      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StatusCard
          title="Pending"
          count={0}
          bgColor="bg-yellow-400"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Approved"
          count={0}
          bgColor="bg-sky-200"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Completed"
          count={0}
          bgColor="bg-green-400"
          onClick={() => navigate("/requestor/job_request")}
        />
        <StatusCard
          title="Referral"
          count={1}
          bgColor="bg-purple-400"
          onClick={() => navigate("/requestor/job_request")}
        />
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
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
