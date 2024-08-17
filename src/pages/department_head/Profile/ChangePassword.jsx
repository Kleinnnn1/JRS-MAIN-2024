import SaveChangesButton from "./SaveChangesButton";

export default function ChangePassword() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col mt-5 ml-5">
        <label htmlFor="name" className="mb-2">
          Current Password
        </label>
        <input
          id="name"
          type="password"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
        />
      </div>
      <div className="flex flex-col mt-5 ml-5">
        <label htmlFor="name" className="mb-2">
          New Password
        </label>
        <input
          id="name"
          type="password"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
        />
      </div>
      <div className="flex flex-col mt-5 ml-5">
        <label htmlFor="name">Confirm New Password</label>
        <input
          id="name"
          type="password"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
        />
      </div>
      <div className="flex justify-end">
        <SaveChangesButton />
      </div>
    </div>
  );
}
