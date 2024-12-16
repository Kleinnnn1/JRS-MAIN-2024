import React from "react";
import { Chart, registerables } from "chart.js";
import SearchBar from "../../../components/SearchBar";
import OverallSummary from "./OverallSummary";
import DepartmentDetails from "./DepartmentDetails";
import RequestsByDepartment from "./RequetsByDepartments";
import JobCategory from "./JobCategory";
import { yellow } from "@mui/material/colors";

Chart.register(...registerables);

const departmentData = [
  { name: "BGMS", employees: 10, pending: 5, ongoing: 3, completed: 12 },
  { name: "CSWS", employees: 25, pending: 10, ongoing: 8, completed: 20 },
  { name: "MEWS", employees: 15, pending: 2, ongoing: 4, completed: 8 },
];

const totalData = {
  departments: departmentData.length,
  employees: departmentData.reduce((acc, dept) => acc + dept.employees, 0),
  pending: departmentData.reduce((acc, dept) => acc + dept.pending, 0),
  ongoing: departmentData.reduce((acc, dept) => acc + dept.ongoing, 0),
  completed: departmentData.reduce((acc, dept) => acc + dept.completed, 0),
  totalRequests: departmentData.reduce((acc, dept) => acc + dept.pending + dept.ongoing + dept.completed, 0),
};

const departmentChartData = {
  labels: departmentData.map((dept) => dept.name),
  datasets: [
    {
      label: "Pending Requests",
      data: departmentData.map((dept) => dept.pending),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Ongoing Requests",
      data: departmentData.map((dept) => dept.ongoing),
      backgroundColor: "rgba(255, 206, 86, 0.2)",
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 1,
    },
    {
      label: "Completed Requests",
      data: departmentData.map((dept) => dept.completed),
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const pageStyle = {
  container: "p-8 bg-white shadow-md rounded-lg",
  table: "min-w-full divide-y divide-gray-200",
  tableHeader: "bg-gray-50 text-gray-500 text-xs uppercase font-medium",
  tableBody: "bg-white text-gray-900",
  tableRow: "hover:bg-gray-100",
  tableCell: "px-6 py-4 text-center",
  chart: "mt-8",
};

export default function PageReportSystemAdmin() {
  
  return (
   <div>
  <SearchBar title="Reports and Analytics" />
  <div className={pageStyle.container}>
    {/* Overall Summary */}
    <OverallSummary totalData={totalData} pageStyle={pageStyle} />

    {/* Department Details */}
    <DepartmentDetails
      className="grid-cols-2"
      departmentData={departmentData}
      pageStyle={pageStyle}
    />

    {/* Horizontal Alignment for Requests and Job Categories */}
    <div className="flex flex-wrap justify-between items-center gap-8 mt-8">
      {/* Requests By Department */}
      <div className="flex-1 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          
        </h2>
        <RequestsByDepartment
          departmentChartData={departmentChartData}
          pageStyle={pageStyle}
        />
      </div>

      {/* Job Categories with Most Requests */}
      <div className="flex-1 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mt-10 mb-4 text-center">
          Job Categories with Most Requests
        </h2>
        <JobCategory />
      </div>
    </div>
  </div>
</div>
  );
}
