import { Outlet, useOutlet } from "react-router-dom";
import JobCompletedContent from "./ContentJobCompleted";

export default function JobCompleted() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <JobCompletedContent />
      )}
    </>
  );
}
