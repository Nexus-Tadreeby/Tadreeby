import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Clock,
  Settings,
  MessageCircle,
  Search,
  Cloud,
  Sparkles,
  TrendingUp,
  ClipboardList,
  CheckCircle2,
  MoreVertical,
  MessageSquare,
  MapPin,
} from "lucide-react";
import TechCorp from "../../../assets/Temp/TechCorp.jpg";
import UXResearch from "../../../assets/Temp/UXResearch.jpg";
import dataScienceIntern from "../../../assets/Temp/dataScienceIntern.jpg";
import { RocketIcon, InsightsIcon } from "../../common/Icons";
import Sidebar from "../../layout/Sidebar";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
import GreetingBanner from "../../common/pagesAssets/GreetingBanner";
import { useAuth } from "../../../context/AuthContext";

// ------------------------------------------------------------
// 1. Student navigation & user data
// ------------------------------------------------------------
const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
  { label: "My Internship", icon: GraduationCap, path: "/my/internship" },
  { label: "Attendance", icon: Clock, path: "/attendance" },
];

const studentFooterItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

const studentUser = {
  name: "Afnan Kullab",
  role: "Student",
  avatar: "",
};

// ------------------------------------------------------------
// 3. Smart Action Center
// ------------------------------------------------------------
const SmartActionCenter = () => (
  <div className="flex w-full items-center justify-between rounded-2xl border border-blue-600/10 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-orange-50/60 backdrop-blur-md p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover-lift transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1677FF] shadow-[0_4px_14px_rgba(22,119,255,0.3)] animate-pulse-subtle">
        <RocketIcon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-['Inter'] text-base font-extrabold text-[#1677FF]">
          3 action items need your attention
        </p>
        <p className="font-['Inter'] text-sm font-medium text-gray-500">
          Complete these to stay on track for your internship
        </p>
      </div>
    </div>
    <button className="rounded-full bg-[#1677FF] px-6 py-3 font-['Inter'] text-sm font-bold text-white shadow-[0_4px_14px_rgba(22,119,255,0.3)] hover:bg-blue-600 hover:shadow-[0_6px_20px_rgba(22,119,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
      Take Action
    </button>
  </div>
);

// ------------------------------------------------------------
// 4. Metric Card (reusable)
// ------------------------------------------------------------
const MetricCard = ({
  icon: Icon,
  iconColor,
  iconBg,
  badgeText,
  badgeColor,
  badgeBg,
  label,
  value,
  subtext,
  progress,
}) => (
  <div className="flex flex-1 min-w-[200px] flex-col rounded-2xl border border-blue-600/5 bg-white/90 backdrop-blur-md p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover-lift transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]">
    <div className="flex items-center justify-between">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: iconColor }} strokeWidth={2} />
      </div>
      <span
        className="rounded-full px-2.5 py-1 font-['Inter'] text-[11px] font-bold"
        style={{ backgroundColor: badgeBg, color: badgeColor }}
      >
        {badgeText}
      </span>
    </div>

    <p className="mt-4 font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="font-['Inter'] text-[22px] font-extrabold text-gray-900 leading-tight mt-0.5">{value}</p>

    {progress != null ? (
      <div className="mt-4 h-2.5 w-full rounded-full bg-blue-50 overflow-hidden">
        <div
          className="h-2.5 rounded-full bg-[#1677FF] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    ) : (
      <p className="mt-4 font-['Inter'] text-[12px] font-semibold text-gray-500">
        {subtext}
      </p>
    )}
  </div>
);

// ------------------------------------------------------------
// 5. Recommendation Card (reusable)
// ------------------------------------------------------------
const RecommendationCard = ({
  title,
  meta,
  tags,
  badgeText,
  badgeBg,
  image,
}) => (
  <div className="min-w-[200px] flex-1 basis-[220px] rounded-2xl border border-blue-600/5 bg-white/90 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover-lift transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]">
    <div className="relative m-4 mb-0 h-32 overflow-hidden rounded-xl bg-blue-50">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <span
        className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 font-['Inter'] text-[10px] font-bold text-white shadow-sm"
        style={{ backgroundColor: badgeBg }}
      >
        <Sparkles className="h-[11px] w-[11px]" />
        {badgeText}
      </span>
    </div>
    <div className="p-4 pt-3">
      <h4 className="font-['Inter'] text-[15px] font-extrabold text-gray-900">{title}</h4>
      <p className="mt-0.5 font-['Inter'] text-[12px] font-medium text-gray-500">
        {meta}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-blue-50 px-2 py-0.5 font-['Inter'] text-[10px] font-bold text-[#1677FF] border border-blue-100"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const RecommendationsSection = ({ recommendations }) => {
  const [view, setView] = useState("cards");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`rounded-md px-2 py-1 text-xs font-bold ${view === "cards" ? "bg-blue-50 text-[#1677FF]" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`rounded-md px-2 py-1 text-xs font-bold ${view === "list" ? "bg-blue-50 text-[#1677FF]" : "text-gray-500 hover:bg-gray-50"}`}
          >
            Compact List
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <div className="flex flex-wrap gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.title} {...rec} />
          ))}
        </div>
      ) : (
        <div className="divide-y rounded-2xl border border-blue-600/5 bg-white/90 p-2 shadow-sm">
          {recommendations.map((rec) => (
            <div key={rec.title} className="flex items-center gap-3 px-3 py-3">
              <img src={rec.image} alt={rec.title} className="h-12 w-12 rounded-md object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-gray-900">{rec.title}</h4>
                  <span className="text-xs font-bold text-[#1677FF]">{rec.badgeText}</span>
                </div>
                <p className="text-xs font-medium text-gray-500">{rec.meta}</p>
                <div className="mt-2 flex gap-2">
                  {rec.tags.map((t) => (
                    <span key={t} className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1677FF] border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#1677FF]">Details</button>
                <button className="rounded-full bg-[#1677FF] px-3 py-1 text-xs font-bold text-white">Apply</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------
// 6. AI Profile Strength Card
// ------------------------------------------------------------
const AIProfileCard = () => (
  <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1677FF] via-blue-600 to-indigo-700 p-6 shadow-[0_8px_25px_rgba(22,119,255,0.3)] hover-lift transition-all duration-300">
    <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
          <InsightsIcon className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-['Inter'] text-base font-extrabold text-white">AI Insight</h3>
      </div>
      <p className="font-['Inter'] text-xs font-medium leading-5 text-white/90">
        Great job! Your profile is at 88% complete. Finish your &quot;Skills&quot;
        section to unlock premium recommendations!
      </p>
      <div className="h-2 w-full rounded-full bg-white/25 overflow-hidden">
        <div className="h-2 w-[88%] rounded-full bg-white transition-all duration-1000" />
      </div>
      <button className="w-full rounded-full bg-white py-3 font-['Inter'] text-xs font-bold text-[#1677FF] shadow-sm transition-all hover:bg-blue-50 cursor-pointer">
        Complete Your Profile
      </button>
    </div>
  </div>
);

// ------------------------------------------------------------
// 7. Activity Feed
// ------------------------------------------------------------
const ACTIVITIES = [
  {
    icon: CheckCircle2,
    iconColor: "#16A34A",
    iconBg: "rgba(34,197,94,0.1)",
    title: "Registration Approved",
    description: "University Admin approved your registration at UP.",
    time: "2 hours ago",
  },
  {
    icon: ClipboardList,
    iconColor: "#1677FF",
    iconBg: "rgba(22,119,255,0.1)",
    title: "New Task Assigned",
    description:
      '"Project Planning Phase 1" assigned by TAQAT Supervisor.',
    time: "5 hours ago",
  },
  {
    icon: Clock,
    iconColor: "#FD761A",
    iconBg: "rgba(253,118,26,0.1)",
    title: "Deadline Approaching",
    description: "Weekly report submission is due in 48 hours.",
    time: "1 day ago",
  },
  {
    icon: MessageSquare,
    iconColor: "#6B7280",
    iconBg: "rgba(107,114,128,0.1)",
    title: "New Message",
    description:
      "Sarah from Designly sent you a message about your application.",
    time: "2 days ago",
  },
];

const ActivityItem = ({ activity, isLast }) => {
  const Icon = activity.icon;
  return (
    <div className="flex gap-3.5">
      <div className="relative flex shrink-0 flex-col items-center">
        {!isLast && (
          <span className="absolute top-10 h-[calc(100%+16px-40px)] w-0.5 bg-gray-200" />
        )}
        <div
          className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white shadow-sm"
          style={{ backgroundColor: activity.iconBg }}
        >
          <Icon
            className="h-4 w-4"
            style={{ color: activity.iconColor }}
            strokeWidth={2}
          />
        </div>
      </div>
      <div className={`flex-1 ${isLast ? "" : "pb-5"}`}>
        <p className="font-['Inter'] text-xs font-bold text-gray-900">
          {activity.title}
        </p>
        <p className="mt-0.5 font-['Inter'] text-[12px] font-medium leading-4 text-gray-500">
          {activity.description}
        </p>
        <p className="mt-1 font-['Inter'] text-[10px] font-medium text-gray-400">
          {activity.time}
        </p>
      </div>
    </div>
  );
};

const ActivityFeed = () => (
  <div className="flex max-h-[600px] w-full flex-col rounded-2xl border border-blue-600/5 bg-white/90 backdrop-blur-md p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover-lift transition-all duration-300">
    <div className="flex items-center justify-between pb-5">
      <h3 className="font-['Inter'] text-[16px] font-extrabold text-gray-800">
        Recent Activity
      </h3>
      <button
        aria-label="More options"
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>

    <div className="flex-1 space-y-0 overflow-y-auto pr-1">
      {ACTIVITIES.map((activity, idx) => (
        <ActivityItem
          key={activity.title}
          activity={activity}
          isLast={idx === ACTIVITIES.length - 1}
        />
      ))}
    </div>

    <button className="mt-5 w-full rounded-full border border-blue-200 bg-blue-50 py-3 font-['Inter'] text-xs font-bold text-[#1677FF] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer">
      View All Activity
    </button>
  </div>
);

// ------------------------------------------------------------
// 8. Main StudentDashboard Component
// ------------------------------------------------------------
const StudentDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const metrics = [
    {
      icon: TrendingUp,
      iconColor: "#1677FF",
      iconBg: "rgba(22,119,255,0.1)",
      badgeText: "In progress",
      badgeColor: "#1677FF",
      badgeBg: "rgba(22,119,255,0.1)",
      label: "Internship Progress",
      value: "8 of 12 weeks",
      progress: 65,
    },
    {
      icon: ClipboardList,
      iconColor: "#FD761A",
      iconBg: "rgba(253,118,26,0.1)",
      badgeText: "Due Soon",
      badgeColor: "#FD761A",
      badgeBg: "rgba(253,118,26,0.1)",
      label: "Pending Tasks",
      value: "2 Tasks",
      subtext: "1 High Priority Task",
    },
    {
      icon: Briefcase,
      iconColor: "#8B5CF6",
      iconBg: "rgba(139,92,246,0.1)",
      badgeText: "Active",
      badgeColor: "#8B5CF6",
      badgeBg: "rgba(139,92,246,0.1)",
      label: "Active Applications",
      value: "3 Positions",
      subtext: "2 in interview stage",
    },
    {
      icon: CheckCircle2,
      iconColor: "#16A34A",
      iconBg: "rgba(34,197,94,0.1)",
      badgeText: "On Track",
      badgeColor: "#16A34A",
      badgeBg: "rgba(34,197,94,0.1)",
      label: "Attendance",
      value: "90% Rate",
      subtext: "0 Late arrivals",
    },
  ];

  const recommendations = [
    {
      title: "Frontend Developer",
      meta: "TechCorp • Gaza City",
      tags: ["Remote", "Full-Time"],
      badgeText: "Matched",
      badgeBg: "#1677FF",
      image: TechCorp,
    },
    {
      title: "UI/UX Designer",
      meta: "Designly • Gaza City",
      tags: ["Design", "Part-Time"],
      badgeText: "Great Match",
      badgeBg: "#1677FF",
      image: UXResearch,
    },
    {
      title: "Data Engineering Intern",
      meta: "DataFlow • Gaza City",
      tags: ["Hybrid", "Paid"],
      badgeText: "Popular",
      badgeBg: "#FD761A",
      image: dataScienceIntern,
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#eef1f8] font-sans">
      <Sidebar
        navItems={studentNavItems}
        footerItems={studentFooterItems}
        user={studentUser}
        profilePath="/student/profile"
        onSignOut={handleSignOut}
      />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 animate-fade-in">
        <div className="mx-auto max-w-[1186px]">
          {/* Header with search and icons */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-[576px]">
              <Search className="absolute left-[19px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1677FF]" />
              <input
                type="text"
                placeholder="Search internships or tasks..."
                className="w-full rounded-full border border-blue-600/10 bg-white/80 backdrop-blur-md py-[11px] pl-[48px] pr-4 text-[15px] text-[#374151] shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus:border-[#1677FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-['Inter']"
              />
            </div>
            <TopIconCluster
              chatBadge={9}
              notificationBadge={5}
              avatarUrl=""
              userName="Afnan Kullab"
            />
          </div>

          {/* Welcome banner */}
          <GreetingBanner name={studentUser.name} />

          {/* Smart action center */}
          <div className="mt-6">
            <SmartActionCenter />
          </div>

          {/* Two-column grid: metrics/recommendations (left) + AI card/activity (right) */}
          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            {/* Left column */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Metric cards */}
              <div className="flex flex-wrap gap-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              {/* Recommendations */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Inter'] text-[18px] font-extrabold text-gray-900">Recommended for You</h2>

                  {/* view toggle */}
                  <div className="flex items-center gap-2">
                    <button className="font-['Inter'] text-xs font-bold text-[#1677FF] hover:underline cursor-pointer">
                      View All Recommendations
                    </button>
                  </div>
                </div>

                {/* Use a compact list view by default on smaller widths; allow cards for richer view */}
                <RecommendationsSection recommendations={recommendations} />
              </div>
            </div>

            {/* Right column */}
            <div className="flex w-full flex-col gap-6 lg:w-[304px] lg:shrink-0">
              <AIProfileCard />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;