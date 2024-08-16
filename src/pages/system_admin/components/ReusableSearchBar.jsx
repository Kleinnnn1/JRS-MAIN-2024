import PropTypes from 'prop-types';

export default function ReusableSearchBar({ ButtonTitle, showInput, inputProps = {} }) {
  return (
    <div className="flex items-center justify-between min-h-20 sticky top-0 left-0 bg-white shadow">
      <div className="bg-blue-500 h-9 flex items-center text-white font-bold px-4 ml-10 rounded">
        {ButtonTitle}
      </div>
      <div className="flex items-center">
        {showInput && (
          <input
            type="text"
            placeholder="Search..."
            className="ml-4 py-1 px-3 rounded border border-gray-300 text-black w-64"
            {...inputProps}
          />
        )}
        <div className="bg-blue-500 h-10 flex items-center border text-white font-bold px-4 mr-10 ml-2 rounded">
          Search
        </div>
      </div>
    </div>
  );
}

ReusableSearchBar.propTypes = {
  ButtonTitle: PropTypes.string.isRequired,
  showInput: PropTypes.bool,
  inputProps: PropTypes.object,
};

ReusableSearchBar.defaultProps = {
  showInput: true,
  inputProps: {},
};
