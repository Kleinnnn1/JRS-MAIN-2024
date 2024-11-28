import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ReusableBackButton from "../../../components/ReusableBackButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function ViewApproveStaff() {
  
  const [StaffFirstName, setStaffFirstName] = useState('');
  const [StaffLastName, setStaffLastName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [IDNumber, setIDNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Department_Office, setDepartment_Office] = useState('');
  const [Job_Position, setJob_Position] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission

    Swal.fire('Success', 'Successfully Added New Staff', 'success');
    // Clear the form after submission
    setStaffFirstName('');
    setStaffLastName('');
    setBirthday('');
    setIDNumber('');
    setEmail('');
    setPassword('');
    setDepartment_Office('');
    setJob_Position('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    Swal.fire('Cancelled', 'Staff addition was cancelled', 'error');
  };

  return (
    <div className="m-16 bg-white shadow-md rounded-lg">
      <div className="bg-yellow-500 p-5 rounded-t-lg">
        <p className="text-xl font-bold text-gray-600">New Staff Information</p>
      </div>
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
              type="text"
              id="IDNumber"
              name="IDNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={IDNumber}
              onChange={(e) => setIDNumber(e.target.value)}
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Department_Office">
              Department/Office
            </label>
            <input
              type="text"
              id="Department_Office"
              name="Department_Office"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Department_Office}
              onChange={(e) => setDepartment_Office(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Job_Position">
              Job Position
            </label>
            <input
              type="text"
              id="Job_Position"
              name="Job_Position"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={Job_Position}
              onChange={(e) => setJob_Position(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end p-4">
          <ReusableBackButton marginRight={`mr-4`} />
        </div>
      </form>
    </div>
  );
}