import PropTypes from "prop-types";

export default function PageTitle({ name, padx, pady }) {
  return (
    <p className={`font-bold text-xl ${pady} ${padx} font-inter`}>{name}</p>
  );
}

// Define PropTypes for the component
PageTitle.propTypes = {
  name: PropTypes.string.isRequired, // name is required and should be a string
  padx: PropTypes.string, // padx should be a string representing Tailwind padding classes
  pady: PropTypes.string, // pady should be a string representing Tailwind padding classes
};
