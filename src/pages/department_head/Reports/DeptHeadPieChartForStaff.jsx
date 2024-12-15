import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function CustomPieChartStaff() {
  // Sample data
  const data = [
    { name: "Cluster Leader", value: 40, color: "#4285F4" },
    { name: "Street Sweeper/Ground Sweeer", value: 30, color: "#34A853" },
    { name: "Housekeeper", value: 30, color: "#FBBC05" },
    { name: "Busser", value: 70, color: "#4285F4B3" },
    { name: "Gardener/Landscaper", value: 50, color: "#CDC1FF" },
    { name: "Grass/Busher Maintainer", value: 20  , color: "#  F72C5B" },
  ];

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
          Trending up by <span className="text-green-500 font-bold">5.2%</span> this month{" "}
          <span className="text-green-500">↗</span>
        </p>
        <p className="text-xs text-gray-500">
          Showing total numbers of staff for every job category for the last 6 months
        </p>
      </div>
    </div>
  );
}
