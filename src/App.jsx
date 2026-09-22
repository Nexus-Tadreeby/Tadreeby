import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/auth/LoginPage";
import { RegistrationPage } from "./components/auth/RegistrationPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import { CheckEmailPage } from "./components/auth/CheckEmailPage";
import { ResetPasswordPage } from "./components/auth/ResetPasswordPage";
import LandingPage from "./components/pages/LandingPage";

import { ProtectedRoute } from "./routes/ProtectedRoute";
//import { UnauthorizedPage } from "./components/auth/UnauthorizedPage";

const SuperAdminDashboard = lazy(() => import("./components/pages/superAdmin/SuperAdminDashboard"));
const Universities = lazy(() => import("./components/pages/superAdmin/Universities"));
const Companies = lazy(() => import("./components/pages/superAdmin/Companies"));
// import UsersPage from "./components/pages/superAdmin/UsersPage";
// import SystemLogsPage from "./components/pages/superAdmin/SystemLogsPage";
// import SuperAdminProfile from "./components/pages/superAdmin/SuperAdminProfile";

const StudentDashboard = lazy(() => import("./components/pages/student/StudentDashboard"));
const StudentProfile = lazy(() => import("./components/pages/student/StudentProfile"));
const Settings = lazy(() => import("./components/common/pagesAssets/Settings"));
const Internships = lazy(() => import("./components/pages/opportunities/opportunities"));
const InternshipDetails = lazy(() => import("./components/pages/opportunities/OpportunityDetails"));
import NotFoundPage from "./components/pages/NotFoundPage";
import TermsAndPrivacyPage from "./components/pages/TermsAndPrivacyPage";
const MyInternship = lazy(() => import("./components/pages/internship/my-internship"));
const StudentChats = lazy(() => import("./components/pages/student/studentChats"));
const Attendance = lazy(() => import("./components/pages/student/Attendance"));
const UniversityAdminDashboard = lazy(() => import("./components/pages/university-admin/UniversityAdminDashboard"));
const StudentTasks = lazy(() => import("./components/pages/student/StudentTasks"));
const CompanyDashboard = lazy(() => import("./components/pages/company-admin/companyDashboard"));
const CreateOpportunity = lazy(() => import("./components/pages/company-admin/CreateOpportunity"));
const CreateTrainer = lazy(() => import("./components/pages/company-admin/CreateTrainer"));
const Opportunities = lazy(() => import("./components/pages/company-admin/Opportunities"));
const Trainers = lazy(() => import("./components/pages/company-admin/Trainers"));
const TrainerDashboard = lazy(() => import("./components/pages/company-trainer/TrainerDashboard"));
const TrainerInternshipDetails = lazy(() => import("./components/pages/company-trainer/trainer-internship-details/TrainerInternshipDetails"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB]" role="status">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0475FB]/20 border-t-[#0475FB]" />
    <span className="sr-only">Loading page</span>
  </div>
);

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
      <Route path="/student/chats" element={<StudentChats />} />

      {/* SUPER_ADMIN routes */}
      <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
        <Route path="/superAdmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/superAdmin/universities" element={<Universities />} />
        <Route path="/superAdmin/companies" element={<Companies />} />
      </Route>

      {/* STUDENT routes */}
      <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/opportunities" element={<Internships />} />
        <Route
          path="/student/opportunities/:id"
          element={<InternshipDetails />}
        />
        <Route
          path="/student/opportunity/:id"
          element={<InternshipDetails />}
        />
        <Route path="/student/internships" element={<Internships />} />
        <Route
          path="/student/internships/:id"
          element={<InternshipDetails />}
        />
        <Route path="/student/internship/:id" element={<InternshipDetails />} />
        <Route path="/student/my-internship" element={<MyInternship />} />
        <Route path="/internship/my-internship" element={<MyInternship />} />
        <Route path="/my/internship" element={<MyInternship />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/tasks" element={<StudentTasks />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* UNIVERSITY_ADMIN routes */}
      <Route element={<ProtectedRoute allowedRoles={["UNIVERSITY_ADMIN"]} />}>
        <Route
          path="/universityAdmin/dashboard"
          element={<UniversityAdminDashboard />}
        />
        {/* Add other university admin routes here */}
      </Route>

      {/* COMPANY_ADMIN or other roles */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["COMPANY_ADMIN"]} />
        }
      >
        <Route path="/company/admin/dashboard" element={<CompanyDashboard />} />
        <Route
          path="/company/admin/opportunities/create"
          element={<CreateOpportunity />}
        />
        <Route path="/company/admin/trainers" element={<Trainers />} />
        <Route
          path="/company/admin/trainers/create"
          element={<CreateTrainer />}
        />
        <Route
          path="/company/admin/opportunities"
          element={<Opportunities />}
        />

        
        {/* <Route path="/companyAdmin/opportunities/create" element={<CreateOpportunity />} />
        <Route path="/companyAdmin/opportunities/:id/edit" element={<EditOpportunity />} /> // للتعديل
        <Route path="/companyAdmin/opportunities/:id" element={<OpportunityDetails />} /> */}
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["COMPANY_TRAINER"]} />}>
          <Route path="/company/trainer/internship" element={<TrainerInternshipDetails />} />
          <Route
            path="/company/trainer/dashboard"
            element={<TrainerDashboard />}
          />
        </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
  );
}

export default App;
