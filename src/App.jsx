import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/system_admin/department_head/staff/requestor/Dashboard'
import SysadminDashboard from './pages/system_admin/SysadminDashboard'
import UsersPage from './pages/system_admin/sysadminUsers'
import LogIn from './pages/LogIn'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element = {<LogIn />}/>  
        <Route path='/sysadmin_Dashboard' element={<SysadminDashboard />} /> 
        <Route path='/dashboard' element = {<Dashboard />}/> 
       
        <Route path='/register'/> 
        <Route path='/sysadmin_Users' element={<UsersPage />} /> 
       
      </Routes>
    </Router>
    </>
  )
}

export default App
