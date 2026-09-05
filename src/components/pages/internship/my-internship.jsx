// src/components/pages/student/MyInternship.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  GraduationCap,
  Clock,
  Settings,
  CalendarDays,
  CheckCircle2,
  CircleCheck,
  Clock3,
  Timer,
  Target,
  Award,
  UserRound,
  MessageCircle,
  MapPin,
  Building2,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
  AlertCircle,
  FileText,
  Search,
  PlayCircle,
  Check,
  Info,
  ListTodo,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { internshipAPI, opportunitiesAPI } from "../../../services/api";
import { Button } from "../../common/Button";

// ─── Skeleton components ──────────────────────────────────────────────
import {
  SkeletonText,
  SkeletonCard,
  SkeletonCircle,
  SkeletonRect,
  SkeletonButton,
  SkeletonBadge,
} from "../../common/pagesAssets/Skeleton";

// ─── Design Tokens ─────────────────────────────────────────────────────
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
const studentNavGroups = [
  {
    label: "Discovery",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
      { label: "Opportunities", icon: Search, path: "/student/opportunities" },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "My Internship", icon: BriefcaseBusiness, path: "/student/my-internship" },
      { label: "Attendance", icon: Clock, path: "/attendance" },
      { label: "Tasks", icon: ListTodo, path: "/student/tasks" },
    ],
  },
];
const studentFooterItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

// ─── Helpers ──────────────────────────────────────────────────────────
const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
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

// ─── Mapping function ────────────────────────────────────────────────
const mapBackendToUI = (data, user) => {
    const {
        opportunity,
        company,
        trainer,
        supervisor,
        status,
        tasks = [],
        attendance = [],
        evaluations = [],
        stats = {},
        createdAt,
    } = data;

    const present = attendance.filter((a) => a.status === "CHECKED_OUT" || a.status === "MARKED_PRESENT").length;
    const absent = attendance.filter((a) => a.status === "MARKED_ABSENT").length;
    const late = attendance.filter((a) => a.status === "CHECKED_IN").length;
    const attendancePercentage =
        stats.attendanceRate || (attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0);

    const totalHours = stats.totalHours || 200;
    const completedHours =
        stats.completedHours || attendance.reduce((sum, a) => sum + parseDurationToHours(a.duration || "0h 0m"), 0);
    const progress = stats.progress || (totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0);

    // Next task
    const upcomingTasks = tasks
        .filter((t) => t.status !== "DONE")
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    // const nextTask = upcomingTasks[0]
    //     ? {
    //         title: nextTask.title,
    //         due: nextTask.deadline ? new Date(nextTask.deadline).toLocaleDateString() : "No deadline",
    //         progress: nextTask.status === "IN_PROGRESS" ? 70 : 0,
    //         status: nextTask.status === "IN_PROGRESS" ? "In Progress" : "Not Started",
    //     }
    //     : null;

    const nextTask = upcomingTasks[0]
        ? {
            title: upcomingTasks[0].title,
            due: upcomingTasks[0].deadline ? new Date(upcomingTasks[0].deadline).toLocaleDateString() : "No deadline",
            progress: upcomingTasks[0].status === "IN_PROGRESS" ? 70 : 0,
            status: upcomingTasks[0].status === "IN_PROGRESS" ? "In Progress" : "Not Started",
        }
        : null;

    const taskList = tasks.map((t) => ({
        title: t.title,
        category: t.description ? t.description.substring(0, 30) : "Task",
        due: t.deadline ? new Date(t.deadline).toLocaleDateString() : "No deadline",
        status: t.status === "DONE" ? "Completed" : t.status === "IN_PROGRESS" ? "In Progress" : "Not Started",
        progress: t.status === "DONE" ? 100 : t.status === "IN_PROGRESS" ? 70 : 0,
    }));

    const completedTasks = taskList.filter((t) => t.status === "Completed").length;
    const inProgressTasks = taskList.filter((t) => t.status === "In Progress").length;

    // Milestones
    const milestones = [
        { title: "Training Started", date: createdAt ? new Date(createdAt).toLocaleDateString() : "Start", completed: true },
        {
            title: "First Evaluation",
            date: evaluations.length > 0 ? new Date(evaluations[0].createdAt).toLocaleDateString() : "Pending",
            completed: evaluations.length > 0,
        },
        { title: "Mid Training Review", date: "Coming soon", completed: false },
        { title: "Final Evaluation", date: "Coming soon", completed: false },
        { title: "Training Completed", date: "Coming soon", completed: false },
    ];

    // Activities
    const activities = [
        ...tasks.slice(0, 2).map((t) => ({
            icon: t.status === "DONE" ? CheckCircle2 : FileText,
            title: t.status === "DONE" ? "You completed" : "You worked on",
            description: t.title,
            time: t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "Recently",
        })),
        ...evaluations.slice(0, 1).map((e) => ({
            icon: Award,
            title: "New evaluation",
            description: `Score: ${e.score || "N/A"} - ${e.feedback || "No feedback"}`,
            time: new Date(e.createdAt).toLocaleString(),
        })),
    ];

    // Performance – default to 0 if no evaluations
    const hasEvaluations = evaluations && evaluations.length > 0;
    const avgScore = hasEvaluations
        ? Math.round(evaluations.reduce((sum, e) => sum + (e.score || 0), 0) / evaluations.length)
        : 0;
    const performanceLabel =
        avgScore >= 85 ? "Very Good"
            : avgScore >= 70 ? "Good"
                : avgScore >= 50 ? "Average"
                    : "Needs Improvement";

    const skills = {
        technical: hasEvaluations ? 89 : 0,
        communication: hasEvaluations ? 84 : 0,
        teamwork: hasEvaluations ? 86 : 0,
    };

    return {
        title: opportunity?.title || "Training Internship",
        company: company?.name || "Company",
        field: opportunity?.title || "Field Training",
        status: status === "ACTIVE" ? "Active" : status || "In Progress",
        startDate: createdAt
            ? new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
            : "Started",
        endDate: opportunity?.duration
            ? new Date(new Date(createdAt).setDate(new Date(createdAt).getDate() + 90)).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })
            : "Ongoing",
        location: opportunity?.location || "Remote",
        mode: opportunity?.type === "REMOTE" ? "Remote" : opportunity?.type === "HYBRID" ? "Hybrid" : "On-site",
        totalHours,
        completedHours,
        progress,
        trainer: trainer
            ? {
                name: `${trainer.firstName} ${trainer.lastName}`,
                role: "Company Trainer",
                initials: getInitials(`${trainer.firstName} ${trainer.lastName}`),
            }
            : { name: "Not Assigned", role: "Trainer", initials: "NA" },
        universitySupervisor: supervisor
            ? {
                name: `${supervisor.firstName} ${supervisor.lastName}`,
                role: "University Supervisor",
                initials: getInitials(`${supervisor.firstName} ${supervisor.lastName}`),
            }
            : { name: "Not Assigned", role: "Supervisor", initials: "NA" },
        nextTask: nextTask || { title: "No upcoming tasks", due: "—", progress: 0, status: "None" },
        attendance: {
            present,
            absent,
            late,
            percentage: attendancePercentage,
        },
        performance: {
            score: avgScore,
            label: performanceLabel,
            hasEvaluations,
        },
        skills,
        tasks: taskList,
        activities: activities.slice(0, 3),
        milestones,
        totalTasks: tasks.length,
        completedTasks,
        inProgressTasks,
    };
};

// ─── Skeleton Components ──────────────────────────────────────────────

const SkeletonHero = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
    <div className="relative h-[205px] overflow-hidden bg-gray-200 animate-pulse" />
    <div className="p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="flex-1">
          <SkeletonText className="h-7 w-3/4" />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SkeletonText className="h-4 w-32" />
            <SkeletonText className="h-4 w-28" />
            <SkeletonText className="h-4 w-20" />
          </div>
        </div>
        <SkeletonButton className="h-10 w-40 rounded-xl" />
      </div>
    </div>
  </div>
);

const SkeletonProgressCard = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-40" />
        <SkeletonText className="mt-1 h-3 w-48" />
      </div>
    </div>
    <div className="mt-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <SkeletonText className="h-8 w-16" />
          <SkeletonText className="mt-1 h-3 w-32" />
        </div>
        <div className="text-right">
          <SkeletonText className="h-4 w-24" />
          <SkeletonText className="mt-1 h-3 w-20" />
        </div>
      </div>
      <SkeletonRect className="h-3 rounded-full" />
      <div className="mt-3 flex justify-between">
        <SkeletonText className="h-3 w-32" />
        <SkeletonText className="h-3 w-32" />
      </div>
    </div>
  </div>
);

const SkeletonNextTaskCard = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-32" />
        <SkeletonText className="mt-1 h-3 w-40" />
      </div>
      <SkeletonText className="h-4 w-20" />
    </div>
    <div
      className="mt-5 rounded-xl border border-blue-100 p-4"
      style={{ backgroundColor: COLORS.primarySoft }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <SkeletonCircle className="h-10 w-10 rounded-xl" />
          <div>
            <SkeletonText className="h-4 w-40" />
            <SkeletonText className="mt-1 h-3 w-24" />
          </div>
        </div>
        <SkeletonBadge className="h-6 w-20" />
      </div>
      <div className="mt-4">
        <div className="mb-2 flex justify-between">
          <SkeletonText className="h-3 w-16" />
          <SkeletonText className="h-3 w-12" />
        </div>
        <SkeletonRect className="h-1.5 rounded-full" />
      </div>
      <SkeletonText className="mt-4 h-3 w-24" />
    </div>
  </div>
);

const SkeletonTasksList = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-32" />
        <SkeletonText className="mt-1 h-3 w-40" />
      </div>
      <SkeletonText className="h-4 w-20" />
    </div>
    <div className="mt-4 divide-y divide-gray-100">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1"
        >
          <div className="flex min-w-0 items-center gap-3">
            <SkeletonCircle className="h-9 w-9 rounded-lg" />
            <div>
              <SkeletonText className="h-4 w-32" />
              <SkeletonText className="mt-1 h-3 w-24" />
            </div>
          </div>
          <SkeletonBadge className="h-6 w-16" />
        </div>
      ))}
    </div>
  </div>
);

const SkeletonAttendanceCard = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-32" />
        <SkeletonText className="mt-1 h-3 w-40" />
      </div>
      <SkeletonText className="h-4 w-20" />
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-4"
          style={{
            backgroundColor:
              i === 0
                ? "#F4F8FF"
                : i === 1
                  ? "#EAF9EF"
                  : i === 2
                    ? "#FEF0F0"
                    : "#FFF4E6",
          }}
        >
          <SkeletonText className="h-7 w-12" />
          <SkeletonText className="mt-1 h-3 w-16" />
        </div>
      ))}
    </div>
    <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-100 p-4">
      <div className="flex items-center gap-3">
        <SkeletonCircle className="h-9 w-9 rounded-lg" />
        <div>
          <SkeletonText className="h-4 w-40" />
          <SkeletonText className="mt-1 h-3 w-32" />
        </div>
      </div>
      <SkeletonText className="h-4 w-16" />
    </div>
  </div>
);

const SkeletonPerformanceCard = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-32" />
        <SkeletonText className="mt-1 h-3 w-40" />
      </div>
      <SkeletonText className="h-4 w-20" />
    </div>
    <div className="mt-5 grid gap-5 sm:grid-cols-[170px_1fr]">
      <div
        className="flex flex-col items-center justify-center rounded-xl p-5"
        style={{ backgroundColor: "#F4F8FF" }}
      >
        <SkeletonCircle className="h-28 w-28" />
        <SkeletonText className="mt-3 h-4 w-20" />
      </div>
      <div className="flex flex-col justify-center gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="mb-2 flex justify-between">
              <SkeletonText className="h-3 w-24" />
              <SkeletonText className="h-3 w-12" />
            </div>
            <SkeletonRect className="h-2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
    <div
      className="mt-5 rounded-xl border border-[#FFE7C8] p-4"
      style={{ backgroundColor: "#FFF9F1" }}
    >
      <div className="flex gap-3">
        <SkeletonCircle className="h-9 w-9 rounded-lg" />
        <div className="flex-1">
          <SkeletonText className="h-3 w-32" />
          <SkeletonText className="mt-1 h-3 w-full" />
        </div>
      </div>
    </div>
  </div>
);

const SkeletonMilestonesCard = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-40" />
        <SkeletonText className="mt-1 h-3 w-48" />
      </div>
    </div>
    <div className="mt-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
          <SkeletonCircle className="h-8 w-8" />
          <div className="pt-0.5 flex-1">
            <SkeletonText className="h-4 w-32" />
            <SkeletonText className="mt-1 h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkeletonActivityCard = () => (
  <div
    className="rounded-[18px] border bg-white p-5 shadow-sm"
    style={{ borderColor: COLORS.border }}
  >
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <SkeletonText className="h-5 w-32" />
        <SkeletonText className="mt-1 h-3 w-40" />
      </div>
      <SkeletonText className="h-4 w-20" />
    </div>
    <div className="mt-4 divide-y divide-gray-100">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-3 py-4 first:pt-1 last:pb-1">
          <SkeletonCircle className="h-9 w-9 rounded-lg" />
          <div className="flex-1">
            <SkeletonText className="h-3 w-3/4" />
            <SkeletonText className="mt-1 h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkeletonSidebarCards = () => (
  <aside className="space-y-5 lg:sticky lg:top-[88px] lg:self-start">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="rounded-[18px] border bg-white p-5 shadow-sm"
        style={{ borderColor: COLORS.border }}
      >
        <SkeletonText className="h-3 w-32" />
        <div className="mt-4 space-y-3">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="flex items-start gap-3">
              <SkeletonCircle className="h-9 w-9 rounded-lg" />
              <div className="flex-1">
                <SkeletonText className="h-3 w-24" />
                <SkeletonText className="mt-1 h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
        <SkeletonButton className="mt-4 h-9 w-full rounded-lg" />
      </div>
    ))}
  </aside>
);

// ─── Main Component ──────────────────────────────────────────────────

export default function MyInternship() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState(null);
  const [error, setError] = useState(null);

  // ── Fetch data ──
  useEffect(() => {
    const fetchInternship = async () => {
      setLoading(true);
      setError(null);
      try {
        const internshipsResponse = await internshipAPI.getMyInternships();
        const internships = internshipsResponse?.data ?? internshipsResponse;
        const list = Array.isArray(internships) ? internships : [];

        if (list.length === 0) {
          setError("NO_INTERNSHIP");
          setLoading(false);
          return;
        }

        const active =
          list.find((i) => i.internship?.status === "ACTIVE") || list[0];
        const internshipId = active?.internship?.id || active?.id;

        if (!internshipId) {
          setError("NO_INTERNSHIP");
          setLoading(false);
          return;
        }

        const detailsResponse =
          await opportunitiesAPI.getInternshipDetails(internshipId);
        const details = detailsResponse?.data ?? detailsResponse;
        const mapped = mapBackendToUI(details, user);
        setInternship(mapped);
      } catch (err) {
        console.error("Failed to fetch internship:", err);
        setError("FETCH_ERROR");
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [user]);

  // ── User for sidebar ──
  const fullName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student";
  const studentUser = {
    name: fullName,
    role: "Student",
    avatar: user?.profileImage || "",
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
        <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
        <Sidebar
          navGroups={studentNavGroups}
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
            <PageHeader loading={true} />
            <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <SkeletonText className="h-7 w-48" />
                <SkeletonText className="mt-1 h-4 w-64" />
              </div>
              <SkeletonBadge className="h-6 w-24" />
            </div>
            <div className="mt-4">
              <SkeletonHero />
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <SkeletonText className="h-3 w-16" />
                      <SkeletonText className="mt-1 h-6 w-12" />
                    </div>
                    <SkeletonCircle className="h-9 w-9 rounded-full" />
                  </div>
                  <SkeletonText className="mt-2 h-3 w-24" />
                </SkeletonCard>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
              <div className="space-y-5">
                <SkeletonProgressCard />
                <SkeletonNextTaskCard />
                <SkeletonTasksList />
                <SkeletonAttendanceCard />
                <SkeletonPerformanceCard />
                <SkeletonMilestonesCard />
                <SkeletonActivityCard />
              </div>
              <SkeletonSidebarCards />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Error: No Internship ──
  if (error === "NO_INTERNSHIP") {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
        <Sidebar
          navItems={studentNavItems}
          footerItems={studentFooterItems}
          user={studentUser}
          profilePath="/student/profile"
          onSignOut={handleSignOut}
        />
        <main className="flex-1 overflow-y-auto relative z-10">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
            <PageHeader
              loading={false}
              profile={user}
              fullName={fullName}
              studentUser={studentUser}
              searchValue=""
              onSearchChange={() => {}}
              chatBadge={3}
              notificationBadge={4}
            />

            {/* Title & Subtitle */}
            <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033]">
                  My Internship
                </h1>
                <p className="text-[11px] text-[#7B8497]">
                  Track your internship attendance
                </p>
              </div>
            </div>

            {/* Empty State Card */}
            <div className="mt-6 flex flex-col items-center justify-center px-6 py-14 text-center rounded-2xl border border-dashed border-[#E9EDF4] bg-white/60">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0475FB]">
                <Info size={32} />
              </div>
              <h3 className="mt-4 text-[16px] font-extrabold text-[#172033]">
                No Internship Found
              </h3>
              <p className="mt-1 max-w-sm text-[13px] text-[#7B8497]">
                You must enroll in an internship first to track attendance.
              </p>
              <Button
                variant="blue"
                onClick={() => navigate("/student/opportunities")}
                className="mt-4 px-6 py-2.5 text-[13px]"
              >
                <Search size={16} />
                Browse Opportunities
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-[#E9EDF4] pt-4 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-4 text-[10px] font-medium text-[#7B8497]">
                <span>Help center</span>
                <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="hover:text-[#172033]"
                >
                  Settings
                </button>
              </div>
              <p className="text-[9px] font-medium text-gray-400">
                Tadreeby helps you stay on track throughout your field training.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Error: Fetch failed ──
  if (error === "FETCH_ERROR") {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
        <Sidebar
          navItems={studentNavItems}
          footerItems={studentFooterItems}
          user={studentUser}
          profilePath="/student/profile"
          onSignOut={handleSignOut}
        />
        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF0F0] text-[#EF4444]">
                <AlertCircle size={32} />
              </div>
            </div>
            <h2 className="text-[22px] font-extrabold text-[#172033]">
              Failed to load internship
            </h2>
            <p className="mt-2 text-[13px] text-[#7B8497]">
              There was an error fetching your internship details. Please try
              again later.
            </p>
            <Button
              variant="blue"
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2.5 text-[13px]"
            >
              Retry
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ── Fallback if no internship data ──
  if (!internship) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
        <Sidebar
          navItems={studentNavItems}
          footerItems={studentFooterItems}
          user={studentUser}
          profilePath="/student/profile"
          onSignOut={handleSignOut}
        />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#7B8497]">No internship data available.</p>
        </main>
      </div>
    );
  }

  // ─── Render with real data ──────────────────────────────────────────

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

      <Sidebar
        navGroups={studentNavGroups}
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
          {/* Page Header */}
          <PageHeader
            loading={false}
            profile={user}
            fullName={fullName}
            studentUser={studentUser}
            searchValue=""
            onSearchChange={() => {}}
            chatBadge={3}
            notificationBadge={4}
          />

          {/* Title & Status */}
          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033]">
                My Internship
              </h1>
              <p className="text-[11px] text-[#7B8497]">
                Track your training progress, attendance, and tasks
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{
                  backgroundColor:
                    internship.status === "Active"
                      ? COLORS.greenSoft
                      : COLORS.accentSoft,
                  color:
                    internship.status === "Active"
                      ? COLORS.green
                      : COLORS.accent,
                }}
              >
                <CircleCheck size={13} strokeWidth={1.8} />
                {internship.status}
              </span>
            </div>
          </div>

          {/* Internship Hero – OLD STYLE with image */}
          <div className="mt-4 overflow-hidden rounded-[18px] border border-[#E9EDF4] bg-white shadow-sm">
            <div className="relative h-[205px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85"
                alt="Internship workspace"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0475FB] shadow-sm">
                  {internship.field}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div>
                  <h2 className="text-[19px] font-extrabold text-[#172033]">
                    {internship.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#7B8497]">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={14} className="text-[#7B8497]" />
                      {internship.company}
                    </span>
                    <span className="text-[#D1D5DB]">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#7B8497]" />
                      {internship.location}
                    </span>
                    <span className="text-[#D1D5DB]">•</span>
                    <span>{internship.mode}</span>
                  </div>
                </div>
                <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E9EDF4] px-4 text-[12px] font-semibold text-[#7B8497] hover:bg-gray-50">
                  <MessageCircle size={16} />
                  Contact Trainer
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards (3) */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: COLORS.border }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                    Progress
                  </p>
                  <p className="mt-1 text-[19px] font-extrabold text-[#0475FB]">
                    {internship.progress}%
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-gray-400">
                    {internship.completedHours}h of {internship.totalHours}h
                  </p>
                </div>
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: COLORS.primarySoft }}
                >
                  <Target size={17} color={COLORS.primary} />
                </div>
              </div>
            </div>
            <div
              className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: COLORS.border }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                    Tasks
                  </p>
                  <p className="mt-1 text-[19px] font-extrabold text-[#22C55E]">
                    {internship.completedTasks} / {internship.totalTasks}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-gray-400">
                    {internship.inProgressTasks} in progress
                  </p>
                </div>
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: COLORS.greenSoft }}
                >
                  <CheckCircle2 size={17} color={COLORS.green} />
                </div>
              </div>
            </div>
            <div
              className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: COLORS.border }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                    Attendance
                  </p>
                  <p className="mt-1 text-[19px] font-extrabold text-[#FFAD4E]">
                    {internship.attendance.percentage}%
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-gray-400">
                    {internship.attendance.present} present ·{" "}
                    {internship.attendance.late} late
                  </p>
                </div>
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: COLORS.accentSoft }}
                >
                  <Clock3 size={17} color={COLORS.accent} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
            {/* LEFT COLUMN */}
            <div className="space-y-5">
              {/* 1. Progress Card */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Internship progress
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Your overall training completion
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[23px] font-extrabold text-[#172033]">
                        {internship.progress}%
                      </p>
                      <p className="text-[10px] text-[#7B8497]">
                        Training completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-bold text-[#172033]">
                        {internship.completedHours}h / {internship.totalHours}h
                      </p>
                      <p className="text-[10px] text-[#7B8497]">
                        Training hours
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${internship.progress}%`,
                        background: `linear-gradient(90deg, ${COLORS.primary}, #38A0FF)`,
                      }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-[10px] text-[#7B8497]">
                    <span>Started {internship.startDate}</span>
                    <span>Ends {internship.endDate}</span>
                  </div>
                </div>
              </div>

              {/* 2. Next Task */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Your next task
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Keep your internship moving forward
                    </p>
                  </div>
                  <button className="text-[10px] font-extrabold text-[#0475FB] hover:underline">
                    View all tasks
                  </button>
                </div>
                <div
                  className="mt-4 rounded-xl border p-4"
                  style={{
                    borderColor: "#B9D4F4",
                    backgroundColor: COLORS.primarySoft,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0475FB] shadow-sm">
                        <PlayCircle size={19} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#172033]">
                          {internship.nextTask.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#7B8497]">
                          Due {internship.nextTask.due}
                        </p>
                      </div>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: COLORS.primarySoft,
                        color: COLORS.primary,
                      }}
                    >
                      {internship.nextTask.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between text-[10px]">
                      <span className="text-[#7B8497]">Progress</span>
                      <span className="font-semibold text-[#172033]">
                        {internship.nextTask.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[#0475FB]"
                        style={{ width: `${internship.nextTask.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="mt-3 flex items-center gap-1 text-[10px] font-extrabold text-[#0475FB] hover:underline">
                    Open task <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>

              {/* 3. Tasks List */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Training tasks
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Tasks assigned during your internship
                    </p>
                  </div>
                  <button className="text-[10px] font-extrabold text-[#0475FB] hover:underline">
                    View all
                  </button>
                </div>
                <div className="mt-4 divide-y divide-[#E9EDF4]">
                  {internship.tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor:
                              task.status === "Completed"
                                ? COLORS.greenSoft
                                : task.status === "In Progress"
                                  ? COLORS.primarySoft
                                  : "#F2F4F7",
                          }}
                        >
                          {task.status === "Completed" ? (
                            <CheckCircle2 size={15} color={COLORS.green} />
                          ) : task.status === "In Progress" ? (
                            <PlayCircle size={15} color={COLORS.primary} />
                          ) : (
                            <FileText size={15} color={COLORS.muted} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-bold text-[#172033]">
                            {task.title}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#7B8497]">
                            {task.category} · Due {task.due}
                          </p>
                        </div>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-bold"
                        style={{
                          backgroundColor:
                            task.status === "Completed"
                              ? COLORS.greenSoft
                              : task.status === "In Progress"
                                ? COLORS.primarySoft
                                : "#F2F4F7",
                          color:
                            task.status === "Completed"
                              ? COLORS.green
                              : task.status === "In Progress"
                                ? COLORS.primary
                                : COLORS.muted,
                        }}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Attendance */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Attendance
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Your training attendance overview
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/attendance")}
                    className="text-[10px] font-extrabold text-[#0475FB] hover:underline"
                  >
                    View attendance
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div
                    className="rounded-xl p-4"
                    style={{ backgroundColor: COLORS.primarySoft }}
                  >
                    <p
                      className="text-[20px] font-extrabold"
                      style={{ color: COLORS.primary }}
                    >
                      {internship.attendance.percentage}%
                    </p>
                    <p className="text-[9px] font-medium text-[#7B8497]">
                      Attendance
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{ backgroundColor: COLORS.greenSoft }}
                  >
                    <p
                      className="text-[20px] font-extrabold"
                      style={{ color: COLORS.green }}
                    >
                      {internship.attendance.present}
                    </p>
                    <p className="text-[9px] font-medium text-[#7B8497]">
                      Present
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{ backgroundColor: COLORS.redSoft }}
                  >
                    <p
                      className="text-[20px] font-extrabold"
                      style={{ color: COLORS.red }}
                    >
                      {internship.attendance.absent}
                    </p>
                    <p className="text-[9px] font-medium text-[#7B8497]">
                      Absent
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{ backgroundColor: COLORS.accentSoft }}
                  >
                    <p
                      className="text-[20px] font-extrabold"
                      style={{ color: COLORS.accent }}
                    >
                      {internship.attendance.late}
                    </p>
                    <p className="text-[9px] font-medium text-[#7B8497]">
                      Late
                    </p>
                  </div>
                </div>
                <div
                  className="mt-4 flex items-center justify-between rounded-xl border p-4"
                  style={{ borderColor: COLORS.border }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                      <Clock3 size={17} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#172033]">
                        {internship.completedHours} training hours completed
                      </p>
                      <p className="text-[10px] text-[#7B8497]">
                        {internship.totalHours - internship.completedHours}{" "}
                        hours remaining
                      </p>
                    </div>
                  </div>
                  <button className="text-[10px] font-extrabold text-[#0475FB]">
                    Details
                  </button>
                </div>
              </div>

              {/* 5. Performance */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Performance
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Your latest internship performance
                    </p>
                  </div>
                  <button className="text-[10px] font-extrabold text-[#0475FB] hover:underline">
                    View evaluations
                  </button>
                </div>
                <div className="mt-4 grid gap-5 sm:grid-cols-[170px_1fr]">
                  <div
                    className="flex flex-col items-center justify-center rounded-xl p-5"
                    style={{ backgroundColor: "#F4F8FF" }}
                  >
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[9px] border-[#DDEBFF]">
                      <div className="absolute inset-[-9px] rounded-full border-[9px] border-transparent border-t-[#0475FB] border-r-[#0475FB] rotate-[25deg]" />
                      <div className="text-center">
                        <p className="text-2xl font-extrabold text-[#172033]">
                          {internship.performance.score}
                        </p>
                        <p className="text-[9px] text-[#7B8497]">/ 100</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[12px] font-bold text-[#172033]">
                      {internship.performance.label}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <div className="mb-1.5 flex justify-between text-[10px]">
                        <span className="text-[#7B8497]">Technical skills</span>
                        <span className="font-semibold text-[#172033]">
                          {internship.skills?.technical || 0}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#0475FB]"
                          style={{
                            width: `${internship.skills?.technical || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-[10px]">
                        <span className="text-[#7B8497]">Communication</span>
                        <span className="font-semibold text-[#172033]">
                          {internship.skills?.communication || 0}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#0475FB]"
                          style={{
                            width: `${internship.skills?.communication || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-[10px]">
                        <span className="text-[#7B8497]">Teamwork</span>
                        <span className="font-semibold text-[#172033]">
                          {internship.skills?.teamwork || 0}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#0475FB]"
                          style={{
                            width: `${internship.skills?.teamwork || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-4 rounded-xl border p-4"
                  style={{ borderColor: "#FFE7C8", backgroundColor: "#FFF9F1" }}
                >
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFAD4E]/15 text-[#E89024]">
                      <TrendingUp size={17} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#172033]">
                        AI performance insight
                      </p>
                      <p className="mt-0.5 text-[10px] leading-relaxed text-[#7B8497]">
                        {internship.performance.hasEvaluations
                          ? "Your technical performance is progressing well. Focus on communication and documentation to improve your overall evaluation."
                          : "Start submitting tasks and completing attendance to receive performance insights."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Milestones */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Training milestones
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Important stages throughout your internship
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  {internship.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="relative flex gap-4 pb-5 last:pb-0"
                    >
                      {idx !== internship.milestones.length - 1 && (
                        <div
                          className="absolute left-[15px] top-8 h-full w-px"
                          style={{
                            backgroundColor: milestone.completed
                              ? COLORS.primary
                              : COLORS.border,
                          }}
                        />
                      )}
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          milestone.completed
                            ? "bg-[#0475FB] text-white"
                            : "border-2 border-[#E9EDF4] bg-white text-[#D1D5DB]"
                        }`}
                      >
                        {milestone.completed ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
                        )}
                      </div>
                      <div className="pt-0.5">
                        <p
                          className={`text-[12px] font-bold ${
                            milestone.completed
                              ? "text-[#172033]"
                              : "text-[#7B8497]"
                          }`}
                        >
                          {milestone.title}
                        </p>
                        <p className="text-[10px] text-[#7B8497]">
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Recent Activity */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#172033]">
                      Recent activity
                    </h3>
                    <p className="mt-1 text-[10px] text-[#7B8497]">
                      Latest updates from your internship
                    </p>
                  </div>
                  <button className="text-[10px] font-extrabold text-[#0475FB] hover:underline">
                    View activity
                  </button>
                </div>
                <div className="mt-4 divide-y divide-[#E9EDF4]">
                  {internship.activities.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={idx}
                        className="flex gap-3 py-4 first:pt-1 last:pb-1"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-[11px] text-[#172033]">
                            <span className="font-extrabold">
                              {activity.title}
                            </span>{" "}
                            {activity.description}
                          </p>
                          <p className="mt-0.5 text-[9px] text-[#7B8497]">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-[88px] lg:self-start">
              {/* Internship Overview */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                    Internship Overview
                  </p>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                      <CalendarDays size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-[#7B8497]">
                        Training period
                      </p>
                      <p className="text-[11px] font-semibold text-[#172033]">
                        {internship.startDate}
                      </p>
                      <p className="text-[10px] text-[#7B8497]">
                        to {internship.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                      <Clock3 size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-[#7B8497]">
                        Training hours
                      </p>
                      <p className="text-[11px] font-semibold text-[#172033]">
                        {internship.completedHours}h / {internship.totalHours}h
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-[#7B8497]">
                        Location
                      </p>
                      <p className="text-[11px] font-semibold text-[#172033]">
                        {internship.location}
                      </p>
                      <p className="text-[10px] text-[#7B8497]">
                        {internship.mode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trainer */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                  Company Trainer
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    {internship.trainer.initials}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#172033]">
                      {internship.trainer.name}
                    </p>
                    <p className="text-[10px] text-[#7B8497]">
                      {internship.trainer.role}
                    </p>
                  </div>
                </div>
                <button className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#F4F8FF] text-[11px] font-semibold text-[#0475FB] hover:bg-[#EAF3FF]">
                  <MessageCircle size={14} />
                  Message Trainer
                </button>
              </div>

              {/* University Supervisor */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                  University Supervisor
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    {internship.universitySupervisor.initials}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#172033]">
                      {internship.universitySupervisor.name}
                    </p>
                    <p className="text-[10px] text-[#7B8497]">
                      {internship.universitySupervisor.role}
                    </p>
                  </div>
                </div>
                <button className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[#E9EDF4] text-[11px] font-semibold text-[#7B8497] hover:bg-gray-50">
                  <MessageCircle size={14} />
                  Contact Supervisor
                </button>
              </div>

              {/* Quick Actions */}
              <div
                className="rounded-[18px] border bg-white p-5 shadow-sm"
                style={{ borderColor: COLORS.border }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                  Quick Actions
                </p>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => navigate("/attendance")}
                    className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-gray-50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                      <CalendarDays size={14} />
                    </div>
                    <span className="text-[11px] font-medium text-[#172033]">
                      View Attendance
                    </span>
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-gray-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                      <FileText size={14} />
                    </div>
                    <span className="text-[11px] font-medium text-[#172033]">
                      View Tasks
                    </span>
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-gray-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                      <Award size={14} />
                    </div>
                    <span className="text-[11px] font-medium text-[#172033]">
                      View Evaluations
                    </span>
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-[#E9EDF4] pt-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4 text-[10px] font-medium text-[#7B8497]">
              <span>Help center</span>
              <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="hover:text-[#172033]"
              >
                Settings
              </button>
            </div>
            <p className="text-[9px] font-medium text-gray-400">
              Tadreeby helps you stay on track throughout your field training.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
