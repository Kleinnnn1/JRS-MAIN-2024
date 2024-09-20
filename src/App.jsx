import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
{/* Staff */}
import ContentDashStaff from "./pages/staff/Dashboard/StaffContentDash.jsx";
import MainDashStaff from "./pages/staff/Dashboard/StaffMainDashboard.jsx";
import OngoingStaff from "./pages/staff/Task/StaffOngoingTask.jsx";
import StaffProfile from "./pages/staff/Profile/StaffPageProfile.jsx";
import StaffUserInfo from "./pages/staff/Profile/StaffUserInfo.jsx";
import StaffChangeAvatar from "./pages/staff/Profile/StaffAvatar.jsx";
import StaffChangePassword from "./pages/staff/Profile/StaffChangePassword.jsx";
import StaffPageCertificate from "./pages/staff/SendCert/StaffPageCert.jsx";
import StaffSendCert from "./pages/staff/SendCert/StaffContentSendCert.jsx";
import StaffImageContent from "./pages/staff/Task/StaffImageContent.jsx";
import StaffImagePage from "./pages/staff/Task/StaffOngoingPage.jsx";
import StaffHistoryPage from "./pages/staff/History/StaffHistoryPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for Login*/}
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Routes for Department Head */}
         {/* Routes for Staff */}
         <Route
          path="/staff"
          element={<MainDashStaff/>}
        >
          <Route path="home" element={<ContentDashStaff />} />
          {/* Routes for Ongoing */}
          <Route
            path="StaffImagePage"
            element={<StaffImagePage />}
          >
            <Route path="StaffImageContent" element={<StaffImageContent/>} />
            
          </Route>
            {/* Completed Staff */}
             {/* Routes for History  */}
             <Route
              path="History"
                element={<StaffHistoryPage />}
              >
                <Route path="StaffImageContent" element={<StaffImageContent/>} />
                
              </Route>
          {/* Routes for Profile */}
          <Route path="Staffprofile" element={<StaffProfile />}>
            <Route path="user_account" element={<StaffUserInfo />} /> 
            <Route path="Staffchange_avatar" element={<StaffChangeAvatar />} />
            <Route path="Staffchange_password" element={<StaffChangePassword />} />
          </Route>
          {/* Routes for Sending Certificate  */}
          <Route
            path="StaffSendCert"
            element={<StaffPageCertificate />}
          >
            <Route path="StaffCert" element={<StaffSendCert/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
