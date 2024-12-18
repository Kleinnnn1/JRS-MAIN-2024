import React, { useEffect, useState } from "react";
import BarChart from "./CSSBarChart";
import supabase from "../../../service/supabase"; // Ensure Supabase client is imported

const BarPage = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Months
    datasets: [
      {
        label: "Surveys Count",
        data: [],
        backgroundColor: "rgba(135, 206, 235, 0.6)", // Sky blue color
        borderColor: "rgba(135, 206, 235, 1)", // Solid sky blue border
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch surveys grouped by month from Supabase
        const { data, error } = await supabase
          .from("Client_satisfaction_survey")
          .select("date");

        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }

        // Process data to count surveys per month
        const monthCounts = Array(12).fill(0); // Initialize counts for all 12 months

        data.forEach((row) => {
          const date = new Date(row.date);
          const month = date.getMonth(); // Get month (0 - 11)
          monthCounts[month] += 1; // Increment count for the month
        });

        // Update chart data
        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Surveys Count",
              data: monthCounts,
              backgroundColor: "rgba(135, 206, 235, 0.6)",
              borderColor: "rgba(135, 206, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error processing chart data:", err.message);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }, // Ensure step size is 1 for count-based charts
      },
    },
  };

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Monthly Overview</h1>
        <BarChart data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarPage;
