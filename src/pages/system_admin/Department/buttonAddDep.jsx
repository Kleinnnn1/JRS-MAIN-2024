import PropTypes from "prop-types";

export default function ButtonAddDepartment({ onClick }) {
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2  rounded-md`}

      onClick={onClick}
    >
      Add Department Name
    </button>
  );
}

// Define PropTypes for the component
ButtonAddDepartment.propTypes = {
  onClick: PropTypes.func, // marginRight is optional and should be a string
};

