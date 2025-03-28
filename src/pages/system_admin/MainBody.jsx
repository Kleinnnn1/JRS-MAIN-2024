import PropTypes from "prop-types";

export default function MainBody({ children }) {
  return (
    <main className="ml-20 sm:ml-64 bg-gray-300 min-h-screen transition-all">
      {children}
    </main>
  );
}

// Define PropTypes for the component
MainBody.propTypes = {
  children: PropTypes.node, // children can be any valid React node
};
