import PropTypes from "prop-types";

export default function HistoryCard({ title, count, year, bgColor, onClick }) {
  return (
    <div
      className={`${bgColor} border-gray-100 p-5 shadow-md shadow m-4 w-96 h-48 cursor-pointer`}
      onClick={onClick}
    >
      <div>
        <div className="text-2xl font-semibold">{title}</div>
        <br />
        <div className="text-lg ">{year}</div>
      </div>
      <br />

      <div className="text-2xl font-semibold">{count}</div>
    </div>
  );
}

// Define PropTypes for the component
HistoryCard.propTypes = {
  title: PropTypes.string.isRequired, // title is required and should be a string
  count: PropTypes.number.isRequired, // count is required and should be a number
  bgColor: PropTypes.string, // bgColor is optional and should be a string
  year: PropTypes.number,
  onClick: PropTypes.func,
};
