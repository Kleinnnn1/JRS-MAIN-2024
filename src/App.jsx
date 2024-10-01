import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
{
  /* Staff */
}
import ContentDashStaff from "./pages/staff/Dashboard/StaffContentDash.jsx";
import MainDashStaff from "./pages/staff/Dashboard/StaffMainDashboard.jsx";
import StaffProfile from "./pages/staff/Profile/StaffPageProfile.jsx";
import StaffUserInfo from "./pages/staff/Profile/StaffUserInfo.jsx";
import StaffChangeAvatar from "./pages/staff/Profile/StaffAvatar.jsx";
import StaffChangePassword from "./pages/staff/Profile/StaffChangePassword.jsx";
import StaffPageCertificate from "./pages/staff/SendCert/StaffPageCert.jsx";
import StaffSendCert from "./pages/staff/SendCert/StaffContentSendCert.jsx";
import StaffImageContent from "./pages/staff/Task/StaffImageContent.jsx";
import StaffImagePage from "./pages/staff/Task/StaffOngoingPage.jsx";
import StaffHistoryPage from "./pages/staff/History/CompletedTask.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Importing all the necessary components for the routes
import LogIn from "./auth/LogIn.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import UnauthorizedPage from "./auth/UnauthorizePage.jsx";

// Components for system_admin
import SystemAdDashboard from "./pages/system_admin/Dashboard/PageDashboard";
import UsersPage from "./pages/system_admin/Users/sysadminUsers";
import Job_requests from "./pages/system_admin/JobRequest/jobRequests";
import DepartmentPage from "./pages/system_admin/Department/PageDepartment";
import PageHistorySystemAdmin from "./pages/system_admin/History/HistoryPage";
import PageReportSystemAdmin from "./pages/system_admin/Reports/ReportsPage";
import UserContent from "./pages/system_admin/Users/ContentUsers";
import AdminContent from "./pages/system_admin/Users/ContentDepartmentHead";
import StaffContent from "./pages/system_admin/Users/ContentStaff";
import AddDepartment from "./pages/system_admin/Department/addDepartment";
import AddNewUser from "./pages/system_admin/Users/addUser";
import AddNewAdmin from "./pages/system_admin/Users/addAdmin";
import AddNewStaff from "./pages/system_admin/Users/addAdmin";
import ViewingDepartment from "./pages/system_admin/Department/ViewDepartment";
import NewRequest from "./pages/system_admin/JobRequest/NewJobRequst";
import ViewUser from "./pages/system_admin/Users/UserViewing";
import ViewAdmin from "./pages/system_admin/Users/AdminViewing";
import ViewStaff from "./pages/system_admin/Users/StaffViewing";

// Components for department_head
import PageDepartMentHeadDashboard from "./pages/department_head/Dashboard/PageDepartMentHeadDashboard.jsx";
import PageReportDepartmentHead from "./pages/department_head/SendReport/PageReport.jsx";
import PageJobRequest from "./pages/department_head/JobRequest/PageJobRequest.jsx";
import PageEmployee from "./pages/department_head/Employee/PageEmployee.jsx";
import PageReferral from "./pages/department_head/Referral/PageReferral.jsx";
import PageProfile from "./pages/department_head/Profile/PageProfile.jsx";
import PageCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/PageCertificate.jsx";
import PageHistoryDepartmentHead from "./pages/department_head/JobRequestHistory/PageHistory.jsx";
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
import ViewJobOngoing from "./pages/department_head/JobRequest/ViewJobOngoing.jsx";
import ViewJobCompleted from "./pages/department_head/JobRequest/ViewJobCompleted.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

import PageRequestorDashboard from "./pages/requestor/Dashboard/RequestorPageDashboard.jsx";
import RequestorContentDashboard from "./pages/requestor/Dashboard/RequestorContentDashboard.jsx";
import RequestorJobRequestDetail from "./pages/requestor/JobRequestDetail/RequestorPageJobRequestDetail.jsx";
import RequestorJobRequest from "./pages/requestor/JobRequest/RequestorPageJobRequest.jsx";
import RequestorJobRequestForm from "./pages/requestor/JobRequest/RequestorJobRequestForm.jsx";
import RequestorJobRequestTable from "./pages/requestor/JobRequest/RequestorJobRequestTable.jsx";
import RequestorPageProfile from "./pages/requestor/Profile/RequestorpPageProfile.jsx";
import RequestorPageHistory from "./pages/requestor/History/RequestorPageHistory.jsx";
import RequestorPageSchedule from "./pages/requestor/Schedules/RequestorPageSchedules.jsx";
import ClientSatisfactionSurveySectionOne from "./pages/requestor/ClientSatisfactionSurvey/ClientSatisfactionSurveySectionOne.jsx";
import ClientSatisfactionSurveySectionTwo from "./pages/requestor/ClientSatisfactionSurvey/ClientSatisfactionSurveySectionTwo.jsx";
import ClientSatisfactionSurveySectionThree from "./pages/requestor/ClientSatisfactionSurvey/ClientSatisfactionSurveySectionThree.jsx";
import ClientSatisfactionSurveySectionFour from "./pages/requestor/ClientSatisfactionSurvey/ClientSatisfactionSurveySectionFour.jsx";
import ClientSatisfactionSurveySectionFive from "./pages/requestor/ClientSatisfactionSurvey/ClientSatisfactionSurveySectionFive.jsx";
import ClientSatisfactionSurveySectionSix from "./pages/requestor/ClientSatisfactionSurvey/ClientSatisfactionSurveySectionSix.jsx";
import RequestorInformation from "./pages/requestor/Profile/RequestorUserInformation.jsx";
import RequestorChangeAvatar from "./pages/requestor/Profile/RequestorChangeAvatar.jsx";
import RequestorChangePassword from "./pages/requestor/Profile/RequestorChangePassword.jsx";
import RequestorJobRequestApproved from "./pages/requestor/JobRequestDetail/RequestorContentJobRequestApproved.jsx";
import RequestorJobRequestCompleted from "./pages/requestor/JobRequestDetail/RequestorContentJobRequestCompleted.jsx";
import RequestorCertificate from "./pages/requestor/JobRequestDetail/RequestorCertificate.jsx";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Routes for Unauthorized page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {/* Routes for Login */}
          <Route path="/login" element={<LogIn />} />

          {/* Protected Routes for Staff */}
          <Route
            path="/staff/*"
            element={
              <ProtectedRoute requiredRole="staff">
                <MainDashStaff />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<ContentDashStaff />} />
            <Route path="StaffImagePage" element={<StaffImagePage />}>
              <Route path="StaffImageContent" element={<StaffImageContent />} />
            </Route>
            <Route path="History" element={<StaffHistoryPage />} />
            <Route path="Staffprofile" element={<StaffProfile />}>
              <Route path="user_account" element={<StaffUserInfo />} />
              <Route
                path="Staffchange_avatar"
                element={<StaffChangeAvatar />}
              />
              <Route
                path="Staffchange_password"
                element={<StaffChangePassword />}
              />
            </Route>
            <Route path="StaffSendCert" element={<StaffPageCertificate />} />
          </Route>

          {/* Protected Routes for System Admin */}
          <Route
            path="/system_admin/*"
            element={
              <ProtectedRoute requiredRole="system admin">
                <SystemAdDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="Users" element={<UsersPage />}>
              <Route path="reg_users" element={<UserContent />} />
              <Route path="add_user" element={<AddNewUser />} />
              <Route path="admin" element={<AdminContent />} />
              <Route path="add_admin" element={<AddNewAdmin />} />
              <Route path="staff" element={<StaffContent />} />
              <Route path="add_staff" element={<AddNewStaff />} />
              <Route path="view_user" element={<ViewUser />} />
              <Route path="view_admin" element={<ViewAdmin />} />
              <Route path="view_staff" element={<ViewStaff />} />
            </Route>
            <Route path="Job_Requests" element={<Job_requests />}>
              <Route path="new_request" element={<NewRequest />} />
            </Route>
            <Route path="Departments" element={<DepartmentPage />}>
              <Route path="add" element={<AddDepartment />} />
              <Route path="view" element={<ViewingDepartment />} />
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
        {/* Uncomment if you want to use React Query Devtools */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Router>
    </QueryClientProvider>
    <Router>
      <Routes>
        {/* Routes for Login*/}
        {/* <Route path="/login" element={<Login />} /> */}
{/* 
        {/* Routes for Requestor */}
        <Route path="/requestor" element={<PageRequestorDashboard />}>
          <Route path="home" element={<RequestorContentDashboard />} />
          {/* JOB REQUEST */}
          <Route path="job_request" element={<RequestorJobRequest />} />
          <Route path="job_request_table" element={<RequestorJobRequestTable />} />
          <Route path="job_request_detail" element={<RequestorJobRequestDetail />} />
          <Route path="job_request_approved" element={<RequestorJobRequestApproved />} />
          <Route path="job_request_completed" element={<RequestorJobRequestCompleted />} /> 
          <Route path="job_request_certificate" element={<RequestorCertificate />} /> 
          <Route path="job_request_form" element={<RequestorJobRequestForm />} />

          {/* REQUESTOR'S PROFILE */}
          <Route path="requestor_profile" element={<RequestorPageProfile />} >
          </Route>

          {/* REQUESTOR'S JOB REQUEST HISTORY */}
          <Route path="job_request_history" element={<RequestorPageHistory />} >

          </Route>

          {/* REQUESTOR'S SCHEDULES */}
          <Route path="requestor_schedule" element={<RequestorPageSchedule />} >
          </Route>

          {/* USTP HARMONIZED CLIENT SATISFACTION SURVEY */}
          <Route path="section_one" element={<ClientSatisfactionSurveySectionOne />} />
          <Route path="survey_section_two" element={<ClientSatisfactionSurveySectionTwo />} />
          <Route path="section_three" element={<ClientSatisfactionSurveySectionThree />} />
          <Route path="section_four" element={<ClientSatisfactionSurveySectionFour />} />
          <Route path="section_five" element={<ClientSatisfactionSurveySectionFive />} />
          
          <Route path="section_six" element={<ClientSatisfactionSurveySectionSix />} />

          {/* REQUESTOR PROFILE */}
          <Route path="requestor_profile" element={<RequestorPageProfile />} >
            <Route path="user_account" element={<RequestorInformation />} />
            <Route path="change_avatar" element={<RequestorChangeAvatar />} />
            <Route path="change_password" element={<RequestorChangePassword />} />
          </Route>
          

          {/* REQUESTOR PROFILE */}
      
        </Route>
        {/* END OF REQUESTOR */}

      </Routes>
    </Router>
  );
}
