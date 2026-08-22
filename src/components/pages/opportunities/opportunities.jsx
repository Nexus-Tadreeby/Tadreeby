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
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
import { useAuth } from "../../../context/AuthContext";
import { opportunitiesAPI } from "../../../services/api";
import { Button } from "../../common/Button";
import InfoBox from "../../common/InfoBox";

const studentNavItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/student/dashboard",
    },
    {
        label: "Opportunities",
        icon: Briefcase,
        path: "/student/opportunities",
    },
    {
        label: "My Internship",
        icon: GraduationCap,
        path: "/my/internship",
    },
    {
        label: "Attendance",
        icon: Clock3,
        path: "/attendance",
    },
];

const studentFooterItems = [
    {
        label: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

const typeOptions = ["All Types", "Remote", "Hybrid", "On-site"];

const typeColors = {
    Remote: {
        bg: "#EAF3FF",
        text: "#1677FF",
    },
    Hybrid: {
        bg: "#F3F0FF",
        text: "#7C3AED",
    },
    "On-site": {
        bg: "#FFE8E8",
        text: "#EF4444",
    },
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
        case "REMOTE":
            return "Remote";

        case "HYBRID":
            return "Hybrid";

        case "ONSITE":
            return "On-site";

        default:
            return type;
    }
}

function InternshipCard({
    internship,
    onApply,
    applying,
    onViewDetails,
}) {
    const type = getOpportunityType(internship.type);

    const typeColor = typeColors[type] || {
        bg: "#E5E7EB",
        text: "#374151",
    };

    const trainer = internship.internships?.[0]?.trainer;

    const trainerName = trainer
        ? `${trainer.firstName} ${trainer.lastName}`
        : null;

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
                    style={{
                        backgroundColor: typeColor.bg,
                        color: typeColor.text,
                    }}
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
                            <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                {trainerName}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-gray-100 py-4">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />

                        <div>
                            <p className="text-[10px] text-gray-400">
                                Available Seats
                            </p>

                            <p className="text-sm font-semibold text-gray-700">
                                {internship.totalSeats} seats
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />

                        <div>
                            <p className="text-[10px] text-gray-400">
                                Location
                            </p>

                            <p className="text-sm font-semibold text-gray-700">
                                {internship.location}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div>
                                         <p className="mb-1 text-[10px] text-gray-400">Start Date</p>
                                         <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                             <CalendarDays size={14} className="text-[#1677FF]" />
                                             {internship.startDate}
                                        </div>
                                    </div>
                                     <div>
                                        <p className="mb-1 text-[10px] text-gray-400">End Date</p>
                                         <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                             <CalendarDays size={14} className="text-gray-400" />
                                             {internship.endDate}
                                         </div>
                                     </div>
                                 </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    {/* <div>
                        <p className="mb-1 text-[10px] text-gray-400">
                            Duration
                        </p>

                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                            <CalendarDays
                                size={14}
                                className="text-[#1677FF]"
                            />

                            {internship.duration}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-[10px] text-gray-400">
                            Type
                        </p>

                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                            <Clock3
                                size={14}
                                className="text-gray-400"
                            />

                            {type}
                        </div>
                    </div> */}
                </div>

                <div className="mt-4">
                    <p className="mb-2 text-xs font-medium text-gray-400">
                        Required Skills
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(internship.requiredSkills) &&
                            internship.requiredSkills.map((skill, idx) => {
                                const color = getSkillColor(skill, idx);

                                return (
                                    <span
                                        key={`${skill}-${idx}`}
                                        className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                                        style={{
                                            backgroundColor: color.bg,
                                            color: color.text,
                                        }}
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
                        {internship.applied
                            ? "Applied"
                            : applying
                                ? "Applying..."
                                : "Apply"}
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

export default function Internships() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [applyingId, setApplyingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All Fields");
    const [selectedType, setSelectedType] =
        useState("All Types");

    const [categories, setCategories] =
        useState(["All Fields"]);

    const filteredInternships = internships.filter((internship) => {
        const searchableText = [
            internship.title,
            internship.company?.name,
            internship.location,
            internship.type,
            internship.duration,
            ...(Array.isArray(internship.requiredSkills)
                ? internship.requiredSkills
                : []),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !searchTerm ||
            searchableText.includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All Fields" ||
            internship.title === selectedCategory ||
            internship.title
                ?.toLowerCase()
                .includes(selectedCategory.toLowerCase()) ||
            internship.company?.name
                ?.toLowerCase()
                .includes(selectedCategory.toLowerCase());

        const matchesType =
            selectedType === "All Types" ||
            getOpportunityType(internship.type) === selectedType;

        return matchesSearch && matchesCategory && matchesType;
    });

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await opportunitiesAPI.getAvailableOpportunities();

                const list = Array.isArray(response?.data)
                    ? response.data
                    : [];

                setInternships(list);

                const uniqueFields = [
                    ...new Set(
                        list
                            .map((item) => item.title)
                            .filter(Boolean),
                    ),
                ];

                setCategories([
                    "All Fields",
                    ...uniqueFields,
                ]);

                if (
                    selectedCategory !== "All Fields" &&
                    !uniqueFields.includes(selectedCategory)
                ) {
                    setSelectedCategory("All Fields");
                }
            } catch (err) {
                console.error(
                    "Failed to fetch internships:",
                    err,
                );

                setError(
                    err?.message ||
                    "Could not load internships right now.",
                );

                setCategories(["All Fields"]);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleApply = async (opportunityId) => {
        try {
            setApplyingId(opportunityId);

            await opportunitiesAPI.applyForOpportunity(
                opportunityId,
            );

            setInternships((current) =>
                current.map((internship) =>
                    internship.id === opportunityId
                        ? {
                            ...internship,
                            applied: true,
                        }
                        : internship,
                ),
            );
        } catch (err) {
            console.error("Failed to apply:", err);

            setError(
                err?.message ||
                "Unable to apply for this internship.",
            );
        } finally {
            setApplyingId(null);
        }
    };

    const studentUser = {
        name:
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
            "Student",

        role: "Student",

        avatar: user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    const handleViewDetails = (internshipId) => {
        navigate(`/student/opportunities/${internshipId}`);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60 bg-fixed font-sans text-gray-900">
            <Sidebar
                navItems={studentNavItems}
                footerItems={studentFooterItems}
                user={studentUser}
                profilePath="/student/profile"
                onSignOut={handleSignOut}
            />

            <main className="flex-1 overflow-y-auto scroll-smooth">
                <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
                    <header className="mb-6 flex items-center justify-between gap-4">
                        <div className="relative w-full max-w-[540px]">
                        </div>

                        <TopIconCluster
                            chatBadge={9}
                            notificationBadge={5}
                            avatarUrl={studentUser.avatar}
                            userName={studentUser.name}
                        />
                    </header>

                    <div className="mb-5 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-[#1677FF]">
                                    Browse Internships
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Find training opportunities that
                                    match your skills and career goals.
                                </p>
                            </div>

                            <div>
                                <InfoBox
                                    variant="blue"
                                    className="text-xs text-[#1677FF]"
                                >
                                    <p className="text-xl font-bold text-[#1677FF]">
                                        {filteredInternships.length}
                                    </p>

                                    Available Opportunities
                                </InfoBox>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm transition hover:shadow-md">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Search internships, companies, skills..."
                                    className="h-11 w-full rounded-4xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
                                />
                            </div>

                            <select
                                value={selectedType}
                                onChange={(event) =>
                                    setSelectedType(
                                        event.target.value,
                                    )
                                }
                                className="flex h-11 items-center justify-between gap-8 rounded-4xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-600 outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
                            >
                                {typeOptions.map((typeOption) => (
                                    <option
                                        key={typeOption}
                                        value={typeOption}
                                    >
                                        {typeOption}
                                    </option>
                                ))}
                            </select>

                            <Button
                                variant="primary"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory(
                                        "All Fields",
                                    );
                                    setSelectedType("All Types");
                                }}
                                className="flex h-11 items-center justify-center gap-2 px-5 text-sm"
                            >
                                <SlidersHorizontal size={16} />
                                Clear Filters
                            </Button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition ${selectedCategory === category
                                            ? "bg-gray-900 text-white shadow-md"
                                            : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <InfoBox
                            variant="orange"
                            className="mb-4"
                        >
                            {error}
                        </InfoBox>
                    )}

                    {loading ? (
                        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
                            Loading internships...
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-900">
                                        {filteredInternships.length}
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
                                {filteredInternships.length > 0 ? (
                                    filteredInternships.map(
                                        (internship) => (
                                            <InternshipCard
                                                key={internship.id}
                                                internship={internship}
                                                onApply={handleApply}
                                                onViewDetails={
                                                    handleViewDetails
                                                }
                                                applying={
                                                    applyingId ===
                                                    internship.id
                                                }
                                            />
                                        ),
                                    )
                                ) : (
                                    <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                                        No internships match your
                                        current filters.
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



