import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export default function ReusableCalendar() {

  return (
    <div className="p-9 "> {/* Set width to 50% of the viewport width */}
        <Calendar className="h-full text-xl  w-[100vh]" /> {/* Ensure the calendar takes full width */}
      </div>
  );
}
