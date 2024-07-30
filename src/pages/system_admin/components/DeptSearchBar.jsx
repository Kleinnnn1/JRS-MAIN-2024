export default function DepartmentSearchBar({ title, showInput, inputProps = {} }) {
    return (
      <div className="flex items-center justify-between min-h-20 sticky top-0 left-0">
        <div className='bg-blue-500 h-10 flex items-center text-white font-bold px-4 ml-10 rounded'>
                ADD NEW DEPARTMENT
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
         <div className='bg-blue-500 h-10 flex items-center text-white font-bold px-4 mr-10  ml-2 rounded'>
                Search
                </div>
        </div>
      </div>
    );
  }
  