// src/components/pages/student/MyInternship.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Award,
    Bell,
    BookOpen,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    FileText,
    GraduationCap,
    MapPin,
    MessageCircle,
    MoreHorizontal,
    PlayCircle,
    Target,
    TrendingUp,
    UserRound,
    Users,
    Video,
    LayoutDashboard,
    Briefcase,
    Clock,
    Settings,
    Search,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
import { useAuth } from "../../../context/AuthContext";
import { internshipAPI } from "../../../services/api";

// ─── Import global skeleton components ──────────────────────────────
import {
    SkeletonText,
    SkeletonCard,
    SkeletonCircle,
    SkeletonRect,
    SkeletonButton,
    SkeletonBadge,
} from "../../common/pagesAssets/Skeleton";

// ─── Navigation ──────────────────────────────────────────────────────
const studentNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
    { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
    { label: "Attendance", icon: Clock, path: "/attendance" },
];

const studentFooterItems = [
    { label: "Settings", icon: Settings, path: "/settings" },
];

// ─── Skeleton Components ─────────────────────────────────────────────

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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
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

const SkeletonTaskCard = () => (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
        <div className="mb-4 flex items-end justify-between gap-4">
            <div>
                <SkeletonText className="h-5 w-32" />
                <SkeletonText className="mt-1 h-3 w-40" />
            </div>
            <SkeletonText className="h-4 w-20" />
        </div>
        <div className="mt-5 rounded-xl border border-blue-100 p-4">
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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
        <div className="mb-4 flex items-end justify-between gap-4">
            <div>
                <SkeletonText className="h-5 w-32" />
                <SkeletonText className="mt-1 h-3 w-40" />
            </div>
            <SkeletonText className="h-4 w-20" />
        </div>
        <div className="mt-4 divide-y divide-gray-100">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
        <div className="mb-4 flex items-end justify-between gap-4">
            <div>
                <SkeletonText className="h-5 w-32" />
                <SkeletonText className="mt-1 h-3 w-40" />
            </div>
            <SkeletonText className="h-4 w-20" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl p-4" style={{ backgroundColor: i === 0 ? "#F4F8FF" : i === 1 ? "#EAF9EF" : i === 2 ? "#FEF0F0" : "#FFF4E6" }}>
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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
        <div className="mb-4 flex items-end justify-between gap-4">
            <div>
                <SkeletonText className="h-5 w-32" />
                <SkeletonText className="mt-1 h-3 w-40" />
            </div>
            <SkeletonText className="h-4 w-20" />
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[170px_1fr]">
            <div className="flex flex-col items-center justify-center rounded-xl p-5" style={{ backgroundColor: "#F4F8FF" }}>
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
        <div className="mt-5 rounded-xl border border-[#FFE7C8] p-4" style={{ backgroundColor: "#FFF9F1" }}>
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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
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
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await internshipAPI.getMyInternship();
                const payload = response?.data ?? response;
                const data = payload?.internship ?? payload?.data ?? payload?.result ?? payload ?? null;

                const normalized = data && typeof data === "object"
                    ? {
                        title: data.title || data.role || data.internshipTitle || "Full Stack Web Development Training",
                        company: data.company?.name || data.companyName || data.company || "Nexus Technology",
                        field: data.field || data.category || data.specialization || "Software Engineering",
                        status: data.status || "In Progress",
                        startDate: data.startDate || data.startedAt || "September 1, 2026",
                        endDate: data.endDate || data.finishedAt || "November 24, 2026",
                        location: data.location || data.city || "Gaza, Palestine",
                        mode: data.mode || data.workMode || "On-site",
                        totalHours: data.totalHours || 120,
                        completedHours: data.completedHours || 68,
                        progress: data.progress || 57,
                        trainer: data.trainer || {
                            name: "Mohammad Ahmed",
                            role: "Senior Software Engineer",
                            initials: "MA",
                        },
                        universitySupervisor: data.universitySupervisor || {
                            name: "Dr. Sara Khaled",
                            role: "University Supervisor",
                            initials: "SK",
                        },
                        companyDescription: data.companyDescription || "Nexus Technology is a software development company...",
                        nextTask: data.nextTask || {
                            title: "Build Authentication API",
                            due: "Tomorrow",
                            progress: 70,
                        },
                        attendance: data.attendance || {
                            present: 18,
                            absent: 1,
                            late: 2,
                            percentage: 91,
                        },
                        performance: data.performance || {
                            score: 86,
                            label: "Very Good",
                        },
                        tasks: data.tasks || [
                            {
                                title: "Build Authentication API",
                                category: "Backend",
                                due: "Tomorrow",
                                status: "In Progress",
                                progress: 70,
                            },
                            {
                                title: "Create Database Schema",
                                category: "Database",
                                due: "Aug 27",
                                status: "Completed",
                                progress: 100,
                            },
                            {
                                title: "Implement User Dashboard",
                                category: "Frontend",
                                due: "Aug 30",
                                status: "Not Started",
                                progress: 0,
                            },
                        ],
                        activities: data.activities || [
                            {
                                icon: CheckCircle2,
                                title: "You completed",
                                description: "Database Schema task",
                                time: "2 hours ago",
                            },
                            {
                                icon: MessageCircle,
                                title: "Trainer commented on",
                                description: "Authentication API task",
                                time: "Yesterday",
                            },
                            {
                                icon: Award,
                                title: "Performance evaluation",
                                description: "Mid-training evaluation was added",
                                time: "3 days ago",
                            },
                        ],
                        milestones: data.milestones || [
                            { title: "Training Started", date: "Sep 1", completed: true },
                            { title: "First Evaluation", date: "Sep 28", completed: true },
                            { title: "Mid Training Review", date: "Oct 20", completed: true },
                            { title: "Final Evaluation", date: "Nov 20", completed: false },
                            { title: "Training Completed", date: "Nov 24", completed: false },
                        ],
                    }
                    : null;

                if (normalized) {
                    setInternship(normalized);
                } else {
                    setInternship({
                        title: "Full Stack Web Development Training",
                        company: "Nexus Technology",
                        field: "Software Engineering",
                        status: "In Progress",
                        startDate: "September 1, 2026",
                        endDate: "November 24, 2026",
                        location: "Gaza, Palestine",
                        mode: "On-site",
                        totalHours: 120,
                        completedHours: 68,
                        progress: 57,
                        trainer: {
                            name: "Mohammad Ahmed",
                            role: "Senior Software Engineer",
                            initials: "MA",
                        },
                        universitySupervisor: {
                            name: "Dr. Sara Khaled",
                            role: "University Supervisor",
                            initials: "SK",
                        },
                        companyDescription: "Nexus Technology is a software development company...",
                        nextTask: {
                            title: "Build Authentication API",
                            due: "Tomorrow",
                            progress: 70,
                        },
                        attendance: {
                            present: 18,
                            absent: 1,
                            late: 2,
                            percentage: 91,
                        },
                        performance: {
                            score: 86,
                            label: "Very Good",
                        },
                        tasks: [
                            {
                                title: "Build Authentication API",
                                category: "Backend",
                                due: "Tomorrow",
                                status: "In Progress",
                                progress: 70,
                            },
                            {
                                title: "Create Database Schema",
                                category: "Database",
                                due: "Aug 27",
                                status: "Completed",
                                progress: 100,
                            },
                            {
                                title: "Implement User Dashboard",
                                category: "Frontend",
                                due: "Aug 30",
                                status: "Not Started",
                                progress: 0,
                            },
                        ],
                        activities: [
                            {
                                icon: CheckCircle2,
                                title: "You completed",
                                description: "Database Schema task",
                                time: "2 hours ago",
                            },
                            {
                                icon: MessageCircle,
                                title: "Trainer commented on",
                                description: "Authentication API task",
                                time: "Yesterday",
                            },
                            {
                                icon: Award,
                                title: "Performance evaluation",
                                description: "Mid-training evaluation was added",
                                time: "3 days ago",
                            },
                        ],
                        milestones: [
                            { title: "Training Started", date: "Sep 1", completed: true },
                            { title: "First Evaluation", date: "Sep 28", completed: true },
                            { title: "Mid Training Review", date: "Oct 20", completed: true },
                            { title: "Final Evaluation", date: "Nov 20", completed: false },
                            { title: "Training Completed", date: "Nov 24", completed: false },
                        ],
                    });
                }
            } catch (error) {
                console.error("Failed to load internship:", error);
                setInternship({
                    title: "Full Stack Web Development Training",
                    company: "Nexus Technology",
                    field: "Software Engineering",
                    status: "In Progress",
                    startDate: "September 1, 2026",
                    endDate: "November 24, 2026",
                    location: "Gaza, Palestine",
                    mode: "On-site",
                    totalHours: 120,
                    completedHours: 68,
                    progress: 57,
                    trainer: {
                        name: "Mohammad Ahmed",
                        role: "Senior Software Engineer",
                        initials: "MA",
                    },
                    universitySupervisor: {
                        name: "Dr. Sara Khaled",
                        role: "University Supervisor",
                        initials: "SK",
                    },
                    companyDescription: "Nexus Technology is a software development company...",
                    nextTask: {
                        title: "Build Authentication API",
                        due: "Tomorrow",
                        progress: 70,
                    },
                    attendance: {
                        present: 18,
                        absent: 1,
                        late: 2,
                        percentage: 91,
                    },
                    performance: {
                        score: 86,
                        label: "Very Good",
                    },
                    tasks: [
                        {
                            title: "Build Authentication API",
                            category: "Backend",
                            due: "Tomorrow",
                            status: "In Progress",
                            progress: 70,
                        },
                        {
                            title: "Create Database Schema",
                            category: "Database",
                            due: "Aug 27",
                            status: "Completed",
                            progress: 100,
                        },
                        {
                            title: "Implement User Dashboard",
                            category: "Frontend",
                            due: "Aug 30",
                            status: "Not Started",
                            progress: 0,
                        },
                    ],
                    activities: [
                        {
                            icon: CheckCircle2,
                            title: "You completed",
                            description: "Database Schema task",
                            time: "2 hours ago",
                        },
                        {
                            icon: MessageCircle,
                            title: "Trainer commented on",
                            description: "Authentication API task",
                            time: "Yesterday",
                        },
                        {
                            icon: Award,
                            title: "Performance evaluation",
                            description: "Mid-training evaluation was added",
                            time: "3 days ago",
                        },
                    ],
                    milestones: [
                        { title: "Training Started", date: "Sep 1", completed: true },
                        { title: "First Evaluation", date: "Sep 28", completed: true },
                        { title: "Mid Training Review", date: "Oct 20", completed: true },
                        { title: "Final Evaluation", date: "Nov 20", completed: false },
                        { title: "Training Completed", date: "Nov 24", completed: false },
                    ],
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const studentUser = {
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student",
        role: "Student",
        avatar: user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    // ─── Render skeleton or real data ──────────────────────────────
    if (loading) {
        return (
            <div className="flex h-screen w-full overflow-hidden bg-[#F6F7F9] font-sans text-gray-900">
                <Sidebar
                    navItems={studentNavItems}
                    footerItems={studentFooterItems}
                    user={studentUser}
                    profilePath="/student/profile"
                    onSignOut={handleSignOut}
                />
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-7">
                        <button className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500">
                            <ArrowLeft size={17} />
                            Back to dashboard
                        </button>
                        <div className="mb-7">
                            <SkeletonBadge className="h-6 w-28" />
                            <SkeletonText className="mt-2 h-8 w-48" />
                            <SkeletonText className="mt-1 h-4 w-64" />
                        </div>
                        <SkeletonHero />
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_325px]">
                            <div className="space-y-6">
                                <SkeletonProgressCard />
                                <SkeletonTaskCard />
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

    if (!internship) {
        return (
            <div className="flex h-screen w-full overflow-hidden bg-[#F6F7F9] font-sans text-gray-900">
                <Sidebar
                    navItems={studentNavItems}
                    footerItems={studentFooterItems}
                    user={studentUser}
                    profilePath="/student/profile"
                    onSignOut={handleSignOut}
                />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-500">No internship data available.</p>
                    </div>
                </main>
            </div>
        );
    }

    // ─── Real data render ───────────────────────────────────────────
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#F6F7F9] font-sans text-gray-900">
            <Sidebar
                navItems={studentNavItems}
                footerItems={studentFooterItems}
                user={studentUser}
                profilePath="/student/profile"
                onSignOut={handleSignOut}
            />

            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-7">
                    {/* Back */}
                    <button
                        className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0475FB]"
                        onClick={() => navigate("/student/dashboard")}
                    >
                        <ArrowLeft size={17} />
                        Back to dashboard
                    </button>

                    {/* Page Title */}
                    <div className="mb-7">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-[#E8F3FF] px-3 py-1 text-[11px] font-semibold text-[#0475FB]">
                                {internship.status}
                            </span>
                            <span className="text-xs text-gray-400">Internship</span>
                        </div>
                        <h1 className="text-[28px] font-bold tracking-tight text-gray-950">
                            My Internship
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Track your training progress, attendance, tasks and performance.
                        </p>
                    </div>

                    {/* Hero */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                        <div className="relative h-[205px] overflow-hidden bg-[#EAF2FF]">
                            <img
                                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85"
                                alt="Internship workspace"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                            <div className="absolute bottom-5 left-6">
                                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0475FB] shadow-sm">
                                    {internship.field}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col justify-between gap-5 md:flex-row">
                                <div>
                                    <h2 className="text-[23px] font-bold text-gray-950">
                                        {internship.title}
                                    </h2>
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <BriefcaseBusiness size={14} />
                                            {internship.company}
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={14} />
                                            {internship.location}
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <span>{internship.mode}</span>
                                    </div>
                                </div>
                                <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                    <MessageCircle size={16} />
                                    Contact Trainer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_325px]">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Progress */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Internship progress
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Your overall training completion
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="mb-3 flex items-end justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">
                                                {internship.progress}%
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Training completed
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-700">
                                                {internship.completedHours}h / {internship.totalHours}h
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Training hours
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-[#0475FB]"
                                            style={{ width: `${internship.progress}%` }}
                                        />
                                    </div>
                                    <div className="mt-3 flex justify-between text-[11px] text-gray-400">
                                        <span>Started {internship.startDate}</span>
                                        <span>Ends {internship.endDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Next Task */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Your next task
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Keep your internship moving forward
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-medium text-[#0475FB] hover:underline">
                                        View all tasks
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="mt-5 rounded-xl border border-blue-100 bg-[#F4F8FF] p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0475FB] shadow-sm">
                                                <PlayCircle size={19} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {internship.nextTask.title}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    Due {internship.nextTask.due}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-[#E8F3FF] px-2.5 py-1 text-[10px] font-semibold text-[#0475FB]">
                                            In Progress
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <div className="mb-2 flex justify-between text-[11px]">
                                            <span className="text-gray-400">Progress</span>
                                            <span className="font-semibold text-gray-600">
                                                {internship.nextTask.progress}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white">
                                            <div
                                                className="h-full rounded-full bg-[#0475FB]"
                                                style={{ width: `${internship.nextTask.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <button className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0475FB] hover:underline">
                                        Open task
                                        <ChevronRight size={13} />
                                    </button>
                                </div>
                            </div>

                            {/* Tasks List */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Training tasks
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Tasks assigned during your internship
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-medium text-[#0475FB] hover:underline">
                                        View all
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="mt-4 divide-y divide-gray-100">
                                    {internship.tasks.map((task, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${task.status === "Completed"
                                                        ? "bg-green-50 text-green-600"
                                                        : task.status === "In Progress"
                                                            ? "bg-blue-50 text-[#0475FB]"
                                                            : "bg-gray-50 text-gray-400"
                                                        }`}
                                                >
                                                    {task.status === "Completed" ? (
                                                        <CheckCircle2 size={17} />
                                                    ) : (
                                                        <FileText size={17} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-gray-800">
                                                        {task.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {task.category} · Due {task.due}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 text-right sm:block">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${task.status === "Completed"
                                                        ? "bg-green-50 text-green-600"
                                                        : task.status === "In Progress"
                                                            ? "bg-blue-50 text-[#0475FB]"
                                                            : "bg-gray-100 text-gray-500"
                                                        }`}
                                                >
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Attendance */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Attendance
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Your training attendance overview
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-medium text-[#0475FB] hover:underline">
                                        View attendance
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    <div className="rounded-xl bg-[#F4F8FF] p-4">
                                        <p className="text-2xl font-bold text-[#0475FB]">
                                            {internship.attendance.percentage}%
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Attendance
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-green-50 p-4">
                                        <p className="text-2xl font-bold text-green-600">
                                            {internship.attendance.present}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Present
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-red-50 p-4">
                                        <p className="text-2xl font-bold text-red-500">
                                            {internship.attendance.absent}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Absent
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-orange-50 p-4">
                                        <p className="text-2xl font-bold text-[#F39A35]">
                                            {internship.attendance.late}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Late
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-100 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                                            <Clock3 size={17} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                {internship.completedHours} training hours completed
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {internship.totalHours - internship.completedHours} hours remaining
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-semibold text-[#0475FB]">
                                        Details
                                    </button>
                                </div>
                            </div>

                            {/* Performance */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Performance
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Your latest internship performance
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-medium text-[#0475FB] hover:underline">
                                        View evaluations
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="mt-5 grid gap-5 sm:grid-cols-[170px_1fr]">
                                    <div className="flex flex-col items-center justify-center rounded-xl bg-[#F4F8FF] p-5">
                                        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[9px] border-[#DDEBFF]">
                                            <div
                                                className="absolute inset-[-9px] rounded-full border-[9px] border-transparent border-t-[#0475FB] border-r-[#0475FB] rotate-[25deg]"
                                            />
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {internship.performance.score}
                                                </p>
                                                <p className="text-[10px] text-gray-400">
                                                    / 100
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm font-semibold text-gray-700">
                                            {internship.performance.label}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center gap-4">
                                        <div>
                                            <div className="mb-2 flex justify-between text-xs">
                                                <span className="text-gray-500">
                                                    Technical skills
                                                </span>
                                                <span className="font-semibold text-gray-700">
                                                    89%
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100">
                                                <div className="h-full w-[89%] rounded-full bg-[#0475FB]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex justify-between text-xs">
                                                <span className="text-gray-500">
                                                    Communication
                                                </span>
                                                <span className="font-semibold text-gray-700">
                                                    84%
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100">
                                                <div className="h-full w-[84%] rounded-full bg-[#0475FB]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex justify-between text-xs">
                                                <span className="text-gray-500">
                                                    Teamwork
                                                </span>
                                                <span className="font-semibold text-gray-700">
                                                    86%
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100">
                                                <div className="h-full w-[86%] rounded-full bg-[#0475FB]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 rounded-xl border border-[#FFE7C8] bg-[#FFF9F1] p-4">
                                    <div className="flex gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFAD4E]/15 text-[#E89024]">
                                            <TrendingUp size={17} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-700">
                                                AI performance insight
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Your technical performance is progressing well.
                                                Focus on communication and documentation to
                                                improve your overall evaluation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Milestones */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Training milestones
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Important stages throughout your internship
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {internship.milestones.map((milestone, index) => (
                                        <div
                                            key={index}
                                            className="relative flex gap-4 pb-6 last:pb-0"
                                        >
                                            {index !== internship.milestones.length - 1 && (
                                                <div
                                                    className={`absolute left-[15px] top-8 h-full w-px ${milestone.completed
                                                        ? "bg-[#0475FB]"
                                                        : "bg-gray-200"
                                                        }`}
                                                />
                                            )}
                                            <div
                                                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${milestone.completed
                                                    ? "bg-[#0475FB] text-white"
                                                    : "border-2 border-gray-200 bg-white text-gray-300"
                                                    }`}
                                            >
                                                {milestone.completed ? (
                                                    <CheckCircle2 size={16} />
                                                ) : (
                                                    <div className="h-2 w-2 rounded-full bg-gray-200" />
                                                )}
                                            </div>
                                            <div className="pt-0.5">
                                                <p
                                                    className={`text-sm font-semibold ${milestone.completed
                                                        ? "text-gray-800"
                                                        : "text-gray-400"
                                                        }`}
                                                >
                                                    {milestone.title}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {milestone.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-[17px] font-bold text-gray-900">
                                            Recent activity
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Latest updates from your internship
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-medium text-[#0475FB] hover:underline">
                                        View activity
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="mt-4 divide-y divide-gray-100">
                                    {internship.activities.map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-3 py-4 first:pt-1 last:pb-1"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F8FF] text-[#0475FB]">
                                                    <Icon size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-700">
                                                        <span className="font-semibold">
                                                            {activity.title}
                                                        </span>{" "}
                                                        {activity.description}
                                                    </p>
                                                    <p className="mt-1 text-[11px] text-gray-400">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <aside className="space-y-5 lg:sticky lg:top-[88px] lg:self-start">
                            {/* Internship Overview */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Internship overview
                                    </h3>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                                            <CalendarDays size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Training period
                                            </p>
                                            <p className="mt-0.5 text-xs font-semibold text-gray-700">
                                                {internship.startDate}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                to {internship.endDate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                                            <Clock3 size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Training hours
                                            </p>
                                            <p className="mt-0.5 text-xs font-semibold text-gray-700">
                                                {internship.completedHours} / {internship.totalHours} hours
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                                            <MapPin size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Location
                                            </p>
                                            <p className="mt-0.5 text-xs font-semibold text-gray-700">
                                                {internship.location}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {internship.mode}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trainer */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                    Company trainer
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCEBFF] text-sm font-bold text-[#0475FB]">
                                        {internship.trainer.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {internship.trainer.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            {internship.trainer.role}
                                        </p>
                                    </div>
                                </div>
                                <button className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#F4F8FF] text-xs font-semibold text-[#0475FB] hover:bg-[#EAF3FF]">
                                    <MessageCircle size={14} />
                                    Message trainer
                                </button>
                            </div>

                            {/* University Supervisor */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                    University supervisor
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF1DF] text-sm font-bold text-[#E89024]">
                                        {internship.universitySupervisor.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {internship.universitySupervisor.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            {internship.universitySupervisor.role}
                                        </p>
                                    </div>
                                </div>
                                <button className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                                    <MessageCircle size={14} />
                                    Contact supervisor
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_20px_rgba(0,0,0,0.025)]">
                                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                    Quick actions
                                </p>
                                <div className="space-y-2">
                                    <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                                            <CalendarDays size={15} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">
                                            View attendance
                                        </span>
                                    </button>
                                    <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                                            <FileText size={15} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">
                                            View tasks
                                        </span>
                                    </button>
                                    <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0475FB]">
                                            <Award size={15} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">
                                            View evaluations
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}