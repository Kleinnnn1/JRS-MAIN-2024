import React from "react";
import BarChart from "./CSSBarChart";

const BarPage = () => {
  const data = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      { 
        label: "Data",
        data: [10, 20, 200, 300, 500, 400, 100, 200, 500],
        backgroundColor: "rgba(135, 206, 235, 0.6)", // Sky blue color with transparency
        borderColor: "rgba(135, 206, 235, 1)", // Solid sky blue border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      

      {/* Card Container with White Background and Layered Effect */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
        {/* Optional Layer or Overlay for a Covered Effect */}
        <div className="absolute inset-0 bg-opacity-10 z-10"></div>

        <BarChart data={data} options={options} />
      </div>
    </div>
  );
};

export default BarPage;
