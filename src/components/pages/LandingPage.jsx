// LandingPage.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
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

// ---------- Scroll Animation Hook ----------
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// AnimateOnScroll – wraps children and fades/slides them in when visible
const AnimateOnScroll = ({ children, delay = 0, className = "", from = "bottom" }) => {
  const [ref, inView] = useInView();
  const translateMap = { bottom: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : translateMap[from] || "translateY(32px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ---------- Reusable Components ----------

// 1. Stat Card (used in Hero section)
const StatCard = ({ number, label, dotColor, rotation = "0deg" }) => (
  <div
    className="flex-1 min-w-[200px] bg-[#F3F4F6] shadow-md rounded-2xl p-6 hover-lift transition-all duration-300 hover:shadow-xl hover:bg-white"
    style={{ transform: `rotate(${rotation})` }}
  >
    <div
      className="w-2.5 h-2.5 rounded-full mb-2 animate-pulse-dot"
      style={{ backgroundColor: dotColor }}
    />
    <div className="text-[32px] font-bold text-[#111827]">{number}</div>
    <div className="text-[14px] text-[#6B7280]">{label}</div>
  </div>
);

// 2. Overview Card (used in Platform Overview)
const OverviewCard = ({ icon, title, description }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left hover-lift transition-all duration-300 hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(22,119,255,0.08)]">
    <div className="mb-4 transition-transform duration-300 hover:scale-110 inline-block">{icon}</div>
    <h3 className="text-[19px] font-semibold text-[#111827]">{title}</h3>
    <p className="mt-2 text-[14.5px] leading-[1.55] text-[#4B5563]">
      {description}
    </p>
  </div>
);

// 3. Feature Card (used in Key Features)
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl p-8 text-left hover-lift transition-all duration-300 border border-transparent hover:border-blue-100 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
    <div className="mb-4 transition-transform duration-300 hover:scale-110 inline-block">{icon}</div>
    <h3 className="text-[17px] font-semibold text-[#111827]">{title}</h3>
    <p className="mt-2 text-[14px] leading-[1.55] text-[#4B5563]">
      {description}
    </p>
  </div>
);

// 4. FAQ Item (used in FAQ section) – animated open/close
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div
    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-blue-200 shadow-md" : "border-gray-200 hover:border-gray-300"
      }`}
  >
    <button
      className="flex justify-between items-center w-full px-6 py-5 text-left cursor-pointer group"
      onClick={onToggle}
    >
      <span className={`text-[16px] font-semibold transition-colors duration-200 ${isOpen ? "text-[#2563EB]" : "text-[#111827] group-hover:text-[#2563EB]"}`}>
        {question}
      </span>
      <span
        className="ml-4 flex-shrink-0 transition-transform duration-300"
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <svg
          className={`w-5 h-5 transition-colors duration-200 ${isOpen ? "text-[#2563EB]" : "text-[#9CA3AF] group-hover:text-[#2563EB]"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
    <div
      style={{
        maxHeight: isOpen ? "400px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="px-6 pb-5 text-[14.5px] leading-[1.6] text-[#4B5563] border-t border-gray-100 pt-3">
        {answer}
      </div>
    </div>
  </div>
);

// 5. Step Card (used in How Tadreeby Works)
const StepCard = ({ number, title, description }) => (
  <div className="hover-lift transition-all duration-300 p-4 rounded-2xl">
    <div className="w-16 h-16 bg-[#155DFC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-md transition-transform duration-300 hover:scale-110 animate-pulse-subtle">
      {number}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-[#111827]">{title}</h3>
    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// WhatsApp Floating Button – bottom-left with slide-out card
const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-20 left-8 z-50 flex flex-row-reverse items-end gap-3">
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-[270px] animate-slide-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#12C754] rounded-full animate-pulse-dot"></span>
            <span className="text-sm font-semibold text-[#111827]">
              Tadreeby Support
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
            Hi 👋 Click to chat. We reply in minutes!
          </p>
          <a
            href="https://wa.me/970567294381"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full bg-[#12C754] hover:bg-[#0da84a] text-white text-xs font-semibold text-center py-2 rounded-xl transition shadow-md hover:shadow-lg"
          >
            Start Chat on WhatsApp →
          </a>
        </div>
      )}
      <button
        onClick={toggleOpen}
        className="relative w-16 h-16 rounded-full bg-[#12C754] shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none flex items-center justify-center hover:scale-105 animate-float-slow cursor-pointer"
      >
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
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF3939] border-2 border-white rounded-full animate-ping"></span>
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 00-2 2h2a2 2 0 00-2-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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

  // Smooth scroll with header offset
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80; // increased to match the anchor's scrollMarginTop
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Navigation Bar */}
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
        <a href="#features" onClick={scrollToSection('features')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">Features</a>
        <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">How It Works</a>
        <a href="#universities" onClick={scrollToSection('universities')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">For Universities</a>
        <a href="#companies" onClick={scrollToSection('companies')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">For Companies</a>
        <a href="#faq" onClick={scrollToSection('faq')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">FAQ</a>
      </Header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-[120px] pb-[100px] px-4 bg-gradient-to-b from-[#F2F7FF] to-[#FFF8F4] overflow-hidden sm:pt-[130px]">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="flex items-center gap-2 bg-[#EFF6FF] rounded-full px-4 py-2 mb-7 border border-blue-100 shadow-sm animate-pulse-subtle">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-ping"></span>
            <span className="text-[13.5px] font-semibold text-[#2563EB]">
              Trusted by 9 Universities Across Palestine
            </span>
          </div>
          <h1 className="text-[44px] sm:text-[56px] font-extrabold leading-[1.12] tracking-[-1px] text-[#111827]">
            Where Students, Universities
            <br /> & Companies are{" "}
            <span className="text-[#F97316] relative inline-block">
              Connected
              <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-200/50 -z-10 rounded-full"></span>
            </span>
          </h1>
          <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.6] text-[#4B5563] max-w-[680px]">
            Tadreeby is the smart platform that manages field training and
            internships end-to-end — from application to certification — for
            students, universities, and companies alike.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <button className="px-7 py-3.5 bg-[#F97316] text-white text-[15px] font-semibold rounded-full hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                Student Registration
              </button>
            </Link>
            <Link to="/register">
              <button className="px-7 py-3.5 bg-[#DCE8FD] border border-[#4D49FC]/30 text-[#374151] text-[15px] font-semibold rounded-full hover:bg-blue-100 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                For Universities and Companies
              </button>
            </Link>
          </div>
          <p className="mt-4 text-[13.5px] text-[#9CA3AF]">
            No credit card required • Free for students • Setup in minutes
          </p>
        </div>
        <div className="relative mt-16 w-full max-w-[1000px] animate-scale-up">
          <div className="flex flex-wrap items-stretch justify-center gap-6 p-8 bg-white/90 backdrop-blur-md shadow-xl rounded-3xl border border-gray-100">
            <StatCard number="2,847" label="Active Internships" dotColor="#2563EB" rotation="2.5deg" />
            <StatCard number="412" label="Partner Companies" dotColor="#F97316" rotation="0deg" />
            <StatCard number="94%" label="Completion Rate" dotColor="#10B981" rotation="-2.5deg" />
          </div>
          <div className="absolute -top-4 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform rotate-3 animate-float hover-lift">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">New Internship</span>
          </div>
          <div className="absolute top-2 left-[320px] hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform -rotate-2 animate-float-reverse hover-lift">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">New Task</span>
          </div>
          <div className="absolute -bottom-4 right-16 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform rotate-2 animate-float-slow hover-lift">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">New Notification</span>
          </div>
          <div className="absolute -top-3 right-6 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform -rotate-3 animate-float hover-lift">
            <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-[#1E293B]">New Message</span>
          </div>
        </div>
      </section>

      {/* Platform Overview – removed duplicate IDs */}
      <section className="py-[100px] px-4 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <AnimateOnScroll className="mb-16">
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
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateOnScroll delay={0} from="bottom">
              <OverviewCard
                icon={<StudentIcon className="w-14 h-14" />}
                title="For Students"
                description="Discover internships, track applications, and build verified training records — all from one dashboard."
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={120} from="bottom">
              <OverviewCard
                icon={<UniversityIcon className="w-14 h-14" />}
                title="For Universities"
                description="Monitor student placements, validate training hours, and ensure curriculum compliance in real time."
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={240} from="bottom">
              <OverviewCard
                icon={<CompanyIcon className="w-14 h-14" />}
                title="For Companies"
                description="Post openings, review qualified candidates, and manage interns through a streamlined hiring funnel."
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-[100px] px-4 bg-[#F9FAFB]">
        <div className="max-w-[1200px] mx-auto">
          <AnimateOnScroll className="text-center mb-16">
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
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <AnimateOnScroll key={idx} delay={idx * 80}>
                <FeatureCard {...feature} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* How Tadreeby Works */}
      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="max-w-[1180px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 className="text-[40px] font-bold text-[#111827]">
              How Tadreeby Works
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <AnimateOnScroll key={step.number} delay={idx * 120} from="bottom">
                <StepCard {...step} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-[100px] px-4 bg-[#F9FAFB]">
        <div className="max-w-[800px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
              FAQ
            </p>
            <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
              Frequently Asked Questions
            </h2>
          </AnimateOnScroll>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <AnimateOnScroll key={index} delay={index * 60}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
      {/* ============================================ */}
      {/* NEW SECTION: For Universities & Companies     */}
      {/* ============================================ */}
      <section className="py-[80px] px-4 bg-[#F0F5FF] relative" id="for-universities-companies">
        {/* Invisible anchors for header links */}
        <span
          id="universities"
          className="absolute -top-24"
          style={{ scrollMarginTop: '80px' }}
        ></span>
        <span
          id="companies"
          className="absolute -top-24"
          style={{ scrollMarginTop: '80px' }}
        ></span>

        <div className="max-w-[1200px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
              For Universities & Companies
            </p>
            <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
              Empowering Both Sides of the Internship
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#4B5563] max-w-[620px] mx-auto">
              Whether you’re an academic institution or a business, Tadreeby gives you the tools to manage internships seamlessly.
            </p>
          </AnimateOnScroll>

          {/* Two-column layout: left (cards) / right (form) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left column: University + Company cards stacked */}
            <div className="flex flex-col gap-6">
              {/* University Card */}
              <AnimateOnScroll delay={0} from="left">
                <div className="bg-white border border-blue-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <UniversityIcon className="w-12 h-12 text-[#1677FF] mb-4" />
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">For Universities</h3>
                  <ul className="space-y-3 text-[15px] text-[#4B5563]">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 text-lg">✓</span>
                      <span>Streamline internship coordination across departments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 text-lg">✓</span>
                      <span>Real‑time tracking of student progress and hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 text-lg">✓</span>
                      <span>Automated compliance reporting for accreditation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 text-lg">✓</span>
                      <span>Customizable training plans aligned with your curriculum</span>
                    </li>
                  </ul>
                  {/* No link – just information */}
                </div>
              </AnimateOnScroll>

              {/* Company Card */}
              <AnimateOnScroll delay={100} from="left">
                <div className="bg-white border border-orange-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <CompanyIcon className="w-12 h-12 text-[#F97316] mb-4" />
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">For Companies</h3>
                  <ul className="space-y-3 text-[15px] text-[#4B5563]">
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-lg">✓</span>
                      <span>Post unlimited internship openings with ease</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-lg">✓</span>
                      <span>Access a curated pool of qualified student talent</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-lg">✓</span>
                      <span>Manage applications, interviews, and onboarding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-lg">✓</span>
                      <span>Track intern performance and provide feedback</span>
                    </li>
                  </ul>
                  {/* No link – just information */}
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right column: Contact Form */}
            <AnimateOnScroll delay={200} from="right">
              <div
                id="contact-form"
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                style={{ scrollMarginTop: '80px' }}
              >
                <h3 className="text-xl font-bold text-[#111827] mb-2">Get in Touch</h3>
                <p className="text-[14px] text-[#6B7280] mb-6">
                  Interested? Send us a message and we’ll get back to you within 24 hours.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const name = form.name.value;
                    const email = form.email.value;
                    const subject = form.subject.value || 'Inquiry about Tadreeby';
                    const message = form.message.value;
                    const mailtoLink = `mailto:info@tadreeby.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
                    window.location.href = mailtoLink;
                  }}
                  className="space-y-4 flex-1"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      placeholder="e.g. Ahmad Salameh"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1677FF] hover:bg-[#0a5fc9] text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm"
                  >
                    Send Message
                  </button>
                </form>
                <p className="mt-3 text-xs text-[#9CA3AF] text-center">
                  We’ll reply via email. All data is kept confidential.
                </p>
              </div>
            </AnimateOnScroll>
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
            <div className="col-span-1">
              <div>
                <svg width="47" height="30" viewBox="0 0 47 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.9861 4.89533C28.4781 5.69423 27.0185 6.47247 25.5521 7.24249C25.0758 7.49275 24.6299 7.80902 24.0857 7.9149C23.3517 8.0579 22.6594 7.97541 21.9892 7.61515C20.2139 6.6595 18.429 5.72171 16.6482 4.77706C16.482 4.68906 16.3117 4.60657 16.1691 4.48007C15.8492 4.19819 15.834 3.8393 16.1428 3.54641C16.4599 3.24666 16.8739 3.10229 17.2506 2.90016C18.8223 2.05588 20.4036 1.22674 21.9795 0.387966C22.9405 -0.123547 23.8987 -0.131807 24.8611 0.378331C26.6876 1.34773 28.5127 2.31712 30.3392 3.28651C30.4762 3.35939 30.6106 3.43228 30.7213 3.54366C30.9983 3.82142 31.0135 4.15279 30.731 4.42367C30.6009 4.5488 30.5579 4.67256 30.5607 4.84582C30.569 5.66671 30.5676 6.48759 30.5607 7.30849C30.5607 7.44462 30.5967 7.51615 30.7241 7.58078C31.1645 7.80216 31.3597 8.25727 31.2351 8.7234C31.1243 9.14004 30.7227 9.43979 30.2768 9.44117C29.8171 9.44117 29.4225 9.14281 29.3075 8.70555C29.1898 8.25728 29.3837 7.8035 29.8157 7.5835C29.9556 7.51199 29.9888 7.43501 29.9874 7.29063C29.9805 6.50686 29.9847 5.7231 29.9847 4.89533H29.9861Z" fill="#FCA83E" />
                  <path d="M34.5238 26.498C34.4241 28.4585 33.0543 29.7785 31.0227 29.8603C28.8772 29.9457 27.2049 28.5759 26.9986 26.6119C26.81 24.8008 27.5252 23.2104 28.1443 21.595C28.5321 21.2819 28.7847 21.3211 29.0871 21.7836C29.8485 22.9471 30.119 24.1817 29.9019 25.5586C29.7881 26.2738 29.845 27.1029 30.8163 27.0495C31.7948 26.9926 31.7094 26.1315 31.5849 25.4448C31.2219 23.5057 30.5886 21.6769 29.2117 20.1825C25.6216 15.7457 20.0284 16.1762 17.1749 21.1182C17.1749 21.1182 17.1678 21.1182 17.1749 21.1254C16.627 21.933 16.2392 22.8083 15.9581 23.7299C15.9581 23.7405 15.951 23.7548 15.9474 23.7655C15.8442 24.0786 15.7588 24.3952 15.6984 24.7226C15.6984 24.7297 15.6984 24.7368 15.6984 24.7439C15.6414 24.9752 15.5987 25.21 15.5525 25.4448C15.4244 26.1315 15.339 26.9926 16.3174 27.0495C17.0895 27.0922 17.2852 26.5727 17.271 25.9998C17.271 25.9358 17.271 25.8754 17.2603 25.8113C17.2603 25.7295 17.2425 25.6405 17.2319 25.5586C17.0504 24.4165 17.2034 23.3776 17.698 22.392C17.8901 22.0718 18.1178 21.7623 18.3597 21.4456C18.4949 21.3674 18.6337 21.378 18.7974 21.474C19.8185 23.0574 20.249 24.7154 20.1423 26.4944C20.0284 28.43 18.559 29.7749 16.595 29.871C14.4851 29.9706 12.6634 28.7538 12.5815 26.8467C12.4072 22.5628 14.2751 19.0831 17.456 16.3648C20.3558 13.892 23.7466 13.5575 27.2476 14.9238C31.2895 16.5 34.7479 22.0967 34.5309 26.5016L34.5238 26.498Z" fill="#1677FF" />
                  <path d="M23.6168 3.41748C26.2462 3.45662 28.1568 5.44554 28.1355 8.12472C28.1141 10.6651 26.1287 12.6043 23.5705 12.5829C20.8736 12.558 18.9558 10.6332 18.9807 7.97888C19.0056 5.28191 20.9412 3.3819 23.6168 3.41748Z" fill="#1677FF" />
                  <path d="M0.0084788 28.0178C0.591992 23.5418 1.67006 19.3362 6.23855 17.1338C8.55481 16.0166 10.9494 16.0735 13.3332 16.8705C13.81 17.0306 14.8703 17.1765 14.3259 18.0269C13.9061 18.6815 13.8527 19.9446 12.49 19.692C7.20989 18.7171 4.13577 20.9516 3.21069 26.4167C3.10395 27.0429 3.05769 27.6797 3.00788 28.313C2.92604 29.2986 2.53467 30.0352 1.43168 29.9818C0.218401 29.9249 -0.0662468 29.0887 0.0120294 28.0142L0.0084788 28.0178Z" fill="#1677FF" />
                  <path d="M37.0937 16.3084C40.9221 16.2942 43.4838 18.3365 45.2842 21.496C46.4477 23.5419 46.8817 25.8118 46.9992 28.1495C47.049 29.1244 46.8319 29.9499 45.6969 29.9997C44.5263 30.0495 44.1172 29.281 44.0674 28.2064C43.9713 26.1499 43.3984 24.225 42.3524 22.4531C40.7299 19.6956 38.3781 18.5714 35.3253 19.5036C33.6175 20.0266 33.3542 18.8844 32.7671 17.9984C32.3473 17.3651 33.0126 17.2228 33.3827 17.0449C34.5497 16.4792 35.7985 16.287 37.0937 16.3048V16.3084Z" fill="#1677FF" />
                  <path d="M37.1215 14.6964C34.8657 14.6893 32.9586 12.7359 32.9906 10.4659C33.0227 8.1852 34.7768 6.52004 37.1393 6.53427C39.5267 6.5485 41.3021 8.33113 41.2737 10.6936C41.2488 12.8818 39.3595 14.7071 37.1179 14.7L37.1215 14.6964Z" fill="#1677FF" />
                  <path d="M9.91976 6.53125C12.3392 6.53125 13.9937 8.14309 14.0008 10.5127C14.0079 12.9179 12.204 14.7574 9.88774 14.7147C7.6035 14.672 5.87075 12.8895 5.86719 10.5803C5.86364 8.24626 7.57503 6.53481 9.91976 6.53125Z" fill="#1677FF" />
                  <path d="M27.3532 3.15249C27.3392 3.14261 27.3233 3.13382 27.3041 3.12749C26.8259 2.96994 26.2662 3.05067 25.7707 3.04447C25.0061 3.03487 24.2547 3.07486 23.4909 3.10779C22.3345 3.15772 20.5638 3.16743 19.4119 3.12749C19.3585 3.12566 19.3197 3.15467 19.2979 3.19409C19.2599 3.17823 19.2161 3.17829 19.1747 3.20587C18.8351 3.43273 18.9547 3.41586 18.9289 3.76465C18.8868 4.33461 18.8057 3.78252 18.9194 4.34759C19.0334 4.91445 20.3283 4.57594 20.7462 4.56502C21.8161 4.53709 22.7568 5.18831 23.4292 5.96622C23.4862 6.03219 23.6087 6.03133 23.6659 5.96622C24.1774 5.38397 24.8752 5.01781 25.5943 4.75567C25.9324 4.63236 26.2718 4.54864 26.6331 4.5487C26.8477 4.54876 27.7862 4.59421 27.9871 4.57048C28.0603 4.56186 28.1114 4.51727 28.1333 4.46286C28.1888 4.45384 28.2384 4.41344 28.2326 4.34759C28.1865 3.83303 28.1802 4.53778 28.1974 4.02173C28.205 3.79136 28.22 3.56102 28.2327 3.33089C28.2404 3.19345 28.2047 2.85416 28.2415 2.65C28.2622 2.62845 28.2776 2.59967 28.2817 2.56329C28.2866 2.52072 28.2312 3.26046 28.2327 3.21495C28.236 3.11818 27.4431 3.14462 27.3532 3.15249Z" fill="#FCA83E" />
                </svg>
              </div>
              <p className="mt-4 text-[14px] leading-[1.55] text-[#6B7280] max-w-[280px]">
                Smart Field Training & Internship Management Platform for
                students, universities, and companies.
              </p>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Platform</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <li>
                  <a href="#features" onClick={scrollToSection('features')} className="hover:underline hover:text-[#1677FF] cursor-pointer transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="hover:underline hover:text-[#1677FF] cursor-pointer transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Quick Links</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <li><a href="#" className="hover:underline">Students</a></li>
                <li>
                  <a href="#universities" onClick={scrollToSection('universities')} className="hover:underline hover:text-[#1677FF] cursor-pointer">
                    Universities
                  </a>
                </li>
                <li>
                  <a href="#companies" onClick={scrollToSection('companies')} className="hover:underline hover:text-[#1677FF] cursor-pointer">
                    Companies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Legal</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <li>
                  <Link to="/terms-privacy#part-1" className="hover:underline hover:text-[#1677FF]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/terms-privacy#part-2" className="hover:underline hover:text-[#1677FF]">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">Contact</h4>
              <div className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#FFEDD4] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#F54900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>info@tadreeby.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DBEAFE] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#155DFC]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.23 0H1.77C0.79 0 0 0.78 0 1.75v20.5C0 23.22 0.79 24 1.77 24h20.46c0.98 0 1.77-0.78 1.77-1.75V1.75C24 0.78 23.21 0 22.23 0zM7.08 20.31H3.55V8.97h3.53v11.34zM5.31 7.37c-1.13 0-2.04-0.92-2.04-2.04s0.91-2.04 2.04-2.04 2.04 0.92 2.04 2.04-0.91 2.04-2.04 2.04zM20.31 20.31h-3.53v-5.56c0-1.33-0.48-2.24-1.68-2.24s-1.94 0.85-1.94 2.24v5.56h-3.53V8.97h3.53v1.52c0.49-0.76 1.37-1.52 2.75-1.52 1.99 0 3.48 1.31 3.48 3.82v6.52z" />
                    </svg>
                  </div>
                  <span>Tadreeby | تدريبي</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#00A63E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span>+970 567 294 381</span>
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

// // LandingPage.jsx
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { Header } from "../layout/Header";
// import { Button } from "../common/Button";
// import logo from "../../assets/logo.svg";
// import {
//   StudentIcon,
//   UniversityIcon,
//   CompanyIcon,
//   MatchingIcon,
//   TrackingIcon,
// } from "../common/Icons";

// // ---------- Scroll Animation Hook ----------
// function useInView(options = {}) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           observer.unobserve(el);
//         }
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...options }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);
//   return [ref, inView];
// }

// // AnimateOnScroll – wraps children and fades/slides them in when visible
// const AnimateOnScroll = ({ children, delay = 0, className = "", from = "bottom" }) => {
//   const [ref, inView] = useInView();
//   const translateMap = { bottom: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)" };
//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translate(0,0)" : translateMap[from] || "translateY(32px)",
//         transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// // ---------- Reusable Components ----------

// // 1. Stat Card (used in Hero section)
// const StatCard = ({ number, label, dotColor, rotation = "0deg" }) => (
//   <div
//     className="flex-1 min-w-[200px] bg-[#F3F4F6] shadow-md rounded-2xl p-6 hover-lift transition-all duration-300 hover:shadow-xl hover:bg-white"
//     style={{ transform: `rotate(${rotation})` }}
//   >
//     <div
//       className="w-2.5 h-2.5 rounded-full mb-2 animate-pulse-dot"
//       style={{ backgroundColor: dotColor }}
//     />
//     <div className="text-[32px] font-bold text-[#111827]">{number}</div>
//     <div className="text-[14px] text-[#6B7280]">{label}</div>
//   </div>
// );

// // 2. Overview Card (used in Platform Overview)
// const OverviewCard = ({ icon, title, description }) => (
//   <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left hover-lift transition-all duration-300 hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(22,119,255,0.08)]">
//     <div className="mb-4 transition-transform duration-300 hover:scale-110 inline-block">{icon}</div>
//     <h3 className="text-[19px] font-semibold text-[#111827]">{title}</h3>
//     <p className="mt-2 text-[14.5px] leading-[1.55] text-[#4B5563]">
//       {description}
//     </p>
//   </div>
// );

// // 3. Feature Card (used in Key Features)
// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-white rounded-2xl p-8 text-left hover-lift transition-all duration-300 border border-transparent hover:border-blue-100 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
//     <div className="mb-4 transition-transform duration-300 hover:scale-110 inline-block">{icon}</div>
//     <h3 className="text-[17px] font-semibold text-[#111827]">{title}</h3>
//     <p className="mt-2 text-[14px] leading-[1.55] text-[#4B5563]">
//       {description}
//     </p>
//   </div>
// );

// // 4. FAQ Item (used in FAQ section) – animated open/close
// const FAQItem = ({ question, answer, isOpen, onToggle }) => (
//   <div
//     className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-blue-200 shadow-md" : "border-gray-200 hover:border-gray-300"
//       }`}
//   >
//     <button
//       className="flex justify-between items-center w-full px-6 py-5 text-left cursor-pointer group"
//       onClick={onToggle}
//     >
//       <span className={`text-[16px] font-semibold transition-colors duration-200 ${isOpen ? "text-[#2563EB]" : "text-[#111827] group-hover:text-[#2563EB]"}`}>
//         {question}
//       </span>
//       <span
//         className="ml-4 flex-shrink-0 transition-transform duration-300"
//         style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
//       >
//         <svg
//           className={`w-5 h-5 transition-colors duration-200 ${isOpen ? "text-[#2563EB]" : "text-[#9CA3AF] group-hover:text-[#2563EB]"}`}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </span>
//     </button>
//     {/* Smooth height animation via max-height */}
//     <div
//       style={{
//         maxHeight: isOpen ? "400px" : "0px",
//         overflow: "hidden",
//         transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
//       }}
//     >
//       <div className="px-6 pb-5 text-[14.5px] leading-[1.6] text-[#4B5563] border-t border-gray-100 pt-3">
//         {answer}
//       </div>
//     </div>
//   </div>
// );


// // 5. Step Card (used in How Tadreeby Works)
// const StepCard = ({ number, title, description }) => (
//   <div className="hover-lift transition-all duration-300 p-4 rounded-2xl">
//     <div className="w-16 h-16 bg-[#155DFC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-md transition-transform duration-300 hover:scale-110 animate-pulse-subtle">
//       {number}
//     </div>
//     <h3 className="mt-4 text-lg font-semibold text-[#111827]">{title}</h3>
//     <p className="mt-1 text-sm text-gray-600 leading-relaxed">{description}</p>
//   </div>
// );

// // WhatsApp Floating Button – bottom-left with slide-out card
// const WhatsAppButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleOpen = () => setIsOpen(!isOpen);

//   return (
//     <div className="fixed bottom-20 left-8 z-50 flex flex-row-reverse items-end gap-3">
//       {/* Chat Card – slides in from the left (appears to the right of the button) */}
//       {isOpen && (
//         <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-[270px] animate-slide-in">
//           <div className="flex items-center gap-2">
//             <span className="w-2.5 h-2.5 bg-[#12C754] rounded-full animate-pulse-dot"></span>
//             <span className="text-sm font-semibold text-[#111827]">
//               Tadreeby Support
//             </span>
//           </div>
//           <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
//             Hi 👋 Click to chat. We reply in minutes!
//           </p>
//           <a
//             href="https://wa.me/970567294381"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-3 block w-full bg-[#12C754] hover:bg-[#0da84a] text-white text-xs font-semibold text-center py-2 rounded-xl transition shadow-md hover:shadow-lg"
//           >
//             Start Chat on WhatsApp →
//           </a>
//         </div>
//       )}

//       {/* Main FAB Button */}
//       <button
//         onClick={toggleOpen}
//         className="relative w-16 h-16 rounded-full bg-[#12C754] shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none flex items-center justify-center hover:scale-105 animate-float-slow cursor-pointer"
//       >
//         {/* WhatsApp Icon (SVG) */}
//         <svg
//           className="w-9 h-9 text-white"
//           viewBox="0 0 36 36"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M18 3C9.7157 3 3 9.7157 3 18C3 21.516 4.011 24.7973 5.754 27.5505L3.1995 36L11.88 33.486C14.5463 35.0565 17.6655 36 21 36C29.2843 36 36 29.2843 36 21C36 12.7157 29.2843 3 18 3ZM12.39 12.498C12.7973 12.498 13.2067 12.4928 13.5645 12.51C13.986 12.5303 14.4555 12.7267 14.8417 13.6995C15.2985 14.8418 16.2773 17.3085 16.4002 17.5545C16.5233 17.8005 16.608 18.0878 16.4415 18.4132C16.2743 18.738 16.1925 18.9405 15.9465 19.2277C15.7005 19.515 15.4305 19.869 15.2078 20.0887C14.9625 20.3317 14.7067 20.5958 14.988 21.0877C15.2692 21.5798 16.269 23.2237 17.763 24.5655C19.6785 26.2792 21.2985 26.8125 21.7935 27.0585C22.2885 27.3045 22.5735 27.264 22.8547 26.9355C23.136 26.6077 24.09 25.494 24.4103 25.002C24.7298 24.51 25.0515 24.5917 25.491 24.756C25.9305 24.9195 28.38 26.124 28.875 26.37C29.37 26.616 29.6955 26.739 29.8185 26.9355C29.9415 27.135 29.9415 28.131 29.5312 29.2942C29.121 30.4567 27.126 31.5998 26.1623 31.6815C25.1985 31.764 24.2903 32.109 19.9627 30.4275C14.7773 28.4385 11.4817 23.1502 11.2358 22.8225C10.9897 22.494 9.22875 20.1975 9.22875 17.8215C9.22875 15.4455 10.4648 14.2762 10.9163 13.7812C11.367 13.2863 11.9003 13.1602 12.2265 13.1602L12.39 12.498Z"
//             fill="white"
//           />
//         </svg>

//         {/* Red notification badge */}
//         <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF3939] border-2 border-white rounded-full animate-ping"></span>
//         <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF3939] border-2 border-white rounded-full"></span>
//       </button>
//     </div>
//   );
// };

// // ---------- Main LandingPage Component ----------

// const LandingPage = () => {
//   const [openFAQ, setOpenFAQ] = useState(0);

//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const faqs = [
//     {
//       question: "Is Tadreeby free for students?",
//       answer:
//         "Yes, completely free. Students can create an account, browse internships, and apply without any cost.",
//     },
//     {
//       question: "Which universities are currently partnered with Tadreeby?",
//       answer:
//         "We are partnered with 9 universities across Palestine, including Al-Quds University, Birzeit University, and An-Najah National University.",
//     },
//     {
//       question: "How long does account verification take?",
//       answer:
//         "Most accounts are verified within 24 hours during business days.",
//     },
//     {
//       question: "Can companies post multiple internship openings at once?",
//       answer:
//         "Yes, companies can post unlimited openings and manage them from a single dashboard.",
//     },
//     {
//       question: "What happens after I complete my internship?",
//       answer:
//         "You receive a verified digital certificate and a detailed performance report, shareable on your professional profile.",
//     },
//     {
//       question:
//         "What documents do universities and companies need to join Tadreeby?",
//       answer:
//         "Universities need an official accreditation letter, a signed partnership agreement, and the contact details of a designated training coordinator. Companies need a valid commercial registration, a signed MOU with Tadreeby, and at least one assigned supervisor account to manage incoming interns.",
//     },
//   ];

//   const steps = [
//     {
//       number: 1,
//       title: "Sign Up",
//       description:
//         "Create your account as a student, university, or company.",
//     },
//     {
//       number: 2,
//       title: "Set Up Profile",
//       description:
//         "Complete your profile with skills, interests, and documents.",
//     },
//     {
//       number: 3,
//       title: "Get Matched",
//       description:
//         "Receive AI-powered recommendations and apply to internships.",
//     },
//     {
//       number: 4,
//       title: "Track & Graduate",
//       description:
//         "Monitor progress, get feedback, and earn your certificate.",
//     },
//   ];

//   const features = [
//     {
//       icon: <MatchingIcon className="w-12 h-12" />,
//       title: "Smart Internship Matching",
//       description:
//         "AI-assisted matching connects students to the most relevant openings based on skills and specialization.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#EBF8F3] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#1D936C]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Real-Time Application Tracking",
//       description:
//         "Students and supervisors follow every step of the application — from submitted to approved.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#F1ECF4] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#A019D6]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Digital Verification",
//       description:
//         "Upload and verify university ID and student documents securely, with instant validation feedback.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#FFF3E9] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#F89516]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 00-2 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Progress Analytics",
//       description:
//         "Universities and companies get dashboards showing placement rates, hours logged, and outcomes.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#FFEFEC] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#EF3939]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Automated Notifications",
//       description:
//         "Stay informed with smart alerts for deadlines, approvals, and status changes — no manual follow-up.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#EBF8F5] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#0077E6]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Certification & Reporting",
//       description:
//         "Generate official completion certificates and exportable reports for academic credit requirements.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#EAF4FF] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#1430CF]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Data Security & Privacy",
//       description:
//         "Enterprise-grade encryption and strict access controls keep every student, university, and company record private and protected.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#F4EDFF] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#A019D6]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "AI-Powered Recommendations",
//       description:
//         "Smart, AI-driven suggestions guide students toward the internships and companies that best fit their profile.",
//     },
//     {
//       icon: (
//         <div className="w-12 h-12 bg-[#FFFECE] rounded-2xl flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-[#F3D300]"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//         </div>
//       ),
//       title: "Built-In Chat, Ratings & Activity Feed",
//       description:
//         "Message supervisors directly, rate completed tasks, and follow a live activity feed for every internship in progress.",
//     },
//   ];

//   // Smooth scroll with header offset
//   const scrollToSection = (id) => (e) => {
//     e.preventDefault();
//     const el = document.getElementById(id);
//     if (!el) return;
//     const headerOffset = 72;
//     const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
//     window.scrollTo({ top, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-white font-['Inter']">
//       {/* Navigation Bar */}
//       {/* <Header
//         className="glass-header glassi shadowi background: rgb(255, 255, 255)"
//         rightContent={
//           <>
//             <Link
//               to="/login"
//               className="text-sm font-semibold text-[#374151] hover:text-blue-600 transition-colors"
//             >
//               Log In
//             </Link>
//             <Link to="/register">
//               <Button
//                 variant="primary"
//                 className="rounded-full px-6 py-2.5 text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </>
//         }
//       >
//         <a href="#features" onClick={scrollToSection('features')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">Features</a>
//         <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">How It Works</a>
//         <a href="#universities" onClick={scrollToSection('universities')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">For Universities</a>
//         <a href="#companies" onClick={scrollToSection('companies')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">For Companies</a>
//         <a href="#faq" onClick={scrollToSection('faq')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">FAQ</a>
//       </Header> */}


//       <Header
//         rightContent={
//           <>
//             <Link
//               to="/login"
//               className="text-sm font-semibold text-[#374151] hover:text-blue-600 transition-colors"
//             >
//               Log In
//             </Link>
//             <Link to="/register">
//               <Button
//                 variant="primary"
//                 className="rounded-full px-6 py-2.5 text-sm font-semibold bg-[#F97316] hover:bg-orange-600 text-white border-none transition-transform hover:scale-105 shadow-sm"
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </>
//         }
//       >
//         <a href="#features" onClick={scrollToSection('features')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">Features</a>
//         <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">How It Works</a>
//         <a href="#universities" onClick={scrollToSection('universities')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">For Universities</a>
//         <a href="#companies" onClick={scrollToSection('companies')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">For Companies</a>
//         <a href="#faq" onClick={scrollToSection('faq')} className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-300 hover:after:w-full cursor-pointer">FAQ</a>
//       </Header>

//       {/* Hero Section */}
// <section className="flex flex-col items-center justify-center pt-[120px] pb-[100px] px-4 bg-gradient-to-b from-[#F2F7FF] to-[#FFF8F4] overflow-hidden sm:pt-[130px]">
//   <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-in-up">
//     {/* Badge */}
//     <div className="flex items-center gap-2 bg-[#EFF6FF] rounded-full px-4 py-2 mb-7 border border-blue-100 shadow-sm animate-pulse-subtle">
//       <span className="w-2 h-2 bg-[#10B981] rounded-full animate-ping"></span>
//       <span className="text-[13.5px] font-semibold text-[#2563EB]">
//         Trusted by 9 Universities Across Palestine
//       </span>
//     </div>

//     {/* Headline */}
//     <h1 className="text-[44px] sm:text-[56px] font-extrabold leading-[1.12] tracking-[-1px] text-[#111827]">
//       Where Students, Universities
//       <br /> & Companies are{" "}
//       <span className="text-[#F97316] relative inline-block">
//         Connected
//         <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-200/50 -z-10 rounded-full"></span>
//       </span>
//     </h1>

//     {/* Description */}
//     <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.6] text-[#4B5563] max-w-[680px]">
//       Tadreeby is the smart platform that manages field training and
//       internships end-to-end — from application to certification — for
//       students, universities, and companies alike.
//     </p>

//     {/* CTA Buttons */}
//     <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
//       <Link to="/register">
//         <button className="px-7 py-3.5 bg-[#F97316] text-white text-[15px] font-semibold rounded-full hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
//           Student Registration
//         </button>
//       </Link>
//       <Link to="/register">
//         <button className="px-7 py-3.5 bg-[#DCE8FD] border border-[#4D49FC]/30 text-[#374151] text-[15px] font-semibold rounded-full hover:bg-blue-100 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
//           For Universities and Companies
//         </button>
//       </Link>
//     </div>

//     {/* Small text */}
//     <p className="mt-4 text-[13.5px] text-[#9CA3AF]">
//       No credit card required • Free for students • Setup in minutes
//     </p>
//   </div>

//         {/* Hero Visual */}
//         <div className="relative mt-16 w-full max-w-[1000px] animate-scale-up">
//           {/* Stat Cards Container */}
//           <div className="flex flex-wrap items-stretch justify-center gap-6 p-8 bg-white/90 backdrop-blur-md shadow-xl rounded-3xl border border-gray-100">
//             <StatCard
//               number="2,847"
//               label="Active Internships"
//               dotColor="#2563EB"
//               rotation="2.5deg"
//             />
//             <StatCard
//               number="412"
//               label="Partner Companies"
//               dotColor="#F97316"
//               rotation="0deg"
//             />
//             <StatCard
//               number="94%"
//               label="Completion Rate"
//               dotColor="#10B981"
//               rotation="-2.5deg"
//             />
//           </div>

//           {/* Floating Badges with continuous animations */}
//           <div className="absolute -top-4 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform rotate-3 animate-float hover-lift">
//             <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//             </div>
//             <span className="text-[13px] font-semibold text-[#1E293B]">
//               New Internship
//             </span>
//           </div>

//           <div className="absolute top-2 left-[320px] hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform -rotate-2 animate-float-reverse hover-lift">
//             <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//                 />
//               </svg>
//             </div>
//             <span className="text-[13px] font-semibold text-[#1E293B]">
//               New Task
//             </span>
//           </div>

//           <div className="absolute -bottom-4 right-16 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform rotate-2 animate-float-slow hover-lift">
//             <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                 />
//               </svg>
//             </div>
//             <span className="text-[13px] font-semibold text-[#1E293B]">
//               New Notification
//             </span>
//           </div>

//           <div className="absolute -top-3 right-6 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#DCE8FD] shadow-lg rounded-full px-4 py-2 transform -rotate-3 animate-float hover-lift">
//             <div className="w-7 h-7 bg-[#EFF6FF] rounded-full flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                 />
//               </svg>
//             </div>
//             <span className="text-[13px] font-semibold text-[#1E293B]">
//               New Message
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Platform Overview */}
//       <section id="universities" className="py-[100px] px-4 bg-white">
//         <div id="companies" className="max-w-[1200px] mx-auto text-center">
//           <AnimateOnScroll className="mb-16">
//             <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
//               Platform Overview
//             </p>
//             <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
//               One Platform, Every Stakeholder
//             </h2>
//             <p className="mt-4 text-[17px] leading-[1.6] text-[#4B5563] max-w-[636px] mx-auto">
//               Tadreeby brings students, universities, and companies into one
//               connected workflow — eliminating spreadsheets, email chains, and
//               manual paperwork.
//             </p>
//           </AnimateOnScroll>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <AnimateOnScroll delay={0} from="bottom">
//               <OverviewCard
//                 icon={<StudentIcon className="w-14 h-14" />}
//                 title="For Students"
//                 description="Discover internships, track applications, and build verified training records — all from one dashboard."
//               />
//             </AnimateOnScroll>
//             <AnimateOnScroll delay={120} from="bottom">
//               <OverviewCard
//                 icon={<UniversityIcon className="w-14 h-14" />}
//                 title="For Universities"
//                 description="Monitor student placements, validate training hours, and ensure curriculum compliance in real time."
//               />
//             </AnimateOnScroll>
//             <AnimateOnScroll delay={240} from="bottom">
//               <OverviewCard
//                 icon={<CompanyIcon className="w-14 h-14" />}
//                 title="For Companies"
//                 description="Post openings, review qualified candidates, and manage interns through a streamlined hiring funnel."
//               />
//             </AnimateOnScroll>
//           </div>
//         </div>
//       </section>


//       {/* Key Features */}
//       <section id="features" className="py-[100px] px-4 bg-[#F9FAFB]">
//         <div className="max-w-[1200px] mx-auto">
//           <AnimateOnScroll className="text-center mb-16">
//             <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
//               Key Features
//             </p>
//             <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
//               Everything You Need, Built In
//             </h2>
//             <p className="mt-4 text-[17px] leading-[1.6] text-[#4B5563] max-w-[620px] mx-auto">
//               Powerful tools designed to make field training management
//               effortless for everyone involved.
//             </p>
//           </AnimateOnScroll>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {features.map((feature, idx) => (
//               <AnimateOnScroll key={idx} delay={idx * 80}>
//                 <FeatureCard {...feature} />
//               </AnimateOnScroll>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How Tadreeby Works */}
//       <section id="how-it-works" className="py-16 px-4 bg-white">
//         <div className="max-w-[1180px] mx-auto text-center">
//           <AnimateOnScroll>
//             <h2 className="text-[40px] font-bold text-[#111827]">
//               How Tadreeby Works
//             </h2>
//           </AnimateOnScroll>
//           <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
//             {steps.map((step, idx) => (
//               <AnimateOnScroll key={step.number} delay={idx * 120} from="bottom">
//                 <StepCard {...step} />
//               </AnimateOnScroll>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section id="faq" className="py-[100px] px-4 bg-[#F9FAFB]">
//         <div className="max-w-[800px] mx-auto">
//           <AnimateOnScroll className="text-center mb-12">
//             <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
//               FAQ
//             </p>
//             <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
//               Frequently Asked Questions
//             </h2>
//           </AnimateOnScroll>

//           <div className="space-y-3">
//             {faqs.map((faq, index) => (
//               <AnimateOnScroll key={index} delay={index * 60}>
//                 <FAQItem
//                   question={faq.question}
//                   answer={faq.answer}
//                   isOpen={openFAQ === index}
//                   onToggle={() => toggleFAQ(index)}
//                 />
//               </AnimateOnScroll>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ============================================ */}
//       {/* NEW SECTION: For Universities & Companies     */}
//       {/* ============================================ */}
//       <section className="py-[80px] px-4 bg-[#F0F5FF] relative" id="for-universities-companies">
//         {/* Invisible anchors for header links */}
//         <span id="universities" className="absolute -top-24"></span>
//         <span id="companies" className="absolute -top-24"></span>

//         <div className="max-w-[1200px] mx-auto">
//           <AnimateOnScroll className="text-center mb-12">
//             <p className="text-[13px] font-bold tracking-[1px] text-[#2563EB] uppercase">
//               For Universities & Companies
//             </p>
//             <h2 className="mt-4 text-[40px] font-bold text-[#111827]">
//               Empowering Both Sides of the Internship
//             </h2>
//             <p className="mt-4 text-[17px] leading-[1.6] text-[#4B5563] max-w-[620px] mx-auto">
//               Whether you’re an academic institution or a business, Tadreeby gives you the tools to manage internships seamlessly.
//             </p>
//           </AnimateOnScroll>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* University Card */}
//             <AnimateOnScroll delay={0} from="left" className="lg:col-span-1">
//               <div className="bg-white border border-blue-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
//                 <UniversityIcon className="w-12 h-12 text-[#1677FF] mb-4" />
//                 <h3 className="text-2xl font-bold text-[#111827] mb-3">For Universities</h3>
//                 <ul className="space-y-3 text-[15px] text-[#4B5563]">
//                   <li className="flex items-start gap-3">
//                     <span className="text-blue-600 text-lg">✓</span>
//                     <span>Streamline internship coordination across departments</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-blue-600 text-lg">✓</span>
//                     <span>Real‑time tracking of student progress and hours</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-blue-600 text-lg">✓</span>
//                     <span>Automated compliance reporting for accreditation</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-blue-600 text-lg">✓</span>
//                     <span>Customizable training plans aligned with your curriculum</span>
//                   </li>
//                 </ul>
//                 <div className="mt-6">
//                   <Link to="/register" className="text-sm font-semibold text-[#1677FF] hover:underline">
//                     Learn more →
//                   </Link>
//                 </div>
//               </div>
//             </AnimateOnScroll>

//             {/* Company Card */}
//             <AnimateOnScroll delay={100} from="left" className="lg:col-span-1">
//               <div className="bg-white border border-orange-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
//                 <CompanyIcon className="w-12 h-12 text-[#F97316] mb-4" />
//                 <h3 className="text-2xl font-bold text-[#111827] mb-3">For Companies</h3>
//                 <ul className="space-y-3 text-[15px] text-[#4B5563]">
//                   <li className="flex items-start gap-3">
//                     <span className="text-orange-500 text-lg">✓</span>
//                     <span>Post unlimited internship openings with ease</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-orange-500 text-lg">✓</span>
//                     <span>Access a curated pool of qualified student talent</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-orange-500 text-lg">✓</span>
//                     <span>Manage applications, interviews, and onboarding</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-orange-500 text-lg">✓</span>
//                     <span>Track intern performance and provide feedback</span>
//                   </li>
//                 </ul>
//                 <div className="mt-6">
//                   <Link to="/register" className="text-sm font-semibold text-[#F97316] hover:underline">
//                     Learn more →
//                   </Link>
//                 </div>
//               </div>
//             </AnimateOnScroll>

//             {/* Mail Template / Contact Form */}
//             <AnimateOnScroll delay={200} from="right" className="lg:col-span-1">
//               <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
//                 <h3 className="text-xl font-bold text-[#111827] mb-2">Get in Touch</h3>
//                 <p className="text-[14px] text-[#6B7280] mb-6">
//                   Interested? Send us a message and we’ll get back to you within 24 hours.
//                 </p>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     const form = e.target;
//                     const name = form.name.value;
//                     const email = form.email.value;
//                     const subject = form.subject.value || 'Inquiry about Tadreeby';
//                     const message = form.message.value;
//                     const mailtoLink = `mailto:info@tadreeby.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
//                     window.location.href = mailtoLink;
//                   }}
//                   className="space-y-4"
//                 >
//                   <div>
//                     <label className="block text-sm font-medium text-[#374151] mb-1">Your Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
//                       placeholder="e.g. Ahmad Salameh"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#374151] mb-1">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#374151] mb-1">Subject</label>
//                     <input
//                       type="text"
//                       name="subject"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
//                       placeholder="Optional"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#374151] mb-1">Message</label>
//                     <textarea
//                       name="message"
//                       rows="3"
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
//                       placeholder="Tell us how we can help..."
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-3 bg-[#1677FF] hover:bg-[#0a5fc9] text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//                 <p className="mt-3 text-xs text-[#9CA3AF] text-center">
//                   We’ll reply via email. All data is kept confidential.
//                 </p>
//               </div>
//             </AnimateOnScroll>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-[100px] px-4 bg-[#EEF3FE]">
//         <div className="max-w-[700px] mx-auto text-center">
//           <h2 className="text-[38px] font-bold text-[#111827]">
//             Ready to Start Your Journey?
//           </h2>
//           <p className="mt-4 text-[17px] leading-[1.6] text-[#6B7280]">
//             Join thousands of students, universities, and companies already
//             using Tadreeby to manage field training, the smart way.
//           </p>
//           <div className="mt-8">
//             <Link to="/register">
//               <button className="px-7 py-3.5 bg-[#F97316] text-white text-[15px] font-semibold rounded-full hover:bg-orange-600 transition">
//                 Get Started Now
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#FAFBFC] py-[72px] px-4">
//         <div className="max-w-[1200px] mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//             {/* Brand */}
//             <div className="col-span-1">
//               <div>
//                 <svg width="47" height="30" viewBox="0 0 47 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M29.9861 4.89533C28.4781 5.69423 27.0185 6.47247 25.5521 7.24249C25.0758 7.49275 24.6299 7.80902 24.0857 7.9149C23.3517 8.0579 22.6594 7.97541 21.9892 7.61515C20.2139 6.6595 18.429 5.72171 16.6482 4.77706C16.482 4.68906 16.3117 4.60657 16.1691 4.48007C15.8492 4.19819 15.834 3.8393 16.1428 3.54641C16.4599 3.24666 16.8739 3.10229 17.2506 2.90016C18.8223 2.05588 20.4036 1.22674 21.9795 0.387966C22.9405 -0.123547 23.8987 -0.131807 24.8611 0.378331C26.6876 1.34773 28.5127 2.31712 30.3392 3.28651C30.4762 3.35939 30.6106 3.43228 30.7213 3.54366C30.9983 3.82142 31.0135 4.15279 30.731 4.42367C30.6009 4.5488 30.5579 4.67256 30.5607 4.84582C30.569 5.66671 30.5676 6.48759 30.5607 7.30849C30.5607 7.44462 30.5967 7.51615 30.7241 7.58078C31.1645 7.80216 31.3597 8.25727 31.2351 8.7234C31.1243 9.14004 30.7227 9.43979 30.2768 9.44117C29.8171 9.44117 29.4225 9.14281 29.3075 8.70555C29.1898 8.25728 29.3837 7.8035 29.8157 7.5835C29.9556 7.51199 29.9888 7.43501 29.9874 7.29063C29.9805 6.50686 29.9847 5.7231 29.9847 4.89533H29.9861Z" fill="#FCA83E" />
//                   <path d="M34.5238 26.498C34.4241 28.4585 33.0543 29.7785 31.0227 29.8603C28.8772 29.9457 27.2049 28.5759 26.9986 26.6119C26.81 24.8008 27.5252 23.2104 28.1443 21.595C28.5321 21.2819 28.7847 21.3211 29.0871 21.7836C29.8485 22.9471 30.119 24.1817 29.9019 25.5586C29.7881 26.2738 29.845 27.1029 30.8163 27.0495C31.7948 26.9926 31.7094 26.1315 31.5849 25.4448C31.2219 23.5057 30.5886 21.6769 29.2117 20.1825C25.6216 15.7457 20.0284 16.1762 17.1749 21.1182C17.1749 21.1182 17.1678 21.1182 17.1749 21.1254C16.627 21.933 16.2392 22.8083 15.9581 23.7299C15.9581 23.7405 15.951 23.7548 15.9474 23.7655C15.8442 24.0786 15.7588 24.3952 15.6984 24.7226C15.6984 24.7297 15.6984 24.7368 15.6984 24.7439C15.6414 24.9752 15.5987 25.21 15.5525 25.4448C15.4244 26.1315 15.339 26.9926 16.3174 27.0495C17.0895 27.0922 17.2852 26.5727 17.271 25.9998C17.271 25.9358 17.271 25.8754 17.2603 25.8113C17.2603 25.7295 17.2425 25.6405 17.2319 25.5586C17.0504 24.4165 17.2034 23.3776 17.698 22.392C17.8901 22.0718 18.1178 21.7623 18.3597 21.4456C18.4949 21.3674 18.6337 21.378 18.7974 21.474C19.8185 23.0574 20.249 24.7154 20.1423 26.4944C20.0284 28.43 18.559 29.7749 16.595 29.871C14.4851 29.9706 12.6634 28.7538 12.5815 26.8467C12.4072 22.5628 14.2751 19.0831 17.456 16.3648C20.3558 13.892 23.7466 13.5575 27.2476 14.9238C31.2895 16.5 34.7479 22.0967 34.5309 26.5016L34.5238 26.498Z" fill="#1677FF" />
//                   <path d="M23.6168 3.41748C26.2462 3.45662 28.1568 5.44554 28.1355 8.12472C28.1141 10.6651 26.1287 12.6043 23.5705 12.5829C20.8736 12.558 18.9558 10.6332 18.9807 7.97888C19.0056 5.28191 20.9412 3.3819 23.6168 3.41748Z" fill="#1677FF" />
//                   <path d="M0.0084788 28.0178C0.591992 23.5418 1.67006 19.3362 6.23855 17.1338C8.55481 16.0166 10.9494 16.0735 13.3332 16.8705C13.81 17.0306 14.8703 17.1765 14.3259 18.0269C13.9061 18.6815 13.8527 19.9446 12.49 19.692C7.20989 18.7171 4.13577 20.9516 3.21069 26.4167C3.10395 27.0429 3.05769 27.6797 3.00788 28.313C2.92604 29.2986 2.53467 30.0352 1.43168 29.9818C0.218401 29.9249 -0.0662468 29.0887 0.0120294 28.0142L0.0084788 28.0178Z" fill="#1677FF" />
//                   <path d="M37.0937 16.3084C40.9221 16.2942 43.4838 18.3365 45.2842 21.496C46.4477 23.5419 46.8817 25.8118 46.9992 28.1495C47.049 29.1244 46.8319 29.9499 45.6969 29.9997C44.5263 30.0495 44.1172 29.281 44.0674 28.2064C43.9713 26.1499 43.3984 24.225 42.3524 22.4531C40.7299 19.6956 38.3781 18.5714 35.3253 19.5036C33.6175 20.0266 33.3542 18.8844 32.7671 17.9984C32.3473 17.3651 33.0126 17.2228 33.3827 17.0449C34.5497 16.4792 35.7985 16.287 37.0937 16.3048V16.3084Z" fill="#1677FF" />
//                   <path d="M37.1215 14.6964C34.8657 14.6893 32.9586 12.7359 32.9906 10.4659C33.0227 8.1852 34.7768 6.52004 37.1393 6.53427C39.5267 6.5485 41.3021 8.33113 41.2737 10.6936C41.2488 12.8818 39.3595 14.7071 37.1179 14.7L37.1215 14.6964Z" fill="#1677FF" />
//                   <path d="M9.91976 6.53125C12.3392 6.53125 13.9937 8.14309 14.0008 10.5127C14.0079 12.9179 12.204 14.7574 9.88774 14.7147C7.6035 14.672 5.87075 12.8895 5.86719 10.5803C5.86364 8.24626 7.57503 6.53481 9.91976 6.53125Z" fill="#1677FF" />
//                   <path d="M27.3532 3.15249C27.3392 3.14261 27.3233 3.13382 27.3041 3.12749C26.8259 2.96994 26.2662 3.05067 25.7707 3.04447C25.0061 3.03487 24.2547 3.07486 23.4909 3.10779C22.3345 3.15772 20.5638 3.16743 19.4119 3.12749C19.3585 3.12566 19.3197 3.15467 19.2979 3.19409C19.2599 3.17823 19.2161 3.17829 19.1747 3.20587C18.8351 3.43273 18.9547 3.41586 18.9289 3.76465C18.8868 4.33461 18.8057 3.78252 18.9194 4.34759C19.0334 4.91445 20.3283 4.57594 20.7462 4.56502C21.8161 4.53709 22.7568 5.18831 23.4292 5.96622C23.4862 6.03219 23.6087 6.03133 23.6659 5.96622C24.1774 5.38397 24.8752 5.01781 25.5943 4.75567C25.9324 4.63236 26.2718 4.54864 26.6331 4.5487C26.8477 4.54876 27.7862 4.59421 27.9871 4.57048C28.0603 4.56186 28.1114 4.51727 28.1333 4.46286C28.1888 4.45384 28.2384 4.41344 28.2326 4.34759C28.1865 3.83303 28.1802 4.53778 28.1974 4.02173C28.205 3.79136 28.22 3.56102 28.2327 3.33089C28.2404 3.19345 28.2047 2.85416 28.2415 2.65C28.2622 2.62845 28.2776 2.59967 28.2817 2.56329C28.2866 2.52072 28.2312 3.26046 28.2327 3.21495C28.236 3.11818 27.4431 3.14462 27.3532 3.15249Z" fill="#FCA83E" />
//                 </svg>
//                 {/* <img
//                   src={logo}
//                   alt="Tadreeby Logo"
//                   className="h-7 sm:h-8 w-auto mb-1"
//                 /> */}
//               </div>
//               <p className="mt-4 text-[14px] leading-[1.55] text-[#6B7280] max-w-[280px]">
//                 Smart Field Training & Internship Management Platform for
//                 students, universities, and companies.
//               </p>
//             </div>

//             {/* Platform */}
//             <div>
//               <h4 className="text-[15px] font-bold text-[#111827]">Platform</h4>
//               <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
//                 <li>
//                   <a href="#features" onClick={scrollToSection('features')} className="hover:underline hover:text-[#1677FF] cursor-pointer transition-colors">
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="hover:underline hover:text-[#1677FF] cursor-pointer transition-colors">
//                     How It Works
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:underline transition-colors">
//                     About Us
//                   </a>
//                 </li>
//               </ul>
//             </div>


//             {/* Quick Links */}
//             <div>
//               <h4 className="text-[15px] font-bold text-[#111827]">
//                 Quick Links
//               </h4>
//               <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
//                 <li>
//                   <a href="#" className="hover:underline">
//                     Students
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:underline">
//                     Universities
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:underline">
//                     Companies
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Legal */}
//             <div>
//               <h4 className="text-[15px] font-bold text-[#111827]">Legal</h4>
//               <ul className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
//                 <li>
//                   <Link to="/terms-privacy" className="hover:underline hover:text-[#1677FF]">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/terms-privacy" className="hover:underline hover:text-[#1677FF]">
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <h4 className="text-[15px] font-bold text-[#111827]">Contact</h4>
//               <div className="mt-4 space-y-3 text-[14px] text-[#6B7280]">
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 bg-[#FFEDD4] rounded-full flex items-center justify-center">
//                     <svg
//                       className="w-3 h-3 text-[#F54900]"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                   <span>info@tadreeby.com</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 bg-[#DBEAFE] rounded-full flex items-center justify-center">
//                     <svg
//                       className="w-3 h-3 text-[#155DFC]"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M22.23 0H1.77C0.79 0 0 0.78 0 1.75v20.5C0 23.22 0.79 24 1.77 24h20.46c0.98 0 1.77-0.78 1.77-1.75V1.75C24 0.78 23.21 0 22.23 0zM7.08 20.31H3.55V8.97h3.53v11.34zM5.31 7.37c-1.13 0-2.04-0.92-2.04-2.04s0.91-2.04 2.04-2.04 2.04 0.92 2.04 2.04-0.91 2.04-2.04 2.04zM20.31 20.31h-3.53v-5.56c0-1.33-0.48-2.24-1.68-2.24s-1.94 0.85-1.94 2.24v5.56h-3.53V8.97h3.53v1.52c0.49-0.76 1.37-1.52 2.75-1.52 1.99 0 3.48 1.31 3.48 3.82v6.52z" />
//                     </svg>
//                   </div>
//                   <span>linkedin.com/company/tadreeby</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 bg-[#DCFCE7] rounded-full flex items-center justify-center">
//                     <svg
//                       className="w-3 h-3 text-[#00A63E]"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//                     </svg>
//                   </div>
//                   <span>+970 592 609 579</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-12 pt-6 border-t border-gray-200 text-center text-[13px] text-[#6B7280]">
//             © 2026 Tadreeby. All rights reserved.
//           </div>
//         </div>
//       </footer>
//       <WhatsAppButton />
//     </div>
//   );
// };

// export default LandingPage;




