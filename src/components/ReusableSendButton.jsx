import PropTypes from "prop-types";

export default function ReusableSendButton({ onClick, marginRight }) {
  return (
    <button
      className={`bg-blue-400 text-white px-3 ${marginRight} py-1 text-lg font-medium text-center rounded-lg`}
      onClick={onClick}
    >
      Send
    </button>
  );
}

ReusableSendButton.propTypes = {
  onClick: PropTypes.func,
  marginRight: PropTypes.string,
};
