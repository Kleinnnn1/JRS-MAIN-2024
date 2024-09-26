import PropTypes from "prop-types";

export default function Table({
  rows = 2,
  columns = 6,
  content = [],
  headers = [],
  loading = false, // Add loading state as a prop
}) {
  // Fill the content array with empty strings if not enough data is provided
  const filledContent = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) =>
      content[rowIndex] && content[rowIndex][colIndex] !== undefined
        ? content[rowIndex][colIndex]
        : ""
    )
  );

  const tableRows = filledContent.map((rowContent, rowIndex) => (
    <tr key={rowIndex} className="border-b">
      {rowContent.map((cellContent, colIndex) => (
        <td
          key={colIndex}
          className="px-4 py-2 text-left text-sm text-gray-600"
          style={{ minWidth: "80px", minHeight: "48px" }} // Optional inline styles
        >
          {cellContent}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="m-2 px-2">
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div> // Show loading state
      ) : content.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No Data Available</div> // Show empty state
      ) : (
        <table className="min-w-full max-w-md divide-y divide-black-200 shadow-2xl border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {Array.from({ length: columns }, (_, colIndex) => (
                <th
                  key={colIndex}
                  className="w-20 h-12 px-4 py-2 text-left text-sm font-medium text-gray-600"
                  style={{ minWidth: "80px", minHeight: "48px" }} // Optional inline styles
                >
                  {headers[colIndex] || `Header ${colIndex + 1}`} {/* Fallback header text */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">{tableRows}</tbody>
        </table>
      )}
    </div>
  );
}

Table.propTypes = {
  rows: PropTypes.number, // rows is optional and should be a number
  columns: PropTypes.number, // columns is optional and should be a number
  content: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string, // Each cell can be a string
        PropTypes.element, // Or it can be a React element (like a button)
      ])
    )
  ),
  headers: PropTypes.arrayOf(PropTypes.string), // headers should be an array of strings
  loading: PropTypes.bool, // Optional loading prop
};
