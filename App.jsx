import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
{/* Staff */}
import ContentDashStaff from "./pages/staff/Dashboard/StaffContentDash.jsx";
import MainDashStaff from "./pages/staff/Dashboard/StaffMainDashboard.jsx";
import OngoingStaff from "./pages/staff/Task/StaffOngoingTask.jsx";
import CompletedStaff from "./pages/staff/History/CompletedTask.jsx";
import StaffProfile from "./pages/staff/Profile/StaffPageProfile.jsx";
import StaffUserInfo from "./pages/staff/Profile/StaffUserInfo.jsx";
import StaffChangeAvatar from "./pages/staff/Profile/StaffAvatar.jsx";
import StaffChangePassword from "./pages/staff/Profile/StaffChangePassword.jsx";


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
            <Route path="ongoing" element={<OngoingStaff/>}>
          </Route>
            {/* Completed Staff */}
          <Route path="CompletedStaff" element={<CompletedStaff/>}>
          </Route>
          {/* Routes for Profile */}
          <Route path="Staffprofile" element={<StaffProfile />}>
            <Route path="user_account" element={<StaffUserInfo />} /> 
            <Route path="Staffchange_avatar" element={<StaffChangeAvatar />} />
            <Route path="Staffchange_password" element={<StaffChangePassword />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}
