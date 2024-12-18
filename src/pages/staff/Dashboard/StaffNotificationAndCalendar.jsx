import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../service/supabase";
import ReusablePagination from "../../../components/ReusablePagination";

export default function StaffNotification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userIdNumber, setUserIdNumber] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (!userIdNumber) return;

    try {
      const { data, error } = await supabase
        .from("Notification")
        .select("*")
        .eq("idNumber", userIdNumber)
        .order("timestamp", { ascending: false });

      if (error) throw error;
      setNotifications(data);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error("Error fetching notifications:", err.message);
    } finally {
      setLoading(false);
    }
  }, [userIdNumber]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session) {
          const { data: user, error: userError } = await supabase
            .from("User")
            .select("idNumber")
            .eq("id", session.user.id)
            .single();
          if (userError) throw userError;
          setUserIdNumber(user.idNumber);
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", err.message);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userIdNumber) fetchNotifications();
  }, [userIdNumber, fetchNotifications]);

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(notifications.length / rowsPerPage);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

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
                      key={notification.timestamp || index}
                      className="border-t"
                    >
                      <td className="px-4 py-2">{notification.message}</td>
                      {!isMobile && (
                        <td className="px-4 py-2">
                          {new Date(notification.timestamp).toLocaleString()}
                        </td>
                      )}
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-700"
                          onClick={() => {
                            const requestId =
                              notification.message.match(
                                /Request ID #(\d+)/
                              )?.[1];
                            if (requestId) {
                              navigate(
                                `/staff/job_assigned/details/${requestId}`
                              );
                            }
                          }}
                        >
                          Click to View
                        </button>
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
            <p>No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
