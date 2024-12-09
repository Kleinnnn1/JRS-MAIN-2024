import { useEffect, useState } from "react";
import supabase from "../../../service/supabase";
import { useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';

export default function RequestorNotification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);
  const [existingRequestIds, setExistingRequestIds] = useState([]);

  // Fetch the logged-in user's idNumber and notifications when the component mounts
  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      // Get session to fetch user ID
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }

      if (session) {
        // Get user data using the session
        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("idNumber")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
        } else {
          setUserIdNumber(userData.idNumber);

          // Fetch notifications for the logged-in user
          const { data: notificationsData, error: notificationsError } = await supabase
            .from("Notification")
            .select("*")
            .eq("idNumber", userData.idNumber)
            .order("timestamp", { ascending: false });

          if (notificationsError) {
            console.error("Error fetching notifications:", notificationsError);
          } else {
            setNotifications(notificationsData);
          }
        }
      }
    };

    fetchUserAndNotifications();
  }, []);

  // Function to check for new requests and insert notifications
  const checkNewRequests = async () => {
    if (!userIdNumber) return;

    const { data: requests, error: requestsError } = await supabase
      .from("Request")
      .select("*")
      .eq("idNumber", userIdNumber);

    if (requestsError) {
      console.error("Error fetching requests:", requestsError);
      return;
    }

    // Get the existing request IDs to compare with new ones
    const newRequestIds = requests.map(request => request.requestId);

    // Check if there are any new requests
    const newRequests = newRequestIds.filter(id => !existingRequestIds.includes(id));

    if (newRequests.length > 0) {
      for (const requestId of newRequests) {
        const message = `PENDING: Successfully made a new request [Request ID #${requestId}].`;

        // Check if a notification with the same message already exists
        const { data: existingNotifications, error: notificationCheckError } = await supabase
          .from("Notification")
          .select("*")
          .eq("message", message)
          .eq("idNumber", userIdNumber)
          .single(); // Use `.single()` to get only one result

        if (notificationCheckError) {
          console.error("Error checking for duplicate notification:", notificationCheckError);
        }

        // If no existing notification with the same message, insert new one
        if (!existingNotifications) {
          const newNotification = {
            message: message,
            timestamp: new Date().toISOString(),
            idNumber: userIdNumber,
            requestId: requestId,
          };

          const { error: insertError } = await supabase
            .from("Notification")
            .insert(newNotification);

          if (insertError) {
            console.error("Error inserting notification:", insertError);
          }
        }
      }

      // Update the list of existing request IDs to prevent duplicate notifications
      setExistingRequestIds(newRequestIds);
    }
  };

  // Watch for updates in the status field of requests and create a notification for status "Ongoing" or "Completed"
  const checkRequestStatusUpdates = async () => {
    if (!userIdNumber) return;

    const { data: requests, error: requestsError } = await supabase
      .from("Request")
      .select("*")
      .eq("idNumber", userIdNumber);

    if (requestsError) {
      console.error("Error fetching requests:", requestsError);
      return;
    }

    // Loop through requests and check if status is "Ongoing" or "Completed"
    requests.forEach(async (request) => {
      let message = null;

      // If status is "Ongoing"
      if (request.status === "Ongoing") {
        message = `Your request [Request ID #${request.requestId}] is now Ongoing.`;
      }

      // If status is "Completed"
      if (request.status === "Completed") {
        message = `COMPLETED: Your request [Request ID #${request.requestId}] has been completed.`;
      }

      if (message) {
        // Check if the notification already exists for the given message
        const { data: existingNotifications, error: notificationCheckError } = await supabase
          .from("Notification")
          .select("*")
          .eq("message", message)
          .eq("idNumber", userIdNumber)
          .single();

        if (notificationCheckError) {
          console.error("Error checking for duplicate notification:", notificationCheckError);
        }

        // If no existing notification with the same message, insert a new one
        if (!existingNotifications) {
          const newNotification = {
            message: message,
            timestamp: new Date().toISOString(),
            idNumber: userIdNumber,
            requestId: request.requestId,
          };

          const { error: insertError } = await supabase
            .from("Notification")
            .insert(newNotification);

          if (insertError) {
            console.error("Error inserting notification:", insertError);
          }
        }
      }
    });
  };

  // Poll every 5 seconds to check for new job requests, update status, and refresh notifications
  useEffect(() => {
    const interval = setInterval(() => {
      checkNewRequests();  // Check for new requests and insert new notifications
      checkRequestStatusUpdates();  // Check for status changes to "Ongoing" or "Completed" and insert notifications

      // Fetch the latest notifications
      const fetchNotifications = async () => {
        if (userIdNumber) {
          const { data: notificationsData, error: notificationsError } = await supabase
            .from("Notification")
            .select("*")
            .eq("idNumber", userIdNumber)
            .order("timestamp", { ascending: false });

          if (notificationsError) {
            console.error("Error fetching notifications:", notificationsError);
          } else {
            setNotifications(notificationsData);
          }
        }
      };

      fetchNotifications();  // Refetch notifications every interval
    }, 5000); // Refresh every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [userIdNumber, existingRequestIds]);

  return (
    <div className="p-2">
      {/* NOTIFICATION */}
      <div className="bg-white border shadow-md">
        <div className="bg-custom-blue rounded-t-lg p-2 text-white font-bold">
          Notifications
        </div>
        <div className="p-6">
          {notifications.length > 0 ? (
            <table className="min-w-full table-auto">
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{notification.message}</td>
                    <td className="px-4 py-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {notification.message.includes("Request ID #") && (
                        <button
                          className="text-blue-700"
                          onClick={async () => {
                            const requestId = notification.message.match(/Request ID #(\d+)/)?.[1];
                            if (requestId) {
                              try {
                                // Fetch the request details from the database
                                const { data: request, error } = await supabase
                                  .from("Request")
                                  .select("*")
                                  .eq("requestId", requestId)
                                  .single();
                              
                                if (error) {
                                  console.error("Error fetching request details:", error);
                                  alert("Unable to fetch request details. Please try again later.");
                                  return;
                                }
                                
                                // Navigate to the job request detail page and pass the fetched data
                                navigate(`/requestor/job_request_detail/${requestId}`, {
                                  state: { requestData: request },
                                });
                              } catch (err) {
                                console.error("Error handling navigation to request details:", err);
                              }
                            } else {
                              console.error("Request ID not found in the notification message.");
                            }
                          }}
                        >
                          [View Request]
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}
