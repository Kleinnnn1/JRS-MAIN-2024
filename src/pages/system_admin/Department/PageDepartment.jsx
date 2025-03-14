import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { useOutlet } from "react-router-dom";
import DeptTable from "../components/DepartmentTable";
import SearchBar from "../../../components/SearchBar";
import Logo from "../../../assets/images/Loading_2.gif"; // Loading animation

export default function SysAdminDepartmentPage() {
  const [loading, setLoading] = useState(true);
  const outletContent = useOutlet();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img src={Logo} alt="Loading..." className="w-32 h-32 animate-pulse" />
          <p className="mt-4 text-gray-500">Loading, please wait...</p>
        </div>
      ) : (
        outletContent || (
          <>

            <DeptTable />
          </>
        )
      )}
    </div>
  );
}
