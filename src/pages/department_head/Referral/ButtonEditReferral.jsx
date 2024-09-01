import PropTypes from "prop-types";

export default function ButtonEditReferral({ onClick }) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm font-medium text-center rounded-lg bg-blue-400 text-white mr-2`}
      onClick={onClick}
    >
      Edit
    </button>
  );
}

// Define PropTypes for the component
ButtonEditReferral.propTypes = {
  onClick: PropTypes.func, // Optional function for button click
};
