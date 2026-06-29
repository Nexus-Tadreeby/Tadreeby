import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from "./components/auth/LoginPage";
import { RegistrationPage } from "./components/auth/RegistrationPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import { CheckEmailPage } from "./components/auth/CheckEmailPage";
import { ResetPasswordPage } from "./components/auth/ResetPasswordPage";
import { SuccessPasswordReset } from "./components/auth/SuccessPasswordReset";
import {LandingPage} from "./components/pages/LandingPage";


function App() {
    return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-success" element={<SuccessPasswordReset />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;