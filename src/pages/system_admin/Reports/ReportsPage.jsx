import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const departmentData = [
  { name: 'BGMS', employees: 10, pending: 5, ongoing: 3, completed: 12 },
  { name: 'CSWS', employees: 25, pending: 10, ongoing: 8, completed: 20 },
  { name: 'MEWS', employees: 15, pending: 2, ongoing: 4, completed: 8 },
  // Add more departments as needed
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
  labels: departmentData.map(dept => dept.name),
  datasets: [
    {
      label: 'Total Requests by Department',
      data: departmentData.map(dept => dept.pending + dept.ongoing + dept.completed),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const pageStyle = {
  container: 'p-8 bg-white shadow-md rounded-lg',
  table: 'min-w-full divide-y divide-gray-200',
  tableHeader: 'bg-gray-50 text-gray-500 text-xs uppercase font-medium',
  tableBody: 'bg-white text-gray-900',
  tableRow: 'hover:bg-gray-100',
  chart: 'mt-8',
};

export default function PageReport() {
  return (
    <div className={pageStyle.container}>
      <h1 className="text-2xl font-bold mb-6">Department Reports and Analytics</h1>
      
      {/* Department Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Department Details</h2>
        <table className={pageStyle.table}>
          <thead className={pageStyle.tableHeader}>
            <tr>
              <th>Department</th>
              <th>No of Employees</th>
              <th>Pending Requests</th>
              <th>Ongoing Requests</th>
              <th>Completed Requests</th>
              <th>Total No Of Requests</th>
            </tr>
          </thead>
          <tbody className={pageStyle.tableBody}>
            {departmentData.map((dept, index) => (
              <tr key={index} className={pageStyle.tableRow}>
                <td>{dept.name}</td>
                <td>{dept.employees}</td>
                <td>{dept.pending}</td>
                <td>{dept.ongoing}</td>
                <td>{dept.completed}</td>
                <td>{dept.pending + dept.ongoing + dept.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Overall Summary</h2>
        <table className={pageStyle.table}>
          <thead className={pageStyle.tableHeader}>
            <tr>
              <th>Total Departments</th>
              <th>Total No of Employees</th>
              <th>Total Pending Requests</th>
              <th>Total Ongoing Requests</th>
              <th>Total Completed Requests</th>
              <th>Total No Of Requests</th>
            </tr>
          </thead>
          <tbody className={pageStyle.tableBody}>
            <tr>
              <td>{totalData.departments}</td>
              <td>{totalData.employees}</td>
              <td>{totalData.pending}</td>
              <td>{totalData.ongoing}</td>
              <td>{totalData.completed}</td>
              <td>{totalData.totalRequests}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className={pageStyle.chart}>
        <h2 className="text-xl font-semibold mb-4">Requests by Department</h2>
        <Bar data={departmentChartData} />
      </div>
    </div>
  );
}
