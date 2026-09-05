// src/components/pages/company/CreateTrainer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Settings,
    Users,
    Briefcase,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/Button";
import { companyAdminAPI } from "../../../services/api";

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

// ─── Navigation Items ──────────────────────────────────────────────
const companyNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/company/admin/dashboard" },
    { label: "Opportunities", icon: Briefcase, path: "/company/admin/opportunities" },
    { label: "Trainers", icon: Users, path: "/company/admin/trainers" },
];
const companyFooterItems = [{ label: "Settings", icon: Settings, path: "/company/admin/settings" }];

export default function CreateTrainer() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        personalID: "",
        position: "",
        specialization: "",
        password: "Password123!",
        isActive: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim() || null,
                personalID: parseInt(formData.personalID) || 0,
                position: formData.position.trim() || null,
                specialization: formData.specialization.trim() || null,
                password: formData.password.trim(),
                isActive: formData.isActive,
            };

            console.log("📦 Sending payload:", payload);

            await companyAdminAPI.createTrainer(payload);
            navigate("/company/admin/trainers");
        } catch (err) {
            console.error("❌ Failed to create trainer:", err);
            setError(err?.message || "Failed to create trainer. Please try again.");
        } finally {
            setLoading(false);
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
                        loading={false}
                        profile={user}
                        fullName={fullName}
                        studentUser={companyUser}
                        searchValue=""
                        onSearchChange={() => { }}
                        chatBadge={3}
                        notificationBadge={4}
                    />

                    <button
                        onClick={() => navigate("/company/admin/trainers")}
                        className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#7B8497] hover:text-[#0475FB] transition"
                    >
                        <ArrowLeft size={15} />
                        Back to Trainers
                    </button>

                    <div className="mt-4">
                        <h1 className="text-[22px] font-extrabold tracking-tight text-[#172033]">Add Trainer</h1>
                        <p className="text-[11px] text-[#7B8497]">Create a new trainer profile for your company</p>
                    </div>

                    {error && (
                        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[10px] text-[#B42318]">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                        <div className="rounded-[18px] border bg-white p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* First Name */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="e.g. Ahmed"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="e.g. Mohammed"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="trainer@company.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="+966 5xxxxxxx"
                                    />
                                </div>

                                {/* Personal ID */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Personal ID *</label>
                                    <input
                                        type="number"
                                        name="personalID"
                                        value={formData.personalID}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="123456789"
                                    />
                                </div>

                                {/* Position */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Position</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                </div>

                                {/* Specialization */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Specialization</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="e.g. Full Stack Development"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#7B8497] mb-1">Password *</label>
                                    <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-[#E9EDF4] bg-[#F5F7FB] px-4 py-2.5 text-sm text-[#172033] outline-none focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB] transition"
                                        placeholder="Default: Password123!"
                                    />
                                    <p className="mt-1 text-[10px] text-[#7B8497]">Default password is <strong>Password123!</strong></p>
                                </div>

                                {/* Active */}
                                <div className="flex items-center gap-3 mt-2">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-[#E9EDF4] text-[#0475FB] focus:ring-[#0475FB]"
                                    />
                                    <label className="text-[11px] font-medium text-[#7B8497]">Active</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                variant="blue"
                                disabled={loading}
                                className="px-6 py-2.5 text-[13px] font-bold"
                            >
                                {loading ? "Creating..." : "Add Trainer"}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/company/admin/trainers")}
                                className="px-6 py-2.5 text-[13px] font-bold"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}