import { useEffect, useState } from "react";
import supabase from "../../../service/supabase";
import { useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css'; 

export default function RequestorNotification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);

  // Fetch the logged-in user's idNumber when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }

      if (session) {
        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("idNumber")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
        } else {
          setUserIdNumber(userData.idNumber);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch notifications for the logged-in user
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("Notification")
        .select("*")
        .eq("idNumber", userIdNumber)
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(data);
      }
    };

    if (userIdNumber) {
      fetchNotifications();
    }
  }, [userIdNumber]);

  // Set up real-time listener for new job requests in the Request table
  useEffect(() => {
    if (userIdNumber) {
      const channel = supabase
        .channel("realtime:Request")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "Request" },
          async (payload) => {
            const newJobRequest = payload.new;

            // Check if the job request is for the logged-in user
            if (newJobRequest.idNumber === userIdNumber) {
              console.log("New job request received for user:", newJobRequest);

              // Create a notification message with a link to the request details
              const message = `PENDING: Succesfully made a new request [Request ID #${newJobRequest.requestId}]. `;

              // Create a notification object
              const newNotification = {
                message: message,
                timestamp: new Date().toISOString(),
                idNumber: userIdNumber,
              };

              // Insert the notification into the Notification table
              const { error: insertError } = await supabase
                .from("Notification")
                .insert(newNotification);

              if (insertError) {
                console.error("Error inserting notification:", insertError);
              } else {
                // Fetch updated notifications
                const { data: updatedNotifications, error: fetchError } = await supabase
                  .from("Notification")
                  .select("*")
                  .eq("idNumber", userIdNumber)
                  .order("timestamp", { ascending: false });

                if (fetchError) {
                  console.error("Error fetching updated notifications:", fetchError);
                } else {
                  setNotifications(updatedNotifications);
                }
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [userIdNumber]);
 // Fetch the logged-in user's idNumber when the component mounts
 useEffect(() => {
  const fetchCurrentUser = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error fetching session:", sessionError);
      return;
    }

    if (session) {
      const { data: userData, error: userError } = await supabase
        .from("User")
        .select("idNumber")
        .eq("id", session.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
      } else {
        setUserIdNumber(userData.idNumber);
      }
    }
  };

  fetchCurrentUser();
}, []);

// Fetch notifications for the logged-in user
useEffect(() => {
  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("Notification")
      .select("*")
      .eq("idNumber", userIdNumber)
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
    } else {
      setNotifications(data);
    }
  };

  if (userIdNumber) {
    fetchNotifications();
  }
}, [userIdNumber]);

// Set up real-time listener for new job requests in the Request table
useEffect(() => {
  if (userIdNumber) {
    const channel = supabase
      .channel("realtime:Request")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Request" },
        async (payload) => {
          const newJobRequest = payload.new;

          // Check if the job request is for the logged-in user
          if (newJobRequest.idNumber === userIdNumber) {
            console.log("New update received for user:", newJobRequest);
   
            if (newJobRequest.status === "Ongoing"){

            // Create a notification message with a link to the request details
            const message = `ONGOING: Your Job Request is now ongoing. [Request ID #${newJobRequest.requestId}]. `;

            // Create a notification object
            const newNotification = {
              message: message,
              timestamp: new Date().toISOString(),
              idNumber: userIdNumber,
            };

            // Insert the notification into the Notification table
            const { error: insertError } = await supabase
              .from("Notification")
              .insert(newNotification);

            if (insertError) {
              console.error("Error inserting notification:", insertError);
            } else {
              // Fetch updated notifications
              const { data: updatedNotifications, error: fetchError } = await supabase
                .from("Notification")
                .select("*")
                .eq("idNumber", userIdNumber)
                .order("timestamp", { ascending: false });

              if (fetchError) {
                console.error("Error fetching updated notifications:", fetchError);
              } else {
                setNotifications(updatedNotifications);
              }
            }
          }else if (newJobRequest.status === "Referred"){

            // Create a notification message with a link to the request details
            const message = `REFERRED: Your Job Request [Request ID #${newJobRequest.requestId}] was referred to another Department`;

            // Create a notification object
            const newNotification = {
              message: message,
              timestamp: new Date().toISOString(),
              idNumber: userIdNumber,
            };

            // Insert the notification into the Notification table
            const { error: insertError } = await supabase
              .from("Notification")
              .insert(newNotification);

            if (insertError) {
              console.error("Error inserting notification:", insertError);
            } else {
              // Fetch updated notifications
              const { data: updatedNotifications, error: fetchError } = await supabase
                .from("Notification")
                .select("*")
                .eq("idNumber", userIdNumber)
                .order("timestamp", { ascending: false });

              if (fetchError) {
                console.error("Error fetching updated notifications:", fetchError);
              } else {
                setNotifications(updatedNotifications);
              }
            }
          }else if (newJobRequest.status === "In Progress"){

            // Create a notification message with a link to the request details
            const message = `IN PROGRESS: Your Job Request is now in progress. [Request ID #${newJobRequest.requestId}]. `;

            // Create a notification object
            const newNotification = {
              message: message,
              timestamp: new Date().toISOString(),
              idNumber: userIdNumber,
            };

            // Insert the notification into the Notification table
            const { error: insertError } = await supabase
              .from("Notification")
              .insert(newNotification);

            if (insertError) {
              console.error("Error inserting notification:", insertError);
            } else {
              // Fetch updated notifications
              const { data: updatedNotifications, error: fetchError } = await supabase
                .from("Notification")
                .select("*")
                .eq("idNumber", userIdNumber)
                .order("timestamp", { ascending: false });

              if (fetchError) {
                console.error("Error fetching updated notifications:", fetchError);
              } else {
                setNotifications(updatedNotifications);
              }
            }
          }else if (newJobRequest.status === "Completed"){

            // Create a notification message with a link to the request details
            const message = `COMPLETED: Your Job Request is now completed. [Request ID #${newJobRequest.requestId}]. Kindly Fill Up Client Satisfactory Survey `;

            // Create a notification object
            const newNotification = {
              message: message,
              timestamp: new Date().toISOString(),
              idNumber: userIdNumber,
            };

            // Insert the notification into the Notification table
            const { error: insertError } = await supabase
              .from("Notification")
              .insert(newNotification);

            if (insertError) {
              console.error("Error inserting notification:", insertError);
            } else {
              // Fetch updated notifications
              const { data: updatedNotifications, error: fetchError } = await supabase
                .from("Notification")
                .select("*")
                .eq("idNumber", userIdNumber)
                .order("timestamp", { ascending: false });

              if (fetchError) {
                console.error("Error fetching updated notifications:", fetchError);
              } else {
                setNotifications(updatedNotifications);
              }
            }
          }}
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}, [userIdNumber]);

  return (
    <div className="p-2">
      {/* NOTIFICATION */}
      <div className="bg-white border shadow-md">
        <div className="bg-custom-blue rounded-t-lg p-2 text-white font-bold">
          Notifications
        </div>
        <div className="p-6">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="mb-4">
                <p>
                  <b>{notification.message}</b>
                </p>
                <p className="text-xs">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                {/* Add a dynamic navigation link to request details */}
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
