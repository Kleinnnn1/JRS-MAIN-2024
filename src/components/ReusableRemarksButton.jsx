import PropTypes from "prop-types";

export default function ReusableRemarksButton({ onClick, marginRight }) {
  return (
    <button
      className={` ${marginRight} bg-blue-400 text-white  px-3  py-1 text-lg font-medium text-center rounded-lg`}
      onClick={onClick}
    >
      Remarks
    </button>
  );
}

ReusableRemarksButton.propTypes = {
  onClick: PropTypes.func,
  marginRight: PropTypes.string,
};
