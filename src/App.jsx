import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
