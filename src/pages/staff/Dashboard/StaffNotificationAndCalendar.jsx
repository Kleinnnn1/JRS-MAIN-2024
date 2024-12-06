import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase";

export default function StaffNotification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);
  const [userFullName, setUserFullName] = useState(null);

  // Fetch the logged-in user's details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: userData, error } = await supabase
          .from("User")
          .select("idNumber, fullName")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setUserIdNumber(userData.idNumber);
          setUserFullName(userData.fullName);
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch notifications for the logged-in user
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userIdNumber) {
        const { data: notificationData, error } = await supabase
          .from("Notification")
          .select("*")
          .eq("idNumber", userIdNumber)
          .order("timestamp", { ascending: false });

        if (error) {
          console.error("Error fetching notifications:", error);
        } else {
          setNotifications(notificationData);
        }
      }
    };

    fetchNotifications();
  }, [userIdNumber]);

  // Real-time listener for new assignments in Department_request_assignment
  useEffect(() => {
    if (userFullName) {
      const channel = supabase
        .channel("realtime:Department_request_assignment")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "Department_request_assignment" },
          async (payload) => {
            console.log("Realtime Payload:", payload); // Debugging logs

            const newAssignment = payload.new;

            if (newAssignment.staffName === userFullName) {
              const newNotification = {
                notificationid: Date.now(),
                message: `You have been assigned a new request: ${newAssignment.requestTitle}`,
                timestamp: new Date().toISOString(),
                idNumber: userIdNumber,
              };

              // Insert the notification into the Supabase Notification table
              const { error: insertError } = await supabase
                .from("Notification")
                .insert(newNotification);

              if (insertError) {
                console.error("Error inserting notification:", insertError);
              } else {
                // Update local state with the new notification
                setNotifications((prev) => [newNotification, ...prev]);
              }
            }
          }
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }
  }, [userFullName, userIdNumber]);

  // Handle navigation when "Click to view" is clicked
  const handleNotificationClick = (message) => {
    navigate(`/requests/details`, { state: { message } });
  };

  return (
    <div className="p-2">
      <div className="grid lg:grid-cols-3 gap-10 h-[50vh]">
        <div className="bg-white border lg:col-span-2 shadow-md shadow-black/5 flex flex-col justify-between h-full">
          <div className="bg-custom-blue rounded-t-lg">
            <div className="text-2xl text-white p-2 ml-2 text-black font-bold">
              Notifications
            </div>
          </div>
          <div className="p-6 flex-grow">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <b>{notification.message}</b>
                  </p>
                  <p className="text-xs">{new Date(notification.timestamp).toLocaleString()}</p>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => handleNotificationClick(notification.message)}
                  >
                    Click to view
                  </button>
                </div>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
