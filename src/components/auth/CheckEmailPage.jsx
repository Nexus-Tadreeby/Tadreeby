// CheckEmailPage.jsx

import { useState, useRef, useEffect } from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Button } from "../common/Button";
import { ArrowLeft } from "../common/Icons";
import { authAPI } from "../../services/api";
import logo from "../../assets/logo.svg";
import checkEmailImage from "../../assets/checkEmail.png";

export function CheckEmailPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("ahmed@example.com"); // This would come from the previous step
  const [timer, setTimer] = useState(60); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isExpired, setIsExpired] = useState(false); // Added expiry state
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Timer countdown with expiry handling
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
      setIsExpired(true); // Set expired state
      // Clear OTP when expired
      setOtp(["", "", "", "", "", ""]);
      setError("Your verification code has expired. Please request a new one.");
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    // Don't allow input if expired
    if (isExpired) {
      setError("Code has expired. Please request a new one.");
      return;
    }
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    // Don't allow paste if expired
    if (isExpired) {
      setError("Code has expired. Please request a new one.");
      return;
    }
    
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split("");
      setOtp(digits);
      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleVerify = async () => {
    // Don't allow verification if expired
    if (isExpired) {
      setError("This code has expired. Please request a new one.");
      return;
    }

    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call your verification API
      const response = await authAPI.verifyOTP({
        email: email,
        otp: otpString,
      });

      console.log("✅ OTP verified successfully:", response);

      // Redirect to reset password page
      window.location.href = "/reset-password";
    } catch (err) {
      console.error("❌ OTP verification error:", err);

      let errorMessage = "Invalid verification code. Please try again.";

      if (err.status === 400) {
        errorMessage = "Invalid or expired verification code.";
      } else if (err.status === 429) {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (err.data?.message) {
        errorMessage = err.data.message;
      }

      setError(errorMessage);

      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError(null);

    try {
      // Call resend OTP API
      const response = await authAPI.resendOTP({
        email: email,
      });

      console.log("✅ OTP resent successfully:", response);

      // Reset everything to initial scenario
      setTimer(60); // Reset to 60 seconds
      setCanResend(false);
      setIsExpired(false); // Reset expired state
      setOtp(["", "", "", "", "", ""]);
      setError(null); // Clear any error
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (err) {
      console.error("❌ Resend OTP error:", err);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          {/* Check Email Icon - Fixed size */}
          <div className="flex justify-center mb-4 animate-float-slow">
            <img
              src={checkEmailImage}
              alt="Check Email"
              className="w-[180px] h-[120px] object-contain drop-shadow-md"
            />
          </div>
          <h1 className="font-['Inter'] font-extrabold text-[26px] leading-[31px] text-center text-[#111827] mb-1">
            Check Your Email
          </h1>

          <p className="font-['Inter'] font-normal text-[15px] leading-[22px] text-center text-[#6B7280] mb-6">
            We've sent a 6-digit reset code to{" "}
            <span className="font-semibold text-[#111827] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">{email}</span>.
            <span className="block mt-2 text-sm text-[#6B7280]">
              Code expires in{" "}
              <span className={`font-semibold px-2 py-0.5 rounded-md ${isExpired ? 'text-red-600 bg-red-50' : 'text-[#2563EB] bg-blue-50/60 animate-pulse'}`}>
                {isExpired ? 'Expired' : formatTime(timer)}
              </span>
            </span>
          </p>

          {error && (
            <div className={`mb-6 p-3.5 ${isExpired ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-red-50 border-red-200 text-red-600'} border rounded-2xl animate-scale-up`}>
              <p className="text-sm font-medium font-['Inter'] flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isExpired ? 'bg-amber-500' : 'bg-red-500'} shrink-0`} />
                {error}
              </p>
            </div>
          )}

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2.5 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isExpired}
                className={`
                  w-12 h-14 sm:w-14 sm:h-16 text-center font-['Inter'] font-bold text-2xl text-[#111827]
                  bg-white border-2 rounded-2xl outline-none transition-all duration-200
                  ${isExpired ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200' : ''}
                  ${digit ? "border-[#2563EB] bg-blue-50/40 shadow-[0_0_0_4px_rgba(37,99,235,0.12)] scale-[1.03]" : "border-[#E5E7EB] hover:border-gray-300"}
                  focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] focus:scale-[1.05]
                `}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <span className="font-['Inter'] font-normal text-[14px] leading-[17px] text-[#6B7280]">
              {isExpired ? "Code expired!" : "Didn't receive the code?"}
            </span>
            <button
              onClick={handleResend}
              disabled={!canResend || isLoading}
              className={`
                font-['Inter'] font-semibold text-[14px] leading-[17px] transition-colors
                ${canResend ? "text-[#2563EB] hover:underline cursor-pointer hover:text-blue-700" : "text-[#9CA3AF] cursor-not-allowed"}
              `}
            >
              {isLoading ? "Sending..." : "Resend Code"}
            </button>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            variant="primary"
            disabled={isLoading || otp.some((d) => !d) || isExpired}
            className="w-full justify-center py-3.5 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner />
                Verifying...
              </span>
            ) : (
              "Verify Code"
            )}
          </Button>

          {/* Back to Login Link */}
          <div className="mt-6 flex items-center justify-center gap-1.5 group">
            <ArrowLeft className="w-4 h-4 text-[#2563EB] transition-transform duration-200 group-hover:-translate-x-1" />
            <Link
              to="/login"
              className="font-['Inter'] font-semibold text-[14.5px] leading-[18px] text-[#2563EB] hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}