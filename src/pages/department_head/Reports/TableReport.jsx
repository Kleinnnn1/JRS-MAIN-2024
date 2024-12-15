import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../../../components/StatusCard";
import SearchBar from "../../../components/SearchBar";
import { FaClipboardList, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import BarPage from "./DeptHeadBarPage";
import CustomPieChart from "./DeptHeadPieChart";
import BarPageStaff from "./DeptHeadBarPageForStaff";
import CustomPieChartStaff from "./DeptHeadPieChartForStaff";
 

export default function TableReport() {
  
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
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      <div className="bg-custom-blue py-2 px-4 flex justify-between items-center rounded-t-lg">
      <SearchBar title="Reports " />
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
      <h2 className="text-2xl font-semibold text-center">JOB REQUEST REPORTS</h2>

      {/* 2 GRID GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
        {/* BAR GRAPH */}
          <BarPage />
        </div>
        {/* NOTIFICATION */}
        <CustomPieChart />
      </div>

      {/* CSS Responses Heading */}
      <div className="flex justify-center items-center mt-6">
        <h2 className="text-2xl font-semibold text-center">STAFF REPORTS</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
        {/* BAR GRAPH */}
          <BarPageStaff />
        </div>
        {/* NOTIFICATION */}
        <CustomPieChartStaff />
      </div>
      {/* Table Component */}
    </div>
  );
}
