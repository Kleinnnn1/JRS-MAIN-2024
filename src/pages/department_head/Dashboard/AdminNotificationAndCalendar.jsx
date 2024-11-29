import { useNavigate } from "react-router-dom";
import ReusableCalendar from "../../../components/ReusableCalendar";
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

export default function AdminStatusCardAndCalendar() {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <div className="grid lg:grid-cols-3 gap-10 h-[50vh]">
        {/* NOTIFICATION */}
        <div className="bg-white  border lg:col-span-2 shadow-md shadow-black/5 flex flex-col justify-between  h-full">
        <div className="bg-custom-blue rounded-t-lg  ">
            <div className="text-2xl text-white p-2 ml-2 text-black font-bold">
              Notifications
            </div>
          </div>
          <div className="p-6 flex-grow">
            <p>
              <b>COMPLETED REQ:</b> A Request has been successfully completed. 
              <a
                href="#"
                onClick={() => navigate("navigation here")}
                className="text-blue-700"
              >
                [SEE MORE]
              </a>
            </p>
            <p className="text-xs">08-11-2024 11:11 PM</p>
            <p>
              <b>NEW JOB REQUEST:</b> Apollo S. Quiboloy have sent a job request. 
              <a
                href="#"
                onClick={() => navigate("navigation here")}
                className="text-blue-700"
              >
                [SEE MORE]
              </a>
            </p>
            <p className="text-xs">08-11-2024 11:11 PM</p>
          </div>
          
        </div>

        {/* CALENDAR */}

       <ReusableCalendar />
      </div>
    </div>
  );
}
