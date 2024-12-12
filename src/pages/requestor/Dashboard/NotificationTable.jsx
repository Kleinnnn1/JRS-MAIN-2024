import React, { useEffect, useState } from 'react';
import supabase from '../../../service/supabase';

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentUserIdNumber, setCurrentUserIdNumber] = useState(null);

  useEffect(() => {
    const fetchUserIdNumber = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      if (user) {
        const { idNumber } = user.user_metadata || {};
        setCurrentUserIdNumber(idNumber);
        fetchNotifications(idNumber);
      }
    };

    fetchUserIdNumber();
  }, []);

  const fetchNotifications = async (idNumber) => {
    if (!idNumber) return;

    const { data, error } = await supabase
      .from('Notification')
      .select('*')
      .eq('idNumber', idNumber);

    if (error) {
      console.error('Error fetching notifications:', error);
    } else {
      setNotifications(data);
    }
  };

  useEffect(() => {
    if (!currentUserIdNumber) return;

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Notification',
          filter: `idNumber=eq.${currentUserIdNumber}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setNotifications((prev) =>
              prev.map((notif) =>
                notif.notificationid === payload.new.notificationid
                  ? payload.new
                  : notif
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setNotifications((prev) =>
              prev.filter((notif) => notif.notificationid !== payload.old.notificationid)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserIdNumber]);

  if (!currentUserIdNumber) {
    return <div>Loading user data...</div>;
  }

  return (
    <div >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="  border-gray-300">
          <thead className="bg-custom-blue text-white">
            <tr>
              <th className="text-left p-4">Notifications</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.notificationid} className=" border-gray-200">
                <td className="p-2 text-gray-800">
                  <div className="p-2 bg-gray-50 rounded-sm shadow-md">
                    <h3 className="text-lg font-semibold">
                      {notification.message}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Request ID:</strong> {notification.requestId}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong> {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsTable;
