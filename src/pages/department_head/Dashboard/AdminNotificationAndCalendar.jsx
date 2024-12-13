// AdminNotification Component
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import Table from "../../../components/Table";
import supabase from "../../../service/supabase";
import { getDeptHeadNotification } from "../../../service/apiDeptHeadNotificationTable";
import { getCurrentUser } from "../../../service/apiAuth";



export default function AdminNotification() {
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

  useEffect(() => {
    async function setupListener() {
      try {
        const currentUser = await getCurrentUser();
  
        if (!currentUser) {
          console.error("Current user not found. Skipping setup listener.");
          return;
        }
  
        const subscription = supabase
          .channel("table-changes")
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "Request",
            },
            async (payload) => {
              try {
                const updatedRequest = payload.new;
                const oldRequest = payload.old;
  
                if (!updatedRequest || !oldRequest) {
                  console.error("Invalid payload:", payload);
                  return;
                }
  
                const { requestId, status, extensionDate } = updatedRequest;
  
                // Ensure the request has a valid requestId
                if (!requestId) {
                  console.warn("Skipping notification due to missing requestId:", updatedRequest);
                  return;
                }
  
                // Check if the status has changed to "Completed"
                if (status === "Completed") {
                  console.log("Handling completed request:", updatedRequest);
  
                  const { data, error: insertError } = await supabase
                    .from("Notification")
                    .insert({
                      message: `[COMPLETED]: A job request has been completed. Request ID: ${requestId}`,
                      timestamp: new Date().toISOString(),
                      idNumber: currentUser.idNumber,
                      requestId,
                    });
  
                  if (insertError) {
                    console.error("Error inserting completion notification:", insertError);
                    return;
                  }
  
                  console.log("Completion notification inserted successfully:", data);
  
                  setNotifs((prev) => [...prev, ...data]);
                }
  
                // Check if the extensionDate has been updated
                if (
                  oldRequest.extensionDate !== updatedRequest.extensionDate &&
                  updatedRequest.extensionDate // Ensure it's a valid date
                ) {
                  console.log("Handling extended request:", updatedRequest);
  
                  const { data, error: insertError } = await supabase
                    .from("Notification")
                    .insert({
                      message: `[EXTENDED]: A job request has been extended. Request ID: ${requestId}`,
                      timestamp: new Date().toISOString(),
                      idNumber: currentUser.idNumber,
                      requestId,
                    });
  
                  if (insertError) {
                    console.error("Error inserting extension notification:", insertError);
                    return;
                  }
  
                  console.log("Extension notification inserted successfully:", data);
  
                  setNotifs((prev) => [...prev, ...data]);
                }
              } catch (error) {
                console.error("Error processing request notification:", error);
              }
            }
          )
          .subscribe();
  
        console.log("Real-time listener setup complete.");
  
        // Cleanup subscription on component unmount
        return () => {
          console.log("Unsubscribing from real-time listener.");
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error setting up real-time listener:", error);
      }
    }
  
    setupListener();
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
  
          navigate(`/department_head/job_request/detail/${requestId}`, {
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
    <div className="-mb-20 py-2 px-4 bg-white shadow-lg rounded-lg">
      <div className="my-4 mx-3 py-4 px-6 bg-custom-blue text-white flex justify-between items-center rounded-t-lg">
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