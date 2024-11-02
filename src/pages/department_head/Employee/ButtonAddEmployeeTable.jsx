import PropTypes from "prop-types";

export default function ButtonAddEmployeeTable({
  marginRight,
  marginLeft,
  margin = "m-2",
  border = "",
  onClick,
  bgColor = "bg-green-500 text-white hover:bg-green-600", // Set default green background color
}) {
  return (
    <button
      type="button"
      className={`px-5 py-2 text-sm font-medium text-center rounded-lg ${bgColor} ${marginLeft} ${marginRight} ${border} ${margin}`}
      onClick={onClick}
    >
      Add Staff
    </button>
  );
}

// Define PropTypes for the component
ButtonAddEmployeeTable.propTypes = {
  marginRight: PropTypes.string, // Optional string for right margin
  marginLeft: PropTypes.string, // Optional string for left margin; default value provided
  margin: PropTypes.string, // Optional string for margin; default value provided
  border: PropTypes.string, // Optional string for border style; default value provided
  onClick: PropTypes.func, // Optional function for button click
  bgColor: PropTypes.string, // Optional string for background color
};
