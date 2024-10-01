import { Outlet, useOutlet } from "react-router-dom";
import ContentJobRequest from "./ContentJobRequest";

export default function JobAssign() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <ContentJobRequest />
      )}
    </>
  );
}
