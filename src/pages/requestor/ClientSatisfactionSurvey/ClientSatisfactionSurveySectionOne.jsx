import React, { useState } from 'react';
import Swal from 'sweetalert2';  // For displaying error messages
import USTPlogo from "../../../assets/images/logoUSTP.png";
import { useNavigate } from 'react-router-dom';

export default function ClientSatisfactionSurveySectionOne() {
  const navigate = useNavigate();

  // State to handle form data and editable document code information
  const [formData, setFormData] = useState({
    clientType: '',
    regionOfResidence: '',
    serviceAvailed: '',
    date: '',
    sex: '',
    age: '',
    role: '',
  });

  // State to handle the editable document information
  const [docInfo, setDocInfo] = useState({
    documentCode: 'FM-USTP-006-1',
    revNo: '01',
    effectiveDate: '07.01.23',
    pageNo: '1 of 1',
  });

  // State for Control No.
  const [controlNo, setControlNo] = useState('1'); // Start with 1

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle document code inputs
  const handleDocInfoChange = (e) => {
    const { name, value } = e.target;
    setDocInfo({ ...docInfo, [name]: value });
  };

  // Handle Control No. change
  const handleControlNoChange = (e) => {
    const { value } = e.target;
    setControlNo(value); // Update the Control No. state
  };

  // Validate if all required fields are filled
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const { clientType, regionOfResidence, serviceAvailed, date, sex, age, role } = formData;
    if (!clientType || !regionOfResidence || !serviceAvailed || !date || !sex || !age || !role) {
      Swal.fire({
        title: 'Missing Fields!',
        text: 'Please fill out all required fields before proceeding.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // If all fields are filled, navigate to the next section
    navigate('/requestor/survey_section_two');
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {/* Custom Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Section for Control No. and Logo */}
        <div className="flex flex-col py-10">
          <p className="text-sm font-bold px-10 text-gray-700 mb-1">Control No.</p>
          {/* Editable Control No. input */}
          <input
            type="text"
            name="controlNo"
            value={controlNo}
            onChange={handleControlNoChange}
            className="mt-1 py-2 px-2  text-center"
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

        {/* Right Section for Editable Document Code */}
        <div className="text-center">
          <div className="bg-blue-950 text-white">
            <p className="text-sm">Document Code No.</p>
            {/* Editable Document Code */}
            <input
              type="text"
              name="documentCode"
              value={docInfo.documentCode}
              onChange={handleDocInfoChange}
              className="text-base font-semibold text-center bg-white text-black outline-none w-full"
            />
          </div>

          <div className="bg-blue-950 text-white-900">
            <div className="text-xs">
              <label className="font-semibold text-white text-start">Rev. No. | Effective Date | Page No.</label>
            </div>
          </div>

          <div className="text-sm mt-1 flex space-x-2">
            {/* Editable Revision No, Effective Date, and Page No */}
            <input
              type="text"
              name="revNo"
              value={docInfo.revNo}
              onChange={handleDocInfoChange}
              className="w-10 px-1 text-center"
            />
            <span>|</span>
            <input
              type="text"
              name="effectiveDate"
              value={docInfo.effectiveDate}
              onChange={handleDocInfoChange}
              className="w-20 text-center"
            />
            <span>|</span>
            <input
              type="text"
              name="pageNo"
              value={docInfo.pageNo}
              onChange={handleDocInfoChange}
              className="w-16 text-center"
            />
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      {/* Section Title */}
      <h2 className="text-lg font-semibold mb-4">SECTION 1 OF 1</h2>

      {/* Instructions */}
      <p className="text-m mb-6 text-gray-700">
        The Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. 
        Your feedback on your recently concluded transaction will help this office provide a better service. 
        Personal information shared will be kept confidential and you always have the option to not answer this form.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Client Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CLIENT TYPE</label>
          <div className="mt-2 flex space-x-4">
            <label>
              <input
                type="radio"
                name="clientType"
                value="Citizen"
                checked={formData.clientType === 'Citizen'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Citizen</span>
            </label>
            <label>
              <input
                type="radio"
                name="clientType"
                value="Business"
                checked={formData.clientType === 'Business'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Business</span>
            </label>
            <label>
              <input
                type="radio"
                name="clientType"
                value="Government"
                checked={formData.clientType === 'Government'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Government (Employee or another agency)</span>
            </label>
          </div>
        </div>

        {/* Date, Sex, and Age Fields */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">DATE</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm space-y-10 font-medium text-gray-700">SEX</label>
            <div className="mt-1 flex space-x-5">
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="Male"
                  checked={formData.sex === 'Male'}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Male</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="Female"
                  checked={formData.sex === 'Female'}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">AGE</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Region of Residence and Service Availed Fields */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">REGION OF RESIDENCE</label>
            <input
              type="text"
              name="regionOfResidence"
              value={formData.regionOfResidence}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SERVICE AVAILED</label>
            <input
              type="text"
              name="serviceAvailed"
              value={formData.serviceAvailed}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">I AM A</label>
          <div className="mt-2 flex space-x-4">
            <label>
              <input
                type="radio"
                name="role"
                value="Citizen"
                checked={formData.role === 'Citizen'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Citizen</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Non-Teaching Staff"
                checked={formData.role === 'Non-Teaching Staff'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Non-Teaching Staff</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Student"
                checked={formData.role === 'Student'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Student</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Guardian"
                checked={formData.role === 'Guardian'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Guardian/Parent of Student</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Alumna"
                checked={formData.role === 'Alumna'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Alumna</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Other"
                checked={formData.role === 'Other'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Others (please specify)</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
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
