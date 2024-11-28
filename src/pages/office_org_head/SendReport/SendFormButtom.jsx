import PropTypes from "prop-types";
export default function SendFormButton({ onClick }) {
  return (
    <button
      className={`bg-blue-400 text-white px-3 py-1 text-lg font-medium text-center rounded-lg ml-4`}
      onClick={onClick}
    >
      Send
    </button>
  );
}

// Define PropTypes for the component
SendFormButton.propTypes = {
  onClick: PropTypes.func, // marginRight is optional and should be a string
};
