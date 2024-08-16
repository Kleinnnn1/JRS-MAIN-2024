import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ReusableBackButton({ marginRight }) {
  const navigate = useNavigate();
  return (
    <button
      className={`bg-blue-400 text-white px-3 ${marginRight} py-1 text-lg font-medium text-center rounded-lg`}
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
}

// Define PropTypes for the component
ReusableBackButton.propTypes = {
  marginRight: PropTypes.string, // marginRight is optional and should be a string
};
