import PropTypes from "prop-types"; // Import PropTypes

export default function ReusableSearchTerm({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex "> {/* Adjusted text size to 10px */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border text-[10px] px-2 border-gray-300 py-2.5 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
      />
      <button className="bg-yellow-100 px-2 text-[10px] text-black py-2 rounded-r-md hover:bg-yellow-600">
        Search
      </button>
    </div>
  );
}

// Define prop types for validation
ReusableSearchTerm.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
