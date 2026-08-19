import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../layout/Header";
import { Button } from "../common/Button";
import logo from "../../assets/logo.svg";
import {
  FileText,
  Shield,
  Lock,
  Cpu,
  BookOpen,
  ArrowUp,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";

export const TermsAndPrivacyPage = () => {
  const [activeSection, setActiveSection] = useState("intro");

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Auto-highlight sidebar on scroll
  useEffect(() => {
    const sectionIds = ['intro', 'part-1', 'part-2', 'part-3', 'part-4', 'appendix-b'];

    const observer = new IntersectionObserver(
      (entries) => {
        let activeId = null;
        let minTop = Infinity;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            if (rect.top < minTop) {
              minTop = rect.top;
              activeId = entry.target.id;
            }
          }
        });

        if (activeId) {
          setActiveSection(activeId);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px',
        threshold: 0.1,
      }
    );

    const elements = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Scroll to section based on URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(id);
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Inter'] text-[#1E2939] selection:bg-blue-100 selection:text-[#1677FF]">
      {/* Header – no extra background, matches landing page spacing */}
      <Header
        className="sticky top-3 sm:top-4 z-50"
        rightContent={
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#1677FF] transition-colors"
            >
              Log In
            </Link>
            <Link to="/register">
              <Button
                variant="primary"
                className="rounded-full px-5 py-2 text-xs sm:text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </div>
        }
      >
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
          Home
        </Link>
        <a href="#part-1" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
          Terms
        </a>
        <a href="#part-2" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
          Privacy Policy
        </a>
        <a href="#part-3" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
          Security
        </a>
        <a href="#part-4" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
          AI Policy
        </a>
      </Header>

      {/* Hero Banner */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#F9FAFB] border-b border-gray-200/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Terms of Service & Privacy Policy
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1677FF] text-xs font-bold mb-4 shadow-xs">
            <Shield className="h-4 w-4" />
            <span>Legal & Operational Framework</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-2xs">
            <Calendar className="h-4 w-4 text-[#FD761A]" />
            <span>Last Updated: June 28, 2026</span>
          </div>
        </div>
      </section>

      {/* Content Body with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Table of Contents Sticky Sidebar */}
          <aside className="w-full lg:w-72 lg:sticky lg:top-24 shrink-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Navigation Index</span>
            </h3>

            <nav className="space-y-1 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => scrollToSection("intro")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeSection === "intro"
                    ? "bg-blue-50 text-[#1677FF] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span>Introduction</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => scrollToSection("part-1")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeSection === "part-1"
                    ? "bg-blue-50 text-[#1677FF] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Part 1: Terms of Service</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => scrollToSection("part-2")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeSection === "part-2"
                    ? "bg-blue-50 text-[#1677FF] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  <span>Part 2: Privacy Policy</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => scrollToSection("part-3")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeSection === "part-3"
                    ? "bg-blue-50 text-[#1677FF] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-600" />
                  <span>Part 3: Security Provisions</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => scrollToSection("part-4")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeSection === "part-4"
                    ? "bg-blue-50 text-[#1677FF] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-orange-500" />
                  <span>Part 4: AI Provisions</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => scrollToSection("appendix-b")}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${activeSection === "appendix-b"
                    ? "bg-blue-50 text-[#1677FF] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span>Appendix B: Glossary</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </nav>
          </aside>

          {/* Main Legal Document Sections */}
          <main className="flex-1 space-y-12 w-full">

            {/* INTRODUCTION */}
            <section id="intro" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-4 flex items-center gap-3">
                <Info className="h-6 w-6 text-[#1677FF]" />
                <span>INTRODUCTION</span>
              </h2>
              <div className="prose prose-blue text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
                <p>
                  Welcome to <strong>Tadreeby</strong> ("the Platform"), a comprehensive digital ecosystem designed to streamline and enhance the management of university field training and internship programs. The Platform serves as an integrated solution connecting universities, companies, students, supervisors, and trainers to facilitate efficient collaboration throughout the internship lifecycle.
                </p>
                <p>
                  By accessing or using the Platform, you ("the User," "you," or "your") agree to be bound by these Terms of Service and Privacy Policy ("the Agreement"). If you do not agree to any provision of this Agreement, you must immediately discontinue use of the Platform.
                </p>
              </div>
            </section>

            {/* PART ONE: TERMS OF SERVICE */}
            <section id="part-1" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-black uppercase text-[#1677FF] tracking-wider">Part One</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  TERMS OF SERVICE
                </h2>
              </div>

              {/* 1. DEFINITIONS AND INTERPRETATION */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">1. DEFINITIONS AND INTERPRETATION</h3>
                <h4 className="text-sm font-bold text-gray-700">1.1 Definitions</h4>

                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[160px]">Term</th>
                        <th className="px-4 py-3">Definition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"Platform"</td>
                        <td className="px-4 py-3">The Tadreeby web and mobile application system, including all associated services, features, and content.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"User"</td>
                        <td className="px-4 py-3">Any individual or entity accessing or utilizing the Platform, including but not limited to students, university administrators, company administrators, university supervisors, company trainers, and system administrators.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"Content"</td>
                        <td className="px-4 py-3">All information, data, text, software, graphics, photographs, and other materials uploaded, posted, or transmitted through the Platform.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"Internship"</td>
                        <td className="px-4 py-3">A structured work-based learning program arranged through the Platform between educational institutions and companies.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"Training Opportunity"</td>
                        <td className="px-4 py-3">A position, placement, or program offered by a company for students to gain practical experience.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"Verification Document"</td>
                        <td className="px-4 py-3">Official documentation uploaded by students to confirm their enrollment status and identity.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"AI Features"</td>
                        <td className="px-4 py-3">Artificial Intelligence-powered functionalities including the Recommendation System, Task Evaluation System, and Skill Matrix.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">"Personal Data"</td>
                        <td className="px-4 py-3">Any information relating to an identified or identifiable natural person.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-sm font-bold text-gray-700 mt-4">1.2 Interpretation</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Words importing the singular shall include the plural and vice versa;</li>
                  <li>References to "including" or "include" shall be construed without limitation;</li>
                  <li>Headings are for convenience only and shall not affect interpretation.</li>
                </ul>
              </div>

              {/* 2. ACCEPTANCE OF TERMS */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">2. ACCEPTANCE OF TERMS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>2.1 Binding Agreement:</strong> By creating an account, accessing, or using the Platform, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and the accompanying Privacy Policy.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>2.2 Eligibility:</strong> You represent and warrant that you are at least 16 years of age, have the legal capacity to enter into this Agreement, are not prohibited under applicable laws, and will provide accurate information during registration.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>2.3 Modification of Terms:</strong> Tadreeby reserves the right to modify or amend these Terms at any time. Material changes will be communicated via registered emails, in-app notifications, and platform announcements.
                </p>
              </div>

              {/* 3. USER ACCOUNTS AND REGISTRATION */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">3. USER ACCOUNTS AND REGISTRATION</h3>
                <p className="text-sm text-gray-600">
                  <strong>3.1 Account Creation:</strong> Registration requires full legal name, valid email, personal ID number, student number (for students), institutional affiliation, telephone number, and secure password.
                </p>

                <h4 className="text-sm font-bold text-gray-700">3.2 Account Types</h4>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[160px]">Role</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Super Admin</td>
                        <td className="px-4 py-3">System-wide administrator with full platform access and control.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">University Admin</td>
                        <td className="px-4 py-3">Administrator responsible for university-level management.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Company Admin</td>
                        <td className="px-4 py-3">Administrator responsible for company-level management.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">University Supervisor</td>
                        <td className="px-4 py-3">Academic supervisor monitoring student progress.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Company Trainer</td>
                        <td className="px-4 py-3">Professional trainer overseeing trainees within a company.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Student</td>
                        <td className="px-4 py-3">Enrolled student participating in internship programs.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                  <p><strong>3.3 Account Security:</strong> Users are solely responsible for maintaining login credential confidentiality and notifying Tadreeby immediately of unauthorized use.</p>
                  <p><strong>3.4 Account Verification:</strong> Students must submit official university IDs, student numbers, and personal identification documents during sign-up.</p>
                  <p><strong>3.5 Account Approval Process:</strong> Registrations undergo University Admin review and approval before gaining full access.</p>
                  <p><strong>3.6 Account Suspension and Termination:</strong> Tadreeby reserves the right to suspend accounts for term violations, fraud, or extended inactivity.</p>
                </div>
              </div>

              {/* 4. PLATFORM SERVICES */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">4. PLATFORM SERVICES</h3>
                <p className="text-sm text-gray-600">
                  Tadreeby provides tailored tools for Students (opportunity browsing, tracking, task submission), Universities (approval, supervisor assignment, reporting), Companies (opportunity posting, trainer allocation), and Supervisors (task assignment, evaluation, AI assistance).
                </p>
                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs sm:text-sm text-blue-900 space-y-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-[#1677FF]" />
                    <span>Artificial Intelligence Features:</span>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Recommendation System:</strong> Matches student skills and profiles with top internship openings.</li>
                    <li><strong>Task Evaluation System:</strong> Provides automated initial feedback and scoring (supplementary to human judgment).</li>
                    <li><strong>Skill Matrix:</strong> Tracks dynamic skill progression and developmental goals over time.</li>
                  </ul>
                </div>
              </div>

              {/* 5. USER CONDUCT AND OBLIGATIONS */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">5. USER CONDUCT AND OBLIGATIONS</h3>
                <h4 className="text-sm font-bold text-gray-700">5.1 Prohibited Activities</h4>

                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[150px]">Category</th>
                        <th className="px-4 py-3">Prohibited Activities</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Illegal Use</td>
                        <td className="px-4 py-3">Use the Platform for any unlawful purpose or in any manner that violates applicable laws and regulations.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Unauthorized Access</td>
                        <td className="px-4 py-3">Attempt to gain unauthorized access to the Platform, other user accounts, or connected systems.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Data Scraping</td>
                        <td className="px-4 py-3">Extract, collect, or harvest any data from the Platform using automated means without explicit consent.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Fraud</td>
                        <td className="px-4 py-3">Submit false, misleading, or fraudulent information or documents.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Impersonation</td>
                        <td className="px-4 py-3">Impersonate another person or entity or misrepresent your affiliation with any person or entity.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Malicious Content</td>
                        <td className="px-4 py-3">Upload, transmit, or distribute viruses, malware, or any malicious code.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-red-600">Harassment</td>
                        <td className="px-4 py-3">Harass, threaten, intimidate, or otherwise mistreat other Users.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 7. DATA STORAGE AND RETENTION */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">7. DATA STORAGE AND RETENTION</h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Data Type</th>
                        <th className="px-4 py-3">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Account Data</td>
                        <td className="px-4 py-3">Duration of active account + 30 days</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Training Records</td>
                        <td className="px-4 py-3">5 years following completion of training</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Audit Logs</td>
                        <td className="px-4 py-3">5 years from creation</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Verification Documents</td>
                        <td className="px-4 py-3">Duration of active account + 2 years</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Communication Records</td>
                        <td className="px-4 py-3">2 years from creation</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">AI-Generated Data</td>
                        <td className="px-4 py-3">Duration of active account</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* PART TWO: PRIVACY POLICY */}
            <section id="part-2" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Part Two</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  PRIVACY POLICY
                </h2>
              </div>

              {/* 2. INFORMATION WE COLLECT */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">2. INFORMATION WE COLLECT</h3>
                <h4 className="text-sm font-bold text-gray-700">2.1 Personal Information Provided by Users</h4>

                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[160px]">Data Field</th>
                        <th className="px-4 py-3 min-w-[180px]">Purpose</th>
                        <th className="px-4 py-3">Legal Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Full Name (First & Last)</td>
                        <td className="px-4 py-3">User identification and communication</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Email Address</td>
                        <td className="px-4 py-3">Account management and communication</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Personal ID Number</td>
                        <td className="px-4 py-3">Unique user identification and verification</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">Legal obligation</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Student Number</td>
                        <td className="px-4 py-3">Academic verification</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">University/Company Affiliation</td>
                        <td className="px-4 py-3">Role assignment and authorization</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Academic Major & GPA</td>
                        <td className="px-4 py-3">Matching and performance assessment</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-sm font-bold text-gray-700 mt-4">2.2 Information Automatically Collected</h4>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[140px]">Data Type</th>
                        <th className="px-4 py-3 min-w-[160px]">Collection Method</th>
                        <th className="px-4 py-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">IP Address</td>
                        <td className="px-4 py-3">System logs</td>
                        <td className="px-4 py-3">Security, analytics</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Device & Browser Info</td>
                        <td className="px-4 py-3">User agent parsing</td>
                        <td className="px-4 py-3">Compatibility & feature delivery</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Session Data</td>
                        <td className="px-4 py-3">Session tracking</td>
                        <td className="px-4 py-3">Authentication, usability</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. DATA SHARING AND DISCLOSURE */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">4. DATA SHARING AND DISCLOSURE</h3>
                <h4 className="text-sm font-bold text-gray-700">4.1 Sharing Within the Platform</h4>

                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[150px]">Data Shared</th>
                        <th className="px-4 py-3 min-w-[180px]">Shared With</th>
                        <th className="px-4 py-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Student Profile</td>
                        <td className="px-4 py-3">University Admin, Supervisors, Company Trainers</td>
                        <td className="px-4 py-3">Internship management and monitoring</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Student Documents</td>
                        <td className="px-4 py-3">University Admin</td>
                        <td className="px-4 py-3">Verification and approval</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Application Data</td>
                        <td className="px-4 py-3">University Admin, Company Admin</td>
                        <td className="px-4 py-3">Application processing</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Evaluation Data</td>
                        <td className="px-4 py-3">Students, Supervisors, Trainers</td>
                        <td className="px-4 py-3">Performance feedback</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* PART THREE: SECURITY PROVISIONS */}
            <section id="part-3" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Part Three</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  SECURITY PROVISIONS
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Requirements */}
                <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-indigo-600" />
                    <span>Password Complexity Requirements</span>
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                    <li className="flex items-center justify-between border-b border-gray-100 pb-1">
                      <span>Minimum Length</span>
                      <strong className="text-gray-900">8 characters</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-1">
                      <span>Uppercase & Lowercase</span>
                      <strong className="text-gray-900">At least one each</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-1">
                      <span>Numbers & Special Characters</span>
                      <strong className="text-gray-900">At least one each</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Common Passwords</span>
                      <strong className="text-red-500">Strictly Prohibited</strong>
                    </li>
                  </ul>
                </div>

                {/* Data Protection Encryption */}
                <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span>Encryption Specifications</span>
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                    <li className="flex items-center justify-between border-b border-gray-100 pb-1">
                      <span>Data in Transit</span>
                      <strong className="text-gray-900">TLS/SSL (HTTPS)</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-1">
                      <span>Password Hashing</span>
                      <strong className="text-gray-900">Argon2 with Salt</strong>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-100 pb-1">
                      <span>Sensitive Storage</span>
                      <strong className="text-gray-900">Application-level Encryption</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Authentication Tokens</span>
                      <strong className="text-gray-900">JWT + Refresh Rotation</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* PART FOUR: ARTIFICIAL INTELLIGENCE PROVISIONS */}
            <section id="part-4" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-black uppercase text-orange-500 tracking-wider">Part Four</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  ARTIFICIAL INTELLIGENCE PROVISIONS
                </h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">1. AI FEATURE OVERVIEW</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4">
                    <h4 className="font-bold text-orange-900 text-sm">Recommendation System</h4>
                    <p className="text-xs text-orange-800/80 mt-1">Matches student profiles and skills to top relevant training opportunities.</p>
                  </div>
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                    <h4 className="font-bold text-blue-900 text-sm">Task Evaluation System</h4>
                    <p className="text-xs text-blue-800/80 mt-1">Assesses task submissions with automated scoring and constructive feedback.</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                    <h4 className="font-bold text-emerald-900 text-sm">Skill Matrix</h4>
                    <p className="text-xs text-emerald-800/80 mt-1">Builds dynamic skill charts tracking technical and soft skill development over time.</p>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-gray-700 mt-6">3.2 Right to Opt-Out</h4>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 min-w-[150px]">Feature</th>
                        <th className="px-4 py-3">Opt-Out Available</th>
                        <th className="px-4 py-3">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Recommendations</td>
                        <td className="px-4 py-3 font-bold text-emerald-600">Yes</td>
                        <td className="px-4 py-3">Will receive generic suggestions instead of personalized recommendations</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">AI Evaluations</td>
                        <td className="px-4 py-3 font-bold text-slate-500">Guidance Only</td>
                        <td className="px-4 py-3">AI evaluations are for guidance only; final evaluation remains by human supervisor</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 font-bold text-[#1677FF]">Skill Matrix Tracking</td>
                        <td className="px-4 py-3 font-bold text-emerald-600">Yes</td>
                        <td className="px-4 py-3">Skills will be tracked through manual input only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* APPENDIX B: DEFINITIONS AND GLOSSARY */}
            <section id="appendix-b" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 scroll-mt-28">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Appendix B</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  DEFINITIONS AND GLOSSARY
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 min-w-[160px]">Term</th>
                      <th className="px-4 py-3">Definition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">AI Features</td>
                      <td className="px-4 py-3">Artificial Intelligence-powered functionalities including Recommendation System, Task Evaluation System, and Skill Matrix.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Anonymization</td>
                      <td className="px-4 py-3">The process of removing personal identifiers from data so individuals cannot be identified.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Audit Log</td>
                      <td className="px-4 py-3">A chronological record of activities and events recorded for security and compliance purposes.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Cookie</td>
                      <td className="px-4 py-3">A small text file stored on a User's device containing data used for authentication, preferences, and analytics.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Encryption</td>
                      <td className="px-4 py-3">The process of converting data into code to prevent unauthorized access.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">JWT</td>
                      <td className="px-4 py-3">JSON Web Token – a compact, URL-safe token used for authentication and information exchange.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">RBAC</td>
                      <td className="px-4 py-3">Role-Based Access Control – a method of restricting system access based on assigned roles and permissions.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Recommendation System</td>
                      <td className="px-4 py-3">An AI system that suggests opportunities to users based on preferences and behavior.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Skill Matrix</td>
                      <td className="px-4 py-3">A structured representation of a user's skills, skill levels, and development progress.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#1677FF]">Verification Document</td>
                      <td className="px-4 py-3">Official documentation submitted by a User to verify identity, enrollment, or affiliation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                <p>&copy; {new Date().getFullYear()} Tadreeby. All Rights Reserved.</p>
                <p>Contact Data Protection: <a href="mailto:info@tadreeby.com" className="text-[#1677FF] font-semibold hover:underline">info@tadreeby.com</a></p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacyPage;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Header } from "../layout/Header";
// import { Button } from "../common/Button";
// import logo from "../../assets/logo.svg";
// import {
//   FileText,
//   Shield,
//   Lock,
//   Cpu,
//   BookOpen,
//   ArrowUp,
//   CheckCircle2,
//   Calendar,
//   ExternalLink,
//   ChevronRight,
//   Info,
// } from "lucide-react";

// export const TermsAndPrivacyPage = () => {
//   const [activeSection, setActiveSection] = useState("intro");

//   const scrollToSection = (id) => {
//     setActiveSection(id);
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   // Auto-highlight sidebar on scroll
//   useEffect(() => {
//     const sectionIds = ['intro', 'part-1', 'part-2', 'part-3', 'part-4', 'appendix-b'];
    
//     const observer = new IntersectionObserver(
//       (entries) => {
//         let activeId = null;
//         let minTop = Infinity;

//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const rect = entry.boundingClientRect;
//             if (rect.top < minTop) {
//               minTop = rect.top;
//               activeId = entry.target.id;
//             }
//           }
//         });

//         if (activeId) {
//           setActiveSection(activeId);
//         }
//       },
//       {
//         root: null,
//         rootMargin: '0px 0px -30% 0px',
//         threshold: 0.1,
//       }
//     );

//     const elements = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);
//     elements.forEach(el => observer.observe(el));

//     return () => {
//       elements.forEach(el => observer.unobserve(el));
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] font-['Inter'] text-[#1E2939] selection:bg-blue-100 selection:text-[#1677FF]">
//       {/* Header – no extra background, matches landing page spacing */}
//       <Header
//         className="sticky top-3 sm:top-4 z-50"
//         rightContent={
//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#1677FF] transition-colors"
//             >
//               Log In
//             </Link>
//             <Link to="/register">
//               <Button
//                 variant="primary"
//                 className="rounded-full px-5 py-2 text-xs sm:text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         }
//       >
//         <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Home
//         </Link>
//         <a href="#part-1" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Terms
//         </a>
//         <a href="#part-2" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Privacy Policy
//         </a>
//         <a href="#part-3" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Security
//         </a>
//         <a href="#part-4" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           AI Policy
//         </a>
//       </Header>

//       {/* Hero Banner */}
//       <section className="relative py-16 px-4 bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#F9FAFB] border-b border-gray-200/60 overflow-hidden">
//         <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

//         <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in-up">
//           <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
//             Terms of Service & Privacy Policy
//           </h1>

//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1677FF] text-xs font-bold mb-4 shadow-xs">
//             <Shield className="h-4 w-4" />
//             <span>Legal & Operational Framework</span>
//           </div>

//           <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-2xs">
//             <Calendar className="h-4 w-4 text-[#FD761A]" />
//             <span>Last Updated: June 28, 2026</span>
//           </div>
//         </div>
//       </section>

//       {/* Content Body with Sticky Sidebar */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col lg:flex-row gap-8 items-start">
          
//           {/* Table of Contents Sticky Sidebar */}
//           <aside className="w-full lg:w-72 lg:sticky lg:top-24 shrink-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm">
//             <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//               <span>Navigation Index</span>
//             </h3>

//             <nav className="space-y-1 text-xs sm:text-sm font-semibold">
//               <button
//                 onClick={() => scrollToSection("intro")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "intro"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <span>Introduction</span>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-1")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-1"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <FileText className="h-4 w-4 text-blue-600" />
//                   <span>Part 1: Terms of Service</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-2")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-2"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Lock className="h-4 w-4 text-emerald-600" />
//                   <span>Part 2: Privacy Policy</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-3")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-3"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Shield className="h-4 w-4 text-indigo-600" />
//                   <span>Part 3: Security Provisions</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-4")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-4"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Cpu className="h-4 w-4 text-orange-500" />
//                   <span>Part 4: AI Provisions</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("appendix-b")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "appendix-b"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <span>Appendix B: Glossary</span>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>
//             </nav>
//           </aside>

//           {/* Main Legal Document Sections */}
//           <main className="flex-1 space-y-12 w-full">
            
//             {/* INTRODUCTION */}
//             <section id="intro" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm scroll-mt-28">
//               <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-4 flex items-center gap-3">
//                 <Info className="h-6 w-6 text-[#1677FF]" />
//                 <span>INTRODUCTION</span>
//               </h2>
//               <div className="prose prose-blue text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
//                 <p>
//                   Welcome to <strong>Tadreeby</strong> ("the Platform"), a comprehensive digital ecosystem designed to streamline and enhance the management of university field training and internship programs. The Platform serves as an integrated solution connecting universities, companies, students, supervisors, and trainers to facilitate efficient collaboration throughout the internship lifecycle.
//                 </p>
//                 <p>
//                   By accessing or using the Platform, you ("the User," "you," or "your") agree to be bound by these Terms of Service and Privacy Policy ("the Agreement"). If you do not agree to any provision of this Agreement, you must immediately discontinue use of the Platform.
//                 </p>
//               </div>
//             </section>

//             {/* PART ONE: TERMS OF SERVICE */}
//             <section id="part-1" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-[#1677FF] tracking-wider">Part One</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   TERMS OF SERVICE
//                 </h2>
//               </div>

//               {/* 1. DEFINITIONS AND INTERPRETATION */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-gray-900">1. DEFINITIONS AND INTERPRETATION</h3>
//                 <h4 className="text-sm font-bold text-gray-700">1.1 Definitions</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[160px]">Term</th>
//                         <th className="px-4 py-3">Definition</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Platform"</td>
//                         <td className="px-4 py-3">The Tadreeby web and mobile application system, including all associated services, features, and content.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"User"</td>
//                         <td className="px-4 py-3">Any individual or entity accessing or utilizing the Platform, including but not limited to students, university administrators, company administrators, university supervisors, company trainers, and system administrators.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Content"</td>
//                         <td className="px-4 py-3">All information, data, text, software, graphics, photographs, and other materials uploaded, posted, or transmitted through the Platform.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Internship"</td>
//                         <td className="px-4 py-3">A structured work-based learning program arranged through the Platform between educational institutions and companies.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Training Opportunity"</td>
//                         <td className="px-4 py-3">A position, placement, or program offered by a company for students to gain practical experience.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Verification Document"</td>
//                         <td className="px-4 py-3">Official documentation uploaded by students to confirm their enrollment status and identity.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"AI Features"</td>
//                         <td className="px-4 py-3">Artificial Intelligence-powered functionalities including the Recommendation System, Task Evaluation System, and Skill Matrix.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Personal Data"</td>
//                         <td className="px-4 py-3">Any information relating to an identified or identifiable natural person.</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <h4 className="text-sm font-bold text-gray-700 mt-4">1.2 Interpretation</h4>
//                 <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
//                   <li>Words importing the singular shall include the plural and vice versa;</li>
//                   <li>References to "including" or "include" shall be construed without limitation;</li>
//                   <li>Headings are for convenience only and shall not affect interpretation.</li>
//                 </ul>
//               </div>

//               {/* 2. ACCEPTANCE OF TERMS */}
//               <div className="space-y-3 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">2. ACCEPTANCE OF TERMS</h3>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   <strong>2.1 Binding Agreement:</strong> By creating an account, accessing, or using the Platform, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and the accompanying Privacy Policy.
//                 </p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   <strong>2.2 Eligibility:</strong> You represent and warrant that you are at least 16 years of age, have the legal capacity to enter into this Agreement, are not prohibited under applicable laws, and will provide accurate information during registration.
//                 </p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   <strong>2.3 Modification of Terms:</strong> Tadreeby reserves the right to modify or amend these Terms at any time. Material changes will be communicated via registered emails, in-app notifications, and platform announcements.
//                 </p>
//               </div>

//               {/* 3. USER ACCOUNTS AND REGISTRATION */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">3. USER ACCOUNTS AND REGISTRATION</h3>
//                 <p className="text-sm text-gray-600">
//                   <strong>3.1 Account Creation:</strong> Registration requires full legal name, valid email, personal ID number, student number (for students), institutional affiliation, telephone number, and secure password.
//                 </p>

//                 <h4 className="text-sm font-bold text-gray-700">3.2 Account Types</h4>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[160px]">Role</th>
//                         <th className="px-4 py-3">Description</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Super Admin</td>
//                         <td className="px-4 py-3">System-wide administrator with full platform access and control.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">University Admin</td>
//                         <td className="px-4 py-3">Administrator responsible for university-level management.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Company Admin</td>
//                         <td className="px-4 py-3">Administrator responsible for company-level management.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">University Supervisor</td>
//                         <td className="px-4 py-3">Academic supervisor monitoring student progress.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Company Trainer</td>
//                         <td className="px-4 py-3">Professional trainer overseeing trainees within a company.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student</td>
//                         <td className="px-4 py-3">Enrolled student participating in internship programs.</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
//                   <p><strong>3.3 Account Security:</strong> Users are solely responsible for maintaining login credential confidentiality and notifying Tadreeby immediately of unauthorized use.</p>
//                   <p><strong>3.4 Account Verification:</strong> Students must submit official university IDs, student numbers, and personal identification documents during sign-up.</p>
//                   <p><strong>3.5 Account Approval Process:</strong> Registrations undergo University Admin review and approval before gaining full access.</p>
//                   <p><strong>3.6 Account Suspension and Termination:</strong> Tadreeby reserves the right to suspend accounts for term violations, fraud, or extended inactivity.</p>
//                 </div>
//               </div>

//               {/* 4. PLATFORM SERVICES */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">4. PLATFORM SERVICES</h3>
//                 <p className="text-sm text-gray-600">
//                   Tadreeby provides tailored tools for Students (opportunity browsing, tracking, task submission), Universities (approval, supervisor assignment, reporting), Companies (opportunity posting, trainer allocation), and Supervisors (task assignment, evaluation, AI assistance).
//                 </p>
//                 <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs sm:text-sm text-blue-900 space-y-2">
//                   <p className="font-bold flex items-center gap-1.5">
//                     <Cpu className="h-4 w-4 text-[#1677FF]" />
//                     <span>Artificial Intelligence Features:</span>
//                   </p>
//                   <ul className="list-disc pl-5 space-y-1">
//                     <li><strong>Recommendation System:</strong> Matches student skills and profiles with top internship openings.</li>
//                     <li><strong>Task Evaluation System:</strong> Provides automated initial feedback and scoring (supplementary to human judgment).</li>
//                     <li><strong>Skill Matrix:</strong> Tracks dynamic skill progression and developmental goals over time.</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* 5. USER CONDUCT AND OBLIGATIONS */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">5. USER CONDUCT AND OBLIGATIONS</h3>
//                 <h4 className="text-sm font-bold text-gray-700">5.1 Prohibited Activities</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[150px]">Category</th>
//                         <th className="px-4 py-3">Prohibited Activities</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Illegal Use</td>
//                         <td className="px-4 py-3">Use the Platform for any unlawful purpose or in any manner that violates applicable laws and regulations.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Unauthorized Access</td>
//                         <td className="px-4 py-3">Attempt to gain unauthorized access to the Platform, other user accounts, or connected systems.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Data Scraping</td>
//                         <td className="px-4 py-3">Extract, collect, or harvest any data from the Platform using automated means without explicit consent.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Fraud</td>
//                         <td className="px-4 py-3">Submit false, misleading, or fraudulent information or documents.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Impersonation</td>
//                         <td className="px-4 py-3">Impersonate another person or entity or misrepresent your affiliation with any person or entity.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Malicious Content</td>
//                         <td className="px-4 py-3">Upload, transmit, or distribute viruses, malware, or any malicious code.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Harassment</td>
//                         <td className="px-4 py-3">Harass, threaten, intimidate, or otherwise mistreat other Users.</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* 7. DATA STORAGE AND RETENTION */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">7. DATA STORAGE AND RETENTION</h3>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3">Data Type</th>
//                         <th className="px-4 py-3">Retention Period</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Account Data</td>
//                         <td className="px-4 py-3">Duration of active account + 30 days</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Training Records</td>
//                         <td className="px-4 py-3">5 years following completion of training</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Audit Logs</td>
//                         <td className="px-4 py-3">5 years from creation</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Verification Documents</td>
//                         <td className="px-4 py-3">Duration of active account + 2 years</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Communication Records</td>
//                         <td className="px-4 py-3">2 years from creation</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">AI-Generated Data</td>
//                         <td className="px-4 py-3">Duration of active account</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* PART TWO: PRIVACY POLICY */}
//             <section id="part-2" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Part Two</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   PRIVACY POLICY
//                 </h2>
//               </div>

//               {/* 2. INFORMATION WE COLLECT */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-gray-900">2. INFORMATION WE COLLECT</h3>
//                 <h4 className="text-sm font-bold text-gray-700">2.1 Personal Information Provided by Users</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[160px]">Data Field</th>
//                         <th className="px-4 py-3 min-w-[180px]">Purpose</th>
//                         <th className="px-4 py-3">Legal Basis</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Full Name (First & Last)</td>
//                         <td className="px-4 py-3">User identification and communication</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Email Address</td>
//                         <td className="px-4 py-3">Account management and communication</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Personal ID Number</td>
//                         <td className="px-4 py-3">Unique user identification and verification</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Legal obligation</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student Number</td>
//                         <td className="px-4 py-3">Academic verification</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">University/Company Affiliation</td>
//                         <td className="px-4 py-3">Role assignment and authorization</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Academic Major & GPA</td>
//                         <td className="px-4 py-3">Matching and performance assessment</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <h4 className="text-sm font-bold text-gray-700 mt-4">2.2 Information Automatically Collected</h4>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[140px]">Data Type</th>
//                         <th className="px-4 py-3 min-w-[160px]">Collection Method</th>
//                         <th className="px-4 py-3">Purpose</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">IP Address</td>
//                         <td className="px-4 py-3">System logs</td>
//                         <td className="px-4 py-3">Security, analytics</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Device & Browser Info</td>
//                         <td className="px-4 py-3">User agent parsing</td>
//                         <td className="px-4 py-3">Compatibility & feature delivery</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Session Data</td>
//                         <td className="px-4 py-3">Session tracking</td>
//                         <td className="px-4 py-3">Authentication, usability</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* 4. DATA SHARING AND DISCLOSURE */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">4. DATA SHARING AND DISCLOSURE</h3>
//                 <h4 className="text-sm font-bold text-gray-700">4.1 Sharing Within the Platform</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[150px]">Data Shared</th>
//                         <th className="px-4 py-3 min-w-[180px]">Shared With</th>
//                         <th className="px-4 py-3">Purpose</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student Profile</td>
//                         <td className="px-4 py-3">University Admin, Supervisors, Company Trainers</td>
//                         <td className="px-4 py-3">Internship management and monitoring</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student Documents</td>
//                         <td className="px-4 py-3">University Admin</td>
//                         <td className="px-4 py-3">Verification and approval</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Application Data</td>
//                         <td className="px-4 py-3">University Admin, Company Admin</td>
//                         <td className="px-4 py-3">Application processing</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Evaluation Data</td>
//                         <td className="px-4 py-3">Students, Supervisors, Trainers</td>
//                         <td className="px-4 py-3">Performance feedback</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* PART THREE: SECURITY PROVISIONS */}
//             <section id="part-3" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Part Three</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   SECURITY PROVISIONS
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Password Requirements */}
//                 <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
//                   <h4 className="font-bold text-gray-900 flex items-center gap-2">
//                     <Lock className="h-4 w-4 text-indigo-600" />
//                     <span>Password Complexity Requirements</span>
//                   </h4>
//                   <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Minimum Length</span>
//                       <strong className="text-gray-900">8 characters</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Uppercase & Lowercase</span>
//                       <strong className="text-gray-900">At least one each</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Numbers & Special Characters</span>
//                       <strong className="text-gray-900">At least one each</strong>
//                     </li>
//                     <li className="flex items-center justify-between">
//                       <span>Common Passwords</span>
//                       <strong className="text-red-500">Strictly Prohibited</strong>
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Data Protection Encryption */}
//                 <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
//                   <h4 className="font-bold text-gray-900 flex items-center gap-2">
//                     <Shield className="h-4 w-4 text-emerald-600" />
//                     <span>Encryption Specifications</span>
//                   </h4>
//                   <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Data in Transit</span>
//                       <strong className="text-gray-900">TLS/SSL (HTTPS)</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Password Hashing</span>
//                       <strong className="text-gray-900">Argon2 with Salt</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Sensitive Storage</span>
//                       <strong className="text-gray-900">Application-level Encryption</strong>
//                     </li>
//                     <li className="flex items-center justify-between">
//                       <span>Authentication Tokens</span>
//                       <strong className="text-gray-900">JWT + Refresh Rotation</strong>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </section>

//             {/* PART FOUR: ARTIFICIAL INTELLIGENCE PROVISIONS */}
//             <section id="part-4" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-orange-500 tracking-wider">Part Four</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   ARTIFICIAL INTELLIGENCE PROVISIONS
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-gray-900">1. AI FEATURE OVERVIEW</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4">
//                     <h4 className="font-bold text-orange-900 text-sm">Recommendation System</h4>
//                     <p className="text-xs text-orange-800/80 mt-1">Matches student profiles and skills to top relevant training opportunities.</p>
//                   </div>
//                   <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
//                     <h4 className="font-bold text-blue-900 text-sm">Task Evaluation System</h4>
//                     <p className="text-xs text-blue-800/80 mt-1">Assesses task submissions with automated scoring and constructive feedback.</p>
//                   </div>
//                   <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
//                     <h4 className="font-bold text-emerald-900 text-sm">Skill Matrix</h4>
//                     <p className="text-xs text-emerald-800/80 mt-1">Builds dynamic skill charts tracking technical and soft skill development over time.</p>
//                   </div>
//                 </div>

//                 <h4 className="text-sm font-bold text-gray-700 mt-6">3.2 Right to Opt-Out</h4>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[150px]">Feature</th>
//                         <th className="px-4 py-3">Opt-Out Available</th>
//                         <th className="px-4 py-3">Impact</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Recommendations</td>
//                         <td className="px-4 py-3 font-bold text-emerald-600">Yes</td>
//                         <td className="px-4 py-3">Will receive generic suggestions instead of personalized recommendations</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">AI Evaluations</td>
//                         <td className="px-4 py-3 font-bold text-slate-500">Guidance Only</td>
//                         <td className="px-4 py-3">AI evaluations are for guidance only; final evaluation remains by human supervisor</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Skill Matrix Tracking</td>
//                         <td className="px-4 py-3 font-bold text-emerald-600">Yes</td>
//                         <td className="px-4 py-3">Skills will be tracked through manual input only</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* APPENDIX B: DEFINITIONS AND GLOSSARY */}
//             <section id="appendix-b" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Appendix B</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   DEFINITIONS AND GLOSSARY
//                 </h2>
//               </div>

//               <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                 <table className="w-full text-left text-xs sm:text-sm">
//                   <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                     <tr>
//                       <th className="px-4 py-3 min-w-[160px]">Term</th>
//                       <th className="px-4 py-3">Definition</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">AI Features</td>
//                       <td className="px-4 py-3">Artificial Intelligence-powered functionalities including Recommendation System, Task Evaluation System, and Skill Matrix.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Anonymization</td>
//                       <td className="px-4 py-3">The process of removing personal identifiers from data so individuals cannot be identified.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Audit Log</td>
//                       <td className="px-4 py-3">A chronological record of activities and events recorded for security and compliance purposes.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Cookie</td>
//                       <td className="px-4 py-3">A small text file stored on a User's device containing data used for authentication, preferences, and analytics.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Encryption</td>
//                       <td className="px-4 py-3">The process of converting data into code to prevent unauthorized access.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">JWT</td>
//                       <td className="px-4 py-3">JSON Web Token – a compact, URL-safe token used for authentication and information exchange.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">RBAC</td>
//                       <td className="px-4 py-3">Role-Based Access Control – a method of restricting system access based on assigned roles and permissions.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Recommendation System</td>
//                       <td className="px-4 py-3">An AI system that suggests opportunities to users based on preferences and behavior.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Skill Matrix</td>
//                       <td className="px-4 py-3">A structured representation of a user's skills, skill levels, and development progress.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Verification Document</td>
//                       <td className="px-4 py-3">Official documentation submitted by a User to verify identity, enrollment, or affiliation.</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
//                 <p>&copy; {new Date().getFullYear()} Tadreeby. All Rights Reserved.</p>
//                 <p>Contact Data Protection: <a href="mailto:info@tadreeby.com" className="text-[#1677FF] font-semibold hover:underline">info@tadreeby.com</a></p>
//               </div>
//             </section>

//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsAndPrivacyPage;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Header } from "../layout/Header";
// import { Button } from "../common/Button";
// import logo from "../../assets/logo.svg";
// // Change this line at the top
// import React, { useState, useEffect } from "react";
// import {
//   FileText,
//   Shield,
//   Lock,
//   Cpu,
//   BookOpen,
//   ArrowUp,
//   CheckCircle2,
//   Calendar,
//   ExternalLink,
//   ChevronRight,
//   Info,
// } from "lucide-react";

// export const TermsAndPrivacyPage = () => {
//   const [activeSection, setActiveSection] = useState("intro");

//   const scrollToSection = (id) => {
//     setActiveSection(id);
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] font-['Inter'] text-[#1E2939] selection:bg-blue-100 selection:text-[#1677FF]">
//       {/* Header */}
//       <Header
//         className="sticky top-3 sm:top-4 z-50"
//         rightContent={
//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#1677FF] transition-colors"
//             >
//               Log In
//             </Link>
//             <Link to="/register">
//               <Button
//                 variant="primary"
//                 className="rounded-full px-5 py-2 text-xs sm:text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         }
//       >
//         <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Home
//         </Link>
//         <a href="#part-1" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Terms
//         </a>
//         <a href="#part-2" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Privacy Policy
//         </a>
//         <a href="#part-3" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           Security
//         </a>
//         <a href="#part-4" className="text-sm font-medium text-gray-600 hover:text-[#1677FF]">
//           AI Policy
//         </a>
//       </Header>

//       {/* Hero Banner */}
//       <section className="relative py-16 px-4 bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#F9FAFB] border-b border-gray-200/60 overflow-hidden">
//         <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

//         <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in-up">


//           <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
//             Terms of Service & Privacy Policy
//           </h1>

//           {/* <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
//             Smart Field Training & Internship Management Platform
//           </p> */}

//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1677FF] text-xs font-bold mb-4 shadow-xs">
//             <Shield className="h-4 w-4" />
//             <span>Legal & Operational Framework</span>
//           </div>

//           <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-2xs">
//             <Calendar className="h-4 w-4 text-[#FD761A]" />
//             <span>Last Updated: June 28, 2026</span>
//           </div>
          
//         </div>
//       </section>

//       {/* Content Body with Sticky Sidebar */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col lg:flex-row gap-8 items-start">
          
//           {/* Table of Contents Sticky Sidebar */}
//           <aside className="w-full lg:w-72 lg:sticky lg:top-24 shrink-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm">
//             <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//               {/* <BookOpen className="h-4 w-4 text-[#1677FF]" /> */}
//               <span>Navigation Index</span>
//             </h3>

//             <nav className="space-y-1 text-xs sm:text-sm font-semibold">
//               <button
//                 onClick={() => scrollToSection("intro")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "intro"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <span>Introduction</span>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-1")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-1"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <FileText className="h-4 w-4 text-blue-600" />
//                   <span>Part 1: Terms of Service</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-2")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-2"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Lock className="h-4 w-4 text-emerald-600" />
//                   <span>Part 2: Privacy Policy</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-3")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-3"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Shield className="h-4 w-4 text-indigo-600" />
//                   <span>Part 3: Security Provisions</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("part-4")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "part-4"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Cpu className="h-4 w-4 text-orange-500" />
//                   <span>Part 4: AI Provisions</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>

//               <button
//                 onClick={() => scrollToSection("appendix-b")}
//                 className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
//                   activeSection === "appendix-b"
//                     ? "bg-blue-50 text-[#1677FF] font-bold"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <span>Appendix B: Glossary</span>
//                 <ChevronRight className="h-3.5 w-3.5 opacity-60" />
//               </button>
//             </nav>

//             {/* <div className="mt-6 pt-4 border-t border-gray-100">
//               <Link
//                 to="/"
//                 className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#1677FF] bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition"
//               >
//                 <span>Back to Homepage</span>
//               </Link>
//             </div> */}
//           </aside>

//           {/* Main Legal Document Sections */}
//           <main className="flex-1 space-y-12 w-full">
            
//             {/* INTRODUCTION */}
//             <section id="intro" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm scroll-mt-28">
//               <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-4 flex items-center gap-3">
//                 <Info className="h-6 w-6 text-[#1677FF]" />
//                 <span>INTRODUCTION</span>
//               </h2>
//               <div className="prose prose-blue text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
//                 <p>
//                   Welcome to <strong>Tadreeby</strong> ("the Platform"), a comprehensive digital ecosystem designed to streamline and enhance the management of university field training and internship programs. The Platform serves as an integrated solution connecting universities, companies, students, supervisors, and trainers to facilitate efficient collaboration throughout the internship lifecycle.
//                 </p>
//                 <p>
//                   By accessing or using the Platform, you ("the User," "you," or "your") agree to be bound by these Terms of Service and Privacy Policy ("the Agreement"). If you do not agree to any provision of this Agreement, you must immediately discontinue use of the Platform.
//                 </p>
//               </div>
//             </section>

//             {/* PART ONE: TERMS OF SERVICE */}
//             <section id="part-1" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-[#1677FF] tracking-wider">Part One</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   TERMS OF SERVICE
//                 </h2>
//               </div>

//               {/* 1. DEFINITIONS AND INTERPRETATION */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-gray-900">1. DEFINITIONS AND INTERPRETATION</h3>
//                 <h4 className="text-sm font-bold text-gray-700">1.1 Definitions</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[160px]">Term</th>
//                         <th className="px-4 py-3">Definition</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Platform"</td>
//                         <td className="px-4 py-3">The Tadreeby web and mobile application system, including all associated services, features, and content.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"User"</td>
//                         <td className="px-4 py-3">Any individual or entity accessing or utilizing the Platform, including but not limited to students, university administrators, company administrators, university supervisors, company trainers, and system administrators.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Content"</td>
//                         <td className="px-4 py-3">All information, data, text, software, graphics, photographs, and other materials uploaded, posted, or transmitted through the Platform.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Internship"</td>
//                         <td className="px-4 py-3">A structured work-based learning program arranged through the Platform between educational institutions and companies.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Training Opportunity"</td>
//                         <td className="px-4 py-3">A position, placement, or program offered by a company for students to gain practical experience.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Verification Document"</td>
//                         <td className="px-4 py-3">Official documentation uploaded by students to confirm their enrollment status and identity.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"AI Features"</td>
//                         <td className="px-4 py-3">Artificial Intelligence-powered functionalities including the Recommendation System, Task Evaluation System, and Skill Matrix.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">"Personal Data"</td>
//                         <td className="px-4 py-3">Any information relating to an identified or identifiable natural person.</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <h4 className="text-sm font-bold text-gray-700 mt-4">1.2 Interpretation</h4>
//                 <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
//                   <li>Words importing the singular shall include the plural and vice versa;</li>
//                   <li>References to "including" or "include" shall be construed without limitation;</li>
//                   <li>Headings are for convenience only and shall not affect interpretation.</li>
//                 </ul>
//               </div>

//               {/* 2. ACCEPTANCE OF TERMS */}
//               <div className="space-y-3 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">2. ACCEPTANCE OF TERMS</h3>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   <strong>2.1 Binding Agreement:</strong> By creating an account, accessing, or using the Platform, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and the accompanying Privacy Policy.
//                 </p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   <strong>2.2 Eligibility:</strong> You represent and warrant that you are at least 16 years of age, have the legal capacity to enter into this Agreement, are not prohibited under applicable laws, and will provide accurate information during registration.
//                 </p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   <strong>2.3 Modification of Terms:</strong> Tadreeby reserves the right to modify or amend these Terms at any time. Material changes will be communicated via registered emails, in-app notifications, and platform announcements.
//                 </p>
//               </div>

//               {/* 3. USER ACCOUNTS AND REGISTRATION */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">3. USER ACCOUNTS AND REGISTRATION</h3>
//                 <p className="text-sm text-gray-600">
//                   <strong>3.1 Account Creation:</strong> Registration requires full legal name, valid email, personal ID number, student number (for students), institutional affiliation, telephone number, and secure password.
//                 </p>

//                 <h4 className="text-sm font-bold text-gray-700">3.2 Account Types</h4>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[160px]">Role</th>
//                         <th className="px-4 py-3">Description</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Super Admin</td>
//                         <td className="px-4 py-3">System-wide administrator with full platform access and control.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">University Admin</td>
//                         <td className="px-4 py-3">Administrator responsible for university-level management.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Company Admin</td>
//                         <td className="px-4 py-3">Administrator responsible for company-level management.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">University Supervisor</td>
//                         <td className="px-4 py-3">Academic supervisor monitoring student progress.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Company Trainer</td>
//                         <td className="px-4 py-3">Professional trainer overseeing trainees within a company.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student</td>
//                         <td className="px-4 py-3">Enrolled student participating in internship programs.</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
//                   <p><strong>3.3 Account Security:</strong> Users are solely responsible for maintaining login credential confidentiality and notifying Tadreeby immediately of unauthorized use.</p>
//                   <p><strong>3.4 Account Verification:</strong> Students must submit official university IDs, student numbers, and personal identification documents during sign-up.</p>
//                   <p><strong>3.5 Account Approval Process:</strong> Registrations undergo University Admin review and approval before gaining full access.</p>
//                   <p><strong>3.6 Account Suspension and Termination:</strong> Tadreeby reserves the right to suspend accounts for term violations, fraud, or extended inactivity.</p>
//                 </div>
//               </div>

//               {/* 4. PLATFORM SERVICES */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">4. PLATFORM SERVICES</h3>
//                 <p className="text-sm text-gray-600">
//                   Tadreeby provides tailored tools for Students (opportunity browsing, tracking, task submission), Universities (approval, supervisor assignment, reporting), Companies (opportunity posting, trainer allocation), and Supervisors (task assignment, evaluation, AI assistance).
//                 </p>
//                 <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs sm:text-sm text-blue-900 space-y-2">
//                   <p className="font-bold flex items-center gap-1.5">
//                     <Cpu className="h-4 w-4 text-[#1677FF]" />
//                     <span>Artificial Intelligence Features:</span>
//                   </p>
//                   <ul className="list-disc pl-5 space-y-1">
//                     <li><strong>Recommendation System:</strong> Matches student skills and profiles with top internship openings.</li>
//                     <li><strong>Task Evaluation System:</strong> Provides automated initial feedback and scoring (supplementary to human judgment).</li>
//                     <li><strong>Skill Matrix:</strong> Tracks dynamic skill progression and developmental goals over time.</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* 5. USER CONDUCT AND OBLIGATIONS */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">5. USER CONDUCT AND OBLIGATIONS</h3>
//                 <h4 className="text-sm font-bold text-gray-700">5.1 Prohibited Activities</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[150px]">Category</th>
//                         <th className="px-4 py-3">Prohibited Activities</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Illegal Use</td>
//                         <td className="px-4 py-3">Use the Platform for any unlawful purpose or in any manner that violates applicable laws and regulations.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Unauthorized Access</td>
//                         <td className="px-4 py-3">Attempt to gain unauthorized access to the Platform, other user accounts, or connected systems.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Data Scraping</td>
//                         <td className="px-4 py-3">Extract, collect, or harvest any data from the Platform using automated means without explicit consent.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Fraud</td>
//                         <td className="px-4 py-3">Submit false, misleading, or fraudulent information or documents.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Impersonation</td>
//                         <td className="px-4 py-3">Impersonate another person or entity or misrepresent your affiliation with any person or entity.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Malicious Content</td>
//                         <td className="px-4 py-3">Upload, transmit, or distribute viruses, malware, or any malicious code.</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-red-600">Harassment</td>
//                         <td className="px-4 py-3">Harass, threaten, intimidate, or otherwise mistreat other Users.</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* 7. DATA STORAGE AND RETENTION */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">7. DATA STORAGE AND RETENTION</h3>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3">Data Type</th>
//                         <th className="px-4 py-3">Retention Period</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Account Data</td>
//                         <td className="px-4 py-3">Duration of active account + 30 days</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Training Records</td>
//                         <td className="px-4 py-3">5 years following completion of training</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Audit Logs</td>
//                         <td className="px-4 py-3">5 years from creation</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Verification Documents</td>
//                         <td className="px-4 py-3">Duration of active account + 2 years</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Communication Records</td>
//                         <td className="px-4 py-3">2 years from creation</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">AI-Generated Data</td>
//                         <td className="px-4 py-3">Duration of active account</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* PART TWO: PRIVACY POLICY */}
//             <section id="part-2" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Part Two</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   PRIVACY POLICY
//                 </h2>
//               </div>

//               {/* 2. INFORMATION WE COLLECT */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-gray-900">2. INFORMATION WE COLLECT</h3>
//                 <h4 className="text-sm font-bold text-gray-700">2.1 Personal Information Provided by Users</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[160px]">Data Field</th>
//                         <th className="px-4 py-3 min-w-[180px]">Purpose</th>
//                         <th className="px-4 py-3">Legal Basis</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Full Name (First & Last)</td>
//                         <td className="px-4 py-3">User identification and communication</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Email Address</td>
//                         <td className="px-4 py-3">Account management and communication</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Personal ID Number</td>
//                         <td className="px-4 py-3">Unique user identification and verification</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Legal obligation</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student Number</td>
//                         <td className="px-4 py-3">Academic verification</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">University/Company Affiliation</td>
//                         <td className="px-4 py-3">Role assignment and authorization</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Academic Major & GPA</td>
//                         <td className="px-4 py-3">Matching and performance assessment</td>
//                         <td className="px-4 py-3 text-xs font-bold text-slate-500">Contract performance</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <h4 className="text-sm font-bold text-gray-700 mt-4">2.2 Information Automatically Collected</h4>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[140px]">Data Type</th>
//                         <th className="px-4 py-3 min-w-[160px]">Collection Method</th>
//                         <th className="px-4 py-3">Purpose</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">IP Address</td>
//                         <td className="px-4 py-3">System logs</td>
//                         <td className="px-4 py-3">Security, analytics</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Device & Browser Info</td>
//                         <td className="px-4 py-3">User agent parsing</td>
//                         <td className="px-4 py-3">Compatibility & feature delivery</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Session Data</td>
//                         <td className="px-4 py-3">Session tracking</td>
//                         <td className="px-4 py-3">Authentication, usability</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* 4. DATA SHARING AND DISCLOSURE */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <h3 className="text-lg font-bold text-gray-900">4. DATA SHARING AND DISCLOSURE</h3>
//                 <h4 className="text-sm font-bold text-gray-700">4.1 Sharing Within the Platform</h4>

//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[150px]">Data Shared</th>
//                         <th className="px-4 py-3 min-w-[180px]">Shared With</th>
//                         <th className="px-4 py-3">Purpose</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student Profile</td>
//                         <td className="px-4 py-3">University Admin, Supervisors, Company Trainers</td>
//                         <td className="px-4 py-3">Internship management and monitoring</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Student Documents</td>
//                         <td className="px-4 py-3">University Admin</td>
//                         <td className="px-4 py-3">Verification and approval</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Application Data</td>
//                         <td className="px-4 py-3">University Admin, Company Admin</td>
//                         <td className="px-4 py-3">Application processing</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Evaluation Data</td>
//                         <td className="px-4 py-3">Students, Supervisors, Trainers</td>
//                         <td className="px-4 py-3">Performance feedback</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* PART THREE: SECURITY PROVISIONS */}
//             <section id="part-3" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Part Three</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   SECURITY PROVISIONS
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Password Requirements */}
//                 <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
//                   <h4 className="font-bold text-gray-900 flex items-center gap-2">
//                     <Lock className="h-4 w-4 text-indigo-600" />
//                     <span>Password Complexity Requirements</span>
//                   </h4>
//                   <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Minimum Length</span>
//                       <strong className="text-gray-900">8 characters</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Uppercase & Lowercase</span>
//                       <strong className="text-gray-900">At least one each</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Numbers & Special Characters</span>
//                       <strong className="text-gray-900">At least one each</strong>
//                     </li>
//                     <li className="flex items-center justify-between">
//                       <span>Common Passwords</span>
//                       <strong className="text-red-500">Strictly Prohibited</strong>
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Data Protection Encryption */}
//                 <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
//                   <h4 className="font-bold text-gray-900 flex items-center gap-2">
//                     <Shield className="h-4 w-4 text-emerald-600" />
//                     <span>Encryption Specifications</span>
//                   </h4>
//                   <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Data in Transit</span>
//                       <strong className="text-gray-900">TLS/SSL (HTTPS)</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Password Hashing</span>
//                       <strong className="text-gray-900">Argon2 with Salt</strong>
//                     </li>
//                     <li className="flex items-center justify-between border-b border-gray-100 pb-1">
//                       <span>Sensitive Storage</span>
//                       <strong className="text-gray-900">Application-level Encryption</strong>
//                     </li>
//                     <li className="flex items-center justify-between">
//                       <span>Authentication Tokens</span>
//                       <strong className="text-gray-900">JWT + Refresh Rotation</strong>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </section>

//             {/* PART FOUR: ARTIFICIAL INTELLIGENCE PROVISIONS */}
//             <section id="part-4" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-orange-500 tracking-wider">Part Four</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   ARTIFICIAL INTELLIGENCE PROVISIONS
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-bold text-gray-900">1. AI FEATURE OVERVIEW</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4">
//                     <h4 className="font-bold text-orange-900 text-sm">Recommendation System</h4>
//                     <p className="text-xs text-orange-800/80 mt-1">Matches student profiles and skills to top relevant training opportunities.</p>
//                   </div>
//                   <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
//                     <h4 className="font-bold text-blue-900 text-sm">Task Evaluation System</h4>
//                     <p className="text-xs text-blue-800/80 mt-1">Assesses task submissions with automated scoring and constructive feedback.</p>
//                   </div>
//                   <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
//                     <h4 className="font-bold text-emerald-900 text-sm">Skill Matrix</h4>
//                     <p className="text-xs text-emerald-800/80 mt-1">Builds dynamic skill charts tracking technical and soft skill development over time.</p>
//                   </div>
//                 </div>

//                 <h4 className="text-sm font-bold text-gray-700 mt-6">3.2 Right to Opt-Out</h4>
//                 <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                   <table className="w-full text-left text-xs sm:text-sm">
//                     <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3 min-w-[150px]">Feature</th>
//                         <th className="px-4 py-3">Opt-Out Available</th>
//                         <th className="px-4 py-3">Impact</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Recommendations</td>
//                         <td className="px-4 py-3 font-bold text-emerald-600">Yes</td>
//                         <td className="px-4 py-3">Will receive generic suggestions instead of personalized recommendations</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">AI Evaluations</td>
//                         <td className="px-4 py-3 font-bold text-slate-500">Guidance Only</td>
//                         <td className="px-4 py-3">AI evaluations are for guidance only; final evaluation remains by human supervisor</td>
//                       </tr>
//                       <tr className="hover:bg-slate-50/60">
//                         <td className="px-4 py-3 font-bold text-[#1677FF]">Skill Matrix Tracking</td>
//                         <td className="px-4 py-3 font-bold text-emerald-600">Yes</td>
//                         <td className="px-4 py-3">Skills will be tracked through manual input only</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>

//             {/* APPENDIX B: DEFINITIONS AND GLOSSARY */}
//             <section id="appendix-b" className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 scroll-mt-28">
//               <div className="border-b border-gray-100 pb-4">
//                 <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Appendix B</span>
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
//                   DEFINITIONS AND GLOSSARY
//                 </h2>
//               </div>

//               <div className="overflow-x-auto rounded-2xl border border-gray-200">
//                 <table className="w-full text-left text-xs sm:text-sm">
//                   <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
//                     <tr>
//                       <th className="px-4 py-3 min-w-[160px]">Term</th>
//                       <th className="px-4 py-3">Definition</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 font-medium text-gray-600">
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">AI Features</td>
//                       <td className="px-4 py-3">Artificial Intelligence-powered functionalities including Recommendation System, Task Evaluation System, and Skill Matrix.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Anonymization</td>
//                       <td className="px-4 py-3">The process of removing personal identifiers from data so individuals cannot be identified.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Audit Log</td>
//                       <td className="px-4 py-3">A chronological record of activities and events recorded for security and compliance purposes.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Cookie</td>
//                       <td className="px-4 py-3">A small text file stored on a User's device containing data used for authentication, preferences, and analytics.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Encryption</td>
//                       <td className="px-4 py-3">The process of converting data into code to prevent unauthorized access.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">JWT</td>
//                       <td className="px-4 py-3">JSON Web Token – a compact, URL-safe token used for authentication and information exchange.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">RBAC</td>
//                       <td className="px-4 py-3">Role-Based Access Control – a method of restricting system access based on assigned roles and permissions.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Recommendation System</td>
//                       <td className="px-4 py-3">An AI system that suggests opportunities to users based on preferences and behavior.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Skill Matrix</td>
//                       <td className="px-4 py-3">A structured representation of a user's skills, skill levels, and development progress.</td>
//                     </tr>
//                     <tr className="hover:bg-slate-50/60">
//                       <td className="px-4 py-3 font-bold text-[#1677FF]">Verification Document</td>
//                       <td className="px-4 py-3">Official documentation submitted by a User to verify identity, enrollment, or affiliation.</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
//                 <p>&copy; {new Date().getFullYear()} Tadreeby. All Rights Reserved.</p>
//                 <p>Contact Data Protection: <a href="mailto:info@tadreeby.com" className="text-[#1677FF] font-semibold hover:underline">info@tadreeby.com</a></p>
//               </div>
//             </section>

//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsAndPrivacyPage;
