import PropTypes from "prop-types";

export default function ButtonApproveCertificate({ onClick, marginRight }) {
  return (
    <button
      className={`bg-green-400 text-white px-3 ${marginRight} py-1 text-lg font-medium text-center rounded-lg`}
      onClick={onClick}
    >
      Mark as Completed 
    </button> //direct sa complted page
  );
}

ButtonApproveCertificate.propTypes = {
  onClick: PropTypes.func,
  marginRight: PropTypes.string,
};
