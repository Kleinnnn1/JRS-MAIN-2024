import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PageSubTitle from '../components/PageTitle';
import userIcon from '/src/assets/images/SysAdIcons/userIcon.png';

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
  tableCell: 'px-6 py-4 text-center', // Center text in table cells
  chart: 'mt-8',
};

export default function PageReportSystemAdmin() {
  return (
    <div>
   <PageSubTitle title="REPORT AND ANALYTICS" iconSrc={userIcon} />
    <div className={pageStyle.container}>
     
      
      {/* Department Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Department Details</h2>
        <table className={pageStyle.table}>
          <thead className={pageStyle.tableHeader}>
            <tr>
              <th className={pageStyle.tableCell}>Department</th>
              <th className={pageStyle.tableCell}>No of Employees</th>
              <th className={pageStyle.tableCell}>Pending Requests</th>
              <th className={pageStyle.tableCell}>Ongoing Requests</th>
              <th className={pageStyle.tableCell}>Completed Requests</th>
              <th className={pageStyle.tableCell}>Total No Of Requests</th>
            </tr>
          </thead>
          <tbody className={pageStyle.tableBody}>
            {departmentData.map((dept, index) => (
              <tr key={index} className={pageStyle.tableRow}>
                <td className={pageStyle.tableCell}>{dept.name}</td>
                <td className={pageStyle.tableCell}>{dept.employees}</td>
                <td className={pageStyle.tableCell}>{dept.pending}</td>
                <td className={pageStyle.tableCell}>{dept.ongoing}</td>
                <td className={pageStyle.tableCell}>{dept.completed}</td>
                <td className={pageStyle.tableCell}>{dept.pending + dept.ongoing + dept.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Overall Summary</h2>
        <table className={pageStyle.table}>
          <thead className={pageStyle.tableHeader}>
            <tr>
              <th className={pageStyle.tableCell}>Total Departments</th>
              <th className={pageStyle.tableCell}>Total No of Employees</th>
              <th className={pageStyle.tableCell}>Total Pending Requests</th>
              <th className={pageStyle.tableCell}>Total Ongoing Requests</th>
              <th className={pageStyle.tableCell}>Total Completed Requests</th>
              <th className={pageStyle.tableCell}>Total No Of Requests</th>
            </tr>
          </thead>
          <tbody className={pageStyle.tableBody}>
            <tr>
              <td className={pageStyle.tableCell}>{totalData.departments}</td>
              <td className={pageStyle.tableCell}>{totalData.employees}</td>
              <td className={pageStyle.tableCell}>{totalData.pending}</td>
              <td className={pageStyle.tableCell}>{totalData.ongoing}</td>
              <td className={pageStyle.tableCell}>{totalData.completed}</td>
              <td className={pageStyle.tableCell}>{totalData.totalRequests}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className={pageStyle.chart}>
        <h2 className="text-xl font-semibold mb-4 text-center">Requests by Department</h2>
        <Bar data={departmentChartData} />
      </div>
    </div>
    </div>
  );
}
