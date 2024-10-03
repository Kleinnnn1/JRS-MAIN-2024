import PropTypes from "prop-types";

// Helper function to format the date as "Month Day, Year Weekday"
const formatDate = () => {
  const currentDate = new Date();

  // Use toLocaleDateString to get the desired format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return currentDate.toLocaleDateString("en-US", options);
};

export default function SearchBar({ title, inputProps = {} }) {
  return (
    <div className="my-2 mx-3 py-2 px-2 bg-custom-blue flex items-center rounded-lg">
      <div className="flex flex-col flex-grow">
        <span className="text-white text-2xl font-bold">{title}</span>
        <span className="text-white text-xs mt-1">{formatDate()}</span>
      </div>
    </div>
  );
}

// Define PropTypes for the component
SearchBar.propTypes = {
  title: PropTypes.string.isRequired, // title is required and should be a string
  showInput: PropTypes.bool, // showInput is optional and should be a boolean
  inputProps: PropTypes.object, // inputProps is optional and should be an object
};
