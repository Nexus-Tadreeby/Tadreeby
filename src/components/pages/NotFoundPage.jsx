import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Compass, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import logo from "../../assets/logo.svg";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative overflow-hidden">
      {/* Background Decorative Ambient Orbs */}
      <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl animate-pulse-subtle pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl animate-pulse-subtle pointer-events-none" />
      <div className="absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl animate-float-slow pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img src={logo} alt="Tadreeby Logo" className="h-8 w-auto" />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-bold text-[#1677FF] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full border border-blue-100 transition-all shadow-sm"
        >
          <Home className="h-4 w-4" />
          <span>Home Page</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center animate-scale-up">
          {/* Glass Card Container */}
          <div className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-8 sm:p-12 shadow-[0_16px_50px_rgba(22,119,255,0.08)] hover-lift transition-all duration-300 relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-6 animate-fade-in-up">
              <ShieldAlert className="h-4 w-4 text-red-500" />
              <span>404 - Page Not Found</span>
            </div>

            {/* Visual 404 Illustration Hero */}
            <div className="relative flex items-center justify-center my-4">
              <img src = "src/assets/404.jpeg"></img>
              {/* <span className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#1677FF]  to-[#FCA83E] opacity-90 select-none animate-pulse-subtle">
                404
              </span> */}
              {/* <div className="absolute flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1677FF] to-blue-500 text-white shadow-[0_8px_25px_rgba(22,119,255,0.35)] animate-float">
                <Compass className="h-10 w-10 animate-spin-slow" />
              </div> */}
            </div>

            {/* Headline & Description */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 tracking-tight">
              Oops! Page Not Found
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
             The page you are looking for does not exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-xs hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Go Back</span>
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#1677FF] text-white font-bold text-xs hover:bg-blue-600 shadow-[0_4px_14px_rgba(22,119,255,0.35)] hover:shadow-[0_6px_20px_rgba(22,119,255,0.45)] transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Home className="h-4 w-4" />
                <span>Return to Homepage</span>
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-medium text-gray-400">
        &copy; {new Date().getFullYear()} Tadreeby Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFoundPage;
