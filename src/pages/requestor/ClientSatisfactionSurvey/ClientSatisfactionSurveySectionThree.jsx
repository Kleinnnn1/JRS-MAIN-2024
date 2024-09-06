import React, { useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert for alerts
import USTPlogo from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function ClientSatisfactionSurveySectionThree() {
  const navigate = useNavigate();

  // State for form data (service quality dimensions questions)
  const [formData, setFormData] = useState({
    sqd0: '',
    sqd1: '',
    sqd2: '',
  });

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const { sqd0, sqd1, sqd2 } = formData;
    if (!sqd0 || !sqd1 || !sqd2) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please complete all the fields before proceeding.',
      });
      return; // Don't proceed to next page if fields are missing
    }

    // If all fields are filled, navigate to the next section
    navigate('/requestor/section_four');
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
      <h2 className="text-lg font-semibold mb-4">SECTION 1 OF 3</h2>

      {/* Instructions */}
      <p className="text-m mb-6 text-gray-700">
        <b>INSTRUCTIONS:</b> For SQD 0-8, please put a check mark <b>(✓)</b> on the column that best corresponds to your answer.
      </p>

      {/* Survey Table */}
      <form onSubmit={handleSubmit}>
        <table className="table-auto w-full text-center mb-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">Service Quality Dimensions</th>
              <th className="border px-4 py-2">Strongly Disagree</th>
              <th className="border px-4 py-2">Disagree</th>
              <th className="border px-4 py-2">Neither Agree or Disagree</th>
              <th className="border px-4 py-2">Agree</th>
              <th className="border px-4 py-2">Strongly Agree</th>
              <th className="border px-4 py-2">N/A</th>
            </tr>
          </thead>
          <tbody>
            {/* SQD0 */}
            <tr>
              <td className="border px-4 py-2 text-left">
                SQD0: I am satisfied with the service that I availed.
              </td>
              {['Strongly Disagree', 'Disagree', 'Neither Agree or Disagree', 'Agree', 'Strongly Agree', 'N/A'].map((option, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="radio"
                    name="sqd0"
                    value={option}
                    checked={formData.sqd0 === option}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
            {/* SQD1 */}
            <tr>
              <td className="border px-4 py-2 text-left">
                SQD1: The steps (including payment) I needed to do for my transaction were easy and simple.
              </td>
              {['Strongly Disagree', 'Disagree', 'Neither Agree or Disagree', 'Agree', 'Strongly Agree', 'N/A'].map((option, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="radio"
                    name="sqd1"
                    value={option}
                    checked={formData.sqd1 === option}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
            {/* SQD2 */}
            <tr>
              <td className="border px-4 py-2 text-left">
                SQD2: The steps (including payment) I needed to do for my transaction were easy and simple.
              </td>
              {['Strongly Disagree', 'Disagree', 'Neither Agree or Disagree', 'Agree', 'Strongly Agree', 'N/A'].map((option, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="radio"
                    name="sqd2"
                    value={option}
                    checked={formData.sqd2 === option}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {/* Back Button */}
          <button
            type="button"
            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
            onClick={() => navigate("/requestor/survey_section_two")}
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
