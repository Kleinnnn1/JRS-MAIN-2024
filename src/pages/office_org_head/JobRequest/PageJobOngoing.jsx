import { Outlet, useOutlet } from "react-router-dom";

import ContentJobOngoing from "./ContentJobOngoing";

export default function JobOngoing() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <ContentJobOngoing />
      )}
    </>
  );
}
