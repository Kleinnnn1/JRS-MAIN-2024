import PropTypes from "prop-types";

export default function StatusCard({
  title,
  count,
  bgColor = "bg-white",
  subText,
  onClick,
  icon,
  titleColor = "text-gray-800",
  iconColor = "text-gray-400",
  gridSpan = "lg:col-span-1", // Default grid span, can be overridden
}) {
  return (
    <div
      className={`flex flex-col justify-center items-center ${bgColor} p-6 shadow-lg rounded-lg shadow-black/2 hover:shadow-sm hover:shadow-black/20 transform hover:scale-105 cursor-pointer transition-transform duration-300 ${gridSpan}`}
      onClick={onClick}
    >
      {/* Count and Icon Section */}
      <div className="flex items-center justify-center space-x-2">
        <div className="text-3xl font-bold">
          {count}
        </div>
        {icon && (
          <div className={`text-2xl ${iconColor}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Title and Subtext */}
      <div className="text-center mt-4">
        <div className={`text-lg ${titleColor} font-medium`}>
          {title}
        </div>
        {subText && (
          <div className="text-sm text-gray-500 mt-1">
            {subText}
          </div>
        )}
      </div>
    </div>
  );
}

StatusCard.propTypes = {
  title: PropTypes.string.isRequired, // Title of the card
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Main count
  subText: PropTypes.string, // Optional subtext (e.g., "+20.1% from last month")
  bgColor: PropTypes.string, // Background color for the card
  onClick: PropTypes.func, // Click handler
  icon: PropTypes.node, // Optional icon
  titleColor: PropTypes.string, // Color for the title
  iconColor: PropTypes.string, // Color for the icon
  gridSpan: PropTypes.string, // Optional grid span to control how much space it takes
};
