import { Outlet, useOutlet } from "react-router-dom";
import TestTable from "./TestTable";
import TestFormReferral from "./TestFormReferral";

export default function Referral() {
  const otherContent = useOutlet(); // Get the current outlet

  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <>
          <TestTable />
          <TestFormReferral />
        </>
      )}
    </>
  );
}
