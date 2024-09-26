import { useState, useEffect } from "react";

export default function JobRequestHistory() {
  const [jobRequests, setJobRequests] = useState([
    {
      requestId: "REQ123",
      requestor: "Karen C. Cadalo",
      workDescription: "Fixing computer issues in Room 101",
      category: "IT Support",
      noOfPerson: 2,
      department: "IT Department",
      processedBy: "John Doe",
      photo: "https://via.placeholder.com/150", // Placeholder image URL for now
      status: "Completed",
      dateRequested: "2024-09-01",
      dateCompleted: "2024-09-03",
    },
    {
      requestId: "REQ124",
      requestor: "Mark Smith",
      workDescription: "Room cleaning service for conference hall",
      category: "Maintenance",
      noOfPerson: 3,
      department: "Facilities",
      processedBy: "Jane Doe",
      photo: "https://via.placeholder.com/150", // Placeholder image URL for now
      status: "Pending",
      dateRequested: "2024-09-05",
      dateCompleted: "-",
    },
    {
      requestId: "REQ125",
      requestor: "Emily Davis",
      workDescription: "Set up projectors and sound systems",
      category: "Event Support",
      noOfPerson: 5,
      department: "AV Department",
      processedBy: "Michael Brown",
      photo: "https://via.placeholder.com/150", // Placeholder image URL for now
      status: "In Progress",
      dateRequested: "2024-09-07",
      dateCompleted: "-",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(jobRequests);

  useEffect(() => {
    // Filter job requests based on the search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = jobRequests.filter((job) =>
      job.requestor.toLowerCase().includes(lowerCaseQuery) ||
      job.workDescription.toLowerCase().includes(lowerCaseQuery) ||
      job.status.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRequests(filtered);
  }, [searchQuery, jobRequests]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewClick = (requestId) => {
    // Add functionality to handle when "View" is clicked
    alert(`Viewing details for Request ID: ${requestId}`);
  };

  return (
    <div className="my-4 mx-3 py-2 px-4 bg-white shadow-md rounded-lg">
      {/* Table Header */}
      <div className="bg-blue-950 py-2 px-4 flex justify-between items-center rounded-t-lg">
        <h1 className="text-xl font-bold text-white">Job Request History</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 rounded border border-gray-300"
          />
          <button className="bg-yellow-500 p-2 rounded text-white">Search</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-2">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Request ID</th>
              <th className="py-3 px-6 text-left">Requestor</th>
              <th className="py-3 px-6 text-left">Work Description</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">No. of Person</th>
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Processed by</th>
              <th className="py-3 px-6 text-left">Photo</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date Requested</th>
              <th className="py-3 px-6 text-left">Date Completed</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4">
                  No matching results found
                </td>
              </tr>
            ) : (
              filteredRequests.map((job, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{job.requestId}</td>
                  <td className="py-3 px-6 text-left">{job.requestor}</td>
                  <td className="py-3 px-6 text-left">{job.workDescription}</td>
                  <td className="py-3 px-6 text-left">{job.category}</td>
                  <td className="py-3 px-6 text-left">{job.noOfPerson}</td>
                  <td className="py-3 px-6 text-left">{job.department}</td>
                  <td className="py-3 px-6 text-left">{job.processedBy}</td>
                  <td className="py-3 px-6 text-left">
                    <img src={job.photo} alt="Job" className="h-10 w-10 object-cover rounded" />
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{job.dateRequested}</td>
                  <td className="py-3 px-6 text-left">{job.dateCompleted}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleViewClick(job.requestId)}
                      className="bg-blue-500 text-white py-1 px-3 rounded text-xs hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="py-3 px-6 bg-gray-100 flex justify-between items-center rounded-b-lg">
        <p className="text-sm text-gray-600">
          Rows per page: {filteredRequests.length}
        </p>
      </div>
    </div>
  );
}