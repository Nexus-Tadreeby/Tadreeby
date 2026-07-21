import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from "./components/auth/LoginPage";
import { RegistrationPage } from "./components/auth/RegistrationPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import { CheckEmailPage } from "./components/auth/CheckEmailPage";
import { ResetPasswordPage } from "./components/auth/ResetPasswordPage";
import LandingPage from "./components/pages/LandingPage";

import { ProtectedRoute } from "./routes/ProtectedRoute";
//import { UnauthorizedPage } from "./components/auth/UnauthorizedPage";

import SuperAdminDashboard from "./components/pages/superAdmin/SuperAdminDashboard";
import Universities from "./components/pages/superAdmin/Universities";
import Companies from "./components/pages/superAdmin/Companies";
// import UsersPage from "./components/pages/superAdmin/UsersPage";
// import SystemLogsPage from "./components/pages/superAdmin/SystemLogsPage";
// import SuperAdminProfile from "./components/pages/superAdmin/SuperAdminProfile";

import StudentDashboard from './components/pages/student/StudentDashboard';
import StudentProfile from "./components/pages/student/StudentProfile";
// import InternshipsPage from "./components/pages/student/InternshipsPage";
// import MyInternshipPage from "./components/pages/student/MyInternshipPage";
// import AttendancePage from "./components/pages/student/AttendancePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/check-email" element={<CheckEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

      <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
        <Route path="/superAdmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/superAdmin/universities" element={<Universities />} />
        <Route path="/superAdmin/companies" element={<Companies />} />
        {/* <Route path="/users" element={<UsersPage />} /> */}
        {/* <Route path="/logs" element={<SystemLogsPage />} /> */}
        {/* <Route path="/profile" element={<SuperAdminProfile />} /> */}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        {/* <Route path="/student-internships" element={<InternshipsPage />} /> */}
        {/* <Route path="/my-internship" element={<MyInternshipPage />} /> */}
        {/* <Route path="/attendance" element={<AttendancePage />} /> */}
        <Route path="/student/profile" element={<StudentProfile />} />
      </Route>
    </Routes>
  );
}

export default App;