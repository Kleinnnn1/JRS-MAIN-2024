import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DepartmentDetails({ departmentData }) {
  // Helper to generate data for donut charts
  const generateDonutChartData = (label, data, colors) => ({
    labels: departmentData.map((dept) => dept.name),
    datasets: [
      {
        label,
        data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  });

  // Define color palettes for charts
  const colorPalettes = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Green
    "#9966FF", // Purple
  ];

  // Data for each chart
  const employeesData = generateDonutChartData(
    "No of Employees",
    departmentData.map((dept) => dept.employees),
    colorPalettes
  );

  const jobCategoryData = generateDonutChartData(
    "Job Category",
    departmentData.map((dept) => dept.ongoing),
    colorPalettes
  );

  const totalRequestsData = generateDonutChartData(
    "Total No Of Requests",
    departmentData.map((dept) => dept.pending + dept.ongoing + dept.completed),
    colorPalettes
  );

  // Donut chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}`, // Only show the raw value in the tooltip
        },
      },
      datalabels: {
        color: "#000",
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value) => value, // Only display numbers
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6 mb-4 text-center">Department Details</h2>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="w-1/4 p-4">
          <h3 className="text-center text-lg font-medium">No of Employees</h3>
          <Doughnut data={employeesData} options={chartOptions} />
        </div>
        <div className="w-1/4 p-4">
          <h3 className="text-center text-lg font-medium">Job Category</h3>
          <Doughnut data={jobCategoryData} options={chartOptions} />
        </div>
        <div className="w-1/4 p-4">
          <h3 className="text-center text-lg font-medium">Total No Of Requests</h3>
          <Doughnut data={totalRequestsData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
