import { Outlet, useOutlet } from "react-router-dom";
import TestTable from "./TestTable";
import CreateFormReferral from "./CreateFormReferral";

export default function Referral() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <>
          <TestTable />
          <CreateFormReferral />
        </>
      )}
    </>
  );
}
