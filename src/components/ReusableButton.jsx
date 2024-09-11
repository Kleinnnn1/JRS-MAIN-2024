import PropTypes from "prop-types";

export default function ReusableButton({
  onClick,
  className,
  children,
  bgColor,
  marginLeft,
  marginRight,
  shadow,
  border,
  textColor,
}) {
  return (
    <button
      type="button"
      className={`inline-flex ${textColor} items-center px-3 py-1 text-sm font-medium text-center rounded-lg ${bgColor} ${marginLeft} ${marginRight} ${className} ${shadow} ${border}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Define PropTypes for the component
ReusableButton.propTypes = {
  onClick: PropTypes.func, // Optional function
  className: PropTypes.string, // Optional string
  children: PropTypes.node, // Optional, can be any renderable content
  bgColor: PropTypes.string, // Optional string for background color
  marginLeft: PropTypes.string, // Optional string for left margin
  marginRight: PropTypes.string, // Optional string for right margin
  shadow: PropTypes.string, // Optional string for shadow style
  border: PropTypes.string, // Optional string for border style
  textColor: PropTypes.string, // Optional string for text color
};
