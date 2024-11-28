import PropTypes from "prop-types";

export default function SendReportButton({
  marginRight,
  marginLeft,
  margin,
  border, 
  onClick,
  bgColor = "bg-green-500 text-white hover:bg-green-600",
}) {
  return (
    <button
      type="button"
      className={`px-4 py-1 text-sm font-medium text-center rounded-lg ${bgColor} ${marginLeft} ${marginRight} ${border} ${margin}`}
      onClick={onClick}
    >
      Send Report
    </button>
  );
}

// Define PropTypes for the component
SendReportButton.propTypes = {
  marginRight: PropTypes.string, // Optional string for right margin
  marginLeft: PropTypes.string, // Optional string for left margin; default value provided
  margin: PropTypes.string, // Optional string for left margin; default value provided
  border: PropTypes.string, // Optional string for border style; default value provided
  onClick: PropTypes.func, // Optional function for button click
  bgColor: PropTypes.string, // Optional string for background color
};
