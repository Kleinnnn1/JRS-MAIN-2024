import PropTypes from "prop-types";

export default function ProfileInformationBox({ children }) {
  return (
    <div className="relative border border-black h-[60vh] w-[100vh] relative">
      {children}
    </div>
  );
}

// Define PropTypes for the component
ProfileInformationBox.propTypes = {
  children: PropTypes.node, // `children` can be any node (string, element, etc.)
};
