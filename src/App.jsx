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
import Settings from "./components/common/pagesAssets/Settings";
import Internships from "./components/pages/opportunities/opportunities";
import InternshipDetails from "./components/pages/opportunities/OpportunityDetails";
import NotFoundPage from "./components/pages/NotFoundPage";
import TermsAndPrivacyPage from "./components/pages/TermsAndPrivacyPage";
import MyInternship from "./components/pages/internship/my-internship";
import StudentChats from "./components/pages/student/studentChats"; 
import Attendance from './components/pages/student/Attendance';
import UniversityAdminDashboard from './components/pages/university-admin/UniversityAdminDashboard';
import StudentTasks from './components/pages/student/StudentTasks';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/check-email" element={<CheckEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/terms-privacy" element={<TermsAndPrivacyPage />} />
      <Route path="/terms" element={<TermsAndPrivacyPage />} />
      <Route path="/privacy" element={<TermsAndPrivacyPage />} />
      {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
      <Route path="/student/chats" element={<StudentChats />} />
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

        <Route path="/student/opportunities" element={<Internships />} />
        <Route path="/student/opportunities/:id" element={<InternshipDetails />} />
        <Route path="/student/opportunity/:id" element={<InternshipDetails />} />

        <Route path="/student/internships" element={<Internships />} />
        <Route path="/student/internships/:id" element={<InternshipDetails />} />
        <Route path="/student/internship/:id" element={<InternshipDetails />} />

        <Route path="/student/my-internship" element={<MyInternship />} />
        <Route path="/internship/my-internship" element={<MyInternship />} />
        <Route path="/my/internship" element={<MyInternship />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/tasks" element={<StudentTasks />} />
        <Route path="/settings" element={<Settings />} />



        <Route path="/universityAdmin/dashboard" element={<UniversityAdminDashboard />} />

      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;