import React, { useEffect, useState, useCallback } from "react";
import { FaBuilding, FaUsers, FaTasks, FaHourglassHalf, FaCheckCircle, FaClipboardList } from "react-icons/fa";
import StatsCard from "../components/StatsCard";
import StatusCard from "../components/StatusCard";
import SearchBar from "../../../components/SearchBar";
import supabase from "../../../service/supabase";
import Logo from "../../../assets/images/Loading_2.gif"; // Loading animation

export default function SysadminDashboard() {
  const [totalData, setTotalData] = useState({
    departments: 0,
    employees: 0,
    pending: 0,
    ongoing: 0,
    completed: 0,
    totalRequests: 0,
  });

  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [error, setError] = useState(null);

  // Fetch summary data function
  const fetchSummaryData = useCallback(async () => {
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

      // Fetch total requests by status
      const statuses = ["Pending", "Ongoing", "Completed"];
      const requestCounts = {};

      for (const status of statuses) {
        const { count, error } = await supabase
          .from("Request")
          .select("*", { count: "exact" })
          .eq("status", status);
        if (error) throw error;
        requestCounts[status.toLowerCase()] = count || 0;
      }

      // Fetch total number of requests
      const { count: totalRequestCount, error: totalRequestError } = await supabase
        .from("Request")
        .select("*", { count: "exact" });
      if (totalRequestError) throw totalRequestError;

      // Update the state with fetched data
      setTotalData({
        departments: departmentCount || 0,
        employees: userCount || 0,
        pending: requestCounts.pending || 0,
        ongoing: requestCounts.ongoing || 0,
        completed: requestCounts.completed || 0,
        totalRequests: totalRequestCount || 0,
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching summary data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      fetchSummaryData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchSummaryData]);

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

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {showLogo ? (
        // **Show Logo for 3 seconds before fetching data**
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
          <p className="mt-4 text-gray-500">Loading, please wait...</p>
        </div>
      ) : (
        <>
          <SearchBar title="Dashboard" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
        </>
      )}
    </div>
  );
}
