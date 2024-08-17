import PropTypes from "prop-types";

export default function ButtonAddEmployee({ onClick }) {
  return (
    <button
      className={`bg-blue-400 text-white px-3 py-1 text-lg font-medium text-center rounded-lg`}
      onClick={onClick}
    >
      Add Employee
    </button>
  );
}

// Define PropTypes for the component
ButtonAddEmployee.propTypes = {
  onClick: PropTypes.func, // marginRight is optional and should be a string
};
