// Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export function Header({
  className = "fixed top-0 left-0 right-0 z-50",
  children,
  rightContent,
}) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultRightContent = (
    <>
      <span className="text-sm text-gray-500 font-['Inter']">
        Have an account?
      </span>
      <button
        onClick={() => navigate("/login")}
        className="text-sm font-bold text-blue-600 hover:underline font-['Inter'] cursor-pointer bg-transparent border-none"
      >
        Login
      </button>
    </>
  );

  const right = rightContent || defaultRightContent;

  return (
    <header className={`${className} glass-header`}>
      {/* Inner container */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div>
          <img src={logo} alt="Tadreeby Logo" className="h-7 sm:h-8 w-auto mb-1" />
        </div>

        {/* Desktop Navigation (hidden below 944px) */}
        {children && (
          <div className="hidden max-[944px]:hidden min-[945px]:flex items-center gap-9 text-sm font-medium text-[#374151]">
            {children}
          </div>
        )}

        {/* Right Content (hidden on mobile) */}
        <div className="hidden min-[945px]:flex items-center gap-3 self-end">
          {right}
        </div>

        {/* Hamburger + (mobile only) – we show only the hamburger on mobile */}
        <div className="flex items-center gap-4">
          {/* On mobile, we hide the right content; only the hamburger remains */}
          {children && (
            <button
              className="min-[945px]:hidden flex flex-col gap-1.5 p-2 ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown - positioned absolutely, includes both nav links and rightContent */}
      {children && isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg min-[945px]:hidden">
          <div className="flex flex-col items-center gap-4 py-6 px-4 text-sm font-medium text-[#374151]">
            {/* Navigation links */}
            {children}

            {/* Right Content – now part of the dropdown on mobile */}
            <div className="flex flex-col items-center gap-3 mt-2 border-t border-gray-200 pt-4 w-full">
              {right}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}