import { useNavigate } from "react-router-dom";
import { confirmationAlert, successAlert } from '../../../components/ReusableSweetAlert'; // Import ReusableSweetAlert

export default function RequestorContentJobRequestApproved() {
  const navigate = useNavigate();

  // Handler for cancelling the job request
  const handleCancelJobRequest = () => {
    confirmationAlert(
      'Are you sure you want to cancel this job request?',
      'This action cannot be undone.',
      () => {
        navigate('/requestor/job_request_detail#'); // Redirect after confirmation
      }
    );
  };

  // Handler for updating the job request
  const handleUpdateJobRequest = () => {
    confirmationAlert(
      'Are you sure you want to update this job request?',
      'Please confirm your updates before proceeding.',
      () => {
        successAlert('Updated!', 'Your job request has been successfully updated.')
          .then(() => {
            // Navigate after the success alert
            navigate('/requestor/job_request_detail');
          });
      }
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white border shadow-md shadow-black/5">
        {/* Header */}
        <div className="bg-yellow-400  p-4 m-0">
          <div className="text-2xl font-bold text-black">Job Request Details</div>
        </div>

        {/* Requestor Information Section */}
        <div className="p-4">
          <div className="text-lg font-semibold text-black">REQUESTOR INFdORMATION</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="Karen Cadalo" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 p-2" value="cadalo.karen@gmail.com" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="09097123357" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="CITC" readOnly />
            </div>
          </div>
        </div>

        {/* Job Request Information Section */}
        <div className="p-4">
          <div className="text-lg font-semibold text-black">JOB REQUEST INFORMATION</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="26-05-2024 11:00 AM" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="DRER GYM" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned Department</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="CSWS" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Category</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="Maintenance" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo (Optional)</label>
              <input type="file" className="mt-1 block w-full border border-gray-300 p-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Description</label>
              <textarea className="mt-1 block w-full border border-gray-300 p-2" rows="3" readOnly>
                The aircon does not work
              </textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea className="mt-1 block w-full border border-gray-300 p-2 text-red-500" rows="3" readOnly>
                The job request belongs to CSWS
              </textarea>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="p-4 flex justify-end space-x-4">

          <button className="bg-gray-700 text-white py-2 px-4 rounded" onClick={() => navigate("/requestor/home")}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
