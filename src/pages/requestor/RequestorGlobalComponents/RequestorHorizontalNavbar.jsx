import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconDropdown from '../../../assets/images/iconDropdown.png';

export default function HorizontalNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative py-2 px-6 bg-yellow-400 flex items-center min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      {/* Toggle Button for Menu */}
      <button
        type="button"
        className="text-lg text-gray-600 sidebar-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <i className={`ri-menu-line ${isMenuOpen ? 'ri-close-line' : ''}`}></i>
      </button>
      
      {/* User Name with Dropdown */}
      <div className="relative ml-auto">
      <button
          type="button"
          onClick={toggleDropdown}
          className="text-lg font-semibold text-gray-800 hover:text-gray-900 focus:outline-none flex items-center"
        >
          Karen
          <img 
            src={iconDropdown} 
            alt="Dropdown Icon"
            className={`ml-1 h-4 w-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-yellow-500 rounded-md shadow-lg py-2 z-10">
            <Link
              to="/requestor/requestor_profile"
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-yellow-600 hover:text-white"
            >
              Profile
            </Link>
            <Link
              to="/logout"
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
