
export default function UserInformation() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg space-y-6 mt-14">
      <div className="flex flex-col items-center">
        <label htmlFor="name" className="font-bold text-lg text-gray-700 mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="border border-gray-300 p-3 rounded-lg w-full max-w-xs text-center bg-gray-100 cursor-not-allowed"
          value="Raphael"
          readOnly
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="email" className="font-bold text-lg text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border border-gray-300 p-3 rounded-lg w-full max-w-xs text-center bg-gray-100 cursor-not-allowed"
          value="albiso.raphael03@gmail.com"
          readOnly
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="contact" className="font-bold text-lg text-gray-700 mb-2">
          Contact Number
        </label>
        <input
          id="contact"
          type="tel"
          className="border border-gray-300 p-3 rounded-lg w-full max-w-xs text-center bg-gray-100 cursor-not-allowed"
          value="09266674451"
          readOnly
        />
      </div>
    </div>
  );
}
