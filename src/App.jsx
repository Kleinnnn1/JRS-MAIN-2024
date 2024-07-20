import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/system_admin/department_head/staff/requestor/Dashboard'
import SysadminDashboard from './pages/system_admin/SysadminDashboard'
import UsersPage from './pages/system_admin/sysadminUsers'
import Job_requests from './pages/system_admin/jobRequests'
import LogIn from './pages/LogIn'
import Departments from './pages/system_admin/Departments'
import DepartmentCategory from './pages/system_admin/departmentCategory'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element = {<LogIn />}/>  
        <Route path='/dashboard' element = {<Dashboard />}/> 
        <Route path='/register'/> 

        <Route path='/sysadmin_Dashboard' element={<SysadminDashboard />} /> 
        <Route path='/sysadmin_Users' element={<UsersPage />} /> 
        <Route path='/Job_requests' element={<Job_requests/>} />
        <Route path='/Departments' element={<Departments/>} />
        <Route path='/Dept_Category' element={<DepartmentCategory/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
