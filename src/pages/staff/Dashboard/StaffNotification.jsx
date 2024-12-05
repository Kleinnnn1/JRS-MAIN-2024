import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../../service/apiAuth";
import { createClient } from "@supabase/supabase-js";
import supabase from "../../../service/supabase";

export default function StaffReusableNotification() {
  const [staffName, setStaffName] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchStaffName = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          console.error("No user is logged in.");
          return;
        }

        if (user.userRole !== "staff") {
          console.error("Logged-in user is not a staff member.");
          return;
        }

        setStaffName(user.username); // Adjust to the correct field in your User table
      } catch (err) {
        console.error("Error fetching current user:", err.message);
      }
    };

    fetchStaffName();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!staffName) return;

      const { data, error } = await supabase
        .from("Notifications")
        .select("*")
        .eq("staffName", staffName)
        .order("createdAt", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error.message);
      } else {
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, [staffName]);

  return (
    <div className="p-2 h-[60vh]">
      <div className="bg-white border shadow-md h-full rounded-xl">
        <div className="bg-custom-blue rounded-t-lg">
          <div className="text-2xl text-white p-2 ml-2 text-black font-bold">
            Notifications
          </div>
        </div>
        <div className="p-4 text-lg flex-grow">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="mb-4">
                <p>
                  <b>{notification.message.split(":")[0]}</b>:{" "}
                  {notification.message.split(":").slice(1).join(":")}{" "}
                  {notification.link && (
                    <a href="#" className="text-blue-700">
                      [VIEW DETAILS]
                    </a>
                  )}
                </p>
                <p className="text-xs">{new Date(notification.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}