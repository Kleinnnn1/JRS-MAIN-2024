import React, { useState, useEffect } from "react";
import StatusCard from "../../../components/StatusCard";
import SearchBar from "../../../components/SearchBar";
import { FaChartLine } from "react-icons/fa";
import BarPage from "./DeptHeadBarPage";
import CustomPieChart from "./DeptHeadPieChart";
import BarPageStaff from "./DeptHeadBarPageForStaff";
import CustomPieChartStaff from "./DeptHeadPieChartForStaff";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";

export default function TableReport() {
  const [todayCount, setTodayCount] = useState(0);
  const [completedRequestCount, setCompletedRequestCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setLoading(true);

        // Step 1: Get the current user's department ID
        const user = await getCurrentUser();
        if (!user || !user.deptId) throw new Error("Unable to fetch current user's department ID");
        const deptId = user.deptId;

        // Step 2: Fetch today's requests for the current department
        const { data: todayRequests, error: todayError } = await supabase
          .from("Department_request_assignment")
          .select(`
            requestId,
            Request (created_at)
          `)
          .eq("deptId", deptId);

        if (todayError) throw todayError;

        // Count requests created today
        const todayDate = new Date().toISOString().split("T")[0];
        const filteredTodayRequests = todayRequests.filter((item) => {
          const createdAt = item.Request?.created_at?.split("T")[0];
          return createdAt === todayDate;
        });

        setTodayCount(filteredTodayRequests.length);

        // Step 3: Fetch completed requests for the current department
        const { data: completedRequests, error: completedError } = await supabase
          .from("Department_request_assignment")
          .select(`
            requestId,
            Request (status)
          `)
          .eq("deptId", deptId);

        if (completedError) throw completedError;

        // Count requests with status "Completed"
        const filteredCompletedRequests = completedRequests.filter(
          (item) => item.Request?.status === "Completed"
        );

        setCompletedRequestCount(filteredCompletedRequests.length);

        // Step 4: Fetch total number of staff for the current department
        const { data: staff, error: staffError } = await supabase
          .from("User")
          .select("*")
          .eq("deptId", deptId)
          .eq("userRole", "staff");

        if (staffError) throw staffError;
        setStaffCount(staff.length);

        setError(null);
      } catch (err) {
        console.error("Error fetching counts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  const statusCardColor = "bg-white"; // Uniform card color for all status cards

  // Icons for consistency
  const icons = {
    today: <FaChartLine />,
    completed: <FaChartLine />,
    staff: <FaChartLine />,
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
        <SearchBar title="Reports " />
      </div>
      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatusCard
          title="Today"
          count={todayCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.today}
          subText="Received Requests"
        />
        <StatusCard
          title="Completed"
          count={completedRequestCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.completed}
          subText="All Requests Completed"
        />
        <StatusCard
          title="Staff"
          count={staffCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.staff}
          subText="Total No. of Staff"
        />
      </div>

      <h2 className="bg-custom-blue w-full rounded-lg p-2 text-2xl text-white font-semibold text-center">
        JOB REQUEST REPORTS
      </h2>

      {/* 2 GRID GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          {/* BAR GRAPH */}
          <BarPage />
        </div>
        {/* PIE CHART */}
        <CustomPieChart />
      </div>

      {/* STAFF REPORTS */}
      <div className="flex justify-center items-center mt-6">
        <h2 className="bg-custom-blue w-full rounded-lg p-2 text-2xl text-white font-semibold text-center">
          STAFF REPORTS
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          {/* BAR GRAPH */}
          <BarPageStaff />
        </div>
        {/* PIE CHART */}
        <CustomPieChartStaff />
      </div>
    </div>
  );
}
