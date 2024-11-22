import PropTypes from "prop-types";
import { FaBeer } from 'react-icons/fa'; // Example icon from react-icons

export default function StatusCard({ title, count, bgColor, onClick, icon, titleColor, iconColor }) {
  return (
    <div
      className={`${bgColor} border-gray-100 p-5 shadow-md shadow-black/20 transition-transform duration-300 hover:shadow-lg hover:shadow-black/60 flex flex-col justify-between w-full cursor-pointer transform hover:scale-105 rounded-lg`} 
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        {/* Title with dynamic text color */}
        <div className={`text-xl opacity-90 ${titleColor ? titleColor : 'text-black'}`}>{title}</div>
        {/* Icon with dynamic color */}
        {icon && (
          <div className={`ml-auto text-2xl opacity-50 ${iconColor ? iconColor : 'text-gray-500'}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="text-4xl font-semibold mt-5">{count}</div>
    </div>
  );
}

// Define PropTypes for the component
StatusCard.propTypes = {
  title: PropTypes.string.isRequired, // title is required and should be a string
  count: PropTypes.number.isRequired, // count is required and should be a number
  bgColor: PropTypes.string, // bgColor is optional and should be a string
  onClick: PropTypes.func, // onClick is optional and should be a function
  icon: PropTypes.node, // icon is optional and can be any React node (e.g., JSX or component)
  titleColor: PropTypes.string, // titleColor is optional and should be a string for text color
  iconColor: PropTypes.string, // iconColor is optional and should be a string for the icon's color
};
