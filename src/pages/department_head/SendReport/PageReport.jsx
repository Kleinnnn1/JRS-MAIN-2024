import { Outlet, useOutlet } from "react-router-dom";

import TableReport from "./TableReport";

export default function Report() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <TableReport />
      )}
    </>
  );
}
