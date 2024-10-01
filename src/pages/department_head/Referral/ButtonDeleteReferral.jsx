import PropTypes from "prop-types";

export default function ButtonDeleteReferral({ onClick }) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm font-medium text-center rounded-lg bg-yellow-400 text-white mr-2`}
      onClick={onClick}
    >
      Delete
    </button>
  );
}

// Define PropTypes for the component
ButtonDeleteReferral.propTypes = {
  onClick: PropTypes.func, // Optional function for button click
};
