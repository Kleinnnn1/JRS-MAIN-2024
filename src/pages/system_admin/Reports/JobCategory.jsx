import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function JobCategory() {
  // Custom data for job categories
  const departmentData = [
    { name: "BGMS", ongoing: 10, completed: 15, pending: 5 },
    { name: "CSWS", ongoing: 8, completed: 12, pending: 4 },
    { name: "MEWS", ongoing: 6, completed: 10, pending: 2 },
    { name: "FMS", ongoing: 4, completed: 8, pending: 3 },
    { name: "HRMS", ongoing: 12, completed: 20, pending: 6 },
    { name: "BGMS", ongoing: 10, completed: 15, pending: 5 },
    { name: "CSWS", ongoing: 8, completed: 12, pending: 4 },
    { name: "MEWS", ongoing: 6, completed: 10, pending: 2 },
    { name: "FMS", ongoing: 4, completed: 8, pending: 3 },
    { name: "HRMS", ongoing: 12, completed: 20, pending: 6 },
    { name: "BGMS", ongoing: 10, completed: 15, pending: 5 },
    { name: "CSWS", ongoing: 8, completed: 12, pending: 4 },
    { name: "MEWS", ongoing: 6, completed: 10, pending: 2 },
    { name: "FMS", ongoing: 4, completed: 8, pending: 3 },
    { name: "HRMS", ongoing: 12, completed: 20, pending: 6 },
  ];

  // Prepare bar chart data
  const barChartData = {
    labels: departmentData.map((dept) => dept.name),
    datasets: [
      {
        label: "Ongoing Job Categories",
        data: departmentData.map((dept) => dept.ongoing),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    indexAxis: "y", // Makes it horizontal
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Ongoing Jobs",
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Departments",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mt-8 mb-4 text-center">Job Categories with most requests</h2>
      <Bar data={barChartData} options={barChartOptions} />
    </div>
  );
}
