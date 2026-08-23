import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Header } from "../layout/Header";
import { Button } from "../common/Button";
import notFoundImage from "../../assets/notfound.png";


export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl animate-pulse-subtle pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl animate-pulse-subtle pointer-events-none" />
      <div className="absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl animate-float-slow pointer-events-none" />

      <Header
        rightContent={
          <>
            <Link
              to="/login"
              className="text-sm font-semibold text-[#374151] hover:text-blue-600 transition-colors"
            >
              Log In
            </Link>
            <Link to="/register">
              <Button
                variant="primary"
                className="rounded-full px-6 py-2.5 text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </>
        }
      >
        <a href="/#features" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
          
        </a>
        <a href="/#how-it-works" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
       
        </a>
        <a href="/#universities" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
         
        </a>
        <a href="/#companies" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
        
        </a>
        <a href="/#faq" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
          
        </a>
      </Header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Side - Text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-6">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                <span>404 - Page Not Found</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900">
                Ooops.
              </h1>

              <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-700 leading-snug">
                Relax, take it easy. <br />
                Keep fresh your mind!
              </p>

              {/* Clean message */}
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <br />The page you are looking for might have been moved, deleted, or never existed.
                  But don't worry , you can always find your way back home.
                </p>
             

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1677FF] text-white font-bold text-sm hover:bg-blue-600 shadow-[0_4px_14px_rgba(22,119,255,0.35)] hover:shadow-[0_6px_20px_rgba(22,119,255,0.45)] transition-all hover:-translate-y-0.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Go Back</span>
                </button>

                <Link
                  to="/"
                  // className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#1677FF] text-white font-bold text-sm hover:bg-blue-600 shadow-[0_4px_14px_rgba(22,119,255,0.35)] hover:shadow-[0_6px_20px_rgba(22,119,255,0.45)] transition-all hover:-translate-y-0.5"
                >
                  <Button
                    variant="orange"
                    className="rounded-full px-6 py-2.5 text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
                  >
                  Back to Home
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
                <img
                  src={notFoundImage}
                  alt="404 Illustration"
                  className="w-full h-full object-contain max-h-[600px] drop-shadow-xl"
                />
              </div>
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