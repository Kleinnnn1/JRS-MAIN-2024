import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SystemAdDashboard from './pages/system_admin/Dashboard/PageDashboard';
import UsersPage from './pages/system_admin/Users/sysadminUsers';
import Job_requests from './pages/system_admin/JobRequest/jobRequests';
import Departments from './pages/system_admin/Department/Departments';


function App() {
  return (
    <Router>
      <Routes>
        
       <Route path='/system_admin' element={< SystemAdDashboard/>} >
       <Route path='Users' element={<UsersPage />} />
       <Route path='Job_Requests' element={<Job_requests />} />
       <Route path='Departments' element={<Departments/>} />
       </Route>

      </Routes>
    </Router>
  );
}

export default App;
