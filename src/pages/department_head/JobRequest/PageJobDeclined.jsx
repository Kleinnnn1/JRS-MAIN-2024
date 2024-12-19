import { Outlet, useOutlet } from "react-router-dom";
import JobDeclinedContent from "./ContentJobDeclined";

export default function JobDeclined() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <JobDeclinedContent />
      )}
    </>
  );
}
