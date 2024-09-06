import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HorizontalNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative py-2 px-6 bg-yellow-400 flex items-center min-h-10 shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button
        type="button"
        className="text-lg text-gray-600 sidebar-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <i className={`ri-menu-line ${isMenuOpen ? 'ri-close-line' : ''}`}></i>
      </button>
      

      
      <div className="text-xs font-semibold underline ml-auto hidden md:block">
        <Link to="/requestor/requestor_survey" className="text-xs ml-8">
          <u>[Take USTP Harmonized Client Satisfaction Survey Online Version]</u>
        </Link>
      </div>
    </div>
  );
}
