import 'remixicon/fonts/remixicon.css';
import { Outlet, useOutlet } from "react-router-dom";
import DeptTable from '../components/DepartmentTable';


export default function DepartmentPage() {
    const otherContent = useOutlet();

    return (
        <>

           {otherContent ? (
        <Outlet /> // Render nested routes if present
      ) : (
        <DeptTable />
      )}
        </>
    );
}
