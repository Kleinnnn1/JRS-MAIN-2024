export default function Calendar() {
  // Function to get current date in a formatted string
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white h-60 lg:h-72 xl:h-80 border-gray-100 p-5 lg:col-span-1 shadow-md shadow-black/5 flex flex-col justify-between">
      <div className="text-xl text-black font-semibold">CALENDAR</div>
      <div className="p-4">
        <p className="text-gray-700">{getCurrentDate()}</p>
        {/* Add more calendar content here */}
      </div>
    </div>
  );
}
