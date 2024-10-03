import PropTypes from "prop-types";

export default function SidebarItem({ name, onClick, image, bold }) {
  return (
    <div
      onClick={onClick}
      className={`group-[.active]:bg-custom-blue group-[.active]:text-white cursor-pointer flex items-center py-2 px-4 my-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-100 rounded-md ${
        bold ? "font-bold" : "font-normal"
      }`}
    >
      <img src={image} alt={name} className="w-6 h-6" />
      <span className="ml-2 hidden md:block">{name}</span>
    </div>
  );
}

// Define PropTypes for the component
SidebarItem.propTypes = {
  name: PropTypes.string.isRequired, // name is required and should be a string
  onClick: PropTypes.func, // onClick is optional and should be a function
  image: PropTypes.string, // image is required and should be a string
};
