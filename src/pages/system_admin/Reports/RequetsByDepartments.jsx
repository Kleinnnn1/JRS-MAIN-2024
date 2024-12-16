import React from "react";
import { Bar } from "react-chartjs-2";

export default function RequestsByDepartment({ departmentChartData, pageStyle }) {
  return (
    <div className={pageStyle.chart}>
      <h2 className="text-xl font-semibold mb-4 text-center">Requests by Department</h2>
      <Bar data={departmentChartData} />
    </div>
  );
}
