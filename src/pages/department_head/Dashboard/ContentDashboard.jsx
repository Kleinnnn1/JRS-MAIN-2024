import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import StatusCard from "../../../components/StatusCard";
import AdminNotification from "./AdminNotificationAndCalendar";
import { FaClipboard, FaHourglassStart, FaCheckCircle, FaRegHandPointer } from "react-icons/fa";
import supabase from "../../../service/supabase"; // Adjust the import path if necessary
import ReusableCalendar from "../../../components/ReusableCalendar";

export default function ContentDashboard() {
  const navigate = useNavigate();
  const [jobCounts, setJobCounts] = useState({
    jobRequest: 0,
    ongoing: 0,
    completed: 0,
    referral: 0,
  });

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        // Fetch counts for each status
        const { data: jobRequestData, error: jobRequestError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Pending");

        const { data: ongoingData, error: ongoingError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Ongoing");

        const { data: completedData, error: completedError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Completed");

        const { data: referralData, error: referralError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Referral");

        // Handle errors
        if (jobRequestError || ongoingError || completedError || referralError) {
          console.error("Error fetching job counts:", {
            jobRequestError,
            ongoingError,
            completedError,
            referralError,
          });
          return;
        }

        // Update state with counts
        setJobCounts({
          jobRequest: jobRequestData.length,
          ongoing: ongoingData.length,
          completed: completedData.length,
          referral: referralData.length,
        });
      } catch (error) {
        console.error("Error fetching job counts:", error);
      }
    };

    fetchJobCounts();
  }, []);

  const statusCardColor = "bg-blue-50"; // Define a background color for consistency

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Dashboard" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {/* Job Request Card */}
        <StatusCard
          title="Job Request"
          count={jobCounts.jobRequest}
          icon={<FaClipboard className="text-md" />} // Icon for Job Requests
          bgColor={statusCardColor}
          iconColor="text-red-400"
          titleColor="text-red-500"
          onClick={() => navigate("/department_head/job_request")}
        />

        {/* Ongoing Card */}
        <StatusCard
          title="Ongoing"
          count={jobCounts.ongoing}
          icon={<FaHourglassStart className="text-md" />} // Icon for Ongoing Jobs
          bgColor={statusCardColor}
          iconColor="text-yellow-400"
          titleColor="text-yellow-500"
          onClick={() => navigate("/department_head/job_ongoing")}
        />

        {/* Completed Card */}
        <StatusCard
          title="Completed"
          count={jobCounts.completed}
          icon={<FaCheckCircle className="text-md" />} // Icon for Completed Jobs
          bgColor={statusCardColor}
          titleColor="text-green-500"
          iconColor="text-green-500"
          onClick={() => navigate("/department_head/job_completed")}
        />

        {/* Referral Card */}
        <StatusCard
          title="Referral"
          count={jobCounts.referral}
          icon={<FaRegHandPointer className="text-md" />} // Icon for Referral Jobs
          bgColor={statusCardColor}
          titleColor="text-purple-500"
          iconColor="text-purple-500"
          onClick={() => navigate("/department_head/referral")}
        />
      </div>

      <div className="p-6">
        <AdminNotification />
      </div>
         {/* Right Side (Calendar) */}
         <div className="lg:col-span-1 rounded-lg">
          <ReusableCalendar />
        </div>
    </>
  );
}



// import { useNavigate } from "react-router-dom";
// import SearchBar from "../../../components/SearchBar";
// import StatusCard from "../../../components/StatusCard";
// import AdminNotification from "./AdminNotificationAndCalendar";
// import { FaClipboard, FaHourglassStart, FaCheckCircle, FaRegHandPointer } from 'react-icons/fa'; 


// export default function ContentDashboard() {
//   const navigate = useNavigate();
  
//   const statusCardColor = "bg-blue-50"; // Define a background color for consistency
//   const iconColor = "text-black-500"; // Set a color for the icon to make it consistent

//   return (
//     <>
//       <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
//         <SearchBar title="Dashboard" />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//         {/* Job Request Card */}
//         <StatusCard
//           title="Job Request"
//           count={0}
//           icon={<FaClipboard className="text-md" />} // Set the icon size to 3xl
//           bgColor={statusCardColor}
//            iconColor="text-red-400" 
//           titleColor = "text-red-500"
          
//           onClick={() => navigate("/department_head/job_request")}
//         />
        
//         {/* Ongoing Card */}
//         <StatusCard
//           title="Ongoing"
//           count={0}
//           icon={<FaHourglassStart className="text-md" />} // Icon for Ongoing Jobs
//           bgColor={statusCardColor}
//           iconColor="text-yellow-400"
//           titleColor = "text-yellow-500"
//           onClick={() => navigate("/department_head/job_ongoing")}
//         />
        
//         {/* Completed Card */}
//         <StatusCard
//           title="Completed"
//           count={0}
//           icon={<FaCheckCircle className="text-md" />} // Icon for Completed Jobs
//           bgColor={statusCardColor}
//          titleColor = "text-green-500"
//           iconColor="text-green-500"
//           onClick={() => navigate("/department_head/job_completed")}
//         />
        
//         {/* Referral Card */}
//         <StatusCard
//           title="Referral"
//           count={0}
//           icon={<FaRegHandPointer className="text-md" />} // Icon for Referral Jobs
//           bgColor={statusCardColor}
//           titleColor = "text-purple-500"
//           iconColor="text-purple-500"
//           onClick={() => navigate("/department_head/referral")}
//         />
//       </div>
      
//       <div className="p-6">
//         <AdminNotification />
//       </div>
//     </>
//   );
// }
