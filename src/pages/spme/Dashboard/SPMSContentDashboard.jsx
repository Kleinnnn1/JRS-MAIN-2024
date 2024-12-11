import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import Table from "./SPMSContentTable";
import ReusableCalendar from "../../../components/ReusableCalendar";
import SearchBar from "../../../components/SearchBar";
import DonutChart from "../../../components/DonutChart";
import BarPage from "../Reports/CSSBarPage";
import { FaClipboardList, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import PieChart from "../Reports/CSSPieChart";
import SPMETable from "../Dashboard/SPMSContentTable";
import SPMENotification from "./SPMENotification";

export default function CSSContentDashboard() {
  const navigate = useNavigate();

  // Sample logic for the counts (replace with actual data logic)
  const todayCount = 2; // Example count for today
  const thisWeekCount = 5; // Example count for this week
  const thisMonthCount = 10; // Example count for this month
  const thisYearCount = 20; // Example count for this year
  const statusCardColor = "bg-white"; // Uniform card color for all status cards

  // Icons for consistency
  const icons = {
    today: <FaChartLine />,
    week: <FaChartLine />,
    month: <FaChartLine />,
    year: <FaChartLine />, // Using clipboard list for consistency
  };

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
          subText="+1 since last hour"
        />
        <StatusCard
          title="This Week"
          count={thisWeekCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.week}
          subText="+1 since last week"
        />
        <StatusCard
          title="This Month"
          count={thisMonthCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.month}
          subText="+1 since last month"
        />
        <StatusCard
          title="This Year"
          count={thisYearCount}
          bgColor={statusCardColor}
          titleColor="text-grey"
          icon={icons.year}
          subText="+1 since last year"
        />
      </div>

      {/* 2 GRID GRAPH AND NOTIFICATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          {/* BAR GRAPH */}
          <BarPage />
        </div>
        {/* NOTIFICATION */}
        {/* <SPMENotification /> */}
        {/* <PieChart /> */}
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
