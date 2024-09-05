import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageDepartMentHeadDashboard from "./pages/department_head/Dashboard/PageDepartMentHeadDashboard.jsx";
import PageReport from "./pages/department_head/SendReport/PageReport.jsx";
import PageJobRequest from "./pages/department_head/JobRequest/PageJobRequest.jsx";
import JobOngoing from "./pages/department_head/JobRequest/PageJobOngoing.jsx";
import JobCompleted from "./pages/department_head/JobRequest/PageJobCompleted.jsx";
import PageEmployee from "./pages/department_head/Employee/PageEmployee.jsx";
import PageReferral from "./pages/department_head/Referral/PageReferral.jsx";
import PageProfile from "./pages/department_head/Profile/PageProfile.jsx";
import PageCertificate from "./pages/department_head/ApprovingOfCertificateJobCompletion/PageCertificate.jsx";
import PageHistory from "./pages/department_head/JobRequestHistory/PageHistory.jsx";
import ViewJobRequest from "./pages/department_head/JobRequest/ViewJobRequest.jsx";
import ViewJobRequestRemarks from "./pages/department_head/JobRequest/ViewJobRequestRemarks.jsx";
import ViewJobOngoing from "./pages/department_head/JobRequest/ViewJobOngoing.jsx";
import ViewJobCompleted from "./pages/department_head/JobRequest/ViewJobCompleted.jsx";
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
import PageRequestorDashboard from "./pages/requestor/Dashboard/RequestorPageDashboard.jsx";
import RequestorContentDashboard from "./pages/requestor/Dashboard/RequestorContentDashboard.jsx";
import RequestorJobRequestDetail from "./pages/requestor/JobRequestDetail/RequestorPageJobRequestDetail.jsx";
import RequestorJobRequest from "./pages/requestor/JobRequest/RequestorPageJobRequest.jsx";
import RequestorJobRequestForm from "./pages/requestor/JobRequest/RequestorJobRequestForm.jsx";
import RequestorJobRequestTable from "./pages/requestor/JobRequest/RequestorJobRequestTable.jsx";
import RequestorPageProfile from "./pages/requestor/Profile/RequestorpPageProfile.jsx";
import RequestorPageHistory from "./pages/requestor/History/RequestorPageHistory.jsx";
import RequestorPageSchedule from "./pages/requestor/Schedules/RequestorPageSchedules.jsx";

export default function App() {
  return (
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
          <Route path="requestor_schedule" element={<RequestorPageSchedule />} >
          </Route>
        </Route>
        {/* END OF REQUESTOR */}

        {/* Routes for Department Head */}
        <Route
          path="/department_head"
          element={<PageDepartMentHeadDashboard />}
        >
          <Route path="home" element={<DashboardContent />} />
          {/* Routes for Profile */}
          <Route path="myprofile" element={<PageProfile />}>
            <Route path="user_account" element={<UserInformation />} />
            <Route path="change_avatar" element={<ChangeAvatar />} />
            <Route path="change_password" element={<ChangePassword />} />
          </Route>
          {/* Routes for Report */}
          <Route path="report" element={<PageReport />}>
            <Route path="view" element={<ReportView />} />
            <Route path="send_report" element={<SendReportForm />} />
            <Route path="employee" element={<ViewAddEmployee />} />
          </Route>
          {/* Routes for Employee */}
          <Route path="employee" element={<PageEmployee />}>
            <Route path="add" element={<ViewAddEmployee />} />
            <Route path="view" element={<ViewEmployee />} />
            <Route path="history" element={<TableEmployeeHistory />}>
              <Route path="view" element={<EmployeeHistoryView />} />
            </Route>
          </Route>

          {/* Routes for Referral */}
          <Route path="referral" element={<PageReferral />}>
            <Route path="view" element={<ReferralJobRequestView />} />
          </Route>

          {/* Routes for History */}
          <Route path="history" element={<PageHistory />}>
            <Route path="content" element={<TableHistory />}>
              <Route path="information" element={<ViewHistory />} />
            </Route>
          </Route>

          {/* Routes for Job Request  */}

          <Route path="job_request" element={<PageJobRequest />}>
            <Route path="view" element={<ViewJobRequest />} />
            <Route path="remarks" element={<ViewJobRequestRemarks />} />
          </Route>

          {/* Routes for Job Ongoing  */}
          <Route path="job_ongoing" element={<JobOngoing />}>
            <Route path="view" element={<ViewJobOngoing />} />
          </Route>

          {/* Routes for Job Completed  */}
          <Route path="job_completed" element={<JobCompleted />}>
            <Route path="view" element={<ViewJobCompleted />} />
          </Route>

          {/* Routes for Aprroving of Job Completion  */}
          <Route
            path="approving_of_job_completion"
            element={<PageCertificate />}
          >
            <Route path="content" element={<ContentAprrovingCertificate />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
