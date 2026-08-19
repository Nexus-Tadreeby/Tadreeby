import React from "react";
import { useState } from "react";
import logo from "../../../assets/logo.svg";
import GreetingBanner from "../../common/pagesAssets/GreetingBanner.jsx";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster.jsx";
import Sidebar from "../../layout/Sidebar.jsx";
import {
  LayoutDashboard,
  Building2,
  Landmark,
  Users,
  ScanEye,
  MessageCircle,
  Settings,
  Bell,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Sun,
  User,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Static data pulled from the design                                */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/superAdmin/dashboard" },
  { label: "Universities", icon: Landmark, path: "/superAdmin/universities" },
  { label: "Companies", icon: Building2, path: "/superAdmin/companies" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "System Logs", icon: ScanEye, path: "/logs" },
];

const NAV_FOOTER_ITEMS = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

const UNIVERSITIES_CARD = {
  icon: Landmark,
  iconBg: "bg-blue-50",
  iconColor: "text-blue-600",
  value: "10",
  label: "Universities",
  delta: "+2 last month",
  subtext: "5 active · 1 inactive",
};

const COMPANIES_CARD = {
  icon: Building2,
  iconBg: "bg-orange-50",
  iconColor: "text-orange-500",
  value: "23",
  label: "Companies",
  delta: "+5 last month",
  subtext: "5 active · 1 inactive",
};

const STUDENTS_CARD = {
  icon: GraduationCap,
  iconBg: "bg-violet-50",
  iconColor: "text-violet-600",
  value: "600",
  label: "Total Students",
  delta: "+120 last month",
  subtext: "589 Approved · 10 Pending · 11 Rejected",
};

const INTERNSHIPS_CARD = {
  icon: Briefcase,
  iconBg: "bg-violet-50",
  iconColor: "text-violet-600",
  value: "35",
  label: "Internships",
  delta: "+12 last month",
  subtext: "25 Active · 10 Canceled",
};

const CHART_DATA = [
  { month: "Jan", applications: 620 },
  { month: "Feb", applications: 810 },
  { month: "Mar", applications: 980 },
  { month: "Apr", applications: 1120 },
  { month: "May", applications: 1246 },
  { month: "Jun", applications: 1090 },
];

const RANGE_OPTIONS = [
  {
    label: "last month",
    bg: "bg-orange-50",
    text: "text-orange-500",
    border: "border-orange-400",
  },
  {
    label: "last 3 months",
    bg: "bg-orange-50",
    text: "text-orange-500",
    border: "border-orange-400",
  },
  {
    label: "last 6 months",
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-400",
  },
];

const RECENT_ACTIVITIES = [
  {
    title: "University added",
    subtitle: "Islamic University of Gaza",
    time: "2h ago",
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Company added",
    subtitle: "Galaxy Software Solutions",
    time: "5h ago",
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Admin assigned",
    subtitle: "Nour Al-Banna IUG",
    time: "1d ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "University added",
    subtitle: "Al-Azhar University",
    time: "3d ago",
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Company added",
    subtitle: "Jawwal Mobile",
    time: "4d ago",
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Deactivated",
    subtitle: "Birzeit University",
    time: "1w ago",
    color: "bg-red-100 text-red-500",
  },
];

const INTERNSHIP_TAGS = [
  {
    label: "PHP",
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-400",
  },
  {
    label: "Python",
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-600",
    border: "border-fuchsia-400",
  },
  {
    label: "Backend",
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-400",
  },
  {
    label: "ML",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-400",
  },
  {
    label: "UXUI",
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-600",
    border: "border-fuchsia-400",
  },
  {
    label: "Artificial Intelligence",
    bg: "bg-orange-50",
    text: "text-orange-500",
    border: "border-orange-400",
  },
  {
    label: "LARAVEL",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-400",
  },
  {
    label: "Web Development",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-400",
  },
];

const superAdminUser = {
  name: "Deema Abd Alhady",
  role: "Super Admin",
  avatar: "", // or a URL if available
};

/* ------------------------------------------------------------------ */
/*  Small building blocks                                             */
/* ------------------------------------------------------------------ */

function DeltaBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-400 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600">
      {children}
    </span>
  );
}

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
  delta,
  subtext,
}) {
  return (
    <div className="flex-1 min-w-[220px] rounded-xl bg-white p-5 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={1.75} />
        </div>
        <DeltaBadge>{delta}</DeltaBadge>
      </div>
      <div className="mt-6">
        <span className="text-[28px] font-bold text-gray-900 leading-none">
          {value}
        </span>
        <p className="mt-1 text-[15px] text-gray-800">{label}</p>
        {subtext && <p className="mt-2 text-[11px] text-gray-400">{subtext}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Applications chart                                                */
/* ------------------------------------------------------------------ */

function ApplicationsChart() {
  return (
    <div className="flex-1 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <h3 className="text-[22px] font-bold tracking-tight text-gray-700">
          Monthly Internship Applications
        </h3>
        <div className="flex gap-2">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className={`rounded-full border px-3 py-1 text-[11px] ${opt.bg} ${opt.text} ${opt.border}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={CHART_DATA}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eef0f3"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#737686" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#737686" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #eef0f3",
                fontSize: 12,
              }}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#1677ff"
              strokeWidth={2.5}
              dot={{ r: 5, fill: "#1677ff", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recent activities                                                 */
/* ------------------------------------------------------------------ */

function RecentActivities() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <h3 className="text-[22px] font-bold text-gray-700">Recent Activities</h3>
      <ul className="mt-5 flex-1 space-y-5">
        {RECENT_ACTIVITIES.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color}`}
            >
              <User className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-gray-800">
                {item.title}
              </p>
              <p className="truncate text-[12px] text-gray-400">
                {item.subtitle}
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-gray-400">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
      <button className="mt-4 flex items-center gap-1 self-end text-[12px] font-medium text-blue-600 hover:underline">
        View All <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Most required internships                                        */
/* ------------------------------------------------------------------ */

function MostRequiredInternships() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
      <h3 className="mb-4 text-[16px] font-bold text-gray-700">
        Most Required Internships
      </h3>
      <div className="flex flex-wrap gap-2">
        {INTERNSHIP_TAGS.map((tag) => (
          <span
            key={tag.label}
            className={`rounded-full border px-3 py-1.5 text-[11px] ${tag.bg} ${tag.text} ${tag.border}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick actions                                                     */
/* ------------------------------------------------------------------ */

function QuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]">
      <h3 className="mb-4 text-[16px] font-bold text-gray-700">
        Quick Actions
      </h3>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full border border-blue-500 bg-blue-50 px-5 py-2 text-[11px] font-medium text-blue-600 hover:bg-blue-100">
          Create University
        </button>
        <button className="rounded-full border border-orange-400 bg-orange-50 px-5 py-2 text-[11px] font-medium text-orange-500 hover:bg-orange-100">
          Create Company
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Application Status Breakdown Card (Replaces Placeholder)           */
/* ------------------------------------------------------------------ */

function ApplicationStatusBreakdownCard() {
  const pieData = [
    { name: "Approved", value: 589, color: "#1677FF" },
    { name: "Pending", value: 184, color: "#FD761A" },
    { name: "Rejected", value: 42, color: "#EF4444" },
  ];

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-white/90 backdrop-blur-md p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-blue-600/5 hover-lift transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-extrabold text-gray-800 font-['Inter']">
          Application Breakdown
        </h3>
        <span className="text-[11px] font-bold text-[#1677ff] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
          Live Status
        </span>
      </div>

      <div className="my-2 h-[150px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={4}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                fontSize: 12,
                fontWeight: 700,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-around pt-3 border-t border-gray-100">
        {pieData.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold font-['Inter']">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
            <span className="text-sm font-extrabold text-gray-800 mt-0.5">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SuperAdminDashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#eef1f8] font-sans">
      <Sidebar
        navItems={NAV_ITEMS}
        footerItems={NAV_FOOTER_ITEMS}
        user={superAdminUser}
        profilePath="/profile"
      />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 animate-fade-in">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-5">
          <TopIconCluster
            chatBadge={9}
            notificationBadge={5}
            avatarUrl={superAdminUser.avatar}
            userName={superAdminUser.name}
          />
          <GreetingBanner name="Deema" />
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap">
            <StatCard {...UNIVERSITIES_CARD} />
            <StatCard {...COMPANIES_CARD} />
            <StatCard {...STUDENTS_CARD} />
            <StatCard {...INTERNSHIPS_CARD} />
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Left area: chart, bottom row */}
            <div className="flex max-w-[1180px] flex-1 flex-col gap-5">
              <div className="flex-none">
                <ApplicationsChart />
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex-1">
                  <ApplicationStatusBreakdownCard />
                </div>
                <div className="flex-1">
                  <QuickActions />
                </div>
              </div>
            </div>

            {/* Right column: total students, internships, recent activities */}
            <div className="flex w-full flex-col gap-5 lg:w-[280px]">
              <MostRequiredInternships />
              <div className="flex-1">
                <RecentActivities />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
