import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContent from "./pages/system_admin/Users/ContentUsers";
import AdminContent from './pages/system_admin/Users/ContentDepartmentHead';
import StaffContent from './pages/system_admin/Users/ContentStaff';
import SystemAdDashboard from './pages/system_admin/Dashboard/PageDashboard';
import UsersPage from './pages/system_admin/Users/sysadminUsers';
import Job_requests from './pages/system_admin/JobRequest/jobRequests';
import Departments from './pages/system_admin/Department/Departments';
import AddDepartment from './pages/system_admin/Department/addDepartment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/system_admin' element={<SystemAdDashboard />}>
          <Route path='Users' element={<UsersPage />}>
            <Route path='reg_users' element={<UserContent />} />
            <Route path='admin' element={<AdminContent />} />
            <Route path='staff' element={<StaffContent />} />
          </Route>
          <Route path='Job_Requests' element={<Job_requests />} />
          <Route path='Departments' element={<Departments />}>
            <Route path='add' element={<AddDepartment />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
