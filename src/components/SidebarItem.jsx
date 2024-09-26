import PropTypes from 'prop-types';

export default function SidebarItem({ name, onClick, image, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center py-2 px-4 my-2 cursor-pointer rounded-md ${
        isActive ? 'bg-custom-blue text-white font-bold' : 'text-gray-300 hover:bg-blue-980 hover:bg-yellow-600'
      }`}
    >
      <img src={image} alt={`${name} Icon`} className="w-4 h-4 mr-3" />
      <span className="ml-2 hidden md:block">{name}</span>
    </div>
  );
}

// Define PropTypes for the component
SidebarItem.propTypes = {
  name: PropTypes.string.isRequired, // name is required and should be a string
  onClick: PropTypes.func.isRequired, // onClick is required and should be a function
  image: PropTypes.string.isRequired, // image is required and should be a string
  isActive: PropTypes.bool // isActive is optional and should be a boolean
};
