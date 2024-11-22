import { useNotifications } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

export default function ReusableNotification() {
  const { notifications } = useNotifications();  // Fetch notifications from context
  const navigate = useNavigate();

  return (
    <div className="p-2 h-[60vh]">
      {/* NOTIFICATION */}
      <div className="bg-white border shadow-md h-full">
        <div className="bg-yellow-400">
          <div className="text-2xl p-2 ml-2 text-black font-bold">
            Notifications
          </div>
        </div>

        {/* Display notifications dynamically */}
        <div className="p-4 flex-grow">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index}>
                <p>
                  <b>{notification.message}</b>
                  <a
                    href="#"
                    onClick={() => navigate("/requestor/job_request_completed")}
                    className="text-blue-700"
                  >
                    [Click to view]
                  </a>
                </p>
                <p className="text-xs">{notification.timestamp}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}