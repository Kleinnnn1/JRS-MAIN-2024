import PropTypes from "prop-types";

export default function ReusableNextButton({
  marginRight,
  marginLeft,
  border = "border border-black",
  onClick,
  bgColor,
}) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm font-medium text-center rounded-lg ${bgColor} ${marginLeft} ${marginRight} ${border}`}
      onClick={onClick}
    >
      Next
    </button>
  );
}

// Define PropTypes for the component
ReusableNextButton.propTypes = {
  marginRight: PropTypes.string, // Optional string for right margin
  marginLeft: PropTypes.string, // Optional string for left margin
  border: PropTypes.string, // Optional string for border style
  onClick: PropTypes.func, // Optional function for button click
  bgColor: PropTypes.string, // Optional string for background color
};
