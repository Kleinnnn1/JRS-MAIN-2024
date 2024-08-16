import PropTypes from "prop-types";
export default function ReusableAssignButton({ onClick, marginRight }) {
  return (
    <button
      className={` ${marginRight} bg-blue-400 text-white  px-3  py-1 text-lg font-medium text-center rounded-lg`}
      onClick={onClick}
    >
      Assign
    </button>
  );
}

ReusableAssignButton.propTypes = {
  onClick: PropTypes.func, // onClick is optional
  marginRight: PropTypes.string,
};
