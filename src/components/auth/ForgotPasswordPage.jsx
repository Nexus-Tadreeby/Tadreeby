// ForgotPasswordPage.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Button } from "../common/Button";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { MailIcon, ArrowLeft } from "../common/Icons";
import { authAPI } from "../../services/api";
import logo from "../../assets/logo.svg";
import forgotPasswordImage from "../../assets/forgotPassword.png";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call your forgot password API
      const response = await authAPI.forgotPassword({
        email: email.trim().toLowerCase()
      });
      
      console.log("✅ Reset code sent successfully:", response);
      setSuccess(true);
      
    } catch (err) {
      console.error("❌ Forgot password error:", err);
      
      let errorMessage = "Failed to send reset code. Please try again.";
      
      if (err.status === 404) {
        errorMessage = "No account found with this email address.";
      } else if (err.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      } else if (err.data?.message) {
        errorMessage = err.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col overflow-hidden">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_40px_rgba(37,99,235,0.13)] border border-blue-600/7 w-full max-w-md p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Tadreeby Logo" className="h-8" />
          </div>
          {/* Forgot Password Icon - Fixed size */}
          <div className="flex justify-center mb-6">
            <img 
                src={forgotPasswordImage} 
                alt="Forgot Password" 
                className="w-[200px] h-[133px] object-contain" // Changed from h-8 to w-8 h-8
              />
          </div>

          {success ? (
            // Success State
            <div className="text-center">
              <h2 className="font-['Inter'] font-bold text-[22px] text-[#111827] mb-2">
                Check Your Email
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] text-[#6B7280] mb-6">
                We've sent a password reset code to <br />
                <span className="font-semibold text-[#111827]">{email}</span>
              </p>
              <p className="font-['Inter'] font-normal text-[13px] text-[#6B7280] mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleSubmit}
                  className="text-[#2563EB] font-semibold hover:underline"
                >
                  try again
                </button>
              </p>
              <Link to="/login">
                <Button variant="secondary" className="w-full justify-center">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            // Form State
            <>
              <h1 className="font-['Inter'] font-bold text-[26px] leading-[31px] text-center text-[#111827] mb-1">
                Forgot Your Password?
              </h1>

              <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-8">
                No worries — enter your email and we'll send you a reset code.
              </p>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-['Inter']">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-6">
                  <Label 
                    icon={<MailIcon />} 
                    text="Email Address" 
                  />
                  <InputField
                    icon={<MailIcon />}
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationErrors.email) {
                        setValidationErrors({ ...validationErrors, email: null });
                      }
                      if (error) {
                        setError(null);
                      }
                    }}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs mt-1 font-['Inter']">{validationErrors.email}</p>
                  )}
                </div>

                {/* Send Reset Code Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full justify-center"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner />
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
              </form>
            </>
          )}

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