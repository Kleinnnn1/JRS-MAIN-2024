import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableCalendar from "../../../components/ReusableCalendar";
import 'react-calendar/dist/Calendar.css';
import supabase from "../../../service/supabase";

export default function AdminNotification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);
  const [userDeptId, setUserDeptId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch the logged-in user's idNumber, deptId, and userRole when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: userData, error } = await supabase
          .from("User")
          .select("idNumber, deptId, userRole")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setUserIdNumber(userData.idNumber);
          setUserDeptId(userData.deptId);
          setUserRole(userData.userRole);
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch notifications from the Notification table
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userIdNumber) {
        const { data: notificationData, error } = await supabase
          .from("Notification")
          .select("*")
          .eq("idNumber", userIdNumber) // Fetch notifications for the logged-in user
          .order("timestamp", { ascending: false }); // Order by timestamp (most recent first)

        if (error) {
          console.error("Error fetching notifications:", error);
        } else {
          setNotifications(notificationData);
        }
      }
    };

    fetchNotifications();
  }, [userIdNumber]);

  // Set up real-time listener for new Request inserts
  useEffect(() => {
    if (userIdNumber && userDeptId && userRole === "department head") {
      const channel = supabase
        .channel("realtime:Request")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "Request" },
          async (payload) => {
            console.log("Payload received:", payload); // Log the full payload

            const newRequest = payload.new;
            console.log("New Request:", newRequest); // Log the newly inserted request

            if (!newRequest || !newRequest.requestId) {
              console.error("Missing requestId in new request:", newRequest);
              return;
            }

            // Fetch the deptId from the Department_request_assignment table
            const { data: deptData, error: deptError } = await supabase
              .from("Department_request_assignment")
              .select("deptId")
              .eq("requestId", newRequest.requestId)
              .single();

            if (deptError) {
              console.error("Error fetching department data:", deptError);
              return;
            }

            // Check if the deptId matches the logged-in user's deptId
            if (deptData.deptId === userDeptId) {
              // If the deptId matches and userRole is "department head", create a notification
              const newNotification = {
                notificationid: Date.now(), // Use a unique value for notificationid
                message: `[NEW] You received a new job request, Request No: ${newRequest.requestId}`,
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
                setNotifications(notificationData);
              }
            } else {
              console.log("DeptId mismatch or user is not a department head, no notification");
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
  }, [userIdNumber, userDeptId, userRole]);

  // Handle navigation when "Click to view" is clicked
  const handleNotificationClick = async (message) => {
    const match = message.match(/Request No: (\d+)/); // Extract the requestId
    if (match && match[1]) {
      const requestId = match[1];

      // Fetch request details along with user fullName
      const { data: requestDetails, error } = await supabase
        .from("Request")
        .select(`
          requestId,
          description,
          location,
          jobCategory,
          requestDate,
          image,
          priority,
          idNumber,
          User(fullName) -- Assuming 'User' is the related table for fullName
        `)
        .eq("requestId", requestId)
        .single();

      if (error) {
        console.error("Error fetching request details:", error);
        return;
      }

      // Navigate to the details page with all required data
      navigate(`/department_head/job_request/detail/${requestId}`, {
        state: {
          ...requestDetails,
          fullName: requestDetails.User?.fullName || "Unknown", // Handle null or undefined fullName
        },
      });
    } else {
      console.error("Invalid message format or missing requestId");
    }
  };

  return (
    <div className="p-2">
      <div className="grid lg:grid-cols-3 gap-10 h-[50vh]">
        {/* NOTIFICATION */}
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

        {/* CALENDAR */}
        <ReusableCalendar />
      </div>
    </div>
  );
}
