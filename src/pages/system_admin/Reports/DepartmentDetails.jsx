import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import supabase from "../../../service/supabase"; // Adjust the path based on your project structure

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DepartmentDetails() {
  const [departmentData, setDepartmentData] = useState([]);
  const [jobCategoryCounts, setJobCategoryCounts] = useState([]);
  const [totalRequestCounts, setTotalRequestCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch employee counts for each department
        const employeesResponse = await supabase
          .from("User")
          .select("*", { count: "exact" })
          .in("deptId", [1, 2, 3]); // BGMS, CSWS, MEWS departments

        if (employeesResponse.error) throw employeesResponse.error;

        const employeesCounts = [1, 2, 3].map(
          (deptId) => employeesResponse.data.filter((user) => user.deptId === deptId).length
        );

        // Fetch job category counts for each department
        const jobCategoryResponse = await supabase
          .from("User")
          .select("jobCategory, deptId")
          .in("deptId", [1, 2, 3]);

        if (jobCategoryResponse.error) throw jobCategoryResponse.error;

        // Group and count unique job categories per department
        const uniqueJobCategoryCounts = [1, 2, 3].map((deptId) => {
          const uniqueJobCategories = new Set(
            jobCategoryResponse.data
              .filter((item) => item.deptId === deptId && item.jobCategory)
              .map((item) => item.jobCategory)
          );
          return uniqueJobCategories.size; // Count unique job categories
        });

        // Fetch total request counts for each department
        const totalRequestResponse = await supabase
          .from("Department_request_assignment")
          .select("*", { count: "exact" })
          .in("deptId", [1, 2, 3]); // BGMS, CSWS, MEWS departments

        if (totalRequestResponse.error) throw totalRequestResponse.error;

        const requestCounts = [1, 2, 3].map((deptId) => {
          return totalRequestResponse.data.filter((item) => item.deptId === deptId).length;
        });

        // Set department data
        setDepartmentData([
          { name: "BGMS", employees: employeesCounts[0] || 0 },
          { name: "CSWS", employees: employeesCounts[1] || 0 },
          { name: "MEWS", employees: employeesCounts[2] || 0 },
        ]);

        // Set job category data
        setJobCategoryCounts(uniqueJobCategoryCounts);

        // Set total request counts
        setTotalRequestCounts(requestCounts);

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

  // Generate chart data
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

  // Define color palettes
  const colorPalettes = ["#FF6384", "#36A2EB", "#FFCE56"];

  const employeesData = generateDonutChartData(
    "No of Employees",
    departmentData.map((dept) => dept.employees),
    colorPalettes
  );

  const jobCategoryData = generateDonutChartData(
    "Job Category",
    jobCategoryCounts,
    colorPalettes
  );

  const totalRequestData = generateDonutChartData(
    "Total Requests",
    totalRequestCounts,
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
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
      datalabels: {
        color: "#000",
        font: {
          size: 10,
          weight: "bold",
        },
        formatter: (value) => value,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mt-12 mb-4 text-center">Department Details</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="w-1/4 p-4">
          <h3 className="text-center text-lg font-medium">No of Employees</h3>
          <Doughnut data={employeesData} options={chartOptions} />
        </div>
        <div className="w-1/4 p-4">
          <h3 className="text-center text-lg font-medium">Job Category</h3>
          <Doughnut data={jobCategoryData} options={chartOptions} />
        </div>
        <div className="w-1/4 p-4">
          <h3 className="text-center text-lg font-medium">Total Requests</h3>
          <Doughnut data={totalRequestData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
