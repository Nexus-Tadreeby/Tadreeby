// src/components/pages/student/Internships.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    SlidersHorizontal,
    MapPin,
    CalendarDays,
    Users,
    UserRound,
    Clock3,
    ChevronDown,
    LayoutDashboard,
    GraduationCap,
    Settings,
    Briefcase,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import { useAuth } from "../../../context/AuthContext";
import { opportunitiesAPI, profileAPI } from "../../../services/api";
import { useOpportunities } from "../../../hooks/useOpportunities";
import { Button } from "../../common/Button";
import InfoBox from "../../common/InfoBox";
import PageHeader from "../../common/pagesAssets/PageHeader";

// ─── Import global skeleton components ─────────────────────────────
import {
    SkeletonText,
    SkeletonCircle,
    SkeletonRect,
    SkeletonButton,
    SkeletonBadge,
} from "../../common/pagesAssets/Skeleton";

// ─── Constants ──────────────────────────────────────────────────────
const studentNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
    { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
    { label: "Attendance", icon: Clock3, path: "/attendance" },
];

const studentFooterItems = [
    { label: "Settings", icon: Settings, path: "/settings" },
];

const typeOptions = ["All Types", "Remote", "Hybrid", "On-site"];

const typeColors = {
    Remote: { bg: "#EAF3FF", text: "#1677FF" },
    Hybrid: { bg: "#F3F0FF", text: "#7C3AED" },
    "On-site": { bg: "#FFE8E8", text: "#EF4444" },
};

const skillColorPalette = [
    { bg: "#EAF3FF", text: "#1677FF" },
    { bg: "#F0F0FF", text: "#6C5CE7" },
    { bg: "#FFF4E5", text: "#E67E22" },
    { bg: "#E8F8F5", text: "#1ABC9C" },
    { bg: "#FEF3E2", text: "#D97706" },
    { bg: "#ECFDF5", text: "#059669" },
    { bg: "#F3E8FF", text: "#7C3AED" },
    { bg: "#FEF2F2", text: "#DC2626" },
    { bg: "#F0FDF4", text: "#16A34A" },
    { bg: "#FFF7ED", text: "#EA580C" },
];

function getSkillColor(skill, index) {
    return skillColorPalette[index % skillColorPalette.length];
}

function getOpportunityType(type) {
    switch (type) {
        case "REMOTE": return "Remote";
        case "HYBRID": return "Hybrid";
        case "ONSITE": return "On-site";
        default: return type;
    }
}

// ─── Normalize profile response ─────────────────────────────────────
function normalizeProfileResponse(response) {
    const data = response?.data ?? response;
    const user = data?.user ?? {};
    return {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        avatar: user?.profileImage ?? "",
        university: data?.university?.name ?? "",
        major: data?.major ?? "",
    };
}

// ─── Skeleton Internship Card ──────────────────────────────────────
const SkeletonInternshipCard = () => (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="relative h-44 overflow-hidden bg-gray-200 animate-pulse" />
        <div className="p-5">
            <SkeletonText className="h-6 w-3/4" />
            <div className="mt-4 flex items-center gap-2">
                <SkeletonCircle className="h-6 w-6" />
                <SkeletonText className="h-4 w-1/2" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-y border-gray-100 py-4">
                <div>
                    <SkeletonText className="h-3 w-1/2" />
                    <SkeletonText className="mt-1 h-4 w-3/4" />
                </div>
                <div>
                    <SkeletonText className="h-3 w-1/2" />
                    <SkeletonText className="mt-1 h-4 w-3/4" />
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <SkeletonText className="h-4 w-1/2" />
                <SkeletonText className="h-4 w-1/2" />
            </div>
            <div className="mt-4">
                <SkeletonText className="h-3 w-1/3" />
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {[...Array(3)].map((_, i) => (
                        <SkeletonBadge key={i} className="h-6 w-16 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
        <div className="border-t border-gray-100 px-5 pb-5 pt-4">
            <div className="grid grid-cols-2 gap-3">
                <SkeletonButton className="h-10 w-full rounded-xl" />
                <SkeletonButton className="h-10 w-full rounded-xl" />
            </div>
        </div>
    </div>
);

// ─── Skeleton Hero ──────────────────────────────────────────────────
const SkeletonHero = () => (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
            <SkeletonText className="h-8 w-64" />
            <SkeletonText className="mt-1 h-4 w-96" />
        </div>
        <div className="rounded-xl bg-blue-50/50 px-4 py-3 ring-1 ring-blue-100">
            <SkeletonText className="h-6 w-12 mx-auto" />
            <SkeletonText className="mt-1 h-3 w-20 mx-auto" />
        </div>
    </div>
);

// ─── Internship Card ────────────────────────────────────────────────
function InternshipCard({ internship, onApply, applying, onViewDetails }) {
    const type = getOpportunityType(internship.type);
    const typeColor = typeColors[type] || { bg: "#E5E7EB", text: "#374151" };
    const trainer = internship.internships?.[0]?.trainer;
    const trainerName = trainer ? `${trainer.firstName} ${trainer.lastName}` : null;

    return (
        <div
            onClick={() => onViewDetails?.(internship.id)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
        >
            <div className="relative h-44 overflow-hidden bg-gray-100">
                {internship.company?.logo && (
                    <img
                        src={internship.company.logo}
                        alt={internship.company?.name || ""}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
                    {internship.title}
                </div>
                <div
                    className="absolute right-3 top-3 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm"
                    style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
                >
                    {type}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="p-5">
                <h3 className="mb-4 text-lg font-bold leading-snug text-gray-900">
                    {internship.title}
                </h3>

                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1677FF]">
                        <UserRound size={16} />
                    </div>
                    <div>
                        <span className="text-sm font-semibold text-gray-700">
                            {internship.company?.name}
                        </span>
                        {trainerName && (
                            <p className="text-sm text-gray-500">{trainerName}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-gray-100 py-4">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <div>
                            <p className="text-[10px] text-gray-400">Available Seats</p>
                            <p className="text-sm font-semibold text-gray-700">
                                {internship.totalSeats} seats
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <div>
                            <p className="text-[10px] text-gray-400">Location</p>
                            <p className="text-sm font-semibold text-gray-700">
                                {internship.location || "Remote"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                        <p className="mb-1 text-[10px] text-gray-400">Start Date</p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                            <CalendarDays size={14} className="text-[#1677FF]" />
                            {internship.startDate || "Open now"}
                        </div>
                    </div>
                    <div>
                        <p className="mb-1 text-[10px] text-gray-400">End Date</p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                            <CalendarDays size={14} className="text-gray-400" />
                            {internship.endDate || "Flexible"}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="mb-2 text-xs font-medium text-gray-400">Required Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(internship.requiredSkills) &&
                            internship.requiredSkills.map((skill, idx) => {
                                const color = getSkillColor(skill, idx);
                                return (
                                    <span
                                        key={`${skill}-${idx}`}
                                        className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                                        style={{ backgroundColor: color.bg, color: color.text }}
                                    >
                                        {skill}
                                    </span>
                                );
                            })}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant={internship.applied ? "gold" : "blue"}
                        disabled={applying || internship.applied}
                        className="w-full justify-center py-3 text-sm font-semibold"
                        onClick={(event) => {
                            event.stopPropagation();
                            onApply?.(internship.id);
                        }}
                    >
                        {internship.applied ? "Applied" : applying ? "Applying..." : "Apply"}
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full justify-center py-3 text-sm font-semibold"
                        onClick={(event) => {
                            event.stopPropagation();
                            onViewDetails?.(internship.id);
                        }}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function Opportunities() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    // ─── Data from hooks ─────────────────────────────────────────────
    const { opportunities, loading: loadingOpportunities, error: opportunitiesError } = useOpportunities();

    // ─── Profile state ──────────────────────────────────────────────
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState("");

    // ─── Filter state ────────────────────────────────────────────────
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Fields");
    const [selectedType, setSelectedType] = useState("All Types");
    const [categories, setCategories] = useState(["All Fields"]);

    // ─── Applying state ──────────────────────────────────────────────
    const [applyingId, setApplyingId] = useState(null);

    // ─── Compute categories from opportunities ──────────────────────
    useEffect(() => {
        const uniqueFields = [...new Set(opportunities.map((item) => item.title).filter(Boolean))];
        setCategories(["All Fields", ...uniqueFields]);
        if (selectedCategory !== "All Fields" && !uniqueFields.includes(selectedCategory)) {
            setSelectedCategory("All Fields");
        }
    }, [opportunities, selectedCategory]);

    // ─── Fetch profile ──────────────────────────────────────────────
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await profileAPI.getProfile();
                const normalized = normalizeProfileResponse(profileResponse);
                setProfile(normalized);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setProfileError(err?.message || "Could not load profile.");
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfile();
    }, []);

    // ─── Filtered opportunities ──────────────────────────────────────
    const filteredOpportunities = opportunities.filter((internship) => {
        const searchableText = [
            internship.title,
            internship.company?.name,
            internship.location,
            internship.type,
            internship.duration,
            ...(Array.isArray(internship.requiredSkills) ? internship.requiredSkills : []),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch = !searchTerm || searchableText.includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All Fields" ||
            internship.title === selectedCategory ||
            internship.title?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            internship.company?.name?.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesType =
            selectedType === "All Types" || getOpportunityType(internship.type) === selectedType;

        return matchesSearch && matchesCategory && matchesType;
    });

    // ─── Handlers ──────────────────────────────────────────────────
    const handleApply = async (opportunityId) => {
        try {
            setApplyingId(opportunityId);
            await opportunitiesAPI.applyForOpportunity(opportunityId);
            // Update local state to reflect "applied" status
            // Note: This won't persist across re-fetch; the hook would need a refresh mechanism
            // For now, we just update the UI optimistically.
        } catch (err) {
            console.error("Failed to apply:", err);
            // Could show a toast or set an error state
        } finally {
            setApplyingId(null);
        }
    };

    const handleViewDetails = (internshipId) => {
        navigate(`/student/opportunities/${internshipId}`);
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    // ─── Build studentUser ──────────────────────────────────────────
    const fullName = profile
        ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
        : `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student";

    const studentUser = {
        name: fullName,
        role: "Student",
        avatar: profile?.avatar || user?.profileImage || "",
    };

    const isLoading = loadingProfile || loadingOpportunities;
    const error = profileError || opportunitiesError;

    // ─── Render ────────────────────────────────────────────────────
    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

            <Sidebar
                navItems={studentNavItems}
                footerItems={studentFooterItems}
                user={studentUser}
                profilePath="/student/profile"
                onSignOut={handleSignOut}
            />

            <main className="flex-1 overflow-y-auto scroll-smooth relative z-10">
                <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
                    <PageHeader
                        loading={isLoading}
                        profile={profile}
                        fullName={fullName}
                        studentUser={studentUser}
                        searchValue={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                        chatBadge={9}
                        notificationBadge={5}
                    />

                    {/* Hero Section */}
                    <div className="mb-5">
                        {isLoading ? (
                            <SkeletonHero />
                        ) : (
                            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-[#1677FF]">
                                        Browse Internships
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Find training opportunities that match your skills and career goals.
                                    </p>
                                </div>
                                <div>
                                    <InfoBox variant="blue" className="text-xs text-[#1677FF]">
                                        <p className="text-xl font-bold text-[#1677FF]">
                                            {filteredOpportunities.length}
                                        </p>
                                        Available Opportunities
                                    </InfoBox>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filter bar */}
                    <div className="mb-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md p-5 shadow-sm transition hover:shadow-md">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div className="relative flex-1">
                                {isLoading ? (
                                    <SkeletonRect className="h-11 rounded-full" />
                                ) : (
                                    <>
                                        <Search
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search internships, companies, skills..."
                                            className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
                                        />
                                    </>
                                )}
                            </div>

                            {isLoading ? (
                                <SkeletonRect className="h-11 w-48 rounded-full" />
                            ) : (
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="flex h-11 items-center justify-between gap-8 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-600 outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
                                >
                                    {typeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {isLoading ? (
                                <SkeletonButton className="h-11 w-32 rounded-full" />
                            ) : (
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory("All Fields");
                                        setSelectedType("All Types");
                                    }}
                                    className="flex h-11 items-center justify-center gap-2 px-5 text-sm"
                                >
                                    <SlidersHorizontal size={16} />
                                    Clear Filters
                                </Button>
                            )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-1">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <SkeletonBadge key={i} className="h-8 w-20 rounded-lg" />
                                ))
                            ) : (
                                categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition ${selectedCategory === category
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {error && <InfoBox variant="orange" className="mb-4">{error}</InfoBox>}

                    {isLoading ? (
                        <>
                            <div className="mb-4 flex items-center justify-between">
                                <SkeletonText className="h-4 w-32" />
                                <SkeletonText className="h-4 w-24" />
                            </div>
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonInternshipCard key={i} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-900">
                                        {filteredOpportunities.length}
                                    </span>{" "}
                                    internship opportunities
                                </p>
                                <button className="hidden items-center gap-2 text-sm text-gray-500 md:flex">
                                    <Clock3 size={15} />
                                    Recently added
                                    <ChevronDown size={14} />
                                </button>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {filteredOpportunities.length > 0 ? (
                                    filteredOpportunities.map((internship) => (
                                        <InternshipCard
                                            key={internship.id}
                                            internship={internship}
                                            onApply={handleApply}
                                            onViewDetails={handleViewDetails}
                                            applying={applyingId === internship.id}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                                        No internships match your current filters.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}