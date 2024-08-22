import SaveChangesButton from "./StaffSaveChangesbtn";

export default function ChangePassword() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Change Password</h2>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="current-password" className="text-gray-700 mb-2 font-medium">
            Current Password
          </label>
          <input
            id="current-password"
            type="password"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="new-password" className="text-gray-700 mb-2 font-medium">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm-new-password" className="text-gray-700 mb-2 font-medium">
            Confirm New Password
          </label>
          <input
            id="confirm-new-password"
            type="password"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>
        <div className="flex justify-end mt-6">
          <SaveChangesButton />
        </div>
      </div>
    </div>
  );
}
