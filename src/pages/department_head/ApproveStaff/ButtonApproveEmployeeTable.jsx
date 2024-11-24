import PropTypes from "prop-types";

export default function ButtonApproveEmployeeTable({
  marginRight,
  marginLeft,
  margin = "m-2",
  border = "",
  bgColor1 = "bg-green-500 text-white hover:bg-green-600", // Set default green background color
  bgColor2 = "bg-red-500 text-white hover:bg-green-600", // Set default red background color
}) {
  return (
  <div>
    <button
      type="button"
      className={`px-1 py-1 text-sm font-medium text-center rounded-md ${bgColor1} ${marginLeft} ${marginRight} ${border} ${margin}`}
    >
      Approve All
    </button>
    <button
      type="button"
      className={`px-1 py-1 text-sm font-medium text-center rounded-md ${bgColor2} ${marginLeft} ${marginRight} ${border} ${margin}`}
    >
      Decline All
    </button>
    </div>
  );
}

// Define PropTypes for the component
ButtonApproveEmployeeTable.propTypes = {
  marginRight: PropTypes.string, // Optional string for right margin
  marginLeft: PropTypes.string, // Optional string for left margin; default value provided
  margin: PropTypes.string, // Optional string for margin; default value provided
  border: PropTypes.string, // Optional string for border style; default value provided
  onClick: PropTypes.func, // Optional function for button click
  bgColor: PropTypes.string, // Optional string for background color
};
