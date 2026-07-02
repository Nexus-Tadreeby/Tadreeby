// LoginPage.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Footer } from "../layout/Footer";
import { Button } from "../common/Button";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { MailIcon, LockIcon, EyeIcon } from "../common/Icons";
import { authAPI } from "../../services/api";
import logo from "../../assets/logo.svg";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call your login API
      const response = await authAPI.login({
        email: email.trim().toLowerCase(),
        password: password,
      });

      console.log("✅ Login successful:", response);

      // Store tokens
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
      }
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      // Redirect to dashboard or home page
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);

      let errorMessage = "Login failed. Please try again.";

      if (err.status === 401) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (err.status === 404) {
        errorMessage = "Account not found. Please check your email or sign up.";
      } else if (err.status === 429) {
        errorMessage = "Too many login attempts. Please try again later.";
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

          <h1 className="font-['Inter'] font-bold text-[28px] leading-[34px] text-center text-[#111827] mb-1">
            Welcome Back
          </h1>

          <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-8">
            Log in to continue your journey with Tadreeby
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-['Inter']">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-5">
              <Label icon={<MailIcon />} text="Email Address" />
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
                }}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 font-['Inter']">
                  {validationErrors.email}
                </p>
              )}
              <p className="text-[#9CA3AF] text-[13px] leading-4 mt-2 font-['Inter']">
                Your email should follow this format: name@example.com
              </p>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <Label icon={<LockIcon />} text="Password" />
              <InputField
                icon={<LockIcon />}
                placeholder="••••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors({
                      ...validationErrors,
                      password: null,
                    });
                  }
                }}
                rightIcon={
                  <EyeIcon
                    show={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                }
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1 font-['Inter']">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 border-[1.5px] border-[#D1D5DB] rounded-[6px] cursor-pointer accent-[#F97316]"
                />
                <label
                  htmlFor="rememberMe"
                  className="font-['Inter'] font-normal text-[14px] leading-[17px] text-[#374151] cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link
              to="/forgot-password"
              className="font-['Inter'] font-medium text-[14px] leading-[17px] text-[#2563EB] hover:underline"
            >
              Forgot Password?
            </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-[#E5E7EB]" />
            <span className="font-['Inter'] font-normal text-[13px] leading-4 text-[#6B7280] whitespace-nowrap">
              New to Tadreeby?
            </span>
            <hr className="flex-1 border-[#E5E7EB]" />
          </div>

          {/* Create Account Link */}
          <Link
            to="/register"
            className="block text-center font-['Inter'] font-semibold text-[15px] leading-[18px] text-[#2563EB] hover:underline"
          >
            Create a Student Account
          </Link>
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
