export default function ReportTab() {
    return (
      <div className=" flex justify-center mt-20">
        <table >
          <thead className="bg-yellow-300 h-10 text-center ">
            <tr className="border border-black">
              <th className="p-3 border border-black">No of Employees</th>
              <th className="p-3  border border-black">No of Pending Requests</th>
              <th className="p-3  border border-black">No of Ongoing Requests</th>
              <th className="p-3  border border-black">No of Completed Requests</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>100</td> {/* Example value */}
              <td style={{ border: '1px solid black', padding: '8px' }}>10</td>  {/* Example value */}
              <td style={{ border: '1px solid black', padding: '8px' }}>5</td>   {/* Example value */}
              <td style={{ border: '1px solid black', padding: '8px' }}>20</td>  {/* Example value */}
            </tr>
      
          </tbody>
        </table>
      </div>
    );
  }
  