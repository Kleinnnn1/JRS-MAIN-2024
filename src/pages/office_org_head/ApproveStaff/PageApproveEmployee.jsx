import { Outlet, useOutlet } from "react-router-dom";
import TableApproveEmployee from "./TableApproveEmployee";

export default function OfficeHeadApproveEmployee() {
  const otherContent = useOutlet();

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <TableApproveEmployee />
      )}
    </>
  );
}
