import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";

export default function CustomPieChartStaff() {
  const [data, setData] = useState([]);
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

        console.log("Current user's deptId:", deptId);

        // Step 2: Fetch users in the same department
        const { data: users, error: fetchError } = await supabase
          .from("User")
          .select("jobCategory")
          .eq("deptId", deptId);

        if (fetchError) throw fetchError;

        console.log("Fetched users:", users);

        // Step 3: Group and count users by jobCategory
        const jobCategoryCounts = users.reduce((acc, user) => {
          if (user.jobCategory) {
            acc[user.jobCategory] = (acc[user.jobCategory] || 0) + 1;
          }
          return acc;
        }, {});

        console.log("Job category counts:", jobCategoryCounts);

        // Step 4: Format data for the PieChart
        const formattedData = Object.entries(jobCategoryCounts).map(([jobCategory, count], index) => ({
          name: jobCategory,
          value: count,
          color: getColorForJobCategory(jobCategory, index),
        }));

        setData(formattedData);
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

  // Function to assign a color dynamically for each jobCategory
  const getColorForJobCategory = (jobCategory, index) => {
    const colors = [
      "#4285F4", "#34A853", "#FBBC05", "#4285F4B3", "#CDC1FF", "#F72C5B", "#888888",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      {/* Chart Title */}
      <h2 className="text-lg font-medium text-gray-800">No. of Staff per Job Category</h2>
      <p className="text-sm text-gray-500">January - June 2024</p>

      {/* Pie Chart */}
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={({ name }) => name}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Footer Section */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-800 font-medium">
          Showing total number of staff per job category in the department
        </p>
        <p className="text-xs text-gray-500">Updated dynamically from the database</p>
      </div>
    </div>
  );
}
