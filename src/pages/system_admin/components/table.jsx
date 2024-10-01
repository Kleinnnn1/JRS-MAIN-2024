import PropTypes from "prop-types";

export default function Table({
  rows = 10,
  columns = 6,
  content = [],
  headers = [],
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
          className="w-20 px-2 h-12  text-left text-sm"
          style={{ minWidth: "80px", minHeight: "48px" }} // Optional inline styles
        >
          {cellContent}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="m-2 px-2">
      <table className="min-w-full max-w-md divide-y divide-black-200 shadow-2xl border border-black">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }, (_, colIndex) => (
              <th
                key={colIndex}
                className="w-20 h-12 px-4 py-2 text-left text-sm text-gray-500"
                style={{ minWidth: "80px", minHeight: "48px" }} // Optional inline styles
              >
                {headers[colIndex]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{tableRows}</tbody>
      </table>
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
};
