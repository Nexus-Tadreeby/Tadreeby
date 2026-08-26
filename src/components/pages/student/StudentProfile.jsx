// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Briefcase,
//   GraduationCap,
//   Clock,
//   Settings,
//   Search,
//   User,
//   Mail,
//   Phone,
//   Hash,
//   Check,
//   CheckCircle,
//   XCircle,
//   Upload,
//   FileText,
//   Lock,
//   Plus,
//   X,
//   Sparkles,
//   ChevronRight,
//   AlertCircle,
//   Save,
//   Eye,
//   ShieldCheck,
//   Building2,
//   BookOpen,
//   Award,
//   Building,
//   TrendingUp,
//   Trash2
// } from "lucide-react";
// import Sidebar from "../../layout/Sidebar";
// import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
// import { useAuth } from "../../../context/AuthContext";
// import { useToast } from "../../../context/ToastContext";
// import { profileAPI } from "../../../services/api";

// // ─── Normalize backend response ──────────────────────────────────────
// // function normalizeProfileResponse(response, previousProfile = {}) {
// //   const data = response?.data ?? response;
// //   const user = data?.user ?? {};

// //   return {
// //     ...previousProfile,
// //     userId: data?.userId ?? previousProfile.userId,
// //     universityId: data?.universityId ?? previousProfile.universityId,
// //     studentNumber: data?.studentNumber ?? previousProfile.studentNumber,
// //     major: data?.major ?? previousProfile.major,
// //     academicYear: data?.academicYear ?? previousProfile.academicYear,
// //     gpa: data?.gpa ?? previousProfile.gpa,
// //     cvUrl: data?.cvUrl ?? previousProfile.cvUrl,
// //     verificationDocument: data?.verificationDocument ?? previousProfile.verificationDocument,
// //     hasVerificationDoc: !!data?.verificationDocument || previousProfile.hasVerificationDoc,
// //     hasCv: !!data?.cvUrl || previousProfile.hasCv,
// //     verificationStatus: data?.approvalStatus?.toLowerCase() ?? previousProfile.verificationStatus,
// //     firstName: user?.firstName ?? previousProfile.firstName,
// //     lastName: user?.lastName ?? previousProfile.lastName,
// //     email: user?.email ?? previousProfile.email,
// //     phone: user?.phone ?? previousProfile.phone,
// //     avatar: user?.profileImage ?? previousProfile.avatar,
// //     skills: Array.isArray(data?.skills) ? data.skills : previousProfile.skills,
// //     university: data?.university ?? previousProfile.university,
// //   };
// // }


// function normalizeProfileResponse(response, previousProfile = {}) {
//   const data = response?.data ?? response;
//   const user = data?.user ?? {};
//   const hasCvUrl = Object.prototype.hasOwnProperty.call(data || {}, 'cvUrl');

//   // معالجة المهارات: قد تكون array أو string (JSON) أو null
//   let skills = previousProfile.skills || [];
//   if (data?.skills) {
//     if (Array.isArray(data.skills)) {
//       skills = data.skills;
//     } else if (typeof data.skills === 'string') {
//       try {
//         const parsed = JSON.parse(data.skills);
//         if (Array.isArray(parsed)) skills = parsed;
//       } catch {
//         // لو مش JSON، اعتبره comma-separated
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
//     cvUrl: hasCvUrl ? data.cvUrl : previousProfile.cvUrl,
//     verificationDocument: data?.verificationDocument ?? previousProfile.verificationDocument,
//     hasVerificationDoc: !!data?.verificationDocument || previousProfile.hasVerificationDoc,
//     hasCv: hasCvUrl ? !!data.cvUrl : previousProfile.hasCv,
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
// // ─── Navigation ──────────────────────────────────────────────────────
// const studentNavItems = [
//   { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
//   { label: "Opportunities", icon: Briefcase, path: "/student/opportunities" },
//   { label: "My Internship", icon: GraduationCap, path: "/my/internship" },
//   { label: "Attendance", icon: Clock, path: "/attendance" },
// ];

// const studentFooterItems = [
//   { label: "Settings", icon: Settings, path: "/settings" },
// ];

// const DEFAULT_SKILLS = [];

// const PROFILE_TABS = [
//   { id: "overview", label: "Overview" },
//   { id: "personal", label: "Personal Info" },
//   { id: "documents", label: "Documents & Skills" },
// ];

// // ─── University mapping ──────────────────────────────────────────────
// const UNIVERSITIES = [
//   { id: 1, name: "An-Najah National University" },
//   { id: 2, name: "Birzeit University" },
//   { id: 3, name: "Bethlehem University" },
//   { id: 4, name: "Al-Quds University" },
//   { id: 5, name: "Palestine Polytechnic University" }
// ];

// const getUniversityName = (id) => {
//   if (!id) return "Not provided";
//   const uni = UNIVERSITIES.find(u => u.id === parseInt(id));
//   return uni ? uni.name : "Not provided";
// };

// function buildInitialProfile(user) {
//   const safeUser = user || {};
//   const studentProfile = safeUser.studentProfile || {};

//   let skills = DEFAULT_SKILLS;
//   if (studentProfile.skills) {
//     if (Array.isArray(studentProfile.skills)) {
//       skills = studentProfile.skills.length > 0 ? studentProfile.skills : DEFAULT_SKILLS;
//     } else if (typeof studentProfile.skills === 'string') {
//       skills = studentProfile.skills.split(',').map(s => s.trim()).filter(Boolean);
//     }
//   }

//   const approvalStatus = studentProfile.approvalStatus?.toLowerCase() || "pending";

//   return {
//     firstName: safeUser.firstName || "",
//     lastName: safeUser.lastName || "",
//     email: safeUser.email || "",
//     phone: safeUser.phone || "",
//     personalID: safeUser.personalID || "",
//     recoveryEmail: safeUser.recoveryEmail || "",
//     studentNumber: studentProfile.studentNumber || "",
//     major: studentProfile.major || "",
//     university: getUniversityName(safeUser.universityId || studentProfile.universityId),
//     universityId: safeUser.universityId || studentProfile.universityId,
//     gpa: studentProfile.gpa || "",
//     company: safeUser.companyId ? "Company name (from API)" : "",
//     companyId: safeUser.companyId || null,
//     avatar: safeUser.profileImage || "",
//     skills: skills,
//     hasCv: !!studentProfile.cvUrl,
//     cvUrl: studentProfile.cvUrl || null,
//     hasVerificationDoc: !!studentProfile.verificationDocument,
//     verificationStatus: approvalStatus,
//     verificationDocument: studentProfile.verificationDocument || null,
//   };
// }

// function computeCompletion(profile) {
//   if (!profile) return { checks: [], percentage: 0, nextAction: null };

//   const checks = [
//     { key: "basics", done: !!(profile.firstName && profile.lastName && profile.major && profile.university) },
//     { key: "photo", done: !!profile.avatar },
//     { key: "recoveryEmail", done: !!profile.recoveryEmail },
//     { key: "skills", done: (profile.skills || []).length >= 3 },
//     { key: "cv", done: profile.hasCv, optional: true },
//     { key: "verificationDoc", done: profile.hasVerificationDoc },
//   ];

//   const required = checks.filter((c) => !c.optional);
//   const doneCount = required.filter((c) => c.done).length;
//   const percentage = required.length > 0 ? Math.round((doneCount / required.length) * 100) : 0;

//   return {
//     checks: checks.map((c) => ({
//       ...c,
//       label: {
//         basics: "Complete personal details",
//         photo: "Upload profile photo",
//         recoveryEmail: "Add recovery email",
//         skills: "Add at least 3 skills",
//         cv: "Upload CV (optional)",
//         verificationDoc: "Submit verification document",
//       }[c.key] || c.key,
//       section: {
//         basics: "personal",
//         photo: "personal",
//         recoveryEmail: "personal",
//         skills: "documents",
//         cv: "documents",
//         verificationDoc: "documents",
//       }[c.key] || "personal",
//     })),
//     percentage,
//     nextAction: checks.find((c) => !c.done && !c.optional) || null,
//   };
// }

// const InfoIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"
//       fill="currentColor"
//     />
//   </svg>
// );

// // ─── UI Primitives ──────────────────────────────────────────────────
// const SectionCard = ({ children, className = "", ...props }) => (
//   <section
//     {...props}
//     className={`rounded-2xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(20,35,60,0.04)] ${className}`}
//   >
//     {children}
//   </section>
// );

// const SectionHeading = ({ eyebrow, title, description, action }) => (
//   <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
//     <div>
//       {eyebrow && (
//         <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1677FF]">
//           {eyebrow}
//         </p>
//       )}
//       <h2 className="text-base font-extrabold tracking-tight text-gray-900">{title}</h2>
//       {description && <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>}
//     </div>
//     {action}
//   </div>
// );

// const FieldDisplay = ({ label, value, icon, locked, placeholder, highlight }) => (
//   <div>
//     <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
//       {label}
//       {locked && (
//         <span className="inline-flex items-center gap-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
//           <Lock className="h-2.5 w-2.5" />
//           Locked
//         </span>
//       )}
//     </label>
//     <div
//       className={`mt-1.5 flex min-h-[43px] items-center rounded-xl border px-3.5 transition-all ${highlight
//         ? "border-[#FFAD4E] bg-[#FFF8EF] ring-2 ring-[#FFAD4E]/20"
//         : value
//           ? "border-gray-200 bg-gray-50/60 text-gray-900"
//           : "border-dashed border-gray-200 bg-gray-50/40 text-gray-400"
//         }`}
//     >
//       {icon}
//       <span className={`truncate text-xs font-medium ${value ? "text-gray-800" : "italic text-gray-400"}`}>
//         {value || placeholder}
//       </span>
//     </div>
//   </div>
// );

// const FieldInput = ({ label, value, onChange, type = "text", placeholder, locked, icon }) => (
//   <div>
//     <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
//       {label}
//       {locked && (
//         <span className="inline-flex items-center gap-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
//           <Lock className="h-2.5 w-2.5" />
//           Locked
//         </span>
//       )}
//     </label>
//     <div className="relative mt-1.5">
//       {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
//       <input
//         type={type}
//         value={value || ""}
//         onChange={onChange}
//         disabled={locked}
//         placeholder={placeholder}
//         className={`w-full rounded-xl border py-2.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1677FF]/15 ${icon ? "pl-9 pr-4" : "px-3.5"
//           } ${locked
//             ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500"
//             : "border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-[#1677FF]"
//           }`}
//       />
//     </div>
//   </div>
// );

// const CircleProgress = ({ percentage, size = 40 }) => {
//   const radius = 16;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
//       <svg className="transform -rotate-90 w-full h-full">
//         <circle className="text-gray-200" strokeWidth="3" stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
//         <circle
//           className="text-[#1677FF] transition-all duration-300 ease-out"
//           strokeWidth="3"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx={size / 2}
//           cy={size / 2}
//         />
//       </svg>
//       <span className="absolute text-[9px] font-bold text-[#1677FF] font-['Inter']">
//         {Math.round(percentage)}%
//       </span>
//     </div>
//   );
// };

// // // ─── Profile Header ──────────────────────────────────────────────────
// // const ProfileHeader = ({
// //   profile,
// //   completion,
// //   onAvatarUpload,
// //   fileInputRef,
// //   onTabChange,
// //   isAvatarUploading,
// //   avatarProgress,
// // }) => {
// //   const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student";
// //   const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "S";

// //   const universityName = typeof profile.university === 'string'
// //     ? profile.university
// //     : (profile.university?.name || '');

// //   const getStatusBadge = () => {
// //     const status = profile.verificationStatus?.toLowerCase() || "pending";
// //     if (status === "approved") return { label: "Verified", className: "bg-green-100 text-green-700" };
// //     if (status === "rejected") return { label: "Rejected", className: "bg-red-100 text-red-700" };
// //     return { label: "Verification in progress", className: "bg-[#FFF4E6] text-[#C76A0B]" };
// //   };

// //   const badge = getStatusBadge();

// //   return (
// //     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(20,35,60,0.06)]">
// //       <div className="relative h-[140px] overflow-hidden bg-gradient-to-r from-blue-100/20 via-blue-200/20 to-orange-100/20 sm:h-[160px]">
// //         <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
// //         <div className="absolute -bottom-24 left-[38%] h-56 w-56 rounded-full bg-orange-200/25 blur-3xl" />
// //         <div className="absolute inset-0 opacity-[0.05]" style={{
// //           backgroundImage: "radial-gradient(circle at 1px 1px, #1677FF 1px, transparent 0)",
// //           backgroundSize: "22px 22px",
// //         }} />
// //       </div>

// //       <div className="relative px-5 pb-5 sm:px-7">
// //         <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
// //           <div className="flex min-w-0 items-end gap-4">
// //             <div className="relative shrink-0">
// //               {profile.avatar ? (
// //                 <img src={profile.avatar} alt={fullName} className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28" />
// //               ) : (
// //                 <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#EAF3FF] text-2xl font-extrabold text-[#1677FF] shadow-lg sm:h-28 sm:w-28">
// //                   {initials}
// //                 </div>
// //               )}
// //               {isAvatarUploading && (
// //                 <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
// //                   <CircleProgress percentage={avatarProgress} size={50} />
// //                 </div>
// //               )}
// //               {!isAvatarUploading && (
// //                 <button
// //                   type="button"
// //                   onClick={() => fileInputRef.current?.click()}
// //                   className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#1677FF] text-white shadow-md transition hover:scale-105"
// //                 >
// //                   <Upload className="h-3.5 w-3.5" />
// //                 </button>
// //               )}
// //               <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onAvatarUpload} />
// //             </div>

// //             <div className="min-w-0 pb-1">
// //               <div className="flex flex-wrap items-center gap-2">
// //                 <h1 className="truncate text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">{fullName}</h1>
// //                 <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold text-[#1677FF]">Student</span>
// //               </div>
// //               <p className="mt-1 truncate text-xs font-medium text-gray-500">
// //                 {profile.major || "No major"} · {universityName || "No university"}
// //               </p>
// //               <div className="mt-2 flex flex-wrap items-center gap-2">
// //                 <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.className}`}>
// //                   <AlertCircle className="h-3 w-3" />
// //                   {badge.label}
// //                 </span>
// //                 <span className="hidden text-[11px] font-medium text-gray-400 sm:inline">{profile.email}</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2 sm:pb-1">
// //             <button
// //               type="button"
// //               onClick={() => onTabChange("personal")}
// //               className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:border-[#1677FF]/30 hover:bg-[#EAF3FF] hover:text-[#1677FF]"
// //             >
// //               Edit Profile
// //             </button>
// //           </div>
// //         </div>

// //         <div className="mt-5 grid grid-cols-2 divide-x divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/70 sm:grid-cols-4">
// //           <div className="px-4 py-3">
// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Student Number</p>
// //             <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.studentNumber || "—"}</p>
// //           </div>
// //           <div className="px-4 py-3">
// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">University</p>
// //             <p className="mt-1 truncate text-xs font-bold text-gray-800">{universityName || "—"}</p>
// //           </div>
// //           <div className="border-t border-gray-100 px-4 py-3 sm:border-t-0">
// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">GPA</p>
// //             <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.gpa || "Not added"}</p>
// //           </div>
// //           <div className="border-t border-gray-100 px-4 py-3 sm:border-t-0">
// //             <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Profile strength</p>
// //             <div className="mt-1 flex items-center gap-2">
// //               <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
// //                 <div className="h-full rounded-full bg-[#1677FF]" style={{ width: `${completion.percentage || 0}%` }} />
// //               </div>
// //               <span className="text-xs font-extrabold text-[#1677FF]">{completion.percentage || 0}%</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };






// // const ProfileHeader = ({
// //   profile,
// //   completion,
// //   onAvatarUpload,
// //   fileInputRef,
// //   onDeleteAvatar,
// //   onTabChange,
// //   isAvatarUploading,
// //   avatarProgress,
// // }) => {
// //   const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student";
// //   const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "S";
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const universityName = typeof profile.university === 'string'
// //     ? profile.university
// //     : (profile.university?.name || '');

// //   const getStatusBadge = () => {
// //     const status = profile.verificationStatus?.toLowerCase() || "pending";
// //     if (status === "approved") return { label: "Verified", className: "bg-green-100 text-green-700" };
// //     if (status === "rejected") return { label: "Rejected", className: "bg-red-100 text-red-700" };
// //     return { label: "Verification in progress", className: "bg-[#FFF4E6] text-[#C76A0B]" };
// //   };

// //   const badge = getStatusBadge();

// //   return (
// //     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(20,35,60,0.06)]">
// //       {/* Light banner */}
// //       <div className="relative h-[140px] overflow-hidden bg-gradient-to-r from-blue-100/20 via-blue-200/20 to-orange-100/20 sm:h-[160px]">
// //         <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
// //         <div className="absolute -bottom-24 left-[38%] h-56 w-56 rounded-full bg-orange-200/25 blur-3xl" />
// //         <div className="absolute inset-0 opacity-[0.05]" style={{
// //           backgroundImage: "radial-gradient(circle at 1px 1px, #1677FF 1px, transparent 0)",
// //           backgroundSize: "22px 22px",
// //         }} />
// //       </div>

// //       {/* Identity row */}
// //       <div className="relative px-5 pb-5 sm:px-7">
// //         <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
// //           <div className="flex min-w-0 items-end gap-4">
// //             {/* <div className="relative shrink-0"> */}
// //             <div className="relative shrink-0 group">
// //               {profile.avatar ? (
// //                 <img src={profile.avatar} alt={fullName} className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28" />
// //               ) : (
// //                 <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#EAF3FF] text-2xl font-extrabold text-[#1677FF] shadow-lg sm:h-28 sm:w-28">
// //                   {initials}
// //                 </div>
// //               )}



// //               {isAvatarUploading && (
// //                 <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
// //                   <CircleProgress percentage={avatarProgress} size={50} />
// //                 </div>
// //               )}
// //               {!isAvatarUploading && (
// //                 <button
// //                   type="button"
// //                   onClick={() => fileInputRef.current?.click()}
// //                   className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#1677FF] text-white shadow-md transition hover:scale-105"
// //                 >
// //                   <Upload className="h-3.5 w-3.5" />
// //                 </button>
// //               )}


// //               {!isAvatarUploading && profile.avatar && (
// //                 <button
// //                   type="button"
// //                   onClick={onDeleteAvatar}
// //                   className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white shadow-md transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100"
// //                   aria-label="Delete profile photo"
// //                 >
// //                   <X className="h-3.5 w-3.5" />
// //                 </button>
// //               )}
// //               <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onAvatarUpload} />
// //             </div>





// //             <div className="min-w-0 pb-1">
// //               <div className="flex flex-wrap items-center gap-2">
// //                 <h1 className="truncate text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">{fullName}</h1>
// //                 <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold text-[#1677FF]">Student</span>
// //               </div>
// //               <p className="mt-1 truncate text-xs font-medium text-gray-500">
// //                 {profile.major || "No major"} · {universityName || "No university"}
// //               </p>
// //               <div className="mt-2 flex flex-wrap items-center gap-2">
// //                 <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.className}`}>
// //                   <AlertCircle className="h-3 w-3" />
// //                   {badge.label}
// //                 </span>
// //                 <span className="hidden text-[11px] font-medium text-gray-400 sm:inline">{profile.email}</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2 sm:pb-1">
// //             <button
// //               type="button"
// //               onClick={() => onTabChange("personal")}
// //               className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:border-[#1677FF]/30 hover:bg-[#EAF3FF] hover:text-[#1677FF]"
// //             >
// //               Edit Profile
// //             </button>
// //           </div>
// //         </div>

// //         {/* Compact profile meta – with icons */}
// //         <div className="mt-5 grid grid-cols-2 divide-x divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/70 sm:grid-cols-4">
// //           <div className="flex items-start gap-2 px-4 py-3">
// //             <Hash className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
// //             <div>
// //               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Student Number</p>
// //               <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.studentNumber || "—"}</p>
// //             </div>
// //           </div>

// //           <div className="flex items-start gap-2 px-4 py-3">
// //             <Building2 className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
// //             <div>
// //               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">University</p>
// //               <p className="mt-1 truncate text-xs font-bold text-gray-800">{universityName || "—"}</p>
// //             </div>
// //           </div>

// //           <div className="flex items-start gap-2 border-t border-gray-100 px-4 py-3 sm:border-t-0">
// //             <Award className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
// //             <div>
// //               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">GPA</p>
// //               <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.gpa || "Not added"}</p>
// //             </div>
// //           </div>

// //           <div className="flex items-start gap-2 border-t border-gray-100 px-4 py-3 sm:border-t-0">
// //             <TrendingUp className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
// //             <div>
// //               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Profile strength</p>
// //               <div className="mt-1 flex items-center gap-2">
// //                 <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
// //                   <div className="h-full rounded-full bg-[#1677FF]" style={{ width: `${completion.percentage || 0}%` }} />
// //                 </div>
// //                 <span className="text-xs font-extrabold text-[#1677FF]">{completion.percentage || 0}%</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// const ProfileHeader = ({
//   profile,
//   completion,
//   onAvatarUpload,
//   onDeleteAvatar,
//   fileInputRef,
//   onTabChange,
//   isAvatarUploading,
//   avatarProgress,
// }) => {
//   const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student";
//   const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "S";

//   const universityName = typeof profile.university === 'string'
//     ? profile.university
//     : (profile.university?.name || '');

//   const getStatusBadge = () => {
//     const status = profile.verificationStatus?.toLowerCase() || "pending";
//     if (status === "approved") return { label: "Verified", className: "bg-green-100 text-green-700" };
//     if (status === "rejected") return { label: "Rejected", className: "bg-red-100 text-red-700" };
//     return { label: "Verification in progress", className: "bg-[#FFF4E6] text-[#C76A0B]" };
//   };

//   const badge = getStatusBadge();

//   // ─── Popup menu state ──────────────────────────────────────────
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // ─── إغلاق القائمة عند الضغط خارجها ──────────────────────────────
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isMenuOpen && !e.target.closest('.relative.shrink-0')) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [isMenuOpen]);

//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(20,35,60,0.06)]">
//       {/* Light banner */}
//       <div className="relative h-[140px] overflow-hidden bg-gradient-to-r from-blue-100/20 via-blue-200/20 to-orange-100/20 sm:h-[160px]">
//         <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
//         <div className="absolute -bottom-24 left-[38%] h-56 w-56 rounded-full bg-orange-200/25 blur-3xl" />
//         <div className="absolute inset-0 opacity-[0.05]" style={{
//           backgroundImage: "radial-gradient(circle at 1px 1px, #1677FF 1px, transparent 0)",
//           backgroundSize: "22px 22px",
//         }} />
//       </div>

//       {/* Identity row */}
//       <div className="relative px-5 pb-5 sm:px-7">
//         <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
//           <div className="flex min-w-0 items-end gap-4">
//             <div className="relative shrink-0 group">
//               {profile.avatar ? (
//                 <img src={profile.avatar} alt={fullName} className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28" />
//               ) : (
//                 <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#EAF3FF] text-2xl font-extrabold text-[#1677FF] shadow-lg sm:h-28 sm:w-28">
//                   {initials}
//                 </div>
//               )}

//               {isAvatarUploading && (
//                 <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
//                   <CircleProgress percentage={avatarProgress} size={50} />
//                 </div>
//               )}

//               {!isAvatarUploading && (
//                 <div className="absolute -bottom-2 -right-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#1677FF] text-white shadow-md transition hover:scale-105"
//                   >
//                     <Upload className="h-3.5 w-3.5" />
//                   </button>

//                   {/* Popup Menu */}
//                   {/* {isMenuOpen && (
//                     <div className="absolute right-0 mt-1 w-44 rounded-xl border border-gray-200 bg-white shadow-lg z-10">
//                       <button
//                         onClick={() => {
//                           fileInputRef.current?.click();
//                           setIsMenuOpen(false);
//                         }}
//                         className="flex w-full items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
//                       >
//                         <Upload className="h-4 w-4" />
//                         رفع صورة جديدة
//                       </button>
//                       {profile.avatar && (
//                         <button
//                           onClick={() => {
//                             onDeleteAvatar();
//                             setIsMenuOpen(false);
//                           }}
//                           className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition border-t border-gray-100"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           حذف الصورة
//                         </button>
//                       )}
//                     </div>
//                   )} */}
//                   {isMenuOpen && (
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 rounded-xl border border-gray-200 bg-white shadow-lg z-10">
//                       <button
//                         onClick={() => {
//                           fileInputRef.current?.click();
//                           setIsMenuOpen(false);
//                         }}
//                         className="flex w-full items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
//                       >
//                         <Upload className="h-4 w-4" />
//                         Upload new image
//                       </button>
//                       {profile.avatar && (
//                         <button
//                           onClick={() => {
//                             onDeleteAvatar();
//                             setIsMenuOpen(false);
//                           }}
//                           className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition border-t border-gray-100"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           Delete image
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}

//               <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onAvatarUpload} />
//             </div>

//             <div className="min-w-0 pb-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="truncate text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">{fullName}</h1>
//                 <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold text-[#1677FF]">Student</span>
//               </div>
//               <p className="mt-1 truncate text-xs font-medium text-gray-500">
//                 {profile.major || "No major"} · {universityName || "No university"}
//               </p>
//               <div className="mt-2 flex flex-wrap items-center gap-2">
//                 <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.className}`}>
//                   <AlertCircle className="h-3 w-3" />
//                   {badge.label}
//                 </span>
//                 <span className="hidden text-[11px] font-medium text-gray-400 sm:inline">{profile.email}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 sm:pb-1">
//             <button
//               type="button"
//               onClick={() => onTabChange("personal")}
//               className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:border-[#1677FF]/30 hover:bg-[#EAF3FF] hover:text-[#1677FF]"
//             >
//               Edit Profile
//             </button>
//           </div>
//         </div>

//         {/* Compact profile meta – with icons */}
//         <div className="mt-5 grid grid-cols-2 divide-x divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/70 sm:grid-cols-4">
//           <div className="flex items-start gap-2 px-4 py-3">
//             <Hash className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Student Number</p>
//               <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.studentNumber || "—"}</p>
//             </div>
//           </div>

//           <div className="flex items-start gap-2 px-4 py-3">
//             <Building2 className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">University</p>
//               <p className="mt-1 truncate text-xs font-bold text-gray-800">{universityName || "—"}</p>
//             </div>
//           </div>

//           <div className="flex items-start gap-2 border-t border-gray-100 px-4 py-3 sm:border-t-0">
//             <Award className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">GPA</p>
//               <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.gpa || "Not added"}</p>
//             </div>
//           </div>

//           <div className="flex items-start gap-2 border-t border-gray-100 px-4 py-3 sm:border-t-0">
//             <TrendingUp className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Profile strength</p>
//               <div className="mt-1 flex items-center gap-2">
//                 <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
//                   <div className="h-full rounded-full bg-[#1677FF]" style={{ width: `${completion.percentage || 0}%` }} />
//                 </div>
//                 <span className="text-xs font-extrabold text-[#1677FF]">{completion.percentage || 0}%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// // ─── Tabs ────────────────────────────────────────────────────────────
// const TabNav = ({ activeTab, onChange }) => (
//   <nav className="mt-5 flex overflow-x-auto border-b border-gray-200" aria-label="Profile sections">
//     {PROFILE_TABS.map((tab) => (
//       <button
//         key={tab.id}
//         type="button"
//         onClick={() => onChange(tab.id)}
//         aria-selected={activeTab === tab.id}
//         className={`relative whitespace-nowrap px-5 py-3 text-xs font-bold transition sm:text-sm ${activeTab === tab.id ? "text-[#1677FF]" : "text-gray-500 hover:text-gray-800"
//           }`}
//       >
//         {tab.label}
//         {activeTab === tab.id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#1677FF]" />}
//       </button>
//     ))}
//   </nav>
// );

// // ─── Verification ────────────────────────────────────────────────────
// const ProgressTracker = ({ status }) => {
//   const statusMap = { pending: "review", approved: "approved", rejected: "review" };
//   const actualStatus = statusMap[status?.toLowerCase()] || "review";

//   const steps = [
//     { label: "Applied", date: "Jul 12, 2026", key: "applied" },
//     { label: "Review", date: "In Progress", key: "review" },
//     { label: "Approved", date: "\u00A0", key: "approved" },
//   ];

//   const statusIndex = steps.findIndex((s) => s.key === actualStatus);
//   const fillWidth = statusIndex <= 0 ? "0%" : statusIndex === 1 ? "50%" : "100%";
//   const isApproved = status?.toLowerCase() === "approved";
//   const isRejected = status?.toLowerCase() === "rejected";
//   const isPending = status?.toLowerCase() === "pending";

//   // تحديد لون الخط حسب الحالة
//   let lineColor = "bg-gray-200"; // افتراضي
//   if (isApproved) lineColor = "bg-green-500";
//   else if (isRejected) lineColor = "bg-red-500";
//   else if (isPending) lineColor = "bg-gradient-to-r from-blue-500 to-yellow-400";

//   return (
//     <div className="relative flex w-full items-start justify-between" role="list" aria-label="Verification progress">
//       {/* الخط الخلفي (التراك) */}
//       <div className="absolute left-[7%] right-[7%] top-5 h-0.5 bg-gray-200" />

//       {/* الخط الأمامي (المتقدم) – مع الألوان */}
//       <div
//         className={`absolute left-[7%] top-5 h-0.5 transition-all duration-500 ${lineColor}`}
//         style={{ width: `calc(${fillWidth} * 86%)` }}
//       />

//       {steps.map((step, idx) => {
//         const completed = idx < statusIndex;
//         const active = idx === statusIndex;

//         // تحديد لون الدائرة
//         let circleColor = "bg-gray-100 text-gray-400 ring-gray-200";
//         if (completed) {
//           circleColor = "bg-emerald-500 text-white ring-4 ring-emerald-200"; // ✅ أخضر للمكتمل
//         } else if (active) {
//           if (isPending) {
//             circleColor = "bg-blue-500 text-white ring-4 ring-blue-200"; // ✅ أزرق للنشط في حالة pending
//           } else if (isRejected) {
//             circleColor = "bg-red-500 text-white ring-4 ring-red-200";
//           } else {
//             circleColor = "bg-blue-500 text-white ring-4 ring-blue-200";
//           }
//         }
//         return (
//           <div key={step.key} className="relative z-10 flex w-1/3 flex-col items-center" role="listitem">
//             <div className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-xs font-extrabold shadow-sm transition-all duration-500 ${circleColor}`}>
//               {completed ? <Check className="h-4 w-4" strokeWidth={2.5} /> : idx + 1}
//             </div>
//             <p className={`mt-2 text-[11px] font-extrabold ${active || completed ? "text-blue-600" : "text-gray-400"}`}>
//               {step.label}
//             </p>
//             <p className="mt-0.5 text-[10px] font-medium text-gray-400">{step.date}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// const ApplicationStatusTracker = ({ status, onDismiss }) => {
//   const isPending = status?.toLowerCase() === "pending";
//   const isApproved = status?.toLowerCase() === "approved";
//   const isRejected = status?.toLowerCase() === "rejected";

//   // عنوان الكارد
//   const title = isApproved ? "Account Verified" : isRejected ? "Verification Document Rejected" : "Pending Verification";
//   const description = isApproved
//     ? "Your account has been approved."
//     : isPending
//       ? "Your profile is under review by university administration"
//       : "Upload a new verification document from Documents & Skills to submit your account for review again.";

//   return (
//     <SectionCard className="overflow-hidden relative">
//       {/* زر الإغلاق – يظهر فقط عند approved */}
//       {isApproved && (
//         <button
//           onClick={onDismiss}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
//           aria-label="Dismiss verification card"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       )}

//       <div className="border-b border-gray-100 bg-gray-50/60 px-6 py-4">
//         <div className="flex items-start gap-3">
//           <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isApproved ? "bg-green-100 text-green-700" : isRejected ? "bg-red-100 text-red-700" : "bg-[#FFF4E6] text-[#C76A0B]"
//             }`}>
//             {isApproved ? <CheckCircle className="h-5 w-5" /> : <InfoIcon />}
//           </div>
//           <div>
//             <h2 className="text-sm font-extrabold text-gray-900">{title}</h2>
//             <p className="mt-0.5 text-xs font-medium text-gray-500">{description}</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 py-5">
//         {isPending && (
//           <div className="rounded-xl border border-[#FFAD4E]/30 bg-[#FFF9F1] px-4 py-3">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FD761A]" />
//               <div>
//                 <p className="text-xs font-extrabold text-gray-900">Limited access during review</p>
//                 <p className="mt-1 text-[11px] font-medium leading-5 text-gray-600">
//                   You can view and complete your profile while verification is in progress. Internship applications unlock after approval.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-7">
//           <ProgressTracker status={status} />
//         </div>
//       </div>
//     </SectionCard>
//   );
// };

// // ─── Personal Info ───────────────────────────────────────────────────
// // const PersonalInfoCard = ({
// //   profile,
// //   isEditing,
// //   onEdit,
// //   onSave,
// //   onCancel,
// //   onChange,
// //   highlightField,
// //   sectionRef,
// //   isSaving,
// // }) => {
// //   const currentProfile = isEditing ? profile : profile;

// //   return (
// //     <SectionCard ref={sectionRef}>
// //       <SectionHeading
// //         eyebrow="Account"
// //         title="Personal Information"
// //         description={
// //           isEditing
// //             ? "Edit editable fields. Name, email, major, and university are locked after registration."
// //             : "Your account details visible to supervisors and admins."
// //         }
// //         action={
// //           !isEditing ? (
// //             <button
// //               type="button"
// //               onClick={onEdit}
// //               className="rounded-xl border border-[#1677FF]/15 bg-[#EAF3FF] px-3.5 py-2 text-xs font-bold text-[#1677FF] transition hover:bg-[#1677FF] hover:text-white"
// //             >
// //               Edit Profile
// //             </button>
// //           ) : (
// //             <div className="flex gap-2">
// //               <button
// //                 type="button"
// //                 onClick={onCancel}
// //                 disabled={isSaving}
// //                 className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={onSave}
// //                 disabled={isSaving}
// //                 className="inline-flex items-center gap-1.5 rounded-xl bg-[#1677FF] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#086BEA] disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {isSaving ? (
// //                   <>
// //                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
// //                     </svg>
// //                     Saving...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Save className="h-3.5 w-3.5" />
// //                     Save Changes
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           )
// //         }
// //       />

// //       <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 sm:grid-cols-2">
// //         {isEditing ? (
// //           <>
// //             <FieldInput label="First Name" value={currentProfile.firstName} locked onChange={() => { }} />
// //             <FieldInput label="Last Name" value={currentProfile.lastName} locked onChange={() => { }} />
// //             <FieldInput label="Major" value={currentProfile.major} locked onChange={() => { }} />
// //             <FieldInput label="University" value={currentProfile.university} locked onChange={() => { }} />
// //             <FieldInput label="Email" value={currentProfile.email} locked icon={<Mail className="h-4 w-4" />} onChange={() => { }} />
// //             <FieldInput label="Student Number" value={currentProfile.studentNumber} locked icon={<Hash className="h-4 w-4" />} onChange={() => { }} />
// //             <FieldInput label="Company" value={currentProfile.company || "Not enrolled yet"} locked onChange={() => { }} />

// //             <FieldInput
// //               label="Recovery Email"
// //               type="email"
// //               value={currentProfile.recoveryEmail}
// //               onChange={(e) => onChange("recoveryEmail", e.target.value)}
// //               placeholder="Backup email address"
// //               icon={<Mail className="h-4 w-4" />}
// //             />
// //             <FieldInput
// //               label="Phone"
// //               value={currentProfile.phone}
// //               onChange={(e) => onChange("phone", e.target.value)}
// //               placeholder="+970 5XX XXX XXX"
// //               icon={<Phone className="h-4 w-4" />}
// //             />
// //             <FieldInput
// //               label="GPA (optional)"
// //               value={currentProfile.gpa}
// //               onChange={(e) => onChange("gpa", e.target.value)}
// //               placeholder="e.g. 3.75"
// //             />
// //           </>
// //         ) : (
// //           <>
// //             <FieldDisplay label="First Name" value={currentProfile.firstName} locked />
// //             <FieldDisplay label="Last Name" value={currentProfile.lastName} locked />
// //             <FieldDisplay label="Major" value={currentProfile.major} locked />
// //             <FieldDisplay label="University" value={currentProfile.university} locked />
// //             <FieldDisplay label="Email" value={currentProfile.email} icon={<Mail className="mr-2 h-4 w-4 shrink-0 text-[#1677FF]" />} locked />
// //             <FieldDisplay
// //               label="Recovery Email"
// //               value={currentProfile.recoveryEmail}
// //               placeholder="Add a recovery email for account security"
// //               icon={<Mail className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
// //               highlight={highlightField === "recoveryEmail"}
// //             />
// //             <FieldDisplay label="Phone" value={currentProfile.phone} placeholder="Add your phone number" icon={<Phone className="mr-2 h-4 w-4 shrink-0 text-gray-400" />} />
// //             <FieldDisplay label="Student Number" value={currentProfile.studentNumber} placeholder="From registration" icon={<Hash className="mr-2 h-4 w-4 shrink-0 text-gray-400" />} locked />
// //             <FieldDisplay label="GPA (optional)" value={currentProfile.gpa} placeholder="Enter your GPA" />
// //             <FieldDisplay label="Company" value={currentProfile.company || "Not enrolled yet"} placeholder="You are not enrolled yet" locked />
// //           </>
// //         )}
// //       </div>
// //     </SectionCard>
// //   );
// // };


// // ─── Personal Info ───────────────────────────────────────────────────
// const PersonalInfoCard = ({
//   profile,
//   isEditing,
//   onEdit,
//   onSave,
//   onCancel,
//   onChange,
//   highlightField,
//   sectionRef,
//   isSaving,
// }) => {
//   const currentProfile = isEditing ? profile : profile;

//   return (
//     <SectionCard ref={sectionRef}>
//       <SectionHeading
//         eyebrow="Account"
//         title="Personal Information"
//         description={
//           isEditing
//             ? "Edit editable fields. Name, email, major, and university are locked after registration."
//             : "Your account details visible to supervisors and admins."
//         }
//         action={
//           !isEditing ? (
//             <button
//               type="button"
//               onClick={onEdit}
//               className="rounded-xl border border-[#1677FF]/15 bg-[#EAF3FF] px-3.5 py-2 text-xs font-bold text-[#1677FF] transition hover:bg-[#1677FF] hover:text-white"
//             >
//               Edit Profile
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 disabled={isSaving}
//                 className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={onSave}
//                 disabled={isSaving}
//                 className="inline-flex items-center gap-1.5 rounded-xl bg-[#1677FF] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#086BEA] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSaving ? (
//                   <>
//                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-3.5 w-3.5" />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           )
//         }
//       />

//       <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 sm:grid-cols-2">
//         {isEditing ? (
//           <>
//             <FieldInput
//               label="First Name"
//               value={currentProfile.firstName}
//               locked
//               icon={<User className="h-4 w-4" />}
//               onChange={() => { }}
//             />
//             <FieldInput
//               label="Last Name"
//               value={currentProfile.lastName}
//               locked
//               icon={<User className="h-4 w-4" />}
//               onChange={() => { }}
//             />
//             <FieldInput
//               label="Major"
//               value={currentProfile.major}
//               locked
//               icon={<BookOpen className="h-4 w-4" />}
//               onChange={() => { }}
//             />
//             <FieldInput
//               label="University"
//               value={currentProfile.university}
//               locked
//               icon={<Building2 className="h-4 w-4" />}
//               onChange={() => { }}
//             />
//             <FieldInput
//               label="Email"
//               value={currentProfile.email}
//               locked
//               icon={<Mail className="h-4 w-4" />}
//               onChange={() => { }}
//             />
//             <FieldInput
//               label="Student Number"
//               value={currentProfile.studentNumber}
//               locked
//               icon={<Hash className="h-4 w-4" />}
//               onChange={() => { }}
//             />
//             <FieldInput
//               label="Company"
//               value={currentProfile.company || "Not enrolled yet"}
//               locked
//               icon={<Building className="h-4 w-4" />}
//               onChange={() => { }}
//             />

//             <FieldInput
//               label="Recovery Email"
//               type="email"
//               value={currentProfile.recoveryEmail}
//               onChange={(e) => onChange("recoveryEmail", e.target.value)}
//               placeholder="Backup email address"
//               icon={<Mail className="h-4 w-4" />}
//             />
//             <FieldInput
//               label="Phone"
//               value={currentProfile.phone}
//               onChange={(e) => onChange("phone", e.target.value)}
//               placeholder="+970 5XX XXX XXX"
//               icon={<Phone className="h-4 w-4" />}
//             />
//             <FieldInput
//               label="GPA (optional)"
//               value={currentProfile.gpa}
//               onChange={(e) => onChange("gpa", e.target.value)}
//               placeholder="e.g. 3.75"
//               icon={<Award className="h-4 w-4" />}
//             />
//           </>
//         ) : (
//           <>
//             <FieldDisplay
//               label="First Name"
//               value={currentProfile.firstName}
//               locked
//               icon={<User className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="Last Name"
//               value={currentProfile.lastName}
//               locked
//               icon={<User className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="Major"
//               value={currentProfile.major}
//               locked
//               icon={<BookOpen className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="University"
//               value={currentProfile.university}
//               locked
//               icon={<Building2 className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="Email"
//               value={currentProfile.email}
//               locked
//               icon={<Mail className="mr-2 h-4 w-4 shrink-0 text-[#1677FF]" />}
//             />
//             <FieldDisplay
//               label="Recovery Email"
//               value={currentProfile.recoveryEmail}
//               placeholder="Add a recovery email for account security"
//               icon={<Mail className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//               highlight={highlightField === "recoveryEmail"}
//             />
//             <FieldDisplay
//               label="Phone"
//               value={currentProfile.phone}
//               placeholder="Add your phone number"
//               icon={<Phone className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="Student Number"
//               value={currentProfile.studentNumber}
//               placeholder="From registration"
//               locked
//               icon={<Hash className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="GPA (optional)"
//               value={currentProfile.gpa}
//               placeholder="Enter your GPA"
//               icon={<Award className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//             <FieldDisplay
//               label="Company"
//               value={currentProfile.company || "Not enrolled yet"}
//               placeholder="You are not enrolled yet"
//               locked
//               icon={<Building className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
//             />
//           </>
//         )}
//       </div>
//     </SectionCard>
//   );
// };


// // ─── Documents ───────────────────────────────────────────────────────
// // const DocumentsCard = ({
// //   profile,
// //   onCvUpload,
// //   isCvUploading,
// //   cvProgress,
// //   onRemoveCv,
// //   isCvRemoving,
// //   onVerificationDocumentUpload,
// //   isVerificationDocumentUploading,
// //   onViewDocument,
// // }) => {
// //   const cvInputRef = useRef(null);
// //   const verificationDocumentInputRef = useRef(null);
// //   const isRejected = profile.verificationStatus?.toLowerCase() === "rejected";

// //   return (
// //     <SectionCard className="h-full">
// //       <SectionHeading
// //         eyebrow="Files"
// //         title="Documents"
// //         description="Files shared with internship supervisors upon application."
// //       />

// //       <div className="space-y-3 p-6">
// //         <div
// //           role="button"
// //           tabIndex={0}
// //           onClick={() => !isCvUploading && cvInputRef.current?.click()}
// //           onKeyDown={(e) => e.key === "Enter" && !isCvUploading && cvInputRef.current?.click()}
// //           className={`group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${isCvUploading
// //             ? "border-[#1677FF] bg-[#EAF3FF]/80"
// //             : profile.hasCv
// //               ? "border-[#1677FF]/20 bg-[#EAF3FF]/60"
// //               : "border-dashed border-gray-200 bg-gray-50/50 hover:border-[#1677FF]/40 hover:bg-[#EAF3FF]/40"
// //             }`}
// //         >
// //           <div className="flex min-w-0 items-center gap-3">
// //             <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCvUploading ? "bg-[#1677FF] text-white" : profile.hasCv ? "bg-[#1677FF]/10" : "bg-gray-100"}`}>
// //               {isCvUploading ? (
// //                 <CircleProgress percentage={cvProgress} size={36} />
// //               ) : (
// //                 <FileText className={`h-5 w-5 ${profile.hasCv ? "text-[#1677FF]" : "text-gray-400"}`} />
// //               )}
// //             </div>
// //             <div className="min-w-0">
// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs font-bold text-gray-800">
// //                   {isCvUploading ? "Uploading CV..." : "CV / Resume"}
// //                 </span>
// //                 {profile.hasCv && !isCvUploading && (
// //                   <button
// //                     type="button"
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       onViewDocument(profile.cvUrl, "CV");
// //                     }}
// //                     className="rounded p-1 text-[#1677FF] transition hover:bg-white"
// //                     aria-label="View CV"
// //                     title="View CV"
// //                   >
// //                     <Eye className="h-3.5 w-3.5" />
// //                   </button>
// //                 )}
// //                 {profile.hasCv && !isCvUploading && (
// //                   <button
// //                     type="button"
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       onRemoveCv();
// //                     }}
// //                     disabled={isCvRemoving}
// //                     className="rounded p-1 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
// //                     aria-label="Remove CV"
// //                     title="Remove CV"
// //                   >
// //                     <Trash2 className="h-3.5 w-3.5" />
// //                   </button>
// //                 )}
// //               </div>
// //               <p className="truncate text-[10px] font-medium text-gray-500">
// //                 {isCvUploading
// //                   ? `${Math.round(cvProgress)}% uploaded`
// //                   : profile.hasCv
// //                     ? `${profile.cvUrl || "resume.pdf"} · Uploaded`
// //                     : "PDF or DOC · Drag or click to upload"}
// //               </p>
// //             </div>
// //           </div>
// //           {!isCvUploading && !profile.hasCv && <Upload className="h-4 w-4 text-gray-400" />}
// //           <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onCvUpload} />
// //         </div>

// //         <div className={`rounded-xl border p-4 ${isRejected ? "border-red-200 bg-red-50/50" : "border-gray-100 bg-gray-50"}`}>
// //           <div className="flex min-w-0 items-center gap-3">
// //             <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isRejected ? "bg-red-100" : "bg-[#FFF4E6]"}`}>
// //               <FileText className={`h-5 w-5 ${isRejected ? "text-red-600" : "text-[#C76A0B]"}`} />
// //             </div>
// //             <div className="min-w-0">
// //               <div className="flex flex-wrap items-center gap-1.5">
// //                 <span className="text-xs font-medium text-gray-700">Verification Document</span>
// //                 {profile.hasVerificationDoc && !isVerificationDocumentUploading && (
// //                   <button
// //                     type="button"
// //                     onClick={() => onViewDocument(profile.verificationDocument, "verification document")}
// //                     className="rounded p-1 text-[#C76A0B] transition hover:bg-white"
// //                     aria-label="View verification document"
// //                     title="View verification document"
// //                   >
// //                     <Eye className="h-3.5 w-3.5" />
// //                   </button>
// //                 )}
// //                 <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${profile.verificationStatus?.toLowerCase() === "approved"
// //                   ? "bg-green-100 text-green-700"
// //                   : isRejected
// //                     ? "bg-red-100 text-red-700"
// //                     : "border border-[#FFAD4E]/30 bg-[#FFF4E6] text-[#C76A0B]"
// //                   }`}>
// //                   {profile.verificationStatus?.toLowerCase() === "approved"
// //                     ? "Approved"
// //                     : isRejected
// //                       ? "Rejected"
// //                       : "Under Review"}
// //                 </span>
// //               </div>
// //               <p className="truncate text-[10px] font-medium text-gray-500">
// //                 {isVerificationDocumentUploading
// //                   ? "Uploading replacement document..."
// //                   : isRejected
// //                     ? "Your document was rejected. Upload a new one to resubmit it for review."
// //                     : profile.hasVerificationDoc
// //                       ? "Submitted"
// //                       : "Not submitted"}
// //               </p>
// //             </div>
// //           </div>
// //           <div className="mt-3 flex items-center justify-between gap-3">
// //             <div className="flex items-center gap-2">
// //               {isRejected && (
// //                 <>
// //                 <button
// //                   type="button"
// //                   onClick={() => verificationDocumentInputRef.current?.click()}
// //                   disabled={isVerificationDocumentUploading}
// //                   className="inline-flex items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#086BEA] disabled:cursor-not-allowed disabled:opacity-60"
// //                 >
// //                   <Upload className="h-3.5 w-3.5" />
// //                   {isVerificationDocumentUploading ? "Uploading..." : "Upload new document"}
// //                 </button>
// //                 <input
// //                   ref={verificationDocumentInputRef}
// //                   type="file"
// //                   accept=".jpg,.jpeg,.png,.pdf"
// //                   className="hidden"
// //                   onChange={onVerificationDocumentUpload}
// //                 />
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </SectionCard>
// //   );
// // };


// const DocumentsCard = ({
//   profile,
//   onCvUpload,
//   isCvUploading,
//   cvProgress,
//   onRemoveCv,
//   isCvRemoving,
//   onVerificationDocumentUpload,
//   isVerificationDocumentUploading,
//   onViewDocument,
//   onRemoveVerificationDocument, // اختياري – للحذف
// }) => {
//   const cvInputRef = useRef(null);
//   const verificationDocumentInputRef = useRef(null);
//   const isRejected = profile.verificationStatus?.toLowerCase() === "rejected";

//   return (
//     <SectionCard className="h-full">
//       <SectionHeading
//         eyebrow="Files"
//         title="Documents"
//         description="Files shared with internship supervisors upon application."
//       />

//       <div className="space-y-3 p-6">
//         {/* ─── CV / Resume ─── */}
//         <div
//           role="button"
//           tabIndex={0}
//           onClick={() => !isCvUploading && cvInputRef.current?.click()}
//           onKeyDown={(e) => e.key === "Enter" && !isCvUploading && cvInputRef.current?.click()}
//           className={`group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${isCvUploading
//             ? "border-[#1677FF] bg-[#EAF3FF]/80"
//             : profile.hasCv
//               ? "border-[#1677FF]/20 bg-[#EAF3FF]/60"
//               : "border-dashed border-gray-200 bg-gray-50/50 hover:border-[#1677FF]/40 hover:bg-[#EAF3FF]/40"
//             }`}
//         >
//           {/* الجهة اليسرى: الأيقونة + النص */}
//           <div className="flex min-w-0 items-center gap-3">
//             <div
//               className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCvUploading
//                 ? "bg-[#1677FF] text-white"
//                 : profile.hasCv
//                   ? "bg-[#1677FF]/10"
//                   : "bg-gray-100"
//                 }`}
//             >
//               {isCvUploading ? (
//                 <CircleProgress percentage={cvProgress} size={36} />
//               ) : (
//                 <FileText
//                   className={`h-5 w-5 ${profile.hasCv ? "text-[#1677FF]" : "text-gray-400"
//                     }`}
//                 />
//               )}
//             </div>
//             <div className="min-w-0">
//               <span className="text-xs font-bold text-gray-800">
//                 {isCvUploading ? "Uploading CV..." : "CV / Resume"}
//               </span>
//               <p className="truncate text-[10px] font-medium text-gray-500">
//                 {isCvUploading
//                   ? `${Math.round(cvProgress)}% uploaded`
//                   : profile.hasCv
//                     ? `${profile.cvUrl || "resume.pdf"} · Uploaded`
//                     : "PDF or DOC · Drag or click to upload"}
//               </p>
//             </div>
//           </div>

//           {/* الجهة اليمنى: أيقونات الإجراءات */}
//           <div className="flex items-center gap-1">
//             {profile.hasCv && !isCvUploading && (
//               <>
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onViewDocument(profile.cvUrl, "CV");
//                   }}
//                   className="rounded p-1.5 text-[#1677FF] transition hover:bg-white/80"
//                   aria-label="View CV"
//                   title="View CV"
//                 >
//                   <Eye className="h-4 w-4" />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onRemoveCv();
//                   }}
//                   disabled={isCvRemoving}
//                   className="rounded p-1.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//                   aria-label="Remove CV"
//                   title="Remove CV"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               </>
//             )}
//             {!isCvUploading && !profile.hasCv && (
//               <Upload className="h-4 w-4 text-gray-400" />
//             )}
//           </div>

//           <input
//             ref={cvInputRef}
//             type="file"
//             accept=".pdf,.doc,.docx"
//             className="hidden"
//             onChange={onCvUpload}
//           />
//         </div>

//         {/* ─── Verification Document ─── */}
//         <div
//           className={`rounded-xl border p-4 ${isRejected ? "border-red-200 bg-red-50/50" : "border-gray-100 bg-gray-50"
//             }`}
//         >
//           <div className="flex items-center justify-between">
//             {/* الجهة اليسرى: الأيقونة + النص */}
//             <div className="flex min-w-0 items-center gap-3">
//               <div
//                 className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isRejected ? "bg-red-100" : "bg-[#FFF4E6]"
//                   }`}
//               >
//                 <FileText
//                   className={`h-5 w-5 ${isRejected ? "text-red-600" : "text-[#C76A0B]"
//                     }`}
//                 />
//               </div>
//               <div className="min-w-0">
//                 <span className="text-xs font-medium text-gray-700">
//                   Verification Document
//                 </span>
//                 <p className="truncate text-[10px] font-medium text-gray-500">
//                   {isVerificationDocumentUploading
//                     ? "Uploading replacement document..."
//                     : isRejected
//                       ? "Your document was rejected. Upload a new one to resubmit it for review."
//                       : profile.hasVerificationDoc
//                         ? "Submitted"
//                         : "Not submitted"}
//                 </p>
//               </div>
//             </div>

//             {/* الجهة اليمنى: أيقونة العين + حالة التوثيق */}
//             <div className="flex items-center gap-2 shrink-0">
//               {profile.hasVerificationDoc && !isVerificationDocumentUploading && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     onViewDocument(profile.verificationDocument, "verification document")
//                   }
//                   className="rounded p-1.5 text-[#C76A0B] transition hover:bg-white/80"
//                   aria-label="View verification document"
//                   title="View verification document"
//                 >
//                   <Eye className="h-4 w-4" />
//                 </button>
//               )}
//               {onRemoveVerificationDocument && profile.hasVerificationDoc && (
//                 <button
//                   type="button"
//                   onClick={onRemoveVerificationDocument}
//                   className="rounded p-1.5 text-red-500 transition hover:bg-red-50"
//                   aria-label="Remove verification document"
//                   title="Remove verification document"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               )}
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap ${profile.verificationStatus?.toLowerCase() === "approved"
//                   ? "bg-green-100 text-green-700"
//                   : isRejected
//                     ? "bg-red-100 text-red-700"
//                     : "border border-[#FFAD4E]/30 bg-[#FFF4E6] text-[#C76A0B]"
//                   }`}
//               >
//                 {profile.verificationStatus?.toLowerCase() === "approved"
//                   ? "Approved"
//                   : isRejected
//                     ? "Rejected"
//                     : "Under Review"}
//               </span>
//             </div>
//           </div>

//           {/* زر رفع مستند جديد (يظهر فقط في حالة الرفض) */}
//           {isRejected && (
//             <div className="mt-3">
//               <button
//                 type="button"
//                 onClick={() => verificationDocumentInputRef.current?.click()}
//                 disabled={isVerificationDocumentUploading}
//                 className="inline-flex items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#086BEA] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <Upload className="h-3.5 w-3.5" />
//                 {isVerificationDocumentUploading ? "Uploading..." : "Upload new document"}
//               </button>
//               <input
//                 ref={verificationDocumentInputRef}
//                 type="file"
//                 accept=".jpg,.jpeg,.png,.pdf"
//                 className="hidden"
//                 onChange={onVerificationDocumentUpload}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </SectionCard>
//   );
// };
// // ─── Skills ──────────────────────────────────────────────────────────
// // const SkillsCard = ({ skills, newSkill, onNewSkillChange, onAddSkill, onRemoveSkill }) => (
// //   <SectionCard className="h-full">
// //     <SectionHeading
// //       eyebrow="Matching"
// //       title="Skills"
// //       description="Help employers match you with relevant internships."
// //       action={
// //         <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold text-[#1677FF]">
// //           {(skills || []).length} added
// //         </span>
// //       }
// //     />

// //     <div className="p-6">
// //       <div className="flex flex-wrap gap-2">
// //         {(skills || []).map((skill) => (
// //           <span key={skill} className="group inline-flex items-center gap-1 rounded-lg border border-[#1677FF]/15 bg-[#EAF3FF] px-3 py-1.5 text-xs font-bold text-[#1677FF]">
// //             {skill}
// //             <button
// //               type="button"
// //               onClick={() => onRemoveSkill(skill)}
// //               className="rounded-full p-0.5 opacity-60 transition hover:bg-white hover:opacity-100"
// //             >
// //               <X className="h-3 w-3" />
// //             </button>
// //           </span>
// //         ))}
// //         {(skills || []).length === 0 && (
// //           <p className="text-xs italic text-gray-400">No skills added yet. Add at least 3 to improve matching.</p>
// //         )}
// //       </div>

// //       <div className="mt-5 flex gap-2">
// //         <input
// //           type="text"
// //           value={newSkill}
// //           onChange={(e) => onNewSkillChange(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddSkill())}
// //           placeholder="e.g. TypeScript, Figma, Python..."
// //           className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-medium placeholder-gray-400 focus:border-[#1677FF] focus:outline-none focus:ring-2 focus:ring-[#1677FF]/10"
// //         />
// //         <button
// //           type="button"
// //           onClick={onAddSkill}
// //           disabled={!newSkill.trim()}
// //           className="inline-flex items-center gap-1 rounded-xl bg-[#1677FF] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#086BEA] disabled:cursor-not-allowed disabled:opacity-50"
// //         >
// //           <Plus className="h-3.5 w-3.5" />
// //           Add
// //         </button>
// //       </div>
// //     </div>
// //   </SectionCard>
// // );
// const SkillsCard = ({ skills, newSkill, onNewSkillChange, onAddSkill, onRemoveSkill }) => {
//   const skillCount = (skills || []).length;
//   const isRequiredMet = skillCount >= 3;

//   return (
//     <SectionCard className="h-full">
//       <SectionHeading
//         eyebrow="Matching"
//         title={
//           <span className="flex items-center gap-1.5">
//             Skills
//             <span className="text-red-500 text-sm font-bold">*</span>
//             <span className={`ml-2 text-[10px] font-medium ${isRequiredMet ? 'text-emerald-600' : 'text-red-500'}`}>
//               {isRequiredMet ? '✓ Required met' : `${skillCount}/3 required`}
//             </span>
//           </span>
//         }
//         description="Add at least 3 skills to help employers match you with relevant internships."
//         action={
//           <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${isRequiredMet ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
//             {skillCount} added
//           </span>
//         }
//       />

//       <div className="p-6">
//         <div className="flex flex-wrap gap-2">
//           {(skills || []).map((skill) => (
//             <span
//               key={skill}
//               className="group inline-flex items-center gap-1 rounded-lg border border-[#1677FF]/15 bg-[#EAF3FF] px-3 py-1.5 text-xs font-bold text-[#1677FF]"
//             >
//               {skill}
//               <button
//                 type="button"
//                 onClick={() => onRemoveSkill(skill)}
//                 className="rounded-full p-0.5 opacity-60 transition hover:bg-white hover:opacity-100"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </span>
//           ))}
//           {skillCount === 0 && (
//             <p className="text-xs italic text-gray-400">No skills added yet. Add at least 3 to improve matching.</p>
//           )}
//         </div>

//         <div className="mt-5 flex gap-2">
//           <input
//             type="text"
//             value={newSkill}
//             onChange={(e) => onNewSkillChange(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddSkill())}
//             placeholder="e.g. TypeScript, Figma, Python..."
//             className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-medium placeholder-gray-400 focus:border-[#1677FF] focus:outline-none focus:ring-2 focus:ring-[#1677FF]/10"
//           />
//           <button
//             type="button"
//             onClick={onAddSkill}
//             disabled={!newSkill.trim()}
//             className="inline-flex items-center gap-1 rounded-xl bg-[#1677FF] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#086BEA] transition disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <Plus className="h-3.5 w-3.5" />
//             Add
//           </button>
//         </div>

//         {!isRequiredMet && skillCount > 0 && (
//           <p className="mt-3 text-xs text-orange-600 flex items-center gap-1.5">
//             <AlertCircle className="h-3.5 w-3.5" />
//             You need {3 - skillCount} more skill{3 - skillCount > 1 ? 's' : ''} to meet the minimum requirement.
//           </p>
//         )}
//       </div>
//     </SectionCard>
//   );
// };



// // ─── Completion Checklist ───────────────────────────────────────────
// // const CompletionChecklist = ({ completion, onItemClick }) => (
// //   <SectionCard className="overflow-hidden lg:sticky lg:top-6">
// //     <div className="border-b border-gray-100 bg-gray-50/60 px-5 py-4">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1677FF]">Profile setup</p>
// //           <h3 className="mt-0.5 text-sm font-extrabold text-gray-900">Profile Completion</h3>
// //         </div>
// //         {/* <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#EAF3FF] bg-white text-xs font-extrabold text-[#1677FF]"> */}
// //            <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-[#EAF3FF] bg-white text-xl font-extrabold text-[#1677FF] shadow-lg">
// //           {completion.percentage || 0}%
// //         </div>
// //       </div>
// //       <p className="mt-2 text-[10px] font-medium leading-4 text-gray-500">
// //         Complete your profile to unlock internship recommendations
// //       </p>
// //     </div>

// //     <ul className="space-y-1.5 p-4">
// //       {(completion.checks || []).map((item) => (
// //         <li key={item.key}>
// //           <button
// //             type="button"
// //             onClick={() => !item.done && onItemClick(item)}
// //             disabled={item.done}
// //             className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${item.done ? "cursor-default" : "cursor-pointer hover:bg-[#EAF3FF]"}`}
// //           >
// //             {item.done ? (
// //               <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
// //             ) : (
// //               <XCircle className="h-4 w-4 shrink-0 text-gray-300" />
// //             )}
// //             <span className={`text-[11px] font-semibold ${item.done ? "text-emerald-700" : "text-gray-600"}`}>
// //               {item.label}
// //               {item.optional && <span className="ml-1 font-normal text-gray-400">(optional)</span>}
// //             </span>
// //             {!item.done && <ChevronRight className="ml-auto h-3.5 w-3.5 text-gray-400" />}
// //           </button>
// //         </li>
// //       ))}
// //     </ul>

// //     <div className="mx-4 mb-4 rounded-xl border border-[#FFAD4E]/25 bg-[#FFF9F1] p-3">
// //       <div className="flex gap-2">
// //         <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C76A0B]" />
// //         <p className="text-[10px] font-semibold leading-4 text-gray-600">
// //           {completion.nextAction ? `Next: ${completion.nextAction.label}` : "Your profile is complete."}
// //         </p>
// //       </div>
// //     </div>
// //   </SectionCard>
// // );

// const CompletionChecklist = ({ completion, onItemClick }) => {
//   const percentage = completion.percentage || 0;
//   const radius = 32; // نصف القطر
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     // <SectionCard className="overflow-hidden lg:sticky lg:top-6">
//     <SectionCard className="overflow-hidden">
//       <div className="border-b border-gray-100 bg-gray-50/60 px-5 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1677FF]">
//               Profile setup
//             </p>
//             <h3 className="mt-0.5 text-sm font-extrabold text-gray-900">
//               Profile Completion
//             </h3>
//           </div>

//           {/* دائرة التقدم الكبيرة */}
//           <div className="relative flex h-20 w-20 items-center justify-center">
//             <svg className="h-20 w-20 -rotate-90 transform">
//               {/* الخلفية (track) */}
//               <circle
//                 className="text-gray-200"
//                 strokeWidth="6"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={radius}
//                 cx="40"
//                 cy="40"
//               />
//               {/* الجزء المملوء (progress) */}
//               <circle
//                 className="text-[#1677FF] transition-all duration-700 ease-out"
//                 strokeWidth="6"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={offset}
//                 strokeLinecap="round"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={radius}
//                 cx="40"
//                 cy="40"
//               />
//             </svg>
//             <span className="absolute text-base font-extrabold text-[#1677FF]">
//               {percentage}%
//             </span>
//           </div>
//         </div>
//         <p className="mt-2 text-[10px] font-medium leading-4 text-gray-500">
//           Complete your profile to unlock internship recommendations
//         </p>
//       </div>

//       <ul className="space-y-1.5 p-4">
//         {(completion.checks || []).map((item) => (
//           <li key={item.key}>
//             <button
//               type="button"
//               onClick={() => !item.done && onItemClick(item)}
//               disabled={item.done}
//               className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${item.done ? "cursor-default" : "cursor-pointer hover:bg-[#EAF3FF]"
//                 }`}
//             >
//               {item.done ? (
//                 <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
//               ) : (
//                 <XCircle className="h-4 w-4 shrink-0 text-gray-300" />
//               )}
//               <span className={`text-[11px] font-semibold ${item.done ? "text-emerald-700" : "text-gray-600"}`}>
//                 {item.label}
//                 {item.optional && <span className="ml-1 font-normal text-gray-400">(optional)</span>}
//               </span>
//               {!item.done && <ChevronRight className="ml-auto h-3.5 w-3.5 text-gray-400" />}
//             </button>
//           </li>
//         ))}
//       </ul>

//       <div className="mx-4 mb-4 rounded-xl border border-[#FFAD4E]/25 bg-[#FFF9F1] p-3">
//         <div className="flex gap-2">
//           <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C76A0B]" />
//           <p className="text-[10px] font-semibold leading-4 text-gray-600">
//             {/* {completion.nextAction?.label
//               ? `Next: ${completion.nextAction.label}`
//               : "Your profile is complete!"} */}

//             {completion.percentage === 100
//               ? "Your profile is complete!"
//               : `${completion.nextAction?.label || "Complete your profile"}`}
//           </p>
//         </div>
//       </div>

//     </SectionCard>
//   );
// };


// // ─── Profile Preview ─────────────────────────────────────────────────
// const ProfilePreviewCard = ({ profile }) => (
//   <SectionCard>
//     <SectionHeading
//       eyebrow="Visibility"
//       title="How supervisors see you"
//       description="A preview of the information employers and supervisors can use."
//       action={<Eye className="h-4 w-4 text-[#1677FF]" />}
//     />
//     <div className="p-5">
//       <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF] text-sm font-extrabold text-[#1677FF]">
//             {profile.firstName?.[0] || ""}{profile.lastName?.[0] || ""}
//           </div>
//           <div className="min-w-0">
//             <p className="truncate text-sm font-extrabold text-gray-900">{profile.firstName} {profile.lastName}</p>
//             <p className="truncate text-[11px] font-medium text-gray-500">{profile.major}</p>
//           </div>
//         </div>
//         <div className="mt-3 flex flex-wrap gap-1.5">
//           {(profile.skills || []).slice(0, 4).map((s) => (
//             <span key={s} className="rounded-md border border-[#1677FF]/10 bg-white px-2 py-1 text-[10px] font-bold text-[#1677FF]">
//               {s}
//             </span>
//           ))}
//           {(profile.skills || []).length > 4 && (
//             <span className="px-1 py-1 text-[10px] font-medium text-gray-400">+{(profile.skills || []).length - 4} more</span>
//           )}
//         </div>
//       </div>
//     </div>
//   </SectionCard>
// );

// // ─── Main Component ──────────────────────────────────────────────────
// const StudentProfile = () => {
//   // Helper at the top of the component
//   const getToastType = (status) => {
//     if (status === 401) return 'auth';
//     if (status === 400) return 'validation';
//     if (status >= 500) return 'error';
//     return 'error';
//   };
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const { showToast } = useToast();

//   const [profile, setProfile] = useState(() => buildInitialProfile(user));
//   const [draft, setDraft] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [newSkill, setNewSkill] = useState("");
//   const [highlightField, setHighlightField] = useState(null);

//   const [avatarProgress, setAvatarProgress] = useState(0);
//   const [isAvatarUploading, setIsAvatarUploading] = useState(false);
//   const [cvProgress, setCvProgress] = useState(0);
//   const [isCvUploading, setIsCvUploading] = useState(false);
//   const [isCvRemoving, setIsCvRemoving] = useState(false);
//   const [isVerificationDocumentUploading, setIsVerificationDocumentUploading] = useState(false);
//   const [isLoadingProfile, setIsLoadingProfile] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   const personalRef = useRef(null);
//   const documentsRef = useRef(null);
//   const skillsRef = useRef(null);
//   const avatarInputRef = useRef(null);

//   const completion = useMemo(() => computeCompletion(profile), [profile]);

//   const studentUser = useMemo(
//     () => ({
//       name: `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student",
//       role: "Student",
//       avatar: profile.avatar,
//     }),
//     [profile]
//   );

//   const handleSignOut = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   // ─── Load profile ──────────────────────────────────────────────────
//   useEffect(() => {
//     const loadProfile = async () => {
//       setIsLoadingProfile(true);
//       try {
//         const response = await profileAPI.getProfile();
//         const normalized = normalizeProfileResponse(response, profile);
//         if (normalized.university && typeof normalized.university === 'object') {
//           normalized.university = normalized.university.name || '';
//         }
//         setProfile(normalized);
//       } catch (error) {
//         console.error("Failed to load profile:", error);
//         // showToast("Failed to load profile.", "error");
//         showToast(
//           error?.message || "Failed to load profile.",
//           getToastType(error?.status || 500)
//         );
//       } finally {
//         setIsLoadingProfile(false);
//       }
//     };
//     loadProfile();
//   }, []);

//   // ─── Registration success toast ──────────────────────────────────
//   useEffect(() => {
//     if (location.state?.registrationSuccess) {
//       showToast(
//         location.state.message || "Your account is pending verification.",
//         "success",
//         6000
//       );
//     }
//   }, [location.state, showToast]);

//   // ─── Avatar Upload ──────────────────────────────────────────────────
//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       showToast("Photo must be under 2MB.", "error");
//       return;
//     }

//     setIsAvatarUploading(true);
//     setAvatarProgress(0);

//     try {
//       await new Promise((resolve) => {
//         let progress = 0;
//         const interval = setInterval(() => {
//           progress += Math.random() * 15 + 5;
//           if (progress >= 100) {
//             progress = 100;
//             clearInterval(interval);
//             resolve();
//           }
//           setAvatarProgress(Math.min(progress, 100));
//         }, 200);
//       });

//       const base64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;
//       });

//       const response = await profileAPI.updateProfile({ profileImage: base64 });
//       setAvatarProgress(100);

//       const normalized = normalizeProfileResponse(response, profile);
//       if (normalized.university && typeof normalized.university === 'object') {
//         normalized.university = normalized.university.name || '';
//       }
//       setProfile(normalized);
//       setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
//       showToast("Profile photo updated.", "success");
//     } catch (error) {
//       console.error("Avatar upload error:", error);
//       showToast("Failed to upload photo.", "error");
//     } finally {
//       setIsAvatarUploading(false);
//       setAvatarProgress(0);
//       if (avatarInputRef.current) avatarInputRef.current.value = '';
//     }
//   };

//   // ─── Delete Profile Image ────────────────────────────────────────────────────
//   const handleDeleteAvatar = async () => {
//     if (!profile.avatar) return;

//     setIsAvatarUploading(true); // reuse loading state
//     setAvatarProgress(50);

//     try {
//       const response = await profileAPI.updateProfile({ profileImage: null });
//       setAvatarProgress(100);

//       const normalized = normalizeProfileResponse(response, profile);
//       if (normalized.university && typeof normalized.university === 'object') {
//         normalized.university = normalized.university.name || '';
//       }
//       // ✅ تأكد من أن avatar يصبح null
//       setProfile({ ...normalized, avatar: null });
//       setDraft((prev) => (prev ? { ...prev, avatar: null } : prev));
//       showToast("Profile photo removed.", "success");
//     } catch (error) {
//       console.error("Delete avatar error:", error);
//       showToast("Failed to remove photo.", "error");
//     } finally {
//       setIsAvatarUploading(false);
//       setAvatarProgress(0);
//     }
//   };


//   // ─── CV Upload ──────────────────────────────────────────────────────
//   const handleCvUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       showToast("CV must be under 5MB.", "error");
//       return;
//     }

//     const validTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     if (!validTypes.includes(file.type)) {
//       showToast("Please upload a PDF, DOC, or DOCX CV.", "error");
//       e.target.value = "";
//       return;
//     }

//     setIsCvUploading(true);
//     setCvProgress(0);

//     try {
//       const response = await profileAPI.uploadCV(file, setCvProgress);

//       const normalized = normalizeProfileResponse(response, profile);
//       if (normalized.university && typeof normalized.university === 'object') {
//         normalized.university = normalized.university.name || '';
//       }
//       setProfile(normalized);
//       setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
//       showToast("CV uploaded.", "success");
//     } catch (error) {
//       console.error("CV upload error:", error);
//       showToast("Failed to upload CV.", "error");
//     } finally {
//       setIsCvUploading(false);
//       setCvProgress(0);
//       const input = e.target;
//       if (input) input.value = '';
//     }
//   };

//   const handleRemoveCv = async () => {
//     setIsCvRemoving(true);

//     try {
//       const response = await profileAPI.removeCV();
//       const normalized = normalizeProfileResponse(response, profile);
//       setProfile(normalized);
//       setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
//       showToast("CV removed.", "success");
//     } catch (error) {
//       console.error("CV removal error:", error);
//       showToast(error?.message || "Failed to remove CV.", "error");
//     } finally {
//       setIsCvRemoving(false);
//     }
//   };

//   // ─── Verification Document Re-upload ────────────────────────────────
//   const handleVerificationDocumentUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       showToast("Verification document must be under 5MB.", "error");
//       e.target.value = "";
//       return;
//     }

//     const validTypes = ["image/jpeg", "image/png", "application/pdf"];
//     if (!validTypes.includes(file.type)) {
//       showToast("Please upload a JPG, PNG, or PDF verification document.", "error");
//       e.target.value = "";
//       return;
//     }

//     setIsVerificationDocumentUploading(true);

//     try {
//       const response = await profileAPI.reuploadVerificationDocument(file);
//       const normalized = normalizeProfileResponse(response, profile);
//       if (normalized.university && typeof normalized.university === "object") {
//         normalized.university = normalized.university.name || "";
//       }
//       setProfile(normalized);
//       setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
//       showToast("Verification document submitted. Your account is now pending review.", "success");
//     } catch (error) {
//       console.error("Verification document re-upload error:", error);
//       showToast(error?.message || "Failed to submit verification document.", "error");
//     } finally {
//       setIsVerificationDocumentUploading(false);
//       e.target.value = "";
//     }
//   };

//   const handleViewDocument = async (document, label) => {
//     const documentUrl = profileAPI.getDocumentUrl(document);
//     if (!documentUrl) {
//       showToast(`No ${label} is available to view.`, "error");
//       return;
//     }

//     // Open the tab synchronously so it is not blocked as a pop-up, then load
//     // a Blob URL. Browsers block direct navigation to many data: URLs.
//     const viewer = window.open("", "_blank");
//     if (!viewer) {
//       showToast("Please allow pop-ups to view this document.", "error");
//       return;
//     }
//     viewer.opener = null;

//     try {
//       const response = await fetch(documentUrl);
//       if (!response.ok) throw new Error("Document could not be loaded.");

//       const documentBlobUrl = URL.createObjectURL(await response.blob());
//       viewer.location.replace(documentBlobUrl);
//     } catch (error) {
//       viewer.close();
//       console.error(`Failed to open ${label}:`, error);
//       showToast(`Unable to open this ${label}. Please try again later.`, "error");
//     }
//   };


//   // ─── Edit / Save ────────────────────────────────────────────────────
//   const handleEdit = () => {
//     setDraft({ ...profile });
//     setIsEditing(true);
//     setActiveTab("personal");
//   };

//   const handleCancel = () => {
//     setDraft(null);
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     if (!draft) return;

//     const changes = {};
//     const editableFields = ['recoveryEmail', 'phone', 'gpa'];
//     editableFields.forEach(f => {
//       if (draft[f] !== profile[f]) {
//         changes[f] = draft[f];
//       }
//     });

//     if (Object.prototype.hasOwnProperty.call(changes, 'gpa')) {
//       const raw = changes.gpa;
//       if (raw === null || raw === '') {
//         changes.gpa = null;
//       } else {
//         const num = Number(raw);
//         if (Number.isNaN(num)) {
//           showToast('GPA must be a number.', 'error');
//           return;
//         }
//         changes.gpa = num;
//       }
//     }

//     if (Object.keys(changes).length === 0) {
//       setIsEditing(false);
//       setDraft(null);
//       showToast("No changes to save.", "info");
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const response = await profileAPI.updateProfile(changes);
//       const normalized = normalizeProfileResponse(response, profile);
//       if (normalized.university && typeof normalized.university === 'object') {
//         normalized.university = normalized.university.name || '';
//       }
//       setProfile(normalized);
//       setDraft(null);
//       setIsEditing(false);
//       showToast("Profile updated successfully.", "success");
//     } catch (error) {
//       console.error("Update error:", error);
//       showToast("Failed to update profile.", "error");
//     } finally {
//       // Stop saving animation immediately when backend has responded
//       setIsSaving(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setDraft((prev) => ({ ...(prev || profile), [field]: value }));
//   };

//   // ─── Skills ──────────────────────────────────────────────────────────
//   const handleAddSkill = async () => {
//     const trimmed = newSkill.trim();
//     if (!trimmed || (profile.skills || []).includes(trimmed)) return;

//     try {
//       await profileAPI.addSkill(trimmed);
//       setProfile((prev) => ({ ...prev, skills: [...(prev.skills || []), trimmed] }));
//       setNewSkill("");
//       showToast("Skill added.", "success");
//     } catch (error) {
//       console.error("Add skill error:", error);
//       showToast("Failed to add skill.", "error");
//     }
//   };

//   const handleRemoveSkill = async (skill) => {
//     try {
//       await profileAPI.removeSkill(skill);
//       setProfile((prev) => ({
//         ...prev,
//         skills: (prev.skills || []).filter((s) => s !== skill),
//       }));
//       showToast("Skill removed.", "success");
//     } catch (error) {
//       console.error("Remove skill error:", error);
//       showToast("Failed to remove skill.", "error");
//     }
//   };

//   // ─── Checklist ──────────────────────────────────────────────────────
//   const handleChecklistClick = (item) => {
//     const tab = item.section === "personal" ? "personal" : "documents";
//     setActiveTab(tab);

//     if (item.key === "recoveryEmail") {
//       setHighlightField("recoveryEmail");
//       setTimeout(() => setHighlightField(null), 2500);
//     }

//     setTimeout(() => {
//       const ref =
//         item.section === "personal"
//           ? personalRef
//           : item.key === "skills"
//             ? skillsRef
//             : documentsRef;
//       ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 100);
//   };

//   const currentProfile = isEditing && draft ? draft : profile;

//   // ─── Loading state ──────────────────────────────────────────────────
//   if (isLoadingProfile) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#F5F7FA]">
//         <div className="text-center">
//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#1677FF] border-t-transparent" />
//           <p className="mt-4 text-sm text-gray-500 font-['Inter']">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#F5F7FA]">
//         <div className="text-center">
//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#1677FF] border-t-transparent" />
//           <p className="mt-4 text-sm text-gray-500 font-['Inter']">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-[#F5F7FA] font-sans text-gray-900">
//       <Sidebar
//         navItems={studentNavItems}
//         footerItems={studentFooterItems}
//         user={studentUser}
//         profilePath="/student/profile"
//         onSignOut={handleSignOut}
//       />

//       <main className="flex-1 overflow-y-auto">
//         <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
//           <header className="mb-6 flex items-center justify-between gap-4">
//             <div className="relative w-full max-w-[540px]">
//               <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="search"
//                 placeholder="Search internships or tasks..."
//                 className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-xs text-gray-700 shadow-[0_1px_5px_rgba(20,35,60,0.03)] transition focus:border-[#1677FF] focus:outline-none focus:ring-4 focus:ring-[#1677FF]/10"
//               />
//             </div>
//             <TopIconCluster
//               chatBadge={9}
//               notificationBadge={5}
//               avatarUrl={profile.avatar}
//               userName={studentUser.name}
//             />
//           </header>

//           <ProfileHeader
//             profile={profile}
//             completion={completion}
//             onAvatarUpload={handleAvatarUpload}
//             fileInputRef={avatarInputRef}
//             onTabChange={setActiveTab}
//             isAvatarUploading={isAvatarUploading}
//             avatarProgress={avatarProgress}
//             onDeleteAvatar={handleDeleteAvatar}
//           />

//           <TabNav activeTab={activeTab} onChange={setActiveTab} />

//           <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
//             <div className="min-w-0 space-y-5">
//               {(activeTab === "overview" || activeTab === "personal") && (
//                 <>
//                   {activeTab === "overview" && (
//                     <ApplicationStatusTracker status={profile.verificationStatus} />
//                   )}
//                   <PersonalInfoCard
//                     profile={currentProfile}
//                     isEditing={isEditing}
//                     onEdit={handleEdit}
//                     onSave={handleSave}
//                     onCancel={handleCancel}
//                     onChange={handleChange}
//                     highlightField={highlightField}
//                     sectionRef={personalRef}
//                     isSaving={isSaving}
//                   />
//                 </>
//               )}

//               {(activeTab === "overview" || activeTab === "documents") && (
//                 <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//                   <div ref={documentsRef}>
//                     <DocumentsCard
//                       profile={profile}
//                       onCvUpload={handleCvUpload}
//                       isCvUploading={isCvUploading}
//                       cvProgress={cvProgress}
//                       onRemoveCv={handleRemoveCv}
//                       isCvRemoving={isCvRemoving}
//                       onVerificationDocumentUpload={handleVerificationDocumentUpload}
//                       isVerificationDocumentUploading={isVerificationDocumentUploading}
//                       onViewDocument={handleViewDocument}
//                     />
//                   </div>
//                   <div ref={skillsRef}>
//                     <SkillsCard
//                       skills={profile.skills}
//                       newSkill={newSkill}
//                       onNewSkillChange={setNewSkill}
//                       onAddSkill={handleAddSkill}
//                       onRemoveSkill={handleRemoveSkill}
//                     />
//                   </div>
//                 </div>
//               )}

//               {activeTab === "overview" && <ProfilePreviewCard profile={profile} />}
//             </div>

//             <aside className="space-y-5">
//               <CompletionChecklist completion={completion} onItemClick={handleChecklistClick} />

//               <SectionCard className="hidden overflow-hidden xl:block">
//                 <div className="border-b border-gray-100 px-5 py-4">
//                   <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1677FF]">Account status</p>
//                   <h3 className="mt-0.5 text-sm font-extrabold text-gray-900">Verification</h3>
//                 </div>
//                 <div className="space-y-3 p-5">
//                   <div className="flex items-center gap-3">
//                     <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${profile.verificationStatus?.toLowerCase() === "approved"
//                       ? "bg-green-100 text-green-700"
//                       : profile.verificationStatus?.toLowerCase() === "rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-[#FFF4E6] text-[#C76A0B]"
//                       }`}>
//                       <ShieldCheck className="h-4 w-4" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-gray-800">
//                         {profile.verificationStatus?.toLowerCase() === "approved"
//                           ? "Verified"
//                           : profile.verificationStatus?.toLowerCase() === "rejected"
//                             ? "Rejected"
//                             : "Under Review"}
//                       </p>
//                       <p className="text-[10px] text-gray-500">
//                         {profile.verificationStatus?.toLowerCase() === "approved"
//                           ? "Account verified"
//                           : profile.verificationStatus?.toLowerCase() === "rejected"
//                             ? "Please contact support"
//                             : "University administration"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
//                       <Building2 className="h-4 w-4" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-gray-800">Company</p>
//                       <p className="text-[10px] text-gray-500">{profile.company || "You are not enrolled yet"}</p>
//                     </div>
//                   </div>
//                 </div>
//               </SectionCard>
//             </aside>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentProfile;





// src/components/pages/student/StudentProfile.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Clock,
  Settings,
  Search,
  User,
  Mail,
  Phone,
  Hash,
  Check,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  Lock,
  Plus,
  X,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Save,
  Eye,
  ShieldCheck,
  Building2,
  BookOpen,
  Award,
  Building,
  TrendingUp,
  Trash2
} from "lucide-react";
import Sidebar from "../../layout/Sidebar";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { profileAPI } from "../../../services/api";
import PageHeader from "../../common/pagesAssets/PageHeader";
import AIAssistant from "../../common/pagesAssets/AIAssistant";

// ─── Import skeleton components ──────────────────────────────────────
import {
  SkeletonProfileHeader,
  SkeletonPersonalInfoCard,
  SkeletonDocumentsCard,
  SkeletonSkillsCard,
  SkeletonCompletionChecklist,
  SkeletonProfilePreview,
  SkeletonAccountStatus,
  SkeletonTabNav,
  SkeletonVerificationStatus,
  SkeletonRect,
  SkeletonCircle,
} from "../../common/pagesAssets/Skeleton";

// ─── Normalize backend response ──────────────────────────────────────
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

const DEFAULT_SKILLS = [];

const PROFILE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "personal", label: "Personal Info" },
  { id: "documents", label: "Documents & Skills" },
];

// ─── University mapping ──────────────────────────────────────────────
const UNIVERSITIES = [
  { id: 1, name: "An-Najah National University" },
  { id: 2, name: "Birzeit University" },
  { id: 3, name: "Bethlehem University" },
  { id: 4, name: "Al-Quds University" },
  { id: 5, name: "Palestine Polytechnic University" }
];

const getUniversityName = (id) => {
  if (!id) return "Not provided";
  const uni = UNIVERSITIES.find(u => u.id === parseInt(id));
  return uni ? uni.name : "Not provided";
};

function buildInitialProfile(user) {
  const safeUser = user || {};
  const studentProfile = safeUser.studentProfile || {};

  let skills = DEFAULT_SKILLS;
  if (studentProfile.skills) {
    if (Array.isArray(studentProfile.skills)) {
      skills = studentProfile.skills.length > 0 ? studentProfile.skills : DEFAULT_SKILLS;
    } else if (typeof studentProfile.skills === 'string') {
      skills = studentProfile.skills.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  const approvalStatus = studentProfile.approvalStatus?.toLowerCase() || "pending";

  return {
    firstName: safeUser.firstName || "",
    lastName: safeUser.lastName || "",
    email: safeUser.email || "",
    phone: safeUser.phone || "",
    personalID: safeUser.personalID || "",
    recoveryEmail: safeUser.recoveryEmail || "",
    studentNumber: studentProfile.studentNumber || "",
    major: studentProfile.major || "",
    university: getUniversityName(safeUser.universityId || studentProfile.universityId),
    universityId: safeUser.universityId || studentProfile.universityId,
    gpa: studentProfile.gpa || "",
    company: safeUser.companyId ? "Company name (from API)" : "",
    companyId: safeUser.companyId || null,
    avatar: safeUser.profileImage || "",
    skills: skills,
    hasCv: !!studentProfile.cvUrl,
    cvUrl: studentProfile.cvUrl || null,
    hasVerificationDoc: !!studentProfile.verificationDocument,
    verificationStatus: approvalStatus,
    verificationDocument: studentProfile.verificationDocument || null,
  };
}

function computeCompletion(profile) {
  if (!profile) return { checks: [], percentage: 0, nextAction: null };

  const checks = [
    { key: "basics", done: !!(profile.firstName && profile.lastName && profile.major && profile.university) },
    { key: "photo", done: !!profile.avatar },
    { key: "recoveryEmail", done: !!profile.recoveryEmail },
    { key: "skills", done: (profile.skills || []).length >= 3 },
    { key: "cv", done: profile.hasCv, optional: true },
    { key: "verificationDoc", done: profile.hasVerificationDoc },
  ];

  const required = checks.filter((c) => !c.optional);
  const doneCount = required.filter((c) => c.done).length;
  const percentage = required.length > 0 ? Math.round((doneCount / required.length) * 100) : 0;

  return {
    checks: checks.map((c) => ({
      ...c,
      label: {
        basics: "Complete personal details",
        photo: "Upload profile photo",
        recoveryEmail: "Add recovery email",
        skills: "Add at least 3 skills",
        cv: "Upload CV (optional)",
        verificationDoc: "Submit verification document",
      }[c.key] || c.key,
      section: {
        basics: "personal",
        photo: "personal",
        recoveryEmail: "personal",
        skills: "documents",
        cv: "documents",
        verificationDoc: "documents",
      }[c.key] || "personal",
    })),
    percentage,
    nextAction: checks.find((c) => !c.done && !c.optional) || null,
  };
}

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"
      fill="currentColor"
    />
  </svg>
);

// ─── UI Primitives ──────────────────────────────────────────────────
const SectionCard = ({ children, className = "", ...props }) => (
  <section
    {...props}
    className={`rounded-2xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(20,35,60,0.04)] ${className}`}
  >
    {children}
  </section>
);

const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
    <div>
      {eyebrow && (
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1677FF]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-base font-extrabold tracking-tight text-gray-900">{title}</h2>
      {description && <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>}
    </div>
    {action}
  </div>
);

const FieldDisplay = ({ label, value, icon, locked, placeholder, highlight }) => (
  <div>
    <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
      {label}
      {locked && (
        <span className="inline-flex items-center gap-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
          <Lock className="h-2.5 w-2.5" />
          Locked
        </span>
      )}
    </label>
    <div
      className={`mt-1.5 flex min-h-[43px] items-center rounded-xl border px-3.5 transition-all ${highlight
        ? "border-[#FFAD4E] bg-[#FFF8EF] ring-2 ring-[#FFAD4E]/20"
        : value
          ? "border-gray-200 bg-gray-50/60 text-gray-900"
          : "border-dashed border-gray-200 bg-gray-50/40 text-gray-400"
        }`}
    >
      {icon}
      <span className={`truncate text-xs font-medium ${value ? "text-gray-800" : "italic text-gray-400"}`}>
        {value || placeholder}
      </span>
    </div>
  </div>
);

const FieldInput = ({ label, value, onChange, type = "text", placeholder, locked, icon }) => (
  <div>
    <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
      {label}
      {locked && (
        <span className="inline-flex items-center gap-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
          <Lock className="h-2.5 w-2.5" />
          Locked
        </span>
      )}
    </label>
    <div className="relative mt-1.5">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        disabled={locked}
        placeholder={placeholder}
        className={`w-full rounded-xl border py-2.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1677FF]/15 ${icon ? "pl-9 pr-4" : "px-3.5"
          } ${locked
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500"
            : "border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-[#1677FF]"
          }`}
      />
    </div>
  </div>
);

const CircleProgress = ({ percentage, size = 40 }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle className="text-gray-200" strokeWidth="3" stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
        <circle
          className="text-[#1677FF] transition-all duration-300 ease-out"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-[9px] font-bold text-[#1677FF] font-['Inter']">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

// ─── Profile Header ──────────────────────────────────────────────────
const ProfileHeader = ({
  profile,
  completion,
  onAvatarUpload,
  onDeleteAvatar,
  fileInputRef,
  onTabChange,
  isAvatarUploading,
  avatarProgress,
}) => {
  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student";
  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "S";

  const universityName = typeof profile.university === 'string'
    ? profile.university
    : (profile.university?.name || '');

  const getStatusBadge = () => {
    const status = profile.verificationStatus?.toLowerCase() || "pending";
    if (status === "approved") return { label: "Verified", className: "bg-green-100 text-green-700" };
    if (status === "rejected") return { label: "Rejected", className: "bg-red-100 text-red-700" };
    return { label: "Verification in progress", className: "bg-[#FFF4E6] text-[#C76A0B]" };
  };

  const badge = getStatusBadge();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.relative.shrink-0')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(20,35,60,0.06)]">
      <div className="relative h-[140px] overflow-hidden bg-gradient-to-r from-blue-100/20 via-blue-200/20 to-orange-100/20 sm:h-[160px]">
        <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -bottom-24 left-[38%] h-56 w-56 rounded-full bg-orange-200/25 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1677FF 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }} />
      </div>

      <div className="relative px-5 pb-5 sm:px-7">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-end gap-4">
            <div className="relative shrink-0 group">
              {profile.avatar ? (
                <img src={profile.avatar} alt={fullName} className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg sm:h-28 sm:w-28" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#EAF3FF] text-2xl font-extrabold text-[#1677FF] shadow-lg sm:h-28 sm:w-28">
                  {initials}
                </div>
              )}

              {isAvatarUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                  <CircleProgress percentage={avatarProgress} size={50} />
                </div>
              )}

              {!isAvatarUploading && (
                <div className="absolute -bottom-2 -right-2">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#1677FF] text-white shadow-md transition hover:scale-105"
                  >
                    <Upload className="h-3.5 w-3.5" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 rounded-xl border border-gray-200 bg-white shadow-lg z-10">
                      <button
                        onClick={() => {
                          fileInputRef.current?.click();
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
                      >
                        <Upload className="h-4 w-4" />
                        Upload new image
                      </button>
                      {profile.avatar && (
                        <button
                          onClick={() => {
                            onDeleteAvatar();
                            setIsMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition border-t border-gray-100"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete image
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onAvatarUpload} />
            </div>

            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">{fullName}</h1>
                <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold text-[#1677FF]">Student</span>
              </div>
              <p className="mt-1 truncate text-xs font-medium text-gray-500">
                {profile.major || "No major"} · {universityName || "No university"}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.className}`}>
                  <AlertCircle className="h-3 w-3" />
                  {badge.label}
                </span>
                <span className="hidden text-[11px] font-medium text-gray-400 sm:inline">{profile.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:pb-1">
            <button
              type="button"
              onClick={() => onTabChange("personal")}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:border-[#1677FF]/30 hover:bg-[#EAF3FF] hover:text-[#1677FF]"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 divide-x divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/70 sm:grid-cols-4">
          <div className="flex items-start gap-2 px-4 py-3">
            <Hash className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Student Number</p>
              <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.studentNumber || "—"}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 px-4 py-3">
            <Building2 className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">University</p>
              <p className="mt-1 truncate text-xs font-bold text-gray-800">{universityName || "—"}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 border-t border-gray-100 px-4 py-3 sm:border-t-0">
            <Award className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">GPA</p>
              <p className="mt-1 truncate text-xs font-bold text-gray-800">{profile.gpa || "Not added"}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 border-t border-gray-100 px-4 py-3 sm:border-t-0">
            <TrendingUp className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Profile strength</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-[#1677FF]" style={{ width: `${completion.percentage || 0}%` }} />
                </div>
                <span className="text-xs font-extrabold text-[#1677FF]">{completion.percentage || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Tabs ────────────────────────────────────────────────────────────
const TabNav = ({ activeTab, onChange }) => (
  <nav className="mt-5 flex overflow-x-auto border-b border-gray-200" aria-label="Profile sections">
    {PROFILE_TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onChange(tab.id)}
        aria-selected={activeTab === tab.id}
        className={`relative whitespace-nowrap px-5 py-3 text-xs font-bold transition sm:text-sm ${activeTab === tab.id ? "text-[#1677FF]" : "text-gray-500 hover:text-gray-800"
          }`}
      >
        {tab.label}
        {activeTab === tab.id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#1677FF]" />}
      </button>
    ))}
  </nav>
);

// ─── Verification ────────────────────────────────────────────────────
const ProgressTracker = ({ status }) => {
  const statusMap = { pending: "review", approved: "approved", rejected: "review" };
  const actualStatus = statusMap[status?.toLowerCase()] || "review";

  const steps = [
    { label: "Applied", date: "Jul 12, 2026", key: "applied" },
    { label: "Review", date: "In Progress", key: "review" },
    { label: "Approved", date: "\u00A0", key: "approved" },
  ];

  const statusIndex = steps.findIndex((s) => s.key === actualStatus);
  const fillWidth = statusIndex <= 0 ? "0%" : statusIndex === 1 ? "50%" : "100%";
  const isApproved = status?.toLowerCase() === "approved";
  const isRejected = status?.toLowerCase() === "rejected";
  const isPending = status?.toLowerCase() === "pending";

  let lineColor = "bg-gray-200";
  if (isApproved) lineColor = "bg-green-500";
  else if (isRejected) lineColor = "bg-red-500";
  else if (isPending) lineColor = "bg-gradient-to-r from-blue-500 to-yellow-400";

  return (
    <div className="relative flex w-full items-start justify-between" role="list" aria-label="Verification progress">
      <div className="absolute left-[7%] right-[7%] top-5 h-0.5 bg-gray-200" />
      <div
        className={`absolute left-[7%] top-5 h-0.5 transition-all duration-500 ${lineColor}`}
        style={{ width: `calc(${fillWidth} * 86%)` }}
      />
      {steps.map((step, idx) => {
        const completed = idx < statusIndex;
        const active = idx === statusIndex;

        let circleColor = "bg-gray-100 text-gray-400 ring-gray-200";
        if (completed) {
          circleColor = "bg-emerald-500 text-white ring-4 ring-emerald-200";
        } else if (active) {
          if (isPending) {
            circleColor = "bg-blue-500 text-white ring-4 ring-blue-200";
          } else if (isRejected) {
            circleColor = "bg-red-500 text-white ring-4 ring-red-200";
          } else {
            circleColor = "bg-blue-500 text-white ring-4 ring-blue-200";
          }
        }
        return (
          <div key={step.key} className="relative z-10 flex w-1/3 flex-col items-center" role="listitem">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-xs font-extrabold shadow-sm transition-all duration-500 ${circleColor}`}>
              {completed ? <Check className="h-4 w-4" strokeWidth={2.5} /> : idx + 1}
            </div>
            <p className={`mt-2 text-[11px] font-extrabold ${active || completed ? "text-blue-600" : "text-gray-400"}`}>
              {step.label}
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-gray-400">{step.date}</p>
          </div>
        );
      })}
    </div>
  );
};

const ApplicationStatusTracker = ({ status, onDismiss }) => {
  const isPending = status?.toLowerCase() === "pending";
  const isApproved = status?.toLowerCase() === "approved";
  const isRejected = status?.toLowerCase() === "rejected";

  const title = isApproved ? "Account Verified" : isRejected ? "Verification Document Rejected" : "Pending Verification";
  const description = isApproved
    ? "Your account has been approved."
    : isPending
      ? "Your profile is under review by university administration"
      : "Upload a new verification document from Documents & Skills to submit your account for review again.";

  return (
    <SectionCard className="overflow-hidden relative">
      {isApproved && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
          aria-label="Dismiss verification card"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <div className="border-b border-gray-100 bg-gray-50/60 px-6 py-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isApproved ? "bg-green-100 text-green-700" : isRejected ? "bg-red-100 text-red-700" : "bg-[#FFF4E6] text-[#C76A0B]"
            }`}>
            {isApproved ? <CheckCircle className="h-5 w-5" /> : <InfoIcon />}
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-gray-900">{title}</h2>
            <p className="mt-0.5 text-xs font-medium text-gray-500">{description}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        {isPending && (
          <div className="rounded-xl border border-[#FFAD4E]/30 bg-[#FFF9F1] px-4 py-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FD761A]" />
              <div>
                <p className="text-xs font-extrabold text-gray-900">Limited access during review</p>
                <p className="mt-1 text-[11px] font-medium leading-5 text-gray-600">
                  You can view and complete your profile while verification is in progress. Internship applications unlock after approval.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-7">
          <ProgressTracker status={status} />
        </div>
      </div>
    </SectionCard>
  );
};

// ─── Personal Info ───────────────────────────────────────────────────
const PersonalInfoCard = ({
  profile,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  highlightField,
  sectionRef,
  isSaving,
}) => {
  const currentProfile = isEditing ? profile : profile;

  return (
    <SectionCard ref={sectionRef}>
      <SectionHeading
        eyebrow="Account"
        title="Personal Information"
        description={
          isEditing
            ? "Edit editable fields. Name, email, major, and university are locked after registration."
            : "Your account details visible to supervisors and admins."
        }
        action={
          !isEditing ? (
            <button
              type="button"
              onClick={onEdit}
              className="rounded-xl border border-[#1677FF]/15 bg-[#EAF3FF] px-3.5 py-2 text-xs font-bold text-[#1677FF] transition hover:bg-[#1677FF] hover:text-white"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSaving}
                className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1677FF] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#086BEA] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )
        }
      />

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 sm:grid-cols-2">
        {isEditing ? (
          <>
            <FieldInput
              label="First Name"
              value={currentProfile.firstName}
              locked
              icon={<User className="h-4 w-4" />}
              onChange={() => { }}
            />
            <FieldInput
              label="Last Name"
              value={currentProfile.lastName}
              locked
              icon={<User className="h-4 w-4" />}
              onChange={() => { }}
            />
            <FieldInput
              label="Major"
              value={currentProfile.major}
              locked
              icon={<BookOpen className="h-4 w-4" />}
              onChange={() => { }}
            />
            <FieldInput
              label="University"
              value={currentProfile.university}
              locked
              icon={<Building2 className="h-4 w-4" />}
              onChange={() => { }}
            />
            <FieldInput
              label="Email"
              value={currentProfile.email}
              locked
              icon={<Mail className="h-4 w-4" />}
              onChange={() => { }}
            />
            <FieldInput
              label="Student Number"
              value={currentProfile.studentNumber}
              locked
              icon={<Hash className="h-4 w-4" />}
              onChange={() => { }}
            />
            <FieldInput
              label="Company"
              value={currentProfile.company || "Not enrolled yet"}
              locked
              icon={<Building className="h-4 w-4" />}
              onChange={() => { }}
            />

            <FieldInput
              label="Recovery Email"
              type="email"
              value={currentProfile.recoveryEmail}
              onChange={(e) => onChange("recoveryEmail", e.target.value)}
              placeholder="Backup email address"
              icon={<Mail className="h-4 w-4" />}
            />
            <FieldInput
              label="Phone"
              value={currentProfile.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+970 5XX XXX XXX"
              icon={<Phone className="h-4 w-4" />}
            />
            <FieldInput
              label="GPA (optional)"
              value={currentProfile.gpa}
              onChange={(e) => onChange("gpa", e.target.value)}
              placeholder="e.g. 3.75"
              icon={<Award className="h-4 w-4" />}
            />
          </>
        ) : (
          <>
            <FieldDisplay
              label="First Name"
              value={currentProfile.firstName}
              locked
              icon={<User className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="Last Name"
              value={currentProfile.lastName}
              locked
              icon={<User className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="Major"
              value={currentProfile.major}
              locked
              icon={<BookOpen className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="University"
              value={currentProfile.university}
              locked
              icon={<Building2 className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="Email"
              value={currentProfile.email}
              locked
              icon={<Mail className="mr-2 h-4 w-4 shrink-0 text-[#1677FF]" />}
            />
            <FieldDisplay
              label="Recovery Email"
              value={currentProfile.recoveryEmail}
              placeholder="Add a recovery email for account security"
              icon={<Mail className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
              highlight={highlightField === "recoveryEmail"}
            />
            <FieldDisplay
              label="Phone"
              value={currentProfile.phone}
              placeholder="Add your phone number"
              icon={<Phone className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="Student Number"
              value={currentProfile.studentNumber}
              placeholder="From registration"
              locked
              icon={<Hash className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="GPA (optional)"
              value={currentProfile.gpa}
              placeholder="Enter your GPA"
              icon={<Award className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
            <FieldDisplay
              label="Company"
              value={currentProfile.company || "Not enrolled yet"}
              placeholder="You are not enrolled yet"
              locked
              icon={<Building className="mr-2 h-4 w-4 shrink-0 text-gray-400" />}
            />
          </>
        )}
      </div>
    </SectionCard>
  );
};

// ─── Documents ───────────────────────────────────────────────────────
const DocumentsCard = ({
  profile,
  onCvUpload,
  isCvUploading,
  cvProgress,
  onRemoveCv,
  isCvRemoving,
  onVerificationDocumentUpload,
  isVerificationDocumentUploading,
  onViewDocument,
  onRemoveVerificationDocument,
}) => {
  const cvInputRef = useRef(null);
  const verificationDocumentInputRef = useRef(null);
  const isRejected = profile.verificationStatus?.toLowerCase() === "rejected";
  const [showCvDeleteConfirm, setShowCvDeleteConfirm] = useState(false);

  return (
    <SectionCard className="h-full">
      <SectionHeading
        eyebrow="Files"
        title="Documents"
        description="Files shared with internship supervisors upon application."
      />

      <div className="space-y-3 p-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isCvUploading && cvInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !isCvUploading && cvInputRef.current?.click()}
          className={`group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${isCvUploading
            ? "border-[#1677FF] bg-[#EAF3FF]/80"
            : profile.hasCv
              ? "border-[#1677FF]/20 bg-[#EAF3FF]/60"
              : "border-dashed border-gray-200 bg-gray-50/50 hover:border-[#1677FF]/40 hover:bg-[#EAF3FF]/40"
            }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCvUploading
                ? "bg-[#1677FF] text-white"
                : profile.hasCv
                  ? "bg-[#1677FF]/10"
                  : "bg-gray-100"
                }`}
            >
              {isCvUploading ? (
                <CircleProgress percentage={cvProgress} size={36} />
              ) : (
                <FileText
                  className={`h-5 w-5 ${profile.hasCv ? "text-[#1677FF]" : "text-gray-400"
                    }`}
                />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-gray-800">
                {isCvUploading ? "Uploading CV..." : "CV / Resume"}
              </span>
              <p className="truncate text-[10px] font-medium text-gray-500">
                {isCvUploading
                  ? `${Math.round(cvProgress)}% uploaded`
                  : profile.hasCv
                    ? `${profile.cvUrl || "resume.pdf"} · Uploaded`
                    : "PDF or DOC · Drag or click to upload"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {profile.hasCv && !isCvUploading && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDocument(profile.cvUrl, "CV");
                  }}
                  className="rounded p-1.5 text-[#1677FF] transition hover:bg-white/80"
                  aria-label="View CV"
                  title="View CV"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCvDeleteConfirm(true);
                  }}
                  disabled={isCvRemoving}
                  className="rounded p-1.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Remove CV"
                  title="Remove CV"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
            {!isCvUploading && !profile.hasCv && (
              <Upload className="h-4 w-4 text-gray-400" />
            )}
          </div>

          <input
            ref={cvInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={onCvUpload}
          />
        </div>

        {/* ── CV Delete Confirmation Dialog ─────────────────────────── */}
        {showCvDeleteConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(17, 24, 39, 0.45)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowCvDeleteConfirm(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>

              {/* Text */}
              <h3 className="text-center text-[15px] font-extrabold tracking-tight text-gray-900">
                Delete your CV?
              </h3>
              <p className="mt-1.5 text-center text-[12px] leading-5 text-gray-500">
                Are you sure you want to remove your uploaded CV? You can always upload a new one later.
              </p>

              {/* Actions */}
              <div className="mt-5 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCvDeleteConfirm(false)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCvDeleteConfirm(false);
                    onRemoveCv();
                  }}
                  disabled={isCvRemoving}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-xs font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCvRemoving ? "Removing…" : "Yes, delete it"}
                </button>
              </div>
            </div>
          </div>
        )}


        <div
          className={`rounded-xl border p-4 ${isRejected ? "border-red-200 bg-red-50/50" : "border-gray-100 bg-gray-50"
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isRejected ? "bg-red-100" : "bg-[#FFF4E6]"
                  }`}
              >
                <FileText
                  className={`h-5 w-5 ${isRejected ? "text-red-600" : "text-[#C76A0B]"
                    }`}
                />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-medium text-gray-700">
                  Verification Document
                </span>
                <p className="truncate text-[10px] font-medium text-gray-500">
                  {isVerificationDocumentUploading
                    ? "Uploading replacement document..."
                    : isRejected
                      ? "Your document was rejected. Upload a new one to resubmit it for review."
                      : profile.hasVerificationDoc
                        ? "Submitted"
                        : "Not submitted"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {profile.hasVerificationDoc && !isVerificationDocumentUploading && (
                <button
                  type="button"
                  onClick={() =>
                    onViewDocument(profile.verificationDocument, "verification document")
                  }
                  className="rounded p-1.5 text-[#C76A0B] transition hover:bg-white/80"
                  aria-label="View verification document"
                  title="View verification document"
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
              {onRemoveVerificationDocument && profile.hasVerificationDoc && (
                <button
                  type="button"
                  onClick={onRemoveVerificationDocument}
                  className="rounded p-1.5 text-red-500 transition hover:bg-red-50"
                  aria-label="Remove verification document"
                  title="Remove verification document"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap ${profile.verificationStatus?.toLowerCase() === "approved"
                  ? "bg-green-100 text-green-700"
                  : isRejected
                    ? "bg-red-100 text-red-700"
                    : "border border-[#FFAD4E]/30 bg-[#FFF4E6] text-[#C76A0B]"
                  }`}
              >
                {profile.verificationStatus?.toLowerCase() === "approved"
                  ? "Approved"
                  : isRejected
                    ? "Rejected"
                    : "Under Review"}
              </span>
            </div>
          </div>

          {isRejected && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => verificationDocumentInputRef.current?.click()}
                disabled={isVerificationDocumentUploading}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#086BEA] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Upload className="h-3.5 w-3.5" />
                {isVerificationDocumentUploading ? "Uploading..." : "Upload new document"}
              </button>
              <input
                ref={verificationDocumentInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={onVerificationDocumentUpload}
              />
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

// ─── Skills ──────────────────────────────────────────────────────────
const SkillsCard = ({ skills, newSkill, onNewSkillChange, onAddSkill, onRemoveSkill }) => {
  const skillCount = (skills || []).length;
  const isRequiredMet = skillCount >= 3;

  return (
    <SectionCard className="h-full">
      <SectionHeading
        eyebrow="Matching"
        title={
          <span className="flex items-center gap-1.5">
            Skills
            <span className="text-red-500 text-sm font-bold">*</span>
            <span className={`ml-2 text-[10px] font-medium ${isRequiredMet ? 'text-emerald-600' : 'text-red-500'}`}>
              {isRequiredMet ? '✓ Required met' : `${skillCount}/3 required`}
            </span>
          </span>
        }
        description="Add at least 3 skills to help employers match you with relevant internships."
        action={
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${isRequiredMet ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {skillCount} added
          </span>
        }
      />

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {(skills || []).map((skill) => (
            <span
              key={skill}
              className="group inline-flex items-center gap-1 rounded-lg border border-[#1677FF]/15 bg-[#EAF3FF] px-3 py-1.5 text-xs font-bold text-[#1677FF]"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="rounded-full p-0.5 opacity-60 transition hover:bg-white hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {skillCount === 0 && (
            <p className="text-xs italic text-gray-400">No skills added yet. Add at least 3 to improve matching.</p>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => onNewSkillChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddSkill())}
            placeholder="e.g. TypeScript, Figma, Python..."
            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-medium placeholder-gray-400 focus:border-[#1677FF] focus:outline-none focus:ring-2 focus:ring-[#1677FF]/10"
          />
          <button
            type="button"
            onClick={onAddSkill}
            disabled={!newSkill.trim()}
            className="inline-flex items-center gap-1 rounded-xl bg-[#1677FF] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#086BEA] transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        {!isRequiredMet && skillCount > 0 && (
          <p className="mt-3 text-xs text-orange-600 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            You need {3 - skillCount} more skill{3 - skillCount > 1 ? 's' : ''} to meet the minimum requirement.
          </p>
        )}
      </div>
    </SectionCard>
  );
};

// ─── Completion Checklist ───────────────────────────────────────────
const CompletionChecklist = ({ completion, onItemClick }) => {
  const percentage = completion.percentage || 0;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <SectionCard className="overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50/60 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1677FF]">
              Profile setup
            </p>
            <h3 className="mt-0.5 text-sm font-extrabold text-gray-900">
              Profile Completion
            </h3>
          </div>

          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg className="h-20 w-20 -rotate-90 transform">
              <circle
                className="text-gray-200"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="40"
                cy="40"
              />
              <circle
                className="text-[#1677FF] transition-all duration-700 ease-out"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="40"
                cy="40"
              />
            </svg>
            <span className="absolute text-base font-extrabold text-[#1677FF]">
              {percentage}%
            </span>
          </div>
        </div>
        <p className="mt-2 text-[10px] font-medium leading-4 text-gray-500">
          Complete your profile to unlock internship recommendations
        </p>
      </div>

      <ul className="space-y-1.5 p-4">
        {(completion.checks || []).map((item) => (
          <li key={item.key}>
            <button
              type="button"
              onClick={() => !item.done && onItemClick(item)}
              disabled={item.done}
              className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${item.done ? "cursor-default" : "cursor-pointer hover:bg-[#EAF3FF]"
                }`}
            >
              {item.done ? (
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-gray-300" />
              )}
              <span className={`text-[11px] font-semibold ${item.done ? "text-emerald-700" : "text-gray-600"}`}>
                {item.label}
                {item.optional && <span className="ml-1 font-normal text-gray-400">(optional)</span>}
              </span>
              {!item.done && <ChevronRight className="ml-auto h-3.5 w-3.5 text-gray-400" />}
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-4 mb-4 rounded-xl border border-[#FFAD4E]/25 bg-[#FFF9F1] p-3">
        <div className="flex gap-2">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C76A0B]" />
          <p className="text-[10px] font-semibold leading-4 text-gray-600">
            {completion.percentage === 100
              ? "Your profile is complete!"
              : `${completion.nextAction?.label || "Complete your profile"}`}
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

// ─── Profile Preview ─────────────────────────────────────────────────
const ProfilePreviewCard = ({ profile }) => (
  <SectionCard>
    <SectionHeading
      eyebrow="Visibility"
      title="How supervisors see you"
      description="A preview of the information employers and supervisors can use."
      action={<Eye className="h-4 w-4 text-[#1677FF]" />}
    />
    <div className="p-5">
      <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF] text-sm font-extrabold text-[#1677FF]">
            {profile.firstName?.[0] || ""}{profile.lastName?.[0] || ""}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-gray-900">{profile.firstName} {profile.lastName}</p>
            <p className="truncate text-[11px] font-medium text-gray-500">{profile.major}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(profile.skills || []).slice(0, 4).map((s) => (
            <span key={s} className="rounded-md border border-[#1677FF]/10 bg-white px-2 py-1 text-[10px] font-bold text-[#1677FF]">
              {s}
            </span>
          ))}
          {(profile.skills || []).length > 4 && (
            <span className="px-1 py-1 text-[10px] font-medium text-gray-400">+{(profile.skills || []).length - 4} more</span>
          )}
        </div>
      </div>
    </div>
  </SectionCard>
);

// ─── Main Component ──────────────────────────────────────────────────
const StudentProfile = () => {
  const getToastType = (status) => {
    if (status === 401) return 'auth';
    if (status === 400) return 'validation';
    if (status >= 500) return 'error';
    return 'error';
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState(() => buildInitialProfile(user));
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [newSkill, setNewSkill] = useState("");
  const [highlightField, setHighlightField] = useState(null);

  const [avatarProgress, setAvatarProgress] = useState(0);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [cvProgress, setCvProgress] = useState(0);
  const [isCvUploading, setIsCvUploading] = useState(false);
  const [isCvRemoving, setIsCvRemoving] = useState(false);
  const [isVerificationDocumentUploading, setIsVerificationDocumentUploading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const personalRef = useRef(null);
  const documentsRef = useRef(null);
  const skillsRef = useRef(null);
  const avatarInputRef = useRef(null);

  const completion = useMemo(() => computeCompletion(profile), [profile]);

  const studentUser = useMemo(
    () => ({
      name: `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student",
      role: "Student",
      avatar: profile.avatar,
    }),
    [profile]
  );

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // ─── Load profile ──────────────────────────────────────────────────
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const response = await profileAPI.getProfile();
        const normalized = normalizeProfileResponse(response, profile);
        if (normalized.university && typeof normalized.university === 'object') {
          normalized.university = normalized.university.name || '';
        }
        setProfile(normalized);
      } catch (error) {
        console.error("Failed to load profile:", error);
        showToast(
          error?.message || "Failed to load profile.",
          getToastType(error?.status || 500)
        );
      } finally {
        setIsLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

  // ─── Registration success toast ──────────────────────────────────
  useEffect(() => {
    if (location.state?.registrationSuccess) {
      showToast(
        location.state.message || "Your account is pending verification.",
        "success",
        6000
      );
    }
  }, [location.state, showToast]);

  // ─── Avatar Upload ──────────────────────────────────────────────────
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Photo must be under 5MB.", "error");
      return;
    }

    setIsAvatarUploading(true);
    setAvatarProgress(0);

    try {
      await new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve();
          }
          setAvatarProgress(Math.min(progress, 100));
        }, 200);
      });

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

      const response = await profileAPI.updateProfile({ profileImage: base64 });
      setAvatarProgress(100);

      const normalized = normalizeProfileResponse(response, profile);
      if (normalized.university && typeof normalized.university === 'object') {
        normalized.university = normalized.university.name || '';
      }
      setProfile(normalized);
      setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
      showToast("Profile photo updated.", "success");
    } catch (error) {
      console.error("Avatar upload error:", error);
      showToast("Failed to upload photo.", "error");
    } finally {
      setIsAvatarUploading(false);
      setAvatarProgress(0);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  // ─── Delete Profile Image ────────────────────────────────────────────────────
  const handleDeleteAvatar = async () => {
    if (!profile.avatar) return;

    setIsAvatarUploading(true);
    setAvatarProgress(50);

    try {
      const response = await profileAPI.updateProfile({ profileImage: null });
      setAvatarProgress(100);

      const normalized = normalizeProfileResponse(response, profile);
      if (normalized.university && typeof normalized.university === 'object') {
        normalized.university = normalized.university.name || '';
      }
      setProfile({ ...normalized, avatar: null });
      setDraft((prev) => (prev ? { ...prev, avatar: null } : prev));
      showToast("Profile photo removed.", "success");
    } catch (error) {
      console.error("Delete avatar error:", error);
      showToast("Failed to remove photo.", "error");
    } finally {
      setIsAvatarUploading(false);
      setAvatarProgress(0);
    }
  };

  // ─── CV Upload ──────────────────────────────────────────────────────
  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("CV must be under 5MB.", "error");
      return;
    }

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      showToast("Please upload a PDF, DOC, or DOCX CV.", "error");
      e.target.value = "";
      return;
    }

    setIsCvUploading(true);
    setCvProgress(0);

    try {
      const response = await profileAPI.uploadCV(file, setCvProgress);

      const normalized = normalizeProfileResponse(response, profile);
      if (normalized.university && typeof normalized.university === 'object') {
        normalized.university = normalized.university.name || '';
      }
      setProfile(normalized);
      setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
      showToast("CV uploaded.", "success");
    } catch (error) {
      console.error("CV upload error:", error);
      showToast("Failed to upload CV.", "error");
    } finally {
      setIsCvUploading(false);
      setCvProgress(0);
      const input = e.target;
      if (input) input.value = '';
    }
  };

  const handleRemoveCv = async () => {
    // Optimistic update — clear CV from UI immediately
    const previousProfile = profile;
    setProfile((prev) => ({ ...prev, hasCv: false, cvUrl: null }));
    setDraft((prev) => (prev ? { ...prev, hasCv: false, cvUrl: null } : prev));
    setIsCvRemoving(true);

    try {
      await profileAPI.removeCV();
      showToast("CV removed.", "success");
    } catch (error) {
      // Revert UI on failure
      console.error("CV removal error:", error);
      setProfile(previousProfile);
      setDraft((prev) => (prev ? { ...prev, ...previousProfile } : prev));
      showToast(error?.message || "Failed to remove CV.", "error");
    } finally {
      setIsCvRemoving(false);
    }
  };

  // ─── Verification Document Re-upload ────────────────────────────────
  const handleVerificationDocumentUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Verification document must be under 5MB.", "error");
      e.target.value = "";
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      showToast("Please upload a JPG, PNG, or PDF verification document.", "error");
      e.target.value = "";
      return;
    }

    setIsVerificationDocumentUploading(true);

    try {
      const response = await profileAPI.reuploadVerificationDocument(file);
      const normalized = normalizeProfileResponse(response, profile);
      if (normalized.university && typeof normalized.university === "object") {
        normalized.university = normalized.university.name || "";
      }
      setProfile(normalized);
      setDraft((prev) => (prev ? { ...prev, ...normalized } : prev));
      showToast("Verification document submitted. Your account is now pending review.", "success");
    } catch (error) {
      console.error("Verification document re-upload error:", error);
      showToast(error?.message || "Failed to submit verification document.", "error");
    } finally {
      setIsVerificationDocumentUploading(false);
      e.target.value = "";
    }
  };

  const handleViewDocument = async (document, label) => {
    const documentUrl = profileAPI.getDocumentUrl(document);
    if (!documentUrl) {
      showToast(`No ${label} is available to view.`, "error");
      return;
    }

    const viewer = window.open("", "_blank");
    if (!viewer) {
      showToast("Please allow pop-ups to view this document.", "error");
      return;
    }
    viewer.opener = null;

    try {
      const response = await fetch(documentUrl);
      if (!response.ok) throw new Error("Document could not be loaded.");

      const documentBlobUrl = URL.createObjectURL(await response.blob());
      viewer.location.replace(documentBlobUrl);
    } catch (error) {
      viewer.close();
      console.error(`Failed to open ${label}:`, error);
      showToast(`Unable to open this ${label}. Please try again later.`, "error");
    }
  };

  // ─── Edit / Save ────────────────────────────────────────────────────
  const handleEdit = () => {
    setDraft({ ...profile });
    setIsEditing(true);
    setActiveTab("personal");
  };

  const handleCancel = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!draft) return;

    const changes = {};
    const editableFields = ['recoveryEmail', 'phone', 'gpa'];
    editableFields.forEach(f => {
      if (draft[f] !== profile[f]) {
        changes[f] = draft[f];
      }
    });

    if (Object.prototype.hasOwnProperty.call(changes, 'gpa')) {
      const raw = changes.gpa;
      if (raw === null || raw === '') {
        changes.gpa = null;
      } else {
        const num = Number(raw);
        if (Number.isNaN(num)) {
          showToast('GPA must be a number.', 'error');
          return;
        }
        changes.gpa = num;
      }
    }

    if (Object.keys(changes).length === 0) {
      setIsEditing(false);
      setDraft(null);
      showToast("No changes to save.", "info");
      return;
    }

    setIsSaving(true);

    try {
      const response = await profileAPI.updateProfile(changes);
      const normalized = normalizeProfileResponse(response, profile);
      if (normalized.university && typeof normalized.university === 'object') {
        normalized.university = normalized.university.name || '';
      }
      setProfile(normalized);
      setDraft(null);
      setIsEditing(false);
      showToast("Profile updated successfully.", "success");
    } catch (error) {
      console.error("Update error:", error);
      showToast("Failed to update profile.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setDraft((prev) => ({ ...(prev || profile), [field]: value }));
  };

  // ─── Skills ──────────────────────────────────────────────────────────
  const handleAddSkill = async () => {
    const trimmed = newSkill.trim();
    if (!trimmed || (profile.skills || []).includes(trimmed)) return;

    try {
      await profileAPI.addSkill(trimmed);
      setProfile((prev) => ({ ...prev, skills: [...(prev.skills || []), trimmed] }));
      setNewSkill("");
      showToast("Skill added.", "success");
    } catch (error) {
      console.error("Add skill error:", error);
      showToast("Failed to add skill.", "error");
    }
  };

  const handleRemoveSkill = async (skill) => {
    try {
      await profileAPI.removeSkill(skill);
      setProfile((prev) => ({
        ...prev,
        skills: (prev.skills || []).filter((s) => s !== skill),
      }));
      showToast("Skill removed.", "success");
    } catch (error) {
      console.error("Remove skill error:", error);
      showToast("Failed to remove skill.", "error");
    }
  };

  // ─── Checklist ──────────────────────────────────────────────────────
  const handleChecklistClick = (item) => {
    const tab = item.section === "personal" ? "personal" : "documents";
    setActiveTab(tab);

    if (item.key === "recoveryEmail") {
      setHighlightField("recoveryEmail");
      setTimeout(() => setHighlightField(null), 2500);
    }

    setTimeout(() => {
      const ref =
        item.section === "personal"
          ? personalRef
          : item.key === "skills"
            ? skillsRef
            : documentsRef;
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const currentProfile = isEditing && draft ? draft : profile;

  // ─── Loading state (Skeleton) ──────────────────────────────────────
  if (isLoadingProfile) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
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
          <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
            {/* ✅ استخدم PageHeader هنا */}
            <PageHeader
              loading={isLoadingProfile}
              profile={profile}
              fullName={studentUser.name}
              studentUser={studentUser}
              chatBadge={9}
              notificationBadge={5}
            />

            <SkeletonProfileHeader />
            <SkeletonTabNav />

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="min-w-0 space-y-5">
                <SkeletonVerificationStatus />
                <SkeletonPersonalInfoCard />
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <SkeletonDocumentsCard />
                  <SkeletonSkillsCard />
                </div>
                <SkeletonProfilePreview />
              </div>

              <aside className="space-y-5">
                <SkeletonCompletionChecklist />
                <SkeletonAccountStatus />
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ─── Error / No profile ────────────────────────────────────────────
  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#1677FF] border-t-transparent" />
          <p className="mt-4 text-sm text-gray-500 font-['Inter']">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ─── Render main profile ──────────────────────────────────────────
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
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
        <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
          {/* ✅ استخدم PageHeader هنا بدلاً من الـ header القديم */}
          <PageHeader
            loading={isLoadingProfile}
            profile={profile}
            fullName={studentUser.name}
            studentUser={studentUser}
            chatBadge={9}
            notificationBadge={5}
          />

          <ProfileHeader
            profile={profile}
            completion={completion}
            onAvatarUpload={handleAvatarUpload}
            fileInputRef={avatarInputRef}
            onTabChange={setActiveTab}
            isAvatarUploading={isAvatarUploading}
            avatarProgress={avatarProgress}
            onDeleteAvatar={handleDeleteAvatar}
          />

          <TabNav activeTab={activeTab} onChange={setActiveTab} />

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 space-y-5">
              {(activeTab === "overview" || activeTab === "personal") && (
                <>
                  {activeTab === "overview" && (
                    <ApplicationStatusTracker status={profile.verificationStatus} />
                  )}
                  <PersonalInfoCard
                    profile={currentProfile}
                    isEditing={isEditing}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onChange={handleChange}
                    highlightField={highlightField}
                    sectionRef={personalRef}
                    isSaving={isSaving}
                  />
                </>
              )}

              {(activeTab === "overview" || activeTab === "documents") && (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div ref={documentsRef}>
                    <DocumentsCard
                      profile={profile}
                      onCvUpload={handleCvUpload}
                      isCvUploading={isCvUploading}
                      cvProgress={cvProgress}
                      onRemoveCv={handleRemoveCv}
                      isCvRemoving={isCvRemoving}
                      onVerificationDocumentUpload={handleVerificationDocumentUpload}
                      isVerificationDocumentUploading={isVerificationDocumentUploading}
                      onViewDocument={handleViewDocument}
                    />
                  </div>
                  <div ref={skillsRef}>
                    <SkillsCard
                      skills={profile.skills}
                      newSkill={newSkill}
                      onNewSkillChange={setNewSkill}
                      onAddSkill={handleAddSkill}
                      onRemoveSkill={handleRemoveSkill}
                    />
                  </div>
                </div>
              )}

              {activeTab === "overview" && <ProfilePreviewCard profile={profile} />}
            </div>

            <aside className="space-y-5">
              <CompletionChecklist completion={completion} onItemClick={handleChecklistClick} />

              <SectionCard className="hidden overflow-hidden xl:block">
                <div className="border-b border-gray-100 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1677FF]">Account status</p>
                  <h3 className="mt-0.5 text-sm font-extrabold text-gray-900">Verification</h3>
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${profile.verificationStatus?.toLowerCase() === "approved"
                      ? "bg-green-100 text-green-700"
                      : profile.verificationStatus?.toLowerCase() === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-[#FFF4E6] text-[#C76A0B]"
                      }`}>
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        {profile.verificationStatus?.toLowerCase() === "approved"
                          ? "Verified"
                          : profile.verificationStatus?.toLowerCase() === "rejected"
                            ? "Rejected"
                            : "Under Review"}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {profile.verificationStatus?.toLowerCase() === "approved"
                          ? "Account verified"
                          : profile.verificationStatus?.toLowerCase() === "rejected"
                            ? "Please contact support"
                            : "University administration"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Company</p>
                      <p className="text-[10px] text-gray-500">{profile.company || "You are not enrolled yet"}</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </aside>
          </div>
        </div>
      </main>

      {/* <AIAssistant /> */}
    </div>
  );
};

export default StudentProfile;