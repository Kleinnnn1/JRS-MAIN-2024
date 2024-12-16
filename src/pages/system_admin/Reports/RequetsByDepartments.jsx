import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import supabase from "../../../service/supabase"; // Adjust the path as needed

export default function RequestsByDepartment({ pageStyle }) {
  const [departmentChartData, setDepartmentChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch requests grouped by department and status
        const response = await supabase
          .from("Department_request_assignment")
          .select("deptId, requestId, Request(status)")
          .in("deptId", [1, 2, 3]); // BGMS, CSWS, MEWS departments

        if (response.error) throw response.error;

        // Initialize counts for each department and status
        const departments = { 1: "BGMS", 2: "CSWS", 3: "MEWS" };
        const statusCounts = {
          Pending: { 1: 0, 2: 0, 3: 0 },
          Ongoing: { 1: 0, 2: 0, 3: 0 },
          Completed: { 1: 0, 2: 0, 3: 0 },
        };

        // Count the number of requests by department and status
        response.data.forEach((item) => {
          const { deptId, Request } = item;
          if (Request && Request.status in statusCounts && deptId in departments) {
            statusCounts[Request.status][deptId] += 1;
          }
        });

        // Construct chart data
        const data = {
          labels: Object.values(departments),
          datasets: [
            {
              label: "Pending Requests",
              data: Object.values(statusCounts.Pending),
              backgroundColor: "rgba(255, 99, 132, 0.2)", // Red
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Ongoing Requests",
              data: Object.values(statusCounts.Ongoing),
              backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Completed Requests",
              data: Object.values(statusCounts.Completed),
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Green
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setDepartmentChartData(data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={pageStyle.chart}>
      <h2 className="text-xl font-semibold mb-4 text-center">Requests By Status and Department</h2>
      {departmentChartData && <Bar data={departmentChartData} />}
    </div>
  );
}
