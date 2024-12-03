import React from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmationAlert, successAlert } from '../../../components/ReusableSweetAlert'; // Import ReusableSweetAlert

export default function ContentJobRequest() {
  const navigate = useNavigate();

  const handleCancelJobRequest = () => {
    confirmationAlert(
      'Are you sure you want to cancel this job request?',
      'This action cannot be undone.',
      () => {
        navigate('/requestor/job_request_detail#'); // Redirect after confirmation
      }
    );
  };

  const handleUpdateJobRequest = () => {
    confirmationAlert(
      'Are you sure you want to update this job request?',
      'Please confirm your updates before proceeding.',
      () => {
        successAlert('Updated!', 'Your job request has been successfully updated.').then(() => {
          navigate('/requestor/job_request_detail');
        });
      }
    );
  };

  const stages = ['Requested', 'Approved', 'In Progress', 'Completed', 'Satisfaction Survey'];
  const currentStage = 3;

  return (
    <div className="p-4 md:p-6">
      {/* Navigation Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => navigate('/requestor/job_request')}
        >
          X
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Request Details Card */}
        <div className="bg-white rounded-xl border shadow-lg flex flex-col h-full p-4">
          <div className="flex-grow overflow-y-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Request #ID 123</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Date Requested</label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  value="/"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  value="/"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Job Category</label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  value="/"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Assigned Department</label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  value="/"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Assigned Staff</label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  value="/"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Photo Attached</label>
                <img
                  src="/path/to/photo.jpg"
                  alt="Attached"
                  className="mt-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  rows="3"
                  readOnly
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Remarks</label>
                <textarea
                  className="mt-2 block w-full border border-gray-300 p-2 rounded"
                  rows="3"
                  placeholder="Enter any remarks here..."
                ></textarea>
              </div>
            </div>
          </div>
          {/* Buttons Section */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
              onClick={handleUpdateJobRequest}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"
              onClick={handleCancelJobRequest}
            >
              Cancel Job Request
            </button>
          </div>
        </div>

        {/* Job Request Tracking Card */}
        <div className="bg-white rounded-xl border shadow-lg flex flex-col h-full p-4">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Request Tracking</h2>
            {/* Progress Line */}
            <div className="flex items-center justify-between">
              {stages.map((stage, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                        index <= currentStage ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= currentStage ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        {index <= currentStage ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="w-3 h-3 bg-white rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <span className="mt-2 text-sm text-gray-700">{stage}</span>
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`flex-1 h-1 ${index < currentStage ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Tracking Table */}
            <div className="mt-6 overflow-x-auto">
              <div className="text-lg font-semibold text-black">Tracking Information</div>
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Delivered</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-05-30 13:32</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Out for Delivery</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-05-30 11:20</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">In Progress</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-05-28 09:47</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Approved</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-05-27 22:42</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Requested</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-05-26 19:44</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
