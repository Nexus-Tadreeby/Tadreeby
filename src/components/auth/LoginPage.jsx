// // LoginPage.jsx

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Footer } from "../layout/Footer";
// import { Button } from "../common/Button";
// import { InputField } from "../common/InputField";
// import { Label } from "../common/Label";
// import { MailIcon, LockIcon, EyeIcon } from "../common/Icons";
// import { authAPI } from "../../services/api";
// import { useAuth } from "../../context/AuthContext";
// import { useToast } from "../../context/ToastContext";
// import { ROLE_HOME_ROUTES } from "../../constants/roles";
// import logo from "../../assets/logo.svg";

// export function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const { showToast } = useToast();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};
//     if (!email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Please enter a valid email address";
//     }
//     if (!password) {
//       errors.password = "Password is required";
//     } else if (password.length < 8) {
//       errors.password = "Password must be at least 8 characters";
//     }
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await authAPI.login({
//         email: email.trim().toLowerCase(),
//         password,
//       });

//       console.log("✅ Login successful:", response);

//       // Update AuthContext (this also persists to localStorage internally)
//       login(response.user, response.accessToken, response.refreshToken);
//       showToast(`Welcome back, ${response.user?.firstName || "User"}! Logged in successfully.`, "success");

//       const homeRoute = ROLE_HOME_ROUTES[response.user.role];
//       if (!homeRoute) {
//         console.error("⚠️ No home route mapped for role:", response.user.role);
//       }
//       navigate(homeRoute ?? "/login", { replace: true });
//     } catch (err) {
//       console.error("❌ Login error:", err);
//       let errorMessage = "Login failed. Please try again.";
//       if (err.status === 401) {
//         errorMessage = "Invalid email or password. Please try again.";
//       } else if (err.status === 404) {
//         errorMessage = "Account not found. Please check your email or sign up.";
//       } else if (err.status === 429) {
//         errorMessage = "Too many login attempts. Please try again later.";
//       } else if (err.data?.message) {
//         errorMessage = err.data.message;
//       }
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50/60 flex flex-col justify-between relative overflow-hidden">
//       {/* Decorative ambient background glows */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />

//       <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
//         <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(37,99,235,0.12)] border border-blue-600/10 w-full max-w-md p-8 sm:p-10 animate-fade-in-up hover:shadow-[0_8px_32px_rgba(37,99,235,0.16)] transition-all duration-300">
//           <div className="flex justify-center mb-6 transition-transform hover:scale-105 duration-300" onClick={() => navigate("/") }>
//             <img src={logo} alt="Tadreeby Logo" className="h-9 w-auto" />
//           </div>

//           <h1 className="font-['Inter'] font-extrabold text-[28px] leading-[34px] text-center text-[#111827] mb-1">
//             Welcome Back
//           </h1>

//           <p className="font-['Inter'] font-medium text-[15px] leading-[18px] text-center text-[#6B7280] mb-8">
//             Log in to continue your journey with Tadreeby
//           </p>

//           {error && (
//             <div className="mb-6 p-3.5 bg-red-50 border border-red-200/80 rounded-2xl animate-scale-up">
//               <p className="text-red-600 text-sm font-medium font-['Inter'] flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
//                 {error}
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleLogin}>
//             {/* Email Field */}
//             <div className="mb-5">
//               <Label icon={<MailIcon />} text="Email Address" />
//               <div className="mt-1 transition-all duration-200 focus-within:scale-[1.01]">
//                 <InputField
//                   icon={<MailIcon />}
//                   placeholder="name@example.com"
//                   type="email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (validationErrors.email) {
//                       setValidationErrors({ ...validationErrors, email: null });
//                     }
//                   }}
//                 />
//               </div>
//               {validationErrors.email && (
//                 <p className="text-red-500 text-xs mt-1 font-['Inter'] animate-fade-in">
//                   {validationErrors.email}
//                 </p>
//               )}
//               <p className="text-[#9CA3AF] text-[13px] leading-4 mt-2 font-['Inter']">
//                 Your email should follow this format: name@example.com
//               </p>
//             </div>

//             {/* Password Field */}
//             <div className="mb-4">
//               <Label icon={<LockIcon />} text="Password" />
//               <div className="mt-1 transition-all duration-200 focus-within:scale-[1.01]">
//                 <InputField
//                   icon={<LockIcon />}
//                   placeholder="••••••••••"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (validationErrors.password) {
//                       setValidationErrors({
//                         ...validationErrors,
//                         password: null,
//                       });
//                     }
//                   }}
//                   rightIcon={
//                     <EyeIcon
//                       show={showPassword}
//                       onClick={() => setShowPassword(!showPassword)}
//                     />
//                   }
//                 />
//               </div>
//               {validationErrors.password && (
//                 <p className="text-red-500 text-xs mt-1 font-['Inter'] animate-fade-in">
//                   {validationErrors.password}
//                 </p>
//               )}
//             </div>

//             {/* Remember & Forgot */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-5 h-5 border-[1.5px] border-[#D1D5DB] rounded-[6px] cursor-pointer accent-[#F97316] transition-transform active:scale-95"
//                 />
//                 <label
//                   htmlFor="rememberMe"
//                   className="font-['Inter'] font-normal text-[14px] leading-[17px] text-[#374151] cursor-pointer select-none"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <Link
//                 to="/forgot-password"
//                 className="font-['Inter'] font-medium text-[14px] leading-[17px] text-[#2563EB] hover:underline hover:text-blue-700 transition-colors"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Login Button */}
//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isLoading}
//               className="w-full justify-center py-3.5 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
//             >
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <LoadingSpinner />
//                   Logging in...
//                 </span>
//               ) : (
//                 "Login"
//               )}
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-6">
//             <hr className="flex-1 border-[#E5E7EB]" />
//             <span className="font-['Inter'] font-medium text-[13px] leading-4 text-[#6B7280] whitespace-nowrap">
//               New to Tadreeby?
//             </span>
//             <hr className="flex-1 border-[#E5E7EB]" />
//           </div>

//           {/* Create Account Link */}
//           <Link
//             to="/register"
//             className="block text-center font-['Inter'] font-semibold text-[15px] leading-[18px] text-[#2563EB] hover:underline transition-colors hover:text-blue-700"
//           >
//             Create a Student Account
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// function LoadingSpinner() {
//   return (
//     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//         fill="none"
//       />
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//       />
//     </svg>
//   );
// }





// LoginPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../layout/Footer";
import { Button } from "../common/Button";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { MailIcon, LockIcon, EyeIcon } from "../common/Icons";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { ROLE_HOME_ROUTES } from "../../constants/roles";
import logo from "../../assets/logo.svg";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // ── Validation ──
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
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Submit ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authAPI.login({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("✅ Login successful:", response);

      login(response.user, response.accessToken, response.refreshToken);
      showToast(`Welcome back, ${response.user?.firstName || "User"}!`, "success");

      const homeRoute = ROLE_HOME_ROUTES[response.user.role];
      navigate(homeRoute ?? "/login", { replace: true });
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

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
    } else if (field === "password") {
      setPassword(value);
      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50/60 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Ambient background glows with pulse animation */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />

      {/* Main container */}
      <main className="w-full max-w-[1080px] z-10">

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(37,99,235,0.12)] border border-blue-600/10 overflow-hidden p-3 sm:p-4 lg:p-5 animate-fade-in-up hover:shadow-[0_8px_32px_rgba(37,99,235,0.16)] transition-all duration-300">

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px]">

            {/* =========================================
                LEFT SIDE — VISUAL PANEL (with floating shapes)
            ========================================== */}
            <div className="relative hidden lg:flex rounded-[28px] overflow-hidden bg-[#EFF6FF] min-h-[620px] items-center justify-center">

              {/* Decorative blobs with float animation */}
              <div className="absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full bg-[#2563EB] opacity-90 animate-float-slow" />
              <div className="absolute -bottom-24 -left-20 w-[300px] h-[300px] rounded-full bg-[#F97316] opacity-90 animate-float-reverse" />
              <div className="absolute top-[22%] left-[12%] w-[180px] h-[180px] rounded-[50px] bg-[#2563EB] rotate-[-18deg] opacity-90 animate-float" />
              <div className="absolute bottom-[15%] right-[14%] w-[140px] h-[140px] rounded-[45px] bg-[#F97316] rotate-[18deg] opacity-90 animate-float-slow" />
              <div className="absolute top-[18%] left-[24%] w-16 h-16 rounded-full border-[12px] border-white opacity-80" />
              <div className="absolute bottom-[28%] left-[18%] w-12 h-12 rounded-full bg-white opacity-70" />
             
              {/* Center content */}
              {/* <div className="relative z-10 flex flex-col items-center text-center px-12">
                <div className="w-28 h-28 rounded-[32px] bg-white shadow-[0_12px_35px_rgba(37,99,235,0.18)] flex items-center justify-center mb-8 rotate-[-5deg]">
                  <img src={logo} alt="Tadreeby" className="w-20 h-auto" />
                </div>
                <h2 className="font-['Inter'] font-extrabold text-[30px] leading-[38px] text-[#111827] max-w-[380px]">
                  Your Training Journey Starts Here
                </h2>
                <p className="mt-4 font-['Inter'] font-medium text-[15px] leading-[24px] text-[#6B7280] max-w-[330px]">
                  Connect with your university, company, and training journey through Tadreeby.
                </p>
              </div> */}
            </div>

            {/* =========================================
                RIGHT SIDE — LOGIN FORM (glass effect)
            ========================================== */}
            <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
              <div className="w-full max-w-[390px]">

                {/* Mobile logo */}
                <div className="flex justify-center mb-7 lg:hidden">
                  <img src={logo} alt="Tadreeby Logo" className="h-9 w-auto" />
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                  <div className="flex justify-center mb-6 transition-transform hover:scale-105 duration-300" onClick={() => navigate("/")}>
                               <img src={logo} alt="Tadreeby Logo" className="h-9 w-auto" />
                          </div>

                  <h1 className="font-['Inter'] font-extrabold text-[32px] leading-[40px] text-[#111827]">
                    Welcome Back!
                  </h1>
                  <p className="mt-2 font-['Inter'] font-medium text-[13px] leading-[18px] text-[#6B7280]">
                    Enter your details below
                  </p>
                </div>

                {/* Global error banner */}
                {serverError && (
                  <div className="mb-6 p-3.5 bg-red-50 border border-red-200/80 rounded-2xl animate-shake">
                    <p className="text-red-600 text-sm font-medium font-['Inter'] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {serverError}
                    </p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin}>

                  {/* Email */}
                  <div className="mb-7">
                    <Label icon={<MailIcon />} text="Email Address" />
                    <div className="mt-2 transition-all duration-200 focus-within:scale-[1.01]">
                      <InputField
                        icon={<MailIcon />}
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs mt-1 font-['Inter'] animate-fade-in">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-5">
                    <Label icon={<LockIcon />} text="Password" />
                    <div className="mt-2 transition-all duration-200 focus-within:scale-[1.01]">
                      <InputField
                        icon={<LockIcon />}
                        placeholder="••••••••••"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handleFieldChange("password", e.target.value)}
                        rightIcon={
                          <EyeIcon
                            show={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        }
                      />
                    </div>
                    {fieldErrors.password && (
                      <p className="text-red-500 text-xs mt-1 font-['Inter'] animate-fade-in">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between mb-7">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 border-[1.5px] border-[#D1D5DB] rounded cursor-pointer accent-[#F97316] transition-transform active:scale-95"
                      />
                      <label htmlFor="rememberMe" className="font-['Inter'] font-normal text-[13px] text-[#374151] cursor-pointer select-none">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="font-['Inter'] font-medium text-[13px] text-[#2563EB] hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="w-full justify-center py-3.5 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.20)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.28)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
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
                <div className="flex items-center gap-4 my-7">
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                  <span className="font-['Inter'] font-medium text-[12px] text-[#9CA3AF] whitespace-nowrap">
                    New to Tadreeby?
                  </span>
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                </div>

                {/* Register link */}
                <Link to="/register" className="block text-center font-['Inter'] font-semibold text-[14px] text-[#2563EB] hover:underline transition-colors">
                  Create a Student Account
                </Link>

              </div>
            </div>

          </div>
        </div>

      </main>

      <div className="mt-6">
        <Footer />
      </div>

      {/* ─── Inline styles for animations ─── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float 6s ease-in-out infinite reverse;
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 6s ease-in-out infinite;
        }
      `}</style>

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