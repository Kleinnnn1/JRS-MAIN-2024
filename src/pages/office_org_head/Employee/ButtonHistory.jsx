import PropTypes from "prop-types";

export default function ReusableHistoryButton({ onClick }) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-white text-sm font-medium text-center rounded-lg bg-blue-400 text-white mr-2`}
      onClick={onClick}
    >
      History
    </button>
  );
}

// Define PropTypes for the component
ReusableHistoryButton.propTypes = {
  onClick: PropTypes.func, // Optional function for button click
};
