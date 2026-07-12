// LandingPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../layout/Header";
import { Button } from "../common/Button";
import logo from "../../assets/logo.svg";
import {
  StudentIcon,
  UniversityIcon,
  CompanyIcon,
  MatchingIcon,
  TrackingIcon,
} from "../common/Icons";

// ---------- Reusable Components ----------

// 1. Stat Card (used in Hero section)
const StatCard = ({ number, label, dotColor, rotation = "0deg" }) => (
  <div
    className="flex-1 min-w-[200px] bg-[#F3F4F6] shadow-md rounded-2xl p-6"
    style={{ transform: `rotate(${rotation})` }}
  >
    <div
      className="w-2.5 h-2.5 rounded-full mb-2"
      style={{ backgroundColor: dotColor }}
    />
    <div className="text-[32px] font-bold text-[#111827]">{number}</div>
    <div className="text-[14px] text-[#6B7280]">{label}</div>
  </div>
);

// 2. Overview Card (used in Platform Overview)
const OverviewCard = ({ icon, title, description }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left">
    <div className="mb-4">{icon}</div>
    <h3 className="text-[19px] font-semibold text-[#111827]">{title}</h3>
    <p className="mt-2 text-[14.5px] leading-[1.55] text-[#4B5563]">
      {description}
    </p>
  </div>
);

// 3. Feature Card (used in Key Features)
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl p-8 text-left">
    <div className="mb-4">{icon}</div>
    <h3 className="text-[17px] font-semibold text-[#111827]">{title}</h3>
    <p className="mt-2 text-[14px] leading-[1.55] text-[#4B5563]">
      {description}
    </p>
  </div>
);

// 4. FAQ Item (used in FAQ section)
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div
    className={`bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all ${
      isOpen ? "shadow-sm" : ""
    }`}
  >
    <button
      className="flex justify-between items-center w-full px-6 py-5 text-left"
      onClick={onToggle}
    >
      <span className="text-[16px] font-semibold text-[#111827]">
        {question}
      </span>
      <span className="ml-4 flex-shrink-0">
        {isOpen ? (
          <svg
            className="w-5 h-5 text-[#2563EB]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-[#9CA3AF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </button>
    {isOpen && (
      <div className="px-6 pb-5 text-[14.5px] leading-[1.55] text-[#4B5563]">
        {answer}
      </div>
    )}
  </div>
);

// 5. Step Card (used in How Tadreeby Works)
const StepCard = ({ number, title, description }) => (
  <div>
    <div className="w-16 h-16 bg-[#155DFC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
      {number}
    </div>
    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// WhatsApp Floating Button – bottom-left with slide-out card
const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-20 left-8 z-50 flex flex-row-reverse items-end gap-3">
      {/* Chat Card – slides in from the left (appears to the right of the button) */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-[270px] animate-slide-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#12C754] rounded-full"></span>
            <span className="text-sm font-semibold text-[#111827]">
              Tadreeby Support
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
            Hi 👋 Click to chat. We reply in minutes!
          </p>
          <a
            href="https://wa.me/970592609579" // replace with your number
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full bg-[#12C754] hover:bg-[#0da84a] text-white text-xs font-semibold text-center py-2 rounded-xl transition"
          >
            Start Chat on WhatsApp →
          </a>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={toggleOpen}
        className="relative w-16 h-16 rounded-full bg-[#12C754] shadow-lg hover:shadow-xl transition-shadow focus:outline-none flex items-center justify-center"
      >
        {/* WhatsApp Icon (SVG) */}
        <svg
          className="w-9 h-9 text-white"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 3C9.7157 3 3 9.7157 3 18C3 21.516 4.011 24.7973 5.754 27.5505L3.1995 36L11.88 33.486C14.5463 35.0565 17.6655 36 21 36C29.2843 36 36 29.2843 36 21C36 12.7157 29.2843 3 18 3ZM12.39 12.498C12.7973 12.498 13.2067 12.4928 13.5645 12.51C13.986 12.5303 14.4555 12.7267 14.8417 13.6995C15.2985 14.8418 16.2773 17.3085 16.4002 17.5545C16.5233 17.8005 16.608 18.0878 16.4415 18.4132C16.2743 18.738 16.1925 18.9405 15.9465 19.2277C15.7005 19.515 15.4305 19.869 15.2078 20.0887C14.9625 20.3317 14.7067 20.5958 14.988 21.0877C15.2692 21.5798 16.269 23.2237 17.763 24.5655C19.6785 26.2792 21.2985 26.8125 21.7935 27.0585C22.2885 27.3045 22.5735 27.264 22.8547 26.9355C23.136 26.6077 24.09 25.494 24.4103 25.002C24.7298 24.51 25.0515 24.5917 25.491 24.756C25.9305 24.9195 28.38 26.124 28.875 26.37C29.37 26.616 29.6955 26.739 29.8185 26.9355C29.9415 27.135 29.9415 28.131 29.5312 29.2942C29.121 30.4567 27.126 31.5998 26.1623 31.6815C25.1985 31.764 24.2903 32.109 19.9627 30.4275C14.7773 28.4385 11.4817 23.1502 11.2358 22.8225C10.9897 22.494 9.22875 20.1975 9.22875 17.8215C9.22875 15.4455 10.4648 14.2762 10.9163 13.7812C11.367 13.2863 11.9003 13.1602 12.2265 13.1602L12.39 12.498Z"
            fill="white"
          />
        </svg>

        {/* Red notification badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF3939] border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
};

// ---------- Main LandingPage Component ----------

const LandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Tadreeby free for students?",
      answer:
        "Yes, completely free. Students can create an account, browse internships, and apply without any cost.",
    },
    {
      question: "Which universities are currently partnered with Tadreeby?",
      answer:
        "We are partnered with 9 universities across Palestine, including Al-Quds University, Birzeit University, and An-Najah National University.",
    },
    {
      question: "How long does account verification take?",
      answer:
        "Most accounts are verified within 24 hours during business days.",
    },
    {
      question: "Can companies post multiple internship openings at once?",
      answer:
        "Yes, companies can post unlimited openings and manage them from a single dashboard.",
    },
    {
      question: "What happens after I complete my internship?",
      answer:
        "You receive a verified digital certificate and a detailed performance report, shareable on your professional profile.",
    },
    {
      question:
        "What documents do universities and companies need to join Tadreeby?",
      answer:
        "Universities need an official accreditation letter, a signed partnership agreement, and the contact details of a designated training coordinator. Companies need a valid commercial registration, a signed MOU with Tadreeby, and at least one assigned supervisor account to manage incoming interns.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description:
        "Create your account as a student, university, or company.",
    },
    {
      number: 2,
      title: "Set Up Profile",
      description:
        "Complete your profile with skills, interests, and documents.",
    },
    {
      number: 3,
      title: "Get Matched",
      description:
        "Receive AI-powered recommendations and apply to internships.",
    },
    {
      number: 4,
      title: "Track & Graduate",
      description:
        "Monitor progress, get feedback, and earn your certificate.",
    },
  ];

  // Feature data (icons are inline SVGs for brevity; you can move them to a separate file)
  const features = [
    {
      icon: <MatchingIcon className="w-12 h-12" />,
      title: "Smart Internship Matching",
      description:
        "AI-assisted matching connects students to the most relevant openings based on skills and specialization.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#EBF8F3] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#1D936C]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
      title: "Real-Time Application Tracking",
      description:
        "Students and supervisors follow every step of the application — from submitted to approved.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#F1ECF4] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#A019D6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      ),
      title: "Digital Verification",
      description:
        "Upload and verify university ID and student documents securely, with instant validation feedback.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#FFF3E9] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#F89516]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
      ),
      title: "Progress Analytics",
      description:
        "Universities and companies get dashboards showing placement rates, hours logged, and outcomes.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#FFEFEC] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#EF3939]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
      ),
      title: "Automated Notifications",
      description:
        "Stay informed with smart alerts for deadlines, approvals, and status changes — no manual follow-up.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#EBF8F5] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#0077E6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      ),
      title: "Certification & Reporting",
      description:
        "Generate official completion certificates and exportable reports for academic credit requirements.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#EAF4FF] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#1430CF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      ),
      title: "Data Security & Privacy",
      description:
        "Enterprise-grade encryption and strict access controls keep every student, university, and company record private and protected.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#F4EDFF] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#A019D6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
      ),
      title: "AI-Powered Recommendations",
      description:
        "Smart, AI-driven suggestions guide students toward the internships and companies that best fit their profile.",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#FFFECE] rounded-2xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#F3D300]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      ),
      title: "Built-In Chat, Ratings & Activity Feed",
      description:
        "Message supervisors directly, rate completed tasks, and follow a live activity feed for every internship in progress.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Navigation Bar */}
      <Header
        className="glass-header glassi shadowi background: rgb(255, 255, 255)"
        rightContent={
          <>
            <Link
              to="/login"
              className="text-sm font-semibold text-[#374151] hover:text-blue-600"
            >
              Log In
            </Link>
            <Link to="/register">
              <Button
                variant="primary"
                className="rounded-full px-6 py-2.5 text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none"
              >
                Get Started
              </Button>
            </Link>
          </>
        }
      >
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#universities">For Universities</a>
        <a href="#companies">For Companies</a>
        <a href="#faq">FAQ</a>
      </Header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-[100px] px-4 bg-gradient-to-b from-[#F2F7FF] to-[#FFF8F4]">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex items-center gap-2 bg-[#EFF6FF] rounded-full px-4 py-2 mb-7">
            <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
            <span className="text-[13.5px] font-semibold text-[#2563EB]">
              Trusted by 9 Universities Across Palestine
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[56px] font-extrabold leading-[1.12] tracking-[-1px] text-[#111827]">
            Where Students, Universities
            <br /> & Companies are{" "}
            <span className="text-[#F97316]">Connected</span>
          </h1>

          {/* Description */}
          <p className="mt-7 text-[18px] leading-[1.6] text-[#4B5563] max-w-[680px]">
            Tadreeby is the smart platform that manages field training and
            internships end-to-end — from application to certification — for
            students, universities, and companies alike.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <button className="px-7 py-3.5 bg-[#F97316] text-white text-[15px] font-semibold rounded-full hover:bg-orange-600 transition">
                Student Registeration
              </button>
            </Link>
            <Link to="/partner">
              <button className="px-7 py-3.5 bg-[#DCE8FD] border border-[#4D49FC] text-[#374151] text-[15px] font-semibold rounded-full hover:bg-blue-50 transition">
                For Universities and Companies..
              </button>
            </Link>
          </div>

          {/* Small text */}
          <p className="mt-4 text-[13.5px] text-[#9CA3AF]">
            No credit card required • Free for students • Setup in minutes
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative mt-16 w-full max-w-[1000px]">
          {/* Stat Cards Container */}
          <div className="flex flex-wrap items-stretch justify-center gap-6 p-8 bg-white shadow-xl rounded-2xl">
            <StatCard
              number="2,847"
              label="Active Internships"
              dotColor="#2563EB"
              rotation="2.5deg"
            />
            <StatCard
              number="412"
              label="Partner Companies"
              dotColor="#F97316"
              rotation="0deg"
            />
            <StatCard
              number="94%"
              label="Completion Rate"
              dotColor="#10B981"
              rotation="-2.5deg"
            />
          </div>

          {/* Floating Badges - unchanged */}
          <div className="absolute -top-3 left-8 flex items-center gap-2 bg-white border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform rotate-3">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">
              New Internship
            </span>
          </div>

          <div className="absolute top-2 left-[330px] flex items-center gap-2 bg-white border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform -rotate-2">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">
              New Task
            </span>
          </div>

          <div className="absolute bottom-2 right-24 flex items-center gap-2 bg-white border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform rotate-2">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">
              New Notification
            </span>
          </div>

          <div className="absolute -top-1 right-8 flex items-center gap-2 bg-white border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform -rotate-3">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">
              New Message
            </span>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-[100px] px-4 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mb-16">
            <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
              Platform Overview
            </p>
            <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
              One Platform, Every Stakeholder
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#4B5563] max-w-[636px] mx-auto">
              Tadreeby brings students, universities, and companies into one
              connected workflow — eliminating spreadsheets, email chains, and
              manual paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard
              icon={<StudentIcon className="w-14 h-14" />}
              title="For Students"
              description="Discover internships, track applications, and build verified training records — all from one dashboard."
            />
            <OverviewCard
              icon={<UniversityIcon className="w-14 h-14" />}
              title="For Universities"
              description="Monitor student placements, validate training hours, and ensure curriculum compliance in real time."
            />
            <OverviewCard
              icon={<CompanyIcon className="w-14 h-14" />}
              title="For Companies"
              description="Post openings, review qualified candidates, and manage interns through a streamlined hiring funnel."
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-[100px] px-4 bg-[#F9FAFB]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
              Key Features
            </p>
            <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
              Everything You Need, Built In
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#4B5563] max-w-[620px] mx-auto">
              Powerful tools designed to make field training management
              effortless for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How Tadreeby Works */}
      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="max-w-[1180px] mx-auto text-center">
          <h2 className="text-[40px] font-bold text-[#111827]">
            How Tadreeby Works
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-[100px] px-4 bg-[#F9FAFB]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
              FAQ
            </p>
            <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[100px] px-4 bg-[#EEF3FE]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-[38px] font-bold text-[#111827]">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-[#6B7280]">
            Join thousands of students, universities, and companies already
            using Tadreeby to manage field training, the smart way.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <button className="px-7 py-3.5 bg-[#F97316] text-white text-[15px] font-semibold rounded-full hover:bg-orange-600 transition">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAFBFC] py-[72px] px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-1">
              <div>
                <img
                  src={logo}
                  alt="Tadreeby Logo"
                  className="h-7 sm:h-8 w-auto mb-1"
                />
              </div>
              <p className="mt-4 text-[14px] leading-[1.55] text-[#6B7280] max-w-[280px]">
                Smart Field Training & Internship Management Platform for
                students, universities, and companies.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Platform</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <li>
                  <a href="#features" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:underline">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <li>
                  <a href="#" className="hover:underline">
                    Students
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Universities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Companies
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Legal</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Contact</h4>
              <div className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#FFEDD4] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[#F54900]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>info@tadreeby.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DBEAFE] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[#155DFC]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.23 0H1.77C0.79 0 0 0.78 0 1.75v20.5C0 23.22 0.79 24 1.77 24h20.46c0.98 0 1.77-0.78 1.77-1.75V1.75C24 0.78 23.21 0 22.23 0zM7.08 20.31H3.55V8.97h3.53v11.34zM5.31 7.37c-1.13 0-2.04-0.92-2.04-2.04s0.91-2.04 2.04-2.04 2.04 0.92 2.04 2.04-0.91 2.04-2.04 2.04zM20.31 20.31h-3.53v-5.56c0-1.33-0.48-2.24-1.68-2.24s-1.94 0.85-1.94 2.24v5.56h-3.53V8.97h3.53v1.52c0.49-0.76 1.37-1.52 2.75-1.52 1.99 0 3.48 1.31 3.48 3.82v6.52z" />
                    </svg>
                  </div>
                  <span>linkedin.com/company/tadreeby</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[#00A63E]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span>+970 592 609 579</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-[13px] text-[#6B7280]">
            © 2026 Tadreeby. All rights reserved.
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
