// src/components/pages/student/StudentDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Clock,
  Settings,
  Search,
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Timer,
  AlertCircle,
  MoreHorizontal,
  Check,
  Coffee,
  Building2,
  MessageCircle,
  Circle,
  PlayCircle,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { dashboardAPI, attendanceAPI } from "../../../services/api";

// ─── Skeleton components ──────────────────────────────────────────────
import {
  SkeletonText,
  SkeletonCard,
  SkeletonWelcomeHeader,
  SkeletonBanner,
  SkeletonStatCard,
  SkeletonCalendar,
  SkeletonChart,
  SkeletonAICard,
  SkeletonAssignments,
  SkeletonSchedule,
} from "../../common/pagesAssets/Skeleton";

// ─── Design Tokens ──────────────────────────────────────────────────
const COLORS = {
  primary: "#0475FB",
  primaryDark: "#035CC9",
  primarySoft: "#EAF3FF",
  accent: "#FFAD4E",
  accentSoft: "#FFF4E5",
  green: "#22C55E",
  greenSoft: "#EAF9EF",
  red: "#EF4444",
  redSoft: "#FEF0F0",
  purple: "#8B5CF6",
  purpleSoft: "#F2EDFF",
  text: "#172033",
  muted: "#7B8497",
  border: "#E9EDF4",
  background: "#F5F7FB",
};

// ─── Navigation ──────────────────────────────────────────────────────
const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
  {
    label: "My Internship",
    icon: GraduationCap,
    path: "/student/my-internship",
  },
  { label: "Attendance", icon: Clock, path: "/attendance" },
];
const studentFooterItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

// ─── Helpers ──────────────────────────────────────────────────────────
const getInitials = (name) => {
  if (!name) return "S";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const parseDurationToHours = (durationStr) => {
  if (!durationStr) return 0;
  const hoursMatch = durationStr.match(/(\d+)h/);
  const minsMatch = durationStr.match(/(\d+)m/);
  const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
  const mins = minsMatch ? parseFloat(minsMatch[1]) : 0;
  return hours + mins / 60;
};

// ─── Components ──────────────────────────────────────────────────────

// 1. Welcome Header
const WelcomeHeader = ({ profile }) => {
  const fullName =
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
    "Student";
  const firstName = fullName.split(" ")[0];
  let universityName = "Your University";
  if (profile?.university) {
    if (typeof profile.university === "string") {
      universityName = profile.university;
    } else if (
      typeof profile.university === "object" &&
      profile.university.name
    ) {
      universityName = profile.university.name;
    }
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7B8497]">
          Student Dashboard
        </p>
        <h1 className="text-[25px] font-extrabold tracking-[-0.6px] text-[#172033]">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1.5 text-[13px] font-medium text-[#7B8497]">
          {profile?.major || "No major"} · {universityName}
        </p>
      </div>
    </div>
  );
};

// 2. Internship Banner (with Check In button integrated)
const InternshipBanner = ({
  checkedIn,
  onCheckIn,
  profile,
  internships,
  loading,
}) => {
  const activeInternship = internships?.[0]?.internship || null;
  const major = profile?.major || "Field Training";
  let universityName = "Your University";
  if (profile?.university) {
    if (typeof profile.university === "string") {
      universityName = profile.university;
    } else if (
      typeof profile.university === "object" &&
      profile.university.name
    ) {
      universityName = profile.university.name;
    }
  }

  const internshipTitle =
    activeInternship?.opportunity?.title || `${major} Intern`;
  const companyName =
    activeInternship?.company?.name || `${universityName} Partner`;

  return (
    <div
      className="relative overflow-hidden rounded-[22px] p-5 sm:p-6"
      style={{
        background:
          "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)",
        boxShadow: "0 12px 30px rgba(4,117,251,0.18)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5" />

      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Building2 size={22} color="white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/65">
              Current Internship
            </p>
            <h2 className="mt-0.5 text-[17px] font-extrabold text-white">
              {internshipTitle}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/75">
              <span>{companyName}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Field Training</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Week 8 of 12</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
              Today
            </p>
            <p className="text-[13px] font-bold text-white">
              {checkedIn ? "Checked in" : "Not checked in"}
            </p>
          </div>
          <button
            type="button"
            onClick={onCheckIn}
            disabled={checkedIn || loading}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-default disabled:opacity-90"
            style={{ color: COLORS.primary }}
          >
            {checkedIn ? (
              <>
                <CheckCircle2 size={15} /> Checked In
              </>
            ) : (
              <>
                <Clock size={15} /> Check In
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Stat Card
const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
  iconColor,
  iconBg,
  progress,
}) => (
  <div
    className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    style={{ borderColor: COLORS.border }}
  >
    <div className="flex items-start justify-between">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={17} color={iconColor} />
      </div>
      <ArrowUpRight size={14} color="#B0B7C5" />
    </div>
    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
      {label}
    </p>
    <p className="mt-0.5 text-[19px] font-extrabold text-[#172033]">{value}</p>
    {progress !== undefined ? (
      <div className="mt-3">
        <div className="mb-1.5 flex justify-between">
          <span className="text-[9px] font-semibold text-gray-400">
            Progress
          </span>
          <span
            className="text-[9px] font-extrabold"
            style={{ color: iconColor }}
          >
            {progress}%
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, backgroundColor: iconColor }}
          />
        </div>
      </div>
    ) : (
      <p className="mt-1 text-[10px] font-medium text-gray-400">
        {description}
      </p>
    )}
  </div>
);

// 4. Legend (for calendar)
const Legend = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[9px] font-semibold text-gray-400">{label}</span>
  </div>
);

// 5. Attendance Calendar (connected to backend)
const AttendanceCalendar = ({ attendance }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const attendanceMap = useMemo(() => {
    const map = new Map();
    attendance?.forEach((a) => {
      const d = new Date(a.date);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      map.set(key, a);
    });
    return map;
  }, [attendance]);

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const key = `${year}-${month}-${i}`;
      const record = attendanceMap.get(key);
      let status = "upcoming";
      if (record) {
        if (record.status === "CHECKED_IN" || record.status === "CHECKED_OUT")
          status = "present";
        else if (record.status === "MARKED_ABSENT") status = "absent";
      }
      if (date.getDay() === 0 || date.getDay() === 6) status = "weekend";
      if (i === today.getDate()) status = "today";
      result.push({ day: i, status });
    }
    return result;
  }, [attendanceMap, year, month, today]);

  const getStatusStyle = (status, day) => {
    if (day === selectedDate)
      return { backgroundColor: COLORS.primary, color: "white" };
    if (status === "present")
      return { backgroundColor: COLORS.greenSoft, color: "#16A34A" };
    if (status === "late")
      return { backgroundColor: COLORS.accentSoft, color: "#D97706" };
    if (status === "absent")
      return { backgroundColor: COLORS.redSoft, color: COLORS.red };
    return { backgroundColor: "#F7F8FA", color: "#A8AFBC" };
  };

  const totalDays = attendance?.length || 0;
  const presentDays =
    attendance?.filter(
      (a) => a.status === "CHECKED_IN" || a.status === "CHECKED_OUT",
    ).length || 0;
  const rate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  const totalHours =
    attendance?.reduce((sum, a) => sum + parseDurationToHours(a.duration), 0) ||
    0;

  return (
    <div
      className="rounded-[20px] border bg-white p-5"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays size={17} color={COLORS.primary} />
            <h3 className="text-[14px] font-extrabold text-[#172033]">
              Attendance
            </h3>
          </div>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Track your internship attendance
          </p>
        </div>
        <button className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1.5 text-[10px] font-bold text-gray-600">
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div
            key={`${day}-${idx}`}
            className="pb-1 text-center text-[9px] font-bold text-gray-400"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: new Date(year, month, 1).getDay() }).map(
          (_, i) => (
            <div key={`empty-${i}`} />
          ),
        )}
        {days.map((item) => (
          <button
            key={item.day}
            type="button"
            onClick={() => setSelectedDate(item.day)}
            className="flex aspect-square items-center justify-center rounded-lg text-[10px] font-bold transition hover:scale-105"
            style={getStatusStyle(item.status, item.day)}
          >
            {item.day}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4">
        <Legend color={COLORS.green} label="Present" />
        <Legend color={COLORS.accent} label="Late" />
        <Legend color={COLORS.red} label="Absent" />
        <Legend color={COLORS.primary} label="Today" />
      </div>

      <div
        className="mt-4 flex items-center justify-between rounded-xl p-3"
        style={{ backgroundColor: COLORS.primarySoft }}
      >
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Attendance rate
          </p>
          <p className="mt-0.5 text-[16px] font-extrabold text-[#172033]">
            {rate}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-semibold text-gray-400">
            Hours completed
          </p>
          <p className="mt-0.5 text-[12px] font-extrabold text-[#0475FB]">
            {totalHours.toFixed(1)} / 200 hrs
          </p>
        </div>
      </div>
    </div>
  );
};

// 6. Attendance Chart (connected to backend)
const AttendanceChart = ({ attendance }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const weekAttendance = weekDays.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const dayRecords =
      attendance?.filter((a) => {
        const aDate = new Date(a.date);
        return aDate.toDateString() === date.toDateString();
      }) || [];
    const totalHours = dayRecords.reduce(
      (sum, a) => sum + parseDurationToHours(a.duration),
      0,
    );
    return { day, value: totalHours };
  });

  const max = Math.max(1, ...weekAttendance.map((d) => d.value));

  return (
    <div
      className="rounded-[20px] border bg-white p-5"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold text-[#172033]">
            Hours Activity
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Your attendance hours this week
          </p>
        </div>
        <button className="flex items-center gap-1 rounded-full border bg-white px-2.5 py-1.5 text-[9px] font-bold text-gray-500">
          This week <ChevronDown size={11} />
        </button>
      </div>
      <div className="mt-5 flex h-[150px]">
        <div className="flex w-7 flex-col justify-between pb-6 pt-1">
          {[8, 6, 4, 2, 0].map((n) => (
            <span key={n} className="text-[8px] font-semibold text-gray-300">
              {n}h
            </span>
          ))}
        </div>
        <div className="relative flex flex-1 items-end justify-between gap-2 border-b border-gray-100">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6">
            {[0, 1, 2, 3, 4].map((n) => (
              <div key={n} className="border-t border-dashed border-gray-100" />
            ))}
          </div>
          {weekAttendance.map((item) => {
            const height = `${(item.value / max) * 100}%`;
            return (
              <div
                key={item.day}
                className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
              >
                {item.value > 0 && (
                  <div
                    className="group relative w-4 rounded-t-full transition-all duration-500 hover:w-5"
                    style={{
                      height,
                      backgroundColor:
                        item.day === "Mon"
                          ? COLORS.primary
                          : "rgba(4,117,251,0.22)",
                    }}
                  >
                    <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] font-bold text-white group-hover:block">
                      {item.value.toFixed(1)}h
                    </div>
                  </div>
                )}
                <span className="absolute -bottom-5 text-[8px] font-bold text-gray-400">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 7. AI Performance Card (connected to backend)
const AIPerformanceCard = ({ evaluations }) => {
  const totalEvaluations = evaluations?.length || 0;
  const avgScore =
    totalEvaluations > 0
      ? Math.round(
          evaluations.reduce((sum, e) => sum + (e.score || 0), 0) /
            totalEvaluations,
        )
      : 0;
  const hasEvaluations = totalEvaluations > 0;

  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-5"
      style={{
        background:
          "linear-gradient(145deg, #102B4F 0%, #123E70 60%, #0475FB 140%)",
        boxShadow: "0 10px 28px rgba(15,45,80,0.16)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0475FB]/25 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Brain size={17} color="white" />
            </div>
            <div>
              <p className="text-[13px] font-extrabold text-white">
                AI Performance
              </p>
              <p className="text-[9px] font-medium text-white/50">
                Based on your internship activity
              </p>
            </div>
          </div>
          <Sparkles size={17} color={COLORS.accent} />
        </div>
        <div className="mt-6 flex items-center gap-5">
          <div className="relative h-[92px] w-[92px] shrink-0">
            <svg
              width="92"
              height="92"
              viewBox="0 0 92 92"
              className="-rotate-90"
            >
              <circle
                cx="46"
                cy="46"
                r="39"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="7"
              />
              <circle
                cx="46"
                cy="46"
                r="39"
                fill="none"
                stroke="#FFAD4E"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(avgScore / 100) * 245} 245`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[23px] font-extrabold text-white">
                {avgScore}
              </span>
              <span className="text-[8px] font-bold text-white/45">/ 100</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={13} color="#4ADE80" />
              <span className="text-[11px] font-bold text-green-300">
                +{hasEvaluations ? avgScore - 10 : 0}%
              </span>
              <span className="text-[9px] font-medium text-white/40">
                this week
              </span>
            </div>
            <p className="mt-2 text-[11px] font-medium leading-5 text-white/65">
              {hasEvaluations
                ? "Your performance is progressing well. Keep up the good work!"
                : "Start completing tasks and attendance to receive performance insights."}
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <AIMiniStat
            label="Tasks"
            value={hasEvaluations ? `${Math.min(avgScore + 5, 100)}%` : "0%"}
          />
          <AIMiniStat
            label="Skills"
            value={hasEvaluations ? `${Math.min(avgScore, 100)}%` : "0%"}
          />
          <AIMiniStat
            label="Growth"
            value={hasEvaluations ? `${Math.min(avgScore - 3, 100)}%` : "0%"}
          />
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-[10px] font-bold text-white transition hover:bg-white/15">
          <Sparkles size={12} color={COLORS.accent} /> View AI Insights{" "}
          <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
};
const AIMiniStat = ({ label, value }) => (
  <div className="rounded-xl bg-white/[0.07] p-2.5">
    <p className="text-[8px] font-medium text-white/40">{label}</p>
    <p className="mt-0.5 text-[12px] font-extrabold text-white">{value}</p>
  </div>
);

// 8. Assignments Card (connected to backend)
const AssignmentsCard = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div
        className="rounded-[20px] border bg-white p-5"
        style={{ borderColor: COLORS.border }}
      >
        <h3 className="text-[14px] font-extrabold text-[#172033]">
          Assignments
        </h3>
        <p className="mt-1 text-[10px] font-medium text-gray-400">
          No tasks assigned yet
        </p>
      </div>
    );
  }

  const displayTasks = tasks.slice(0, 3).map((task) => {
    const status =
      task.status === "DONE"
        ? "Completed"
        : task.status === "IN_PROGRESS"
          ? "In Progress"
          : "Pending";
    const config = {
      Completed: {
        icon: CheckCircle2,
        iconColor: COLORS.green,
        iconBg: COLORS.greenSoft,
      },
      "In Progress": {
        icon: PlayCircle,
        iconColor: COLORS.primary,
        iconBg: COLORS.primarySoft,
      },
      Pending: { icon: Circle, iconColor: COLORS.muted, iconBg: "#F2F4F7" },
    };
    const { icon, iconColor, iconBg } = config[status] || config.Pending;
    return {
      title: task.title,
      type: task.category || "Task",
      due: task.deadline
        ? new Date(task.deadline).toLocaleDateString()
        : "No deadline",
      status,
      icon,
      iconColor,
      iconBg,
    };
  });

  return (
    <div
      className="rounded-[20px] border bg-white p-5"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold text-[#172033]">
            Assignments
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Tasks from your internship
          </p>
        </div>
        <button className="text-[10px] font-extrabold text-[#0475FB] hover:underline">
          View all
        </button>
      </div>
      <div className="mt-4 space-y-2.5">
        {displayTasks.map((assignment) => {
          const Icon = assignment.icon;
          return (
            <div
              key={assignment.title}
              className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition hover:border-gray-100 hover:bg-gray-50"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: assignment.iconBg }}
              >
                <Icon size={15} color={assignment.iconColor} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-extrabold text-[#172033]">
                  {assignment.title}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[8px] font-medium text-gray-400">
                    {assignment.type}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="text-[8px] font-medium text-gray-400">
                    {assignment.due}
                  </span>
                </div>
              </div>
              <span
                className="hidden rounded-full px-2 py-1 text-[8px] font-bold sm:block"
                style={{
                  backgroundColor:
                    assignment.status === "Completed"
                      ? COLORS.greenSoft
                      : assignment.status === "In Progress"
                        ? COLORS.primarySoft
                        : "#F2F4F7",
                  color:
                    assignment.status === "Completed"
                      ? COLORS.green
                      : assignment.status === "In Progress"
                        ? COLORS.primary
                        : COLORS.muted,
                }}
              >
                {assignment.status}
              </span>
              <ArrowUpRight
                size={13}
                color="#B8BFCA"
                className="opacity-0 transition group-hover:opacity-100"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 9. Internship Progress (connected to backend)
const InternshipProgress = ({ internships }) => {
  const activeInternship = internships?.[0]?.internship;
  if (!activeInternship) {
    return (
      <div
        className="rounded-[20px] border bg-white p-5"
        style={{ borderColor: COLORS.border }}
      >
        <p className="text-[11px] text-[#7B8497]">No active internship</p>
      </div>
    );
  }

  const tasks = activeInternship.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const milestones = [
    {
      title: "Training Started",
      date: activeInternship.createdAt
        ? new Date(activeInternship.createdAt).toLocaleDateString()
        : "Start",
      completed: true,
    },
    { title: "First Evaluation", date: "Pending", completed: false },
    {
      title: "Practical Training",
      status: "current",
      date: "Current",
      completed: false,
    },
    { title: "Final Evaluation", date: "Coming soon", completed: false },
  ];

  return (
    <div
      className="rounded-[20px] border bg-white p-5"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold text-[#172033]">
            Current Internship
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            {activeInternship.company?.name || "Your journey"}
          </p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[9px] font-extrabold"
          style={{ backgroundColor: COLORS.greenSoft, color: "#16A34A" }}
        >
          On Track
        </span>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Overall progress
          </p>
          <p className="mt-0.5 text-[26px] font-extrabold tracking-tight text-[#172033]">
            {progress}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-medium text-gray-400">
            Internship duration
          </p>
          <p className="mt-0.5 text-[11px] font-extrabold text-gray-700">
            8 / 12 weeks
          </p>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, #38A0FF)`,
          }}
        />
      </div>
      <div className="mt-6">
        {milestones.map((milestone, idx) => {
          const completed = milestone.completed;
          const current = milestone.status === "current";
          return (
            <div
              key={milestone.title}
              className="relative flex items-start gap-3 pb-4 last:pb-0"
            >
              {idx !== milestones.length - 1 && (
                <div
                  className="absolute left-[9px] top-5 h-[calc(100%-8px)] w-px"
                  style={{
                    backgroundColor: completed ? "#A8D9B8" : COLORS.border,
                  }}
                />
              )}
              <div
                className="relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: completed
                    ? COLORS.green
                    : current
                      ? COLORS.primary
                      : "#F1F3F6",
                  border: current ? "3px solid #DCEBFF" : "none",
                }}
              >
                {completed ? (
                  <Check size={10} color="white" strokeWidth={3} />
                ) : current ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                ) : null}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p
                    className="text-[10px] font-extrabold"
                    style={{
                      color: completed || current ? COLORS.text : "#A3AAB7",
                    }}
                  >
                    {milestone.title}
                  </p>
                  {current && (
                    <p className="mt-0.5 text-[8px] font-semibold text-[#0475FB]">
                      You are here
                    </p>
                  )}
                </div>
                <span className="text-[8px] font-semibold text-gray-400">
                  {milestone.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 10. Today's Schedule (mock)
const TodaySchedule = () => {
  const schedule = [
    {
      time: "09:00",
      title: "Check In",
      subtitle: "TechCorp Office",
      icon: Clock,
      color: COLORS.primary,
      bg: COLORS.primarySoft,
    },
    {
      time: "10:00",
      title: "Daily Standup",
      subtitle: "Team Meeting",
      icon: MessageCircle,
      color: COLORS.purple,
      bg: COLORS.purpleSoft,
    },
    {
      time: "12:30",
      title: "Lunch Break",
      subtitle: "01:00 PM",
      icon: Coffee,
      color: COLORS.accent,
      bg: COLORS.accentSoft,
    },
    {
      time: "02:00",
      title: "Practical Training",
      subtitle: "Backend Development",
      icon: GraduationCap,
      color: COLORS.green,
      bg: COLORS.greenSoft,
    },
  ];
  return (
    <div
      className="rounded-[20px] border bg-white p-5"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold text-[#172033]">
            Today's Schedule
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Sunday, August 23
          </p>
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50">
          <MoreHorizontal size={15} color={COLORS.muted} />
        </button>
      </div>
      <div className="mt-5 space-y-1">
        {schedule.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="relative flex gap-3 py-2">
              <div className="w-9 shrink-0 pt-1">
                <p className="text-[8px] font-bold text-gray-400">
                  {item.time}
                </p>
              </div>
              <div
                className="absolute left-[45px] top-0 h-full w-px"
                style={{
                  backgroundColor:
                    idx === schedule.length - 1 ? "transparent" : "#EEF1F5",
                }}
              />
              <div
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.bg }}
              >
                <Icon size={14} color={item.color} />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[10px] font-extrabold text-[#172033]">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-[8px] font-medium text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD COMPONENT ────────────────────────────────────────

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkInLoading, setCheckInLoading] = useState(false);

  // ── Fetch dashboard data ──
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await dashboardAPI.getDashboard();
      const data = response || {};
      setDashboardData(data);

      // Check if checked in today
      const today = new Date().toDateString();
      const hasCheckedIn = data.attendance?.some(
        (a) =>
          new Date(a.date).toDateString() === today &&
          a.status === "CHECKED_IN",
      );
      setCheckedIn(!!hasCheckedIn);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setDashboardData({
        profile: {},
        internships: [],
        tasks: [],
        attendance: [],
        evaluations: [],
        stats: {},
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // ── Check In handler ──
  const handleCheckIn = async () => {
    const internships = dashboardData?.internships || [];
    const activeInternship = internships.find(
      (i) => i.internship?.status === "ACTIVE",
    );
    if (!activeInternship) {
      alert("You don't have an active internship. Please enroll first.");
      return;
    }

    setCheckInLoading(true);
    try {
      const internshipId = activeInternship.internship.id;
      await attendanceAPI.checkIn(internshipId);
      setCheckedIn(true);
      await fetchDashboard();
    } catch (error) {
      console.error("Check-in failed:", error);
      alert(error?.message || "Check-in failed. Please try again.");
    } finally {
      setCheckInLoading(false);
    }
  };

  // ── User data ──
  const fullName = useMemo(() => {
    if (!user) return "Student";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Student";
  }, [user]);

  const studentUser = useMemo(
    () => ({
      name: fullName,
      role: "Student",
      avatar: user?.profileImage || "",
    }),
    [fullName, user],
  );

  // ── Merge profile ──
  const profile = useMemo(() => {
    if (!dashboardData?.profile) {
      return {
        firstName: user?.firstName,
        lastName: user?.lastName,
        major: user?.studentProfile?.major,
        university: user?.studentProfile?.university,
        avatar: user?.profileImage,
      };
    }
    return {
      ...dashboardData.profile,
      firstName: dashboardData.profile.firstName || user?.firstName,
      lastName: dashboardData.profile.lastName || user?.lastName,
      avatar: dashboardData.profile.avatar || user?.profileImage,
    };
  }, [dashboardData, user]);

  // ── Compute stats from data ──
  const stats = useMemo(() => {
    const s = dashboardData?.stats || {};
    const tasks = dashboardData?.tasks || [];
    const attendance = dashboardData?.attendance || [];
    const evaluations = dashboardData?.evaluations || [];

    // Compute attendance rate
    const presentCount = attendance.filter(
      (a) => a.status === "CHECKED_IN" || a.status === "CHECKED_OUT",
    ).length;
    const totalAttendance = attendance.length;
    const attendanceRate =
      totalAttendance > 0
        ? Math.round((presentCount / totalAttendance) * 100)
        : 0;

    // Compute training hours from attendance
    const totalHours = attendance.reduce(
      (sum, a) => sum + parseDurationToHours(a.duration),
      0,
    );
    const requiredHours = 200;
    const hoursRemaining = Math.max(0, requiredHours - totalHours);

    // Tasks stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "DONE").length;
    const pendingTasks = tasks.filter((t) => t.status === "TODO").length;

    // Performance
    const avgScore =
      evaluations.length > 0
        ? Math.round(
            evaluations.reduce((sum, e) => sum + (e.score || 0), 0) /
              evaluations.length,
          )
        : 0;

    return [
      {
        icon: Clock,
        label: "Attendance",
        value: `${attendanceRate}%`,
        description: `${s.todayAttendance || 0} today`,
        iconColor: COLORS.primary,
        iconBg: COLORS.primarySoft,
      },
      {
        icon: Timer,
        label: "Training Hours",
        value: `${totalHours.toFixed(1)}h`,
        description: `${hoursRemaining.toFixed(1)}h remaining`,
        iconColor: COLORS.accent,
        iconBg: COLORS.accentSoft,
      },
      {
        icon: ClipboardList,
        label: "Tasks",
        value: `${completedTasks} / ${totalTasks}`,
        description: `${pendingTasks} pending`,
        iconColor: COLORS.purple,
        iconBg: COLORS.purpleSoft,
        progress:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
      {
        icon: TrendingUp,
        label: "Performance",
        value: `${avgScore}/100`,
        description: avgScore > 0 ? "Good" : "No evaluations yet",
        iconColor: COLORS.green,
        iconBg: COLORS.greenSoft,
      },
    ];
  }, [dashboardData]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

      <Sidebar
        navItems={studentNavItems}
        footerItems={studentFooterItems}
        user={studentUser}
        profilePath="/student/profile"
        onSignOut={handleSignOut}
        chatPath="/student/chats"
        brandPath="/student/dashboard"
        storageKey="sidebar-student"
      />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
          <PageHeader
            loading={loading}
            profile={profile}
            fullName={fullName}
            studentUser={studentUser}
            searchValue={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            chatBadge={3}
            notificationBadge={4}
          />

          {/* Welcome Header */}
          {loading ? (
            <SkeletonWelcomeHeader />
          ) : (
            <WelcomeHeader profile={profile} />
          )}

          {/* Internship Banner */}
          <div className="mt-6">
            {loading ? (
              <SkeletonBanner />
            ) : (
              <InternshipBanner
                checkedIn={checkedIn}
                onCheckIn={handleCheckIn}
                profile={profile}
                internships={dashboardData?.internships || []}
                loading={checkInLoading}
              />
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              <>
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
              </>
            ) : (
              stats.map((stat) => <StatCard key={stat.label} {...stat} />)
            )}
          </div>

          {/* Main Grid */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="min-w-0 space-y-5">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                {loading ? (
                  <>
                    <SkeletonCalendar />
                    <SkeletonChart />
                  </>
                ) : (
                  <>
                    <AttendanceCalendar
                      attendance={dashboardData?.attendance || []}
                    />
                    <AttendanceChart
                      attendance={dashboardData?.attendance || []}
                    />
                  </>
                )}
              </div>
              {loading ? (
                <SkeletonCard className="p-5">
                  <SkeletonText className="h-6 w-48" />
                  <SkeletonText className="mt-2 h-3 w-full" />
                  <div className="mt-4 flex items-end justify-between">
                    <SkeletonText className="h-8 w-20" />
                    <SkeletonText className="h-4 w-24" />
                  </div>
                  <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-gray-200" />
                </SkeletonCard>
              ) : (
                <InternshipProgress
                  internships={dashboardData?.internships || []}
                />
              )}
            </div>

            <div className="space-y-5">
              {loading ? (
                <>
                  <SkeletonAICard />
                  <SkeletonAssignments />
                  <SkeletonSchedule />
                </>
              ) : (
                <>
                  <AIPerformanceCard
                    evaluations={dashboardData?.evaluations || []}
                  />
                  <AssignmentsCard tasks={dashboardData?.tasks || []} />
                  <TodaySchedule />
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col items-center justify-between gap-2 pb-5 text-center sm:flex-row sm:text-left">
            <p className="text-[9px] font-medium text-gray-400">
              Tadreeby helps you stay on track throughout your field training.
            </p>
            <button
              type="button"
              onClick={() => navigate("/attendance")}
              className="flex items-center gap-1 text-[9px] font-extrabold transition hover:underline"
              style={{ color: COLORS.primary }}
            >
              View full attendance <ArrowUpRight size={11} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
