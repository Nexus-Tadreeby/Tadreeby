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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50/60 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />

      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(37,99,235,0.12)] border border-blue-600/10 w-full max-w-md p-8 sm:p-10 animate-fade-in-up hover:shadow-[0_8px_32px_rgba(37,99,235,0.16)] transition-all duration-300">
          <div className="flex justify-center mb-6 transition-transform hover:scale-105 duration-300">
            <img src={logo} alt="Tadreeby Logo" className="h-8 w-auto" />
          </div>
          {/* Forgot Password Icon - Fixed size */}
          <div className="flex justify-center mb-6 animate-float-slow">
            <img 
              src={forgotPasswordImage} 
              alt="Forgot Password" 
              className="w-[200px] h-[133px] object-contain drop-shadow-md"
            />
          </div>

          {success ? (
            // Success State
            <div className="text-center animate-scale-up">
              <h2 className="font-['Inter'] font-extrabold text-[22px] text-[#111827] mb-2">
                Check Your Email
              </h2>
              <p className="font-['Inter'] font-normal text-[15px] text-[#6B7280] mb-6 leading-relaxed">
                We've sent a password reset code to <br />
                <span className="font-semibold text-[#111827] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">{email}</span>
              </p>
              <p className="font-['Inter'] font-normal text-[13px] text-[#6B7280] mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleSubmit}
                  className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
                >
                  try again
                </button>
              </p>
              <Link to="/login">
                <Button variant="secondary" className="w-full justify-center shadow-sm hover:shadow transition-all">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            // Form State
            <div className="animate-fade-in">
              <h1 className="font-['Inter'] font-extrabold text-[26px] leading-[31px] text-center text-[#111827] mb-1">
                Forgot Your Password?
              </h1>

              <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-8">
                No worries — enter your email and we'll send you a reset code.
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
                {/* Email Field */}
                <div className="mb-6">
                  <Label 
                    icon={<MailIcon />} 
                    text="Email Address" 
                  />
                  <div className="mt-1 transition-all duration-200 focus-within:scale-[1.01]">
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
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs mt-1 font-['Inter'] animate-fade-in">{validationErrors.email}</p>
                  )}
                </div>

                {/* Send Reset Code Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full justify-center py-3.5 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5"
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
            </div>
          )}

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