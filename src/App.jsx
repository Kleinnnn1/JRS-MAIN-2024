import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Importing all the necessary components for the routes
import LogIn from "./auth/LogIn.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

// Components for system_admin

// Components for department_head
import PageDepartMentHeadDashboard from "./pages/department_head/Dashboard/PageDepartMentHeadDashboard.jsx";
import PageReportDepartmentHead from "./pages/department_head/SendReport/PageReport.jsx";
import PageJobRequest from "./pages/department_head/JobRequest/PageJobRequest.jsx";
import PageEmployee from "./pages/department_head/Employee/PageEmployee.jsx";
import PageReferral from "./pages/department_head/Referral/PageReferral.jsx";
import PageProfile from "./pages/department_head/Profile/PageProfile.jsx";
import PageCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/PageCertificate.jsx";
import PageHistoryDepartmentHead from "./pages/department_head/JobRequestHistory/PageHistory.jsx";

// Additional imports for sub-routes
import ViewJobOngoing from "./pages/department_head/JobRequest/ViewJobOngoing.jsx";
import ViewJobCompleted from "./pages/department_head/JobRequest/ViewJobCompleted.jsx";
import UserContent from "./pages/system_admin/Users/ContentUsers";

import SysAdminContent from './pages/system_admin/Users/ContentDepartmentHead';
import SysAdminStaffContent from './pages/system_admin/Users/ContentStaff';
import SystemAdDashboard from './pages/system_admin/Dashboard/PageDashboard';
import SysAdminUsersPage from './pages/system_admin/Users/sysadminUsers';
import SysAdminJob_requests from './pages/system_admin/JobRequest/jobRequests';
import SysAdminDepartmentPage from './pages/system_admin/Department/PageDepartment';
import SysAdminAddDepartment from './pages/system_admin/Department/addDepartment';
import SysAdminAddNewUser from './pages/system_admin/Users/addUser';
import SysAdminAddNewStaff from './pages/system_admin/Users/addNewStaff.jsx';
import SysAdminAddNewAdmin from './pages/system_admin/Users/addNewAdmin.jsx';
import SysAdminViewingDepartment from './pages/system_admin/Department/ViewDepartment';
import SysAdminNewRequest from './pages/system_admin/JobRequest/NewJobRequst';
import SysAdminViewUser from './pages/system_admin/Users/UserViewing';
import SysAdminViewAdmin from './pages/system_admin/Users/AdminViewing';
import SysAdminViewStaff from './pages/system_admin/Users/StaffViewing';
import SysAdminUserInformation from "./pages/system_admin/Profile/UserInformation.jsx";
import SysAdminPageProfile from "./pages/system_admin/Profile/PageProfile.jsx";
import SysAdminChangeAvatar from "./pages/system_admin/Profile/ChangeAvatar";
import SysAdminChangePassword from "./pages/system_admin/Profile/ChangePassword";
import PageHistorySystemAdmin from "./pages/system_admin/History/HistoryPage";
import PageReportSystemAdmin from "./pages/system_admin/Reports/ReportsPage";




import ViewJobRequest from "./pages/department_head/JobRequest/ViewJobRequest.jsx";
import ViewJobRequestRemarks from "./pages/department_head/JobRequest/ViewJobRequestRemarks.jsx";
import JobOngoing from "./pages/department_head/JobRequest/PageJobOngoing.jsx";
import JobCompleted from "./pages/department_head/JobRequest/PageJobCompleted.jsx";
import ViewEmployee from "./pages/department_head/Employee/ViewEmployee.jsx";
import TableEmployeeHistory from "./pages/department_head/Employee/TableEmployeeHistory.jsx";
import EmployeeHistoryView from "./pages/department_head/Employee/ViewEmployeeHistory.jsx";
import ReportView from "./pages/department_head/SendReport/ReportView";
import SendReportForm from "./pages/department_head/SendReport/SendReportForm";
import ViewAddEmployee from "./pages/department_head/Employee/ViewAddEmployee.jsx";
import ReferralJobRequestView from "./pages/department_head/Referral/ReferralJobRequestFormView";
import TableHistory from "./pages/department_head/JobRequestHistory/TableHistory.jsx";
import ViewHistory from "./pages/department_head/JobRequestHistory/ViewHistory.jsx";
import ContentAprrovingCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/ContentApprovingCertificate.jsx";
import ChangeAvatar from "./pages/department_head/Profile/ChangeAvatar";
import ChangePassword from "./pages/department_head/Profile/ChangePassword";
import DashboardContent from "./pages/department_head/Dashboard/ContentDashboard.jsx";
import UserInformation from "./pages/department_head/Profile/UserInformation.jsx";
import EditFormReferral from "./pages/department_head/Referral/EditFormReferral.jsx";
import CreateNewUser from "./pages/department_head/CreateNewUserTest/CreateNewUser.jsx";
import UnauthorizedPage from "./auth/UnauthorizePage.jsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Routes for Unauthorized page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {/* Routes for Login */}
          <Route path="/login" element={<LogIn />} />

          {/* Protected Routes for System Admin */}
          <Route
            path="/system_admin/*"
            element={
              <ProtectedRoute requiredRole="system admin">
                <SystemAdDashboard />
              </ProtectedRoute>
            }
          > 
            <Route path="myprofile" element={<SysAdminPageProfile />}>
              <Route path="user_account" element={<SysAdminUserInformation />} />
              <Route path="change_avatar" element={<SysAdminChangeAvatar />} />
              <Route path="change_password" element={<SysAdminChangePassword />} />
          </Route>
            <Route path="Users" element={<SysAdminUsersPage />}>
              <Route path="reg_users" element={<UserContent />} />
              <Route path="add_user" element={<SysAdminAddNewUser />} />
              <Route path="admin" element={<SysAdminContent />} />
              <Route path="add_admin" element={<SysAdminAddNewAdmin />} />
              <Route path="staff" element={<SysAdminStaffContent />} />
              <Route path="add_staff" element={<SysAdminAddNewStaff />} />
              <Route path="view_user" element={<SysAdminViewUser />} />
              <Route path="view_admin" element={<SysAdminViewAdmin />} />
              <Route path="view_staff" element={<SysAdminViewStaff />} />
            </Route>
            <Route path="Job_Requests" element={<SysAdminJob_requests />}>
              <Route path="new_request" element={<SysAdminNewRequest />} />
            </Route>
            <Route path="Departments" element={<SysAdminDepartmentPage />}>
              <Route path="add" element={<SysAdminAddDepartment />} />
              <Route path="view" element={<SysAdminViewingDepartment />} />
            </Route>
            <Route path="History" element={<PageHistorySystemAdmin />} />
            <Route path="Reports" element={<PageReportSystemAdmin />} />
          </Route>


          {/* Protected Routes for Department Head */}
          <Route
            path="/department_head/*"
            element={
              <ProtectedRoute requiredRole="department head">
                <PageDepartMentHeadDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="user" element={<CreateNewUser />} />
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="myprofile" element={<PageProfile />}/>

          {/* <Route path='Departments' element={<DepartmentPage/>}>
                <Route path='add' element={<AddDepartment />} />
                <Route path='view' element={<ViewingDepartment />} />
          </Route> */}
{/* 
          <Route path='History' element={<PageHistoryDepartmentHead/>}/>
          <Route path='Reports' element={<PageReport/>}/>
           <Route path='register' element={<RegisterMe/>}/> */}

          <Route path="myprofile" element={<PageProfile />}>

              <Route path="user_account" element={<UserInformation />} />
              <Route path="change_avatar" element={<ChangeAvatar />} />
              <Route path="change_password" element={<ChangePassword />} />
            </Route>
            <Route path="report" element={<PageReportDepartmentHead />}>
              <Route path="view" element={<ReportView />} />
              <Route path="send_report" element={<SendReportForm />} />
              <Route path="employee" element={<ViewAddEmployee />} />
            </Route>
            <Route path="employee" element={<PageEmployee />}>
              <Route path="add" element={<ViewAddEmployee />} />
              <Route path="view" element={<ViewEmployee />} />
              <Route path="history" element={<TableEmployeeHistory />}>
                <Route path="view" element={<EmployeeHistoryView />} />
              </Route>
            </Route>
            <Route path="referral" element={<PageReferral />}>
              <Route path="view" element={<ReferralJobRequestView />} />
              <Route path="edit/:referralId" element={<EditFormReferral />} />
            </Route>
            <Route path="history" element={<PageHistoryDepartmentHead />}>
              <Route path="content" element={<TableHistory />}>
                <Route path="information" element={<ViewHistory />} />
              </Route>
            </Route>
            <Route path="job_request" element={<PageJobRequest />}>
              <Route path="view" element={<ViewJobRequest />} />
              <Route path="remarks" element={<ViewJobRequestRemarks />} />
            </Route>
            <Route path="job_ongoing" element={<JobOngoing />}>
              <Route path="view" element={<ViewJobOngoing />} />
            </Route>
            <Route path="job_completed" element={<JobCompleted />}>
              <Route path="view" element={<ViewJobCompleted />} />
            </Route>
            <Route
              path="approving_of_job_completion"
              element={<PageCertificate />}
            >
              <Route path="content" element={<ContentAprrovingCertificate />} />
            </Route>
          </Route>

        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            color: "var(--color-grey-700)",
          },
        }}
      />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>

  );
}

// //components for system_admin
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserContent from "./pages/system_admin/Users/ContentUsers";
// import AdminContent from "./pages/system_admin/Users/ContentDepartmentHead";
// import StaffContent from "./pages/system_admin/Users/ContentStaff";
// import SystemAdDashboard from "./pages/system_admin/Dashboard/PageDashboard";
// import UsersPage from "./pages/system_admin/Users/sysadminUsers";
// import Job_requests from "./pages/system_admin/JobRequest/jobRequests";
// import DepartmentPage from "./pages/system_admin/Department/PageDepartment";
// import AddDepartment from "./pages/system_admin/Department/addDepartment";
// import AddNewUser from "./pages/system_admin/Users/addUser";
// import AddNewAdmin from "./pages/system_admin/Users/addAdmin";
// import AddNewStaff from "./pages/system_admin/Users/addAdmin";
// import ViewingDepartment from "./pages/system_admin/Department/ViewDepartment";
// import PageHistorySystemAdmin from "./pages/system_admin/History/HistoryPage";
// import PageReportSystemAdmin from "./pages/system_admin/Reports/ReportsPage";
// import NewRequest from "./pages/system_admin/JobRequest/NewJobRequst";
// import ViewUser from "./pages/system_admin/Users/UserViewing";
// import ViewAdmin from "./pages/system_admin/Users/AdminViewing";
// import ViewStaff from "./pages/system_admin/Users/StaffViewing";

// //components for department_head
// import PageDepartMentHeadDashboard from "./pages/department_head/Dashboard/PageDepartMentHeadDashboard.jsx";
// import PageReportDepartmentHead from "./pages/department_head/SendReport/PageReport.jsx";
// import PageJobRequest from "./pages/department_head/JobRequest/PageJobRequest.jsx";
// import JobOngoing from "./pages/department_head/JobRequest/PageJobOngoing.jsx";
// import JobCompleted from "./pages/department_head/JobRequest/PageJobCompleted.jsx";
// import PageEmployee from "./pages/department_head/Employee/PageEmployee.jsx";
// import PageReferral from "./pages/department_head/Referral/PageReferral.jsx";
// import PageProfile from "./pages/department_head/Profile/PageProfile.jsx";
// import PageCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/PageCertificate.jsx";
// import PageHistoryDepartmentHead from "./pages/department_head/JobRequestHistory/PageHistory.jsx";
// import ViewJobRequest from "./pages/department_head/JobRequest/ViewJobRequest.jsx";
// import ViewJobRequestRemarks from "./pages/department_head/JobRequest/ViewJobRequestRemarks.jsx";
// import ViewJobOngoing from "./pages/department_head/JobRequest/ViewJobOngoing.jsx";
// import ViewJobCompleted from "./pages/department_head/JobRequest/ViewJobCompleted.jsx";
// import ViewEmployee from "./pages/department_head/Employee/ViewEmployee.jsx";
// import TableEmployeeHistory from "./pages/department_head/Employee/TableEmployeeHistory.jsx";
// import EmployeeHistoryView from "./pages/department_head/Employee/ViewEmployeeHistory.jsx";
// import ReportView from "./pages/department_head/SendReport/ReportView";
// import SendReportForm from "./pages/department_head/SendReport/SendReportForm";
// import ViewAddEmployee from "./pages/department_head/Employee/ViewAddEmployee.jsx";
// import ReferralJobRequestView from "./pages/department_head/Referral/ReferralJobRequestFormView";
// import TableHistory from "./pages/department_head/JobRequestHistory/TableHistory.jsx";
// import ViewHistory from "./pages/department_head/JobRequestHistory/ViewHistory.jsx";
// import ContentAprrovingCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/ContentApprovingCertificate.jsx";
// import ChangeAvatar from "./pages/department_head/Profile/ChangeAvatar";
// import ChangePassword from "./pages/department_head/Profile/ChangePassword";
// import DashboardContent from "./pages/department_head/Dashboard/ContentDashboard.jsx";
// import UserInformation from "./pages/department_head/Profile/UserInformation.jsx";
// import LogIn from "./auth/LogIn.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Toaster } from "react-hot-toast";
// import EditFormReferral from "./pages/department_head/Referral/EditFormReferral.jsx";
// import ProtectedRoute from "./auth/ProtectedRoute.jsx";
// import CreateNewUser from "./pages/department_head/CreateNewUserTest/CreateNewUser.jsx";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // staleTime: 60 * 1000,
//       staleTime: 0,
//     },
//   },
// });

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {/* <ReactQueryDevtools initialIsOpen={false} /> */}

//       <Router>
//         <Routes>
//           {/* Routes for testing forms */}

//           {/* Routes for Login */}
//           <Route path="/login" element={<LogIn />} />

//           {/* Protected Routes */}
//           {/* Routes for Department Head */}
//           <Route
//             path="/department_head"
//             element={
//               <ProtectedRoute>
//                 <PageDepartMentHeadDashboard />
//               </ProtectedRoute>
//             }
//           >
//             {/* Create new User route */}

//             <Route path="user" element={<CreateNewUser />} />

//             <Route path="dashboard" element={<DashboardContent />} />

//             {/* Routes for Profile */}
//             <Route path="myprofile" element={<PageProfile />}>
//               <Route path="user_account" element={<UserInformation />} />
//               <Route path="change_avatar" element={<ChangeAvatar />} />
//               <Route path="change_password" element={<ChangePassword />} />
//             </Route>

//             {/* Routes for Report */}
//             <Route path="report" element={<PageReportDepartmentHead />}>
//               <Route path="view" element={<ReportView />} />
//               <Route path="send_report" element={<SendReportForm />} />
//               <Route path="employee" element={<ViewAddEmployee />} />
//             </Route>

//             {/* Routes for Employee */}
//             <Route path="employee" element={<PageEmployee />}>
//               <Route path="add" element={<ViewAddEmployee />} />
//               <Route path="view" element={<ViewEmployee />} />
//               <Route path="history" element={<TableEmployeeHistory />}>
//                 <Route path="view" element={<EmployeeHistoryView />} />
//               </Route>
//             </Route>

//             {/* Routes for Referral */}
//             <Route path="referral" element={<PageReferral />}>
//               <Route path="view" element={<ReferralJobRequestView />} />
//               <Route path="edit/:referralId" element={<EditFormReferral />} />
//             </Route>

//             {/* Routes for History */}
//             <Route path="history" element={<PageHistoryDepartmentHead />}>
//               <Route path="content" element={<TableHistory />}>
//                 <Route path="information" element={<ViewHistory />} />
//               </Route>
//             </Route>

//             {/* Routes for Job Request */}
//             <Route path="job_request" element={<PageJobRequest />}>
//               <Route path="view" element={<ViewJobRequest />} />
//               <Route path="remarks" element={<ViewJobRequestRemarks />} />
//             </Route>

//             {/* Routes for Job Ongoing */}
//             <Route path="job_ongoing" element={<JobOngoing />}>
//               <Route path="view" element={<ViewJobOngoing />} />
//             </Route>

//             {/* Routes for Job Completed */}
//             <Route path="job_completed" element={<JobCompleted />}>
//               <Route path="view" element={<ViewJobCompleted />} />
//             </Route>

//             {/* Routes for Approving of Job Completion */}
//             <Route
//               path="approving_of_job_completion"
//               element={<PageCertificate />}
//             >
//               <Route path="content" element={<ContentAprrovingCertificate />} />
//             </Route>
//           </Route>

//           {/* Routes for System Admin */}
//           <Route
//             path="/system_admin"
//             element={
//               <ProtectedRoute>
//                 <SystemAdDashboard />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="Users" element={<UsersPage />}>
//               <Route path="reg_users" element={<UserContent />} />
//               <Route path="add_user" element={<AddNewUser />} />
//               <Route path="admin" element={<AdminContent />} />
//               <Route path="add_admin" element={<AddNewAdmin />} />
//               <Route path="staff" element={<StaffContent />} />
//               <Route path="add_staff" element={<AddNewStaff />} />
//               <Route path="view_user" element={<ViewUser />} />
//               <Route path="view_admin" element={<ViewAdmin />} />
//               <Route path="view_staff" element={<ViewStaff />} />
//             </Route>

//             <Route path="Job_Requests" element={<Job_requests />}>
//               <Route path="new_request" element={<NewRequest />} />
//             </Route>

//             <Route path="Departments" element={<DepartmentPage />}>
//               <Route path="add" element={<AddDepartment />} />
//               <Route path="view" element={<ViewingDepartment />} />
//             </Route>

//             <Route path="History" element={<PageHistorySystemAdmin />} />
//             <Route path="Reports" element={<PageReportSystemAdmin />} />
//           </Route>
//         </Routes>
//       </Router>
//       <Toaster
//         position="top-center"
//         gutter={12}
//         containerStyle={{ margin: "8px" }}
//         toastOptions={{
//           success: {
//             duration: 3000,
//           },
//           error: {
//             duration: 5000,
//           },
//           style: {
//             fontSize: "16px",
//             maxWidth: "500px",
//             padding: "16px 24px",
//             color: "var(--color-grey-700)",
//           },
//         }}
//       />
//     </QueryClientProvider>
//   );
// }
