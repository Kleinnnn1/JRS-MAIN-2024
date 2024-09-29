import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert for alerts
import USTPlogo from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function ClientPageSatisfactionSurveySectionSix() {
  const navigate = useNavigate();

  // State for form data (suggestions and email address)
  const [formData, setFormData] = useState({
    suggestions: '',
    email: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Initialize an empty errors object
    const newErrors = {};

    // Check if any required field is empty and set errors
    if (!formData.suggestions) {
      newErrors.suggestions = 'Suggestions field is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }

    // If there are errors, set them in the state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, show SweetAlert success message and navigate to the next section
    Swal.fire({
      title: 'Thank you!',
      text: 'Your feedback has been submitted.',
      icon: 'success',
      confirmButtonText: 'Proceed',
    }).then(() => {
      navigate('/requestor/job_request'); // Proceed to job request table after submission
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col py-10">
          <p className="text-sm font-bold px-10 text-gray-700 mb-1">Control No.</p>
          <input
            type="text"
            name="controlNo"
            value="1" // Dynamic control number
            readOnly
            className="mt-1 py-2 px-3 text-center"
          />
        </div>
        <img
          src={USTPlogo}
          alt="USTP Logo"
          className="w-20 h-20 mb-1"
        />

        {/* Centered Section for Survey Title */}
        <div className="text-center flex-grow">
          <h1 className="text-xl font-bold text-gray-900">
            HARMONIZED CLIENT SATISFACTION SURVEY
          </h1>
          <p className="text-sm font-semibold text-blue-700">
            HELP US SERVE YOU BETTER!
          </p>
        </div>

        {/* Right Section for Document Code */}
        <div className="text-center">
          <div className="bg-blue-950 text-white">
            <p className="text-sm">Document Code No.</p>
            <input
              type="text"
              name="documentCode"
              value="FM-USTP-006-1"
              readOnly
              className="text-base font-semibold text-center bg-white text-black outline-none w-full"
            />
          </div>

          <div className="bg-blue-950 text-white-900">
            <div className="text-xs">
              <label className="font-semibold text-white text-start">
                Rev. No. | Effective Date | Page No.
              </label>
            </div>
          </div>

          <div className="text-sm mt-1 flex space-x-2">
            <input
              type="text"
              name="revNo"
              value="01"
              readOnly
              className="w-10 px-1 text-center"
            />
            <span>|</span>
            <input
              type="text"
              name="effectiveDate"
              value="07.01.23"
              readOnly
              className="w-20 text-center"
            />
            <span>|</span>
            <input
              type="text"
              name="pageNo"
              value="1 of 1"
              readOnly
              className="w-16 text-center"
            />
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      {/* Section Title */}
      <h2 className="text-lg font-semibold mb-4">SECTION 1 OF 6</h2>

      {/* Form for Suggestions and Email */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-m font-bold text-gray-700">
            Suggestions on how we can further improve our services (required):
          </label>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleInputChange}
            className="mt-2 block w-full py-2 px-3 border border-gray-300 rounded-md"
            rows="5"
            required
          ></textarea>
          {errors.suggestions && (
            <p className="text-red-500 text-sm mt-1">{errors.suggestions}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-m font-bold text-gray-700">Email address (required)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2 block w-full py-2 px-3 border border-gray-300 rounded-md"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {/* Back Button */}
          <button
            type="button"
            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
            onClick={() => navigate("/requestor/section_five")}
          >
            BACK
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
