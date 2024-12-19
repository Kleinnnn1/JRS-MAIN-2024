import { useEffect, useState } from "react";
import supabase from "../../../service/supabase";
import { useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import ReusablePagination from '../../../components/ReusablePagination';
import { getCurrentUser } from "../../../service/apiAuth";

export default function StaffNotification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          return;
        }

        if (session) {
          const { data: userData, error: userError } = await supabase
            .from("User")
            .select("idNumber, fullName")
            .eq("id", session.user.id)
            .single();

          if (userError) {
            console.error("Error fetching user data:", userError);
          } else {
            setUserIdNumber(userData.idNumber);
            setFullName(userData.fullName);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotificationsAndAssignments = async () => {
      try {
        if (userIdNumber && fullName) {
          const { data: notificationsData, error: notificationsError } = await supabase
            .from("Notification")
            .select("*")
            .eq("idNumber", userIdNumber)
            .order("timestamp", { ascending: false });

          if (notificationsError) throw notificationsError;

          setNotifications(notificationsData || []);

          const { data: assignmentsData, error: assignmentsError } = await supabase
            .from("Department_request_assignment")
            .select("requestId, staffName")
            .eq("staffName", fullName);

          if (assignmentsError) throw assignmentsError;

          for (const assignment of assignmentsData) {
            const message = `ASSIGNED: You have been assigned to a Job Request [Request ID #${assignment.requestId}].`;
            const { data: existingNotifications } = await supabase
              .from("Notification")
              .select("*")
              .eq("message", message)
              .eq("idNumber", userIdNumber)
              .single();

            if (!existingNotifications) {
              await supabase.from("Notification").insert({
                message,
                timestamp: new Date().toISOString(),
                idNumber: userIdNumber,
                requestId: assignment.requestId,
              });
            }
          }
        }
      } catch (err) {
        console.error("Error fetching notifications and assignments:", err.message);
      }
    };

    fetchNotificationsAndAssignments();
  }, [userIdNumber, fullName]);

  useEffect(() => {
    const interval = setInterval(() => {
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

      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [userIdNumber]);

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(notifications.length / rowsPerPage);

  return (
    <div className="p-2">
      <div className="bg-white border -mx-4 rounded-t-lg shadow-md">
        <div className="bg-custom-blue rounded-t-lg p-3 text-white font-bold">
          Notifications
        </div>
        <div className="p-6">
          {notifications.length > 0 ? (
            <>
              <table className="min-w-full table-auto">
                <tbody>
                  {paginatedNotifications.map((notification, index) => (
                    <tr
                      key={notification.timestamp || notification.id || index}
                      className="border-t"
                    >
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
                                  const { data: request, error } = await supabase
                                    .from("Request")
                                    .select("*")
                                    .eq("requestId", requestId)
                                    .single();
                                  if (error) throw new Error("Request not found");
                                  navigate(`/staff/job_assigned/details/${requestId}`, {
                                    state: { ...notification },
                                  });
                                } catch (err) {
                                  console.error("Error navigating to request details:", err.message);
                                }
                              }
                            }}
                          >
                            Click to view
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReusablePagination
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
}
