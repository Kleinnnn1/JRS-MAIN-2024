import PropTypes from "prop-types";

export default function ProfileInformationBox({ children }) {
  return (
    <div className="relative border border-black h-[80vh] w-[100vh] relative m-10">
    {children}
  </div>
  );
}

// Define PropTypes for the component
ProfileInformationBox.propTypes = {
  children: PropTypes.node, // `children` can be any node (string, element, etc.)
};
