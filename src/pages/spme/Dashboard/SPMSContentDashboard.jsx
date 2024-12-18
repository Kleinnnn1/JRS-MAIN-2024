import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import SearchBar from "../../../components/SearchBar";
import DonutChart from "../../../components/DonutChart";
import BarPage from "../Reports/CSSBarPage";
import PieChart from "../Reports/CSSPieChart";
import SPMETable from "../Dashboard/SPMSContentTable";
import supabase from "../../../service/supabase"; // Import Supabase client
import { FaChartLine } from "react-icons/fa";

export default function CSSContentDashboard() {
  const navigate = useNavigate();

  // State for counts
  const [todayCount, setTodayCount] = useState(0);
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [thisYearCount, setThisYearCount] = useState(0);

  const statusCardColor = "bg-white"; // Uniform card color
  const icons = {
    today: <FaChartLine />,
    week: <FaChartLine />,
    month: <FaChartLine />,
    year: <FaChartLine />,
  };

  // Helper function to get formatted date ranges
  const getDateRanges = () => {
    const today = new Date();
    const formatDate = (date) => date.toLocaleDateString("en-US"); // Format as MM/DD/YYYY

    const startOfToday = formatDate(new Date(today.setHours(0, 0, 0, 0))); // Midnight today
    const startOfWeek = formatDate(new Date(today.setDate(today.getDate() - today.getDay()))); // Start of this week
    const startOfMonth = formatDate(new Date(today.getFullYear(), today.getMonth(), 1)); // Start of this month
    const startOfYear = formatDate(new Date(today.getFullYear(), 0, 1)); // Start of this year

    return { startOfToday, startOfWeek, startOfMonth, startOfYear };
  };

  // Fetch counts from the database
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { startOfToday, startOfWeek, startOfMonth, startOfYear } = getDateRanges();

        console.log("Date Ranges:", { startOfToday, startOfWeek, startOfMonth, startOfYear });

        // Fetch count for Today
        const { count: todayCountResult, error: todayError } = await supabase
          .from("Client_satisfaction_survey")
          .select("*", { count: "exact" })
          .ilike("date", `${startOfToday}%`);  // Match date part (MM/DD/YYYY)

        // Fetch count for This Week
        const { count: weekCountResult, error: weekError } = await supabase
          .from("Client_satisfaction_survey")
          .select("*", { count: "exact" })
          .gte("date", `${startOfWeek}`); // Start of the week, no time comparison

        // Fetch count for This Month
        const { count: monthCountResult, error: monthError } = await supabase
          .from("Client_satisfaction_survey")
          .select("*", { count: "exact" })
          .gte("date", `${startOfMonth}`); // Start of the month, no time comparison

        // Fetch count for This Year
        const { count: yearCountResult, error: yearError } = await supabase
          .from("Client_satisfaction_survey")
          .select("*", { count: "exact" })
          .gte("date", `${startOfYear}`); // Start of the year, no time comparison

        // Handle errors
        if (todayError || weekError || monthError || yearError) {
          console.error("Error fetching counts:", todayError || weekError || monthError || yearError);
          return;
        }

        // Update state with fetched counts
        setTodayCount(todayCountResult || 0);
        setThisWeekCount(weekCountResult || 0);
        setThisMonthCount(monthCountResult || 0);
        setThisYearCount(yearCountResult || 0);

      } catch (error) {
        console.error("Error fetching survey counts:", error.message);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-lg shadow-black/5 rounded-xl">
        <SearchBar title="Client Satisfaction Survey" />
      </div>

      {/* Status Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StatusCard
          title="Today"
          count={todayCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.today}
          subText={`+${todayCount} since last hour`}
        />
        <StatusCard
          title="This Week"
          count={thisWeekCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.week}
          subText={`+${thisWeekCount} since last week`}
        />
        <StatusCard
          title="This Month"
          count={thisMonthCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.month}
          subText={`+${thisMonthCount} since last month`}
        />
        <StatusCard
          title="This Year"
          count={thisYearCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.year}
          subText={`+${thisYearCount} since last year`}
        />
      </div>

      {/* 2 GRID GRAPH AND NOTIFICATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          {/* BAR GRAPH */}
          <BarPage />
        </div>
        <PieChart />
      </div>

      {/* CSS Responses Heading */}
      <div className="flex justify-center items-center mt-6">
        <h2 className="text-2xl font-semibold text-center">SURVEY RESPONSES</h2>
      </div>

      {/* Table Component */}
      <SPMETable />
    </>
  );
}
