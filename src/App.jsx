import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/system_admin/department_head/staff/requestor/Dashboard';
import SysadminDashboard from './pages/system_admin/SysadminDashboard';
import UsersPage from './pages/system_admin/sysadminUsers';
import JobRequests from './pages/system_admin/jobRequests';
import LogIn from './pages/LogIn';
import Departments from './pages/system_admin/Departments';
import DepartmentCategory from './pages/system_admin/departmentCategory';
import ContentJobRequest from './pages/ContentJobRequests';
import JobRequestTable from './pages/system_admin/components/JobRequestTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<div>Register Page</div>} /> {/* Add element for register route */}

        <Route path="/system_admin" element={<SysadminDashboard />}>
          <Route path="Users" element={<UsersPage />} />
          <Route path="Job_requests" element={<JobRequests />} />
          <Route path="Departments" element={<Departments />} />
          <Route path="Dept_Category" element={<DepartmentCategory />} />
        

        <Route path="job_request" element={<ContentJobRequest />}>
          <Route path="view" element={<JobRequestTable />} />
        </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
