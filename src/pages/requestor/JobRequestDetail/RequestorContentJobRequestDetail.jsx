import { useNavigate, useOutlet } from "react-router-dom";

export default function ContentJobRequest() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="bg-white border border-black shadow-md shadow-black/5">
        {/* Header */}
        <div className="bg-yellow-400 border-b border-black p-4 m-0">
          <div className="text-2xl font-bold text-black">Job Request Details</div>
        </div>

        {/* Requestor Information Section */}
        <div className="p-4">
          <div className="text-lg font-semibold text-black">REQUESTOR INFORMATION</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="Karen Cadalo" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 p-2" value="cadalo.karen@gmail.com" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="09097123357" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="CITC" readOnly />
            </div>
          </div>
        </div>

        {/* Job Request Information Section */}
        <div className="p-4">
          <div className="text-lg font-semibold text-black">JOB REQUEST INFORMATION</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="26-05-2024 11:00 AM" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="DRER GYM" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned Department</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="CSWS" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Category</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 p-2" value="Maintenance" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo (Optional)</label>
              <input type="file" className="mt-1 block w-full border border-gray-300 p-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Description</label>
              <textarea className="mt-1 block w-full border border-gray-300 p-2" rows="3" readOnly>
                The aircon does not work
              </textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea className="mt-1 block w-full border border-gray-300 p-2 text-red-500" rows="3" readOnly>
                The job request belongs to CSWS
              </textarea>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="p-4 flex justify-end space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
          <button className="bg-red-500 text-white py-2 px-4 rounded">Cancel Job Request</button>
          <button className="bg-gray-700 text-white py-2 px-4 rounded" onClick={() => navigate("/requestor/home")}>Close</button>
        </div>
      </div>
    </div>
  );
}
