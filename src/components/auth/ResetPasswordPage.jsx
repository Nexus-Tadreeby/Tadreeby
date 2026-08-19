// ResetPasswordPage.jsx

import { useState } from "react";
import { Footer } from "../layout/Footer";
import { Button } from "../common/Button";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { LockIcon, EyeIcon, CheckIcon } from "../common/Icons";
import { authAPI } from "../../services/api";
import logo from "../../assets/logo.svg";
import resetPasswordImage from "../../assets/resetPassword.png";    

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Password requirements
  const requirements = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const allRequirementsMet = Object.values(requirements).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allRequirementsMet) {
      setError("Please meet all password requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call your reset password API
      const response = await authAPI.resetPassword({
        password: newPassword,
        // Add any other required fields like token, email, etc.
      });

      console.log("✅ Password reset successfully:", response);
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

    } catch (err) {
      console.error("❌ Password reset error:", err);

      let errorMessage = "Failed to reset password. Please try again.";

      if (err.status === 400) {
        errorMessage = err.data?.message || "Invalid password. Please try again.";
      } else if (err.status === 401) {
        errorMessage = "Session expired. Please request a new reset link.";
      } else if (err.status === 429) {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (err.data?.message) {
        errorMessage = err.data.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const RequirementItem = ({ met, text }) => (
    <div className="flex items-center gap-2.5">
      <div className="w-4 h-4 flex items-center justify-center">
        {met ? (
          <CheckIcon className="w-4 h-4 text-[#10B981]" />
        ) : (
          <div className="w-4 h-4 border-[1.2px] border-[#D1D5DB] rounded-full" />
        )}
      </div>
      <span className={`font-['Inter'] font-normal text-[13.5px] leading-4 ${met ? 'text-[#10B981]' : 'text-[#6B7280]'}`}>
        {text}
      </span>
    </div>
  );
    /////// must
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_40px_rgba(37,99,235,0.13)] border border-blue-600/7 w-full max-w-md p-8 sm:p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-['Inter'] font-bold text-2xl text-[#111827] mb-2">
              Password Reset Successfully!
            </h2>
            <p className="font-['Inter'] text-[15px] text-[#6B7280]">
              Your password has been reset. Redirecting to login...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

          {/* Lock Icon */}
          <div className="flex justify-center mb-4 animate-float-slow">
            <img 
              src={resetPasswordImage} 
              alt="Reset Password" 
              className="w-[180px] h-[120px] object-contain drop-shadow-md"
            />
          </div>

          <h1 className="font-['Inter'] font-extrabold text-[26px] leading-[31px] text-center text-[#111827] mb-1">
            Create New Password
          </h1>

          <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-6">
            Choose a strong password you haven't used before.
          </p>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200/80 rounded-2xl animate-scale-up">
              <p className="text-red-600 text-sm font-medium font-['Inter'] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="mb-4">
              <Label icon={<LockIcon />} text="New Password" />
              <div className="mt-1 transition-all duration-200 focus-within:scale-[1.01]">
                <InputField
                  icon={<LockIcon />}
                  placeholder="••••••••••"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  rightIcon={
                    <EyeIcon
                      show={showNewPassword}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  }
                />
              </div>
            </div>

            {/* Password Strength Panel */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 mb-5 transition-all">
              <p className="font-['Inter'] font-semibold text-[13px] leading-4 text-[#374151] mb-2.5">
                Password must contain:
              </p>
              <div className="space-y-2">
                <RequirementItem met={requirements.minLength} text="At least 8 characters" />
                <RequirementItem met={requirements.hasUppercase} text="At least one uppercase letter" />
                <RequirementItem met={requirements.hasLowercase} text="At least one lowercase letter" />
                <RequirementItem met={requirements.hasNumber} text="At least one number" />
                <RequirementItem met={requirements.hasSpecial} text="At least one special character" />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <Label icon={<LockIcon />} text="Confirm New Password" />
              <div className="mt-1 transition-all duration-200 focus-within:scale-[1.01]">
                <InputField
                  icon={<LockIcon />}
                  placeholder="••••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  rightIcon={
                    <EyeIcon
                      show={showConfirmPassword}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                />
              </div>
            </div>

            {/* Reset Password Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !allRequirementsMet || !confirmPassword}
              className="w-full justify-center py-3.5 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner />
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 flex items-center justify-center gap-1.5 group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:-translate-x-1">
              <path 
                d="M19 12H5M12 19L5 12L12 5" 
                stroke="#2563EB" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
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
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}