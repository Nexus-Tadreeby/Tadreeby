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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_40px_rgba(37,99,235,0.13)] border border-blue-600/7 w-full max-w-md p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Tadreeby Logo" className="h-8" />
          </div>

          {/* Lock Icon */}
                    <div className="flex justify-center mb-6">
                      <img 
                          src={resetPasswordImage} 
                          alt="Reset Password" 
                          className="w-[200px] h-[133px] object-contain" // Changed from h-8 to w-8 h-8
                        />
                    </div>

          <h1 className="font-['Inter'] font-bold text-[26px] leading-[31px] text-center text-[#111827] mb-1">
            Create New Password
          </h1>

          <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-8">
            Choose a strong password you haven't used before.
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-['Inter']">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="mb-4">
              <Label icon={<LockIcon />} text="New Password" />
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

            {/* Password Strength Panel */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 mb-4">
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

            {/* Reset Password Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !allRequirementsMet || !confirmPassword}
              className="w-full justify-center"
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
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M19 12H5M12 19L5 12L12 5" 
                stroke="#2563EB" 
                strokeWidth="1.33333" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <a 
              href="/login" 
              className="font-['Inter'] font-semibold text-[14.5px] leading-[18px] text-[#2563EB] hover:underline"
            >
              Back to Login
            </a>
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