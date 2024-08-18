import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ReusableSearchBar({ route, ButtonTitle, showInput, inputProps = {}, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call custom onClick handler if provided
    } else {
      navigate(route); // Navigate if no custom onClick handler is provided
    }
  };

  return (
    <div className="flex items-center justify-between min-h-20 sticky top-0 left-0 bg-white shadow">
      <button
        className="bg-blue-500 h-9 flex items-center text-white  px-4 ml-10 rounded"
        onClick={handleClick}
      >
        {ButtonTitle}
      </button>
      <div className="flex items-center">
        {showInput && (
          <input
            type="text"
            placeholder="Search..."
            className="ml-4 py-1 px-3 rounded border border-gray-300 text-black w-64"
            {...inputProps}
          />
        )}
        <div className="bg-blue-500 h-10 flex items-center border text-white  px-4 mr-10 ml-2 rounded">
          Search
        </div>
      </div>
    </div>
  );
}

ReusableSearchBar.propTypes = {
  route: PropTypes.string,
  ButtonTitle: PropTypes.string.isRequired,
  showInput: PropTypes.bool,
  inputProps: PropTypes.object,
  onClick: PropTypes.func, // Add prop type for onClick
};

ReusableSearchBar.defaultProps = {
  route: '', // Default route as empty string if not provided
  showInput: true,
  inputProps: {},
  onClick: null, // Default to null if no onClick handler is provided
};
