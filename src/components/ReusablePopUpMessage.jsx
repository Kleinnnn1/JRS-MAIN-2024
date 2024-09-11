import PropTypes from "prop-types";
import ReusableButton from "./ReusableButton";

export default function ReusablePopUpMessage({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p>{message}</p>
        <div className="flex justify-center space-x-4">
          <ReusableButton bgColor="bg-green-300" onClick={onClose}>
            Confirm
          </ReusableButton>
          <ReusableButton bgColor="bg-red-300" onClick={onClose}>
            Cancel
          </ReusableButton>
        </div>
      </div>
    </div>
  );
}

ReusablePopUpMessage.PropTypes = {
  message: PropTypes.string.isRequired, // message is required and should be a string
  onClose: PropTypes.func.isRequired, // onClose is required and should be a function
};
