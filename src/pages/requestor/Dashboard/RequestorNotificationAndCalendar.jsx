import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export default function RequestorStatusCardAndCalendar() {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <div className="grid lg:grid-cols-3 gap-10 h-[50vh]">
        {/* NOTIFICATION */}
        <div className="bg-white  border lg:col-span-2 shadow-md shadow-black/5 flex flex-col justify-between  h-full">
          <div className="bg-yellow-400">
            <div className="text-3xl p-2 ml-2 text-black font-bold">
              Notifications
            </div>
          </div>
       
          <div className="p-4 flex-grow">
            <p>   <hr />
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
