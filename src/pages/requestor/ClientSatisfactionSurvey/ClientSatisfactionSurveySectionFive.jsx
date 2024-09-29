import React, { useState } from 'react';
import USTPlogo from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function ClientSatisfactionSurveySectionFive() {
  const navigate = useNavigate();

  // State for form data (service quality dimensions questions)
  const [formData, setFormData] = useState({
    sqd6: '',
    sqd7: '',
    sqd8: '',
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

    // Check if all required fields are filled and set error messages
    if (!formData.sqd6) newErrors.sqd6 = 'This question is required.';
    if (!formData.sqd7) newErrors.sqd7 = 'This question is required.';
    if (!formData.sqd8) newErrors.sqd8 = 'This question is required.';

    // If there are errors, set them in the state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, navigate to the next section
    navigate("/requestor/section_six");
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
      <h2 className="text-lg font-semibold mb-4">SECTION 1 OF 5</h2>

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
            {/* SQD6 */}
            <tr>
              <td className="border px-4 py-2 text-left">
                SQD6: I feel the office was fair to everyone or “walang palakasan,” during my transaction.
              </td>
              {['Strongly Disagree', 'Disagree', 'Neither Agree or Disagree', 'Agree', 'Strongly Agree', 'N/A'].map((option, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="radio"
                    name="sqd6"
                    value={option}
                    checked={formData.sqd6 === option}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
            {errors.sqd6 && <tr><td colSpan="7" className="text-red-500 text-sm">This question is required.</td></tr>}

            {/* SQD7 */}
            <tr>
              <td className="border px-4 py-2 text-left">
                SQD7: I was treated courteously by the staff and (if asked for help) the staff was helpful.
              </td>
              {['Strongly Disagree', 'Disagree', 'Neither Agree or Disagree', 'Agree', 'Strongly Agree', 'N/A'].map((option, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="radio"
                    name="sqd7"
                    value={option}
                    checked={formData.sqd7 === option}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
            {errors.sqd7 && <tr><td colSpan="7" className="text-red-500 text-sm">This question is required.</td></tr>}

            {/* SQD8 */}
            <tr>
              <td className="border px-4 py-2 text-left">
                SQD8: I got what I needed from the government office, or (if denied) denial of the request was successfully explained to me.
              </td>
              {['Strongly Disagree', 'Disagree', 'Neither Agree or Disagree', 'Agree', 'Strongly Agree', 'N/A'].map((option, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="radio"
                    name="sqd8"
                    value={option}
                    checked={formData.sqd8 === option}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
            {errors.sqd8 && <tr><td colSpan="7" className="text-red-500 text-sm">This question is required.</td></tr>}
          </tbody>
        </table>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {/* Back Button */}
          <button
            type="button"
            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
            onClick={() => navigate("/requestor/section_four")}
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
