import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // For navigation

export default function RequestorJobRequestForm({ onSubmit }) {
  // Get the current date
  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

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
    setJobRequests(jobRequests.filter((request) => request.id !== id));
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
      // Show a warning if any required field is empty
      Swal.fire({
        title: 'Warning 😭🫴',
        text: 'Please fill out all required fields',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return; // Stop form submission
    }

    // Trigger SweetAlert confirmation
    Swal.fire({
      title: 'Are you sure you want to submit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Submitted!',
          text: 'Your job request has been submitted successfully.',
          icon: 'success',
        }).then(() => {
          // Submit the form data to the parent component
          onSubmit(jobRequests);

          // Navigate back to the table view
          navigate('/requestor/job_requests');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your submission was cancelled.', 'error');
      }
    });
  };

  const handleBack = () => {
    // Navigate back to the job request table
    navigate('/requestor/job_request');
  };

  return (
    <div className="max-w-6xl mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      {/* Header with Current Date and Title */}
      <header className="bg-indigo-900 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Job Request Form</h1>
          <p className="text-sm">{getCurrentDate()}</p> {/* Display the current date */}
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
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.description}
                      onChange={(e) =>
                        handleInputChange(request.id, 'description', e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.location}
                      onChange={(e) =>
                        handleInputChange(request.id, 'location', e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      value={request.category}
                      onChange={(e) =>
                        handleInputChange(request.id, 'category', e.target.value)
                      }
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
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      onChange={(e) =>
                        handleInputChange(request.id, 'photo', e.target.files[0])
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center space-x-2">
                      {jobRequests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(request.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          -
                        </button>
                      )}
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
            type="button"
            onClick={handleBack} // Back button to navigate to job request table
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
