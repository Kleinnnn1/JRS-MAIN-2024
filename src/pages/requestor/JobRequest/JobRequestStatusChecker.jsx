import React, { useEffect } from "react";
import supabase from "../../../service/supabase"; // Ensure Supabase is configured correctly

const StatusChecker = ({ requestId }) => {
  useEffect(() => {
    const checkAndInsertTracking = async () => {
      try {
        // Fetch the request's status
        const { data: request, error: requestError } = await supabase
          .from("Request")
          .select("status")
          .eq("requestId", requestId)
          .single();

        if (requestError) throw new Error(requestError.message);

        // If status is pending, insert into Tracking table
        if (request?.status === "Pending") {
          const { error: insertError } = await supabase
            .from("Tracking")
            .insert({
              details: "Your job request is pending",
              requestId: requestId,
              created_at: new Date().toISOString(),
            });

          if (insertError) throw new Error(insertError.message);

          console.log("Tracking record inserted for pending request.");
        }
      } catch (err) {
        console.error("Error in StatusChecker:", err.message);
      }
    };

    if (requestId) {
      checkAndInsertTracking();
    }
  }, [requestId]);

  return null; // This component does not render anything visible
};

export default StatusChecker;
