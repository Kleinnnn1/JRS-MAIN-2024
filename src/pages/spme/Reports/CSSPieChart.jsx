import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import supabase from "../../../service/supabase";



export default function CustomPieChart() {
  const [data, setData] = useState([
    { name: "BGMS", value: 0, color: "#4285F4" },
    { name: "CSWS", value: 0, color: "#34A853" },
    { name: "MEWS", value: 0, color: "#FBBC05" },
  ]);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      const { data: responses, error } = await supabase
        .from("Client_satisfaction_survey")
        .select("transactedOffice");

      if (error) {
        console.error("Error fetching data:", error.message);
        return;
      }

      // Count occurrences of BGMS, CSWS, MEWS
      const counts = responses.reduce(
        (acc, item) => {
          if (item.transactedOffice === "BGMS") acc.BGMS += 1;
          if (item.transactedOffice === "CSWS") acc.CSWS += 1;
          if (item.transactedOffice === "MEWS") acc.MEWS += 1;
          return acc;
        },
        { BGMS: 0, CSWS: 0, MEWS: 0 }
      );

      // Update chart data
      setData([
        { name: "BGMS", value: counts.BGMS, color: "#4285F4" },
        { name: "CSWS", value: counts.CSWS, color: "#34A853" },
        { name: "MEWS", value: counts.MEWS, color: "#FBBC05" },
      ]);
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      {/* Chart Title */}
      <h2 className="text-lg font-medium text-gray-800">Responses</h2>
      <p className="text-sm text-gray-500">January - December 2024</p>

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
          Most of the responses are coming from{" "}
          <span className="text-green-500 font-bold">
            {data.reduce((prev, current) => (prev.value > current.value ? prev : current)).name}
          </span>
          <span className="text-green-500">↗</span>
        </p>
        <p className="text-xs text-gray-500">
          Showing total number of responses from BGMS, CSWS, MEWS.
        </p>
      </div>
    </div>
  );
}