import PropTypes from "prop-types";

export default function ContentAndHeader({ children, content }) {
  return (
    <div className="h-[60vh] w-[100vh]">
      <div className="text-black  border-b w-[95%] mx-auto">
        <div className="font-bold text-2xl pt-4 ">Profile Account</div>
        {children}
      </div>
      <div>{content}</div>
    </div>
  );
}

// Define PropTypes for the component
ContentAndHeader.propTypes = {
  children: PropTypes.node, // `children` can be any node (string, element, etc.)
  content: PropTypes.node,
};
