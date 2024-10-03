import PropTypes from "prop-types";

export default function StatusCard({ title, count, bgColor, onClick }) {
  return (
    <div
      className={`${bgColor} border-gray-100 p-5 shadow-md shadow-black/60 transition-transform duration-300 hover:shadow-lg hover:shadow-black/60 flex flex-col justify-between w-full cursor-pointer transform hover:scale-105 rounded-lg`} // Added rounded-lg class
      onClick={onClick}
    >
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-2xl self-end">{count}</div>
    </div>
  );
}

// Define PropTypes for the component
StatusCard.propTypes = {
  title: PropTypes.string.isRequired, // title is required and should be a string
  count: PropTypes.number.isRequired, // count is required and should be a number
  bgColor: PropTypes.string, // bgColor is optional and should be a string
  onClick: PropTypes.func, // onClick is optional and should be a function
};
