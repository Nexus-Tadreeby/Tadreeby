// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

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
// import { useOpportunityDetails } from "../../../hooks/useOpportunityDetails";
// import { Button } from "../../common/Button";
// import InfoBox from "../../common/InfoBox";

// const studentNavItems = [
//     { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
//     { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
//     { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
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

// function getOpportunityType(type) {
//     switch (type) {
//         case "REMOTE": return "Remote";
//         case "HYBRID": return "Hybrid";
//         case "ONSITE": return "On-site";
//         default: return type;
//     }
// }

// // ─── Normalize the raw data from the hook ──────────────────────────
// function normalizeOpportunity(detail, id) {
//     // Extract the opportunity data (directly from detail, no nested "opportunity" object)
//     const data = detail;

//     return {
//         id: data.id ?? Number(id),
//         title: data.internship || data.field || data.title || "Opportunity",
//         description: data.description || "No description provided yet.",
//         // company is a string from the backend
//         company: { name: data.company || "Company" },
//         companyName: data.company || "Company",
//         type: getOpportunityType(data.type || "ONSITE"),
//         location: data.location || "Remote",
//         duration: data.duration || data.endDate || "Flexible",
//         totalSeats: data.seats ?? data.totalSeats ?? 0,
//         seats: data.seats ?? data.totalSeats ?? 0,
//         requiredSkills: Array.isArray(data.requiredSkills)
//             ? data.requiredSkills
//             : typeof data.requiredSkills === "string"
//                 ? data.requiredSkills.split(",").map(s => s.trim()).filter(Boolean)
//                 : [],
//         trainer: data.trainer ? { firstName: data.trainer, lastName: "" } : null,
//         tasks: data.tasks || [],
//         attendance: data.attendance || [],
//         evaluations: data.evaluations || [],
//         stats: data.stats || {},
//         applied: data.applied || false,
//         // Extra fields from backend
//         image: data.image || null,
//         startDate: data.startDate || "Open now",
//         endDate: data.endDate || "Flexible",
//         companyId: data.companyId || null,
//         field: data.field || data.internship || "",
//     };
// }

// export default function OpportunitiesDetails() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { id } = useParams();
//     const { logout, user } = useAuth();

//     const isInternshipRoute =
//         location.pathname.includes("/student/internships") ||
//         location.pathname.includes("/student/internship/");

//     // ─── Use the custom hook ────────────────────────────────────────
//     const { data, loading, error: fetchError } = useOpportunityDetails(id, isInternshipRoute);

//     // ─── Local state for normalized internship ─────────────────────
//     const [internship, setInternship] = useState(null);
//     const [applying, setApplying] = useState(false);
//     const [error, setError] = useState("");

//     // ─── Normalize data when it arrives ────────────────────────────
//     useEffect(() => {
//         if (data) {
//             const normalized = normalizeOpportunity(data, id);
//             setInternship(normalized);
//         }
//     }, [data, id]);

//     // ─── Sync fetch error to local error state ─────────────────────
//     useEffect(() => {
//         if (fetchError) {
//             setError(fetchError);
//         }
//     }, [fetchError]);

//     // ─── Apply handler ──────────────────────────────────────────────
//     const handleApply = async () => {
//         if (!internship) return;

//         if (internship.applied) {
//             alert("You have already applied for this internship.");
//             return;
//         }

//         try {
//             setApplying(true);
//             await opportunitiesAPI.applyForOpportunity(internship.id);
//             // Update local state to reflect applied status
//             setInternship((current) => ({ ...current, applied: true }));
//         } catch (err) {
//             console.error("Failed to apply:", err);
//             setError(err?.message || "Unable to apply for this internship.");
//         } finally {
//             setApplying(false);
//         }
//     };

//     // ─── Student user for Sidebar ──────────────────────────────────
//     const studentUser = {
//         name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student",
//         role: "Student",
//         avatar: user?.profileImage || "",
//     };

//     const handleSignOut = () => {
//         logout();
//         navigate("/login");
//     };

//     // ─── Derived data ──────────────────────────────────────────────
//     const trainerName = internship?.trainer
//         ? `${internship.trainer.firstName} ${internship.trainer.lastName}`
//         : null;

//     const responsibilities = internship?.description
//         ? internship.description
//             .split(/(?<=[.!?])\s+/)
//             .map(s => s.trim())
//             .filter(Boolean)
//             .slice(0, 4)
//         : [
//             "Work on real tasks and contribute to the daily operations of the training environment.",
//             "Collaborate with the team, ask questions, and keep up with project milestones.",
//             "Document progress and share outcomes with the assigned trainer or supervisor.",
//         ];

//     const qualifications = internship?.requiredSkills?.length
//         ? internship.requiredSkills.slice(0, 4)
//         : [
//             "Strong communication skills",
//             "Ability to work in a team",
//             "Motivation to learn and grow",
//             "Basic understanding of the field",
//         ];

//     const trainingSchedule = [
//         { label: "Start date", value: internship?.duration ? "Flexible" : "Open now" },
//         { label: "End date", value: internship?.duration || "Flexible" },
//         { label: "Working type", value: internship?.type || "On-site" },
//         { label: "Training field", value: internship?.title || "Training" },
//     ];

//     const typeColor = typeColors[internship?.type] || { bg: "#E5E7EB", text: "#374151" };

//     // ─── Render ──────────────────────────────────────────────────────
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
//                 <div className="mx-auto w-full max-w-[1280px] px-5 py-5 sm:px-8 sm:py-7">
//                     <header className="mb-6 flex items-center justify-between gap-4">
//                         <Button
//                             variant="secondary"
//                             className="px-4 py-2.5 text-sm"
//                             onClick={() => navigate("/student/opportunities")}
//                             icon={<ArrowLeft size={16} />}
//                         >
//                             Back to Opportunities
//                         </Button>
//                         <TopIconCluster
//                             chatBadge={3}
//                             notificationBadge={2}
//                             avatarUrl={studentUser.avatar}
//                             userName={studentUser.name}
//                         />
//                     </header>

//                     {error && <InfoBox variant="orange" className="mb-5">{error}</InfoBox>}

//                     {loading ? (
//                         <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
//                             Loading opportunity details...
//                         </div>
//                     ) : internship ? (
//                         <div className="space-y-6">
//                             {/* ─── Hero Card ──────────────────────────── */}
//                             <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
//                                 <div className="relative h-[340px] w-full overflow-hidden bg-gray-100">
//                                     {internship.company?.logo ? (
//                                         <img
//                                             src={internship.company.logo}
//                                             alt={internship.company?.name || "Opportunity image"}
//                                             className="h-full w-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAF3FF] via-white to-[#FFF4E5] text-3xl font-bold text-[#1677FF]">
//                                             {internship.title?.slice(0, 1).toUpperCase() || "T"}
//                                         </div>
//                                     )}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//                                     <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
//                                         {internship.title}
//                                     </div>
//                                     <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                                         <div className="mb-3 flex flex-wrap items-center gap-2">
//                                             <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
//                                                 {internship.type || "Training"}
//                                             </span>
//                                             <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
//                                                 {internship.location || "Remote"}
//                                             </span>
//                                         </div>
//                                         <p className="mb-2 text-sm font-medium text-blue-100">
//                                             {internship.companyName || internship.company?.name || "Training Provider"}
//                                         </p>
//                                         <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
//                                             {internship.title}
//                                         </h1>
//                                     </div>
//                                 </div>

//                                 <div className="border-t border-gray-100 bg-white px-6 py-5">
//                                     <div className="grid gap-4 md:grid-cols-4">
//                                         <div className="rounded-2xl bg-gray-50 p-4">
//                                             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Company</p>
//                                             <p className="mt-2 text-sm font-semibold text-gray-800">
//                                                 {internship.companyName || internship.company?.name || "Company"}
//                                             </p>
//                                         </div>
//                                         <div className="rounded-2xl bg-gray-50 p-4">
//                                             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Location</p>
//                                             <p className="mt-2 text-sm font-semibold text-gray-800">{internship.location || "Remote"}</p>
//                                         </div>
//                                         <div className="rounded-2xl bg-gray-50 p-4">
//                                             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Duration</p>
//                                             <p className="mt-2 text-sm font-semibold text-gray-800">{internship.duration || "Flexible"}</p>
//                                         </div>
//                                         <div className="rounded-2xl bg-gray-50 p-4">
//                                             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Available seats</p>
//                                             <p className="mt-2 text-sm font-semibold text-gray-800">{internship.totalSeats ?? internship.seats ?? 0} seats</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* ─── Main Content ────────────────────────── */}
//                             <div className="grid gap-6 xl:grid-cols-[1.65fr_0.85fr]">
//                                 <div className="space-y-6">
//                                     {/* About */}
//                                     <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-3">
//                                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <Sparkles className="h-5 w-5" />
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-900">About the Training</h2>
//                                         </div>
//                                         <p className="leading-7 text-gray-600">
//                                             {internship.description || "This training opportunity provides students with practical experience, guided support, and skill development in a real-world environment."}
//                                         </p>
//                                     </section>

//                                     {/* Responsibilities */}
//                                     <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-3">
//                                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <BriefcaseBusiness className="h-5 w-5" />
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-900">Training Responsibilities</h2>
//                                         </div>
//                                         <ul className="space-y-3">
//                                             {responsibilities.map((item) => (
//                                                 <li key={item} className="flex gap-3 text-gray-600">
//                                                     <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#1677FF]" />
//                                                     <span className="leading-7">{item}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </section>

//                                     {/* Qualifications */}
//                                     <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-3">
//                                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <FileText className="h-5 w-5" />
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-900">Required Qualifications</h2>
//                                         </div>
//                                         <ul className="space-y-3">
//                                             {qualifications.map((item) => (
//                                                 <li key={item} className="flex gap-3 text-gray-600">
//                                                     <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#1677FF]" />
//                                                     <span className="leading-7">{item}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </section>

//                                     {/* Skills */}
//                                     <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-3">
//                                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <Users className="h-5 w-5" />
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-900">Required Skills</h2>
//                                         </div>
//                                         <div className="flex flex-wrap gap-2">
//                                             {Array.isArray(internship.requiredSkills) && internship.requiredSkills.length > 0 ? (
//                                                 internship.requiredSkills.map((skill, idx) => {
//                                                     const color = getSkillColor(skill, idx);
//                                                     return (
//                                                         <span
//                                                             key={`${skill}-${idx}`}
//                                                             className="rounded-lg px-3 py-2 text-xs font-semibold"
//                                                             style={{ backgroundColor: color.bg, color: color.text }}
//                                                         >
//                                                             {skill}
//                                                         </span>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <p className="text-sm text-gray-500">No specific skills listed for this opportunity.</p>
//                                             )}
//                                         </div>
//                                     </section>

//                                     {/* Schedule */}
//                                     <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-3">
//                                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <CalendarDays className="h-5 w-5" />
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-900">Training Schedule</h2>
//                                         </div>
//                                         <div className="grid gap-3 md:grid-cols-2">
//                                             {trainingSchedule.map((item) => (
//                                                 <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
//                                                     <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{item.label}</p>
//                                                     <p className="mt-2 text-sm font-semibold text-gray-800">{item.value}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </section>

//                                     {/* Location / Map */}
//                                     <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//                                         <div className="mb-4 flex items-center gap-3">
//                                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                                                 <MapPin className="h-5 w-5" />
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-900">Training Location / Map</h2>
//                                         </div>
//                                         <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#EAF3FF] to-[#FFF4E5] p-5">
//                                             <p className="text-sm font-semibold text-gray-800">{internship.location || "Remote / Hybrid"}</p>
//                                             <p className="mt-2 text-sm text-gray-600">
//                                                 {internship.companyName || internship.company?.name || "Training Provider"} is hosting this opportunity in the stated location and may support hybrid or remote delivery depending on the program.
//                                             </p>
//                                             <div className="mt-4 h-52 rounded-2xl border border-dashed border-gray-300 bg-white/60" />
//                                         </div>
//                                     </section>
//                                 </div>

//                                 {/* ─── Sidebar Summary ───────────────────── */}
//                                 <aside className="xl:sticky xl:top-6 xl:self-start">
//                                     <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
//                                         <h3 className="mb-4 text-xl font-bold text-gray-900">Opportunity Summary</h3>
//                                         <div className="space-y-4">
//                                             <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
//                                                 <span className="text-sm text-gray-500">Available Seats</span>
//                                                 <span className="text-sm font-semibold text-gray-900">{internship.totalSeats ?? internship.seats ?? 0}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
//                                                 <span className="text-sm text-gray-500">Training Type</span>
//                                                 <span className="text-sm font-semibold text-gray-900">{internship.type || "On-site"}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
//                                                 <span className="text-sm text-gray-500">Duration</span>
//                                                 <span className="text-sm font-semibold text-gray-900">{internship.duration || "Flexible"}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
//                                                 <span className="text-sm text-gray-500">Training Field</span>
//                                                 <span className="text-sm font-semibold text-gray-900">{internship.title}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
//                                                 <span className="text-sm text-gray-500">Location</span>
//                                                 <span className="text-sm font-semibold text-gray-900">{internship.location || "Remote"}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
//                                                 <span className="text-sm text-gray-500">Start / End Date</span>
//                                                 <span className="text-sm font-semibold text-gray-900">Open now</span>
//                                             </div>
//                                             <div className="pt-2">
//                                                 <Button
//                                                     variant={internship.applied ? "gold" : "blue"}
//                                                     className="w-full justify-center py-3 text-sm font-semibold"
//                                                     onClick={handleApply}
//                                                     disabled={applying || internship.applied}
//                                                 >
//                                                     {internship.applied ? "✓ Applied" : applying ? "Applying..." : "Apply for Training"}
//                                                 </Button>
//                                             </div>
//                                             <div className="pt-1">
//                                                 <Button
//                                                     variant="secondary"
//                                                     className="w-full justify-center py-3 text-sm font-semibold"
//                                                     onClick={() => { }}
//                                                 >
//                                                     Save Opportunity
//                                                 </Button>
//                                             </div>
//                                             <div className="space-y-4 rounded-2xl bg-gray-50 p-4 pt-4">
//                                                 <div>
//                                                     <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Trainer</p>
//                                                     <p className="mt-2 text-sm font-semibold text-gray-800">
//                                                         {trainerName || "Company Team"}
//                                                     </p>
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Training Provider</p>
//                                                     <p className="mt-2 text-sm font-semibold text-gray-800">
//                                                         {internship.companyName || internship.company?.name || "Training Provider"}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </aside>
//                             </div>
//                         </div>
//                     ) : null}
//                 </div>
//             </main>
//         </div>
//     );
// }













// // src/components/pages/student/OpportunitiesDetails.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
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
//     AlertCircle,
// } from "lucide-react";

// import Sidebar from "../../layout/Sidebar";
// import PageHeader from "../../common/pagesAssets/PageHeader";
// import { useAuth } from "../../../context/AuthContext";
// import { opportunitiesAPI } from "../../../services/api";
// import { useOpportunityDetails } from "../../../hooks/useOpportunityDetails";
// import { Button } from "../../common/Button";

// // ─── Design Tokens ──────────────────────────────────────────────────
// const COLORS = {
//     primary: "#0475FB",
//     primaryDark: "#035CC9",
//     primarySoft: "#EAF3FF",
//     accent: "#FFAD4E",
//     accentSoft: "#FFF4E5",
//     green: "#22C55E",
//     greenSoft: "#EAF9EF",
//     red: "#EF4444",
//     redSoft: "#FEF0F0",
//     purple: "#8B5CF6",
//     purpleSoft: "#F2EDFF",
//     text: "#172033",
//     muted: "#7B8497",
//     border: "#E9EDF4",
//     background: "#F5F7FB",
// };

// // ─── Navigation ──────────────────────────────────────────────────────
// const studentNavItems = [
//     { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
//     { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
//     { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
//     { label: "Attendance", icon: Clock3, path: "/attendance" },
// ];
// const studentFooterItems = [{ label: "Settings", icon: Settings, path: "/settings" }];

// // ─── Helpers ──────────────────────────────────────────────────────────
// const typeColors = {
//     Remote: { bg: COLORS.primarySoft, text: COLORS.primary },
//     Hybrid: { bg: "#F3F0FF", text: "#7C3AED" },
//     "On-site": { bg: "#FFE8E8", text: "#EF4444" },
// };

// const skillColorPalette = [
//     { bg: COLORS.primarySoft, text: COLORS.primary },
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

// function getOpportunityType(type) {
//     switch (type) {
//         case "REMOTE":
//             return "Remote";
//         case "HYBRID":
//             return "Hybrid";
//         case "ONSITE":
//             return "On-site";
//         default:
//             return type;
//     }
// }

// // ─── Normalize the raw data ──────────────────────────────────────────
// function normalizeOpportunity(detail, id) {
//     const data = detail;
//     return {
//         id: data.id ?? Number(id),
//         title: data.internship || data.field || data.title || "Opportunity",
//         description: data.description || "No description provided yet.",
//         company: { name: data.company || "Company" },
//         companyName: data.company || "Company",
//         type: getOpportunityType(data.type || "ONSITE"),
//         location: data.location || "Remote",
//         duration: data.duration || data.endDate || "Flexible",
//         totalSeats: data.seats ?? data.totalSeats ?? 0,
//         seats: data.seats ?? data.totalSeats ?? 0,
//         requiredSkills: Array.isArray(data.requiredSkills)
//             ? data.requiredSkills
//             : typeof data.requiredSkills === "string"
//                 ? data.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
//                 : [],
//         trainer: data.trainer ? { firstName: data.trainer, lastName: "" } : null,
//         tasks: data.tasks || [],
//         attendance: data.attendance || [],
//         evaluations: data.evaluations || [],
//         stats: data.stats || {},
//         applied: data.applied || false,
//         image: data.image || null,
//         startDate: data.startDate || "Open now",
//         endDate: data.endDate || "Flexible",
//         companyId: data.companyId || null,
//         field: data.field || data.internship || "",
//     };
// }

// export default function OpportunitiesDetails() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { id } = useParams();
//     const { logout, user } = useAuth();

//     const isInternshipRoute =
//         location.pathname.includes("/student/internships") ||
//         location.pathname.includes("/student/internship/");

//     // ─── Custom hook ──────────────────────────────────────────────────
//     const { data, loading, error: fetchError } = useOpportunityDetails(id, isInternshipRoute);

//     const [internship, setInternship] = useState(null);
//     const [applying, setApplying] = useState(false);
//     const [error, setError] = useState("");

//     // ─── Normalize data ──────────────────────────────────────────────
//     useEffect(() => {
//         if (data) {
//             const normalized = normalizeOpportunity(data, id);
//             setInternship(normalized);
//         }
//     }, [data, id]);

//     useEffect(() => {
//         if (fetchError) {
//             setError(fetchError);
//         }
//     }, [fetchError]);

//     // ─── Apply handler ──────────────────────────────────────────────
//     const handleApply = async () => {
//         if (!internship) return;
//         if (internship.applied) {
//             alert("You have already applied for this internship.");
//             return;
//         }
//         try {
//             setApplying(true);
//             await opportunitiesAPI.applyForOpportunity(internship.id);
//             setInternship((current) => ({ ...current, applied: true }));
//         } catch (err) {
//             console.error("Failed to apply:", err);
//             setError(err?.message || "Unable to apply for this internship.");
//         } finally {
//             setApplying(false);
//         }
//     };

//     // ── User data ──────────────────────────────────────────────────────
//     const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student";
//     const studentUser = {
//         name: fullName,
//         role: "Student",
//         avatar: user?.profileImage || "",
//     };

//     const handleSignOut = () => {
//         logout();
//         navigate("/login");
//     };

//     // ── Derived data ──────────────────────────────────────────────────
//     const trainerName = internship?.trainer
//         ? `${internship.trainer.firstName} ${internship.trainer.lastName}`
//         : null;

//     const responsibilities = internship?.description
//         ? internship.description
//             .split(/(?<=[.!?])\s+/)
//             .map((s) => s.trim())
//             .filter(Boolean)
//             .slice(0, 4)
//         : [
//             "Work on real tasks and contribute to the daily operations of the training environment.",
//             "Collaborate with the team, ask questions, and keep up with project milestones.",
//             "Document progress and share outcomes with the assigned trainer or supervisor.",
//         ];

//     const qualifications = internship?.requiredSkills?.length
//         ? internship.requiredSkills.slice(0, 4)
//         : [
//             "Strong communication skills",
//             "Ability to work in a team",
//             "Motivation to learn and grow",
//             "Basic understanding of the field",
//         ];

//     const trainingSchedule = [
//         { label: "Start date", value: internship?.duration ? "Flexible" : "Open now" },
//         { label: "End date", value: internship?.duration || "Flexible" },
//         { label: "Working type", value: internship?.type || "On-site" },
//         { label: "Training field", value: internship?.title || "Training" },
//     ];

//     const typeColor = typeColors[internship?.type] || { bg: "#E5E7EB", text: "#374151" };

//     // ─── Render ──────────────────────────────────────────────────────
//     return (
//         <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
//             {/* Decorative orbs */}
//             <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
//             <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
//             <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

//             <Sidebar
//                 navItems={studentNavItems}
//                 footerItems={studentFooterItems}
//                 user={studentUser}
//                 profilePath="/student/profile"
//                 onSignOut={handleSignOut}
//             />

//             <main className="flex-1 overflow-y-auto relative z-10">
//                 <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
//                     {/* Page Header */}
//                     <PageHeader
//                         loading={loading}
//                         profile={user}
//                         fullName={fullName}
//                         studentUser={studentUser}
//                         searchValue=""
//                         onSearchChange={() => { }}
//                         chatBadge={3}
//                         notificationBadge={4}
//                     />

//                     {/* Back button */}
//                     <button
//                         onClick={() => navigate("/student/opportunities")}
//                         className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#7B8497] hover:text-[#0475FB] transition"
//                     >
//                         <ArrowLeft size={15} />
//                         Back to Opportunities
//                     </button>

//                     {/* Error */}
//                     {error && (
//                         <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[11px] text-[#B42318]">
//                             <AlertCircle size={14} className="mt-0.5 shrink-0" />
//                             <span>{error}</span>
//                         </div>
//                     )}

//                     {/* Loading */}
//                     {loading ? (
//                         <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-[#E9EDF4] bg-white/60 text-[14px] text-[#7B8497]">
//                             Loading opportunity details...
//                         </div>
//                     ) : internship ? (
//                         <div className="mt-6 space-y-6">
//                             {/* ─── Hero Card ──────────────────────────────────────────── */}
//                             <div className="overflow-hidden rounded-[18px] border border-[#E9EDF4] bg-white shadow-sm">
//                                 <div className="relative h-[260px] w-full overflow-hidden bg-gradient-to-br from-[#EAF3FF] via-white to-[#FFF4E5]">
//                                     {internship.image ? (
//                                         <img
//                                             src={internship.image}
//                                             alt={internship.title}
//                                             className="h-full w-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="flex h-full w-full items-center justify-center text-6xl font-extrabold text-[#0475FB]/20">
//                                             {internship.title?.slice(0, 2).toUpperCase() || "T"}
//                                         </div>
//                                     )}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

//                                     <div className="absolute left-5 top-5 flex flex-wrap gap-2">
//                                         <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#172033] shadow-sm backdrop-blur-sm">
//                                             {internship.type || "Training"}
//                                         </span>
//                                         <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#172033] shadow-sm backdrop-blur-sm">
//                                             {internship.location || "Remote"}
//                                         </span>
//                                     </div>

//                                     <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                                         <p className="text-[12px] font-medium text-white/80">
//                                             {internship.companyName || internship.company?.name || "Training Provider"}
//                                         </p>
//                                         <h1 className="text-[28px] font-extrabold tracking-tight">
//                                             {internship.title}
//                                         </h1>
//                                     </div>
//                                 </div>

//                                 {/* Quick stats row */}
//                                 <div className="grid grid-cols-2 gap-3 border-t border-[#E9EDF4] bg-[#FAFBFC] p-4 sm:grid-cols-4">
//                                     <div>
//                                         <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Company</p>
//                                         <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
//                                             {internship.companyName || internship.company?.name || "Company"}
//                                         </p>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Location</p>
//                                         <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
//                                             {internship.location || "Remote"}
//                                         </p>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Duration</p>
//                                         <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
//                                             {internship.duration || "Flexible"}
//                                         </p>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Seats</p>
//                                         <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
//                                             {internship.totalSeats ?? internship.seats ?? 0}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* ─── Main Grid ──────────────────────────────────────────── */}
//                             <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_0.85fr]">
//                                 {/* Left Column */}
//                                 <div className="space-y-6">
//                                     {/* About */}
//                                     <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
//                                                 <Sparkles size={18} />
//                                             </div>
//                                             <h2 className="text-[18px] font-extrabold text-[#172033]">About the Training</h2>
//                                         </div>
//                                         <p className="mt-3 text-[13px] leading-relaxed text-[#7B8497]">
//                                             {internship.description ||
//                                                 "This training opportunity provides students with practical experience, guided support, and skill development in a real-world environment."}
//                                         </p>
//                                     </section>

//                                     {/* Responsibilities */}
//                                     <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
//                                                 <BriefcaseBusiness size={18} />
//                                             </div>
//                                             <h2 className="text-[18px] font-extrabold text-[#172033]">Training Responsibilities</h2>
//                                         </div>
//                                         <ul className="mt-3 space-y-2">
//                                             {responsibilities.map((item) => (
//                                                 <li key={item} className="flex gap-3 text-[13px] text-[#7B8497]">
//                                                     <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#0475FB]" />
//                                                     <span className="leading-relaxed">{item}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </section>

//                                     {/* Qualifications */}
//                                     {/* <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
//                                                 <FileText size={18} />
//                                             </div>
//                                             <h2 className="text-[18px] font-extrabold text-[#172033]">Required Qualifications</h2>
//                                         </div>
//                                         <ul className="mt-3 space-y-2">
//                                             {qualifications.map((item) => (
//                                                 <li key={item} className="flex gap-3 text-[13px] text-[#7B8497]">
//                                                     <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#0475FB]" />
//                                                     <span className="leading-relaxed">{item}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </section> */}

//                                     {/* Skills */}
//                                     <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
//                                                 <Users size={18} />
//                                             </div>
//                                             <h2 className="text-[18px] font-extrabold text-[#172033]">Required Skills</h2>
//                                         </div>
//                                         <div className="mt-3 flex flex-wrap gap-2">
//                                             {Array.isArray(internship.requiredSkills) && internship.requiredSkills.length > 0 ? (
//                                                 internship.requiredSkills.map((skill, idx) => {
//                                                     const color = getSkillColor(skill, idx);
//                                                     return (
//                                                         <span
//                                                             key={`${skill}-${idx}`}
//                                                             className="rounded-lg px-3 py-1.5 text-[11px] font-semibold"
//                                                             style={{ backgroundColor: color.bg, color: color.text }}
//                                                         >
//                                                             {skill}
//                                                         </span>
//                                                     );
//                                                 })
//                                             ) : (
//                                                 <p className="text-[13px] text-[#7B8497]">No specific skills listed for this opportunity.</p>
//                                             )}
//                                         </div>
//                                     </section>

//                                     {/* Schedule */}
//                                     <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
//                                                 <CalendarDays size={18} />
//                                             </div>
//                                             <h2 className="text-[18px] font-extrabold text-[#172033]">Training Schedule</h2>
//                                         </div>
//                                         <div className="mt-3 grid grid-cols-2 gap-3">
//                                             {trainingSchedule.map((item) => (
//                                                 <div key={item.label} className="rounded-xl border border-[#E9EDF4] bg-[#FAFBFC] p-3">
//                                                     <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">
//                                                         {item.label}
//                                                     </p>
//                                                     <p className="mt-0.5 text-[12px] font-bold text-[#172033]">{item.value}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </section>

//                                     {/* Location / Map */}
//                                     <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
//                                                 <MapPin size={18} />
//                                             </div>
//                                             <h2 className="text-[18px] font-extrabold text-[#172033]">Location</h2>
//                                         </div>
//                                         <div className="mt-3 overflow-hidden rounded-xl border border-[#E9EDF4] bg-gradient-to-br from-[#EAF3FF] to-[#FFF4E5] p-4">
//                                             <p className="text-[12px] font-semibold text-[#172033]">
//                                                 {internship.location || "Remote / Hybrid"}
//                                             </p>
//                                             <p className="mt-1 text-[11px] text-[#7B8497]">
//                                                 {internship.companyName || internship.company?.name || "Training Provider"} is hosting this opportunity in the stated location.
//                                             </p>
//                                         </div>
//                                     </section>
//                                 </div>

//                                 {/* ─── Sidebar Summary ──────────────────────────────────── */}
//                                 <aside className="space-y-5 xl:sticky xl:top-[88px] xl:self-start">
//                                     <div className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                         <h3 className="text-[18px] font-extrabold text-[#172033]">Opportunity Summary</h3>

//                                         <div className="mt-4 space-y-3">
//                                             <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
//                                                 <span className="text-[11px] font-medium text-[#7B8497]">Available Seats</span>
//                                                 <span className="text-[13px] font-bold text-[#172033]">
//                                                     {internship.totalSeats ?? internship.seats ?? 0}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
//                                                 <span className="text-[11px] font-medium text-[#7B8497]">Training Type</span>
//                                                 <span className="text-[13px] font-bold text-[#172033]">{internship.type || "On-site"}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
//                                                 <span className="text-[11px] font-medium text-[#7B8497]">Duration</span>
//                                                 <span className="text-[13px] font-bold text-[#172033]">{internship.duration || "Flexible"}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
//                                                 <span className="text-[11px] font-medium text-[#7B8497]">Field</span>
//                                                 <span className="text-[13px] font-bold text-[#172033]">{internship.title}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
//                                                 <span className="text-[11px] font-medium text-[#7B8497]">Location</span>
//                                                 <span className="text-[13px] font-bold text-[#172033]">{internship.location || "Remote"}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
//                                                 <span className="text-[11px] font-medium text-[#7B8497]">Start</span>
//                                                 <span className="text-[13px] font-bold text-[#172033]">Open now</span>
//                                             </div>
//                                         </div>

//                                         <div className="mt-4 space-y-2">
//                                             <Button
//                                                 variant={internship.applied ? "gold" : "blue"}
//                                                 className="w-full justify-center py-2.5 text-[13px] font-bold"
//                                                 onClick={handleApply}
//                                                 disabled={applying || internship.applied}
//                                             >
//                                                 {internship.applied ? "✓ Applied" : applying ? "Applying..." : "Apply for Training"}
//                                             </Button>
//                                             <Button
//                                                 variant="secondary"
//                                                 className="w-full justify-center py-2.5 text-[13px] font-bold"
//                                                 onClick={() => { }}
//                                             >
//                                                 Save Opportunity
//                                             </Button>
//                                         </div>

//                                         <div className="mt-4 rounded-xl bg-[#FAFBFC] p-4 space-y-3">
//                                             <div>
//                                                 <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Trainer</p>
//                                                 <p className="mt-0.5 text-[12px] font-bold text-[#172033]">
//                                                     {trainerName || "Company Team"}
//                                                 </p>
//                                             </div>
//                                             <div>
//                                                 <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Provider</p>
//                                                 <p className="mt-0.5 text-[12px] font-bold text-[#172033]">
//                                                     {internship.companyName || internship.company?.name || "Training Provider"}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Progress Card (if stats exist) */}
//                                     {internship.stats && (internship.stats.totalTasks > 0 || internship.stats.progress !== undefined) && (
//                                         <div className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
//                                             <div className="flex items-center gap-2">
//                                                 <CheckCircle2 size={17} color={COLORS.primary} />
//                                                 <h3 className="text-[16px] font-extrabold text-[#172033]">Progress</h3>
//                                             </div>
//                                             <div className="mt-3 flex items-center justify-between text-[11px] text-[#7B8497]">
//                                                 <span>Completion</span>
//                                                 <span className="font-bold text-[#172033]">{Math.round(internship.stats.progress || 0)}%</span>
//                                             </div>
//                                             <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">
//                                                 <div
//                                                     className="h-full rounded-full bg-[#0475FB] transition-all duration-500"
//                                                     style={{ width: `${Math.round(internship.stats.progress || 0)}%` }}
//                                                 />
//                                             </div>
//                                             <div className="mt-3 grid grid-cols-2 gap-2">
//                                                 <div className="rounded-xl bg-[#EAF3FF] p-3 text-center">
//                                                     <p className="text-[10px] font-semibold uppercase text-[#0475FB]">Tasks</p>
//                                                     <p className="mt-0.5 text-[16px] font-extrabold text-[#172033]">
//                                                         {internship.stats?.totalTasks ?? 0}
//                                                     </p>
//                                                 </div>
//                                                 <div className="rounded-xl bg-[#EAF9EF] p-3 text-center">
//                                                     <p className="text-[10px] font-semibold uppercase text-[#22C55E]">Completed</p>
//                                                     <p className="mt-0.5 text-[16px] font-extrabold text-[#172033]">
//                                                         {internship.stats?.completedTasks ?? 0}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </aside>
//                             </div>
//                         </div>
//                     ) : null}
//                 </div>
//             </main>
//         </div>
//     );
// }



// src/components/pages/student/OpportunitiesDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    Users,
    FileText,
    Briefcase,
    GraduationCap,
    Settings,
    LayoutDashboard,
    Sparkles,
    AlertCircle,
    X,
    Upload,
    RefreshCw,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { opportunitiesAPI } from "../../../services/api";
import { useOpportunityDetails } from "../../../hooks/useOpportunityDetails";
import { Button } from "../../common/Button";

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
const studentNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
    { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
    { label: "Attendance", icon: Clock3, path: "/attendance" },
];
const studentFooterItems = [{ label: "Settings", icon: Settings, path: "/settings" }];

// ─── Helpers ──────────────────────────────────────────────────────────
const typeColors = {
    Remote: { bg: COLORS.primarySoft, text: COLORS.primary },
    Hybrid: { bg: "#F3F0FF", text: "#7C3AED" },
    "On-site": { bg: "#FFE8E8", text: "#EF4444" },
};

const skillColorPalette = [
    { bg: COLORS.primarySoft, text: COLORS.primary },
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

// ─── Normalize the raw data ──────────────────────────────────────────
function normalizeOpportunity(detail, id) {
    const data = detail;
    return {
        id: data.id ?? Number(id),
        title: data.internship || data.field || data.title || "Opportunity",
        description: data.description || "No description provided yet.",
        company: { name: data.company || "Company" },
        companyName: data.company || "Company",
        type: getOpportunityType(data.type || "ONSITE"),
        location: data.location || "Remote",
        duration: data.duration || data.endDate || "Flexible",
        totalSeats: data.seats ?? data.totalSeats ?? 0,
        seats: data.seats ?? data.totalSeats ?? 0,
        requiredSkills: Array.isArray(data.requiredSkills)
            ? data.requiredSkills
            : typeof data.requiredSkills === "string"
                ? data.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
                : [],
        trainer: data.trainer ? { firstName: data.trainer, lastName: "" } : null,
        tasks: data.tasks || [],
        attendance: data.attendance || [],
        evaluations: data.evaluations || [],
        stats: data.stats || {},
        applied: data.applied || false,
        image: data.image || null,
        startDate: data.startDate || "Open now",
        endDate: data.endDate || "Flexible",
        companyId: data.companyId || null,
        field: data.field || data.internship || "",
    };
}

// ─── Application Modal ──────────────────────────────────────────────
function ApplicationModal({ isOpen, onClose, onSubmit, applying, title, company }) {
    const [coverLetter, setCoverLetter] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!coverLetter.trim() && !file) {
            setError("Please add a cover letter or attach a file.");
            return;
        }
        setError("");
        onSubmit({ coverLetter, file });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-[#172033]/20 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-fade-in-up">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[16px] font-extrabold text-[#172033]">Apply for Training</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-gray-100"
                            aria-label="Close"
                        >
                            <X size={18} color={COLORS.muted} />
                        </button>
                    </div>

                    <p className="mt-1 text-[12px] text-[#7B8497]">
                        {title} · {company}
                    </p>

                    <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="cover-letter" className="block text-[11px] font-semibold text-[#172033]">
                                Cover Letter <span className="text-[#EF4444]">*</span>
                            </label>
                            <textarea
                                id="cover-letter"
                                rows={4}
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                placeholder="Tell the trainer why you’re a great fit for this internship…"
                                className="mt-1 w-full rounded-xl border border-[#E9EDF4] bg-white px-4 py-2.5 text-[12px] text-[#172033] outline-none transition focus:border-[#0475FB] focus:ring-2 focus:ring-[#0475FB]/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="attachment" className="block text-[11px] font-semibold text-[#172033]">
                                Attachment <span className="text-[10px] text-[#7B8497]">(optional)</span>
                            </label>
                            <div className="mt-1 flex items-center gap-3">
                                <label
                                    htmlFor="attachment"
                                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#E9EDF4] bg-white px-4 py-2.5 text-[11px] font-medium text-[#172033] transition hover:bg-[#F8FAFC]"
                                >
                                    <Upload size={14} color={COLORS.primary} />
                                    Choose file
                                </label>
                                <input
                                    id="attachment"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                                {file && (
                                    <span className="truncate text-[11px] text-[#7B8497]">
                                        {file.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-start gap-2 rounded-xl bg-[#FEF0F0] px-3 py-2 text-[10px] text-[#EF4444]">
                                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-5 flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1 justify-center text-[12px] font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="blue"
                            onClick={handleSubmit}
                            disabled={applying}
                            className="flex-1 justify-center text-[12px] font-semibold"
                        >
                            {applying ? (
                                <><RefreshCw size={14} className="animate-spin" /> Submitting...</>
                            ) : (
                                "Submit Application"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ─── Main Component ──────────────────────────────────────────────────

export default function OpportunitiesDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { logout, user } = useAuth();

    const isInternshipRoute =
        location.pathname.includes("/student/internships") ||
        location.pathname.includes("/student/internship/");

    const { data, loading, error: fetchError } = useOpportunityDetails(id, isInternshipRoute);

    const [internship, setInternship] = useState(null);
    const [applying, setApplying] = useState(false);
    const [error, setError] = useState("");
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    // ─── Normalize data ──────────────────────────────────────────────
    useEffect(() => {
        if (data) {
            const normalized = normalizeOpportunity(data, id);
            setInternship(normalized);
        }
    }, [data, id]);

    useEffect(() => {
        if (fetchError) {
            setError(fetchError);
        }
    }, [fetchError]);

    // ─── Apply handlers ──────────────────────────────────────────────
    const handleApply = () => {
        if (internship?.applied) {
            alert("You have already applied for this internship.");
            return;
        }
        setShowApplicationModal(true);
    };

    const handleApplicationSubmit = async ({ coverLetter, file }) => {
        if (!internship) return;
        try {
            setApplying(true);
            // For now, we only send the opportunityId.
            // The cover letter and file are collected but not sent to the backend.
            // You can extend this later if the backend supports them.
            await opportunitiesAPI.applyForOpportunity(internship.id);
            setInternship((current) => ({ ...current, applied: true }));
            setShowApplicationModal(false);
        } catch (err) {
            console.error("Failed to apply:", err);
            setError(err?.message || "Unable to apply for this internship.");
        } finally {
            setApplying(false);
        }
    };

    // ── User data ──────────────────────────────────────────────────────
    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student";
    const studentUser = {
        name: fullName,
        role: "Student",
        avatar: user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    // ── Derived data ──────────────────────────────────────────────────
    const trainerName = internship?.trainer
        ? `${internship.trainer.firstName} ${internship.trainer.lastName}`
        : null;

    const responsibilities = internship?.description
        ? internship.description
            .split(/(?<=[.!?])\s+/)
            .map((s) => s.trim())
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

    const typeColor = typeColors[internship?.type] || { bg: "#E5E7EB", text: "#374151" };

    // ─── Render ──────────────────────────────────────────────────────
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

            <main className="flex-1 overflow-y-auto relative z-10">
                <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
                    <PageHeader
                        loading={loading}
                        profile={user}
                        fullName={fullName}
                        studentUser={studentUser}
                        searchValue=""
                        onSearchChange={() => { }}
                        chatBadge={3}
                        notificationBadge={4}
                    />

                    {/* Back button */}
                    <button
                        onClick={() => navigate("/student/opportunities")}
                        className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#7B8497] hover:text-[#0475FB] transition"
                    >
                        <ArrowLeft size={15} />
                        Back to Opportunities
                    </button>

                    {/* Error */}
                    {error && (
                        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[11px] text-[#B42318]">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                        <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-[#E9EDF4] bg-white/60 text-[14px] text-[#7B8497]">
                            Loading opportunity details...
                        </div>
                    ) : internship ? (
                        <div className="mt-6 space-y-6">
                            {/* Hero Card */}
                            <div className="overflow-hidden rounded-[18px] border border-[#E9EDF4] bg-white shadow-sm">
                                <div className="relative h-[260px] w-full overflow-hidden bg-gradient-to-br from-[#EAF3FF] via-white to-[#FFF4E5]">
                                    {internship.image ? (
                                        <img
                                            src={internship.image}
                                            alt={internship.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-6xl font-extrabold text-[#0475FB]/20">
                                            {internship.title?.slice(0, 2).toUpperCase() || "T"}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#172033] shadow-sm backdrop-blur-sm">
                                            {internship.type || "Training"}
                                        </span>
                                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#172033] shadow-sm backdrop-blur-sm">
                                            {internship.location || "Remote"}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <p className="text-[12px] font-medium text-white/80">
                                            {internship.companyName || internship.company?.name || "Training Provider"}
                                        </p>
                                        <h1 className="text-[28px] font-extrabold tracking-tight">
                                            {internship.title}
                                        </h1>
                                    </div>
                                </div>

                                {/* Quick stats row */}
                                <div className="grid grid-cols-2 gap-3 border-t border-[#E9EDF4] bg-[#FAFBFC] p-4 sm:grid-cols-4">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Company</p>
                                        <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
                                            {internship.companyName || internship.company?.name || "Company"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Location</p>
                                        <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
                                            {internship.location || "Remote"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Duration</p>
                                        <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
                                            {internship.duration || "Flexible"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Seats</p>
                                        <p className="mt-0.5 text-[13px] font-bold text-[#172033]">
                                            {internship.totalSeats ?? internship.seats ?? 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Grid */}
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_0.85fr]">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* About */}
                                    <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                                                <Sparkles size={18} />
                                            </div>
                                            <h2 className="text-[18px] font-extrabold text-[#172033]">About the Training</h2>
                                        </div>
                                        <p className="mt-3 text-[13px] leading-relaxed text-[#7B8497]">
                                            {internship.description ||
                                                "This training opportunity provides students with practical experience, guided support, and skill development in a real-world environment."}
                                        </p>
                                    </section>

                                    {/* Responsibilities */}
                                    <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                                                <BriefcaseBusiness size={18} />
                                            </div>
                                            <h2 className="text-[18px] font-extrabold text-[#172033]">Training Responsibilities</h2>
                                        </div>
                                        <ul className="mt-3 space-y-2">
                                            {responsibilities.map((item) => (
                                                <li key={item} className="flex gap-3 text-[13px] text-[#7B8497]">
                                                    <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#0475FB]" />
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Qualifications */}
                                    <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                                                <FileText size={18} />
                                            </div>
                                            <h2 className="text-[18px] font-extrabold text-[#172033]">Required Qualifications</h2>
                                        </div>
                                        <ul className="mt-3 space-y-2">
                                            {qualifications.map((item) => (
                                                <li key={item} className="flex gap-3 text-[13px] text-[#7B8497]">
                                                    <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#0475FB]" />
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Skills */}
                                    <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                                                <Users size={18} />
                                            </div>
                                            <h2 className="text-[18px] font-extrabold text-[#172033]">Required Skills</h2>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {Array.isArray(internship.requiredSkills) && internship.requiredSkills.length > 0 ? (
                                                internship.requiredSkills.map((skill, idx) => {
                                                    const color = getSkillColor(skill, idx);
                                                    return (
                                                        <span
                                                            key={`${skill}-${idx}`}
                                                            className="rounded-lg px-3 py-1.5 text-[11px] font-semibold"
                                                            style={{ backgroundColor: color.bg, color: color.text }}
                                                        >
                                                            {skill}
                                                        </span>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-[13px] text-[#7B8497]">No specific skills listed for this opportunity.</p>
                                            )}
                                        </div>
                                    </section>

                                    {/* Schedule */}
                                    <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                                                <CalendarDays size={18} />
                                            </div>
                                            <h2 className="text-[18px] font-extrabold text-[#172033]">Training Schedule</h2>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-3">
                                            {trainingSchedule.map((item) => (
                                                <div key={item.label} className="rounded-xl border border-[#E9EDF4] bg-[#FAFBFC] p-3">
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-0.5 text-[12px] font-bold text-[#172033]">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Location */}
                                    <section className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0475FB]">
                                                <MapPin size={18} />
                                            </div>
                                            <h2 className="text-[18px] font-extrabold text-[#172033]">Location</h2>
                                        </div>
                                        <div className="mt-3 overflow-hidden rounded-xl border border-[#E9EDF4] bg-gradient-to-br from-[#EAF3FF] to-[#FFF4E5] p-4">
                                            <p className="text-[12px] font-semibold text-[#172033]">
                                                {internship.location || "Remote / Hybrid"}
                                            </p>
                                            <p className="mt-1 text-[11px] text-[#7B8497]">
                                                {internship.companyName || internship.company?.name || "Training Provider"} is hosting this opportunity in the stated location.
                                            </p>
                                        </div>
                                    </section>
                                </div>

                                {/* Sidebar Summary */}
                                <aside className="space-y-5 xl:sticky xl:top-[88px] xl:self-start">
                                    <div className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                        <h3 className="text-[18px] font-extrabold text-[#172033]">Opportunity Summary</h3>

                                        <div className="mt-4 space-y-3">
                                            <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
                                                <span className="text-[11px] font-medium text-[#7B8497]">Available Seats</span>
                                                <span className="text-[13px] font-bold text-[#172033]">
                                                    {internship.totalSeats ?? internship.seats ?? 0}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
                                                <span className="text-[11px] font-medium text-[#7B8497]">Training Type</span>
                                                <span className="text-[13px] font-bold text-[#172033]">{internship.type || "On-site"}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
                                                <span className="text-[11px] font-medium text-[#7B8497]">Duration</span>
                                                <span className="text-[13px] font-bold text-[#172033]">{internship.duration || "Flexible"}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
                                                <span className="text-[11px] font-medium text-[#7B8497]">Field</span>
                                                <span className="text-[13px] font-bold text-[#172033]">{internship.title}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
                                                <span className="text-[11px] font-medium text-[#7B8497]">Location</span>
                                                <span className="text-[13px] font-bold text-[#172033]">{internship.location || "Remote"}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-[#E9EDF4] pb-2">
                                                <span className="text-[11px] font-medium text-[#7B8497]">Start</span>
                                                <span className="text-[13px] font-bold text-[#172033]">Open now</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <Button
                                                variant={internship.applied ? "gold" : "blue"}
                                                className="w-full justify-center py-2.5 text-[13px] font-bold"
                                                onClick={handleApply}
                                                disabled={applying || internship.applied}
                                            >
                                                {internship.applied ? "✓ Applied" : applying ? "Applying..." : "Apply for Training"}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                className="w-full justify-center py-2.5 text-[13px] font-bold"
                                                onClick={() => { }}
                                            >
                                                Save Opportunity
                                            </Button>
                                        </div>

                                        <div className="mt-4 rounded-xl bg-[#FAFBFC] p-4 space-y-3">
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Trainer</p>
                                                <p className="mt-0.5 text-[12px] font-bold text-[#172033]">
                                                    {trainerName || "Company Team"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7B8497]">Provider</p>
                                                <p className="mt-0.5 text-[12px] font-bold text-[#172033]">
                                                    {internship.companyName || internship.company?.name || "Training Provider"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Card */}
                                    {internship.stats && (internship.stats.totalTasks > 0 || internship.stats.progress !== undefined) && (
                                        <div className="rounded-[18px] border border-[#E9EDF4] bg-white p-5 shadow-sm">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 size={17} color={COLORS.primary} />
                                                <h3 className="text-[16px] font-extrabold text-[#172033]">Progress</h3>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between text-[11px] text-[#7B8497]">
                                                <span>Completion</span>
                                                <span className="font-bold text-[#172033]">{Math.round(internship.stats.progress || 0)}%</span>
                                            </div>
                                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">
                                                <div
                                                    className="h-full rounded-full bg-[#0475FB] transition-all duration-500"
                                                    style={{ width: `${Math.round(internship.stats.progress || 0)}%` }}
                                                />
                                            </div>
                                            <div className="mt-3 grid grid-cols-2 gap-2">
                                                <div className="rounded-xl bg-[#EAF3FF] p-3 text-center">
                                                    <p className="text-[10px] font-semibold uppercase text-[#0475FB]">Tasks</p>
                                                    <p className="mt-0.5 text-[16px] font-extrabold text-[#172033]">
                                                        {internship.stats?.totalTasks ?? 0}
                                                    </p>
                                                </div>
                                                <div className="rounded-xl bg-[#EAF9EF] p-3 text-center">
                                                    <p className="text-[10px] font-semibold uppercase text-[#22C55E]">Completed</p>
                                                    <p className="mt-0.5 text-[16px] font-extrabold text-[#172033]">
                                                        {internship.stats?.completedTasks ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </aside>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>

            {/* Application Modal */}
            <ApplicationModal
                isOpen={showApplicationModal}
                onClose={() => setShowApplicationModal(false)}
                onSubmit={handleApplicationSubmit}
                applying={applying}
                title={internship?.title}
                company={internship?.companyName}
            />
        </div>
    );
}