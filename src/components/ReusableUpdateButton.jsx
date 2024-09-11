import PropTypes from "prop-types";

export default function ReusableUpdateButton({ onClick }) {
  return (
    <button
      className="bg-blue-400 text-white px-3 py-1 text-lg font-medium text-center rounded-lg"
      onClick={onClick}
    >
      Update
    </button>
  );
}

// Define PropTypes for the component
ReusableUpdateButton.propTypes = {
  onClick: PropTypes.func, // onClick is optional and should be a function
};
