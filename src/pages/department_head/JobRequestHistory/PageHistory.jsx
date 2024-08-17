import ContentHistory from "./ContentHistory";
import { Outlet, useOutlet } from "react-router-dom";

export default function PageHistory() {
  const otherContent = useOutlet();
  return (
    <>
      {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <>
          <ContentHistory />
        </>
      )}
    </>
  );
}
