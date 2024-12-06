import { useEffect, useState } from "react";
import supabase from "../../../service/supabase";

export default function StaffNotification() {
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);

  // Fetch the logged-in user's idNumber when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: userData, error } = await supabase
          .from("User")
          .select("idNumber")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setUserIdNumber(userData.idNumber); // Store the user's ID number
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
        const { data, error } = await supabase
          .from("Notification")
          .select("*")
          .eq("idNumber", userIdNumber)
          .order("timestamp", { ascending: false }); // Order by timestamp (most recent first)

        if (error) {
          console.error("Error fetching notifications:", error);
        } else {
          setNotifications(data); // Update the notifications state
        }
      }
    };

    if (userIdNumber) {
      fetchNotifications();
    }
  }, [userIdNumber]);

  // Set up real-time listener for new staff insertions in the Department_request_assignment table
  useEffect(() => {
    if (userIdNumber) {
      const channel = supabase
        .channel("realtime:Department_request_assignment")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "Department_request_assignment" },
          async (payload) => {
            const newAssignment = payload.new;
            console.log("New Staff Assignment:", newAssignment); // Log the new staff assignment

            const { staffName } = newAssignment;

            if (!staffName) {
              console.error("Missing staffName in new assignment:", newAssignment);
              return;
            }

            // Create a notification message when a new staff member is assigned
            const message = `New staff member assigned: ${staffName}`;

            // Create a notification object
            const newNotification = {
              notificationid: Date.now(), // Use a unique value for notificationid
              message: message,
              timestamp: new Date().toISOString(), // Save as ISO timestamp
              idNumber: userIdNumber,
            };

            // Insert the notification into the Supabase Notification table
            const { error: insertError } = await supabase
              .from("Notification")
              .insert(newNotification);

            if (insertError) {
              console.error("Error inserting notification:", insertError);
              return;
            }

            // Refresh notifications after insertion
            const { data: notificationData, error: fetchError } = await supabase
              .from("Notification")
              .select("*")
              .eq("idNumber", userIdNumber)
              .order("timestamp", { ascending: false });

            if (fetchError) {
              console.error("Error fetching updated notifications:", fetchError);
            } else {
              setNotifications(notificationData); // Update notifications state
            }
          }
        )
        .subscribe();

      console.log("Channel subscription:", channel); // Log the subscription status

      // Cleanup the subscription when the component unmounts or userIdNumber changes
      return () => {
        channel.unsubscribe(); // Correct cleanup code here
      };
    }
  }, [userIdNumber]);

  return (
    <div className="p-2">
      <div className="bg-white border shadow-md">
        <div className="bg-blue-500 rounded-t-lg p-2 text-white font-bold">
          Notifications
        </div>
        <div className="p-6">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="mb-4">
                <p><b>{notification.message}</b></p>
                <p className="text-xs">{new Date(notification.timestamp).toLocaleString()}</p>
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
