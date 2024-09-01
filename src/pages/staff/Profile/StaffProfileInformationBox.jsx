import PropTypes from "prop-types";

export default function ProfileInformationBox({ children }) {
  return (
    <div className="relative border h-[60vh] w-[105vh] relative border-gray-300 rounded-lg shadow-md bg-white">
      {children}
    </div>
  );
}

// Define PropTypes for the component
ProfileInformationBox.propTypes = {
  children: PropTypes.node, // `children` can be any node (string, element, etc.)
};
