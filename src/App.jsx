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
import LogIn from "./auth/LogIn.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import EditFormReferral from "./pages/department_head/Referral/EditFormReferral.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <Router>
        <Routes>
          {/* Routes for testing forms*/}

          {/* Routes for Login*/}
          <Route path="/login" element={<LogIn />} />

          {/* Protected Routes */}
          {/* Routes for Department Head */}
          <Route
            path="/department_head"
            element={
              <ProtectedRoute>
                <PageDepartMentHeadDashboard />
              </ProtectedRoute>
            }
          >
            {/* <Route
            path="/department_head"
            element={<PageDepartMentHeadDashboard />}
          > */}
            <Route path="dashboard" element={<DashboardContent />} />
            {/* <Route path="dashboard" element={<DashboardContent />} /> */}
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
              <Route
                path="edit/:referralId"
                element={<EditFormReferral />}
              />{" "}
              {/* Updated route */}
              {/* for testing edit data */}
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
    </QueryClientProvider>
  );
}
