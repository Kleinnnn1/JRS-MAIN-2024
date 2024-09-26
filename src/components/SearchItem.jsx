import PropTypes from 'prop-types';

const SearchItem = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:outline-none text-black"
        placeholder="Search..."
        aria-label="Search Job Requests"
      />
    </div>
  );
};

SearchItem.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchItem;
