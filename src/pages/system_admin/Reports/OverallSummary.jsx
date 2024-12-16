import React, { useEffect, useState } from "react";
import { FaBuilding, FaUsers, FaTasks, FaHourglassHalf, FaCheckCircle, FaClipboardList } from "react-icons/fa";
import supabase from "../../../service/supabase";

export default function OverallSummary() {
  const [totalData, setTotalData] = useState({
    departments: 0,
    employees: 0,
    pending: 0,
    ongoing: 0,
    completed: 0,
    totalRequests: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSummaryData() {
      try {
        setLoading(true);

        // Fetch total number of departments
        const { count: departmentCount, error: deptError } = await supabase
          .from("Department")
          .select("*", { count: "exact" });

        if (deptError) throw deptError;

        // Fetch total number of users
        const { count: userCount, error: userError } = await supabase
          .from("User")
          .select("*", { count: "exact" });

        if (userError) throw userError;

        // Fetch total requests with status "Pending"
        const { count: pendingCount, error: pendingError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Pending");

        if (pendingError) throw pendingError;

        // Fetch total requests with status "Ongoing"
        const { count: ongoingCount, error: ongoingError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Ongoing");

        if (ongoingError) throw ongoingError;

        // Fetch total requests with status "Completed"
        const { count: completedCount, error: completedError } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", "Completed");

        if (completedError) throw completedError;

        // Fetch total number of requests
        const { count: totalRequestCount, error: totalRequestError } = await supabase
          .from("Request")
          .select("*", { count: "exact" });

        if (totalRequestError) throw totalRequestError;

        // Update the state with fetched data
        setTotalData({
          departments: departmentCount || 0,
          employees: userCount || 0,
          pending: pendingCount || 0,
          ongoing: ongoingCount || 0,
          completed: completedCount || 0,
          totalRequests: totalRequestCount || 0,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching summary data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }

    fetchSummaryData();
  }, []);

  const statusCards = [
    {
      title: "Total Departments",
      count: totalData.departments,
      icon: <FaBuilding className="text-blue-500 text-3xl" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Users",
      count: totalData.employees,
      icon: <FaUsers className="text-green-500 text-3xl" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Requests",
      count: totalData.pending,
      icon: <FaHourglassHalf className="text-yellow-500 text-3xl" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Ongoing Requests",
      count: totalData.ongoing,
      icon: <FaTasks className="text-purple-500 text-3xl" />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Completed Requests",
      count: totalData.completed,
      icon: <FaCheckCircle className="text-green-700 text-3xl" />,
      bgColor: "bg-green-200",
    },
    {
      title: "Total Requests",
      count: totalData.totalRequests,
      icon: <FaClipboardList className="text-indigo-500 text-3xl" />,
      bgColor: "bg-indigo-100",
    },
  ];

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Overall Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} shadow-md rounded-lg p-4 flex items-center`}
          >
            <div className="mr-4">{card.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
