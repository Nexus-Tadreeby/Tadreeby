// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, Bell, MessageCircle, ChevronDown } from "lucide-react";
// import {
//     SkeletonRect,
//     SkeletonCircle,
// } from "../pagesAssets/Skeleton";

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
//     if (!name) return "S";
//     return name
//         .split(" ")
//         .map((word) => word[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase();
// };

// const PageHeader = ({
//     loading = false,
//     profile = null,
//     fullName = "Student",
//     studentUser = null,
//     onSearchChange,
//     searchValue = "",
//     onNotificationClick,
//     onChatClick,
//     chatBadge = 0,
//     notificationBadge = 0,
// }) => {
//     const navigate = useNavigate();

//     const avatar = profile?.avatar || studentUser?.avatar || "";
//     const name = fullName || studentUser?.name || "Student";

//     return (
//         <div className="mb-6 flex w-full items-center justify-between gap-4">
//             {/* Search Bar */}
//             <div className="flex-1">
//                 {loading ? (
//                     <SkeletonRect className="h-11 w-full rounded-full" />
//                 ) : (
//                     <div className="relative w-full">
//                         <Search
//                             size={17}
//                             className="absolute left-4 top-1/2 -translate-y-1/2"
//                             color={COLORS.primary}
//                         />
//                         <input
//                             type="text"
//                             value={searchValue}
//                             onChange={onSearchChange}
//                             placeholder="Search tasks, internship activities..."
//                             className="h-11 w-full rounded-full border bg-white pl-11 pr-5 text-[13px] font-medium outline-none transition placeholder:text-gray-400 focus:ring-4"
//                             style={{ borderColor: COLORS.border }}
//                         />
//                     </div>
//                 )}
//             </div>

//             {/* Right side: Notifications, Chat, User */}
//             <div className="hidden lg:block shrink-0">
//                 {loading ? (
//                     <div className="flex items-center gap-3">
//                         <SkeletonCircle className="h-11 w-11" />
//                         <SkeletonCircle className="h-11 w-11" />
//                         <SkeletonCircle className="h-9 w-9" />
//                     </div>
//                 ) : (
//                     <div className="flex items-center gap-3">
//                         {/* Chat button */}
//                         <button
//                             type="button"
//                             className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
//                             style={{ borderColor: COLORS.border }}
//                             onClick={onChatClick || (() => navigate("/student/chats"))}
//                         >
//                             <MessageCircle size={18} color={COLORS.primary} />
//                             {chatBadge > 0 && (
//                                 <span
//                                     className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white"
//                                     style={{ backgroundColor: COLORS.red }}
//                                 />
//                             )}
//                         </button>

//                         {/* Notification button */}
//                         <button
//                             type="button"
//                             className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
//                             style={{ borderColor: COLORS.border }}
//                             onClick={onNotificationClick || (() => navigate("/notifications"))}
//                         >
//                             <Bell size={18} color={COLORS.primary} />
//                             {notificationBadge > 0 && (
//                                 <span
//                                     className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white"
//                                     style={{ backgroundColor: COLORS.red }}
//                                 />
//                             )}
//                         </button>

//                         {/* User profile */}
//                         <div
//                             className="flex items-center gap-2 rounded-full border bg-white py-1.5 pl-1.5 pr-3 cursor-pointer hover:bg-gray-50 transition"
//                             style={{ borderColor: COLORS.border }}
//                             onClick={() => navigate("/student/profile")}
//                         >
//                             {avatar ? (
//                                 <img
//                                     src={avatar}
//                                     alt={name}
//                                     className="h-8 w-8 rounded-full object-cover"
//                                 />
//                             ) : (
//                                 <div
//                                     className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
//                                     style={{ backgroundColor: COLORS.primary }}
//                                 >
//                                     {getInitials(name)}
//                                 </div>
//                             )}

//                             <span
//                                 className="hidden text-[12px] font-bold sm:block"
//                                 style={{ color: COLORS.text }}
//                             >
//                                 {name}
//                             </span>

//                             <ChevronDown size={14} color={COLORS.muted} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PageHeader;


// src/components/common/pagesAssets/PageHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Bell,
    MessageCircle,
    ChevronDown,
    User,
    GraduationCap,
    Settings,
    LogOut
} from "lucide-react";
import { SkeletonRect, SkeletonCircle } from "./Skeleton";

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
    if (!name) return "S";
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

const PageHeader = ({
    loading = false,
    profile = null,
    fullName = "Student",
    studentUser = null,
    onSearchChange,
    searchValue = "",
    onNotificationClick,
    onChatClick,
    chatBadge = 0,
    notificationBadge = 0,
    onLogout,
}) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const avatar = profile?.avatar || studentUser?.avatar || "";
    const name = fullName || studentUser?.name || "Student";

    // ─── Close dropdown when clicking outside ──────────────────────
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ─── Dropdown Menu Items ────────────────────────────────────────
    const menuItems = [
        {
            label: "Profile",
            icon: User,
            onClick: () => navigate("/student/profile")
        },
        {
            label: "My Internship",
            icon: GraduationCap,
            onClick: () => navigate("/student/my-internship")
        },
        {
            label: "Settings",
            icon: Settings,
            onClick: () => navigate("/settings")
        },
        {
            label: "Logout",
            icon: LogOut,
            onClick: onLogout || (() => {
                // Handle logout logic here or pass from parent
                navigate("/login");
            }),
            isDanger: true,
        },
    ];

    return (
        <div className="mb-6 flex w-full items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1">
                {loading ? (
                    <SkeletonRect className="h-11 w-full rounded-full" />
                ) : (
                    <div className="relative w-full">
                        <Search
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2"
                            color={COLORS.primary}
                        />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={onSearchChange}
                            placeholder="Search tasks, internship activities..."
                            className="h-11 w-full rounded-full border bg-white pl-11 pr-5 text-[13px] font-medium outline-none transition placeholder:text-gray-400 focus:ring-4"
                            style={{ borderColor: COLORS.border }}
                        />
                    </div>
                )}
            </div>

            {/* Right side: Notifications, Chat, User */}
            <div className="hidden lg:block">
                {loading ? (
                    <div className="flex items-center gap-3">
                        <SkeletonCircle className="h-11 w-11" />
                        <SkeletonCircle className="h-11 w-11" />
                        <SkeletonCircle className="h-9 w-9" />
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        {/* Chat button */}
                        <button
                            type="button"
                            className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                            style={{ borderColor: COLORS.border }}
                            onClick={onChatClick || (() => navigate("/student/chats"))}
                        >
                            <MessageCircle size={18} color={COLORS.primary} />
                            {chatBadge > 0 && (
                                <span
                                    className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white"
                                    style={{ backgroundColor: COLORS.red }}
                                />
                            )}
                        </button>

                        {/* Notification button */}
                        <button
                            type="button"
                            className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                            style={{ borderColor: COLORS.border }}
                            onClick={onNotificationClick || (() => navigate("/notifications"))}
                        >
                            <Bell size={18} color={COLORS.primary} />
                            {notificationBadge > 0 && (
                                <span
                                    className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white"
                                    style={{ backgroundColor: COLORS.red }}
                                />
                            )}
                        </button>

                        {/* User profile with dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-full border bg-white py-1.5 pl-1.5 pr-3 hover:bg-gray-50 transition"
                                style={{ borderColor: COLORS.border }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        {getInitials(name)}
                                    </div>
                                )}

                                <span
                                    className="hidden text-[12px] font-bold sm:block"
                                    style={{ color: COLORS.text }}
                                >
                                    {name}
                                </span>

                                <ChevronDown
                                    size={14}
                                    color={COLORS.muted}
                                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-lg py-1 z-50 animate-fade-in-up" style={{ borderColor: COLORS.border }}>
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    item.onClick();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition hover:bg-gray-50 ${item.isDanger ? "text-red-600 hover:bg-red-50" : "text-gray-700"
                                                    }`}
                                            >
                                                <Icon size={16} color={item.isDanger ? "#EF4444" : COLORS.muted} />
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
        </div>
    );
};

export default PageHeader;