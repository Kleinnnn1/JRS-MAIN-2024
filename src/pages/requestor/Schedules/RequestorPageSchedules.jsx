import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import iconSchedule from "../../../assets/images/iconSchedule.png";

export default function RequestorPageSchedule() {

    return (
        <>
            {/* Dashboard Header */}
            <div className="my-4 mx-3 py-2 px-4 bg-blue-950 flex flex-col lg:flex-row lg:justify-between items-center min-h-20 shadow-md shadow-black/5 rounded-xl">
                {/* Title and Icon on the Left */}
                <div className="flex items-center mb-4 lg:mb-0">
                    <img src={iconSchedule} alt="Folder Icon" className="h-6 w-6 mr-4" />
                    <h1 className="text-2xl font-medium text-white">Schedules</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-screen p-5">
                {/* Left Side - Calendar */}
                <div className="flex-1 bg-white-100 p-5 rounded-lg mr-5">
                    <Calendar className="h-min w-full text-xl" />
                </div>

                {/* Right Side - Events & Request Schedules */}
                <div className="flex-1 bg-white border border-opacity-80 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-5">Events & Request Schedules</h3>
                    <div>
                        {[
                            { date: 'MAY 15', task: 'FIXING OF DOOR KNOB AT ICT BLDG, RM 9-201' },
                            { date: 'MAY 16', task: 'FIXING OF DOOR KNOB AT ICT BLDG, RM 9-201' },
                            { date: 'MAY 20', task: 'FIXING OF DOOR KNOB AT ICT BLDG, RM 9-201' },
                            { date: 'MAY 22', task: 'FIXING OF DOOR KNOB AT ICT BLDG, RM 9-201' },
                            { date: 'MAY 27', task: 'FIXING OF DOOR KNOB AT ICT BLDG, RM 9-201' },
                        ].map((event, index) => (
                            <div key={index} className="mb-5 text-lg">
                                <h4 className="text-2xl font-bold">{event.date}</h4>
                                <p className="font-bold">CSWS : REQUEST SCHEDULE</p>
                                <p>{event.task}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
