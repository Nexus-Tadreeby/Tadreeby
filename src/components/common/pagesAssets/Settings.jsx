// // src/components/pages/Settings.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     User,
//     Shield,
//     Bell,
//     Monitor,
//     Lock,
//     ChevronRight,
//     LogOut,
//     Smartphone,
//     Laptop,
//     Globe,
//     CheckCircle,
//     XCircle,
//     Clock,
//     AlertTriangle,
//     Eye,
//     EyeOff,
// } from "lucide-react";

// import { useAuth } from "../../../context/AuthContext";
// import { useToast } from "../../../context/ToastContext";
// import { profileAPI } from "../../../services/api";
// import { Button } from "../Button";
// import InfoBox from "../InfoBox";
// import AIAssistant from "./AIAssistant";
// import PageHeader from "./PageHeader";

// // ─── Design System ──────────────────────────────────────────────────────
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
//     text: "#172033",
//     muted: "#7B8497",
//     border: "#E9EDF4",
//     background: "#F5F7FB",
// };

// const getInitials = (name) => {
//     if (!name) return "U";
//     return name
//         .split(" ")
//         .map((word) => word[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase();
// };

// // ─── Settings Sidebar ───────────────────────────────────────────────────
// const SettingsSidebar = ({ activeTab, onTabChange }) => {
//     const tabs = [
//         { id: "profile", label: "Profile", icon: User },
//         { id: "security", label: "Security", icon: Shield },
//         { id: "notifications", label: "Notifications", icon: Bell },
//         { id: "sessions", label: "Sessions", icon: Monitor },
//         { id: "privacy", label: "Privacy", icon: Lock },
//     ];

//     return (
//         <aside className="w-[260px] shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-md rounded-l-2xl p-4">
//             <div className="mb-6 px-2">
//                 <h2 className="text-sm font-bold text-gray-700">Settings</h2>
//                 <p className="mt-0.5 text-xs text-gray-400">Manage your account</p>
//             </div>
//             <nav className="space-y-1">
//                 {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     const isActive = activeTab === tab.id;
//                     return (
//                         <button
//                             key={tab.id}
//                             onClick={() => onTabChange(tab.id)}
//                             className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
//                                     ? "bg-[#EAF3FF] text-[#0475FB]"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                                 }`}
//                         >
//                             <Icon size={18} className={isActive ? "text-[#0475FB]" : "text-gray-400"} />
//                             <span>{tab.label}</span>
//                             {isActive && <ChevronRight size={16} className="ml-auto text-[#0475FB]" />}
//                         </button>
//                     );
//                 })}
//             </nav>
//         </aside>
//     );
// };

// // ─── Profile Tab ───────────────────────────────────────────────────────
// const ProfileTab = ({ user, profile, onUpdate }) => {
//     const [form, setForm] = useState({
//         firstName: profile?.firstName || user?.firstName || "",
//         lastName: profile?.lastName || user?.lastName || "",
//         email: profile?.email || user?.email || "",
//         phone: profile?.phone || user?.phone || "",
//         recoveryEmail: profile?.recoveryEmail || user?.recoveryEmail || "",
//     });
//     const [isSaving, setIsSaving] = useState(false);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);
//         try {
//             const response = await profileAPI.updateProfile(form);
//             // onUpdate(response);
//             // showToast("Profile updated successfully.", "success");
//         } catch (error) {
//             console.error("Update failed", error);
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold text-gray-900">Profile</h2>
//             <p className="mt-1 text-sm text-gray-500">Update your personal information</p>

//             <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                         <label className="block text-xs font-medium text-gray-600">First Name</label>
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={form.firstName}
//                             onChange={handleChange}
//                             className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-xs font-medium text-gray-600">Last Name</label>
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={form.lastName}
//                             onChange={handleChange}
//                             className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-600">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         disabled
//                         className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 outline-none cursor-not-allowed"
//                     />
//                     <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-600">Phone</label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={form.phone}
//                         onChange={handleChange}
//                         placeholder="+970 5XX XXX XXX"
//                         className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-600">Recovery Email</label>
//                     <input
//                         type="email"
//                         name="recoveryEmail"
//                         value={form.recoveryEmail}
//                         onChange={handleChange}
//                         placeholder="Backup email address"
//                         className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                     />
//                 </div>

//                 <div className="flex items-center gap-3 pt-2">
//                     <Button
//                         type="submit"
//                         variant="primary"
//                         disabled={isSaving}
//                         className="px-6 py-2.5 text-sm"
//                     >
//                         {isSaving ? "Saving..." : "Save Changes"}
//                     </Button>
//                     <Button
//                         type="button"
//                         variant="secondary"
//                         className="px-6 py-2.5 text-sm"
//                         onClick={() => {
//                             setForm({
//                                 firstName: profile?.firstName || user?.firstName || "",
//                                 lastName: profile?.lastName || user?.lastName || "",
//                                 email: profile?.email || user?.email || "",
//                                 phone: profile?.phone || user?.phone || "",
//                                 recoveryEmail: profile?.recoveryEmail || user?.recoveryEmail || "",
//                             });
//                         }}
//                     >
//                         Reset
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// // ─── Security Tab ─────────────────────────────────────────────────────
// const SecurityTab = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [isChanging, setIsChanging] = useState(false);

//     const handleChangePassword = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }
//         setIsChanging(true);
//         try {
//             // API call to change password
//             // await authAPI.changePassword({ currentPassword, newPassword });
//             alert("Password changed successfully");
//             setCurrentPassword("");
//             setNewPassword("");
//             setConfirmPassword("");
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setIsChanging(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold text-gray-900">Security</h2>
//             <p className="mt-1 text-sm text-gray-500">Manage your password and security settings</p>

//             <div className="mt-6">
//                 <h3 className="text-sm font-semibold text-gray-800">Change Password</h3>
//                 <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
//                     <div>
//                         <label className="block text-xs font-medium text-gray-600">Current Password</label>
//                         <div className="relative mt-1.5">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 value={currentPassword}
//                                 onChange={(e) => setCurrentPassword(e.target.value)}
//                                 className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                             </button>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-xs font-medium text-gray-600">New Password</label>
//                         <input
//                             type="password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-xs font-medium text-gray-600">Confirm New Password</label>
//                         <input
//                             type="password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
//                             required
//                         />
//                     </div>
//                     <Button
//                         type="submit"
//                         variant="primary"
//                         disabled={isChanging}
//                         className="px-6 py-2.5 text-sm"
//                     >
//                         {isChanging ? "Updating..." : "Update Password"}
//                     </Button>
//                 </form>
//             </div>

//             <div className="mt-8 border-t border-gray-200 pt-6">
//                 <h3 className="text-sm font-semibold text-gray-800">Two-Factor Authentication</h3>
//                 <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account</p>
//                 <Button variant="secondary" className="mt-4 px-6 py-2.5 text-sm">
//                     Enable 2FA
//                 </Button>
//             </div>
//         </div>
//     );
// };

// // ─── Notifications Tab ───────────────────────────────────────────────
// const NotificationsTab = () => {
//     const [settings, setSettings] = useState({
//         email: true,
//         push: true,
//         taskUpdates: true,
//         announcements: true,
//         applicationStatus: true,
//         evaluation: false,
//     });

//     const handleToggle = (key) => {
//         setSettings({ ...settings, [key]: !settings[key] });
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
//             <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications</p>

//             <div className="mt-6 space-y-4">
//                 <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//                     <div>
//                         <p className="font-medium text-gray-800">Email Notifications</p>
//                         <p className="text-xs text-gray-500">Receive updates via email</p>
//                     </div>
//                     <button
//                         onClick={() => handleToggle("email")}
//                         className={`relative h-7 w-12 rounded-full transition-colors ${settings.email ? "bg-[#0475FB]" : "bg-gray-300"
//                             }`}
//                     >
//                         <span
//                             className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.email ? "right-1" : "left-1"
//                                 }`}
//                         />
//                     </button>
//                 </div>

//                 <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//                     <div>
//                         <p className="font-medium text-gray-800">Push Notifications</p>
//                         <p className="text-xs text-gray-500">Receive push notifications in browser</p>
//                     </div>
//                     <button
//                         onClick={() => handleToggle("push")}
//                         className={`relative h-7 w-12 rounded-full transition-colors ${settings.push ? "bg-[#0475FB]" : "bg-gray-300"
//                             }`}
//                     >
//                         <span
//                             className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.push ? "right-1" : "left-1"
//                                 }`}
//                         />
//                     </button>
//                 </div>

//                 <div className="border-t border-gray-200 pt-4">
//                     <p className="mb-3 text-sm font-medium text-gray-700">Notification types</p>
//                     <div className="space-y-3">
//                         {Object.entries(settings)
//                             .filter(([key]) => !["email", "push"].includes(key))
//                             .map(([key, value]) => (
//                                 <div key={key} className="flex items-center justify-between">
//                                     <span className="text-sm capitalize text-gray-700">
//                                         {key.replace(/([A-Z])/g, " $1").trim()}
//                                     </span>
//                                     <button
//                                         onClick={() => handleToggle(key)}
//                                         className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-[#0475FB]" : "bg-gray-300"
//                                             }`}
//                                     >
//                                         <span
//                                             className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${value ? "right-0.5" : "left-0.5"
//                                                 }`}
//                                         />
//                                     </button>
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ─── Sessions Tab ─────────────────────────────────────────────────────
// const SessionsTab = () => {
//     const [sessions, setSessions] = useState([
//         {
//             id: 1,
//             device: "Chrome on Windows",
//             location: "Gaza, Palestine",
//             ip: "192.168.1.1",
//             lastActive: "2026-08-24T14:30:00",
//             isCurrent: true,
//             browser: "Chrome",
//             os: "Windows 11",
//         },
//         {
//             id: 2,
//             device: "Safari on iPhone",
//             location: "Ramallah, Palestine",
//             ip: "192.168.1.2",
//             lastActive: "2026-08-23T22:15:00",
//             isCurrent: false,
//             browser: "Safari",
//             os: "iOS 17",
//         },
//         {
//             id: 3,
//             device: "Firefox on Mac",
//             location: "Nablus, Palestine",
//             ip: "192.168.1.3",
//             lastActive: "2026-08-22T10:00:00",
//             isCurrent: false,
//             browser: "Firefox",
//             os: "macOS 14",
//         },
//     ]);

//     const handleRevoke = (id) => {
//         if (window.confirm("Are you sure you want to revoke this session?")) {
//             setSessions(sessions.filter((s) => s.id !== id));
//         }
//     };

//     const handleRevokeAll = () => {
//         if (window.confirm("Are you sure you want to revoke all other sessions?")) {
//             setSessions(sessions.filter((s) => s.isCurrent));
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     return (
//         <div className="p-6">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-xl font-bold text-gray-900">Sessions</h2>
//                     <p className="mt-1 text-sm text-gray-500">Manage your active sessions</p>
//                 </div>
//                 {sessions.filter((s) => !s.isCurrent).length > 0 && (
//                     <Button variant="secondary" onClick={handleRevokeAll} className="px-4 py-2 text-sm">
//                         Log out all other devices
//                     </Button>
//                 )}
//             </div>

//             <div className="mt-6 space-y-4">
//                 {sessions.map((session) => (
//                     <div
//                         key={session.id}
//                         className={`rounded-xl border p-4 transition hover:shadow-md ${session.isCurrent ? "border-[#0475FB]/30 bg-[#EAF3FF]/40" : "border-gray-100 bg-white"
//                             }`}
//                     >
//                         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                             <div className="flex items-start gap-3">
//                                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
//                                     {session.os.toLowerCase().includes("windows") ? (
//                                         <Laptop size={18} />
//                                     ) : session.os.toLowerCase().includes("ios") ||
//                                         session.os.toLowerCase().includes("android") ? (
//                                         <Smartphone size={18} />
//                                     ) : (
//                                         <Monitor size={18} />
//                                     )}
//                                 </div>
//                                 <div>
//                                     <div className="flex items-center gap-2">
//                                         <p className="font-semibold text-gray-800">{session.device}</p>
//                                         {session.isCurrent && (
//                                             <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
//                                                 Current
//                                             </span>
//                                         )}
//                                     </div>
//                                     <p className="mt-0.5 text-xs text-gray-500">
//                                         {session.browser} · {session.os} · {session.location}
//                                     </p>
//                                     <p className="mt-0.5 text-xs text-gray-400">
//                                         IP: {session.ip} · Last active: {formatDate(session.lastActive)}
//                                     </p>
//                                 </div>
//                             </div>
//                             {!session.isCurrent && (
//                                 <button
//                                     onClick={() => handleRevoke(session.id)}
//                                     className="shrink-0 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
//                                 >
//                                     Revoke
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {sessions.filter((s) => !s.isCurrent).length === 0 && (
//                 <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
//                     No other active sessions.
//                 </div>
//             )}
//         </div>
//     );
// };

// // ─── Privacy Tab ──────────────────────────────────────────────────────
// const PrivacyTab = () => {
//     const [settings, setSettings] = useState({
//         profileVisibility: "public",
//         showEmail: false,
//         showPhone: false,
//         dataAnalytics: true,
//     });

//     const handleToggle = (key) => {
//         setSettings({ ...settings, [key]: !settings[key] });
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
//             <p className="mt-1 text-sm text-gray-500">Control your privacy settings</p>

//             <div className="mt-6 space-y-4">
//                 <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//                     <p className="font-medium text-gray-800">Profile Visibility</p>
//                     <select
//                         value={settings.profileVisibility}
//                         onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
//                         className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-[#0475FB] focus:ring-1 focus:ring-[#0475FB]"
//                     >
//                         <option value="public">Public</option>
//                         <option value="connections">Connections Only</option>
//                         <option value="private">Private</option>
//                     </select>
//                 </div>

//                 <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//                     <div>
//                         <p className="font-medium text-gray-800">Show Email</p>
//                         <p className="text-xs text-gray-500">Display your email on your profile</p>
//                     </div>
//                     <button
//                         onClick={() => handleToggle("showEmail")}
//                         className={`relative h-7 w-12 rounded-full transition-colors ${settings.showEmail ? "bg-[#0475FB]" : "bg-gray-300"
//                             }`}
//                     >
//                         <span
//                             className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.showEmail ? "right-1" : "left-1"
//                                 }`}
//                         />
//                     </button>
//                 </div>

//                 <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//                     <div>
//                         <p className="font-medium text-gray-800">Show Phone</p>
//                         <p className="text-xs text-gray-500">Display your phone number on your profile</p>
//                     </div>
//                     <button
//                         onClick={() => handleToggle("showPhone")}
//                         className={`relative h-7 w-12 rounded-full transition-colors ${settings.showPhone ? "bg-[#0475FB]" : "bg-gray-300"
//                             }`}
//                     >
//                         <span
//                             className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.showPhone ? "right-1" : "left-1"
//                                 }`}
//                         />
//                     </button>
//                 </div>

//                 <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
//                     <div>
//                         <p className="font-medium text-gray-800">Data Analytics</p>
//                         <p className="text-xs text-gray-500">Allow us to collect anonymous usage data</p>
//                     </div>
//                     <button
//                         onClick={() => handleToggle("dataAnalytics")}
//                         className={`relative h-7 w-12 rounded-full transition-colors ${settings.dataAnalytics ? "bg-[#0475FB]" : "bg-gray-300"
//                             }`}
//                     >
//                         <span
//                             className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.dataAnalytics ? "right-1" : "left-1"
//                                 }`}
//                         />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ─── Main Component ──────────────────────────────────────────────────
// const Settings = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useAuth();
//     const [activeTab, setActiveTab] = useState("profile");
//     const [profile, setProfile] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await profileAPI.getProfile();
//                 const data = response?.data ?? response;
//                 setProfile(data);
//             } catch (error) {
//                 console.error("Failed to load profile", error);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const fullName = profile
//         ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
//         : `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";

//     const studentUser = {
//         name: fullName,
//         role: user?.role || "User",
//         avatar: profile?.avatar || user?.profileImage || "",
//     };

//     const handleSignOut = () => {
//         logout();
//         navigate("/login");
//     };

//     // Render the settings page with a sidebar (without the student sidebar)
//     return (
//         <div className="min-h-screen bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
//             {/* Decorative orbs */}
//             <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
//             <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
//             <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

//             <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
//                 <PageHeader
//                     loading={false}
//                     profile={profile}
//                     fullName={fullName}
//                     studentUser={studentUser}
//                     chatBadge={0}
//                     notificationBadge={0}
//                 />

//                 <div className="mt-5 flex h-[calc(100vh-180px)] min-h-[500px] overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
//                     <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

//                     <div className="flex-1 overflow-y-auto">
//                         {activeTab === "profile" && <ProfileTab user={user} profile={profile} />}
//                         {activeTab === "security" && <SecurityTab />}
//                         {activeTab === "notifications" && <NotificationsTab />}
//                         {activeTab === "sessions" && <SessionsTab />}
//                         {activeTab === "privacy" && <PrivacyTab />}

//                         <div className="border-t border-gray-100 p-6">
//                             <Button
//                                 variant="secondary"
//                                 className="text-red-600 hover:bg-red-50 hover:text-red-700"
//                                 onClick={handleSignOut}
//                                 icon={<LogOut size={16} />}
//                             >
//                                 Sign Out
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <AIAssistant />
//         </div>
//     );
// };

// export default Settings;




// src/components/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Shield,
    Bell,
    Monitor,
    Lock,
    ChevronRight,
    LogOut,
    Smartphone,
    Laptop,
    Eye,
    EyeOff,
    LayoutDashboard,
    Search,
    BriefcaseBusiness,
    Clock3,
    ListTodo,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { profileAPI } from "../../../services/api";
import { Button } from "../Button";
import AIAssistant from "./AIAssistant";
import PageHeader from "./PageHeader";
import Sidebar from "../../layout/Sidebar";
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
    text: "#172033",
    muted: "#7B8497",
    border: "#E9EDF4",
    background: "#F5F7FB",
};

const getInitials = (name) => {
    if (!name) return "U";
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

// ─── Settings Sidebar (sub‑navigation) ──────────────────────────────
const SettingsSidebar = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "sessions", label: "Sessions", icon: Monitor },
        { id: "privacy", label: "Privacy", icon: Lock },
    ];

    return (
        <aside className="w-[260px] shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-md rounded-l-2xl p-4">
            <div className="mb-6 px-2">
                <h2 className="text-sm font-bold text-gray-700">Settings</h2>
                <p className="mt-0.5 text-xs text-gray-400">Manage your account</p>
            </div>
            <nav className="space-y-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                    ? "bg-[#EAF3FF] text-[#0475FB]"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-[#0475FB]" : "text-gray-400"} />
                            <span>{tab.label}</span>
                            {isActive && <ChevronRight size={16} className="ml-auto text-[#0475FB]" />}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

// ─── Profile Tab ──────────────────────────────────────────────────────
const ProfileTab = ({ user, profile }) => {
    const [form, setForm] = useState({
        firstName: profile?.firstName || user?.firstName || "",
        lastName: profile?.lastName || user?.lastName || "",
        email: profile?.email || user?.email || "",
        phone: profile?.phone || user?.phone || "",
        recoveryEmail: profile?.recoveryEmail || user?.recoveryEmail || "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await profileAPI.updateProfile(form);
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-500">Update your personal information</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-xs font-medium text-gray-600">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        disabled
                        className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 outline-none cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+970 5XX XXX XXX"
                        className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600">Recovery Email</label>
                    <input
                        type="email"
                        name="recoveryEmail"
                        value={form.recoveryEmail}
                        onChange={handleChange}
                        placeholder="Backup email address"
                        className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                    />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <Button type="submit" variant="primary" disabled={isSaving} className="px-6 py-2.5 text-sm">
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="px-6 py-2.5 text-sm"
                        onClick={() => {
                            setForm({
                                firstName: profile?.firstName || user?.firstName || "",
                                lastName: profile?.lastName || user?.lastName || "",
                                email: profile?.email || user?.email || "",
                                phone: profile?.phone || user?.phone || "",
                                recoveryEmail: profile?.recoveryEmail || user?.recoveryEmail || "",
                            });
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
};

// ─── Security Tab ────────────────────────────────────────────────────
const SecurityTab = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChanging, setIsChanging] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setIsChanging(true);
        try {
            alert("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
        } finally {
            setIsChanging(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your password and security settings</p>

            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-800">Change Password</h3>
                <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Current Password</label>
                        <div className="relative mt-1.5">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#0475FB] focus:bg-white focus:ring-1 focus:ring-[#0475FB]"
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary" disabled={isChanging} className="px-6 py-2.5 text-sm">
                        {isChanging ? "Updating..." : "Update Password"}
                    </Button>
                </form>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-800">Two-Factor Authentication</h3>
                <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account</p>
                <Button variant="secondary" className="mt-4 px-6 py-2.5 text-sm">
                    Enable 2FA
                </Button>
            </div>
        </div>
    );
};

// ─── Notifications Tab ──────────────────────────────────────────────
const NotificationsTab = () => {
    const [settings, setSettings] = useState({
        email: true,
        push: true,
        taskUpdates: true,
        announcements: true,
        applicationStatus: true,
        evaluation: false,
    });

    const handleToggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications</p>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                    <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive updates via email</p>
                    </div>
                    <button
                        onClick={() => handleToggle("email")}
                        className={`relative h-7 w-12 rounded-full transition-colors ${settings.email ? "bg-[#0475FB]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.email ? "right-1" : "left-1"
                                }`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                    <div>
                        <p className="font-medium text-gray-800">Push Notifications</p>
                        <p className="text-xs text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <button
                        onClick={() => handleToggle("push")}
                        className={`relative h-7 w-12 rounded-full transition-colors ${settings.push ? "bg-[#0475FB]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.push ? "right-1" : "left-1"
                                }`}
                        />
                    </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <p className="mb-3 text-sm font-medium text-gray-700">Notification types</p>
                    <div className="space-y-3">
                        {Object.entries(settings)
                            .filter(([key]) => !["email", "push"].includes(key))
                            .map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm capitalize text-gray-700">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                    <button
                                        onClick={() => handleToggle(key)}
                                        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-[#0475FB]" : "bg-gray-300"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${value ? "right-0.5" : "left-0.5"
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Sessions Tab ────────────────────────────────────────────────────
const SessionsTab = () => {
    const [sessions, setSessions] = useState([
        {
            id: 1,
            device: "Chrome on Windows",
            location: "Gaza, Palestine",
            ip: "192.168.1.1",
            lastActive: "2026-08-24T14:30:00",
            isCurrent: true,
            browser: "Chrome",
            os: "Windows 11",
        },
        {
            id: 2,
            device: "Safari on iPhone",
            location: "Ramallah, Palestine",
            ip: "192.168.1.2",
            lastActive: "2026-08-23T22:15:00",
            isCurrent: false,
            browser: "Safari",
            os: "iOS 17",
        },
        {
            id: 3,
            device: "Firefox on Mac",
            location: "Nablus, Palestine",
            ip: "192.168.1.3",
            lastActive: "2026-08-22T10:00:00",
            isCurrent: false,
            browser: "Firefox",
            os: "macOS 14",
        },
    ]);

    const handleRevoke = (id) => {
        if (window.confirm("Are you sure you want to revoke this session?")) {
            setSessions(sessions.filter((s) => s.id !== id));
        }
    };

    const handleRevokeAll = () => {
        if (window.confirm("Are you sure you want to revoke all other sessions?")) {
            setSessions(sessions.filter((s) => s.isCurrent));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Sessions</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage your active sessions</p>
                </div>
                {sessions.filter((s) => !s.isCurrent).length > 0 && (
                    <Button variant="secondary" onClick={handleRevokeAll} className="px-4 py-2 text-sm">
                        Log out all other devices
                    </Button>
                )}
            </div>

            <div className="mt-6 space-y-4">
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        className={`rounded-xl border p-4 transition hover:shadow-md ${session.isCurrent
                                ? "border-[#0475FB]/30 bg-[#EAF3FF]/40"
                                : "border-gray-100 bg-white"
                            }`}
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                    {session.os.toLowerCase().includes("windows") ? (
                                        <Laptop size={18} />
                                    ) : session.os.toLowerCase().includes("ios") ||
                                        session.os.toLowerCase().includes("android") ? (
                                        <Smartphone size={18} />
                                    ) : (
                                        <Monitor size={18} />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-800">{session.device}</p>
                                        {session.isCurrent && (
                                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {session.browser} · {session.os} · {session.location}
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        IP: {session.ip} · Last active: {formatDate(session.lastActive)}
                                    </p>
                                </div>
                            </div>
                            {!session.isCurrent && (
                                <button
                                    onClick={() => handleRevoke(session.id)}
                                    className="shrink-0 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                >
                                    Revoke
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {sessions.filter((s) => !s.isCurrent).length === 0 && (
                <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
                    No other active sessions.
                </div>
            )}
        </div>
    );
};

// ─── Privacy Tab ─────────────────────────────────────────────────────
const PrivacyTab = () => {
    const [settings, setSettings] = useState({
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
        dataAnalytics: true,
    });

    const handleToggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
            <p className="mt-1 text-sm text-gray-500">Control your privacy settings</p>

            <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                    <p className="font-medium text-gray-800">Profile Visibility</p>
                    <select
                        value={settings.profileVisibility}
                        onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-[#0475FB] focus:ring-1 focus:ring-[#0475FB]"
                    >
                        <option value="public">Public</option>
                        <option value="connections">Connections Only</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                    <div>
                        <p className="font-medium text-gray-800">Show Email</p>
                        <p className="text-xs text-gray-500">Display your email on your profile</p>
                    </div>
                    <button
                        onClick={() => handleToggle("showEmail")}
                        className={`relative h-7 w-12 rounded-full transition-colors ${settings.showEmail ? "bg-[#0475FB]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.showEmail ? "right-1" : "left-1"
                                }`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                    <div>
                        <p className="font-medium text-gray-800">Show Phone</p>
                        <p className="text-xs text-gray-500">Display your phone number on your profile</p>
                    </div>
                    <button
                        onClick={() => handleToggle("showPhone")}
                        className={`relative h-7 w-12 rounded-full transition-colors ${settings.showPhone ? "bg-[#0475FB]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.showPhone ? "right-1" : "left-1"
                                }`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                    <div>
                        <p className="font-medium text-gray-800">Data Analytics</p>
                        <p className="text-xs text-gray-500">Allow us to collect anonymous usage data</p>
                    </div>
                    <button
                        onClick={() => handleToggle("dataAnalytics")}
                        className={`relative h-7 w-12 rounded-full transition-colors ${settings.dataAnalytics ? "bg-[#0475FB]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${settings.dataAnalytics ? "right-1" : "left-1"
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────────────
const Settings = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileAPI.getProfile();
                const data = response?.data ?? response;
                setProfile(data);
            } catch (error) {
                console.error("Failed to load profile", error);
            }
        };
        fetchProfile();
    }, []);

    const fullName = profile
        ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
        : `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";

    const studentUser = {
        name: fullName,
        role: user?.role || "User",
        avatar: profile?.avatar || user?.profileImage || "",
    };

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    const discoveryItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
        { label: "Opportunities", icon: Search, path: "/student/opportunities" },
    ];

    const managementItems = [
        { label: "My Internship", icon: BriefcaseBusiness, path: "/student/my-internship" },
        { label: "Attendance", icon: Clock3, path: "/attendance" },
        { label: "Tasks", icon: ListTodo, path: "/tasks" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] flex">
            <Sidebar
                discoveryItems={discoveryItems}
                managementItems={managementItems}
                user={{
                    name: fullName,
                    role: user?.role || "Student",
                    avatar: studentUser.avatar,
                }}
                profilePath="/student/profile"
                chatPath="/student/chats"
                settingsPath="/settings"
                onSignOut={handleSignOut}
                chatAvatars={[]}
                unreadCount={0}
            />

            <div className="flex-1 flex flex-col min-h-screen">
                <div className="relative flex-1 overflow-y-auto">
                    <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-5 sm:px-8 sm:py-7">
                        <PageHeader
                            loading={false}
                            profile={profile}
                            fullName={fullName}
                            studentUser={studentUser}
                            chatBadge={0}
                            notificationBadge={0}
                            onLogout={handleSignOut}
                        />

                        <div className="mt-5 flex h-[calc(100vh-180px)] min-h-[500px] overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
                            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                            <div className="flex-1 overflow-y-auto">
                                {activeTab === "profile" && <ProfileTab user={user} profile={profile} />}
                                {activeTab === "security" && <SecurityTab />}
                                {activeTab === "notifications" && <NotificationsTab />}
                                {activeTab === "sessions" && <SessionsTab />}
                                {activeTab === "privacy" && <PrivacyTab />}

                                <div className="border-t border-gray-100 p-6">
                                    <Button
                                        variant="secondary"
                                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                        onClick={handleSignOut}
                                        icon={<LogOut size={16} />}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <AIAssistant /> */}
        </div>
    );
};

export default Settings;