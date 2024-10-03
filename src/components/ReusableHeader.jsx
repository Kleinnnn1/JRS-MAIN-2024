import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Link } from "react-router-dom"; // Import Link for navigation
import iconDropdown from "../assets/images/iconDropdown.png";
import { HiMenu } from "react-icons/hi"; // Import a hamburger icon from react-icons (using Heroicons)

export default function ReusableHeader({
  profilePicture,
  username,
  profileLink,
}) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="py-3 px-6 bg-yellow-400 flex items-center justify-between min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      {/* Hamburger Icon and Email */}
      <div className="flex items-center">
        <button type="button" className="text-gray-800 focus:outline-none mr-3">
          <HiMenu className="w-6 h-6" /> {/* Hamburger Icon */}
        </button>
        <a href="#" className="text-xs">
          jrs@ustp.edu.ph +384-3478-984
        </a>
      </div>

      {/* Profile Dropdown */}
      <div className="relative ml-auto">
        <button
          type="button"
          onClick={toggleDropdown}
          className="text-md font-semibold text-gray-800 hover:text-gray-900 focus:outline-none flex items-center"
        >
          {username}
          <img
            src={iconDropdown}
            alt="Dropdown Icon"
            className={`ml-2 h-3 w-3 transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-yellow-500 rounded-md shadow-lg py-2 z-10">
            <Link
              to={profileLink} // Use the profileLink prop
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Profile
            </Link>
            <Link
              to="/logout"
              className="block px-3 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Logouteyyoyo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
