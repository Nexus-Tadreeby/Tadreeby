// src/components/pages/university-admin/UniversityAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Clock,
    XCircle,
    CheckCircle2,
    Users,
    GraduationCap,
    Inbox,
    LayoutDashboard,
    Settings,
    AlertCircle,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import StatCard from "../../common/StatCard";
import StatusBadge from "../../common/StatusBadge";
import EmptyState from "../../common/EmptyState";
import { DashboardSkeleton } from "../../common/LoadingSkeleton";
import VerificationTrendChart from "../../charts/VerificationTrendChart";
import { useAuth } from "../../../context/AuthContext";
import { apiRequest } from "../../../services/api";

// ─── Navigation ──────────────────────────────────────────────────────
const adminNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/university-admin/dashboard" },
    // Add more admin navigation items here
];

const adminFooterItems = [
    { label: "Settings", icon: Settings, path: "/university-admin/settings" },
];

function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function UniversityAdminDashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [verificationStats, setVerificationStats] = useState({
        pending: 0,
        rejected: 0,
        approved: 0,
    });
    const [platformStats, setPlatformStats] = useState({
        totalStudents: 0,
        totalSupervisors: 0,
    });
    const [trend, setTrend] = useState([]);
    const [recentVerifications, setRecentVerifications] = useState([]);

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Admin";
    const adminUser = {
        name: fullName,
        role: "University Admin",
        avatar: user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        // Check if user has the correct role
        if (user && user.role !== "UNIVERSITY_ADMIN") {
            setError("You do not have permission to view this page. Your role is: " + user.role);
            setIsLoading(false);
            return;
        }

        const fetchDashboard = async () => {
            setIsLoading(true);
            setError("");
            try {
                console.log("Fetching dashboard data...");
                const response = await apiRequest("/university/admin/dashboard", {
                    method: "GET",
                });
                console.log("Dashboard response:", response);
                // response structure: { success: true, data: {...} }
                const data = response?.data || response;
                // Update stats
                setVerificationStats({
                    pending: data.pendingApprovals || 0,
                    rejected: 0,
                    approved: 0,
                });
                setPlatformStats({
                    totalStudents: data.students || 0,
                    totalSupervisors: data.supervisors || 0,
                });
                // Mock data for trend and recent
                const mockTrend = [
                    { month: "Mar", approved: 18, pending: 6, rejected: 2 },
                    { month: "Apr", approved: 22, pending: 8, rejected: 1 },
                    { month: "May", approved: 19, pending: 5, rejected: 3 },
                    { month: "Jun", approved: 25, pending: 9, rejected: 2 },
                    { month: "Jul", approved: 30, pending: 12, rejected: 4 },
                    { month: "Aug", approved: 24, pending: 7, rejected: 1 },
                ];
                setTrend(mockTrend);

                const mockRecent = [
                    {
                        id: 1,
                        studentName: "Ahmed Mohamed",
                        program: "Computer Science",
                        submittedDate: "2026-08-28T10:30:00Z",
                        status: "pending",
                    },
                    {
                        id: 2,
                        studentName: "Sara Khaled",
                        program: "Software Engineering",
                        submittedDate: "2026-08-27T14:15:00Z",
                        status: "approved",
                    },
                    {
                        id: 3,
                        studentName: "Omar Hassan",
                        program: "Data Science",
                        submittedDate: "2026-08-26T09:45:00Z",
                        status: "rejected",
                    },
                ];
                setRecentVerifications(mockRecent);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                // Extract message from error
                const errorMessage = err?.message || err?.data?.message || "Failed to load dashboard data.";
                setError(errorMessage);
                // Fallback to zeros
                setVerificationStats({ pending: 0, rejected: 0, approved: 0 });
                setPlatformStats({ totalStudents: 0, totalSupervisors: 0 });
                setTrend([]);
                setRecentVerifications([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboard();
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
                <Sidebar
                    navItems={adminNavItems}
                    footerItems={adminFooterItems}
                    user={adminUser}
                    profilePath="/university-admin/profile"
                    onSignOut={handleSignOut}
                />
                <main className="flex-1 overflow-y-auto relative z-10">
                    <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8 lg:px-10">
                        <PageHeader loading={true} />
                        <div className="mt-6">
                            <DashboardSkeleton />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // If error and user role mismatch, show a clear message
    if (error && error.includes("do not have permission")) {
        return (
            <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
                <Sidebar
                    navItems={adminNavItems}
                    footerItems={adminFooterItems}
                    user={adminUser}
                    profilePath="/university-admin/profile"
                    onSignOut={handleSignOut}
                />
                <main className="flex-1 flex items-center justify-center relative z-10">
                    <div className="max-w-md text-center p-8">
                        <div className="flex justify-center mb-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                                <AlertCircle size={32} />
                            </div>
                        </div>
                        <h2 className="text-[22px] font-extrabold text-[#172033]">Access Denied</h2>
                        <p className="mt-2 text-[13px] text-[#7B8497]">{error}</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0475FB] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#035CC9]"
                        >
                            Go to Login
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
            <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

            <Sidebar
                navItems={adminNavItems}
                footerItems={adminFooterItems}
                user={adminUser}
                profilePath="/university-admin/profile"
                onSignOut={handleSignOut}
            />

            <main className="flex-1 overflow-y-auto relative z-10">
                <div className="mx-auto max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
                    <PageHeader
                        loading={isLoading}
                        profile={user}
                        fullName={fullName}
                        studentUser={adminUser}
                        searchValue=""
                        onSearchChange={() => { }}
                        chatBadge={3}
                        notificationBadge={4}
                    />

                    {error && (
                        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[10px] text-[#B42318]">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <header className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033]">
                                University Admin Dashboard
                            </h1>
                            <p className="text-[11px] text-[#7B8497]">
                                Overview of student verifications and platform activity.
                            </p>
                        </div>
                        <span className="text-[11px] text-[#7B8497]">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </header>

                    <section
                        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
                        aria-label="Dashboard statistics"
                    >
                        <StatCard
                            icon={Clock}
                            label="Verification Pending"
                            value={verificationStats.pending}
                            tone="accent"
                        />
                        <StatCard
                            icon={XCircle}
                            label="Rejected"
                            value={verificationStats.rejected}
                            tone="red"
                        />
                        <StatCard
                            icon={CheckCircle2}
                            label="Approved"
                            value={verificationStats.approved}
                            tone="green"
                        />
                        <StatCard
                            icon={Users}
                            label="Total Students"
                            value={platformStats.totalStudents}
                            tone="primary"
                        />
                        <StatCard
                            icon={GraduationCap}
                            label="Total Supervisors"
                            value={platformStats.totalSupervisors}
                            tone="purple"
                        />
                    </section>

                    <section className="mt-6 rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[16px] font-extrabold text-[#172033]">
                                Verification Requests — Last 6 Months
                            </h2>
                        </div>
                        {trend.length > 0 ? (
                            <VerificationTrendChart data={trend} />
                        ) : (
                            <EmptyState
                                icon={Inbox}
                                title="No verification data yet"
                                description="Trend data will appear here once verification requests start coming in."
                            />
                        )}
                    </section>

                    <section className="mt-6 rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[16px] font-extrabold text-[#172033]">
                                Recent Verification Requests
                            </h2>
                        </div>

                        {recentVerifications.length === 0 ? (
                            <div className="mt-4">
                                <EmptyState
                                    title="No requests yet"
                                    description="New student verification requests will show up here."
                                />
                            </div>
                        ) : (
                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full min-w-[560px] border-collapse text-left text-[12px]">
                                    <thead>
                                        <tr className="border-b border-[#E9EDF4] text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                                            <th scope="col" className="py-2 pr-4">Student</th>
                                            <th scope="col" className="py-2 pr-4">Program</th>
                                            <th scope="col" className="py-2 pr-4">Submitted</th>
                                            <th scope="col" className="py-2 pr-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentVerifications.map((row) => (
                                            <tr key={row.id} className="border-b border-[#E9EDF4] last:border-0">
                                                <td className="py-3 pr-4 font-medium text-[#172033]">
                                                    {row.studentName}
                                                </td>
                                                <td className="py-3 pr-4 text-[#7B8497]">{row.program}</td>
                                                <td className="py-3 pr-4 text-[#7B8497]">
                                                    {formatDate(row.submittedDate)}
                                                </td>
                                                <td className="py-3 pr-4">
                                                    <StatusBadge status={row.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}