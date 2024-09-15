import 'remixicon/fonts/remixicon.css';
import { Outlet, useOutlet } from "react-router-dom";
import DeptTable from '../components/DepartmentTable';
import SearchBar from '../../../components/SearchBar';

export default function SysAdminDepartmentPage() {
    const otherContent = useOutlet();

    return (
        <>
         <SearchBar title="Department" />
           {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <DeptTable />
      )}
        </>
    );
}
