import PropTypes from "prop-types";

export default function DropdownButton({ options }) {
  return (
    <select className={`form-select rounded-lg bg-green-200 ml-4 mr-4 p-1`}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Define PropTypes for the component
DropdownButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // value is a required string
      label: PropTypes.string.isRequired, // label is a required string
    })
  ).isRequired,
};
