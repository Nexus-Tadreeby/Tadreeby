// LandingPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import logo from "../../assets/logo.svg";
import { Header } from "../layout/Header";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-white">
      <Header className="glass-header glassi shadowi background: rgb(255, 255, 255)" /> 

      {/* Hero Section */}
      <section className="relative px-8 py-12 pt-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center bg-[#FFFDDD] border border-[#FED7AA] rounded-full px-4 py-1.5 mb-4">
              <span className="font-['Inter'] font-semibold text-xs text-[#FCA840]">
                Smart Internship Platform
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Inter'] font-bold text-[36px] leading-[45px] text-[#111827]">
              Tadreeby
            </h1>
            <h2 className="font-['Inter'] font-bold text-[36px] leading-[45px] text-[#111827]">
              Your Gateway to
            </h2>
            <h3 className="font-['Inter'] font-bold text-[36px] leading-[45px] text-[#2563EB] mb-4">
              Smart Field Training
            </h3>

            <p className="font-['Inter'] font-normal text-[14px] leading-[26px] text-[#6B7280] max-w-lg mb-8">
              We connect students with universities and companies to deliver outstanding training 
              opportunities and a seamless professional experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button 
                  variant="primary" 
                  className="px-8 py-3.5 rounded-xl text-[15px] font-semibold"
                >
                  Student Registration
                </Button>
              </Link>
              <Link to="#">
                <Button 
                  variant="secondary" 
                  className="px-8 py-3.5 rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 text-[15px] font-semibold bg-white"
                >
                  Partner Portal
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Dashboard Mock */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[320px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-5">
              {/* Mock Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 bg-[#F97316] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full"></div>
                <span className="font-['Inter'] font-semibold text-[11px] text-[#9CA3AF] ml-2">
                  Tadreeby Dashboard
                </span>
              </div>

              {/* Mock Bars */}
              <div className="space-y-2 mb-3">
                <div className="h-2 w-[70%] bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded"></div>
                <div className="h-2 w-full bg-[#F3F4F6] rounded"></div>
                <div className="h-2 w-[55%] bg-[#F3F4F6] rounded"></div>
              </div>

              {/* Mock Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F9FAFB] rounded-xl p-3">
                  <div className="font-['Inter'] font-bold text-[18px] text-[#2563EB]">12</div>
                  <div className="font-['Inter'] font-normal text-[10px] text-[#9CA3AF]">Opportunities</div>
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-3">
                  <div className="font-['Inter'] font-bold text-[18px] text-[#2563EB]">4</div>
                  <div className="font-['Inter'] font-normal text-[10px] text-[#9CA3AF]">Applications</div>
                </div>
                <div className="bg-[#F0F7FF] rounded-xl p-3">
                  <div className="font-['Inter'] font-bold text-[18px] text-[#10B981]">96%</div>
                  <div className="font-['Inter'] font-normal text-[10px] text-[#9CA3AF]">Attendance</div>
                </div>
                <div className="bg-[#FFF7ED] rounded-xl p-3">
                  <div className="font-['Inter'] font-bold text-[18px] text-[#F97316]">A+</div>
                  <div className="font-['Inter'] font-normal text-[10px] text-[#9CA3AF]">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="font-['Inter'] font-bold text-[26px] leading-[31px] text-center text-[#111827] mb-2">
          Everything You Need to Succeed
        </h2>
        <p className="font-['Inter'] font-normal text-[15px] leading-[18px] text-center text-[#6B7280] mb-12">
          A complete platform for students, universities, and companies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature Card 1 */}
          <div className="bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08)] rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-[#FFF7ED] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[15px] leading-[18px] text-[#111827] mb-2">
              Internship Management
            </h3>
            <p className="font-['Inter'] font-normal text-[13px] leading-5 text-[#6B7280]">
              Apply, track, and manage your internship applications in one place.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08)] rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[15px] leading-[18px] text-[#111827] mb-2">
              Performance Evaluation
            </h3>
            <p className="font-['Inter'] font-normal text-[13px] leading-5 text-[#6B7280]">
              Get detailed evaluations and feedback from supervisors.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08)] rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[15px] leading-[18px] text-[#111827] mb-2">
              Smart Recommendations
            </h3>
            <p className="font-['Inter'] font-normal text-[13px] leading-5 text-[#6B7280]">
              AI-powered matching based on your skills and specialization.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08)] rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="font-['Inter'] font-semibold text-[15px] leading-[18px] text-[#111827] mb-2">
              Real-time Reports
            </h3>
            <p className="font-['Inter'] font-normal text-[13px] leading-5 text-[#6B7280]">
              Attendance, tasks, and progress reports always up to date.
            </p>
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="bg-white border-y border-[#F3F4F6] py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-['Inter'] font-bold text-[22px] leading-[27px] text-[#111827] mb-2">
            For Universities & Companies
          </h2>
          <p className="font-['Inter'] font-normal text-[15px] leading-[26px] text-[#6B7280] max-w-4xl mx-auto mb-6">
            Your all-in-one platform to manage trainees, track progress, and evaluate performance. 
            Reach out, and we'll onboard your organization within 24 hours.
          </p>
          <Link to="#">
            <Button 
              variant="secondary" 
              className="px-8 py-3.5 rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 bg-white"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EFF3FF] py-5 px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-center">
          <span className="font-['Inter'] font-normal text-xs text-[#9CA3AF]">
            © 2026 Tadreeby. All rights reserved.
          </span>
          <span className="font-['Inter'] font-normal text-xs text-[#9CA3AF]">|</span>
          <a href="/terms" className="font-['Inter'] font-normal text-xs text-[#6B7280] hover:underline">
            Terms of Service
          </a>
          <span className="font-['Inter'] font-normal text-xs text-[#9CA3AF]">|</span>
          <a href="/privacy" className="font-['Inter'] font-normal text-xs text-[#6B7280] hover:underline">
            Privacy Policy
          </a>
          <span className="font-['Inter'] font-normal text-xs text-[#9CA3AF]">|</span>
          <a href="/contact" className="font-['Inter'] font-normal text-xs text-[#6B7280] hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;