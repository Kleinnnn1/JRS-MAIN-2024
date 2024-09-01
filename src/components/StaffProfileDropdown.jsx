import PropTypes from "prop-types";

export default function MyProfileDropdown({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="bg-yellow-400 text-lg text-gray-900 py-2 px-4 rounded-md border-none focus:ring-0 focus:outline-none hover:bg-yellow-500 transition-colors duration-300 ease-in-out"
    >
      Logout
    </button>
  );
}

// Define PropTypes for the component
MyProfileDropdown.propTypes = {
  onLogout: PropTypes.func.isRequired, // onLogout is required and should be a function
};
