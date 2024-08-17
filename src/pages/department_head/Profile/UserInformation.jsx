import SaveChangesButton from "./SaveChangesButton";

export default function UserInformation() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <label htmlFor="name" className="font-bold text-center mt-9">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          value="Kenneth Jhun N. Balino"
          readOnly
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="email" className="font-bold text-center">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          value="KennLou@gmail.com"
          readOnly
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="contact" className="font-bold text-center">
          Contact Number
        </label>
        <input
          id="contact"
          type="tel"
          className="border border-gray-300 p-2 rounded w-full max-w-xs text-center"
          value="0101010123"
          readOnly
        />
      </div>
      <div className="flex justify-end">
        <SaveChangesButton />
      </div>
    </div>
  );
}
