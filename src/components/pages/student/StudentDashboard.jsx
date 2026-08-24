// // src/components/pages/student/StudentDashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Briefcase,
//   GraduationCap,
//   Clock,
//   Settings,
//   Search,
//   Bell,
//   CalendarDays,
//   CheckCircle2,
//   ClipboardList,
//   MapPin,
//   ChevronDown,
//   ArrowUpRight,
//   Sparkles,
//   Brain,
//   TrendingUp,
//   Target,
//   Timer,
//   AlertCircle,
//   MoreHorizontal,
//   Check,
//   Coffee,
//   Building2,
//   MessageCircle,
// } from "lucide-react";

// import Sidebar from "../../layout/Sidebar";
// import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
// import { useAuth } from "../../../context/AuthContext";
// import { profileAPI, opportunitiesAPI } from "../../../services/api";

// // ============================================================
// // Import global skeleton components
// // ============================================================
// import {
//   SkeletonText,
//   SkeletonCard,
//   SkeletonWelcomeHeader,
//   SkeletonBanner,
//   SkeletonStatCard,
//   SkeletonCalendar,
//   SkeletonChart,
//   SkeletonAICard,
//   SkeletonAssignments,
//   SkeletonSchedule,
// } from "../../common/pagesAssets/Skeleton";

// // ============================================================
// // Tadreeby Design System
// // ============================================================

// const COLORS = {
//   primary: "#0475FB",
//   primaryDark: "#035CC9",
//   primarySoft: "#EAF3FF",
//   accent: "#FFAD4E",
//   accentSoft: "#FFF4E5",
//   green: "#22C55E",
//   greenSoft: "#EAF9EF",
//   purple: "#8B5CF6",
//   purpleSoft: "#F2EDFF",
//   red: "#EF4444",
//   redSoft: "#FEF0F0",
//   text: "#172033",
//   muted: "#7B8497",
//   border: "#E9EDF4",
//   background: "#F5F7FB",
// };

// // ============================================================
// // Navigation (defined outside component)
// // ============================================================

// const studentNavItems = [
//   { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
//   { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
//   { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
//   { label: "Attendance", icon: Clock, path: "/attendance" },
// ];

// const studentFooterItems = [{ label: "Settings", icon: Settings, path: "/settings" }];

// // ============================================================
// // Normalize profile response (same as StudentProfile)
// // ============================================================

// function normalizeProfileResponse(response, previousProfile = {}) {
//   const data = response?.data ?? response;
//   const user = data?.user ?? {};

//   let skills = previousProfile.skills || [];
//   if (data?.skills) {
//     if (Array.isArray(data.skills)) {
//       skills = data.skills;
//     } else if (typeof data.skills === 'string') {
//       try {
//         const parsed = JSON.parse(data.skills);
//         if (Array.isArray(parsed)) skills = parsed;
//       } catch {
//         skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
//       }
//     }
//   }

//   return {
//     ...previousProfile,
//     userId: data?.userId ?? previousProfile.userId,
//     universityId: data?.universityId ?? previousProfile.universityId,
//     studentNumber: data?.studentNumber ?? previousProfile.studentNumber,
//     major: data?.major ?? previousProfile.major,
//     academicYear: data?.academicYear ?? previousProfile.academicYear,
//     gpa: data?.gpa ?? previousProfile.gpa,
//     cvUrl: data?.cvUrl ?? previousProfile.cvUrl,
//     verificationDocument: data?.verificationDocument ?? previousProfile.verificationDocument,
//     hasVerificationDoc: !!data?.verificationDocument || previousProfile.hasVerificationDoc,
//     hasCv: !!data?.cvUrl || previousProfile.hasCv,
//     verificationStatus: data?.approvalStatus?.toLowerCase() ?? previousProfile.verificationStatus,
//     firstName: user?.firstName ?? previousProfile.firstName,
//     lastName: user?.lastName ?? previousProfile.lastName,
//     email: user?.email ?? previousProfile.email,
//     phone: user?.phone ?? previousProfile.phone,
//     avatar: user?.profileImage ?? previousProfile.avatar,
//     recoveryEmail: user?.recoveryEmail ?? previousProfile.recoveryEmail,
//     skills: skills,
//     university: data?.university ?? previousProfile.university,
//   };
// }

// // ============================================================
// // Utility
// // ============================================================

// const getInitials = (name) => {
//   if (!name) return "S";
//   return name
//     .split(" ")
//     .map((word) => word[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// };

// // ============================================================
// // Real Components (used when data is loaded)
// // ============================================================

// // 1. Search Bar
// const SearchBar = () => (
//   <div className="relative w-full">
//     <Search
//       size={17}
//       className="absolute left-4 top-1/2 -translate-y-1/2"
//       color={COLORS.primary}
//     />
//     <input
//       type="text"
//       placeholder="Search tasks, internship activities..."
//       className="h-11 w-full rounded-full border bg-white pl-11 pr-5 text-[13px] font-medium outline-none transition placeholder:text-gray-400 focus:ring-4"
//       style={{ borderColor: COLORS.border }}
//     />
//   </div>
// );

// // 2. Welcome Header
// const WelcomeHeader = ({ profile }) => {
//   const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "Student";
//   const firstName = fullName.split(" ")[0];
//   const universityName = typeof profile?.university === 'string'
//     ? profile.university
//     : (profile?.university?.name || '');

//   return (
//     <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//       <div>
//         <p
//           className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em]"
//           style={{ color: COLORS.muted }}
//         >
//           Student Dashboard
//         </p>

//         <h1
//           className="text-[25px] font-extrabold tracking-[-0.6px]"
//           style={{ color: COLORS.text }}
//         >
//           Welcome back, {firstName}{" "}
//           <span className="inline-block"></span>
//         </h1>

//         <p
//           className="mt-1.5 text-[13px] font-medium"
//           style={{ color: COLORS.muted }}
//         >
//           {profile?.major || "No major"} · {universityName || "No university"}
//         </p>
//       </div>

//       {/* <div className="flex items-center gap-3">
//         <button
//           type="button" 
//           className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
//           style={{ borderColor: COLORS.border }}
//         >
//           <Bell size={18} color={COLORS.primary} />
//           <span
//             className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white"
//             style={{ backgroundColor: COLORS.red }}
//           />
//         </button>

//         <div
//           className="flex items-center gap-2 rounded-full border bg-white py-1.5 pl-1.5 pr-3"
//           style={{ borderColor: COLORS.border }}
//         >
//           {profile?.avatar ? (
//             <img
//               src={profile.avatar}
//               alt={fullName}
//               className="h-8 w-8 rounded-full object-cover"
//             />
//           ) : (
//             <div
//               className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
//               style={{ backgroundColor: COLORS.primary }}
//             >
//               {getInitials(fullName)}
//             </div>
//           )}

//           <span
//             className="hidden text-[12px] font-bold sm:block"
//             style={{ color: COLORS.text }}
//           >
//             {fullName}
//           </span>

//           <ChevronDown size={14} color={COLORS.muted} />
//         </div>
//       </div> */}
//     </div>
//   );
// };

// // 3. Internship Banner
// const InternshipBanner = ({ checkedIn, onCheckIn, profile }) => {
//   const major = profile?.major || "Field Training";
//   const universityName = typeof profile?.university === 'string'
//     ? profile.university
//     : (profile?.university?.name || 'Your University');

//   const internshipTitle = major ? `${major} Intern` : "Field Training Intern";
//   const companyName = universityName ? `${universityName} Partner` : "Your University";

//   return (
//     <div
//       className="relative overflow-hidden rounded-[22px] p-5 sm:p-6"
//       style={{
//         background:
//           "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)",
//         boxShadow: "0 12px 30px rgba(4,117,251,0.18)",
//       }}
//     >
//       <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
//       <div className="pointer-events-none absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5" />

//       <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center gap-4">
//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
//             <Building2 size={22} color="white" />
//           </div>

//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-wider text-white/65">
//               Current Internship
//             </p>

//             <h2 className="mt-0.5 text-[17px] font-extrabold text-white">
//               {internshipTitle}
//             </h2>

//             <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/75">
//               <span>{companyName}</span>
//               <span className="h-1 w-1 rounded-full bg-white/40" />
//               <span>Field Training</span>
//               <span className="h-1 w-1 rounded-full bg-white/40" />
//               <span>Week 8 of 12</span> {/* Placeholder – needs real data */}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="hidden text-right sm:block">
//             <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
//               Today
//             </p>
//             <p className="text-[13px] font-bold text-white">
//               {checkedIn ? "Checked in" : "Not checked in"}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onCheckIn}
//             disabled={checkedIn}
//             className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-default disabled:opacity-90"
//             style={{ color: COLORS.primary }}
//           >
//             {checkedIn ? (
//               <>
//                 <CheckCircle2 size={15} />
//                 Checked In
//               </>
//             ) : (
//               <>
//                 <Clock size={15} />
//                 Check In
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 4. Stat Card
// const StatCard = ({ icon: Icon, label, value, description, iconColor, iconBg, progress }) => (
//   <div
//     className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
//     style={{ borderColor: COLORS.border }}
//   >
//     <div className="flex items-start justify-between">
//       <div
//         className="flex h-9 w-9 items-center justify-center rounded-xl"
//         style={{ backgroundColor: iconBg }}
//       >
//         <Icon size={17} color={iconColor} />
//       </div>
//       <ArrowUpRight size={14} color="#B0B7C5" />
//     </div>

//     <p
//       className="mt-3 text-[10px] font-bold uppercase tracking-wider"
//       style={{ color: COLORS.muted }}
//     >
//       {label}
//     </p>

//     <p
//       className="mt-0.5 text-[19px] font-extrabold"
//       style={{ color: COLORS.text }}
//     >
//       {value}
//     </p>

//     {progress !== undefined ? (
//       <div className="mt-3">
//         <div className="mb-1.5 flex justify-between">
//           <span className="text-[9px] font-semibold text-gray-400">Progress</span>
//           <span className="text-[9px] font-extrabold" style={{ color: iconColor }}>
//             {progress}%
//           </span>
//         </div>
//         <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
//           <div
//             className="h-full rounded-full transition-all duration-700"
//             style={{ width: `${progress}%`, backgroundColor: iconColor }}
//           />
//         </div>
//       </div>
//     ) : (
//       <p className="mt-1 text-[10px] font-medium text-gray-400">{description}</p>
//     )}
//   </div>
// );

// // 5. Legend (for calendar)
// const Legend = ({ color, label }) => (
//   <div className="flex items-center gap-1.5">
//     <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
//     <span className="text-[9px] font-semibold text-gray-400">{label}</span>
//   </div>
// );

// // 6. Attendance Calendar
// const AttendanceCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(17);

//   const days = [
//     { day: 26, status: "present" },
//     { day: 27, status: "present" },
//     { day: 28, status: "late" },
//     { day: 29, status: "present" },
//     { day: 30, status: "present" },
//     { day: 31, status: "weekend" },
//     { day: 1, status: "weekend" },
//     { day: 2, status: "present" },
//     { day: 3, status: "present" },
//     { day: 4, status: "present" },
//     { day: 5, status: "late" },
//     { day: 6, status: "present" },
//     { day: 7, status: "weekend" },
//     { day: 8, status: "weekend" },
//     { day: 9, status: "present" },
//     { day: 10, status: "present" },
//     { day: 11, status: "absent" },
//     { day: 12, status: "present" },
//     { day: 13, status: "present" },
//     { day: 14, status: "weekend" },
//     { day: 15, status: "weekend" },
//     { day: 16, status: "present" },
//     { day: 17, status: "today" },
//     { day: 18, status: "upcoming" },
//     { day: 19, status: "upcoming" },
//     { day: 20, status: "upcoming" },
//     { day: 21, status: "weekend" },
//     { day: 22, status: "weekend" },
//   ];

//   const getStatusStyle = (status, day) => {
//     if (day === selectedDate) {
//       return { backgroundColor: COLORS.primary, color: "white" };
//     }
//     if (status === "present") return { backgroundColor: COLORS.greenSoft, color: "#16A34A" };
//     if (status === "late") return { backgroundColor: COLORS.accentSoft, color: "#D97706" };
//     if (status === "absent") return { backgroundColor: COLORS.redSoft, color: COLORS.red };
//     return { backgroundColor: "#F7F8FA", color: "#A8AFBC" };
//   };

//   return (
//     <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="flex items-center gap-2">
//             <CalendarDays size={17} color={COLORS.primary} />
//             <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
//               Attendance
//             </h3>
//           </div>
//           <p className="mt-1 text-[10px] font-medium text-gray-400">
//             Track your internship attendance
//           </p>
//         </div>
//         <button className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1.5 text-[10px] font-bold text-gray-600">
//           August 2026
//           <ChevronDown size={12} />
//         </button>
//       </div>

//       <div className="mt-5 grid grid-cols-7 gap-1.5">
//         {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//           <div key={`${day}-${index}`} className="pb-1 text-center text-[9px] font-bold text-gray-400">
//             {day}
//           </div>
//         ))}
//         {days.map((item, index) => (
//           <button
//             key={`${item.day}-${index}`}
//             type="button"
//             onClick={() => setSelectedDate(item.day)}
//             className="flex aspect-square items-center justify-center rounded-lg text-[10px] font-bold transition hover:scale-105"
//             style={getStatusStyle(item.status, item.day)}
//           >
//             {item.day}
//           </button>
//         ))}
//       </div>

//       <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4">
//         <Legend color={COLORS.green} label="Present" />
//         <Legend color={COLORS.accent} label="Late" />
//         <Legend color={COLORS.red} label="Absent" />
//         <Legend color={COLORS.primary} label="Today" />
//       </div>

//       <div
//         className="mt-4 flex items-center justify-between rounded-xl p-3"
//         style={{ backgroundColor: COLORS.primarySoft }}
//       >
//         <div>
//           <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
//             Attendance rate
//           </p>
//           <p className="mt-0.5 text-[16px] font-extrabold" style={{ color: COLORS.text }}>
//             92%
//           </p>
//         </div>
//         <div className="text-right">
//           <p className="text-[9px] font-semibold text-gray-400">Hours completed</p>
//           <p className="mt-0.5 text-[12px] font-extrabold" style={{ color: COLORS.primary }}>
//             184 / 200 hrs
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 7. Attendance Chart
// const AttendanceChart = () => {
//   const attendance = [
//     { day: "Sun", value: 7.5 },
//     { day: "Mon", value: 8 },
//     { day: "Tue", value: 6 },
//     { day: "Wed", value: 8 },
//     { day: "Thu", value: 7 },
//     { day: "Fri", value: 4 },
//     { day: "Sat", value: 0 },
//   ];
//   const max = 8;

//   return (
//     <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
//             Hours Activity
//           </h3>
//           <p className="mt-1 text-[10px] font-medium text-gray-400">
//             Your attendance hours this week
//           </p>
//         </div>
//         <button className="flex items-center gap-1 rounded-full border bg-white px-2.5 py-1.5 text-[9px] font-bold text-gray-500">
//           This week
//           <ChevronDown size={11} />
//         </button>
//       </div>

//       <div className="mt-5 flex h-[150px]">
//         <div className="flex w-7 flex-col justify-between pb-6 pt-1">
//           {[8, 6, 4, 2, 0].map((number) => (
//             <span key={number} className="text-[8px] font-semibold text-gray-300">
//               {number}h
//             </span>
//           ))}
//         </div>
//         <div className="relative flex flex-1 items-end justify-between gap-2 border-b border-gray-100">
//           <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6">
//             {[0, 1, 2, 3, 4].map((line) => (
//               <div key={line} className="border-t border-dashed border-gray-100" />
//             ))}
//           </div>
//           {attendance.map((item) => {
//             const height = `${(item.value / max) * 100}%`;
//             return (
//               <div key={item.day} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end">
//                 {item.value > 0 && (
//                   <div
//                     className="group relative w-4 rounded-t-full transition-all duration-500 hover:w-5"
//                     style={{
//                       height,
//                       backgroundColor: item.day === "Mon" ? COLORS.primary : "rgba(4,117,251,0.22)",
//                     }}
//                   >
//                     <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] font-bold text-white group-hover:block">
//                       {item.value}h
//                     </div>
//                   </div>
//                 )}
//                 <span className="absolute -bottom-5 text-[8px] font-bold text-gray-400">
//                   {item.day}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 8. AI Performance Card
// const AIPerformanceCard = () => {
//   const score = 87;
//   return (
//     <div
//       className="relative overflow-hidden rounded-[20px] p-5"
//       style={{
//         background: "linear-gradient(145deg, #102B4F 0%, #123E70 60%, #0475FB 140%)",
//         boxShadow: "0 10px 28px rgba(15,45,80,0.16)",
//       }}
//     >
//       <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0475FB]/25 blur-2xl" />
//       <div className="relative z-10">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2.5">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
//               <Brain size={17} color="#FFFFFF" />
//             </div>
//             <div>
//               <p className="text-[13px] font-extrabold text-white">AI Performance</p>
//               <p className="text-[9px] font-medium text-white/50">
//                 Based on your internship activity
//               </p>
//             </div>
//           </div>
//           <Sparkles size={17} color={COLORS.accent} />
//         </div>

//         <div className="mt-6 flex items-center gap-5">
//           <div className="relative h-[92px] w-[92px] shrink-0">
//             <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90">
//               <circle cx="46" cy="46" r="39" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
//               <circle
//                 cx="46"
//                 cy="46"
//                 r="39"
//                 fill="none"
//                 stroke="#FFAD4E"
//                 strokeWidth="7"
//                 strokeLinecap="round"
//                 strokeDasharray={`${(score / 100) * 245} 245`}
//               />
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="text-[23px] font-extrabold text-white">{score}</span>
//               <span className="text-[8px] font-bold text-white/45">/ 100</span>
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center gap-1.5">
//               <TrendingUp size={13} color="#4ADE80" />
//               <span className="text-[11px] font-bold text-green-300">+6%</span>
//               <span className="text-[9px] font-medium text-white/40">this week</span>
//             </div>
//             <p className="mt-2 text-[11px] font-medium leading-5 text-white/65">
//               Your performance is above the average for students in similar internships.
//             </p>
//           </div>
//         </div>

//         <div className="mt-5 grid grid-cols-3 gap-2">
//           <AIMiniStat label="Tasks" value="91%" />
//           <AIMiniStat label="Skills" value="84%" />
//           <AIMiniStat label="Growth" value="86%" />
//         </div>

//         <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-[10px] font-bold text-white transition hover:bg-white/15">
//           <Sparkles size={12} color={COLORS.accent} />
//           View AI Insights
//           <ArrowUpRight size={12} />
//         </button>
//       </div>
//     </div>
//   );
// };

// const AIMiniStat = ({ label, value }) => (
//   <div className="rounded-xl bg-white/[0.07] p-2.5">
//     <p className="text-[8px] font-medium text-white/40">{label}</p>
//     <p className="mt-0.5 text-[12px] font-extrabold text-white">{value}</p>
//   </div>
// );

// // 9. Assignments Card
// const ASSIGNMENTS = [
//   {
//     title: "Build Authentication API",
//     type: "Technical Task",
//     due: "Today, 4:00 PM",
//     status: "In Progress",
//     icon: ClipboardList,
//     iconColor: COLORS.primary,
//     iconBg: COLORS.primarySoft,
//   },
//   {
//     title: "Weekly Training Report",
//     type: "Report",
//     due: "Tomorrow, 10:00 AM",
//     status: "Pending",
//     icon: Target,
//     iconColor: COLORS.accent,
//     iconBg: COLORS.accentSoft,
//   },
//   {
//     title: "Code Review Session",
//     type: "Training",
//     due: "Aug 25, 11:00 AM",
//     status: "Upcoming",
//     icon: MessageCircle,
//     iconColor: COLORS.purple,
//     iconBg: COLORS.purpleSoft,
//   },
// ];

// const AssignmentsCard = () => (
//   <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
//     <div className="flex items-center justify-between">
//       <div>
//         <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
//           Assignments
//         </h3>
//         <p className="mt-1 text-[10px] font-medium text-gray-400">
//           Tasks from your internship
//         </p>
//       </div>
//       <button
//         type="button"
//         className="text-[10px] font-extrabold transition hover:underline"
//         style={{ color: COLORS.primary }}
//       >
//         View all
//       </button>
//     </div>

//     <div className="mt-4 space-y-2.5">
//       {ASSIGNMENTS.map((assignment) => {
//         const Icon = assignment.icon;
//         return (
//           <div
//             key={assignment.title}
//             className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition hover:border-gray-100 hover:bg-gray-50"
//           >
//             <div
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
//               style={{ backgroundColor: assignment.iconBg }}
//             >
//               <Icon size={15} color={assignment.iconColor} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-[11px] font-extrabold" style={{ color: COLORS.text }}>
//                 {assignment.title}
//               </p>
//               <div className="mt-1 flex items-center gap-1.5">
//                 <span className="text-[8px] font-medium text-gray-400">{assignment.type}</span>
//                 <span className="h-1 w-1 rounded-full bg-gray-300" />
//                 <span className="text-[8px] font-medium text-gray-400">{assignment.due}</span>
//               </div>
//             </div>
//             <span
//               className="hidden rounded-full px-2 py-1 text-[8px] font-bold sm:block"
//               style={{
//                 backgroundColor:
//                   assignment.status === "In Progress"
//                     ? COLORS.primarySoft
//                     : assignment.status === "Pending"
//                       ? COLORS.accentSoft
//                       : "#F2F4F7",
//                 color:
//                   assignment.status === "In Progress"
//                     ? COLORS.primary
//                     : assignment.status === "Pending"
//                       ? "#D97706"
//                       : COLORS.muted,
//               }}
//             >
//               {assignment.status}
//             </span>
//             <ArrowUpRight
//               size={13}
//               color="#B8BFCA"
//               className="opacity-0 transition group-hover:opacity-100"
//             />
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );

// // 10. Internship Progress
// const InternshipProgress = () => {
//   const progress = 67;
//   const milestones = [
//     { title: "Orientation", status: "completed", date: "Jun 30" },
//     { title: "Training Phase", status: "completed", date: "Jul 01" },
//     { title: "Practical Training", status: "current", date: "Current" },
//     { title: "Final Evaluation", status: "upcoming", date: "Sep 15" },
//   ];

//   return (
//     <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
//             Current Internship
//           </h3>
//           <p className="mt-1 text-[10px] font-medium text-gray-400">
//             Your journey at TechCorp
//           </p>
//         </div>
//         <span
//           className="rounded-full px-2.5 py-1 text-[9px] font-extrabold"
//           style={{ backgroundColor: COLORS.greenSoft, color: "#16A34A" }}
//         >
//           On Track
//         </span>
//       </div>

//       <div className="mt-5 flex items-end justify-between">
//         <div>
//           <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
//             Overall progress
//           </p>
//           <p className="mt-0.5 text-[26px] font-extrabold tracking-tight" style={{ color: COLORS.text }}>
//             {progress}%
//           </p>
//         </div>
//         <div className="text-right">
//           <p className="text-[9px] font-medium text-gray-400">Internship duration</p>
//           <p className="mt-0.5 text-[11px] font-extrabold text-gray-700">8 / 12 weeks</p>
//         </div>
//       </div>

//       <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
//         <div
//           className="h-full rounded-full"
//           style={{
//             width: `${progress}%`,
//             background: `linear-gradient(90deg, ${COLORS.primary}, #38A0FF)`,
//           }}
//         />
//       </div>

//       <div className="mt-6">
//         {milestones.map((milestone, index) => {
//           const completed = milestone.status === "completed";
//           const current = milestone.status === "current";
//           return (
//             <div key={milestone.title} className="relative flex items-start gap-3 pb-4 last:pb-0">
//               {index !== milestones.length - 1 && (
//                 <div
//                   className="absolute left-[9px] top-5 h-[calc(100%-8px)] w-px"
//                   style={{ backgroundColor: completed ? "#A8D9B8" : COLORS.border }}
//                 />
//               )}
//               <div
//                 className="relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full"
//                 style={{
//                   backgroundColor: completed ? COLORS.green : current ? COLORS.primary : "#F1F3F6",
//                   border: current ? "3px solid #DCEBFF" : "none",
//                 }}
//               >
//                 {completed ? <Check size={10} color="white" strokeWidth={3} /> : current ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
//               </div>
//               <div className="flex flex-1 items-center justify-between">
//                 <div>
//                   <p className="text-[10px] font-extrabold" style={{ color: completed || current ? COLORS.text : "#A3AAB7" }}>
//                     {milestone.title}
//                   </p>
//                   {current && <p className="mt-0.5 text-[8px] font-semibold" style={{ color: COLORS.primary }}>You are here</p>}
//                 </div>
//                 <span className="text-[8px] font-semibold text-gray-400">{milestone.date}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // 11. Today's Schedule
// const TodaySchedule = () => {
//   const schedule = [
//     { time: "09:00", title: "Check In", subtitle: "TechCorp Office", icon: Clock, color: COLORS.primary, bg: COLORS.primarySoft },
//     { time: "10:00", title: "Daily Standup", subtitle: "Team Meeting", icon: MessageCircle, color: COLORS.purple, bg: COLORS.purpleSoft },
//     { time: "12:30", title: "Lunch Break", subtitle: "01:00 PM", icon: Coffee, color: COLORS.accent, bg: COLORS.accentSoft },
//     { time: "02:00", title: "Practical Training", subtitle: "Backend Development", icon: GraduationCap, color: COLORS.green, bg: COLORS.greenSoft },
//   ];

//   return (
//     <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
//             Today&apos;s Schedule
//           </h3>
//           <p className="mt-1 text-[10px] font-medium text-gray-400">
//             Sunday, August 23
//           </p>
//         </div>
//         <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50">
//           <MoreHorizontal size={15} color={COLORS.muted} />
//         </button>
//       </div>

//       <div className="mt-5 space-y-1">
//         {schedule.map((item, index) => {
//           const Icon = item.icon;
//           return (
//             <div key={item.title} className="relative flex gap-3 py-2">
//               <div className="w-9 shrink-0 pt-1">
//                 <p className="text-[8px] font-bold text-gray-400">{item.time}</p>
//               </div>
//               <div
//                 className="absolute left-[45px] top-0 h-full w-px"
//                 style={{ backgroundColor: index === schedule.length - 1 ? "transparent" : "#EEF1F5" }}
//               />
//               <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: item.bg }}>
//                 <Icon size={14} color={item.color} />
//               </div>
//               <div className="min-w-0 pt-0.5">
//                 <p className="text-[10px] font-extrabold" style={{ color: COLORS.text }}>
//                   {item.title}
//                 </p>
//                 <p className="mt-0.5 truncate text-[8px] font-medium text-gray-400">{item.subtitle}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // MAIN DASHBOARD COMPONENT
// // ============================================================

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const { logout, user } = useAuth();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [opportunitiesCount, setOpportunitiesCount] = useState(0);
//   const [checkedIn, setCheckedIn] = useState(false);

//   // ── Fetch data ──
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await profileAPI.getProfile();
//         const normalized = normalizeProfileResponse(response, {});
//         if (normalized.university && typeof normalized.university === 'object') {
//           normalized.university = normalized.university.name || '';
//         }
//         setProfile(normalized);

//         const oppResponse = await opportunitiesAPI.getAvailableOpportunities();
//         const oppList = oppResponse?.data ?? [];
//         setOpportunitiesCount(Array.isArray(oppList) ? oppList.length : 0);
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//         if (user) {
//           const fallback = {
//             firstName: user.firstName || '',
//             lastName: user.lastName || '',
//             email: user.email || '',
//             major: user.studentProfile?.major || 'Software Engineering',
//             university: user.studentProfile?.university?.name || 'Al-Azhar University',
//             studentNumber: user.studentProfile?.studentNumber || '',
//             gpa: user.studentProfile?.gpa || '',
//             avatar: user.profileImage || '',
//           };
//           setProfile(fallback);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const handleSignOut = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const handleCheckIn = () => {
//     setCheckedIn(true);
//     // TODO: Call real check-in API
//   };

//   const fullName = useMemo(() => {
//     if (!profile) return "Student";
//     return `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student";
//   }, [profile]);

//   const studentUser = useMemo(() => ({
//     name: fullName,
//     role: "Student",
//     avatar: profile?.avatar || "",
//   }), [fullName, profile]);

//   // Stats – placeholder values (will be replaced with real data later)
//   const stats = [
//     {
//       icon: Clock,
//       label: "Attendance",
//       value: "92%",
//       description: "2 late arrivals",
//       iconColor: COLORS.primary,
//       iconBg: COLORS.primarySoft,
//     },
//     {
//       icon: Timer,
//       label: "Training Hours",
//       value: "184 hrs",
//       description: "16 hrs remaining",
//       iconColor: COLORS.accent,
//       iconBg: COLORS.accentSoft,
//     },
//     {
//       icon: ClipboardList,
//       label: "Assignments",
//       value: "8 / 10",
//       description: "2 pending tasks",
//       iconColor: COLORS.purple,
//       iconBg: COLORS.purpleSoft,
//       progress: 80,
//     },
//     {
//       icon: TrendingUp,
//       label: "Performance",
//       value: "87 / 100",
//       description: "Above average",
//       iconColor: COLORS.green,
//       iconBg: COLORS.greenSoft,
//     },
//   ];

//   // ── Render ──
//   return (
//     <div className="flex h-screen w-full overflow-hidden font-sans" style={{ backgroundColor: COLORS.background }}>
//       <Sidebar
//         navItems={studentNavItems}
//         footerItems={studentFooterItems}
//         user={studentUser}
//         profilePath="/student/profile"
//         onSignOut={handleSignOut}
//       />

//       <main className="flex-1 overflow-y-auto">
//         <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
//           {/* Top Bar */}
//           <div className="mb-6 flex items-center gap-5">
//             <div className="flex-1">
//               {loading ? (
//                 <div className="relative h-11 w-full animate-pulse rounded-full bg-gray-200" />
//               ) : (
//                 <SearchBar />
//               )}
//             </div>
//             {/* <div className="hidden lg:block">
//               {loading ? (
//                 <div className="flex items-center gap-3">
//                   <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
//                   <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
//                 </div>
//               ) : (
//                 <TopIconCluster
//                   chatBadge={3}
//                   notificationBadge={4}
//                   avatarUrl={studentUser.avatar}
//                   userName={studentUser.name}
//                 />
//               )}
//             </div> */}


// <div className="hidden lg:block">
//   {loading ? (
//     <div className="flex items-center gap-3">
//       <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
//       <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
//     </div>
//   ) : (
//     <div className="flex items-center gap-3">
//       <button
//         type="button"
//         className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
//         style={{ borderColor: COLORS.border }}
//       >
//         <Bell size={18} color={COLORS.primary} />
//         <span
//           className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white"
//           style={{ backgroundColor: COLORS.red }}
//         />
//       </button>

//       <div
//         className="flex items-center gap-2 rounded-full border bg-white py-1.5 pl-1.5 pr-3"
//         style={{ borderColor: COLORS.border }}
//       >
//         {profile?.avatar ? (
//           <img
//             src={profile.avatar}
//             alt={fullName}
//             className="h-8 w-8 rounded-full object-cover"
//           />
//         ) : (
//           <div
//             className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
//             style={{ backgroundColor: COLORS.primary }}
//           >
//             {getInitials(fullName)}
//           </div>
//         )}

//         <span
//           className="hidden text-[12px] font-bold sm:block"
//           style={{ color: COLORS.text }}
//         >
//           {fullName}
//         </span>

//         <ChevronDown size={14} color={COLORS.muted} />
//       </div>
//     </div>
//   )}
// </div>
//           </div>

//           {/* Welcome Header */}
//           {loading ? <SkeletonWelcomeHeader /> : <WelcomeHeader profile={profile} />}

//           {/* Internship Banner */}
//           <div className="mt-6">
//             {loading ? (
//               <SkeletonBanner />
//             ) : (
//               <InternshipBanner
//                 checkedIn={checkedIn}
//                 onCheckIn={handleCheckIn}
//                 profile={profile}
//               />
//             )}
//           </div>

//           {/* Quick Stats */}
//           <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//             {loading ? (
//               <>
//                 <SkeletonStatCard />
//                 <SkeletonStatCard />
//                 <SkeletonStatCard />
//                 <SkeletonStatCard />
//               </>
//             ) : (
//               stats.map((stat) => <StatCard key={stat.label} {...stat} />)
//             )}
//           </div>

//           {/* Main Grid */}
//           <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
//             <div className="min-w-0 space-y-5">
//               <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
//                 {loading ? (
//                   <>
//                     <SkeletonCalendar />
//                     <SkeletonChart />
//                   </>
//                 ) : (
//                   <>
//                     <AttendanceCalendar />
//                     <AttendanceChart />
//                   </>
//                 )}
//               </div>
//               {loading ? (
//                 <SkeletonCard className="p-5">
//                   <SkeletonText className="h-6 w-48" />
//                   <SkeletonText className="mt-2 h-3 w-full" />
//                   <div className="mt-4 flex items-end justify-between">
//                     <SkeletonText className="h-8 w-20" />
//                     <SkeletonText className="h-4 w-24" />
//                   </div>
//                   <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-gray-200" />
//                 </SkeletonCard>
//               ) : (
//                 <InternshipProgress />
//               )}
//             </div>

//             <div className="space-y-5">
//               {loading ? (
//                 <>
//                   <SkeletonAICard />
//                   <SkeletonAssignments />
//                   <SkeletonSchedule />
//                 </>
//               ) : (
//                 <>
//                   <AIPerformanceCard />
//                   <AssignmentsCard />
//                   <TodaySchedule />
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="mt-5 flex flex-col items-center justify-between gap-2 pb-5 text-center sm:flex-row sm:text-left">
//             <p className="text-[9px] font-medium text-gray-400">
//               Tadreeby helps you stay on track throughout your field training.
//             </p>
//             <button
//               type="button"
//               onClick={() => navigate("/attendance")}
//               className="flex items-center gap-1 text-[9px] font-extrabold transition hover:underline"
//               style={{ color: COLORS.primary }}
//             >
//               View full attendance
//               <ArrowUpRight size={11} />
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;




// src/components/pages/student/StudentDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Clock,
  Settings,
  Search,
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Timer,
  AlertCircle,
  MoreHorizontal,
  Check,
  Coffee,
  Building2,
  MessageCircle,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
import { useAuth } from "../../../context/AuthContext";
import { profileAPI, opportunitiesAPI } from "../../../services/api";
import AIAssistant from "../../common/pagesAssets/AIAssistant";
import PageHeader from "../../common/pagesAssets/PageHeader"; 
// ============================================================
// Import global skeleton components (كلها مستخدمة)
// ============================================================
import {
  SkeletonText,
  SkeletonCard,
  SkeletonWelcomeHeader,
  SkeletonBanner,
  SkeletonStatCard,
  SkeletonCalendar,
  SkeletonChart,
  SkeletonAICard,
  SkeletonAssignments,
  SkeletonSchedule,
} from "../../common/pagesAssets/Skeleton";

// ============================================================
// Tadreeby Design System
// ============================================================
const COLORS = {
  primary: "#0475FB",
  primaryDark: "#035CC9",
  primarySoft: "#EAF3FF",
  accent: "#FFAD4E",
  accentSoft: "#FFF4E5",
  green: "#22C55E",
  greenSoft: "#EAF9EF",
  purple: "#8B5CF6",
  purpleSoft: "#F2EDFF",
  red: "#EF4444",
  redSoft: "#FEF0F0",
  text: "#172033",
  muted: "#7B8497",
  border: "#E9EDF4",
  background: "#F5F7FB",
};

// ============================================================
// Navigation (defined outside component)
// ============================================================
const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
  { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
  { label: "Attendance", icon: Clock, path: "/attendance" },
];

const studentFooterItems = [{ label: "Settings", icon: Settings, path: "/settings" }];

// ============================================================
// Normalize profile response (same as StudentProfile)
// ============================================================
function normalizeProfileResponse(response, previousProfile = {}) {
  const data = response?.data ?? response;
  const user = data?.user ?? {};

  let skills = previousProfile.skills || [];
  if (data?.skills) {
    if (Array.isArray(data.skills)) {
      skills = data.skills;
    } else if (typeof data.skills === 'string') {
      try {
        const parsed = JSON.parse(data.skills);
        if (Array.isArray(parsed)) skills = parsed;
      } catch {
        skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
  }

  return {
    ...previousProfile,
    userId: data?.userId ?? previousProfile.userId,
    universityId: data?.universityId ?? previousProfile.universityId,
    studentNumber: data?.studentNumber ?? previousProfile.studentNumber,
    major: data?.major ?? previousProfile.major,
    academicYear: data?.academicYear ?? previousProfile.academicYear,
    gpa: data?.gpa ?? previousProfile.gpa,
    cvUrl: data?.cvUrl ?? previousProfile.cvUrl,
    verificationDocument: data?.verificationDocument ?? previousProfile.verificationDocument,
    hasVerificationDoc: !!data?.verificationDocument || previousProfile.hasVerificationDoc,
    hasCv: !!data?.cvUrl || previousProfile.hasCv,
    verificationStatus: data?.approvalStatus?.toLowerCase() ?? previousProfile.verificationStatus,
    firstName: user?.firstName ?? previousProfile.firstName,
    lastName: user?.lastName ?? previousProfile.lastName,
    email: user?.email ?? previousProfile.email,
    phone: user?.phone ?? previousProfile.phone,
    avatar: user?.profileImage ?? previousProfile.avatar,
    recoveryEmail: user?.recoveryEmail ?? previousProfile.recoveryEmail,
    skills: skills,
    university: data?.university ?? previousProfile.university,
  };
}

// ============================================================
// Utility
// ============================================================
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
// Real Components (used when data is loaded)
// ============================================================

// 2. Welcome Header
const WelcomeHeader = ({ profile }) => {
  const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "Student";
  const firstName = fullName.split(" ")[0];
  const universityName = typeof profile?.university === 'string'
    ? profile.university
    : (profile?.university?.name || '');

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p
          className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: COLORS.muted }}
        >
          Student Dashboard
        </p>

        <h1
          className="text-[25px] font-extrabold tracking-[-0.6px]"
          style={{ color: COLORS.text }}
        >
          Welcome back, {firstName}{" "}
          <span className="inline-block"></span>
        </h1>

        <p
          className="mt-1.5 text-[13px] font-medium"
          style={{ color: COLORS.muted }}
        >
          {profile?.major || "No major"} · {universityName || "No university"}
        </p>
      </div>
    </div>
  );
};

// 3. Internship Banner
const InternshipBanner = ({ checkedIn, onCheckIn, profile }) => {
  const major = profile?.major || "Field Training";
  const universityName = typeof profile?.university === 'string'
    ? profile.university
    : (profile?.university?.name || 'Your University');

  const internshipTitle = major ? `${major} Intern` : "Field Training Intern";
  const companyName = universityName ? `${universityName} Partner` : "Your University";

  return (
    <div
      className="relative overflow-hidden rounded-[22px] p-5 sm:p-6"
      style={{
        background:
          "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)",
        boxShadow: "0 12px 30px rgba(4,117,251,0.18)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/5" />

      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Building2 size={22} color="white" />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/65">
              Current Internship
            </p>

            <h2 className="mt-0.5 text-[17px] font-extrabold text-white">
              {internshipTitle}
            </h2>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/75">
              <span>{companyName}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Field Training</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Week 8 of 12</span> {/* Placeholder – needs real data */}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
              Today
            </p>
            <p className="text-[13px] font-bold text-white">
              {checkedIn ? "Checked in" : "Not checked in"}
            </p>
          </div>

          <button
            type="button"
            onClick={onCheckIn}
            disabled={checkedIn}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-default disabled:opacity-90"
            style={{ color: COLORS.primary }}
          >
            {checkedIn ? (
              <>
                <CheckCircle2 size={15} />
                Checked In
              </>
            ) : (
              <>
                <Clock size={15} />
                Check In
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Stat Card
const StatCard = ({ icon: Icon, label, value, description, iconColor, iconBg, progress }) => (
  <div
    className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    style={{ borderColor: COLORS.border }}
  >
    <div className="flex items-start justify-between">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={17} color={iconColor} />
      </div>
      <ArrowUpRight size={14} color="#B0B7C5" />
    </div>

    <p
      className="mt-3 text-[10px] font-bold uppercase tracking-wider"
      style={{ color: COLORS.muted }}
    >
      {label}
    </p>

    <p
      className="mt-0.5 text-[19px] font-extrabold"
      style={{ color: COLORS.text }}
    >
      {value}
    </p>

    {progress !== undefined ? (
      <div className="mt-3">
        <div className="mb-1.5 flex justify-between">
          <span className="text-[9px] font-semibold text-gray-400">Progress</span>
          <span className="text-[9px] font-extrabold" style={{ color: iconColor }}>
            {progress}%
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, backgroundColor: iconColor }}
          />
        </div>
      </div>
    ) : (
      <p className="mt-1 text-[10px] font-medium text-gray-400">{description}</p>
    )}
  </div>
);

// 5. Legend (for calendar)
const Legend = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[9px] font-semibold text-gray-400">{label}</span>
  </div>
);

// 6. Attendance Calendar
const AttendanceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(17);

  const days = [
    { day: 26, status: "present" },
    { day: 27, status: "present" },
    { day: 28, status: "late" },
    { day: 29, status: "present" },
    { day: 30, status: "present" },
    { day: 31, status: "weekend" },
    { day: 1, status: "weekend" },
    { day: 2, status: "present" },
    { day: 3, status: "present" },
    { day: 4, status: "present" },
    { day: 5, status: "late" },
    { day: 6, status: "present" },
    { day: 7, status: "weekend" },
    { day: 8, status: "weekend" },
    { day: 9, status: "present" },
    { day: 10, status: "present" },
    { day: 11, status: "absent" },
    { day: 12, status: "present" },
    { day: 13, status: "present" },
    { day: 14, status: "weekend" },
    { day: 15, status: "weekend" },
    { day: 16, status: "present" },
    { day: 17, status: "today" },
    { day: 18, status: "upcoming" },
    { day: 19, status: "upcoming" },
    { day: 20, status: "upcoming" },
    { day: 21, status: "weekend" },
    { day: 22, status: "weekend" },
  ];

  const getStatusStyle = (status, day) => {
    if (day === selectedDate) {
      return { backgroundColor: COLORS.primary, color: "white" };
    }
    if (status === "present") return { backgroundColor: COLORS.greenSoft, color: "#16A34A" };
    if (status === "late") return { backgroundColor: COLORS.accentSoft, color: "#D97706" };
    if (status === "absent") return { backgroundColor: COLORS.redSoft, color: COLORS.red };
    return { backgroundColor: "#F7F8FA", color: "#A8AFBC" };
  };

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
        <button className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1.5 text-[10px] font-bold text-gray-600">
          August 2026
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={`${day}-${index}`} className="pb-1 text-center text-[9px] font-bold text-gray-400">
            {day}
          </div>
        ))}
        {days.map((item, index) => (
          <button
            key={`${item.day}-${index}`}
            type="button"
            onClick={() => setSelectedDate(item.day)}
            className="flex aspect-square items-center justify-center rounded-lg text-[10px] font-bold transition hover:scale-105"
            style={getStatusStyle(item.status, item.day)}
          >
            {item.day}
          </button>
        ))}
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
            92%
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-semibold text-gray-400">Hours completed</p>
          <p className="mt-0.5 text-[12px] font-extrabold" style={{ color: COLORS.primary }}>
            184 / 200 hrs
          </p>
        </div>
      </div>
    </div>
  );
};

// 7. Attendance Chart
const AttendanceChart = () => {
  const attendance = [
    { day: "Sun", value: 7.5 },
    { day: "Mon", value: 8 },
    { day: "Tue", value: 6 },
    { day: "Wed", value: 8 },
    { day: "Thu", value: 7 },
    { day: "Fri", value: 4 },
    { day: "Sat", value: 0 },
  ];
  const max = 8;

  return (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
            Hours Activity
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Your attendance hours this week
          </p>
        </div>
        <button className="flex items-center gap-1 rounded-full border bg-white px-2.5 py-1.5 text-[9px] font-bold text-gray-500">
          This week
          <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-5 flex h-[150px]">
        <div className="flex w-7 flex-col justify-between pb-6 pt-1">
          {[8, 6, 4, 2, 0].map((number) => (
            <span key={number} className="text-[8px] font-semibold text-gray-300">
              {number}h
            </span>
          ))}
        </div>
        <div className="relative flex flex-1 items-end justify-between gap-2 border-b border-gray-100">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="border-t border-dashed border-gray-100" />
            ))}
          </div>
          {attendance.map((item) => {
            const height = `${(item.value / max) * 100}%`;
            return (
              <div key={item.day} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end">
                {item.value > 0 && (
                  <div
                    className="group relative w-4 rounded-t-full transition-all duration-500 hover:w-5"
                    style={{
                      height,
                      backgroundColor: item.day === "Mon" ? COLORS.primary : "rgba(4,117,251,0.22)",
                    }}
                  >
                    <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[8px] font-bold text-white group-hover:block">
                      {item.value}h
                    </div>
                  </div>
                )}
                <span className="absolute -bottom-5 text-[8px] font-bold text-gray-400">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 8. AI Performance Card
const AIPerformanceCard = () => {
  const score = 87;
  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-5"
      style={{
        background: "linear-gradient(145deg, #102B4F 0%, #123E70 60%, #0475FB 140%)",
        boxShadow: "0 10px 28px rgba(15,45,80,0.16)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0475FB]/25 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Brain size={17} color="#FFFFFF" />
            </div>
            <div>
              <p className="text-[13px] font-extrabold text-white">AI Performance</p>
              <p className="text-[9px] font-medium text-white/50">
                Based on your internship activity
              </p>
            </div>
          </div>
          <Sparkles size={17} color={COLORS.accent} />
        </div>

        <div className="mt-6 flex items-center gap-5">
          <div className="relative h-[92px] w-[92px] shrink-0">
            <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90">
              <circle cx="46" cy="46" r="39" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
              <circle
                cx="46"
                cy="46"
                r="39"
                fill="none"
                stroke="#FFAD4E"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 245} 245`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[23px] font-extrabold text-white">{score}</span>
              <span className="text-[8px] font-bold text-white/45">/ 100</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={13} color="#4ADE80" />
              <span className="text-[11px] font-bold text-green-300">+6%</span>
              <span className="text-[9px] font-medium text-white/40">this week</span>
            </div>
            <p className="mt-2 text-[11px] font-medium leading-5 text-white/65">
              Your performance is above the average for students in similar internships.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <AIMiniStat label="Tasks" value="91%" />
          <AIMiniStat label="Skills" value="84%" />
          <AIMiniStat label="Growth" value="86%" />
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-[10px] font-bold text-white transition hover:bg-white/15">
          <Sparkles size={12} color={COLORS.accent} />
          View AI Insights
          <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
};

const AIMiniStat = ({ label, value }) => (
  <div className="rounded-xl bg-white/[0.07] p-2.5">
    <p className="text-[8px] font-medium text-white/40">{label}</p>
    <p className="mt-0.5 text-[12px] font-extrabold text-white">{value}</p>
  </div>
);

// 9. Assignments Card
const ASSIGNMENTS = [
  {
    title: "Build Authentication API",
    type: "Technical Task",
    due: "Today, 4:00 PM",
    status: "In Progress",
    icon: ClipboardList,
    iconColor: COLORS.primary,
    iconBg: COLORS.primarySoft,
  },
  {
    title: "Weekly Training Report",
    type: "Report",
    due: "Tomorrow, 10:00 AM",
    status: "Pending",
    icon: Target,
    iconColor: COLORS.accent,
    iconBg: COLORS.accentSoft,
  },
  {
    title: "Code Review Session",
    type: "Training",
    due: "Aug 25, 11:00 AM",
    status: "Upcoming",
    icon: MessageCircle,
    iconColor: COLORS.purple,
    iconBg: COLORS.purpleSoft,
  },
];

const AssignmentsCard = () => (
  <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
          Assignments
        </h3>
        <p className="mt-1 text-[10px] font-medium text-gray-400">
          Tasks from your internship
        </p>
      </div>
      <button
        type="button"
        className="text-[10px] font-extrabold transition hover:underline"
        style={{ color: COLORS.primary }}
      >
        View all
      </button>
    </div>

    <div className="mt-4 space-y-2.5">
      {ASSIGNMENTS.map((assignment) => {
        const Icon = assignment.icon;
        return (
          <div
            key={assignment.title}
            className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition hover:border-gray-100 hover:bg-gray-50"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: assignment.iconBg }}
            >
              <Icon size={15} color={assignment.iconColor} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-extrabold" style={{ color: COLORS.text }}>
                {assignment.title}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[8px] font-medium text-gray-400">{assignment.type}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="text-[8px] font-medium text-gray-400">{assignment.due}</span>
              </div>
            </div>
            <span
              className="hidden rounded-full px-2 py-1 text-[8px] font-bold sm:block"
              style={{
                backgroundColor:
                  assignment.status === "In Progress"
                    ? COLORS.primarySoft
                    : assignment.status === "Pending"
                      ? COLORS.accentSoft
                      : "#F2F4F7",
                color:
                  assignment.status === "In Progress"
                    ? COLORS.primary
                    : assignment.status === "Pending"
                      ? "#D97706"
                      : COLORS.muted,
              }}
            >
              {assignment.status}
            </span>
            <ArrowUpRight
              size={13}
              color="#B8BFCA"
              className="opacity-0 transition group-hover:opacity-100"
            />
          </div>
        );
      })}
    </div>
  </div>
);

// 10. Internship Progress
const InternshipProgress = () => {
  const progress = 67;
  const milestones = [
    { title: "Orientation", status: "completed", date: "Jun 30" },
    { title: "Training Phase", status: "completed", date: "Jul 01" },
    { title: "Practical Training", status: "current", date: "Current" },
    { title: "Final Evaluation", status: "upcoming", date: "Sep 15" },
  ];

  return (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
            Current Internship
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Your journey at TechCorp
          </p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[9px] font-extrabold"
          style={{ backgroundColor: COLORS.greenSoft, color: "#16A34A" }}
        >
          On Track
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Overall progress
          </p>
          <p className="mt-0.5 text-[26px] font-extrabold tracking-tight" style={{ color: COLORS.text }}>
            {progress}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-medium text-gray-400">Internship duration</p>
          <p className="mt-0.5 text-[11px] font-extrabold text-gray-700">8 / 12 weeks</p>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, #38A0FF)`,
          }}
        />
      </div>

      <div className="mt-6">
        {milestones.map((milestone, index) => {
          const completed = milestone.status === "completed";
          const current = milestone.status === "current";
          return (
            <div key={milestone.title} className="relative flex items-start gap-3 pb-4 last:pb-0">
              {index !== milestones.length - 1 && (
                <div
                  className="absolute left-[9px] top-5 h-[calc(100%-8px)] w-px"
                  style={{ backgroundColor: completed ? "#A8D9B8" : COLORS.border }}
                />
              )}
              <div
                className="relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: completed ? COLORS.green : current ? COLORS.primary : "#F1F3F6",
                  border: current ? "3px solid #DCEBFF" : "none",
                }}
              >
                {completed ? <Check size={10} color="white" strokeWidth={3} /> : current ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-[10px] font-extrabold" style={{ color: completed || current ? COLORS.text : "#A3AAB7" }}>
                    {milestone.title}
                  </p>
                  {current && <p className="mt-0.5 text-[8px] font-semibold" style={{ color: COLORS.primary }}>You are here</p>}
                </div>
                <span className="text-[8px] font-semibold text-gray-400">{milestone.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 11. Today's Schedule
const TodaySchedule = () => {
  const schedule = [
    { time: "09:00", title: "Check In", subtitle: "TechCorp Office", icon: Clock, color: COLORS.primary, bg: COLORS.primarySoft },
    { time: "10:00", title: "Daily Standup", subtitle: "Team Meeting", icon: MessageCircle, color: COLORS.purple, bg: COLORS.purpleSoft },
    { time: "12:30", title: "Lunch Break", subtitle: "01:00 PM", icon: Coffee, color: COLORS.accent, bg: COLORS.accentSoft },
    { time: "02:00", title: "Practical Training", subtitle: "Backend Development", icon: GraduationCap, color: COLORS.green, bg: COLORS.greenSoft },
  ];

  return (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: COLORS.border }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>
            Today&apos;s Schedule
          </h3>
          <p className="mt-1 text-[10px] font-medium text-gray-400">
            Sunday, August 23
          </p>
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50">
          <MoreHorizontal size={15} color={COLORS.muted} />
        </button>
      </div>

      <div className="mt-5 space-y-1">
        {schedule.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="relative flex gap-3 py-2">
              <div className="w-9 shrink-0 pt-1">
                <p className="text-[8px] font-bold text-gray-400">{item.time}</p>
              </div>
              <div
                className="absolute left-[45px] top-0 h-full w-px"
                style={{ backgroundColor: index === schedule.length - 1 ? "transparent" : "#EEF1F5" }}
              />
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: item.bg }}>
                <Icon size={14} color={item.color} />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[10px] font-extrabold" style={{ color: COLORS.text }}>
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-[8px] font-medium text-gray-400">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================
const StudentDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opportunitiesCount, setOpportunitiesCount] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // للبحث

  // ── Fetch data ──
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await profileAPI.getProfile();
        const normalized = normalizeProfileResponse(response, {});
        if (normalized.university && typeof normalized.university === 'object') {
          normalized.university = normalized.university.name || '';
        }
        setProfile(normalized);

        const oppResponse = await opportunitiesAPI.getAvailableOpportunities();
        const oppList = oppResponse?.data ?? [];
        setOpportunitiesCount(Array.isArray(oppList) ? oppList.length : 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        if (user) {
          const fallback = {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            major: user.studentProfile?.major || 'Software Engineering',
            university: user.studentProfile?.university?.name || 'Al-Azhar University',
            studentNumber: user.studentProfile?.studentNumber || '',
            gpa: user.studentProfile?.gpa || '',
            avatar: user.profileImage || '',
          };
          setProfile(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
    // TODO: Call real check-in API
  };

  const fullName = useMemo(() => {
    if (!profile) return "Student";
    return `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student";
  }, [profile]);

  const studentUser = useMemo(() => ({
    name: fullName,
    role: "Student",
    avatar: profile?.avatar || "",
  }), [fullName, profile]);

  // Stats – placeholder values (will be replaced with real data later)
  const stats = [
    {
      icon: Clock,
      label: "Attendance",
      value: "92%",
      description: "2 late arrivals",
      iconColor: COLORS.primary,
      iconBg: COLORS.primarySoft,
    },
    {
      icon: Timer,
      label: "Training Hours",
      value: "184 hrs",
      description: "16 hrs remaining",
      iconColor: COLORS.accent,
      iconBg: COLORS.accentSoft,
    },
    {
      icon: ClipboardList,
      label: "Assignments",
      value: "8 / 10",
      description: "2 pending tasks",
      iconColor: COLORS.purple,
      iconBg: COLORS.purpleSoft,
      progress: 80,
    },
    {
      icon: TrendingUp,
      label: "Performance",
      value: "87 / 100",
      description: "Above average",
      iconColor: COLORS.green,
      iconBg: COLORS.greenSoft,
    },
  ];

  // ── Render ──
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
      {/* Decorative orbs (same as LandingPage) */}
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

          {/* ✅ استخدم PageHeader الموحد */}
          <PageHeader
            loading={loading}
            profile={profile}
            fullName={fullName}
            studentUser={studentUser}
            searchValue={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            chatBadge={3}
            notificationBadge={4}
          />

          {/* Welcome Header */}
          {loading ? <SkeletonWelcomeHeader /> : <WelcomeHeader profile={profile} />}

          {/* Internship Banner */}
          <div className="mt-6">
            {loading ? (
              <SkeletonBanner />
            ) : (
              <InternshipBanner
                checkedIn={checkedIn}
                onCheckIn={handleCheckIn}
                profile={profile}
              />
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {loading ? (
              <>
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
                <SkeletonStatCard />
              </>
            ) : (
              stats.map((stat) => <StatCard key={stat.label} {...stat} />)
            )}
          </div>

          {/* Main Grid */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="min-w-0 space-y-5">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                {loading ? (
                  <>
                    <SkeletonCalendar />
                    <SkeletonChart />
                  </>
                ) : (
                  <>
                    <AttendanceCalendar />
                    <AttendanceChart />
                  </>
                )}
              </div>
              {loading ? (
                <SkeletonCard className="p-5">
                  <SkeletonText className="h-6 w-48" />
                  <SkeletonText className="mt-2 h-3 w-full" />
                  <div className="mt-4 flex items-end justify-between">
                    <SkeletonText className="h-8 w-20" />
                    <SkeletonText className="h-4 w-24" />
                  </div>
                  <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-gray-200" />
                </SkeletonCard>
              ) : (
                <InternshipProgress />
              )}
            </div>

            <div className="space-y-5">
              {loading ? (
                <>
                  <SkeletonAICard />
                  <SkeletonAssignments />
                  <SkeletonSchedule />
                </>
              ) : (
                <>
                  <AIPerformanceCard />
                  <AssignmentsCard />
                  <TodaySchedule />
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col items-center justify-between gap-2 pb-5 text-center sm:flex-row sm:text-left">
            <p className="text-[9px] font-medium text-gray-400">
              Tadreeby helps you stay on track throughout your field training.
            </p>
            <button
              type="button"
              onClick={() => navigate("/attendance")}
              className="flex items-center gap-1 text-[9px] font-extrabold transition hover:underline"
              style={{ color: COLORS.primary }}
            >
              View full attendance
              <ArrowUpRight size={11} />
            </button>
          </div>
        </div>
      </main>

      {/* AI Assistant */}
      {/* <AIAssistant /> */}
    </div>
  );
};

export default StudentDashboard;