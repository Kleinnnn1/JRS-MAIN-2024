// import { useEffect, useState } from "react";
// import supabase from "../../../service/supabase";
// import { useNavigate } from "react-router-dom";
// import 'react-calendar/dist/Calendar.css';
// import ReusablePagination from '../../../components/ReusablePagination';
// import { getDeptHeadNotification } from "../../../service/apiDeptHeadNotificationTable";
// import { getCurrentUser } from "../../../service/apiAuth";

// export default function StaffNotification() {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [userIdNumber, setUserIdNumber] = useState(null);
//   const [fullName, setFullName] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     async function fetchNotifs() {
//       try {
//         setLoading(true);
//         const data = await getDeptHeadNotification();
//         setNotifs(data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchNotifs();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const currentUser = await getCurrentUser();

//         // Fetch only relevant fields from the Request table
//         const { data, error } = await supabase
//           .from("Request")
//           .select(
//             `
//           requestId,
//           User(fullName),
//           description,
//           location,
//           image,
//           dateCompleted,
//           dateStarted,
//           expectedDueDate,
//           extensionDate,
//           priority,
//           remarks,
//           Department_request_assignment (
//             staffName
//           )
//         `
//           )

//         if (error) {
//           throw new Error("Data could not be loaded");
//         }

//         // Filter the data where staffName matches currentUser.fullName
//         const filteredData = data.filter((item) => {
//           const staffNames = item.Department_request_assignment.map(
//             (assign) => assign.staffName
//           );
//           return staffNames.includes(currentUser.fullName);
//         });

//         setRequests(filteredData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data: ", err.message);
//         setError("Failed to load job assignments.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch the logged-in user's idNumber and fullName when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
//       if (sessionError) {
//         console.error("Error fetching session:", sessionError);
//         return;
//       }

//       if (session) {
//         const { data: userData, error: userError } = await supabase
//           .from("User")
//           .select("idNumber, fullName")
//           .eq("id", session.user.id)
//           .single();

//         if (userError) {
//           console.error("Error fetching user data:", userError);
//         } else {
//           setUserIdNumber(userData.idNumber);
//           setFullName(userData.fullName);

//           // Fetch notifications for the logged-in user
//           const { data: notificationsData, error: notificationsError } = await supabase
//             .from("Notification")
//             .select("*")
//             .eq("idNumber", userData.idNumber)
//             .order("timestamp", { ascending: false });

//           if (notificationsError) {
//             console.error("Error fetching notifications:", notificationsError);
//           } else {
//             setNotifications(notificationsData);
//           }
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   const checkDepartmentAssignmentUpdates = async () => {
//     if (!fullName) return;

//     const { data: assignments, error: assignmentsError } = await supabase
//       .from("Department_request_assignment")
//       .select("requestId, staffName")
//       .eq("staffName", fullName);

//     if (assignmentsError) {
//       console.error("Error fetching assignments:", assignmentsError);
//       return;
//     }

//     assignments.forEach(async (assignment) => {
//       const message = `ASSIGNED: You have been assigned to a Job Request [Request ID #${assignment.requestId}].`;

//       // Check if the notification already exists for the given message
//       const { data: existingNotifications, error: notificationCheckError } = await supabase
//         .from("Notification")
//         .select("*")
//         .eq("message", message)
//         .eq("idNumber", userIdNumber)
//         .single();

//       if (notificationCheckError) {
//         console.error("Error checking for duplicate notification:", notificationCheckError);
//       }

//       if (!existingNotifications) {
//         const newNotification = {
//           message: message,
//           timestamp: new Date().toISOString(),
//           idNumber: userIdNumber,
//           requestId: assignment.requestId,
//         };

//         const { error: insertError } = await supabase
//           .from("Notification")
//           .insert(newNotification);

//         if (insertError) {
//           console.error("Error inserting notification:", insertError);
//         }
//       }
//     });
//   };

//   // Poll every 5 seconds to check for updates in assignments and refresh notifications
//   useEffect(() => {
//     const interval = setInterval(() => {
//       checkDepartmentAssignmentUpdates();

//       const fetchNotifications = async () => {
//         if (userIdNumber) {
//           const { data: notificationsData, error: notificationsError } = await supabase
//             .from("Notification")
//             .select("*")
//             .eq("idNumber", userIdNumber)
//             .order("timestamp", { ascending: false });

//           if (notificationsError) {
//             console.error("Error fetching notifications:", notificationsError);
//           } else {
//             setNotifications(notificationsData);
//           }
//         }
//       };

//       fetchNotifications();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [fullName, userIdNumber]);

//   const paginatedNotifications = notifications.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const totalPages = Math.ceil(notifications.length / rowsPerPage);

//   return (
//     <div className="p-2">
//       <div className="bg-white border -mx-4 rounded-t-lg shadow-md">
//         <div className="bg-custom-blue rounded-t-lg p-3 text-white font-bold">
//           Notifications
//         </div>
//         <div className="p-6">
//           {notifications.length > 0 ? (
//             <>
//               <table className="min-w-full table-auto">
//               <tbody>
//   {paginatedNotifications.map((notification, index) => (
//     <tr key={notification.timestamp || notification.id || index} className="border-t">
//       <td className="px-4 py-2">{notification.message}</td>
//       <td className="px-4 py-2">
//         {new Date(notification.timestamp).toLocaleString()}
//       </td>
//       <td className="px-4 py-2">
//         {notification.message.includes("Request ID #") && (
//           <button
//             className="text-blue-700"
//             onClick={async () => {
//               const requestId = notification.message.match(/Request ID #(\d+)/)?.[1];
//               if (requestId) {
//                 const { data: request } = await supabase
//                   .from("Request")
//                   .select("*")
//                   .eq("requestId", requestId)
//                   .single();
//                 navigate(`/staff/job_assigned/details/${requestId}`, {
//                   state: {
//                     ...notification, // Pass all notification details as state
//                   },
//                 });
//               }
//             }}
//           >
//             Click to view
//           </button>
//         )}
//       </td>
//     </tr>
//   ))}
// </tbody>

//               </table>
//               <ReusablePagination
//                 rowsPerPage={rowsPerPage}
//                 setRowsPerPage={setRowsPerPage}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 totalPages={totalPages}
//               />
//             </>
//           ) : (
//             <p>No new notifications</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// AdminNotification Component
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import Table from "../../../components/Table";
import supabase from "../../../service/supabase";
import { getDeptHeadNotification } from "../../../service/apiDeptHeadNotificationTable";
import { getCurrentUser } from "../../../service/apiAuth";



export default function StaffNotification() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch initial data
  useEffect(() => {
    async function fetchNotifs() {
      try {
        setLoading(true);
        const data = await getDeptHeadNotification();
        setNotifs(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNotifs();
  }, []);


  

  const formattedData = useMemo(() => {
    // Sort notifications by timestamp (latest first)
    const sortedNotifs = [...notifs].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA; // Sort in descending order
    });
  
    return sortedNotifs.map(({
      notificationid,
      message,
      timestamp,
      requestId,
      fullName,
      description,
      location,
      jobCategory,
      requestDate,
      image,
      priority,
      deptReqAssId,
      idNumber,
      remarks,
    }) => [
      message || "No description provided",
      timestamp
        ? new Date(timestamp).toLocaleString('en-US', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // 12-hour format (AM/PM)
            timeZone: "Asia/Manila", // Ensure it uses Philippine time
          })
        : "No timestamp available",
      <button
        key={requestId}
        className="text-blue-500"
        onClick={() => {
          if (!requestId) {
            console.error("Invalid requestId for navigation:", requestId);
            return;
          }
          // Log the data to the console
          console.log({
            notificationid,
            message,
            timestamp,
            fullName,
            description,
            location,
            jobCategory,
            requestDate,
            image,
            priority,
            deptReqAssId,
            requestId,
            idNumber,
            remarks,
          });
  
          navigate(`/staff/job_assigned/details/${requestId}`, {
            state: {
              fullName,
              description,
              location,
              jobCategory,
              requestDate,
              image,
              priority,
              deptReqAssId,
              requestId,
              idNumber,
              remarks,
            },
          });
        }}
      >
        Click to View
      </button>,
    ]);
  }, [notifs, navigate]);
  
  const filteredContent = useMemo(() => {
    return formattedData.filter((request) =>
      request.some((item) =>
        String(item).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [formattedData, searchTerm]);

  const paginatedContent = useMemo(() => {
    return filteredContent.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredContent, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredContent.length / rowsPerPage);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="bg-white border -mx-4 rounded-t-lg shadow-md">
      <div className="bg-custom-blue rounded-t-lg p-3 text-white font-bold">
        NOTIFICATION
      </div>
      <Table
        rows={paginatedContent.length}
        content={paginatedContent}
      
      />
      <ReusablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
