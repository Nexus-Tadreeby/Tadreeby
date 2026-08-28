// src/components/pages/student/Attendance.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    GraduationCap,
    Clock,
    Settings,
    BellRing,
    Calendar,
    CheckCircle,
    Timer,
    CircleCheck,
    Upload,
    ChevronDown,
    RotateCw,
    Printer,
    Search,
    ArrowUpRight,
    List,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    X,
    Zap,
    Building2,
    AlertCircle,
    Info,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/Button";
import {
    SkeletonText,
    SkeletonCard,
    SkeletonStatCard,
    SkeletonCalendar,
} from "../../common/pagesAssets/Skeleton";

// ─── Import API services ────────────────────────────────────────────────
import { attendanceAPI, internshipAPI } from "../../../services/api";

// ============================================================
// Design Tokens
// ============================================================
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

// ============================================================
// Navigation
// ============================================================
const studentNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
    { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
    { label: "Attendance", icon: Clock, path: "/attendance" },
];
const studentFooterItems = [{ label: "Settings", icon: Settings, path: "/settings" }];

const getInitials = (name) => {
    if (!name) return "S";
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

// ============================================================
// Helpers
// ============================================================
function parseCustomDate(dateStr) {
    const parts = dateStr.replace(/,/g, "").split(" ");
    const monthMap = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
    };
    const month = monthMap[parts[1]];
    const day = parseInt(parts[2]);
    const year = parseInt(parts[3]);
    return new Date(year, month, day);
}

function formatDate(date) {
    const d = new Date(date);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatTime(date) {
    const d = new Date(date);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

function formatElapsed(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function calcDurationSeconds(start, end) {
    return Math.floor((end - start) / 1000);
}

function parseDurationToHours(durationStr) {
    if (!durationStr) return 0;
    const hoursMatch = durationStr.match(/(\d+)h/);
    const minsMatch = durationStr.match(/(\d+)m/);
    const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
    const mins = minsMatch ? parseFloat(minsMatch[1]) : 0;
    return hours + mins / 60;
}

// ============================================================
// Reusable Components
// ============================================================

const StatusBadge = ({ status }) => {
    const isActive = status === "CHECKED_IN" || status === "Active";
    const isClosed = status === "CHECKED_OUT" || status === "Closed";
    let label = status;
    let bgColor = COLORS.muted + "20";
    let textColor = COLORS.muted;
    if (isActive) {
        label = "Active";
        bgColor = COLORS.accent + "30";
        textColor = COLORS.accent;
    } else if (isClosed) {
        label = "Closed";
        bgColor = COLORS.primary + "20";
        textColor = COLORS.primary;
    }
    return (
        <span
            className="inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {label}
        </span>
    );
};

const FilterButton = ({ active, children, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex h-8 items-center justify-center rounded-full px-4 text-[11px] font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#0475FB] focus:ring-offset-1 ${active
                ? "bg-[#0475FB] text-white shadow-sm"
                : "border border-[#E9EDF4] bg-white text-[#7B8497] hover:border-[#C9D8EA] hover:bg-[#F8FAFC] hover:text-[#172033]"
            }`}
    >
        {children}
    </button>
);

// ============================================================
// Attendance Summary
// ============================================================
const AttendanceSummary = ({ sessions, requiredHours = 200 }) => {
    const totalAttended = sessions
        .filter((s) => s.status === "CHECKED_OUT" || s.status === "Closed")
        .reduce((sum, s) => sum + parseDurationToHours(s.duration || "0h 0m"), 0);

    const hoursLeft = Math.max(0, requiredHours - totalAttended);
    const progress = Math.min(100, (totalAttended / requiredHours) * 100);

    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(
        (s) => s.status === "CHECKED_OUT" || s.status === "Closed"
    ).length;

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mt-4 print:grid-cols-3 print:gap-4">
            <div
                className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg print:shadow-none print:border print:border-gray-200"
                style={{ borderColor: COLORS.border }}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-600">
                            Attendance Rate
                        </p>
                        <p className="mt-1 text-[19px] font-extrabold text-[#22C55E] print:text-green-600">
                            {progress.toFixed(0)}%
                        </p>
                    </div>
                    <div className="rounded-full p-2 print:hidden" style={{ backgroundColor: COLORS.greenSoft }}>
                        <CheckCircle size={17} color={COLORS.green} />
                    </div>
                </div>
                <p className="mt-1 text-[10px] font-medium text-gray-400 print:text-gray-500">
                    {completedSessions} of {totalSessions} sessions completed
                </p>
            </div>

            <div
                className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg print:shadow-none print:border print:border-gray-200"
                style={{ borderColor: COLORS.border }}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-600">
                            Total Hours
                        </p>
                        <p className="mt-1 text-[19px] font-extrabold text-[#0475FB] print:text-blue-600">
                            {totalAttended.toFixed(1)}h
                        </p>
                    </div>
                    <div className="rounded-full p-2 print:hidden" style={{ backgroundColor: COLORS.primarySoft }}>
                        <Timer size={17} color={COLORS.primary} />
                    </div>
                </div>
                <div className="mt-2 print:hidden">
                    <div className="flex justify-between text-[9px] font-medium text-[#7B8497]">
                        <span>Progress</span>
                        <span>{progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${progress}%`,
                                background: `linear-gradient(90deg, #0475FB, #22C55E)`,
                            }}
                        />
                    </div>
                </div>
                <div className="hidden print:block mt-1 text-[9px] text-gray-500">
                    {progress.toFixed(0)}% of {requiredHours}h completed
                </div>
            </div>

            <div
                className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg print:shadow-none print:border print:border-gray-200"
                style={{ borderColor: COLORS.border }}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-600">
                            Hours Left
                        </p>
                        <p className="mt-1 text-[19px] font-extrabold text-[#FFAD4E] print:text-orange-600">
                            {hoursLeft.toFixed(1)}h
                        </p>
                    </div>
                    <div className="rounded-full p-2 print:hidden" style={{ backgroundColor: COLORS.accentSoft }}>
                        <Clock size={17} color={COLORS.accent} />
                    </div>
                </div>
                <p className="mt-1 text-[10px] font-medium text-gray-400 print:text-gray-500">
                    of {requiredHours}h required
                </p>
            </div>
        </div>
    );
};

// ============================================================
// Active Session Banner – fully dynamic from backend
// ============================================================
const ActiveSessionBanner = ({
    isCheckedIn,
    checkInTime,
    elapsedFormatted,
    onCheckIn,
    onCheckOut,
    profile,
    internships,
    isLoading,
    onBrowseOpportunities,
}) => {
    // Find active internship (status = ACTIVE) or take the first one
    const activeInternship = internships?.find((i) => i.status === "ACTIVE") || internships?.[0];

    // If no internship and not loading, show "enroll first" message
    if (!isLoading && (!internships || internships.length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-[22px] p-5 sm:p-6 border border-dashed border-[#E9EDF4] bg-white/60">
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3FF]">
                        <Info size={22} color={COLORS.primary} />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-[#172033]">No Internship Found</p>
                        <p className="text-[11px] text-[#7B8497]">
                            You must enroll in an internship first to track attendance.
                        </p>
                        <Button
                            variant="blue"
                            onClick={onBrowseOpportunities}
                            className="mt-2 my-4 mx-15 px-4 py-2 text-[11px]"
                        >
                            Browse Opportunities
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const companyName = activeInternship?.company?.name || "Your University Partner";
    const internshipTitle = activeInternship?.opportunity?.title || `${profile?.major || "Field Training"} Intern`;
    const universityName = profile?.university?.name || "Your University";

    // Compute week number (mock – you can replace with real start date logic)
    const startDate = activeInternship?.createdAt ? new Date(activeInternship.createdAt) : new Date();
    const now = new Date();
    const diffWeeks = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
    const currentWeek = Math.min(diffWeeks + 1, 12);
    const weekDisplay = `Week ${currentWeek} of 12`;

    const buttonText = isCheckedIn ? "Check Out" : "Check In";
    const buttonAction = isCheckedIn ? onCheckOut : onCheckIn;

    return (
        <div
            className="relative overflow-hidden rounded-[22px] p-5 sm:p-6 print:border print:border-gray-200 print:shadow-none print:bg-white"
            style={{
                background: isCheckedIn
                    ? "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)"
                    : "linear-gradient(110deg, #E9EDF4 0%, #F5F7FB 100%)",
                boxShadow: isCheckedIn ? "0 12px 30px rgba(4,117,251,0.18)" : "none",
            }}
        >
            {isCheckedIn && (
                <>
                    <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10 print:hidden" />
                    <div className="pointer-events-none absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5 print:hidden" />
                </>
            )}

            <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{
                            backgroundColor: isCheckedIn ? "rgba(255,255,255,0.15)" : "#E9EDF4",
                        }}
                    >
                        <Building2 size={22} color={isCheckedIn ? "white" : "#7B8497"} />
                    </div>

                    <div>
                        <p
                            className="text-[11px] font-semibold uppercase tracking-wider"
                            style={{ color: isCheckedIn ? "rgba(255,255,255,0.65)" : "#7B8497" }}
                        >
                            Current Internship
                        </p>
                        <h2
                            className="mt-0.5 text-[17px] font-extrabold"
                            style={{ color: isCheckedIn ? "white" : "#172033" }}
                        >
                            {internshipTitle}
                        </h2>
                        <div
                            className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-medium"
                            style={{ color: isCheckedIn ? "rgba(255,255,255,0.75)" : "#7B8497" }}
                        >
                            <span>{companyName}</span>
                            <span
                                className="h-1 w-1 rounded-full"
                                style={{
                                    backgroundColor: isCheckedIn ? "rgba(255,255,255,0.4)" : "#D1D5DB",
                                }}
                            />
                            <span>Field Training</span>
                            <span
                                className="h-1 w-1 rounded-full"
                                style={{
                                    backgroundColor: isCheckedIn ? "rgba(255,255,255,0.4)" : "#D1D5DB",
                                }}
                            />
                            <span>{weekDisplay}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 print:hidden">
                    <div className="hidden text-right sm:block">
                        <p
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: isCheckedIn ? "rgba(255,255,255,0.6)" : "#7B8497" }}
                        >
                            Today
                        </p>
                        <p className="text-[13px] font-bold" style={{ color: isCheckedIn ? "white" : "#172033" }}>
                            {isCheckedIn ? checkInTime : "Not checked in"}
                        </p>
                    </div>

                    <Button
                        variant={isCheckedIn ? "gold" : "blue"}
                        onClick={buttonAction}
                        className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-extrabold"
                        disabled={!internships || internships.length === 0}
                    >
                        <Clock size={15} />
                        {buttonText}
                    </Button>
                </div>
                <div className="hidden print:block text-right">
                    <p className="text-[10px] font-semibold text-gray-500">Today</p>
                    <p className="text-[13px] font-bold text-gray-700">
                        {isCheckedIn ? checkInTime : "Not checked in"}
                    </p>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Timesheet Table
// ============================================================
const TimesheetTable = ({ sessions }) => {
    if (sessions.length === 0) return <EmptyState />;

    const mapStatus = (status) => {
        if (status === "CHECKED_IN") return "Active";
        if (status === "CHECKED_OUT") return "Closed";
        return status;
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-[#E9EDF4] bg-white shadow-sm print:border print:border-gray-300 print:shadow-none">
            <table className="min-w-[800px] w-full border-collapse">
                <thead>
                    <tr className="bg-[#F8F9FC] border-b border-[#E9EDF4] print:bg-gray-100 print:border-gray-300">
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-700">
                            Date
                        </th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-700">
                            Clock‑In
                        </th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-700">
                            Clock‑Out
                        </th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-700">
                            Total Hours
                        </th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-700">
                            Status
                        </th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#7B8497] print:text-gray-700">
                            Notes
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => (
                        <tr
                            key={session.id}
                            className={`border-b border-[#E9EDF4] transition hover:bg-[#F9FAFB] print:border-gray-200 print:hover:bg-white ${index % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"
                                }`}
                        >
                            <td className="px-4 py-2.5 text-[11px] font-medium text-[#334155] print:text-gray-700">
                                {formatDate(session.date)}
                            </td>
                            <td className="px-4 py-2.5 text-[12px] font-medium text-[#334155] print:text-gray-700">
                                {formatTime(session.date)}
                            </td>
                            <td className="px-4 py-2.5 text-[12px] font-medium text-[#334155] print:text-gray-700">
                                {session.checkOut ? formatTime(session.checkOut) : "—"}
                            </td>
                            <td className="px-4 py-2.5 text-[12px] font-bold text-[#2468B3] print:text-blue-700">
                                {session.duration || "—"}
                            </td>
                            <td className="px-4 py-2.5">
                                <StatusBadge status={mapStatus(session.status)} />
                            </td>
                            <td className="px-4 py-2.5 text-[11px] text-[#7B8497] print:text-gray-600">
                                {session.notes || "—"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ============================================================
// Attendance Calendar
// ============================================================
const AttendanceCalendar = ({ sessions, onDateClick }) => {
    const [selectedDate, setSelectedDate] = useState(17);
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 7));
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const sessionMap = useMemo(() => {
        const map = new Map();
        sessions.forEach((s) => {
            const dateObj = parseCustomDate(formatDate(s.date));
            const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(
                dateObj.getDate()
            ).padStart(2, "0")}`;
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(s);
        });
        return map;
    }, [sessions]);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
        today.getDate()
    ).padStart(2, "0")}`;

    const monthSessions = sessions.filter((s) => {
        const d = new Date(s.date);
        return d.getMonth() === month && d.getFullYear() === year;
    });
    const totalDays = monthSessions.length;
    const presentDays = monthSessions.filter(
        (s) => s.status === "CHECKED_OUT" || s.status === "Closed"
    ).length;
    const rate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    const totalHours = monthSessions.reduce(
        (sum, s) => sum + parseDurationToHours(s.duration || "0h 0m"),
        0
    );
    const requiredHours = 200;

    return (
        <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={17} color={COLORS.primary} />
                        <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
                            Attendance
                        </h3>
                    </div>
                    <p className="mt-1 text-[10px] font-medium text-gray-400">
                        Track your internship attendance
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="rounded-lg p-1 hover:bg-gray-100 transition"
                    >
                        <ChevronLeft size={16} color={COLORS.muted} />
                    </button>
                    <span className="text-[10px] font-bold text-gray-600">
                        {monthNames[month]} {year}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="rounded-lg p-1 hover:bg-gray-100 transition"
                    >
                        <ChevronRight size={16} color={COLORS.muted} />
                    </button>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1.5">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="pb-1 text-center text-[9px] font-bold text-gray-400">
                        {d}
                    </div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateObj = new Date(year, month, day);
                    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isToday = key === todayStr;
                    const sessionsOnDay = sessionMap.get(key) || [];
                    const hasSession = sessionsOnDay.length > 0;
                    const isActive = sessionsOnDay.some((s) => s.status === "CHECKED_IN" || s.status === "Active");
                    let status = "upcoming";
                    if (hasSession) {
                        if (isActive) status = "late";
                        else if (sessionsOnDay.some((s) => s.status === "CHECKED_OUT" || s.status === "Closed"))
                            status = "present";
                    }
                    const dayOfWeek = dateObj.getDay();
                    if (dayOfWeek === 0 || dayOfWeek === 6) status = "weekend";

                    const getStatusStyle = () => {
                        if (day === selectedDate) return { backgroundColor: COLORS.primary, color: "white" };
                        if (status === "present") return { backgroundColor: COLORS.greenSoft, color: "#16A34A" };
                        if (status === "late") return { backgroundColor: COLORS.accentSoft, color: "#D97706" };
                        if (status === "weekend") return { backgroundColor: "#F7F8FA", color: "#A8AFBC" };
                        return { backgroundColor: "#F7F8FA", color: "#A8AFBC" };
                    };

                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={() => {
                                setSelectedDate(day);
                                if (sessionsOnDay.length) onDateClick(sessionsOnDay);
                            }}
                            className="flex aspect-square items-center justify-center rounded-lg text-[10px] font-bold transition hover:scale-105"
                            style={getStatusStyle()}
                        >
                            {day}
                        </button>
                    );
                })}
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
                    <p className="mt-0.5 text-[16px] font-extrabold" style={{ color: COLORS.text }}>
                        {rate}%
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-semibold text-gray-400">Hours completed</p>
                    <p className="mt-0.5 text-[12px] font-extrabold" style={{ color: COLORS.primary }}>
                        {totalHours.toFixed(1)} / {requiredHours} hrs
                    </p>
                </div>
            </div>
        </div>
    );
};

const Legend = ({ color, label }) => (
    <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[9px] font-semibold text-gray-400">{label}</span>
    </div>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3FF]">
            <Calendar size={21} color={COLORS.primary} strokeWidth={1.8} />
        </div>
        <h3 className="mt-4 text-[14px] font-bold text-[#172033]">No attendance records</h3>
        <p className="mt-1 max-w-sm text-[11px] leading-relaxed text-[#7B8497]">
            Your check‑in and check‑out logs will appear here.
        </p>
    </div>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
const Attendance = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [refreshing, setRefreshing] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("timesheet");
    const [selectedSessions, setSelectedSessions] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Internships
    const [internships, setInternships] = useState([]);

    // Active session
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [checkInTimestamp, setCheckInTimestamp] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const timerRef = useRef(null);

    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

    // Profile (will be used in banner)
    const profile = {
        firstName: user?.firstName || "Student",
        lastName: user?.lastName || "",
        major: user?.studentProfile?.major || "Field Training",
        university: user?.studentProfile?.university || { name: "Your University" },
    };

    // ── Fetch data ──
    const fetchData = async () => {
        setLoading(true);
        try {
            const [attendanceData, internshipsData] = await Promise.all([
                attendanceAPI.getAttendance(),
                internshipAPI.getMyInternships(),
            ]);

            const attendanceList = Array.isArray(attendanceData) ? attendanceData : [];
            const internshipsList = Array.isArray(internshipsData) ? internshipsData : [];

            setSessions(attendanceList);
            setInternships(internshipsList);

            // Check for active session
            const active = attendanceList.find((s) => s.status === "CHECKED_IN");
            if (active) {
                setIsCheckedIn(true);
                setActiveSessionId(active.id);
                const checkInDate = new Date(active.date);
                setCheckInTimestamp(checkInDate);
                const elapsed = calcDurationSeconds(checkInDate, new Date());
                setElapsedSeconds(elapsed);
            } else {
                setIsCheckedIn(false);
                setActiveSessionId(null);
                setCheckInTimestamp(null);
                setElapsedSeconds(0);
            }
        } catch (error) {
            console.error("Failed to fetch attendance data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ── Timer ──
    useEffect(() => {
        if (isCheckedIn && checkInTimestamp) {
            timerRef.current = setInterval(() => {
                const now = new Date();
                const diff = calcDurationSeconds(checkInTimestamp, now);
                setElapsedSeconds(diff);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isCheckedIn, checkInTimestamp]);

    // ── Check In ──
    const handleCheckIn = async () => {
        const activeInternship = internships.find((i) => i.status === "ACTIVE");
        if (!activeInternship) {
            alert("You don't have an active internship. Please enroll first.");
            return;
        }

        try {
            const newRecord = await attendanceAPI.checkIn(activeInternship.id);
            if (newRecord) {
                setSessions((prev) => [newRecord, ...prev]);
                setIsCheckedIn(true);
                setActiveSessionId(newRecord.id);
                const checkInDate = new Date(newRecord.date);
                setCheckInTimestamp(checkInDate);
                setElapsedSeconds(0);
            }
        } catch (error) {
            console.error("Check-in failed:", error);
            alert(error?.message || "Check-in failed. Please try again.");
        }
    };

    // ── Check Out ──
    const handleCheckOutClick = () => {
        setShowCheckoutDialog(true);
    };

    const confirmCheckOut = async () => {
        if (!activeSessionId) return;

        try {
            const updatedRecord = await attendanceAPI.checkOut();
            if (updatedRecord) {
                setSessions((prev) =>
                    prev.map((s) => (s.id === updatedRecord.id ? updatedRecord : s))
                );
                setIsCheckedIn(false);
                setActiveSessionId(null);
                setCheckInTimestamp(null);
                setElapsedSeconds(0);
                setShowCheckoutDialog(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
            }
        } catch (error) {
            console.error("Check-out failed:", error);
            alert(error?.message || "Check-out failed. Please try again.");
        }
    };

    const cancelCheckOut = () => {
        setShowCheckoutDialog(false);
    };

    // ── Filters ──
    const filteredSessions = useMemo(() => {
        let filtered = sessions;
        if (filter === "Last 7 days") {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            filtered = filtered.filter((s) => new Date(s.date) >= sevenDaysAgo);
        }
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(
                (s) =>
                    formatDate(s.date).toLowerCase().includes(term) ||
                    formatTime(s.date).toLowerCase().includes(term) ||
                    (s.duration && s.duration.toLowerCase().includes(term)) ||
                    (s.notes && s.notes.toLowerCase().includes(term))
            );
        }
        return filtered;
    }, [filter, sessions, searchTerm]);

    const activeSession = sessions.find((s) => s.id === activeSessionId);
    const checkInTime = activeSession ? formatTime(activeSession.date) : "09:18 AM";
    const elapsedFormatted = formatElapsed(elapsedSeconds);

    // ── Handlers ──
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const handleExport = () => window.print();

    const handleDateClick = (sessionsOnDay) => {
        if (sessionsOnDay && sessionsOnDay.length) {
            setSelectedSessions(sessionsOnDay);
            setShowDetailModal(true);
        }
    };

    const fullName = useMemo(() => {
        if (!user) return "Student";
        return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Student";
    }, [user]);

    const studentUser = {
        name: fullName,
        role: "Student",
        avatar: user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login", { replace: true });
    };

    // ── Browse Opportunities handler ──
    const handleBrowseOpportunities = () => {
        navigate("/student/opportunities");
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
            <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl print:hidden" />
            <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl print:hidden" />
            <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl print:hidden" />

            <Sidebar
                navItems={studentNavItems}
                footerItems={studentFooterItems}
                user={studentUser}
                profilePath="/student/profile"
                onSignOut={handleSignOut}
            />

            <main className="flex-1 overflow-y-auto relative z-10 print:overflow-visible">
                <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7 print:max-w-full print:px-4 print:py-0">
                    <PageHeader
                        loading={loading}
                        profile={user}
                        fullName={fullName}
                        studentUser={studentUser}
                        searchValue={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                        chatBadge={3}
                        notificationBadge={4}
                    />

                    <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between print:mt-2">
                        <div>
                            <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033] print:text-2xl print:text-gray-800">
                                Attendance
                            </h1>
                            <p className="text-[11px] text-[#7B8497] print:text-xs print:text-gray-500">
                                Track your internship attendance
                            </p>
                        </div>
                        {isCheckedIn && (
                            <div className="flex items-center gap-3 rounded-full bg-[#EAF3FF] px-4 py-2 text-[13px] font-semibold text-[#0475FB] w-fit print:hidden">
                                <Clock size={16} className="animate-pulse" />
                                <span>Active · {elapsedFormatted}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 print:mt-2">
                        <ActiveSessionBanner
                            isCheckedIn={isCheckedIn}
                            checkInTime={checkInTime}
                            elapsedFormatted={elapsedFormatted}
                            onCheckIn={handleCheckIn}
                            onCheckOut={handleCheckOutClick}
                            profile={profile}
                            internships={internships}
                            isLoading={loading}
                            onBrowseOpportunities={handleBrowseOpportunities}
                        />
                    </div>

                    <AttendanceSummary sessions={sessions} />

                    <div className="mt-6 flex items-center justify-between border-b border-[#E9EDF4] print:border-b print:border-gray-300 print:mt-4">
                        <div className="flex gap-6 print:hidden">
                            <button
                                type="button"
                                onClick={() => setViewMode("timesheet")}
                                className={`pb-2 text-[13px] font-semibold transition ${viewMode === "timesheet"
                                        ? "border-b-2 border-[#0475FB] text-[#0475FB]"
                                        : "text-[#7B8497] hover:text-[#172033]"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <List size={16} /> Timesheet
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("calendar")}
                                className={`pb-2 text-[13px] font-semibold transition ${viewMode === "calendar"
                                        ? "border-b-2 border-[#0475FB] text-[#0475FB]"
                                        : "text-[#7B8497] hover:text-[#172033]"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarDays size={16} /> Calendar
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-3 print:hidden">
                            <FilterButton active={filter === "All"} onClick={() => setFilter("All")}>
                                All
                            </FilterButton>
                            <FilterButton
                                active={filter === "Last 7 days"}
                                onClick={() => setFilter("Last 7 days")}
                            >
                                Last 7 days
                            </FilterButton>
                            <Button variant="gold" onClick={handleExport} className="h-8 px-3 text-[11px]">
                                <Upload size={14} /> Export
                            </Button>
                            <Button
                                variant="blue"
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="h-8 px-3 text-[11px]"
                            >
                                <RotateCw size={14} className={refreshing ? "animate-spin" : ""} />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    <div className="mt-5 print:mt-2">
                        {loading ? (
                            viewMode === "timesheet" ? (
                                <div className="space-y-2 print:hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <SkeletonCard key={i} className="p-4">
                                            <div className="grid grid-cols-6 gap-4">
                                                {[...Array(6)].map((_, j) => (
                                                    <SkeletonText key={j} className="h-4 w-full" />
                                                ))}
                                            </div>
                                        </SkeletonCard>
                                    ))}
                                </div>
                            ) : (
                                <SkeletonCalendar />
                            )
                        ) : viewMode === "timesheet" ? (
                            <TimesheetTable sessions={filteredSessions} />
                        ) : (
                            <AttendanceCalendar sessions={filteredSessions} onDateClick={handleDateClick} />
                        )}
                    </div>

                    {showCheckoutDialog && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                            onClick={cancelCheckOut}
                        >
                            <div
                                className="max-w-md w-full rounded-2xl bg-white p-6 shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF4E5]">
                                        <AlertCircle size={20} color={COLORS.accent} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[15px] font-extrabold text-[#172033]">
                                            Confirm Check Out
                                        </h4>
                                        <p className="mt-1 text-[12px] text-[#7B8497]">
                                            You are about to check out from your current session.
                                        </p>
                                        <div className="mt-3 rounded-xl bg-[#F5F7FB] p-3 text-[11px]">
                                            <div className="flex justify-between">
                                                <span className="text-[#7B8497]">Check‑in time</span>
                                                <span className="font-medium text-[#172033]">{checkInTime}</span>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-[#7B8497]">Elapsed time</span>
                                                <span className="font-medium text-[#172033]">{elapsedFormatted}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 flex gap-3">
                                    <Button
                                        variant="blue"
                                        onClick={cancelCheckOut}
                                        className="flex-1 justify-center text-[12px]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="gold"
                                        onClick={confirmCheckOut}
                                        className="flex-1 justify-center text-[12px]"
                                    >
                                        Confirm Check Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDetailModal && selectedSessions.length > 0 && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                            onClick={() => setShowDetailModal(false)}
                        >
                            <div
                                className="max-w-md w-full rounded-2xl bg-white p-6 shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[15px] font-extrabold text-[#172033]">
                                        Sessions on {selectedSessions[0]?.date}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setShowDetailModal(false)}
                                        className="rounded-full p-1 hover:bg-gray-100"
                                    >
                                        <X size={18} color={COLORS.muted} />
                                    </button>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {selectedSessions.map((s) => (
                                        <div
                                            key={s.id}
                                            className="flex items-center justify-between border-b border-[#E9EDF4] pb-2 last:border-0"
                                        >
                                            <div>
                                                <p className="text-[12px] font-semibold text-[#172033]">
                                                    In: {formatTime(s.date)}
                                                </p>
                                                <p className="text-[12px] text-[#7B8497]">
                                                    Out: {s.checkOut ? formatTime(s.checkOut) : "—"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-bold text-[#2468B3]">
                                                    {s.duration || "—"}
                                                </p>
                                                <StatusBadge status={s.status} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

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

            <style>
                {`
          @media print {
            body { background: white !important; font-size: 11px !important; }
            .print\\:block { display: block !important; }
            .print\\:hidden { display: none !important; }
            .print\\:border { border: 1px solid #d1d5db !important; }
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:bg-white { background: white !important; }
            .print\\:text-gray-700 { color: #374151 !important; }
            .print\\:text-gray-600 { color: #4b5563 !important; }
            .print\\:text-gray-500 { color: #6b7280 !important; }
            .print\\:text-blue-600 { color: #2563eb !important; }
            .print\\:text-green-600 { color: #16a34a !important; }
            .print\\:text-orange-600 { color: #ea580c !important; }
            .print\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
            .print\\:gap-4 { gap: 1rem !important; }
            .print\\:mt-2 { margin-top: 0.5rem !important; }
            .print\\:mt-4 { margin-top: 1rem !important; }
            .print\\:mb-4 { margin-bottom: 1rem !important; }
            .print\\:p-0 { padding: 0 !important; }
            .print\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
            .print\\:py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
            .print\\:max-w-full { max-width: 100% !important; }
            .print\\:overflow-visible { overflow: visible !important; }
            .print\\:border-gray-300 { border-color: #d1d5db !important; }
            .print\\:bg-gray-100 { background-color: #f3f4f6 !important; }
            .sidebar, .fixed, .sticky, button, .filter-group, .tab-buttons, .print\\:hidden {
              display: none !important;
            }
            table { width: 100% !important; border-collapse: collapse !important; }
            th, td { border: 1px solid #d1d5db !important; padding: 6px 8px !important; text-align: left !important; }
            th { background-color: #f3f4f6 !important; font-weight: 600 !important; }
          }
        `}
            </style>
        </div>
    );
};

export default Attendance;