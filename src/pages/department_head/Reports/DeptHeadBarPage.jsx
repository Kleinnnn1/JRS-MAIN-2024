import React, { useState, useEffect } from "react";
import BarChart from "./DeptHeadBarChart";
import supabase from "../../../service/supabase";
import { getCurrentUser } from "../../../service/apiAuth";

const BarPage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Requests",
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
    async function fetchMonthlyRequests() {
      try {
        setLoading(true);

        const user = await getCurrentUser();
        if (!user || !user.deptId) throw new Error("Unable to fetch current user's department ID");

        const deptId = user.deptId;

        const { data, error } = await supabase
          .from("Department_request_assignment")
          .select(`
            requestId,
            Request (
              created_at
            )
          `)
          .eq("deptId", deptId);

        if (error) throw error;

        const uniqueRequests = new Set();
        const filteredData = data.filter((item) => {
          if (!uniqueRequests.has(item.requestId)) {
            uniqueRequests.add(item.requestId);
            return true;
          }
          return false;
        });

        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const monthCounts = new Array(12).fill(0);

        filteredData.forEach((item) => {
          if (item.Request && item.Request.created_at) {
            const month = new Date(item.Request.created_at).getMonth();
            monthCounts[month] += 1;
          }
        });

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Requests",
              data: monthCounts,
              backgroundColor: "rgba(135, 206, 235, 0.6)",
              borderColor: "rgba(135, 206, 235, 1)",
              borderWidth: 1,
            },
          ],
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching monthly requests:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMonthlyRequests();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Requests: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
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
      <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Monthly Completed Requests</h1>
        <BarChart data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarPage;
