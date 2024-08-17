import { Outlet, useOutlet } from "react-router-dom";
import TableReferral from "./TableReferral";

export default function Referral() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <TableReferral />
      )}
    </>
  );
}
