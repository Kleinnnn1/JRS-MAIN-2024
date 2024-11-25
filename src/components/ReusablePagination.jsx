import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ReusablePagination({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const [inputPage, setInputPage] = useState(currentPage);

  // Sync the inputPage with currentPage when currentPage changes
  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      setCurrentPage(Number(inputPage));
    } else {
      setInputPage(currentPage); // Revert if the input is invalid
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputPage >= 1 && inputPage <= totalPages) {
        setCurrentPage(Number(inputPage));
      } else {
        setInputPage(currentPage); // Revert if the input is invalid
      }
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 text-sm">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-800"
        }`}
      >
        &lt; Previous
      </button>

      {/* Editable Input for Page Number */}
      <input
        type="text"
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyPress={handleInputKeyPress}
        className="px-3 py-1 rounded-md text-blue-600"
        style={{ width: "40px", textAlign: "center" }}
      />

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages || totalPages === 0
            ? "text-gray-500 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-800"
        }`}
      >
        Next &gt;
      </button>
    </div>
  );
}

// PropTypes validation
ReusablePagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
