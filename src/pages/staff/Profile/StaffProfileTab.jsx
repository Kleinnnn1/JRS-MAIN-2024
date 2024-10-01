import PropTypes from "prop-types";

export default function ProfileTabs({ name, onClick }) {
  return (
    <div
      className="text-right cursor-pointer"
      onClick={onClick} // Attach the onClick handler
    >
      <p className="text-base text-black mb-3">{name}</p>
    </div>
  );
}

// Define PropTypes for the component
ProfileTabs.propTypes = {
  name: PropTypes.string.isRequired, // 'name' is required and should be a string
  onClick: PropTypes.func, // 'onClick' is optional and should be a function
};
