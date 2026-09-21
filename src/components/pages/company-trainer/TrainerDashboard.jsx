import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Megaphone,
  UserCheck,
} from "lucide-react";
import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { Button } from "../../common/Button";
import { useAuth } from "../../../context/AuthContext";
import { trainerNavItems, trainerSidebarProps } from "./trainerNavigation";
import {
  DUMMY_TRAINER_APPLICATIONS,
  DUMMY_TRAINER_DASHBOARD,
  DUMMY_TRAINER_STUDENTS,
  DUMMY_TRAINER_TASKS,
} from "./trainerMockData";

const COLORS = {
  primary: "#0475FB",
  primarySoft: "#EAF3FF",
  green: "#22C55E",
  greenSoft: "#EAF9EF",
  orange: "#FFAD4E",
  orangeSoft: "#FFF4E5",
  text: "#172033",
  muted: "#7B8497",
  border: "#E9EDF4",
};

const Card = ({ title, subtitle, action, children, className = "" }) => (
  <section
    className={`rounded-[20px] border bg-white p-5 ${className}`}
    style={{ borderColor: COLORS.border }}
  >
    {(title || action) && (
      <div className="flex items-start justify-between gap-3">
        <div>
          {title && (
            <h2 className="text-[14px] font-extrabold text-[#172033]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-[10px] font-medium text-[#7B8497]">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

const MetricCard = ({
  icon: Icon,
  label,
  value,
  detail,
  color,
  bg,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group rounded-[18px] border bg-white p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    style={{ borderColor: COLORS.border }}
  >
    <div className="flex items-start justify-between">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: bg }}
      >
        <Icon size={17} color={color} />
      </div>
      <ArrowUpRight
        size={14}
        color="#B0B7C5"
        className="transition group-hover:text-[#0475FB]"
      />
    </div>
    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
      {label}
    </p>
    <p className="mt-0.5 text-[19px] font-extrabold text-[#172033]">{value}</p>
    <p className="mt-1 text-[10px] font-medium text-gray-400">{detail}</p>
  </button>
);

function WelcomeHeader({ user }) {
  const fullName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Trainer";
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7B8497]">
          Trainer Dashboard
        </p>
        <h1 className="text-[25px] font-extrabold tracking-[-0.6px] text-[#172033]">
          Welcome back, {fullName.split(" ")[0]}
        </h1>
        <p className="mt-1.5 text-[13px] font-medium text-[#7B8497]">
          Full Stack Developer · Atlas Company
        </p>
      </div>
    </div>
  );
}

function InternshipBanner({ companyName }) {
  return (
    <section
      className="relative overflow-hidden rounded-[22px] p-5 sm:p-6"
      style={{
        background:
          "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)",
        boxShadow: "0 12px 30px rgba(4,117,251,0.18)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5" />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <GraduationCap size={22} color="white" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/65">
              Current Internship
            </p>
            <h2 className="mt-0.5 truncate text-[17px] font-extrabold text-white">
              Frontend Developer Trainer
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
      </div>
    </section>
  );
}

function TaskSubmissionChart({ tasks, onViewTasks }) {
  const rows = tasks.slice(0, 6).map((task) => {
    const total = Number(
      task.totalStudents ?? task.assignedStudentsCount ?? 24,
    );
    const submitted = Math.min(
      total,
      Number(task.submittedCount ?? task.submissionsCount ?? 0),
    );
    return {
      ...task,
      total,
      submitted,
      percent: total ? Math.round((submitted / total) * 100) : 0,
    };
  });
  return (
    <Card
      title="Tasks Submission Overview"
      subtitle="Track trainee progress across current assignments"
      action={
        <button
          type="button"
          onClick={onViewTasks}
          className="rounded-full border border-[#E4E8EF] bg-white px-3 py-1.5 text-[10px] font-bold text-[#596274] hover:bg-[#F7F9FC]"
        >
          This Month <span className="ml-1">⌄</span>
        </button>
      }
    >
      <div className="mt-5 flex items-center gap-5 text-[10px] font-semibold text-[#596274]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#75B5FF]" />
          Submitted
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#EAF3FF]" />
          Remaining
        </span>
      </div>
      <div className="mt-5 flex gap-3">
        <div className="flex h-[205px] w-7 flex-col justify-between pb-7 text-[8px] font-semibold text-[#A0A8B8]">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        <div className="relative flex h-[205px] min-w-0 flex-1 items-end justify-between gap-2 border-b border-[#EEF1F5] bg-[linear-gradient(to_bottom,transparent_24.5%,#F0F2F6_25%,transparent_25.5%,transparent_49.5%,#F0F2F6_50%,transparent_50.5%,transparent_74.5%,#F0F2F6_75%,transparent_75.5%)] px-2 sm:gap-4 sm:px-3">
          {rows.map((task, index) => {
            const submittedHeight = (task.percent / 100) * 155;
            const remainingHeight = ((100 - task.percent) / 100) * 155;
            const label =
              task.title?.replace(/weekly report\s*[–-]\s*/i, "Week ") ||
              `Task ${index + 1}`;
            return (
              <div
                key={task.id || index}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              >
                <span className="mb-2 text-[9px] font-extrabold text-[#172033]">
                  {task.percent}%
                </span>
                <div className="flex h-[155px] w-[28px] flex-col justify-end overflow-hidden rounded-t-[8px] bg-[#EAF3FF] sm:w-[34px]">
                  {remainingHeight > 0 && (
                    <div
                      className="w-full bg-[#EAF3FF]"
                      style={{ height: `${remainingHeight}px` }}
                    />
                  )}
                  <div
                    className="w-full bg-[#75B5FF] transition-all duration-500"
                    style={{ height: `${submittedHeight}px` }}
                  />
                </div>
                <span
                  className="mt-2 line-clamp-2 h-6 w-[54px] text-center text-[8px] font-bold leading-3 text-[#667085] sm:w-[64px]"
                  title={task.title}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#EEF1F5] pt-3 sm:grid-cols-3">
        {rows.map((task, index) => (
          <div
            key={task.id || index}
            className="flex min-w-0 items-center justify-between gap-2 text-[9px]"
          >
            <span className="min-w-0 truncate font-semibold text-[#596274]">
              T{index + 1} · {task.title}
            </span>
            <span className="shrink-0 font-extrabold text-[#172033]">
              {task.submitted}/{task.total}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const EVENTS = [
  {
    date: 8,
    title: "Weekly Mentor Meeting",
    time: "10:00 AM",
    color: COLORS.primary,
    bg: COLORS.primarySoft,
  },
  {
    date: 10,
    title: "Project Review",
    time: "02:00 PM",
    color: COLORS.green,
    bg: COLORS.greenSoft,
  },
  {
    date: 15,
    title: "Weekly Progress Sync",
    time: "11:30 AM",
    color: COLORS.orange,
    bg: COLORS.orangeSoft,
  },
];

function CalendarCard() {
  const year = 2026,
    month = 8,
    today = 5;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from(
    { length: Math.ceil((firstDay + daysInMonth) / 7) * 7 },
    (_, i) => {
      const day = i - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    },
  );
  const eventDates = new Set(EVENTS.map((event) => event.date));
  return (
    <Card title="Calendar" subtitle="Your upcoming internship schedule">
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded-full p-1.5 text-[#7B8497] hover:bg-[#F7F8FB]"
        >
          <ChevronLeft size={16} />
        </button>
        <h3 className="text-[14px] font-extrabold text-[#172033]">
          September 2026
        </h3>
        <button
          type="button"
          className="rounded-full p-1.5 text-[#7B8497] hover:bg-[#F7F8FB]"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 text-center text-[9px] font-extrabold uppercase text-[#9AA2B1]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
        {cells.map((day, index) => (
          <div key={index} className="flex h-8 items-center justify-center">
            {day && (
              <div
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${day === today ? "bg-[#0475FB] text-white shadow-[0_4px_12px_rgba(4,117,251,0.25)]" : "text-[#344054]"}`}
              >
                {day}
                {eventDates.has(day) && day !== today && (
                  <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#0475FB]" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-[#EEF1F5] pt-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-extrabold text-[#172033]">
            Upcoming Events
          </p>
          <CalendarDays size={15} color={COLORS.primary} />
        </div>
        <div className="mt-3 space-y-2.5">
          {EVENTS.map((event) => (
            <div
              key={event.date}
              className="flex items-center gap-3 rounded-[14px] border border-[#EEF1F5] bg-white p-2.5"
            >
              <div
                className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-[10px]"
                style={{ backgroundColor: event.bg, color: event.color }}
              >
                <span className="text-[7px] font-extrabold uppercase">Sep</span>
                <span className="text-[13px] font-extrabold leading-4">
                  {event.date}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-extrabold text-[#344054]">
                  {event.title}
                </p>
                <p className="mt-0.5 text-[9px] font-medium text-[#7B8497]">
                  Sep {event.date}, 2026 · {event.time}
                </p>
              </div>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: event.color }}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-1 text-[9px] font-extrabold text-[#0475FB]"
        >
          View all events <ArrowUpRight size={11} />
        </button>
      </div>
    </Card>
  );
}

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(DUMMY_TRAINER_DASHBOARD);
  const [applications, setApplications] = useState(DUMMY_TRAINER_APPLICATIONS);
  const [students, setStudents] = useState(DUMMY_TRAINER_STUDENTS);
  const [tasks, setTasks] = useState(DUMMY_TRAINER_TASKS);
  useEffect(() => {
    setDashboard(DUMMY_TRAINER_DASHBOARD);
    setApplications(DUMMY_TRAINER_APPLICATIONS);
    setStudents(DUMMY_TRAINER_STUDENTS);
    setTasks(DUMMY_TRAINER_TASKS);
    setLoading(false);
  }, []);
  const fullName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Trainer";
  const trainerUser = {
    name: fullName,
    role: "Company Trainer",
    avatar: user?.profileImage || "",
  };
  const stats = dashboard?.stats || {};
  const companyName = dashboard?.company?.name || "Your Company";
  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter']">
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
      <Sidebar
        navItems={trainerNavItems}
        user={trainerUser}
        {...trainerSidebarProps}
        onSignOut={signOut}
      />
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
          <PageHeader
            loading={loading}
            profile={user}
            fullName={fullName}
            studentUser={trainerUser}
            searchValue=""
            onSearchChange={() => {}}
            chatBadge={0}
            notificationBadge={stats.pendingApplications ?? applications.length}
            onChatClick={() => navigate("/company/trainer/chat")}
            onLogout={signOut}
          />
          <div className="grid grid-cols-1 items-end gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
          {loading ? (
            <div className="h-20 animate-pulse rounded-2xl bg-white/60" />
          ) : (
            <WelcomeHeader user={user} />
          )}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="gold"
                  icon={<ClipboardList size={15} />}
                  onClick={() => navigate("/company/trainer/tasks/create")}
                  className="!w-full !justify-center !px-3 !py-2.5 !text-[10px]"
                >
                  Create Task
                </Button>
                <Button
                  variant="secondary"
                  icon={<Megaphone size={15} />}
                  className="!w-full !justify-center !px-3 !py-2.5 !text-[10px]"
                >
                  Announcement
                </Button>
              </div>
          </div>
          <div className="mt-6 grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="min-w-0">
              <InternshipBanner companyName={companyName} />
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                <MetricCard
                  icon={GraduationCap}
                  label="Total Trainees"
                  value={stats.totalStudents ?? students.length}
                  detail="Currently assigned to you"
                  color={COLORS.primary}
                  bg={COLORS.primarySoft}
                  onClick={() => navigate("/company/trainer/students")}
                />
                <MetricCard
                  icon={ClipboardList}
                  label="Total Tasks"
                  value={
                    Number(stats.activeTasks ?? 5) +
                    Number(stats.completedTasks ?? 1)
                  }
                  detail={`${stats.activeTasks ?? 5} active · ${stats.completedTasks ?? 1} completed`}
                  color={COLORS.green}
                  bg={COLORS.greenSoft}
                  onClick={() => navigate("/company/trainer/tasks")}
                />
                <MetricCard
                  icon={UserCheck}
                  label="Pending Applications"
                  value={stats.pendingApplications ?? applications.length}
                  detail="Waiting for your review"
                  color={COLORS.orange}
                  bg={COLORS.orangeSoft}
                  onClick={() => navigate("/company/trainer/applications")}
                />
              </div>
              <div className="mt-5">
                <TaskSubmissionChart
                  tasks={tasks}
                  onViewTasks={() => navigate("/company/trainer/tasks")}
                />
              </div>
            </div>
            <aside className="min-w-0 space-y-5">
              <CalendarCard />

            </aside>
          </div>
          <div className="mt-5 pb-5 text-center sm:text-left">
            <p className="text-[9px] font-medium text-gray-400">
              Tadreeby helps you stay on track throughout your field training.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
