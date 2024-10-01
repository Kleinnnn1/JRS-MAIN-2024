import PropTypes from "prop-types";

export default function ButtonAddDepartment({ onClick }) {
  return (
    <button
      className={`bg-blue-500 text-white m-5 px-3 py-1 text-md font-medium text-center rounded-lg`}
      onClick={onClick}
    >
      Add Department
    </button>
  );
}

// Define PropTypes for the component
ButtonAddDepartment.propTypes = {
  onClick: PropTypes.func, // marginRight is optional and should be a string
};
