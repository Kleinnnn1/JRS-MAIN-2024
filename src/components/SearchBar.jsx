import PropTypes from "prop-types";

export default function SearchBar({ title, showInput, inputProps = {} }) {
  return (
    <div className="my-4 mx-3 py-2 px-4 bg-blue-950 flex items-center min-h-20 shadow-md shadow-black/5 sticky top-0 left-0 z-30 rounded-xl">
      <div className="flex flex-col flex-grow">
        <span className="text-white text-2xl font-bold">{title}</span>
        <span className="text-white text-xs mt-1">23/07/2024</span>
      </div>
      {showInput && (
        <input
          type="text"
          placeholder="Search..."
          className="ml-4 py-1 px-3 rounded border border-gray-300 text-black w-64"
          {...inputProps}
        />
      )}
    </div>
  );
}

// Define PropTypes for the component
SearchBar.propTypes = {
  title: PropTypes.string.isRequired, // title is required and should be a string
  showInput: PropTypes.bool, // showInput is optional and should be a boolean
  inputProps: PropTypes.object, // inputProps is optional and should be an object
};
