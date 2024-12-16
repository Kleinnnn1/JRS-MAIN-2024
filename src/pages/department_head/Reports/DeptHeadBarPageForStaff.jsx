import React, { useState, useEffect } from "react";
import BarChart from "./DeptHeadBarChart";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";

const BarPageStaff = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Completed Job Requests",
        data: [],
        backgroundColor: "rgba(135, 206, 235, 0.6)", // Sky blue color with transparency
        borderColor: "rgba(135, 206, 235, 1)", // Solid sky blue border
        borderWidth: 1,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);

        // Step 1: Get the current user's department ID
        const user = await getCurrentUser();
        if (!user || !user.deptId) throw new Error("Unable to fetch current user's department ID");
        const deptId = user.deptId;

        // Step 2: Fetch staff members in the same department
        const { data: staffMembers, error: staffError } = await supabase
          .from("User")
          .select("fullName")
          .eq("userRole", "staff")
          .eq("deptId", deptId);

        if (staffError) throw staffError;

        // Step 3: Create an object to hold the counts
        const staffCounts = {};

        for (const staff of staffMembers) {
          // Fetch assigned requests for the staff member
          const { data: assignedRequests, error: assignmentError } = await supabase
            .from("Department_request_assignment")
            .select("requestId")
            .eq("staffName", staff.fullName);

          if (assignmentError) throw assignmentError;

          // Get requestIds from assigned requests
          const assignedRequestIds = assignedRequests.map((assignment) => assignment.requestId);

          // Count the completed requests for this staff member
          const { count: completedCount, error: completedError } = await supabase
            .from("Request")
            .select("requestId", { count: "exact" })
            .in("requestId", assignedRequestIds)
            .eq("status", "Completed");

          if (completedError) throw completedError;

          // Add the count to staffCounts
          staffCounts[staff.fullName] = completedCount || 0;
        }

        // Step 4: Sort staffCounts by the number of completed requests in descending order
        const sortedStaffCounts = Object.entries(staffCounts).sort((a, b) => b[1] - a[1]);

        // Step 5: Prepare data for the bar chart
        const labels = sortedStaffCounts.map(([name]) => name); // Sorted staff names
        const data = sortedStaffCounts.map(([, count]) => count); // Sorted counts

        setChartData({
          labels,
          datasets: [
            {
              label: "Completed Job Requests",
              data,
              backgroundColor: "#FBBC05", // Red color with transparency
              borderColor: "#FBBC05", // Solid red border
              borderWidth: 2,
            
            },
          ],
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, []);

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize within the container
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} Completed Jobs`, // Tooltip label
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Hide vertical grid lines (x-axis)
        },
      },
      y: {
        ticks: {
          autoSkip: false, // Ensure all labels are displayed
        },
        grid: {
          display: true, // Keep horizontal grid lines (y-axis)
          color: "rgba(200, 200, 200, 0.5)", // Optional: adjust grid line color
        },
      },
    },
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {/* Card Container with White Background and Layered Effect */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold mb-4">No. of Job Requests Completed by Staff</h1>

        {/* Vertically Scrollable Chart Wrapper */}
        <div className="overflow-y-auto">
          <div className="w-full h-[600px]"> {/* Adjust height for vertical layout */}
            <BarChart data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarPageStaff;
