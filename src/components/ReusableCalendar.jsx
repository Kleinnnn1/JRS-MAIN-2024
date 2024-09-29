import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export default function ReusableCalendar() {

  return (
    <div className="p-2"> {/* Set width to 50% of the viewport width */}
    <div className='text-2xl text-center text-black font-bold '>CALENDAR</div>
        <Calendar className="h-full text-xl shadow-inner border-collapse  w-[100vh]" /> {/* Ensure the calendar takes full width */}
      </div>
  );
}
