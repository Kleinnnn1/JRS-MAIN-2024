import { Outlet, useOutlet } from "react-router-dom";
import TableEmployee from "./TableEmployee";

export default function Employee() {
  const otherContent = useOutlet();

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <TableEmployee />
      )}
    </>
  );
}
