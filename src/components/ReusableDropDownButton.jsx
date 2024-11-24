import PropTypes from "prop-types";
import { useState } from "react";

const DropdownButton = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(""); // Manage the selected state

  const handleChange = (e) => {
    setSelectedOption(e.target.value); // Update the state on change
  };

  return (
    <div className="relative inline-block">
      <select
        aria-label="Select an option"
        value={selectedOption} // Use value prop to control the selected option
        onChange={handleChange} // Handle change to update the selected state
        className="form-select rounded-lg bg-sky-200 text-gray-800 focus:outline-none mx-0 p-2 transition duration-5s ease-in-out hover:bg-sky-300"
      >
        <option value="" disabled className="hidden">
          Select an option...
        </option>
        {options.map(({ value, label }, index) => (
          <option key={index} value={value} className="bg-white">
            {label}
          </option>
        ))}
      </select>
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

// import PropTypes from "prop-types";

// const DropdownButton = ({ options }) => {
//   return (
//     <div className="relative inline-block">
//       <select
//         aria-label="Select an option"
//         className="form-select rounded-lg bg-sky-200 text-gray-800 focus:outline-none mx-0 p-2 transition duration-5s ease-in-out hover:bg-sky-300"
//       >
//         <option value="" disabled selected>
//           Select an option...
//         </option>
//         {options.map(({ value, label }, index) => (
//           <option key={index} value={value} className="bg-white">
//             {label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// // PropTypes remain the same
// DropdownButton.propTypes = {
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default DropdownButton;
