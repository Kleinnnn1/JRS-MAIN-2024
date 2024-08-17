export default function StatusCardAndCalendar() {
  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-3 gap-5 h-[50vh]">
        {/* NOTIFICATION */}
        <div className="bg-white border border-black lg:col-span-2 shadow-md shadow-black/5 flex flex-col justify-between h-full">
          <div className="bg-yellow-400 border-b border-black">
            <div className="text-xl p-1 ml-2 text-black font-semibold">
              Notifications
            </div>
          </div>
          <div className="p-4 flex-grow">
            <p>Notification</p>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="bg-white border border-black p-5 lg:col-span-1 shadow-md shadow-black/5 flex flex-col justify-between h-full">
          <div className="text-xl text-black font-semibold">CALENDAR</div>
          <div className="p-4 flex-grow">
            <p>Date</p>
          </div>
        </div>
      </div>
    </div>
  );
}
