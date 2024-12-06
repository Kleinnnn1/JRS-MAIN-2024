import { useEffect, useState } from "react";
import supabase from "../../../service/supabase";

export default function StaffNotification() {
  const [notifications, setNotifications] = useState([]);
  const [userFullName, setUserFullName] = useState(null);
  const [userIdNumber, setUserIdNumber] = useState(null);

  // Fetch the logged-in user's full name and idNumber when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: userData, error } = await supabase
          .from("User") // Changed to the correct table name "User"
          .select("idNumber, fullName")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setUserFullName(userData.fullName); // Store the user's full name
          setUserIdNumber(userData.idNumber); // Store the user's ID number
        } else {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No session found.");
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

  // Set up real-time listener for updates to the Department_request_assignment table
  useEffect(() => {
    if (userFullName) {
      const channel = supabase
        .channel("realtime:Department_request_assignment")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "Department_request_assignment" },
          async (payload) => {
            const updatedAssignment = payload.new;
            console.log("Updated Staff Assignment:", updatedAssignment); // Log the updated staff assignment

            const { staffName, deptReqAssId } = updatedAssignment;

            // Log both staffName and userFullName for debugging
            console.log("staffName from DB:", staffName);
            console.log("Current userFullName:", userFullName);

            // Check if the staffName matches the fullName of the logged-in user
            if (staffName && staffName.trim() === userFullName.trim()) {
              // Create a notification message when the staff member is assigned
              const message = `You have been assigned to department request ID: ${deptReqAssId}`;

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
            } else {
              console.log("staffName doesn't match userFullName or is null");
            }
          }
        )
        .subscribe();

      console.log("Channel subscription:", channel); // Log the subscription status

      // Cleanup the subscription when the component unmounts or userFullName changes
      return () => {
        channel.unsubscribe(); // Correct cleanup code here
      };
    }
  }, [userFullName]);

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
