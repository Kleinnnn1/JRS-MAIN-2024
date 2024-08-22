import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export default function RequestorStatusCardAndCalendar() {
  const navigate = useNavigate();

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
            <p>
              <b>REFERRAL:</b> Your job request has been forwarded to CSWS. 
              <a
                href="#"
                onClick={() => navigate("/requestor/job_request_detail")}
                className="text-blue-700"
              >
                [SEE MORE]
              </a>
            </p>
            <p className="text-xs">08-11-2024 11:11 PM</p>
          </div>
        </div>

        {/* CALENDAR */}

        <Calendar className="h-full w-full text-xl" />
      </div>
    </div>
  );
}
