import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import supabase from "../../../service/supabase"; // Adjust the path to your Supabase client

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function JobCategory() {
  const [barChartData, setBarChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all unique job categories
        const { data: allJobCategoriesData, error: jobCategoriesError } = await supabase
          .from("Request")
          .select("jobCategory", { distinct: true });

        if (jobCategoriesError) throw jobCategoriesError;

        const allJobCategories = allJobCategoriesData.map((item) => item.jobCategory || "Unknown");

        // Fetch request data grouped by jobCategory and status
        const { data: requestData, error: requestsError } = await supabase
          .from("Request")
          .select("jobCategory, status");

        if (requestsError) throw requestsError;

        // Initialize job category counts with zero for all categories
        const jobCategoryCounts = allJobCategories.reduce((acc, category) => {
          acc[category] = { pending: 0, ongoing: 0, completed: 0 };
          return acc;
        }, {});

        // Populate counts based on request data
        requestData.forEach((request) => {
          const category = request.jobCategory || "Unknown";
          const status = request.status || "Unknown";

          if (status === "Pending") jobCategoryCounts[category].pending++;
          else if (status === "Ongoing") jobCategoryCounts[category].ongoing++;
          else if (status === "Completed") jobCategoryCounts[category].completed++;
        });

        // Convert jobCategoryCounts to an array and calculate totals
        const sortedJobCategoryData = Object.entries(jobCategoryCounts)
          .map(([category, counts]) => ({
            category,
            total: counts.pending + counts.ongoing + counts.completed,
            ...counts,
          }))
          .sort((a, b) => b.total - a.total); // Sort by total in descending order

        // Prepare sorted data for the bar chart
        const labels = sortedJobCategoryData.map((item) => item.category);
        const pendingData = sortedJobCategoryData.map((item) => item.pending);
        const ongoingData = sortedJobCategoryData.map((item) => item.ongoing);
        const completedData = sortedJobCategoryData.map((item) => item.completed);

        const chartData = {
          labels,
          datasets: [
            {
              label: "Pending Requests",
              data: pendingData,
              backgroundColor: "rgba(255, 206, 86, 0.6)", // Yellow
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Ongoing Requests",
              data: ongoingData,
              backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Completed Requests",
              data: completedData,
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Green
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setBarChartData(chartData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
          text: "Number of Job Requests",
        },
      },
      y: {
        title: {
          display: true,
          text: "Job Category",
        },
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      {barChartData && <Bar data={barChartData} options={barChartOptions} />}
    </div>
  );
}
