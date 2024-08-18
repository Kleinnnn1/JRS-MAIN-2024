import React from 'react';

// Sample data for transaction history
const transactions = [
  {
    id: 1,
    date: '2024-08-15',
    type: 'Job Request',
    description: 'Job request for server maintenance created.',
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-08-16',
    type: 'Add Employee',
    description: 'Added new employee: John Doe.',
    status: 'Completed',
  },
  {
    id: 3,
    date: '2024-08-17',
    type: 'Update Department',
    description: 'Updated department name to Marketing.',
    status: 'Pending',
  },
  {
    id: 4,
    date: '2024-08-18',
    type: 'Job Request',
    description: 'Job request for software upgrade created.',
    status: 'In Progress',
  },
];

export default function PageHistory() {
  return (
    <div className="m-10 p-5 border border-gray-300 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 ">History</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {transaction.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
