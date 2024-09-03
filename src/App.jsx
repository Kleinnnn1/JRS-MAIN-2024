import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContent from "./pages/system_admin/Users/ContentUsers";
import AdminContent from './pages/system_admin/Users/ContentDepartmentHead';
import StaffContent from './pages/system_admin/Users/ContentStaff';
import SystemAdDashboard from './pages/system_admin/Dashboard/PageDashboard';
import UsersPage from './pages/system_admin/Users/sysadminUsers';
import Job_requests from './pages/system_admin/JobRequest/jobRequests';
import DepartmentPage from './pages/system_admin/Department/PageDepartment';
import AddDepartment from './pages/system_admin/Department/addDepartment';
import AddNewUser from './pages/system_admin/Users/addUser';
import AddNewAdmin from './pages/system_admin/Users/addAdmin';
import AddNewStaff from './pages/system_admin/Users/addAdmin';
import ViewingDepartment from './pages/system_admin/Department/ViewDepartment';
import PageHistory from './pages/system_admin/History/HistoryPage';
import PageReport from './pages/system_admin/Reports/ReportsPage';
import NewRequest from './pages/system_admin/JobRequest/NewJobRequst';
import ViewUser from './pages/system_admin/Users/UserViewing';
import ViewAdmin from './pages/system_admin/Users/AdminViewing';
import ViewStaff from './pages/system_admin/Users/StaffViewing';
import UserInformation from "./pages/system_admin/Profile/UserInformation.jsx";
import PageProfile from "./pages/system_admin/Profile/PageProfile.jsx";
import ChangeAvatar from "./pages/system_admin/Profile/ChangeAvatar";
import ChangePassword from "./pages/system_admin/Profile/ChangePassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/system_admin' element={<SystemAdDashboard />}>

          <Route path='Users' element={<UsersPage />}>
              <Route path='reg_users' element={<UserContent />}/>
              <Route path='add_user' element={<AddNewUser />}/>
              <Route path='admin' element={<AdminContent />}/>
              <Route path='add_admin' element={<AddNewAdmin />}/>
              <Route path='staff' element={<StaffContent />}/>
              <Route path='add_staff' element={<AddNewStaff />}/>
              <Route path='view_user' element={<ViewUser />}/>
              <Route path='view_admin' element={<ViewAdmin />}/>
              <Route path='view_staff' element={<ViewStaff />}/>
          </Route>
   
          <Route path='Job_Requests' element={<Job_requests />}>
            <Route path='new_request' element={<NewRequest/>}/>
          </Route>

          <Route path='Departments' element={<DepartmentPage/>}>
                <Route path='add' element={<AddDepartment />} />
                <Route path='view' element={<ViewingDepartment />} />
          </Route>

          <Route path='History' element={<PageHistory/>}/>
          <Route path='Reports' element={<PageReport/>}/>

          <Route path="myprofile" element={<PageProfile />}>
              <Route path="user_account" element={<UserInformation />} />
              <Route path="change_avatar" element={<ChangeAvatar />} />
              <Route path="change_password" element={<ChangePassword />} />
            </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
