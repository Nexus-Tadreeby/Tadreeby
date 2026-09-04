// src/components/pages/student/StudentTasks.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  GraduationCap,
  Clock,
  Settings,
  Search,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Building2,
  MessageCircle,
  X,
  Upload,
  RefreshCw,
  ChevronRight,
  Circle,
  PlayCircle,
  FileText,
  AlertCircle,
  Inbox,
  Filter,
  ChevronDown,
  ListTodo,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/Button";
import { SkeletonText, SkeletonCard } from "../../common/pagesAssets/Skeleton";

// ─── Import API ──────────────────────────────────────────────────────
import { tasksAPI } from "../../../services/api";

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
function formatDeadline(date) {
  if (!date) return "No deadline";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getDaysUntilDeadline(date) {
  if (!date) return null;
  const now = new Date();
  const deadline = new Date(date);
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getDeadlineState(task) {
  const days = getDaysUntilDeadline(task.deadline);
  if (task.status === "DONE") return { label: "Completed", type: "done" };
  if (days === null) return { label: "No deadline", type: "normal" };
  if (days < 0) return { label: "Overdue", type: "danger" };
  if (days === 0) return { label: "Due today", type: "warning" };
  if (days <= 2)
    return { label: `${days} day${days > 1 ? "s" : ""} left`, type: "warning" };
  return { label: `${days} days left`, type: "normal" };
}

const STATUS_CONFIG = {
  TODO: { label: "To Do", color: COLORS.muted, bg: "#F4F5F7", icon: Circle },
  IN_PROGRESS: {
    label: "In Progress",
    color: COLORS.primary,
    bg: COLORS.primarySoft,
    icon: PlayCircle,
  },
  DONE: {
    label: "Done",
    color: COLORS.green,
    bg: COLORS.greenSoft,
    icon: CheckCircle2,
  },
};

// ─── Demo Data (fallback) ───────────────────────────────────────────
const DEMO_TASKS = [
  // ... (same as before)
];

// ─── Sub-components ──────────────────────────────────────────────────

const TaskStatusIcon = ({ status, size = 17 }) => {
  const config = STATUS_CONFIG[status];
  if (!config)
    return <Circle size={size} color={COLORS.muted} strokeWidth={1.8} />;
  const Icon = config.icon;
  return <Icon size={size} color={config.color} strokeWidth={2} />;
};

const StatCard = ({ label, value, color }) => {
  const colors = {
    muted: { text: COLORS.muted, bg: "#F4F5F7" },
    primary: { text: COLORS.primary, bg: COLORS.primarySoft },
    green: { text: COLORS.green, bg: COLORS.greenSoft },
  };
  const current = colors[color] || colors.muted;
  return (
    <div
      className="rounded-xl px-3 py-2.5"
      style={{ backgroundColor: current.bg }}
    >
      <p className="text-[18px] font-extrabold" style={{ color: current.text }}>
        {value}
      </p>
      <p className="mt-0.5 text-[9px] font-medium text-[#7B8497]">{label}</p>
    </div>
  );
};

const EmptyState = ({ status, search }) => {
  const isFiltered = status && status !== "ALL";
  const message = isFiltered
    ? `No ${status?.toLowerCase() || ""} tasks found`
    : "No tasks assigned yet";
  const description = isFiltered
    ? "Try changing your filter or search terms."
    : "New tasks from your trainer will appear here.";

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCE3EC] bg-[#FAFBFC] px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
        <Inbox size={28} className="text-[#7B8497]" />
      </div>
      <h3 className="mt-4 text-[15px] font-bold text-[#172033]">{message}</h3>
      <p className="mt-1 text-[12px] text-[#7B8497]">{description}</p>
    </div>
  );
};

const TaskCard = ({ task, onOpen }) => {
  const config = STATUS_CONFIG[task.status] || STATUS_CONFIG.TODO;
  const deadline = getDeadlineState(task);
  const submission = task.submissions?.[0];
  const company = task?.internship?.company?.name || "Training Company";
  const hasSubmission = !!submission;
  const isOverdue = deadline.type === "danger";

  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="group flex w-full flex-col gap-3 border-b border-[#E9EDF4] bg-white px-5 py-4 text-left transition hover:bg-[#FBFCFE] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0475FB] sm:flex-row sm:items-center"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            <TaskStatusIcon status={task.status} size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[13px] font-semibold text-[#172033] transition group-hover:text-[#0475FB]">
                {task.title}
              </h3>
              {isOverdue && (
                <span className="inline-flex items-center rounded-full bg-[#FEF0F0] px-2 py-0.5 text-[9px] font-bold text-[#EF4444]">
                  Overdue
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-1 text-[10px] text-[#7B8497]">
              {task.description || "No description provided."}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1 text-[10px] text-[#7B8497]">
                <Building2 size={12} /> {company}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#7B8497]">
                <FileText size={12} /> Field Training
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-3">
        <span
          className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] font-semibold sm:w-[86px] sm:justify-center"
          style={{ color: config.color, backgroundColor: config.bg }}
        >
          {config.label}
        </span>

        <div className="flex min-w-[120px] items-center gap-2">
          <CalendarDays
            size={14}
            color={
              deadline.type === "danger"
                ? COLORS.red
                : deadline.type === "warning"
                  ? COLORS.accent
                  : COLORS.muted
            }
          />
          <div>
            <p className="text-[10px] font-medium text-[#172033]">
              {formatDeadline(task.deadline)}
            </p>
            <p
              className={`mt-0.5 text-[9px] ${
                deadline.type === "danger"
                  ? "text-[#EF4444]"
                  : deadline.type === "warning"
                    ? "text-[#FFAD4E]"
                    : deadline.type === "done"
                      ? "text-[#22C55E]"
                      : "text-[#7B8497]"
              }`}
            >
              {deadline.label}
            </p>
          </div>
        </div>

        <div className="flex min-w-[110px] items-center gap-2">
          {hasSubmission ? (
            <>
              <CheckCircle2 size={14} color={COLORS.green} />
              <div>
                <p className="text-[10px] font-semibold text-[#22C55E]">
                  Submitted
                </p>
                <p className="text-[9px] text-[#7B8497]">
                  {submission.score !== null && submission.score !== undefined
                    ? `${submission.score}/100`
                    : "Awaiting review"}
                </p>
              </div>
            </>
          ) : (
            <>
              <Clock size={14} color={COLORS.muted} />
              <div>
                <p className="text-[10px] font-medium text-[#172033]">
                  Not submitted
                </p>
                <p className="text-[9px] text-[#7B8497]">Action required</p>
              </div>
            </>
          )}
        </div>

        <ChevronRight
          size={16}
          color="#B4BCC9"
          className="hidden transition group-hover:translate-x-0.5 sm:block"
        />
      </div>
    </button>
  );
};

const TaskGroup = ({ status, tasks, onOpen }) => {
  const config = STATUS_CONFIG[status];
  return (
    <section className="overflow-hidden rounded-xl border border-[#E9EDF4] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E9EDF4] bg-[#FAFBFC] px-4 py-3">
        <div className="flex items-center gap-2">
          <TaskStatusIcon status={status} size={15} />
          <h2 className="text-[12px] font-bold text-[#172033]">
            {config.label}
          </h2>
          <span className="rounded-full bg-[#EEF1F5] px-2 py-0.5 text-[9px] font-medium text-[#7B8497]">
            {tasks.length}
          </span>
        </div>
      </div>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={onOpen} />
        ))
      ) : (
        <div className="p-6 text-center text-[11px] text-[#7B8497]">
          No tasks in this status
        </div>
      )}
    </section>
  );
};

const TaskDetailsDrawer = ({ task, onClose, onSubmitted }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  if (!task) return null;

  const submission = task.submissions?.[0];
  const deadline = getDeadlineState(task);
  const company = task?.internship?.company?.name || "Training Company";
  const isSubmitted = !!submission;

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setError("");
    setSuccess(false);
    setUploading(true);

    try {
      const result = await tasksAPI.submitTask(task.id, file);
      onSubmitted(task.id, result);
      setFile(null);
      setSuccess(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
      // auto-close after success? we can keep it open.
    } catch (err) {
      setError(err?.message || "Unable to submit the task. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[#172033]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-details-title"
        className="fixed right-0 top-0 z-50 h-full w-full max-w-[520px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E9EDF4] bg-white/95 px-6 py-4 backdrop-blur-md">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">
              Task details
            </p>
            <h2
              id="task-details-title"
              className="mt-1 text-[16px] font-extrabold text-[#172033]"
            >
              {task.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#7B8497] transition hover:bg-[#F5F7FB] hover:text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0475FB]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#E9EDF4] bg-[#FAFBFC] p-4">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#7B8497]">
                Status
              </p>
              <div className="mt-2 flex items-center gap-2">
                <TaskStatusIcon status={task.status} size={16} />
                <span className="text-[11px] font-semibold text-[#172033]">
                  {STATUS_CONFIG[task.status]?.label}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-[#E9EDF4] bg-[#FAFBFC] p-4">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#7B8497]">
                Deadline
              </p>
              <div className="mt-2 flex items-center gap-2">
                <CalendarDays
                  size={15}
                  color={
                    deadline.type === "danger" ? COLORS.red : COLORS.primary
                  }
                />
                <span className="text-[11px] font-semibold text-[#172033]">
                  {formatDeadline(task.deadline)}
                </span>
              </div>
            </div>
          </div>

          <section>
            <h3 className="text-[12px] font-bold text-[#172033]">
              Description
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-[#7B8497]">
              {task.description || "No description was provided for this task."}
            </p>
          </section>

          <section className="rounded-xl border border-[#D9E8FA] bg-[#F7FAFF] p-4">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#7B8497]">
              Internship
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3FF]">
                <Building2 size={17} color={COLORS.primary} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#172033]">
                  {task?.internship?.title || "Field Training"}
                </p>
                <p className="mt-0.5 text-[10px] text-[#7B8497]">{company}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[12px] font-bold text-[#172033]">
                Your submission
              </h3>
              {isSubmitted && (
                <span className="rounded-full bg-[#EAF9EF] px-2.5 py-1 text-[9px] font-semibold text-[#22C55E]">
                  Submitted
                </span>
              )}
            </div>
            {isSubmitted ? (
              <div className="mt-3 rounded-xl border border-[#D9EDDF] bg-[#F7FCF8] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF9EF]">
                    <FileText size={17} color={COLORS.green} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-[#172033]">
                      Submission uploaded
                    </p>
                    <p className="mt-1 text-[9px] text-[#7B8497]">
                      Submitted{" "}
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                    {submission.score !== null &&
                      submission.score !== undefined && (
                        <p className="mt-2 text-[11px] font-bold text-[#22C55E]">
                          Score: {submission.score}/100
                        </p>
                      )}
                    {submission.feedback && (
                      <div className="mt-3 rounded-lg bg-white p-3">
                        <p className="text-[9px] font-semibold text-[#7B8497]">
                          Trainer feedback
                        </p>
                        <p className="mt-1 text-[10px] leading-relaxed text-[#172033]">
                          {submission.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-[#E9EDF4] bg-[#FAFBFC] p-4">
                <label
                  htmlFor="task-file"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#C9D8EA] bg-white px-5 py-10 text-center transition hover:border-[#0475FB] hover:bg-[#F7FAFF]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3FF]">
                    <Upload size={20} color={COLORS.primary} />
                  </div>
                  <p className="mt-3 text-[12px] font-semibold text-[#172033]">
                    Upload your report
                  </p>
                  <p className="mt-1 text-[10px] text-[#7B8497]">
                    PDF, DOC, DOCX or ZIP · max 10 MB
                  </p>
                  <input
                    ref={fileInputRef}
                    id="task-file"
                    type="file"
                    accept=".pdf,.doc,.docx,.zip"
                    className="sr-only"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                      setError("");
                      setSuccess(false);
                    }}
                  />
                </label>

                {file && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-[#EAF3FF] px-3 py-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <FileText size={14} color={COLORS.primary} />
                      <span className="truncate text-[10px] font-medium text-[#172033]">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setError("");
                        setSuccess(false);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="ml-2 text-[#7B8497] hover:text-[#EF4444]"
                      aria-label="Remove selected file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {error && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#FEF0F0] px-3 py-2 text-[10px] text-[#EF4444]">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#EAF9EF] px-3 py-2 text-[10px] text-[#22C55E]">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                    <span>Task submitted successfully!</span>
                  </div>
                )}

                <button
                  type="button"
                  disabled={!file || uploading}
                  onClick={handleSubmit}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0475FB] px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#035CC9] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0475FB] focus:ring-offset-2"
                >
                  {uploading ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload size={14} /> Submit task
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
        </div>
      </aside>
    </>
  );
};

// ─── Main Component ──────────────────────────────────────────────────

export default function StudentTasks() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fullName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student";
  const studentUser = {
    name: fullName,
    role: "Student",
    avatar: user?.profileImage || "",
  };

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // ── Load tasks ──
  const loadTasks = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      else setLoading(true);
      setError("");

      const taskList = await tasksAPI.getTasks();
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (err) {
      console.warn("Using demo tasks (API not available)");
      setTasks(DEMO_TASKS);
      setError(
        "Demo data is being displayed because the Tasks API could not be reached.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ── Filters ──
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = `${task.title} ${task.description || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "ALL" || task.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const todoTasks = filteredTasks.filter((t) => t.status === "TODO");
  const progressTasks = filteredTasks.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = filteredTasks.filter((t) => t.status === "DONE");

  const totalTasks = tasks.length;
  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const progressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;
  const completion = totalTasks
    ? Math.round((doneCount / totalTasks) * 100)
    : 0;

  // ── Submission update ──
  const handleSubmitted = (taskId, submission) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, submissions: [submission] } : task,
      ),
    );
    setSelectedTask((current) =>
      current ? { ...current, submissions: [submission] } : null,
    );
  };

  // ── Render ──
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
            loading={loading}
            profile={user}
            fullName={fullName}
            studentUser={studentUser}
            searchValue={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            chatBadge={3}
            notificationBadge={4}
          />

          {/* Title & Stats */}
          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033]">
                Tasks
              </h1>
              <p className="text-[11px] text-[#7B8497]">
                Stay on top of your internship assignments and deadlines.
              </p>
            </div>
            <Button
              variant="blue"
              onClick={() => loadTasks(true)}
              disabled={refreshing}
              className="h-8 px-3 text-[11px]"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </Button>
          </div>

          {/* Progress Overview */}
          <section
            className="mt-5 rounded-[18px] border bg-white p-5 shadow-sm"
            style={{ borderColor: COLORS.border }}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">
                  Progress
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-[25px] font-extrabold tracking-tight text-[#0475FB]">
                    {completion}%
                  </span>
                  <span className="mb-1 text-[10px] text-[#7B8497]">
                    tasks completed
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="To Do" value={todoCount} color="muted" />
                <StatCard
                  label="In Progress"
                  value={progressCount}
                  color="primary"
                />
                <StatCard label="Done" value={doneCount} color="green" />
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#EEF1F5]">
              <div
                className="h-full rounded-full bg-[#0475FB] transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </section>

          {/* Error banner */}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[10px] text-[#B42318]">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Toolbar */}
          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[360px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3B3]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
                className="h-9 w-full rounded-xl border border-[#E9EDF4] bg-white pl-9 pr-4 text-[11px] text-[#172033] outline-none transition placeholder:text-[#A1A9B7] focus:border-[#0475FB] focus:ring-2 focus:ring-[#0475FB]/10"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-full px-3.5 py-1.5 text-[10px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#0475FB] ${
                    filter === value
                      ? "bg-[#0475FB] text-white shadow-sm"
                      : "border border-[#E9EDF4] bg-white text-[#7B8497] hover:border-[#C9D8EA] hover:bg-[#F8FAFC] hover:text-[#172033]"
                  }`}
                >
                  {value === "ALL"
                    ? "All"
                    : value === "TODO"
                      ? "To Do"
                      : value === "IN_PROGRESS"
                        ? "In Progress"
                        : "Done"}
                </button>
              ))}
            </div>
          </div>

          {/* Task Groups */}
          <div className="mt-5 space-y-3">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} className="p-5">
                    <SkeletonText className="h-4 w-1/3" />
                    <SkeletonText className="mt-3 h-3 w-2/3" />
                    <SkeletonText className="mt-4 h-3 w-1/4" />
                  </SkeletonCard>
                ))}
              </div>
            ) : (
              <>
                {(filter === "ALL" || filter === "TODO") && (
                  <TaskGroup
                    status="TODO"
                    tasks={todoTasks}
                    onOpen={setSelectedTask}
                  />
                )}
                {(filter === "ALL" || filter === "IN_PROGRESS") && (
                  <TaskGroup
                    status="IN_PROGRESS"
                    tasks={progressTasks}
                    onOpen={setSelectedTask}
                  />
                )}
                {(filter === "ALL" || filter === "DONE") && (
                  <TaskGroup
                    status="DONE"
                    tasks={doneTasks}
                    onOpen={setSelectedTask}
                  />
                )}
                {filteredTasks.length === 0 && (
                  <EmptyState status={filter} search={search} />
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#E9EDF4] pt-4 text-center sm:flex-row sm:text-left">
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

      {/* Task Details Drawer */}
      <TaskDetailsDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSubmitted={handleSubmitted}
      />
    </div>
  );
}
