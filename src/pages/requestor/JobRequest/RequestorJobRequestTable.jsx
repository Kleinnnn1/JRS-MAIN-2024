import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentDate } from './utils'; // Import utility function to get current date

export default function RequestorJobRequestTable({ jobRequests }) {
  const navigate = useNavigate(); // Initialize navigation
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering job requests

  // Navigate to the form page
  const handleMakeRequest = () => {
    navigate('/requestor/job_request_form');
  };

  // Filter jobRequests based on the search term
  const filteredRequests = jobRequests.filter((request) => {
    return (
      request.requestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 m-5 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="bg-indigo-900 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Job Requests</h1>
          <p className="text-sm">{getCurrentDate()}</p> {/* Display current date */}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleMakeRequest}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Make Request
          </button>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none"
              placeholder="Search..."
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-md text-white">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Table */}
      <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-lg border border-white">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left bg-gray-100 text-gray-600 font-semibold text-sm uppercase tracking-wide border-b border-white">
              <th className="px-6 py-3 border-b-2 border-white">Request ID</th>
              <th className="px-6 py-3 border-b-2 border-white">Requestor</th>
              <th className="px-6 py-3 border-b-2 border-white">Work Description</th>
              <th className="px-6 py-3 border-b-2 border-white">Category</th>
              <th className="px-6 py-3 border-b-2 border-white">No. of Person</th>
              <th className="px-6 py-3 border-b-2 border-white">Department</th>
              <th className="px-6 py-3 border-b-2 border-white">Processed by</th>
              <th className="px-6 py-3 border-b-2 border-white">Photo</th>
              <th className="px-6 py-3 border-b-2 border-white">Status</th>
              <th className="px-6 py-3 border-b-2 border-white">Date Requested</th>
              <th className="px-6 py-3 border-b-2 border-white">Date Completed</th>
              <th className="px-6 py-3 border-b-2 border-white text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="border-t border-white">
                  <td className="px-6 py-4 border-b border-white">{request.id}</td>
                  <td className="px-6 py-4 border-b border-white">{request.requestor}</td>
                  <td className="px-6 py-4 border-b border-white">{request.description}</td>
                  <td className="px-6 py-4 border-b border-white">{request.category}</td>
                  <td className="px-6 py-4 border-b border-white">{request.persons}</td>
                  <td className="px-6 py-4 border-b border-white">{request.department}</td>
                  <td className="px-6 py-4 border-b border-white">{request.processedBy}</td>
                  <td className="px-6 py-4 border-b border-white">
                    {request.photo ? (
                      <img
                        src={URL.createObjectURL(request.photo)}
                        alt="Job Request"
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-500">No Photo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-white">
                    <span
                      className={`px-2 py-1 rounded-md text-white ${
                        request.status === 'Pending'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-white">{request.dateRequested}</td>
                  <td className="px-6 py-4 border-b border-white">{request.dateCompleted}</td>
                  <td className="px-6 py-4 border-b border-white text-center">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="px-6 py-4 text-center text-gray-500">
                  No matching results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-4 text-right text-gray-600">
        <span>Rows per page:</span>
        <span className="ml-2">0-0 of {filteredRequests.length}</span>
      </div>
    </div>
  );
}
