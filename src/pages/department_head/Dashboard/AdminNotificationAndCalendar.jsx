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

  // Fetch notifications from localStorage (if any)
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

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

            // Ensure we have the correct structure in 'payload.new'
            const newRequest = payload.new;
            console.log("New Request:", newRequest); // Log the newly inserted request

            // Check for missing or incorrect fields
            if (!newRequest || !newRequest.requestId) {
              console.error("Missing requestId in new request:", newRequest);
              return;
            }

            // Fetch the deptId from the Department_request_assignment table
            const { data: deptData, error: deptError } = await supabase
              .from("Department_request_assignment")
              .select("deptId")
              .eq("requestId", newRequest.requestId) // Assuming requestId is present in the Department_request_assignment table
              .single();

            if (deptError) {
              console.error("Error fetching department data:", deptError);
              return;
            }

            // Check if the deptId matches the logged-in user's deptId
            if (deptData.deptId === userDeptId) {
              // If the deptId matches and userRole is "department head", create a notification
              const newNotification = {
                message: `New request added: ${newRequest.requestId}`, // Customize the message as needed
                timestamp: new Date().toLocaleString(),
              };

              // Persist the notifications in the state by appending the new one
              setNotifications((prevNotifications) => {
                const updatedNotifications = [...prevNotifications, newNotification];
                localStorage.setItem("notifications", JSON.stringify(updatedNotifications)); // Store notifications in localStorage
                return updatedNotifications;
              });
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
                  <p className="text-xs">{notification.timestamp}</p>
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
