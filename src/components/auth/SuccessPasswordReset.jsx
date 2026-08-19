// SuccessPasswordReset.jsx

import { useState, useEffect } from "react";
import { Footer } from "../layout/Footer";
import { Button } from "../common/Button";
import logo from "../../assets/logo.svg";
import passwordUpdatedImage from "../../assets/passwordUpdated.png";

export function SuccessPasswordReset() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Redirect to login
          window.location.href = "/login";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50/60 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />

      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(37,99,235,0.12)] border border-blue-600/10 w-full max-w-md p-8 sm:p-10 animate-fade-in-up hover:shadow-[0_8px_32px_rgba(37,99,235,0.16)] transition-all duration-300">
          {/* Logo */}
          <div className="flex justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <img src={logo} alt="Tadreeby Logo" className="h-8 w-auto" />
          </div>

          {/* Password Updated Icon */}
          <div className="flex justify-center mb-4 animate-scale-up">
            <img 
              src={passwordUpdatedImage} 
              alt="Password Updated" 
              className="w-[180px] h-[120px] object-contain drop-shadow-md"
            />
          </div>

          <h1 className="font-['Inter'] font-extrabold text-[28px] leading-[34px] text-center text-[#111827] mb-2">
            Password Updated!
          </h1>

          <p className="font-['Inter'] font-normal text-[15px] leading-[22px] text-center text-[#6B7280] mb-8">
            Your password has been changed successfully. <br />
            You can now log in with your new password.
          </p>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            variant="primary"
            className="w-full justify-center py-3.5 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5"
          >
            Login Now
          </Button>

          {/* Redirecting message */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
            <p className="font-['Inter'] font-medium text-[13px] leading-4 text-center text-[#6B7280]">
              Redirecting you to login in <span className="text-[#2563EB] font-bold">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}