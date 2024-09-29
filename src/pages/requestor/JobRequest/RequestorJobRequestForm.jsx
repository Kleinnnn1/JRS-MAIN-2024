import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom'; // For navigation
import { warningAlert, successAlert, confirmationAlert } from '../../../components/ReusableSweetAlert'; // Import reusable SweetAlerts
import SearchBar from '../../../components/SearchBar';

export default function RequestorJobRequestForm({ onSubmit }) {
  const [jobRequests, setJobRequests] = useState([
    { id: 1, description: '', location: '', category: '', photo: null }, // Only one item in the initial state
  ]);

  const jobCategories = ['Electrical', 'Plumbing', 'Carpentry', 'HVAC', 'Painting'];
  const navigate = useNavigate(); // Hook for navigation

  const handleAddRow = () => {
    setJobRequests([
      ...jobRequests,
      { id: jobRequests.length + 1, description: '', location: '', category: '', photo: null },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (jobRequests.length > 1) {
      setJobRequests(jobRequests.filter((request) => request.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setJobRequests(
      jobRequests.map((request) =>
        request.id === id ? { ...request, [field]: value } : request
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if any required field is empty
    const hasEmptyFields = jobRequests.some(
      (request) =>
        !request.description || !request.location || !request.category
    );

    if (hasEmptyFields) {
      // Show a SweetAlert warning if any required field is empty
      warningAlert('Missing Required Fields', 'Please fill out all required fields before submitting.');
      return; // Stop form submission
    }

    // Trigger SweetAlert confirmation using the reusable confirmation alert
    confirmationAlert(
      'Are you sure you want to submit?',
      'This action will submit your job request.',
      () => {
        // Submit the form data and show success alert
        successAlert('Submitted!', 'Your job request has been submitted successfully.')
          .then(() => {
            // Redirect to job request page after showing success alert
            navigate('/requestor/job_request_table');
          });

        // Submit the form data to the parent component
        onSubmit(jobRequests);

        // Reset form fields after submission
        setJobRequests([{ id: 1, description: '', location: '', category: '', photo: null }]);
      }
    );
  };

  return (
    <div className="rounded-lg">
      {/* Header with Current Date and Title */}
      <header className="bg-custom-blue text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <SearchBar title="Job Request Form" />
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">Item No.</th>
                <th className="px-4 py-2 border">Work Description</th>
                <th className="px-4 py-2 border">Location (Bldg/Office)</th>
                <th className="px-4 py-2 border">Job Category</th>
                <th className="px-4 py-2 border">Photo (OPTIONAL)</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobRequests.map((request, index) => (
                <tr key={request.id}>
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      id={`description-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.description}
                      onChange={(e) =>
                        handleInputChange(request.id, 'description', e.target.value)
                      }
                      required
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      id={`location-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.location}
                      onChange={(e) =>
                        handleInputChange(request.id, 'location', e.target.value)
                      }
                      required
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      id={`category-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.category}
                      onChange={(e) =>
                        handleInputChange(request.id, 'category', e.target.value)
                      }
                      required
                    >
                      <option value="">Select Category</option>
                      {jobCategories.map((category, idx) => (
                        <option key={idx} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="file"
                      id={`photo-${request.id}`}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      onChange={(e) =>
                        handleInputChange(request.id, 'photo', e.target.files[0])
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(request.id)}
                        className={`bg-red-600 text-white px-3 py-1 rounded-md ${jobRequests.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={jobRequests.length === 1} // Disable button if there's only one row
                      >
                        -
                      </button>
                      {index === jobRequests.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddRow}
                          className="bg-green-600 text-white px-3 py-1 rounded-md"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back and Submit Buttons */}
        <div className="flex justify-end mt-4 space-x-4">
          <button
            type="submit" // Handle form submission through onSubmit
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// Add PropTypes validation
RequestorJobRequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
