import { useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css'; 

export default function ReusableNotification() {
  const navigate = useNavigate();

  return (
    <div className="p-2 h-[60vh]"> {/* Set height to 80vh for a longer notification box */}
    
        {/* NOTIFICATION */}
        <div className="bg-white border shadow-md h-full"> {/* Make the inner div take full height */}
          <div className="bg-yellow-400">
            <div className="text-2xl p-2 ml-2 text-black font-bold">
              Notifications
            </div>
          </div>
  
          {/* REFERRAL NOTIFICATION */}
          <div className="p-4 text-lg flex-grow">
            <p>
              <b>COMPLETED:</b> Your job request is completed. 
              <a
                href="#"
                onClick={() => navigate("/requestor/job_request_completed")}
                className="text-blue-700"
              >
                [VIEW CERTIFICATE]
              </a>
            </p>
            <p className="text-xs">08-11-2024 11:11 PM</p>
            <br />
            <p>
              <b>APPROVED:</b> Your job request has been approved and assigned to MEWS 
              <a
                href="#"
                onClick={() => navigate("/requestor/job_request_approved")}
                className="text-blue-700"
              >
                [SEE MORE]
              </a>
            </p>
            <p className="text-xs">08-11-2024 11:11 PM</p>

            <br />
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
      </div>
  );
}
