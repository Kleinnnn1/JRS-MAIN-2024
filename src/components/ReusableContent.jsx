import PropTypes from "prop-types";

export default function ReusableContent({ children }) {
  return (
    <div className=" bg-white-300 m-4 p-10 h-[76vh] rounded-lg shadow-lg relative border border-black">
      {children}
    </div>
  );
}

// Define PropTypes for the component
ReusableContent.propTypes = {
  children: PropTypes.node.isRequired, // children is required and can be any renderable content
};
