import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconDropdown from "../assets/images/iconDropdown.png";
import { useLogout } from "../auth/useLogout";

export default function ReusableHeader({ username, profileLink }) {
  const navigate = useNavigate();
  const { logout } = useLogout(); // Initialize useLogout
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown open/close

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown state
  };

  const handleOptionClick = (option) => {
    if (option === "Logout") {
      logout(); // Call logout function
      navigate("/login"); // Redirect to login
    } else if (option === "Profile") {
      navigate(profileLink); // Navigate to profile page
    }
    setIsDropdownOpen(false); // Close dropdown after an action
  };

  return (
    <div className="py-4 px-6 bg-yellow-100 flex items-center justify-between shadow-md shadow-black/5 sticky top-0 left-0 z-50">
      {/* Left Section */}
      <div className="flex items-center">
        <span className="text-xs text-gray-700 font-medium">
          ustpjobrequestsystem@gmail.com
        </span>
      </div>

      {/* Profile Dropdown */}
      <div className="relative ml-auto">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus:outline-none"
        >
          {username}
          <img
            src={iconDropdown}
            alt="Dropdown Icon"
            className={`ml-2 h-3 w-3 transform transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-yellow-200 rounded-md shadow-lg py-2 z-50">
            <button
              onClick={() => handleOptionClick("Profile")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Profile
            </button>
            <button
              onClick={() => handleOptionClick("Logout")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
