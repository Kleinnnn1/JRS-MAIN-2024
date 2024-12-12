// AdminNotification Component
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "../../../components/ReusablePagination";
import Table from "../../../components/Table";
import supabase from "../../../service/supabase";
import { getDeptHeadNotification } from "../../../service/apiDeptHeadNotificationTable";
import { getCurrentUser } from "../../../service/apiAuth";

const tableHeaders = ["Message", "Date", "Action"];

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

  // Set up real-time listener
  useEffect(() => {
    async function setupListener() {
      const currentUser = await getCurrentUser();
  
      const subscription = supabase
        .channel("table-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Request",
          },
          (payload) => {
            const { idNumber, Department_request_assignment, requestId, ...newNotifs } = payload.new;
  
            if (!requestId) {
              console.warn("Skipping notification due to missing requestId:", payload);
              return;
            }
  
            if (
              idNumber === currentUser.idNumber &&
              Department_request_assignment?.deptId === currentUser.deptId
            ) {
              setNotifs((prev) => [...prev, { requestId, ...newNotifs }]);
            }
          }
        )
        .subscribe();
  
      return () => {
        subscription.unsubscribe();
      };
    }
  
    setupListener();
  }, []);

  const formattedData = useMemo(() => {
    return notifs.map(({
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
      timestamp ? new Date(timestamp).toLocaleDateString() : "Invalid Date",
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
    </button>
    
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
        headers={tableHeaders}
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