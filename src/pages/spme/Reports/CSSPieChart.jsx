import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function CustomPieChart() {
  // Sample data
  const data = [
    { name: "Aircon Fix", value: 40, color: "#4285F4" },
    { name: "Safari", value: 30, color: "#34A853" },
    { name: "Firefox", value: 20, color: "#FBBC05" },
    { name: "Edge", value: 7, color: "#4285F4B3" },
    { name: "Other", value: 3, color: "#AAAAAA" },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      {/* Chart Title */}
      <h2 className="text-lg font-medium text-gray-800">Service Availed</h2>
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
          Showing total visitors for the last 6 months
        </p>
      </div>
    </div>
  );
}
