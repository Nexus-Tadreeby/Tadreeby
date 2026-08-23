// // InternshipDetails.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//     ArrowLeft,
//     BriefcaseBusiness,
//     CalendarDays,
//     CheckCircle2,
//     Clock3,
//     MapPin,
//     Users,
//     UserRound,
//     FileText,
//     Briefcase,
//     GraduationCap,
//     Settings,
//     LayoutDashboard,
//     Sparkles,
// } from "lucide-react";
// import Sidebar from "../../layout/Sidebar";
// import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
// import { useAuth } from "../../../context/AuthContext";
// import { opportunitiesAPI } from "../../../services/api";
// import { Button } from "../../common/Button";
// import InfoBox from "../../common/InfoBox";

// const studentNavItems = [
//     { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
//     { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
//     { label: "My Internship", icon: GraduationCap, path: "/my/internship" },
//     { label: "Attendance", icon: Clock3, path: "/attendance" },
// ];

// const studentFooterItems = [
//     { label: "Settings", icon: Settings, path: "/settings" },
// ];

// const typeColors = {
//     Remote: { bg: "#EAF3FF", text: "#1677FF" },
//     Hybrid: { bg: "#F3F0FF", text: "#7C3AED" },
//     "On-site": { bg: "#FFE8E8", text: "#EF4444" },
// };

// const skillColorPalette = [
//     { bg: "#EAF3FF", text: "#1677FF" },
//     { bg: "#F0F0FF", text: "#6C5CE7" },
//     { bg: "#FFF4E5", text: "#E67E22" },
//     { bg: "#E8F8F5", text: "#1ABC9C" },
//     { bg: "#FEF3E2", text: "#D97706" },
//     { bg: "#ECFDF5", text: "#059669" },
//     { bg: "#F3E8FF", text: "#7C3AED" },
//     { bg: "#FEF2F2", text: "#DC2626" },
//     { bg: "#F0FDF4", text: "#16A34A" },
//     { bg: "#FFF7ED", text: "#EA580C" },
// ];

// function getSkillColor(skill, index) {
//     return skillColorPalette[index % skillColorPalette.length];
// }

// // دوال localStorage للحفاظ على حالة التقديم (نفسها المستخدمة في Internships)
// const getAppliedIds = () => {
//     try {
//         const stored = localStorage.getItem('appliedInternships');
//         return stored ? JSON.parse(stored) : [];
//     } catch {
//         return [];
//     }
// };

// const addAppliedId = (id) => {
//     const ids = getAppliedIds();
//     if (!ids.includes(id)) {
//         ids.push(id);
//         localStorage.setItem('appliedInternships', JSON.stringify(ids));
//     }
// };

// const isAppliedId = (id) => getAppliedIds().includes(id);

// export default function InternshipDetails() {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { logout, user } = useAuth();
//     const [internship, setInternship] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [applying, setApplying] = useState(false);

//     useEffect(() => {
//         const fetchDetails = async () => {
//             if (!id) {
//                 setError("Internship not found.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 setLoading(true);
//                 setError("");

//                 // استخدام الدالة الصحيحة من الـ API
//                 const response = await opportunitiesAPI.getInternshipDetails(id);
//                 const detail = response?.data || response;

//                 if (!detail) {
//                     throw new Error("Internship details are not available.");
//                 }

//                 // التحقق من حالة التقديم من localStorage
//                 const applied = isAppliedId(Number(id));

//                 // تطبيع البيانات
//                 const normalized = {
//                     id: detail.id ?? Number(id),
//                     internship: detail.internship || detail.title || "Internship",
//                     company: detail.company?.name || detail.company || "Company",
//                     companyName: detail.company?.name || detail.company || "Company",
//                     field: detail.field || detail.title || "General",
//                     type: detail.type === "REMOTE" ? "Remote" : detail.type === "HYBRID" ? "Hybrid" : detail.type === "ONSITE" ? "On-site" : detail.type || "Remote",
//                     trainer: detail.trainer?.firstName || detail.trainer?.name || detail.trainer || "Company Team",
//                     location: detail.location || "Remote",
//                     seats: detail.seats ?? detail.totalSeats ?? 0,
//                     requiredSkills: detail.requiredSkills || detail.skills || [],
//                     startDate: detail.startDate || "Open now",
//                     endDate: detail.endDate || detail.duration || "Flexible",
//                     description: detail.description || "No description provided yet.",
//                     image: detail.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
//                     stats: detail.stats || {},
//                     tasks: detail.tasks || [],
//                     attendance: detail.attendance || [],
//                     evaluations: detail.evaluations || [],
//                     applied: applied || detail.applied || false,
//                 };

//                 setInternship(normalized);
//             } catch (err) {
//                 console.error("Failed to load internship details:", err);
//                 setError(err?.message || "Unable to load internship details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDetails();
//     }, [id]);

//     const handleApply = async () => {
//         if (!internship) return;

//         // تحقق من localStorage أولاً
//         if (isAppliedId(internship.id)) {
//             alert("You have already applied for this internship.");
//             return;
//         }

//         try {
//             setApplying(true);
//             await opportunitiesAPI.applyForOpportunity(internship.id);
//             // حفظ في localStorage
//             addAppliedId(internship.id);
//             // تحديث الحالة المحلية
//             setInternship((current) => ({ ...current, applied: true }));
//         } catch (err) {
//             console.error("Failed to apply:", err);
//             setError(err?.message || "Unable to apply for this internship.");
//         } finally {
//             setApplying(false);
//         }
//     };

//     const studentUser = {
//         name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student",
//         role: "Student",
//         avatar: user?.profileImage || "",
//     };

//     const progressPercent = useMemo(() => {
//         if (!internship?.stats) return 0;
//         return Math.round(internship.stats.progress || internship.stats.completedTasks && internship.stats.totalTasks
//             ? (internship.stats.completedTasks / internship.stats.totalTasks) * 100
//             : 0);
//     }, [internship]);

//     const typeColor = typeColors[internship?.type] || { bg: "#E5E7EB", text: "#374151" };

//     const handleSignOut = () => {
//         logout();
//         navigate("/login");
//     };

//     return (
//         <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60 bg-fixed font-sans text-gray-900">
//             <Sidebar
//                 navItems={studentNavItems}
//                 footerItems={studentFooterItems}
//                 user={studentUser}
//                 profilePath="/student/profile"
//                 onSignOut={handleSignOut}
//             />

//             <main className="flex-1 overflow-y-auto scroll-smooth">
//                 <div className="mx-auto w-full max-w-[1200px] px-5 py-5 sm:px-8 sm:py-7">
//                     <header className="mb-6 flex items-center justify-between gap-4">
//                         <Button
//                             variant="secondary"
//                             className="px-4 py-2.5 text-sm"
//                             onClick={() => navigate("/student/opportunities")}
//                             icon={<ArrowLeft size={16} />}
//                         >
//                             Back to opportunities
//                         </Button>

//                         <TopIconCluster
//                             chatBadge={3}
//                             notificationBadge={2}
//                             avatarUrl={studentUser.avatar}
//                             userName={studentUser.name}
//                         />
//                     </header>

//                     {error && (
//                         <InfoBox variant="orange" className="mb-5">
//                             {error}
//                         </InfoBox>
//                     )}

//                     {loading ? (
//                         <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
//                             Loading internship details...
//                         </div>
//                     ) : internship ? (
//                         <div className="space-y-6">
//                             <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//                                 <div className="relative h-72 w-full overflow-hidden">
//                                     <img
//                                         src={internship.image}
//                                         alt={internship.internship}
//                                         className="h-full w-full object-cover"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

//                                     <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
//                                         {internship.field}
//                                     </div>

//                                     <div
//                                         className="absolute right-5 top-5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm"
//                                         style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
//                                     >
//                                         {internship.type}
//                                     </div>

//                                     <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                                         <p className="mb-2 text-sm font-medium text-blue-100">{internship.companyName}</p>
//                                         <h1 className="text-3xl font-extrabold tracking-tight">{internship.internship}</h1>
//                                     </div>
//                                 </div>

//                                 <div className="p-6">
//                                     <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                                         <div className="flex items-start gap-3">
//                                             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <UserRound size={22} />
//                                             </div>
//                                             <div>
//                                                 <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Trainer</p>
//                                                 <p className="text-lg font-semibold text-gray-900">{internship.trainer}</p>
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-wrap items-center gap-3">
//                                             <Button
//                                                 variant={internship.applied ? "gold" : "blue"}
//                                                 disabled={applying || internship.applied}
//                                                 onClick={handleApply}
//                                                 className="px-6 py-3 text-sm"
//                                             >
//                                                 {internship.applied ? "✓ Applied" : applying ? "Applying..." : "Apply now"}
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
//                                 <div className="space-y-6">
//                                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-2">
//                                             <Sparkles className="h-5 w-5 text-[#1677FF]" />
//                                             <h2 className="text-xl font-bold text-gray-900">Overview</h2>
//                                         </div>
//                                         <p className="leading-7 text-gray-600">{internship.description}</p>
//                                     </div>

//                                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-2">
//                                             <FileText className="h-5 w-5 text-[#1677FF]" />
//                                             <h2 className="text-xl font-bold text-gray-900">Required Skills</h2>
//                                         </div>

//                                         <div className="flex flex-wrap gap-2">
//                                             {(internship.requiredSkills || []).map((skill, idx) => {
//                                                 const color = getSkillColor(skill, idx);
//                                                 return (
//                                                     <span
//                                                         key={skill}
//                                                         className="rounded-lg px-2.5 py-1.5 text-xs font-semibold"
//                                                         style={{ backgroundColor: color.bg, color: color.text }}
//                                                     >
//                                                         {skill}
//                                                     </span>
//                                                 );
//                                             })}
//                                         </div>
//                                     </div>

//                                     <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-2">
//                                             <Briefcase className="h-5 w-5 text-[#1677FF]" />
//                                             <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
//                                         </div>

//                                         {Array.isArray(internship.tasks) && internship.tasks.length > 0 ? (
//                                             <div className="space-y-3">
//                                                 {internship.tasks.map((task) => (
//                                                     <div key={task.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
//                                                         <div className="flex items-center justify-between gap-3">
//                                                             <p className="font-semibold text-gray-900">{task.title || task.name || "Task"}</p>
//                                                             <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-[#1677FF]">
//                                                                 {task.status || "Open"}
//                                                             </span>
//                                                         </div>
//                                                         {task.description && (
//                                                             <p className="mt-2 text-sm text-gray-600">{task.description}</p>
//                                                         )}
//                                                         {task.deadline && (
//                                                             <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                                                                 <CalendarDays size={14} />
//                                                                 {new Date(task.deadline).toLocaleDateString()}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <p className="text-sm text-gray-500">No tasks have been assigned yet.</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="space-y-6">
//                                     <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//                                         <h3 className="mb-4 text-lg font-bold text-gray-900">Opportunity details</h3>

//                                         <div className="space-y-4">
//                                             <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
//                                                 <BriefcaseBusiness className="h-4 w-4 text-[#1677FF]" />
//                                                 <div>
//                                                     <p className="text-[10px] uppercase tracking-wide text-gray-400">Company</p>
//                                                     <p className="font-medium text-gray-800">{internship.companyName}</p>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
//                                                 <MapPin className="h-4 w-4 text-[#1677FF]" />
//                                                 <div>
//                                                     <p className="text-[10px] uppercase tracking-wide text-gray-400">Location</p>
//                                                     <p className="font-medium text-gray-800">{internship.location}</p>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
//                                                 <Users className="h-4 w-4 text-[#1677FF]" />
//                                                 <div>
//                                                     <p className="text-[10px] uppercase tracking-wide text-gray-400">Available seats</p>
//                                                     <p className="font-medium text-gray-800">{internship.seats} seats</p>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
//                                                 <CalendarDays className="h-4 w-4 text-[#1677FF]" />
//                                                 <div>
//                                                     <p className="text-[10px] uppercase tracking-wide text-gray-400">Duration</p>
//                                                     <p className="font-medium text-gray-800">{internship.startDate} to {internship.endDate}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-2">
//                                             <CheckCircle2 className="h-5 w-5 text-[#1677FF]" />
//                                             <h3 className="text-lg font-bold text-gray-900">Progress</h3>
//                                         </div>

//                                         <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
//                                             <span>Completion</span>
//                                             <span className="font-semibold text-gray-900">{progressPercent}%</span>
//                                         </div>
//                                         <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-50">
//                                             <div
//                                                 className="h-full rounded-full bg-[#1677FF] transition-all duration-500"
//                                                 style={{ width: `${progressPercent}%` }}
//                                             />
//                                         </div>

//                                         <div className="mt-5 grid grid-cols-2 gap-3">
//                                             <InfoBox variant="blue">
//                                                 <p className="text-xs uppercase tracking-wide text-blue-600">Tasks</p>
//                                                 <p className="mt-2 text-2xl font-bold text-blue-800">{internship.stats?.totalTasks ?? 0}</p>
//                                             </InfoBox>
//                                             <InfoBox variant="green">
//                                                 <p className="text-xs uppercase tracking-wide text-green-600">Completed</p>
//                                                 <p className="mt-2 text-2xl font-bold text-green-800">{internship.stats?.completedTasks ?? 0}</p>
//                                             </InfoBox>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : null}
//                 </div>
//             </main>
//         </div>
//     );
// }



import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    Users,
    UserRound,
    FileText,
    Briefcase,
    GraduationCap,
    Settings,
    LayoutDashboard,
    Sparkles,
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

const getAppliedIds = () => {
    try {
        const stored =
            localStorage.getItem("appliedInternships");

        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const addAppliedId = (id) => {
    const ids = getAppliedIds();

    if (!ids.includes(id)) {
        ids.push(id);

        localStorage.setItem(
            "appliedInternships",
            JSON.stringify(ids),
        );
    }
};

const isAppliedId = (id) =>
    getAppliedIds().includes(id);

export default function InternshipDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { logout, user } = useAuth();

    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [applying, setApplying] = useState(false);
    const isInternshipRoute =
        location.pathname.includes("/student/internships") ||
        location.pathname.includes("/student/internship/");

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) {
                setError("Internship not found.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = isInternshipRoute
                    ? await opportunitiesAPI.getInternshipDetails(id)
                    : await opportunitiesAPI.getOpportunityDetails(id);

                const payload = response?.data ?? response;
                const detail = payload?.data ?? payload;

                if (!detail) {
                    throw new Error("Details are not available.");
                }

                const applied = isAppliedId(Number(id));
                const opportunityData = detail.opportunity || detail;

                const normalized = {
                    ...detail,
                    id: detail.id ?? Number(id),
                    title: opportunityData.title || detail.title || "Opportunity",
                    description: opportunityData.description || detail.description || "No description provided yet.",
                    company: detail.company || opportunityData.company || { name: detail.companyName || "Company" },
                    companyName: detail.company?.name || detail.companyName || opportunityData.company?.name || "Company",
                    type: getOpportunityType(opportunityData.type || detail.type || "ONSITE"),
                    location: opportunityData.location || detail.location || "Remote",
                    duration: opportunityData.duration || detail.duration || "Flexible",
                    totalSeats: opportunityData.totalSeats ?? detail.totalSeats ?? detail.seats ?? 0,
                    seats: opportunityData.totalSeats ?? detail.totalSeats ?? detail.seats ?? 0,
                    requiredSkills: Array.isArray(opportunityData.requiredSkills)
                        ? opportunityData.requiredSkills
                        : Array.isArray(detail.requiredSkills)
                            ? detail.requiredSkills
                            : typeof opportunityData.requiredSkills === "string"
                                ? opportunityData.requiredSkills.split(",").map((skill) => skill.trim()).filter(Boolean)
                                : typeof detail.requiredSkills === "string"
                                    ? detail.requiredSkills.split(",").map((skill) => skill.trim()).filter(Boolean)
                                    : [],
                    trainer: detail.trainer || opportunityData.trainer || null,
                    tasks: detail.tasks || [],
                    attendance: detail.attendance || [],
                    evaluations: detail.evaluations || [],
                    stats: detail.stats || {},
                    applied: applied || detail.applied || false,
                };

                setInternship(normalized);
            } catch (err) {
                console.error("Failed to load internship details:", err);
                setError(err?.message || "Unable to load internship details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, isInternshipRoute]);

    const handleApply = async () => {
        if (!internship) return;

        if (isAppliedId(internship.id)) {
            alert(
                "You have already applied for this internship.",
            );

            return;
        }

        try {
            setApplying(true);

            await opportunitiesAPI.applyForOpportunity(
                internship.id,
            );

            addAppliedId(internship.id);

            setInternship((current) => ({
                ...current,
                applied: true,
            }));
        } catch (err) {
            console.error("Failed to apply:", err);

            setError(
                err?.message ||
                "Unable to apply for this internship.",
            );
        } finally {
            setApplying(false);
        }
    };

    const studentUser = {
        name:
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
            "Student",

        role: "Student",

        avatar: user?.profileImage || "",
    };

    const progressPercent = useMemo(() => {
        if (!internship?.stats) return 0;

        if (
            internship.stats.progress !== undefined &&
            internship.stats.progress !== null
        ) {
            return Math.round(
                internship.stats.progress,
            );
        }

        if (
            internship.stats.completedTasks !== undefined &&
            internship.stats.totalTasks
        ) {
            return Math.round(
                (internship.stats.completedTasks /
                    internship.stats.totalTasks) *
                100,
            );
        }

        return 0;
    }, [internship]);

    const typeColor =
        typeColors[internship?.type] || {
            bg: "#E5E7EB",
            text: "#374151",
        };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    const trainerName = internship?.trainer
        ? `${internship.trainer.firstName} ${internship.trainer.lastName}`
        : null;

    const responsibilities = internship?.description
        ? internship.description
            .split(/(?<=[.!?])\s+/)
            .map((sentence) => sentence.trim())
            .filter(Boolean)
            .slice(0, 4)
        : [
            "Work on real tasks and contribute to the daily operations of the training environment.",
            "Collaborate with the team, ask questions, and keep up with project milestones.",
            "Document progress and share outcomes with the assigned trainer or supervisor.",
        ];

    const qualifications = internship?.requiredSkills?.length
        ? internship.requiredSkills.slice(0, 4)
        : [
            "Strong communication skills",
            "Ability to work in a team",
            "Motivation to learn and grow",
            "Basic understanding of the field",
        ];

    const trainingSchedule = [
        { label: "Start date", value: internship?.duration ? "Flexible" : "Open now" },
        { label: "End date", value: internship?.duration || "Flexible" },
        { label: "Working type", value: internship?.type || "On-site" },
        { label: "Training field", value: internship?.title || "Training" },
    ];

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
                <div className="mx-auto w-full max-w-[1280px] px-5 py-5 sm:px-8 sm:py-7">
                    <header className="mb-6 flex items-center justify-between gap-4">
                        <Button
                            variant="secondary"
                            className="px-4 py-2.5 text-sm"
                            onClick={() => navigate("/student/opportunities")}
                            icon={<ArrowLeft size={16} />}
                        >
                            Back to Opportunities
                        </Button>

                        <TopIconCluster
                            chatBadge={3}
                            notificationBadge={2}
                            avatarUrl={studentUser.avatar}
                            userName={studentUser.name}
                        />
                    </header>

                    {error && (
                        <InfoBox variant="orange" className="mb-5">
                            {error}
                        </InfoBox>
                    )}

                    {loading ? (
                        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
                            Loading opportunity details...
                        </div>
                    ) : internship ? (
                        <div className="space-y-6">
                            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                                <div className="relative h-[340px] w-full overflow-hidden bg-gray-100">
                                    {internship.company?.logo && (
                                        <img
                                            src={internship.company.logo}
                                            alt={internship.company?.name || "Opportunity image"}
                                            className="h-full w-full object-cover"
                                        />
                                    )}

                                    {!internship.company?.logo && (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAF3FF] via-white to-[#FFF4E5] text-3xl font-bold text-[#1677FF]">
                                            {internship.title?.slice(0, 1).toUpperCase() || "T"}
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
                                        {internship.title}
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                                {internship.type || "Training"}
                                            </span>
                                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                                {internship.location || "Remote"}
                                            </span>
                                        </div>

                                        <p className="mb-2 text-sm font-medium text-blue-100">
                                            {internship.companyName || internship.company?.name || "Training Provider"}
                                        </p>
                                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                            {internship.title}
                                        </h1>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 bg-white px-6 py-5">
                                    <div className="grid gap-4 md:grid-cols-4">
                                        <div className="rounded-2xl bg-gray-50 p-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Company</p>
                                            <p className="mt-2 text-sm font-semibold text-gray-800">{internship.companyName || internship.company?.name || "Company"}</p>
                                        </div>

                                        <div className="rounded-2xl bg-gray-50 p-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Location</p>
                                            <p className="mt-2 text-sm font-semibold text-gray-800">{internship.location || "Remote"}</p>
                                        </div>

                                        <div className="rounded-2xl bg-gray-50 p-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Duration</p>
                                            <p className="mt-2 text-sm font-semibold text-gray-800">{internship.duration || "Flexible"}</p>
                                        </div>

                                        <div className="rounded-2xl bg-gray-50 p-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Available seats</p>
                                            <p className="mt-2 text-sm font-semibold text-gray-800">{internship.totalSeats ?? internship.seats ?? 0} seats</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6 xl:grid-cols-[1.65fr_0.85fr]">
                                <div className="space-y-6">
                                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                                                <Sparkles className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">About the Training</h2>
                                        </div>

                                        <p className="leading-7 text-gray-600">
                                            {internship.description || "This training opportunity provides students with practical experience, guided support, and skill development in a real-world environment."}
                                        </p>
                                    </section>

                                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                                                <BriefcaseBusiness className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">Training Responsibilities</h2>
                                        </div>

                                        <ul className="space-y-3">
                                            {responsibilities.map((item) => (
                                                <li key={item} className="flex gap-3 text-gray-600">
                                                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#1677FF]" />
                                                    <span className="leading-7">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">Required Qualifications</h2>
                                        </div>

                                        <ul className="space-y-3">
                                            {qualifications.map((item) => (
                                                <li key={item} className="flex gap-3 text-gray-600">
                                                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#1677FF]" />
                                                    <span className="leading-7">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">Required Skills</h2>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(internship.requiredSkills) && internship.requiredSkills.length > 0 ? (
                                                internship.requiredSkills.map((skill, idx) => {
                                                    const color = getSkillColor(skill, idx);
                                                    return (
                                                        <span
                                                            key={`${skill}-${idx}`}
                                                            className="rounded-lg px-3 py-2 text-xs font-semibold"
                                                            style={{ backgroundColor: color.bg, color: color.text }}
                                                        >
                                                            {skill}
                                                        </span>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-sm text-gray-500">No specific skills listed for this opportunity.</p>
                                            )}
                                        </div>
                                    </section>

                                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                                                <CalendarDays className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">Training Schedule</h2>
                                        </div>

                                        <div className="grid gap-3 md:grid-cols-2">
                                            {trainingSchedule.map((item) => (
                                                <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{item.label}</p>
                                                    <p className="mt-2 text-sm font-semibold text-gray-800">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">Training Location / Map</h2>
                                        </div>

                                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#EAF3FF] to-[#FFF4E5] p-5">
                                            <p className="text-sm font-semibold text-gray-800">{internship.location || "Remote / Hybrid"}</p>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {internship.companyName || internship.company?.name || "Training Provider"} is hosting this opportunity in the stated location and may support hybrid or remote delivery depending on the program.
                                            </p>
                                            <div className="mt-4 h-52 rounded-2xl border border-dashed border-gray-300 bg-white/60" />
                                        </div>
                                    </section>
                                </div>

                                <aside className="xl:sticky xl:top-6 xl:self-start">
                                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                        <h3 className="mb-4 text-xl font-bold text-gray-900">Opportunity Summary</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                                <span className="text-sm text-gray-500">Available Seats</span>
                                                <span className="text-sm font-semibold text-gray-900">{internship.totalSeats ?? internship.seats ?? 0}</span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                                <span className="text-sm text-gray-500">Training Type</span>
                                                <span className="text-sm font-semibold text-gray-900">{internship.type || "On-site"}</span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                                <span className="text-sm text-gray-500">Duration</span>
                                                <span className="text-sm font-semibold text-gray-900">{internship.duration || "Flexible"}</span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                                <span className="text-sm text-gray-500">Training Field</span>
                                                <span className="text-sm font-semibold text-gray-900">{internship.title}</span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                                <span className="text-sm text-gray-500">Location</span>
                                                <span className="text-sm font-semibold text-gray-900">{internship.location || "Remote"}</span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                                <span className="text-sm text-gray-500">Start / End Date</span>
                                                <span className="text-sm font-semibold text-gray-900">Open now</span>
                                            </div>

                                            <div className="pt-2">
                                                <Button
                                                    variant={internship.applied ? "gold" : "blue"}
                                                    className="w-full justify-center py-3 text-sm font-semibold"
                                                    onClick={handleApply}
                                                    disabled={applying || internship.applied}
                                                >
                                                    {internship.applied ? "✓ Applied" : applying ? "Applying..." : "Apply for Training"}
                                                </Button>
                                            </div>

                                            <div className="pt-1">
                                                <Button
                                                    variant="secondary"
                                                    className="w-full justify-center py-3 text-sm font-semibold"
                                                    onClick={() => { }}
                                                >
                                                    Save Opportunity
                                                </Button>
                                            </div>

                                            <div className="space-y-4 rounded-2xl bg-gray-50 p-4 pt-4">
                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Trainer</p>
                                                    <p className="mt-2 text-sm font-semibold text-gray-800">
                                                        {trainerName || "Company Team"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Training Provider</p>
                                                    <p className="mt-2 text-sm font-semibold text-gray-800">
                                                        {internship.companyName || internship.company?.name || "Training Provider"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
}