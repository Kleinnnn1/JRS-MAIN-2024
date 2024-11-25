import React, { useEffect, useRef } from 'react';

// Assuming you have included 'hs-apexcharts-helpers.js' in your public/index.html or through a CDN
const DonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const buildChart = (selector, options) => {
      // Assuming 'buildChart' is globally available due to hs-apexcharts-helpers.js
      window.buildChart(selector, options);
    };

    const chartOptions = (mode) => ({
      chart: {
        height: 230,
        width: 230,
        type: 'donut',
        zoom: { enabled: false },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '76%',
          },
        },
      },
      series: [47, 23, 30],
      labels: ['Tailwind CSS', 'Preline UI', 'Others'],
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { width: 5 },
      grid: {
        padding: {
          top: -12,
          bottom: -11,
          left: -12,
          right: -12,
        },
      },
      states: {
        hover: {
          filter: { type: 'none' },
        },
      },
      tooltip: {
        enabled: true,
        custom: function (props) {
          return window.buildTooltipForDonut(
            props,
            mode === 'dark' ? ['#fff', '#fff', '#000'] : ['#fff', '#fff', '#000']
          );
        },
      },
    });

    // Wait for the window to load
    window.addEventListener('load', () => {
      buildChart(chartRef.current, chartOptions('light'));
    });

    return () => {
      // Clean up event listener when the component is unmounted
      window.removeEventListener('load', () => {
        buildChart(chartRef.current, chartOptions('light'));
      });
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div ref={chartRef} id="hs-doughnut-chart"></div>

      <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600">Income</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600">Outcome</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600">Others</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
