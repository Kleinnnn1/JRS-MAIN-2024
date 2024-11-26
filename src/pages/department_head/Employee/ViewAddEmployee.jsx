import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ReusableBackButton from "../../../components/ReusableBackButton";
import ReusableContent from "../../../components/ReusableContent";
import SearchBar from "../../../components/SearchBar";
import ButtonAddEmployee from "./ButtonAddEmployee";
import { FaEye, FaEyeSlash } from "react-icons/fa";

//THIS IS A FORM FOR ADD STAFF
export default function ViewAddStaff() {

  const [StaffFirstName, setStaffFirstName] = useState('');
  const [StaffLastName, setStaffLastName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [IDNumber, setIDNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Job_Position, setJob_Position] = useState('');
  const [OtherJobPosition, setOtherJobPosition] = useState(''); // For "Others" input
  const [ContactNumber, setContactNumber] = useState(''); // New field for Contact Number
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation (at least 8 characters and 1 symbol)
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(Password)) {
      Swal.fire('Error', 'Password must be at least 8 characters long and contain at least one symbol. <br/> Example. #PasswordEx129', 'error');
      return;
    }

    // ID Number validation (only numeric and not empty)
    if (!/^\d+$/.test(IDNumber) || IDNumber.trim() === '') {
      Swal.fire('Error', 'ID Number must be a number and cannot be empty.', 'error');
      return;
    }

    // Email validation (basic check for @ symbol)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(Email)) {
      Swal.fire('Error', 'Please provide a valid email address.', 'error');
      return;
    }

    // Contact Number validation (should only contain numbers and must be a valid format)
    if (!/^\d{11}$/.test(ContactNumber)) {
      Swal.fire('Error', 'Contact Number must be a valid 10-digit number.', 'error');
      return;
    }

    // If all validations pass, show success
    Swal.fire('Success', 'Successfully Added New Staff', 'success');
    // Clear the form after submission
    setStaffFirstName('');
    setStaffLastName('');
    setBirthday('');
    setIDNumber('');
    setEmail('');
    setPassword('');
    setJob_Position('');
    setOtherJobPosition(''); // Clear the other job position field
    setContactNumber(''); // Clear contact number
  };

  const handleCancel = (event) => {
    event.preventDefault();
    Swal.fire('Cancelled', 'Staff addition was cancelled', 'error');
  };

  return (
    <div className="rounded-lg">
      <div className="p-2 bg-blue-950 rounded-t-md">
        <p className="text-2xl text-center rounded-lg text-white font-bold ">Employee Details</p>
      </div>
      <hr className="m-5 mt-2"/>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="StaffFirstName">
              First Name
            </label>
            <input
              type="text"
              id="StaffFirstName"
              name="StaffFirstName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={StaffFirstName}
              onChange={(e) => setStaffFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="StaffLastName">
              Last Name
            </label>
            <input
              type="text"
              id="StaffLastName"
              name="StaffLastName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={StaffLastName}
              onChange={(e) => setStaffLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Birthday">
              Birthday
            </label>
            <input
              type="date"
              id="Birthday"
              name="Birthday"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="IDNumber">
              ID Number
            </label>
            <input
              type="text" // Changed to text to prevent entering letters, will validate only numbers
              id="IDNumber"
              name="IDNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={IDNumber}
              onChange={(e) => setIDNumber(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Password">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="Password"
                name="Password"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ContactNumber">
              Contact Number
            </label>
            <input
              type="tel" // To restrict only numeric input
              id="ContactNumber"
              name="ContactNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={ContactNumber}
              onChange={(e) => setContactNumber(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Job_Position">
              Job Position
            </label>
            <select
              id="Job_Position"
              name="Job_Position"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Job_Position}
              onChange={(e) => setJob_Position(e.target.value)}
              required
            >
              <option value="">Select Job Position</option>
              <option value="Temporary">Temporary I reflect sa database</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Others">Others (please specify)</option>
            </select>
          </div>

          {/* Conditionally show the "Other Job Position" field if "Others" is selected */}
          {Job_Position === 'Others' && (
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="OtherJobPosition">
                Please specify the Job Position
              </label>
              <input
                type="text"
                id="OtherJobPosition"
                name="OtherJobPosition"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={OtherJobPosition}
                onChange={(e) => setOtherJobPosition(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-center p-4">
          <ButtonAddEmployee />
        </div>
      </form>
    </div>
  );
}
