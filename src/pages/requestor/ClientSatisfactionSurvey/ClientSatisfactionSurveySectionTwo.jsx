import React, { useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert for alerts
import USTPlogo from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function ClientSatisfactionSurveySectionTwo() {
  const navigate = useNavigate();

  // State for form data (awareness, visibility, and help questions)
  const [formData, setFormData] = useState({
    awareness: '',
    visibility: '',
    help: '',
  });

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const { awareness, visibility, help } = formData;
    if (!awareness || !visibility || !help) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill out all fields before proceeding!',
      });
      return;
    }

    // If all fields are filled, navigate to the next section
      navigate('/requestor/section_three');

  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Section for Control No. and Logo */}
        <div className="flex flex-col py-10">
          <p className="text-sm font-bold px-10 text-gray-700 mb-1">Control No.</p>
          <input
            type="text"
            name="controlNo"
            value="1" // You can make this dynamic based on your needs
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
      <h2 className="text-lg font-semibold mb-4">SECTION 1 OF 2</h2>

      {/* Instructions */}
      <p className="text-m mb-6 text-gray-700">
        <b>INSTRUCTIONS:</b> Check mark <b>(✓)</b> your answer to the Citizen's Charter(CC) questions. 
        The Citizen’s Charter is an official document that reflects the services of a 
        government agency/office including its requirements, fees, and processing times 
        among others.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* CC1: Awareness */}
        <div className="mb-4">
          <label className="block text-m font-bold text-gray-700">CC1 Which of the following best describes your awareness of a CC?</label>
          <div className="mt-2 flex flex-col space-y-2">
            <label>
              <input
                type="radio"
                name="awareness"
                value="I know what a CC is and I saw this office's CC"
                checked={formData.awareness === "I know what a CC is and I saw this office's CC"}
                onChange={handleInputChange}
              />
              <span className="ml-2">I know what a CC is and I saw this office's CC</span>
            </label>
            <label>
              <input
                type="radio"
                name="awareness"
                value="I know what a CC is but I did NOT see this office's CC"
                checked={formData.awareness === "I know what a CC is but I did NOT see this office's CC"}
                onChange={handleInputChange}
              />
              <span className="ml-2">I know what a CC is but I did NOT see this office's CC</span>
            </label>
            <label>
              <input
                type="radio"
                name="awareness"
                value="I learned of the CC only when I saw this office’s CC"
                checked={formData.awareness === "I learned of the CC only when I saw this office’s CC"}
                onChange={handleInputChange}
              />
              <span className="ml-2">I learned of the CC only when I saw this office’s CC</span>
            </label>
            <label>
              <input
                type="radio"
                name="awareness"
                value="I do not know what a CC is and I did not see one in this office"
                checked={formData.awareness === "I do not know what a CC is and I did not see one in this office"}
                onChange={handleInputChange}
              />
              <span className="ml-2">I do not know what a CC is and I did not see one in this office</span>
            </label>
          </div>
        </div>

        {/* CC2: Visibility */}
        <div className="mb-4">
          <label className="block text-m font-bold text-gray-700">CC2 If aware of CC, would you say that the CC of this office was...?</label>
          <div className="mt-2 flex flex-col space-y-2">
            <label>
              <input
                type="radio"
                name="visibility"
                value="Easy to see"
                checked={formData.visibility === 'Easy to see'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Easy to see</span>
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="Somewhat easy to see"
                checked={formData.visibility === 'Somewhat easy to see'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Somewhat easy to see</span>
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="Difficult to see"
                checked={formData.visibility === 'Difficult to see'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Difficult to see</span>
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="Not visible at all"
                checked={formData.visibility === 'Not visible at all'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Not visible at all</span>
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="N/A"
                checked={formData.visibility === 'N/A'}
                onChange={handleInputChange}
              />
              <span className="ml-2">N/A</span>
            </label>
          </div>
        </div>

        {/* CC3: Helpfulness */}
        <div className="mb-4">
          <label className="block text-m font-bold text-gray-700">CC3 If aware of CC, how much did the CC help you in your transaction?</label>
          <div className="mt-2 flex flex-col space-y-2">
            <label>
              <input
                type="radio"
                name="help"
                value="Helped very much"
                checked={formData.help === 'Helped very much'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Helped very much</span>
            </label>
            <label>
              <input
                type="radio"
                name="help"
                value="Somewhat helped"
                checked={formData.help === 'Somewhat helped'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Somewhat helped</span>
            </label>
            <label>
              <input
                type="radio"
                name="help"
                value="Did not help"
                checked={formData.help === 'Did not help'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Did not help</span>
            </label>
            <label>
              <input
                type="radio"
                name="help"
                value="N/A"
                checked={formData.help === 'N/A'}
                onChange={handleInputChange}
              />
              <span className="ml-2">N/A</span>
            </label>
          </div>
        </div>

        {/* Back and Next Buttons */}
        <div className="flex justify-between">
          {/* Back Button */}
          <button
            type="button"
            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
            onClick={() => navigate("/requestor/requestor_survey")} // Adjust to the correct back route
          >
            BACK
          </button>

          {/* Next Button */}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
