import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export default function ReusableCalendar() {

  return (
    <div className="bg-white borderp-5 lg:col-span-1 shadow-md shadow-black/5 flex flex-col justify-between h-full">
      <div className="text-2xl text-center text-black font-bold">CALENDAR</div>
        <Calendar className="h-full text-xl w-[100vh]" /> {/* Ensure the calendar takes full width */}
      </div>
  );
}