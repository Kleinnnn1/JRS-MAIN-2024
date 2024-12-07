import PropTypes from "prop-types";

export default function Table({
  content = [],
  headers = [],
  loading = false,
}) {
  if (content.length === 0 && !loading) {
    return (
      <div className="text-center py-4 text-gray-500">
        No Data Available
      </div>
    );
  }

  const tableRows = content.map((rowContent, rowIndex) => (
    <tr key={rowIndex} className="border-b hover:bg-gray-100">
      {rowContent.map((cellContent, colIndex) => (
        <td
          key={colIndex}
          className="px-4 py-2 text-left text-sm text-gray-600"
          style={{ minWidth: "80px", minHeight: "48px" }}
        >
          {cellContent}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-yellow-100">
            <tr>
              {headers.map((header, colIndex) => (
                <th
                  key={colIndex}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-800"
                  style={{ minWidth: "80px" }}
                >
                  {header || `Header ${colIndex + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      )}
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node]))
  ),
  loading: PropTypes.bool,
};
