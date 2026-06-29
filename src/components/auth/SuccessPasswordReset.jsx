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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_40px_rgba(37,99,235,0.13)] border border-blue-600/7 w-full max-w-md p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Tadreeby Logo" className="h-8" />
          </div>

          {/* Password Updated Icon - Fixed size */}
                    <div className="flex justify-center mb-6">
                      <img 
                          src={passwordUpdatedImage} 
                          alt="Password Updated" 
                          className="w-[200px] h-[133px] object-contain" // Changed from h-8 to w-8 h-8
                        />
                    </div>

          <h1 className="font-['Inter'] font-bold text-[28px] leading-[34px] text-center text-[#111827] mb-2">
            Password Updated!
          </h1>

          <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-8">
            Your password has been changed successfully. <br />
            You can now log in with your new password.
          </p>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            variant="primary"
            className="w-full justify-center"
          >
            Login Now
          </Button>

          {/* Redirecting message */}
          <p className="font-['Inter'] font-normal text-[13px] leading-4 text-center text-[#6B7280] mt-4">
            Redirecting you to login in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}