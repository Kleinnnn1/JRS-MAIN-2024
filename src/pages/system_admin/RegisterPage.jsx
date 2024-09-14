import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    userRole: '',
    contactNumber: '',
    departmentId: '',
    jobId: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Validate form
    if (password.length < 8) {
      Swal.fire('Error', 'Password must be at least 8 characters long!', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match!', 'error');
      return;
    }

    // Simulate registration process
    Swal.fire({
      title: 'Registration Successful!',
      text: `Welcome, ${formData.firstName}!`,
      icon: 'success',
    }).then(() => {
      navigate('/login'); // Redirect to login page after successful registration
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* ID Number */}
          <div className="flex flex-col">
            <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-2">ID Number</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              minLength="8"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* User Role */}
          <div className="flex flex-col">
            <label htmlFor="userRole" className="block text-gray-700 font-medium mb-2">User Role</label>
            <input
              type="text"
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Department ID */}
          <div className="flex flex-col">
            <label htmlFor="departmentId" className="block text-gray-700 font-medium mb-2">Department ID</label>
            <input
              type="text"
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Job ID */}
          <div className="flex flex-col">
            <label htmlFor="jobId" className="block text-gray-700 font-medium mb-2">Job ID</label>
            <input
              type="text"
              id="jobId"
              name="jobId"
              value={formData.jobId}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
