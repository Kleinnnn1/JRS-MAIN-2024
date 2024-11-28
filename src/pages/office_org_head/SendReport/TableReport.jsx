import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";


export default function TableReport() {
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  


  // Mock data
  const [stats, setStats] = useState({
    totalStaff: 20,
    totalRequests: 75,
    completedRequests: 50,
    pendingRequests: 25,
    staffActivity: [
      { name: "John Doe", completed: 15, pending: 3 },
      { name: "Jane Smith", completed: 10, pending: 5 },
      { name: "Mark Lee", completed: 5, pending: 2 },
    ],
  });

  useEffect(() => {
    // Fetch data from API here and setStats with real data
  }, []);

  // Graph data for requests
  const barData = {
    labels: ["Completed Requests", "Pending Requests"],
    datasets: [
      {
        label: "Requests",
        data: [stats.completedRequests, stats.pendingRequests],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  // Pie chart data for staff activity
  const pieData = {
    labels: stats.staffActivity.map((staff) => staff.name),
    datasets: [
      {
        label: "Completed Requests",
        data: stats.staffActivity.map((staff) => staff.completed),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const calculateCompletionRate = () => {
    const { completedRequests, totalRequests } = stats;
    return ((completedRequests / totalRequests) * 100).toFixed(2);
  };

  const generateReportDescription = () => {
    const { totalStaff, totalRequests, completedRequests, pendingRequests } =
      stats;

    return `As of today, there are ${totalStaff} staff members. A total of ${totalRequests} job requests have been logged, with ${completedRequests} completed (${calculateCompletionRate()}% completion rate) and ${pendingRequests} still pending. Staff activity shows diverse contributions, with significant progress in job handling.`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Staff</h2>
          <p className="text-2xl font-bold">{stats.totalStaff}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Total Requests</h2>
          <p className="text-2xl font-bold">{stats.totalRequests}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Completed Requests</h2>
          <p className="text-2xl font-bold">{stats.completedRequests}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-600">Pending Requests</h2>
          <p className="text-2xl font-bold">{stats.pendingRequests}</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-gray-700 text-lg font-bold mb-4">
            Job Request Overview
          </h2>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-gray-700 text-lg font-bold mb-4">
            Staff Contribution (Completed Requests)
          </h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Report Description */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-gray-700 text-lg font-bold mb-4">Report Summary</h2>
        <p className="text-gray-600">{generateReportDescription()}</p>
      </div>
    </div>
  );
};



