import PropTypes from "prop-types";

// Helper function to format the date as "Month Day, Year Weekday"
const formatDate = () => {
  const currentDate = new Date();
  
  // Use toLocaleDateString to get the desired format
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
};

export default function SearchBar({ title, showInput, inputProps = {} }) {
  return (
    <div className="my-4 mx-3 py-2 px-4 bg-custom-blue rounded-xl overflow-hidden">
      <div className="flex flex-col flex-grow">
        <span className="text-white text-2xl font-bold truncate">{title}</span>
        <span className="text-white text-xs mt-1">{formatDate()}</span> {/* Current date in desired format */}
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
