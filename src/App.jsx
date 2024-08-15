import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SystemAdDashboard from './pages/system_admin/PageDashboard';
import UsersPage from './pages/system_admin/sysadminUsers';
import Job_requests from './pages/system_admin/jobRequests';


function App() {
  return (
    <Router>
      <Routes>
        
       <Route path='/system_admin' element={< SystemAdDashboard/>} >
       <Route path='users' element={<UsersPage />} />
       <Route path='Job_Requests' element={<Job_requests />} />
       <Route path='users' element={<UsersPage />} />

       </Route>

      </Routes>
    </Router>
  );
}

export default App;
