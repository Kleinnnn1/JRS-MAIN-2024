import PropTypes from "prop-types";

export default function ReusablePagination({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
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

  const generatePageNumbers = () => {
    const pages = [];
    const visibleRange = 3; // Number of visible pages before and after the current page

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > visibleRange + 1) {
        pages.push(1, "...");
      }

      const start = Math.max(1, currentPage - visibleRange);
      const end = Math.min(totalPages, currentPage + visibleRange);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - visibleRange) {
        pages.push("...", totalPages);
      }
    }

    return pages;
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

      {/* Page Numbers */}
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && setCurrentPage(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-gray-300 text-black font-semibold"
              : typeof page === "number"
              ? "text-blue-600 hover:text-blue-800"
              : "text-gray-500"
          }`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}

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
