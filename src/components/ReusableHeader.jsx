import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import iconDropdown from "../assets/images/iconDropdown.png";

export default function ReusableHeader({
  profilePicture,
  username,
  profileLink,
}) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="py-4 px-6 bg-yellow-100 flex items-center justify-between shadow-md shadow-black/5 sticky top-0 left-0 z-50">
      {/* Left Section */}
      <div className="flex items-center">
        <a href="#" className="text-xs text-gray-700 font-medium">
          {/* jrs@ustp.edu.ph +384-3478-984 */}
          ustpjrs@gmail.com
        </a>
      </div>

      {/* Profile Dropdown */}
      <div className="relative ml-auto">
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
            <Link
              to={profileLink}
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
