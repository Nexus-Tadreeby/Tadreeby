import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from "./components/auth/LoginPage";
import { RegistrationPage } from "./components/auth/RegistrationPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import { CheckEmailPage } from "./components/auth/CheckEmailPage";
import { ResetPasswordPage } from "./components/auth/ResetPasswordPage";
import Dashboard from "./components/pages/dashboard";
// import { SuccessPasswordReset } from "./components/auth/SuccessPasswordReset";
import {LandingPage} from "./components/pages/LandingPage";


function App() {
    return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/reset-success" element={<SuccessPasswordReset />} /> */}
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;