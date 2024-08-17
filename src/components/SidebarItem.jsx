import PropTypes from "prop-types";

export default function SidebarItem({ name, onClick, image }) {
  return (
    <div
      onClick={onClick}
      className="group-[.active]:bg-blue-950 group-[.active]:text-white cursor-pointer flex items-center py-2 px-4 my-2 text-gray-300 hover:bg-blue-980 hover:text-gray-100 rounded-md"
    >
      <img src={image} alt={`${name} Icon`} className="w-4 h-4 mr-3" />
      <span className="text-sm">{name}</span>
    </div>
  );
}

// Define PropTypes for the component
SidebarItem.propTypes = {
  name: PropTypes.string.isRequired, // name is required and should be a string
  onClick: PropTypes.func, // onClick is optional and should be a function
  image: PropTypes.string, // image is required and should be a string
};
