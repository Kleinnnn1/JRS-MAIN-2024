import PropTypes from 'prop-types';

const DropdownButton = ({ options }) => {
  return (
    <div className="relative inline-block">
      <select
        aria-label="Select an option"
        className="form-select rounded-lg bg-sky-200 text-gray-800 focus:outline-none mx-4 p-2 transition duration-5s ease-in-out hover:bg-sky-300"
      >
        <option value="" disabled selected>
          Select an option...
        </option>
        {options.map(({ value, label }, index) => (
          <option key={index} value={value} className="bg-white">
            {label}
          </option>
        ))}
      </select>
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5H7z" />
        </svg>
      </span>
    </div>
  );
};

// PropTypes remain the same
DropdownButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropdownButton;
