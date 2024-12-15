import React from "react";
import BarChart from "./DeptHeadBarChart";

const BarPageStaff = () => {
  const data = {
    labels: [
      "Staff1", "Staff2", "Staff3", "Staff4", "Staff5", "Staff6", "Staff7", "Staff8",
      "Staff1", "Staff2", "Staff3", "Staff4", "Staff5", "Staff6", "Staff7", "Staff8",
      "Staff1", "Staff2", "Staff3", "Staff4", "Staff5", "Staff6", "Staff7", "Staff8",
      "Staff1", "Staff2", "Staff3", "Staff4", "Staff5", "Staff6", "Staff7", "Staff8",
      "Staff1", "Staff2", "Staff3", "Staff4", "Staff5", "Staff6", "Staff7", "Staff8",
      "Staff1", "Staff2", "Staff3", "Staff4", "Staff5", "Staff6", "Staff7", "Staff8",
      "Staff9"
    ],
    datasets: [
      { 
        label: "Data",
        data: [10, 20, 200, 300, 500, 400, 100, 200, 500, 100, 200, 300, 500, 400, 100, 200, 500],
        backgroundColor: "rgba(135, 206, 235, 0.6)", // Sky blue color with transparency
        borderColor: "rgba(135, 206, 235, 1)", // Solid sky blue border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize within the container
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Ensures all labels are displayed
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      {/* Card Container with White Background and Layered Effect */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold mb-4">No. of Job Requests Completed by Staff</h1>
        
        {/* Horizontally Scrollable Chart Wrapper */}
        <div className="overflow-x-auto">
          <div className="w-[2000px] h-[400px]"> {/* Adjust width to fit all labels */}
            <BarChart data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarPageStaff;
