import React from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmationAlert, successAlert } from '../../../components/ReusableSweetAlert'; // Import ReusableSweetAlert
import Logo from "../../../assets/images/Loading_2.gif";

export default function RequestorContentJobRequestCompleted() {
  const navigate = useNavigate();

  // Handlers for actions
  const handleCancelJobRequest = () => {
    confirmationAlert(
      'Are you sure you want to cancel this job request?',
      'This action cannot be undone.',
      () => {
        navigate('/requestor/job_request_detail'); // Redirect after confirmation
      }
    );
  };

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      fetchRequests();
    }, 1000);
    return () => clearTimeout(logoTimer);
  }, []);
  
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

  const handleCertificate = () => {
    navigate('/requestor/job_request_certificate');
  };

  const handleClientSatisfactionSurvey = () => {
    navigate('/requestor/select');
  };

  const stages = ['Requested', 'Approved', 'In Progress', 'Completed', 'Satisfaction Survey'];
  const currentStage = 3; // Current stage index (e.g., "Completed")

  return (
    <div className="p-6">
      {/* Grid Container for Two Cards */}
      <button
        className="bg-gray-700 p-5 text-white py-2 px-4 rounded"
        onClick={() => navigate("/requestor/home")}
      >
        Back to Dashboard
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Job Request Card */}
        <div className="bg-white rounded-r-xl border shadow-xl shadow-black/5 h-full flex flex-col">
          <div className="p-4 flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xl font-medium text-gray-700">Request Date</label>
                <input type="text" className="mt-2 block w-full border border-gray-300 p-2" value="26-05-2024 11:00 AM" readOnly />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">Location</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="DRER GYM" readOnly />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">Job Category</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="Maintenance" readOnly />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700">Assigned Department</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="CSWS" readOnly />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xl font-medium text-gray-700">Description</label>
                <textarea className="mt-1 block w-full border border-gray-300 p-2" rows="3" readOnly>
                  The aircon does not work
                </textarea>
              </div>
            </div>
          </div>
          {/* Buttons Section */}
          <div className="p-4 flex justify-end space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleCertificate} // Handle certificate button
            >
              View Certificate
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleClientSatisfactionSurvey} // Handle survey button
            >
              Client Satisfaction Survey
            </button>
          </div>
        </div>

        {/* Job Request Tracking Card */}
        <div className="bg-white border shadow-md shadow-black/5 rounded-md h-full flex flex-col">
          <div className="p-4 flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Request Tracking</h2>
            {/* Progress Line */}
            <div className="flex items-center justify-between">
              {stages.map((stage, index) => (
                <React.Fragment key={index}>
                  {/* Stage Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${index <= currentStage
                          ? 'border-green-500 bg-green-100'
                          : 'border-gray-300 bg-white'
                        }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStage ? 'bg-green-500' : 'bg-gray-300'
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
                    {/* Stage Label */}
                    <span className="mt-2 text-sm text-gray-700">{stage}</span>
                  </div>
                  {/* Line between circles */}
                  {index < stages.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${index < currentStage ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="p-4 flex-grow">
            <div className="text-lg font-semibold text-black">TRACKING INFORMATION</div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
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
