import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Clock,
  Settings,
  MessageCircle,
  Bell,
  Search,
  User,
  Mail,
  Check,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  Download,
} from "lucide-react";
import Sidebar from "../../layout/Sidebar";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";

// ------------------------------------------------------------
// 1. Student‑specific navigation & user data
// ------------------------------------------------------------
const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Internships", icon: Briefcase, path: "/student/internships" },
  { label: "My Internship", icon: GraduationCap, path: "/student/myInternship" },
  { label: "Attendance", icon: Clock, path: "/attendance" },
];

const studentFooterItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

const studentUser = {
  name: "Afnan Kullab",
  role: "Student",
  avatar: "", // placeholder
};

// ------------------------------------------------------------
// 2. Custom Info Icon (from Figma SVG)
// ------------------------------------------------------------
const InfoIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 20H14.6667V12H12V20ZM13.3333 9.33333C13.7111 9.33333 14.0278 9.20556 14.2833 8.95C14.5389 8.69444 14.6667 8.37778 14.6667 8C14.6667 7.62222 14.5389 7.30556 14.2833 7.05C14.0278 6.79444 13.7111 6.66667 13.3333 6.66667C12.9556 6.66667 12.6389 6.79444 12.3833 7.05C12.1278 7.30556 12 7.62222 12 8C12 8.37778 12.1278 8.69444 12.3833 8.95C12.6389 9.20556 12.9556 9.33333 13.3333 9.33333ZM13.3333 26.6667C11.4889 26.6667 9.75556 26.3167 8.13333 25.6167C6.51111 24.9167 5.1 23.9667 3.9 22.7667C2.7 21.5667 1.75 20.1556 1.05 18.5333C0.35 16.9111 0 15.1778 0 13.3333C0 11.4889 0.35 9.75556 1.05 8.13333C1.75 6.51111 2.7 5.1 3.9 3.9C5.1 2.7 6.51111 1.75 8.13333 1.05C9.75556 0.35 11.4889 0 13.3333 0C15.1778 0 16.9111 0.35 18.5333 1.05C20.1556 1.75 21.5667 2.7 22.7667 3.9C23.9667 5.1 24.9167 6.51111 25.6167 8.13333C26.3167 9.75556 26.6667 11.4889 26.6667 13.3333C26.6667 15.1778 26.3167 16.9111 25.6167 18.5333C24.9167 20.1556 23.9667 21.5667 22.7667 22.7667C21.5667 23.9667 20.1556 24.9167 18.5333 25.6167C16.9111 26.3167 15.1778 26.6667 13.3333 26.6667ZM13.3333 24C16.3111 24 18.8333 22.9667 20.9 20.9C22.9667 18.8333 24 16.3111 24 13.3333C24 10.3556 22.9667 7.83333 20.9 5.76667C18.8333 3.7 16.3111 2.66667 13.3333 2.66667C10.3556 2.66667 7.83333 3.7 5.76667 5.76667C3.7 7.83333 2.66667 10.3556 2.66667 13.3333C2.66667 16.3111 3.7 18.8333 5.76667 20.9C7.83333 22.9667 10.3556 24 13.3333 24Z"
      fill="currentColor"
    />
  </svg>
);

// ------------------------------------------------------------
// 3. Sub‑components (internal)
// ------------------------------------------------------------

// 3.1 Progress Tracker
const ProgressTracker = () => {
  const steps = [
    { label: "Applied", date: "Jul 12, 2026", active: true, completed: true },
    { label: "Review", date: "In Progress", active: true, completed: false },
    { label: "Approved", date: "\u00A0", active: false, completed: false },
  ];

  return (
    <div className="relative flex w-full items-center justify-between">
      {/* Progress line background */}
      <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 bg-[#DBEAFE]" />
      {/* Filled progress line (50% for Applied) */}
      <div className="absolute left-0 top-1/2 h-[4px] w-[33.33%] -translate-y-1/2 bg-[#1677FF]" />

      {steps.map((step, idx) => (
        <div key={idx} className="relative z-10 flex flex-col items-center">
          {/* Circle */}
          <div
            className={`flex h-[48px] w-[48px] items-center justify-center rounded-full ${
              step.active
                ? "bg-[#1677FF] text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                : "border-2 border-[#C3C5D7] bg-white text-[#434654]"
            }`}
          >
            {step.completed ? (
              <Check className="h-6 w-6" strokeWidth={2} />
            ) : step.active ? (
              <span className="text-lg font-bold">{idx + 1}</span>
            ) : (
              <span className="text-lg font-bold">{idx + 1}</span>
            )}
          </div>
          {/* Label */}
          <div className="mt-4 text-center">
            <p
              className={`font-jakarta text-sm font-semibold tracking-[0.14px] ${
                step.active ? "text-[#1677FF]" : "text-[#434654]"
              }`}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="font-jakarta text-xs font-medium text-[#434654]">
                {step.date}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// 3.2 Application Status Tracker (main card)
const ApplicationStatusTracker = () => (
  <div className="rounded-2xl bg-white p-[17px_48px_48px] shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <h2 className="font-jakarta text-2xl font-semibold text-[#1677FF]">
          Ongoing Verification
        </h2>
        <p className="font-jakarta text-base text-[#434654]">
          Your profile is currently under review
        </p>
      </div>
    </div>

    {/* Recruiter Message Box */}
    <div className="mt-4 flex items-center gap-6 rounded-2xl border border-[#FD761A] bg-[#FDF4E9] p-6">
      <div className="flex h-[26.67px] w-[26.67px] items-center justify-center rounded-full bg-[#FD7C0B] text-white">
        <InfoIcon />
      </div>
      <div>
        <h4 className="font-jakarta text-xl font-semibold text-[#FD7C0B]">
          Recruiter Message
        </h4>
        <p className="font-inter text-[15px] leading-[18px] text-[#FD7C0B]">
          Your account is currently being reviewed. You can access only your
          profile until the review is completed.
        </p>
      </div>
    </div>

    {/* Progress Tracker */}
    <div className="mt-6">
      <ProgressTracker />
    </div>
  </div>
);

// 3. Personal Information Card (only photo + fields + Edit)
const PersonalInfoCard = () => {
  const fields = [
    { label: "First Name", value: "Afnan", col: 1 },
    { label: "Last Name", value: "Kullab", col: 2 },
    { label: "Major", value: "Software Engineering", col: 1 },
    { label: "University", value: "Palestine University", col: 2 },
    {
      label: "Email*",
      value: "afnankullab3@gmail.com",
      col: 1,
      active: true,
      icon: <Mail className="mr-2 h-4 w-4 text-[#1677FF]" />,
    },
    {
      label: "Recovery Email*",
      value: "Please enter your recovery email..",
      col: 2,
      active: false,
      icon: <Mail className="mr-2 h-4 w-4 text-[#9B9B9B]" />,
    },
    {
      label: "GPA (optional)",
      value: "Enter your GPA..",
      col: 1,
      active: false,
      icon: null,
    },
    {
      label: "Company",
      value: "You are not enrolled yet",
      col: 2,
      active: false,
      icon: null,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
      {/* Edit button */}
      <div className="mt-4 flex justify-end">
        <button className="font-inter text-[11px] font-bold text-[#0467F9] hover:underline">
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        {/* Photo upload – centered vertically */}
        <div className="flex flex-col items-center gap-3 md:self-center">
          <div className="relative h-[81px] w-[81px] rounded-full bg-[#0069FF] bg-opacity-13">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-200 text-blue-600">
              <User className="h-12 w-12" />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-[#0069FF] p-1 text-white">
              <Upload className="h-4 w-4" />
            </div>
          </div>
          <button className="rounded-full bg-[#0069FF] px-4 py-1 text-[11px] font-medium text-[#DEECFF]">
            Upload Photo
          </button>
          <p className="text-[10px] text-[#737373]">PNG or JPEG only</p>
        </div>

        {/* Fields */}
        <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="font-inter text-[11px] font-medium text-[#000000]">
                {field.label}
              </label>
              <div
                className={`mt-1 flex items-center rounded-full border px-4 py-1.5 ${
                  field.active
                    ? "border-[#1677FF] bg-[#FAFAFA] text-[#080808]"
                    : "border-[#DBEAFE] bg-[#FAFAFA] text-[#737373]"
                }`}
              >
                {field.icon && field.icon}
                <span className="font-inter text-[13px] leading-4">
                  {field.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Documents Card (separate)
const DocumentsCard = () => (
  <div className="rounded-2xl bg-white p-4 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
    <h4 className="font-inter text-[13px] font-bold text-[#000000]">
      Documents
    </h4>
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-dashed border-[#1677FF] bg-[#EEF5FF] p-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#0467F9]" />
          <span className="font-inter text-[13px] text-[#000000]">CV</span>
        </div>
        <Download className="h-4 w-4 text-[#1677FF]" />
      </div>
      <div className="flex items-center justify-between rounded-lg bg-[#F4F4F4] p-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#434654] opacity-50" />
          <span className="font-inter text-[13px] text-[#7A7A7A]">
            Verification Document
          </span>
        </div>
        <span className="font-inter text-[9px] text-[#737686]">
          Currently under review
        </span>
      </div>
    </div>
  </div>
);

// 5. Skills Card (separate)
const SkillsCard = () => (
  <div className="rounded-2xl bg-white p-4 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
    <h4 className="font-inter text-[13px] font-bold text-[#1677FF]">Skills*</h4>
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full border border-[#DBEAFE] bg-[#FAFAFA] px-3 py-1 text-[13px] text-[#737373]">
        React
      </span>
      <span className="rounded-full border border-[#DBEAFE] bg-[#FAFAFA] px-3 py-1 text-[13px] text-[#737373]">
        Tailwind
      </span>
      <span className="rounded-full border border-[#DBEAFE] bg-[#FAFAFA] px-3 py-1 text-[13px] text-[#737373]">
        JavaScript
      </span>
    </div>
  </div>
);

// 3.4 Completion Checklist
const CompletionChecklist = () => {
  const items = [
    { label: "Setup Profile", done: false },
    { label: "Upload profile photo", done: false },
    { label: "Add your recovery email", done: false },
    { label: "Add skills", done: false },
    { label: "Upload CV (optional)", done: false },
    { label: "Upload Verification Document", done: true },
  ];

  const doneCount = items.filter((i) => i.done).length; //add this back
  const percentage = Math.round((doneCount / items.length) * 100); //add this back

  const radius = 54;
  const circumference = 2 * Math.PI * radius; // 339.292
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
      <div className="flex flex-col items-center">
        <div className="relative h-[133px] w-[133px]">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#DBEAFE"
              strokeWidth="12"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#1E8B3F"
              strokeWidth="12"
              strokeDasharray={circumference} //constant
              strokeDashoffset={
                circumference - (circumference * percentage) / 100
              } //shrinks as % grows
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="72"
              textAnchor="middle"
              fontSize="26"
              fontWeight="700"
              fill="#1E8B3F"
            >
              {percentage}%
            </text>
          </svg>
        </div>
        <h4 className="font-inter text-[11px] font-bold text-[#000000]">
          Complete your profile
        </h4>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {item.done ? (
              <CheckCircle className="h-5 w-5 text-[#1E8B3F]" />
            ) : (
              <XCircle className="h-5 w-5 text-[#FF0000]" />
            )}
            <span
              className={`font-inter text-[14px] ${
                item.done ? "text-[#1E8B3F]" : "text-[#FF0000]"
              }`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ------------------------------------------------------------
// 4. Main StudentProfile Component
// ------------------------------------------------------------
const StudentProfile = () => {
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setToastMessage(location.state.message || "Your account is pending.");

      const timer = window.setTimeout(() => {
        setToastMessage("");
      }, 6000);

      return () => window.clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F9FAFB] font-sans">
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 max-w-md rounded-2xl border border-green-200 bg-green-50 px-5 py-4 shadow-xl">
          <p className="text-base font-semibold text-green-800">Registration Successful</p>
          <p className="mt-1 text-sm leading-6 text-green-700">{toastMessage}</p>
        </div>
      )}
      
      <Sidebar
        navItems={studentNavItems} // each with a `path` property
        footerItems={studentFooterItems} // also with paths
        user={studentUser}
        profilePath="/student/profile" // (same as current route)
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-[1186px]">
          {/* Header with search and icons */}
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-full max-w-[576px]">
              <Search className="absolute left-[19px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0365FA]" />
              <input
                type="text"
                placeholder="Search internships or tasks..."
                className="font-jakarta w-full rounded-full border border-[#C3C5D7] bg-[#F9F9F9] py-[9px] pl-[48px] pr-4 text-[16px] text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:border-[#1677FF] focus:outline-none"
              />
            </div>
            <TopIconCluster
              chatBadge={9}
              notificationBadge={5}
              avatarUrl=""
              userName="Afnan Kullab"
            />
          </div>

          {/* Status Tracker */}
          <ApplicationStatusTracker />

          {/* Two‑column layout: left (Personal Info + Documents + Skills) + right (Checklist) */}
          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <PersonalInfoCard />
              {/* Documents and Skills in a row below */}
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <DocumentsCard />
                <SkillsCard />
              </div>
            </div>
            <div className="w-full lg:w-[257px] flex">
              <CompletionChecklist />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
