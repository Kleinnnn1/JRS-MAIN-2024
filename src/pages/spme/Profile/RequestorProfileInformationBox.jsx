import PropTypes from "prop-types";

export default function RequestorProfileInformationBox({ children }) {
  return <div className=" h-[60vh] w-[100vh] relative">{children}</div>;
}

// Define PropTypes for the component
RequestorProfileInformationBox.propTypes = {
  children: PropTypes.node, // `children` can be any node (string, element, etc.)
};
