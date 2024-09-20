import { Outlet, useOutlet } from "react-router-dom";
import TableCertificate from "./StaffTableCertificate";

export default function Approving() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <>
          <TableCertificate />
        </>
      )}
    </>
  );
}
