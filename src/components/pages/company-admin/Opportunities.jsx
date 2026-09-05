// src/components/pages/company-admin/Opportunities.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    Plus,
    Edit,
    Trash2,
    AlertCircle,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/Button";
import { companyAdminAPI } from "../../../services/api";

// ─── Navigation Items (نفس اللي في CompanyDashboard) ──────────────
const companyNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/company/admin/dashboard" },
    { label: "Opportunities", icon: Briefcase, path: "/company/admin/opportunities" },
    { label: "Trainers", icon: Users, path: "/company/admin/trainers" },
];
const companyFooterItems = [{ label: "Settings", icon: Settings, path: "/company/admin/settings" }];

export default function Opportunities() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [opportunities, setOpportunities] = useState([]);

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Company Admin";
    const companyUser = {
        name: fullName,
        role: "Company Admin",
        avatar: user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    const fetchOpportunities = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await companyAdminAPI.getOpportunities(1, 10);
            setOpportunities(response?.data || []);
        } catch (err) {
            console.error("Failed to fetch opportunities:", err);
            setError(err?.message || "Failed to load opportunities.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this opportunity?")) return;
        try {
            await companyAdminAPI.deleteOpportunity(id);
            await fetchOpportunities();
        } catch (err) {
            console.error("Failed to delete opportunity:", err);
            alert(err?.message || "Failed to delete opportunity.");
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
            <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

            <Sidebar
                navItems={companyNavItems}
                footerItems={companyFooterItems}
                user={companyUser}
                profilePath="/company/admin/profile"
                onSignOut={handleSignOut}
                brandPath="/company/admin/dashboard"
                storageKey="sidebar-company-admin"
            />

            <main className="flex-1 overflow-y-auto relative z-10">
                <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
                    <PageHeader
                        loading={loading}
                        profile={user}
                        fullName={fullName}
                        studentUser={companyUser}
                        searchValue=""
                        onSearchChange={() => { }}
                        chatBadge={3}
                        notificationBadge={4}
                    />

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033]">
                                Training Opportunities
                            </h1>
                            <p className="text-[11px] text-[#7B8497]">
                                Manage your company's training opportunities
                            </p>
                        </div>
                        <Button
                            variant="blue"
                            onClick={() => navigate("/company/admin/opportunities/create")}
                            className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-bold"
                        >
                            <Plus size={16} strokeWidth={2} />
                            Add Opportunity
                        </Button>
                    </div>

                    {error && (
                        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[10px] text-[#B42318]">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="mt-6 flex justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1677FF] border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {opportunities.length === 0 ? (
                                <div className="col-span-full text-center py-12 text-[#7B8497]">
                                    No opportunities found. Create your first one!
                                </div>
                            ) : (
                                opportunities.map((opp) => (
                                    <div
                                        key={opp.id}
                                        className="border border-[#E9EDF4] rounded-xl p-4 hover:shadow-md transition bg-white"
                                    >
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-[14px] font-extrabold text-[#172033]">
                                                {opp.title}
                                            </h4>
                                            <span
                                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${opp.totalSeats > 0
                                                        ? "bg-[#EAF9EF] text-[#22C55E]"
                                                        : "bg-[#FEF0F0] text-[#EF4444]"
                                                    }`}
                                            >
                                                {opp.totalSeats > 0 ? `${opp.totalSeats} seats` : "Full"}
                                            </span>
                                        </div>
                                        <div className="mt-2 space-y-1.5 text-[12px] text-[#7B8497]">
                                            <div>Type: {opp.type || "Not specified"}</div>
                                            <div className="text-[11px] line-clamp-1">
                                                Skills: {opp.requiredSkills || "None listed"}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E9EDF4]">
                                            <button
                                                onClick={() => navigate(`/company/admin/opportunities/${opp.id}/edit`)}
                                                className="flex items-center gap-1 text-[#0475FB] hover:bg-[#EAF3FF] px-3 py-1.5 rounded-lg text-[12px] font-medium transition"
                                            >
                                                <Edit size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(opp.id)}
                                                className="flex items-center gap-1 text-[#EF4444] hover:bg-[#FEF0F0] px-3 py-1.5 rounded-lg text-[12px] font-medium transition"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}