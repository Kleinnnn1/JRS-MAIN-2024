import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import supabase from "../../../service/supabase"; // Update this import path based on your project structure
import { getCurrentUser } from "../../../service/apiAuth"; // Update this import path based on your project structure

export default function CustomPieChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobCategoryData() {
      try {
        setLoading(true);

        // Get the current user's department ID
        const user = await getCurrentUser();
        if (!user || !user.deptId) throw new Error("Unable to fetch current user's department ID");

        const deptId = user.deptId;

        // Query to fetch jobCategory data from Supabase
        const { data: users, error } = await supabase
          .from("User")
          .select("jobCategory")
          .eq("deptId", deptId);

        if (error) throw error;

        // Count occurrences of each jobCategory
        const jobCategoryCounts = users.reduce((acc, user) => {
          if (user.jobCategory) {
            acc[user.jobCategory] = (acc[user.jobCategory] || 0) + 1;
          }
          return acc;
        }, {});

        // Format data for the PieChart
        const formattedData = Object.entries(jobCategoryCounts).map(([jobCategory, count], index) => ({
          name: jobCategory,
          value: count,
          color: getColorForJobCategory(jobCategory, index), // Assign a dynamic color
        }));

        setData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching job category data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobCategoryData();
  }, []);

  // Assign a color dynamically for each job category
  const getColorForJobCategory = (jobCategory, index) => {
    const defaultColors = [
      "#4285F4", "#34A853", "#FBBC05", "#4285F4B3", "#CDC1FF", "#F72C5B", "#888888",
    ];
    return defaultColors[index % defaultColors.length]; // Cycle through default colors
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
      <h2 className="text-lg font-medium text-gray-800">Job Category</h2>
      <p className="text-sm text-gray-500">January - June 2024</p>

      {/* Pie Chart */}
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={({ name }) => name}
          outerRadius={110}
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
          TOTAL NO. OF JOB CATEGORIES IS{" "}
          <span className="text-green-500 font-bold">{data.length}</span>{" "}
          <span className="text-green-500">↗</span>
        </p>
        <p className="text-xs text-gray-500">
          Showing total number of users per job category for the current department
        </p>
      </div>
    </div>
  );
}
