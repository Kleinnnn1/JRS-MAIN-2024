import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Components for staff
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
import StaffJobRequest from "./pages/staff/JobRequestStaff/RequestorPageJobRequest.jsx";
import StaffJobRequestForm from "./pages/staff/JobRequestStaff/RequestorJobRequestForm.jsx";
import StaffJobRequestTable from "./pages/staff/JobRequestStaff/RequestorJobRequestTable.jsx";
import StaffJobRequestDetail from "./pages/staff/JobRequestDetailStaff/RequestorPageJobRequestDetail.jsx";
import StaffJobRequestApproved from "./pages/staff/JobRequestDetailStaff/RequestorContentJobRequestApproved.jsx";
import StaffJobRequestCompleted from "./pages/staff/JobRequestDetailStaff/RequestorContentJobRequestCompleted.jsx";
import StaffCertificate from "./pages/staff/JobRequestDetailStaff/RequestorCertificate.jsx";

// Components for department head
import PageDepartMentHeadDashboard from "./pages/department_head/Dashboard/PageDepartMentHeadDashboard.jsx";
import PageJobRequest from "./pages/department_head/JobRequest/PageJobRequest.jsx";
import PageEmployee from "./pages/department_head/Employee/PageEmployee.jsx";
import PageApproveEmployeee from "./pages/department_head/ApproveStaff/PageApproveEmployee.jsx";
import PageReferral from "./pages/department_head/Referral/PageReferral.jsx";
import PageProfile from "./pages/department_head/Profile/PageProfile.jsx";
import PageCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/PageCertificate.jsx";
import PageHistoryDepartmentHead from "./pages/department_head/JobRequestHistory/PageHistory.jsx";

import ViewJobOngoing from "./pages/department_head/JobRequest/ViewJobOngoing.jsx";
import ViewJobCompleted from "./pages/department_head/JobRequest/ViewJobCompleted.jsx";
import ViewJobRequest from "./pages/department_head/JobRequest/ViewJobRequest.jsx";
import ViewJobRequestRemarks from "./pages/department_head/JobRequest/ViewJobRequestRemarks.jsx";

import TableEmployeeHistory from "./pages/department_head/Employee/TableEmployeeHistory.jsx";
import EmployeeHistoryView from "./pages/department_head/Employee/ViewEmployeeHistory.jsx";
import ViewAddEmployee from "./pages/department_head/Employee/ViewAddEmployee.jsx";
import ViewApproveEmployee from "./pages/department_head/ApproveStaff/ViewApproveEmployee.jsx";

import ReferralJobRequestView from "./pages/department_head/Referral/ReferralJobRequestFormView.jsx";
import TableHistory from "./pages/department_head/JobRequestHistory/TableHistory.jsx";
import ViewHistory from "./pages/department_head/JobRequestHistory/ViewHistory.jsx";
import ContentApprovingCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/ContentApprovingCertificate.jsx";
import ChangeAvatar from "./pages/department_head/Profile/ChangeAvatar.jsx";
import ChangePassword from "./pages/department_head/Profile/ChangePassword.jsx";
import DashboardContent from "./pages/department_head/Dashboard/ContentDashboard.jsx";
import UserInformation from "./pages/department_head/Profile/UserInformation.jsx";
import EditFormReferral from "./pages/department_head/Referral/EditFormReferral.jsx";
import ReportView from "./pages/department_head/SendReport/ReportView.jsx";
import SendReportForm from "./pages/department_head/SendReport/SendReportForm.jsx";
import CreateNewUser from "./pages/department_head/CreateNewUserTest/CreateNewUser.jsx";
import PageReportDepartmentHead from "./pages/department_head/SendReport/PageReport.jsx";
import ViewEmployee from "./pages/department_head/Employee/ViewEmployee.jsx";
import ViewEmployeeApproval from "./pages/department_head/ApproveStaff/ViewEmployee.jsx";
import JobOngoing from "./pages/department_head/JobRequest/PageJobOngoing.jsx";
import JobCompleted from "./pages/department_head/JobRequest/PageJobCompleted.jsx";
import ContentAprrovingCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/ContentApprovingCertificate.jsx";
import RequestorJobRequestDeptHead from "./pages/department_head/JobRequestDeptHead/RequestorPageJobRequest.jsx";
import RequestorJobRequestFormDeptHead from "./pages/department_head/JobRequestDeptHead/RequestorJobRequestForm.jsx";
import RequestorJobRequestTableDeptHead from "./pages/department_head/JobRequestDeptHead/RequestorJobRequestTable.jsx";
import RequestorJobRequestDetailDeptHead from "./pages/department_head/JobRequestDetailDeptHead/RequestorPageJobRequestDetail.jsx";
import RequestorJobRequestApprovedDeptHead from "./pages/department_head/JobRequestDetailDeptHead/RequestorContentJobRequestApproved.jsx";
import RequestorJobRequestCompletedDeptHead from "./pages/department_head/JobRequestDetailDeptHead/RequestorContentJobRequestCompleted.jsx";
import RequestorCertificateDeptHead from "./pages/department_head/JobRequestDetailDeptHead/RequestorCertificate.jsx";

// Components for requestor
import PageRequestorDashboard from "./pages/requestor/Dashboard/RequestorPageDashboard.jsx";
import RequestorContentDashboard from "./pages/requestor/Dashboard/RequestorContentDashboard.jsx";
import RequestorJobRequestDetail from "./pages/requestor/JobRequestDetail/RequestorPageJobRequestDetail.jsx";
import RequestorJobRequest from "./pages/requestor/JobRequest/RequestorPageJobRequest.jsx";
import RequestorJobRequestForm from "./pages/requestor/JobRequest/RequestorJobRequestForm.jsx";
import RequestorJobRequestTable from "./pages/requestor/JobRequest/RequestorJobRequestTable.jsx";
import RequestorPageProfile from "./pages/requestor/Profile/RequestorpPageProfile.jsx";
import RequestorPageHistory from "./pages/requestor/History/RequestorPageHistory.jsx";
import RequestorPageSchedule from "./pages/requestor/Schedules/RequestorPageSchedules.jsx";
import SelectSurveyForm from "./pages/requestor/ClientSatisfactionSurvey/SelectSurveyForm.jsx";
import EnglishVersionForm from "./pages/requestor/ClientSatisfactionSurvey/EnglishVersionForm.jsx";
import TagalogVersionForm from "./pages/requestor/ClientSatisfactionSurvey/TagalogVersionForm.jsx";
import RequestorInformation from "./pages/requestor/Profile/RequestorUserInformation.jsx";
import RequestorChangeAvatar from "./pages/requestor/Profile/RequestorChangeAvatar.jsx";
import RequestorChangePassword from "./pages/requestor/Profile/RequestorChangePassword.jsx";
import RequestorJobRequestApproved from "./pages/requestor/JobRequestDetail/RequestorContentJobRequestApproved.jsx";
import RequestorJobRequestCompleted from "./pages/requestor/JobRequestDetail/RequestorContentJobRequestCompleted.jsx";
import RequestorCertificate from "./pages/requestor/JobRequestDetail/RequestorCertificate.jsx";

// Components for system admin
import SystemAdDashboard from "./pages/system_admin/Dashboard/PageDashboard.jsx";
import SysAdminUsersPage from "./pages/system_admin/Users/SysAdminUsersPage.jsx";
import SystemAdHomeDashboard from "./pages/system_admin/Dashboard/SysadminDashboard.jsx"
import SysAdminJob_requests from "./pages/system_admin/JobRequest/jobRequests.jsx";
import SysAdminDepartmentPage from "./pages/system_admin/Department/PageDepartment.jsx";

import SysAdminAddDepartment from "./pages/system_admin/Department/addDepartment.jsx";
import SysAdminAddNewUser from "./pages/system_admin/Users/addUser.jsx";
import SysAdminAddNewStaff from "./pages/system_admin/Users/addNewStaff.jsx";
import SysAdminAddNewAdmin from "./pages/system_admin/Users/addNewAdmin.jsx";
import SysAdminAddNewSpme from "./pages/system_admin/Users/addNewSpme.jsx";
import SysAdminAddNewSysAdmin from "./pages/system_admin/Users/addNewSysAdmin.jsx";

import SysAdminViewingDepartment from "./pages/system_admin/Department/ViewDepartment.jsx";
import SysAdminNewRequest from "./pages/system_admin/JobRequest/NewJobRequst.jsx";
import SysAdminViewUser from "./pages/system_admin/Users/UserViewing.jsx";
import SysAdminViewAdmin from "./pages/system_admin/Users/AdminViewing.jsx";
import SysAdminViewStaff from "./pages/system_admin/Users/StaffViewing.jsx";
import SysAdminViewSpme from "./pages/system_admin/Users/SpmeViewing.jsx";
import SysAdminViewSysAdmin from "./pages/system_admin/Users/SysAdminViewing.jsx";

import SysAdminUserInformation from "./pages/system_admin/Profile/UserInformation.jsx";
import SysAdminPageProfile from "./pages/system_admin/Profile/PageProfile.jsx";
import SysAdminChangeAvatar from "./pages/system_admin/Profile/ChangeAvatar.jsx";
import SysAdminChangePassword from "./pages/system_admin/Profile/ChangePassword.jsx";
import PageHistorySystemAdmin from "./pages/system_admin/History/HistoryPage.jsx";
import PageReportSystemAdmin from "./pages/system_admin/Reports/ReportsPage.jsx";

import SystemAdminContentPage from "./pages/system_admin/Users/SystemAdminContent.jsx";
import UserContent from "./pages/system_admin/Users/ContentUsers";
import SysAdminContent from "./pages/system_admin/Users/ContentDepartmentHead";
import SysAdminStaffContent from "./pages/system_admin/Users/ContentStaff";
import SysAdminSpmeContent from "./pages/system_admin/Users/ContentSpme";

// Office Head
import ContentDashboard from "./pages/office_org_head/Dashboard/ContentDashboard.jsx";

import SignUpForm from "./auth/SignUpForm.jsx";
// SPME
import SPMEDashboard from "./pages/spme/Dashboard/SpmsPageDashboard.jsx";
import SPMEMainBody from "./pages/spme/Dashboard/SPMSContentDashboard.jsx"
import SpmeJobRequest from "./pages/spme/JobRequestspme/RequestorPageJobRequest.jsx";
import SpmeJobRequestForm from "./pages/spme/JobRequestspme/RequestorJobRequestForm.jsx";
import SpmeJobRequestTable from "./pages/spme/JobRequestspme/RequestorJobRequestTable.jsx";
import SpmeJobRequestDetail from "./pages/spme/JobRequestDetailspme/RequestorPageJobRequestDetail.jsx";
import SpmeJobRequestApproved from "./pages/spme/JobRequestDetailspme/RequestorContentJobRequestApproved.jsx";
import SpmeJobRequestCompleted from "./pages/spme/JobRequestDetailspme/RequestorContentJobRequestCompleted.jsx";
import SpmeCertificate from "./pages/spme/JobRequestDetailspme/RequestorCertificate.jsx";

// Importing all the necessary components for the routes
import LogIn from "./auth/LogIn.jsx";
import ForgotPassword from "./auth/forgot-password.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import UnauthorizedPage from "./auth/UnauthorizePage.jsx";
import PageDepartmentKeyWord from "./pages/department_head/keyword/PageDepartmentKeyword.jsx";
import PageStaffKeyWord from "./pages/staff/keyword/PageStaffKeyword.jsx";

//office Head
import OfficeHeadDashboard from "./pages/office_org_head/Dashboard/PageOfficeHeadDashboard.jsx";
import OfficeHeadContentDashboard from "./pages/office_org_head/Dashboard/ContentDashboard.jsx";
import JobAssign from "./pages/office_org_head/JobRequest/PageJobRequest.jsx";
import OfficeHeadViewJobRequest from "./pages/office_org_head/JobRequest/ViewJobRequest.jsx";
import OfficeHeadViewJobRequestRemarks from "./pages/office_org_head/JobRequest/ViewJobRequestRemarks.jsx";
import OfficeHeadJobRequestForm from "./pages/office_org_head/JobRequestOfficeHead/RequestorJobRequestForm.jsx";
import OfficeHeadRequestorJobRequestDetail from "./pages/office_org_head/JobRequestDetailOfficeHead/RequestorPageJobRequestDetail.jsx";
import JobRequestPage from "./pages/office_org_head/JobRequestOfficeHead/RequestorPageJobRequest.jsx";
import OfficeHeadJobRequestTable from "./pages/office_org_head/JobRequestOfficeHead/RequestorJobRequestTable.jsx";
import OfficeHeadProfilePage from "./pages/office_org_head/Profile/PageProfile.jsx";
import OfficeHeadUserInformation from "./pages/office_org_head/Profile/UserInformation.jsx";
import OfficeHeadChangeAvatar from "./pages/office_org_head/Profile/ChangeAvatar.jsx";
import OfficeHeadChangePassword from "./pages/office_org_head/Profile/ChangePassword.jsx";
import OfficeHeadViewAddStaff from "./pages/office_org_head/Employee/ViewAddEmployee.jsx";
import OfficeHeadViewEmployee from "./pages/office_org_head/Employee/ViewEmployee.jsx";
import OfficeHeadEmployee from "./pages/office_org_head/Employee/PageEmployee.jsx";
import OfficeHeadTableEmployeeHistory from "./pages/office_org_head/Employee/TableEmployeeHistory.jsx";
import OfficeHeadViewEmployeeHistory from "./pages/office_org_head/Employee/ViewEmployeeHistory.jsx";
import OfficeHeadReport from "./pages/office_org_head/SendReport/PageReport.jsx";
import OfficeHeadReportView from "./pages/office_org_head/SendReport/ReportView.jsx";
import OfficeHeadSendReportView from "./pages/office_org_head/SendReport/SendReportForm.jsx";
import OfficeHeadApproveEmployee from "./pages/office_org_head/ApproveStaff/PageApproveEmployee.jsx";
import JobRequestDetails from "./pages/department_head/JobRequest/DeptHeadRequestDetail.jsx";
import RequestDetailPage from "./pages/department_head/JobRequest/DeptHeadRequestDetail.jsx";

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
          <Route path="signup" element={<SignUpForm />} />
          {/* Routes for Login */}
          <Route path="/login" element={<LogIn />} />
          {/* Routes for ForgotPassword */}
          <Route path="/forgotPassword" element={<ForgotPassword />} />

{/* ===========================================SPME ==================================================================== */}
       
          <Route path="/spme" element={<SPMEDashboard />}>

          <Route path="home" element={<SPMEMainBody />} />

            <Route path="make_requestSpme" element={<SpmeJobRequest />} />
            <Route
              path="make_request_tableSpme"
              element={<SpmeJobRequestTable />}
            />
            <Route
              path="make_request_formSpme"
              element={<SpmeJobRequestForm />}
            />
            <Route
              path="job_request_detailSpme"
              element={<SpmeJobRequestDetail />}
            />
            <Route
              path="job_request_approvedSpme"
              element={<SpmeJobRequestApproved />}
            />
            <Route
              path="job_request_completedSpme"
              element={<SpmeJobRequestCompleted />}
            />
            <Route
              path="job_request_certificateSpme"
              element={<SpmeCertificate />}
            />
          </Route>

{/* ===========================================STAFF==================================================================== */}
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
            <Route path="add_keyword" element={<PageStaffKeyWord />} />
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
            <Route path="make_requestStaff" element={<StaffJobRequest />}>
              <Route
                path="make_request_tableStaff"
                element={<StaffJobRequestTable />}
              />
              <Route
                path="make_request_formStaff"
                element={<StaffJobRequestForm />}
              />
              <Route
                path="job_request_detailStaff"
                element={<StaffJobRequestDetail />}
              />
              <Route
                path="job_request_approvedStaff"
                element={<StaffJobRequestApproved />}
              />
              <Route
                path="job_request_completedStaff"
                element={<StaffJobRequestCompleted />}
              />
              <Route
                path="job_request_certificateStaff"
                element={<StaffCertificate />}
              />
            </Route>
            <Route path="StaffSendCert" element={<StaffPageCertificate />} />
            <Route path="StaffCert" element={<StaffSendCert />} />
          </Route>

{/* ===========================================SYSTEM ADMIN ==================================================================== */}
          {/* Protected Routes for System Admin */}
          <Route
            path="/system_admin/*"
            element={
              <ProtectedRoute requiredRole="system admin">
                <SystemAdDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<SystemAdHomeDashboard />} />
            <Route path="myprofile" element={<SysAdminPageProfile />}>
              <Route
                path="user_account"
                element={<SysAdminUserInformation />}
              />
              <Route path="change_avatar" element={<SysAdminChangeAvatar />} />
              <Route
                path="change_password"
                element={<SysAdminChangePassword />}
              />
            </Route>
            <Route path="Users" element={<SysAdminUsersPage />}>
              <Route path="reg_users" element={<UserContent />} />
              <Route path="add_user" element={<SysAdminAddNewUser />} />
              <Route path="view_user/:id" element={<SysAdminViewUser />} />

              <Route path="admin" element={<SysAdminContent />} />
              <Route path="add_admin" element={<SysAdminAddNewAdmin />} />
              <Route path="view_admin/:id" element={<SysAdminViewAdmin />} />

              <Route path="staff" element={<SysAdminStaffContent />} />
              <Route path="add_staff" element={<SysAdminAddNewStaff />} />
              <Route path="view_staff/:id" element={<SysAdminViewStaff />} />

              <Route path="spme" element={<SysAdminSpmeContent />} />
              <Route path="add_spme" element={<SysAdminAddNewSpme />} />
              <Route path="view_spme" element={<SysAdminViewSpme />} />
      
              <Route path="sysadmin" element={<SystemAdminContentPage />} />
              <Route path="add_sysadmin" element={<SysAdminAddNewSysAdmin />} />
              <Route path="view_sysadmin" element={<SysAdminViewSysAdmin />} />
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

{/* ===========================================OFFICE HEAD==================================================================== */}
          {/* Protected Routes for Office Head */}
          <Route
            path="/office_head/*"
            element={
              <ProtectedRoute requiredRole="office head">
                <OfficeHeadDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<OfficeHeadContentDashboard />} />
            <Route path="myprofile" element={<OfficeHeadProfilePage />}>
              <Route
                path="user_account"
                element={<OfficeHeadUserInformation />}
              />
              <Route
                path="change_avatar"
                element={<OfficeHeadChangeAvatar />}
              />
              <Route
                path="change_password"
                element={<OfficeHeadChangePassword />}
              />
            </Route>
            <Route path="staff" element={<OfficeHeadEmployee />}>
              <Route path="add" element={<OfficeHeadViewAddStaff />} />
              <Route path="view/:id" element={<OfficeHeadViewEmployee />} />
              <Route
                path="history"
                element={<OfficeHeadTableEmployeeHistory />}
              >
                <Route
                  path="view"
                  element={<OfficeHeadViewEmployeeHistory />}
                />
              </Route>
            </Route>
            <Route path="report" element={<OfficeHeadReport />}>
              <Route path="view" element={<OfficeHeadReportView />} />
              <Route
                path="send_report"
                element={<OfficeHeadSendReportView />}
              />
              <Route path="employee" element={<ViewAddEmployee />} />
            </Route>
            <Route path="my_requests" element={<JobRequestPage />}>
              <Route
                path="my_request_table"
                element={<OfficeHeadJobRequestTable />}
              />
              <Route
                path="my_request_form"
                element={<OfficeHeadJobRequestForm />}
              />
            </Route>
            <Route
              path="approve_staff"
              element={<OfficeHeadApproveEmployee />}
            />

            {/* <Route path='Departments' element={<DepartmentPage/>}>
                <Route path='add' element={<AddDepartment />} />
                <Route path='view' element={<ViewingDepartment />} />
          </Route> */}
            {/* 
          <Route path='History' element={<PageHistoryDepartmentHead/>}/>
          <Route path='Reports' element={<PageReport/>}/>
           <Route path='register' element={<RegisterMe/>}/> */}
          </Route>

{/* ===========================================DEPARTMENT HEAD ==================================================================== */}
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
            <Route path="myprofile" element={<PageProfile />} />
            <Route path="add_keyword" element={<PageDepartmentKeyWord />} />

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
              <Route path="view/:id" element={<ViewEmployee />} />
              <Route path="history" element={<TableEmployeeHistory />}>
                <Route path="view" element={<EmployeeHistoryView />} />
              </Route>
            </Route>

            <Route path="approve_employee" element={<PageApproveEmployeee />}>
              <Route path="approve" element={<ViewApproveEmployee />} />
              <Route path="view" element={<ViewEmployeeApproval />} />
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
            {/* HERE */}
            <Route path="job_request" element={<PageJobRequest />}>
              <Route path="detail/:requestId" element={<JobRequestDetails />} />
              <Route path="view/:requestId" element={<RequestDetailPage />} />
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
            ></Route>
            <Route
              path="make_requestDeptHead"
              element={<RequestorJobRequestDeptHead />}
            >
              <Route
                path="make_request_tableDeptHead"
                element={<RequestorJobRequestTableDeptHead />}
              />
              <Route
                path="make_request_formDeptHead"
                element={<RequestorJobRequestFormDeptHead />}
              />
              <Route
                path="job_request_detailDeptHead"
                element={<RequestorJobRequestDetailDeptHead />}
              />
              <Route
                path="job_request_approvedDeptHead"
                element={<RequestorJobRequestApprovedDeptHead />}
              />
              <Route
                path="job_request_completedDeptHead"
                element={<RequestorJobRequestCompletedDeptHead />}
              />
              <Route
                path="job_request_certificateDeptHead"
                element={<RequestorCertificateDeptHead />}
              />
            </Route>
            <Route path="content" element={<ContentAprrovingCertificate />} />
          </Route>

{/* ===========================================REQUESTOR ==================================================================== */}
          {/* Protected Routes for Requestor */}
          <Route
            path="/requestor/*"
            element={
              <ProtectedRoute requiredRole="requestor">
                <PageRequestorDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<RequestorContentDashboard />} />
            {/* JOB REQUEST */}
            <Route path="job_request" element={<RequestorJobRequest />} />
          <Route path="job_request_table" element={<RequestorJobRequestTable />} />
          <Route path="job_request_detail/:requestId" element={<RequestorJobRequestDetail />} />
          <Route path="job_request_approved" element={<RequestorJobRequestApproved />} />
          <Route path="job_request_completed" element={<RequestorJobRequestCompleted />} />
          <Route path="job_request_certificate" element={<RequestorCertificate />} />
          <Route path="job_request_form" element={<RequestorJobRequestForm />} />



            {/* REQUESTOR'S PROFILE */}
            <Route path="requestor_profile" element={<RequestorPageProfile />}>
              <Route path="user_account" element={<RequestorInformation />} />
              <Route path="change_avatar" element={<RequestorChangeAvatar />} />
              <Route
                path="change_password"
                element={<RequestorChangePassword />}
              />
            </Route>

            {/* REQUESTOR'S JOB REQUEST HISTORY */}
            <Route
              path="job_request_history"
              element={<RequestorPageHistory />}
            />

            {/* REQUESTOR'S SCHEDULES */}
            <Route
              path="requestor_schedule"
              element={<RequestorPageSchedule />}
            />

            {/* USTP HARMONIZED CLIENT SATISFACTION SURVEY */}
            {/* USTP HARMONIZED CLIENT SATISFACTION SURVEY */}
            <Route path="select" element={<SelectSurveyForm />} />

            <Route path="english_version" element={<EnglishVersionForm />} />

            <Route path="tagalog_version" element={<TagalogVersionForm />} />
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
  );
}
