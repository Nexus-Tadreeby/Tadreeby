// src/components/pages/student/StudentChats.jsx
import React, { useState, useEffect, useRef } from "react";
import {
    Search,
    MoreHorizontal,
    Phone,
    Paperclip,
    Image as ImageIcon,
    Smile,
    Send,
    Check,
    CheckCheck,
    ChevronRight,
    Filter,
    Bell,
    ChevronDown,
    LayoutDashboard,
    GraduationCap,
    Settings,
    Clock as ClockIcon,
    Briefcase as BriefcaseIcon,
    MessageCircle,
} from "lucide-react";

import Sidebar from "../../layout/Sidebar";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ─── Import skeleton components ──────────────────────────────────────
import {
    SkeletonText,
    SkeletonCircle,
    SkeletonRect,
    SkeletonButton,
} from "../../common/pagesAssets/Skeleton";

// ─── Tadreeby Design System (مطابق تماماً للـ Dashboard) ──────────
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

// ─── Navigation (مطابق للـ Dashboard) ──────────────────────────────
const studentNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Opportunities", icon: BriefcaseIcon, path: "/student/opportunities" },
    { label: "My Internship", icon: GraduationCap, path: "/student/my-internship" },
    { label: "Attendance", icon: ClockIcon, path: "/attendance" },
];

const studentFooterItems = [
    { label: "Settings", icon: Settings, path: "/settings" },
];

// ─── Helper ─────────────────────────────────────────────────────────
const getInitials = (name) => {
    if (!name) return "U";
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

// ─── Dummy Data ──────────────────────────────────────────────────────
const DUMMY_CHATS = [
    {
        id: 1,
        name: "Dr. Brandon Madsen",
        role: "Academic Supervisor",
        avatar: "https://i.pravatar.cc/150?u=brandon",
        lastMessage: "Awesome! You're all set! Talk soon :)",
        time: "11:19 AM",
        unread: 0,
        status: "online",
    },
    {
        id: 2,
        name: "TechCorp HR",
        role: "Company Coordinator",
        avatar: "https://i.pravatar.cc/150?u=techcorp",
        lastMessage: "What about 2:30 PM?",
        time: "11:30 AM",
        unread: 1,
        status: "offline",
    },
    {
        id: 3,
        name: "Esther Howard",
        role: "Mentor",
        avatar: "https://i.pravatar.cc/150?u=esther",
        lastMessage: "Awesome!",
        time: "11:29 AM",
        unread: 1,
        status: "online",
    },
];

const DUMMY_MESSAGES = [
    {
        id: 1,
        senderId: 1,
        text: "Can we schedule a 30-minute review over Zoom with me?",
        time: "11:18 AM",
        isMe: false,
    },
    {
        id: 2,
        senderId: "me",
        text: "What about 2:30 PM?",
        time: "11:18 AM",
        isMe: true,
    },
    {
        id: 3,
        senderId: "me",
        text: "Awesome! You're all set! Talk soon :)",
        time: "11:19 AM",
        isMe: true,
        isSms: true,
    },
    {
        id: 4,
        senderId: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=400&auto=format&fit=crop",
        time: "11:20 AM",
        isMe: false,
    },
    {
        id: 5,
        senderId: 1,
        type: "audio",
        duration: "00:06",
        time: "11:21 AM",
        isMe: false,
    }
];

// ─── Skeleton Components (مطابقة للـ Dashboard) ──────────────────

const ChatListSkeleton = () => (
    <div className="flex w-[320px] shrink-0 flex-col border-r p-4" style={{ borderColor: COLORS.border }}>
        <div className="relative mb-4">
            <SkeletonRect className="h-10 w-full rounded-full" />
        </div>
        <div className="flex items-center justify-between pb-2">
            <SkeletonText className="h-4 w-20" />
            <SkeletonCircle className="h-4 w-4" />
        </div>
        <div className="space-y-3 mt-2">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                    <SkeletonCircle className="h-10 w-10" />
                    <div className="flex-1 space-y-2">
                        <SkeletonText className="h-3 w-24" />
                        <SkeletonText className="h-3 w-full" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatAreaSkeleton = () => (
    <div className="flex flex-1 flex-col">
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b px-6" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-3">
                <SkeletonCircle className="h-10 w-10" />
                <div>
                    <SkeletonText className="h-4 w-32" />
                    <SkeletonText className="h-3 w-20 mt-1" />
                </div>
            </div>
            <div className="flex gap-2">
                <SkeletonButton className="h-8 w-24 rounded-full" />
                <SkeletonCircle className="h-8 w-8" />
            </div>
        </div>
        <div className="flex-1 bg-[#F9FAFD] p-6 space-y-4">
            <div className="flex justify-start">
                <div className="max-w-[70%]">
                    <SkeletonRect className="h-12 w-48 rounded-2xl rounded-tl-sm" />
                </div>
            </div>
            <div className="flex justify-end">
                <div className="max-w-[70%]">
                    <SkeletonRect className="h-12 w-40 rounded-2xl rounded-tr-sm" style={{ backgroundColor: "#EAF3FF" }} />
                </div>
            </div>
            <div className="flex justify-start">
                <div className="max-w-[70%]">
                    <SkeletonRect className="h-32 w-64 rounded-2xl rounded-tl-sm" />
                </div>
            </div>
        </div>
        <div className="border-t p-4" style={{ borderColor: COLORS.border }}>
            <SkeletonRect className="h-12 w-full rounded-2xl" />
        </div>
    </div>
);

const InfoPanelSkeleton = () => (
    <div className="w-[280px] shrink-0 border-l p-6" style={{ borderColor: COLORS.border }}>
        <SkeletonText className="h-4 w-24" />
        <div className="mt-6 rounded-2xl border p-5 text-center">
            <SkeletonCircle className="mx-auto h-16 w-16" />
            <SkeletonText className="h-4 w-24 mx-auto mt-3" />
            <SkeletonText className="h-3 w-16 mx-auto mt-1" />
        </div>
        <div className="mt-6 space-y-4">
            <SkeletonText className="h-3 w-20" />
            <SkeletonText className="h-3 w-32" />
            <SkeletonText className="h-3 w-20" />
            <SkeletonText className="h-3 w-40" />
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────
export default function StudentChats() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState(DUMMY_CHATS);
    const [activeChat, setActiveChat] = useState(DUMMY_CHATS[0]);
    const [messages, setMessages] = useState(DUMMY_MESSAGES);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            senderId: "me",
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");

        const updatedChats = chats.map(chat => {
            if (chat.id === activeChat.id) {
                return { ...chat, lastMessage: newMsg.text, time: newMsg.time };
            }
            return chat;
        });
        setChats(updatedChats);
        setActiveChat(prev => ({ ...prev, lastMessage: newMsg.text, time: newMsg.time }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

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

    if (loading) {
        return (
            <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: COLORS.background }}>
                <Sidebar
                    navItems={studentNavItems}
                    footerItems={studentFooterItems}
                    user={studentUser}
                    profilePath="/student/profile"
                    onSignOut={handleSignOut}
                />
                <main className="flex-1 overflow-hidden p-4">
                    <div className="flex h-full w-full overflow-hidden rounded-[24px] border bg-white shadow-sm" style={{ borderColor: COLORS.border }}>
                        <ChatListSkeleton />
                        <ChatAreaSkeleton />
                        <InfoPanelSkeleton />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: COLORS.background }}>
            <Sidebar
                navItems={studentNavItems}
                footerItems={studentFooterItems}
                user={studentUser}
                profilePath="/student/profile"
                onSignOut={handleSignOut}
            />

            <main className="flex-1 overflow-hidden p-4">
                <div className="flex h-full w-full overflow-hidden rounded-[24px] border bg-white shadow-sm" style={{ borderColor: COLORS.border }}>

                    {/* 1. Chat List - نفس ستايل Dashboard */}
                    <div className="flex w-[320px] shrink-0 flex-col border-r" style={{ borderColor: COLORS.border }}>
                        <div className="p-4">
                            <div className="relative mb-4">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-[13px] outline-none transition focus:border-[#0475FB] focus:ring-1 focus:ring-[#0475FB]"
                                />
                            </div>
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-[13px] font-extrabold text-[#172033]">Unread <span className="ml-1 text-gray-400">2</span></h3>
                                <Filter size={14} className="cursor-pointer text-gray-400 hover:text-[#0475FB]" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-2 pb-4">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveChat(chat)}
                                    className={`relative mb-1 flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors ${activeChat.id === chat.id ? "bg-[#EAF3FF]" : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="relative">
                                        <img src={chat.avatar} alt={chat.name} className="h-10 w-10 rounded-full object-cover" />
                                        {chat.status === "online" && (
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <h4 className="truncate text-[13px] font-bold text-[#172033]">{chat.name}</h4>
                                            <span className="text-[10px] font-semibold text-gray-400">{chat.time}</span>
                                        </div>
                                        <p className={`truncate text-[12px] ${chat.unread ? "font-bold text-[#172033]" : "font-medium text-gray-500"}`}>
                                            {chat.lastMessage}
                                        </p>
                                    </div>
                                    {chat.unread > 0 && (
                                        <span className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFAD4E] text-[10px] font-bold text-white">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Chat Area - بنفس أسلوب Dashboard */}
                    <div className="flex flex-1 flex-col">
                        {/* Header */}
                        <div className="flex h-[72px] shrink-0 items-center justify-between border-b px-6" style={{ borderColor: COLORS.border }}>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={activeChat.avatar} alt={activeChat.name} className="h-10 w-10 rounded-full object-cover" />
                                    {activeChat.status === "online" && (
                                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-[15px] font-extrabold text-[#172033]">{activeChat.name}</h2>
                                    <p className="text-[11px] font-semibold text-gray-500">{activeChat.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* <button className="flex h-9 items-center gap-2 rounded-full border border-gray-200 px-4 text-[12px] font-bold text-[#0475FB] transition hover:bg-gray-50">
                                    <Check size={14} />
                                    Mark as Closed
                                </button> */}
                                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50">
                                    <MoreHorizontal size={16} className="text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto bg-[#F9FAFD] p-6">
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                                        <div className="flex max-w-[70%] gap-3">
                                            {!msg.isMe && (
                                                <img src={activeChat.avatar} alt="avatar" className="h-8 w-8 shrink-0 rounded-full" />
                                            )}

                                            <div>
                                                {msg.text && (
                                                    <div
                                                        className={`rounded-2xl px-5 py-3 text-[13px] font-medium leading-relaxed ${msg.isMe
                                                                ? "rounded-tr-sm bg-[#0475FB] text-white"
                                                                : "rounded-tl-sm border border-gray-100 bg-white text-[#172033] shadow-sm"
                                                            }`}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                )}

                                                {msg.type === "image" && (
                                                    <div className="overflow-hidden rounded-2xl rounded-tl-sm border border-gray-100 bg-white shadow-sm">
                                                        <img src={msg.url} alt="Attachment" className="h-[200px] w-[280px] object-cover" />
                                                    </div>
                                                )}

                                                {msg.type === "audio" && (
                                                    <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-5 py-3 shadow-sm">
                                                        <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#172033]">
                                                            <div className="ml-1 h-3 w-3 border-y-[6px] border-l-[8px] border-y-transparent border-l-white" />
                                                        </button>
                                                        <div className="flex h-6 flex-1 items-center gap-0.5">
                                                            {[...Array(20)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="w-1 rounded-full bg-gray-300"
                                                                    style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-400">{msg.duration}</span>
                                                    </div>
                                                )}

                                                <div className={`mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 ${msg.isMe ? "justify-end" : "justify-start"}`}>
                                                    <span>{msg.time}</span>
                                                    {msg.isSms && <span className="flex items-center gap-1"><Phone size={10} /> Via SMS</span>}
                                                    {msg.isMe && <CheckCheck size={12} className="text-[#0475FB]" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="border-t p-4" style={{ borderColor: COLORS.border }}>
                            <div className="flex items-end gap-3 rounded-[20px] border border-gray-200 bg-white p-2 shadow-sm focus-within:border-[#0475FB] focus-within:ring-1 focus-within:ring-[#0475FB]">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="max-h-[120px] min-h-[40px] w-full resize-none bg-transparent py-2.5 text-[13px] font-medium text-[#172033] outline-none placeholder:text-gray-400"
                                    rows={1}
                                />

                                <div className="flex shrink-0 items-center gap-1 pb-1 pr-1">
                                    <button className="p-2 text-gray-400 transition hover:text-[#0475FB]">
                                        <Smile size={18} />
                                    </button>
                                    <button className="p-2 text-gray-400 transition hover:text-[#0475FB]">
                                        <ImageIcon size={18} />
                                    </button>
                                    <button className="p-2 text-gray-400 transition hover:text-[#0475FB]">
                                        <Paperclip size={18} />
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0475FB] text-white shadow-md transition hover:bg-[#035CC9] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <Send size={15} className="ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Info Panel - مع تحسينات التصميم */}
                    <div className="w-[280px] shrink-0 border-l bg-[#F9FAFD] p-6 overflow-y-auto" style={{ borderColor: COLORS.border }}>
                        <h3 className="mb-6 flex items-center gap-2 text-[14px] font-extrabold text-[#172033]">
                            <ChevronRight size={16} className="text-gray-400" /> General Info
                        </h3>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                            <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-md">
                                <img src={activeChat.avatar} alt="Profile" className="h-full w-full object-cover" />
                            </div>
                            <span className="mb-2 inline-flex items-center rounded-full bg-[#FFF4E5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#D97706]">
                                Supervisor
                            </span>
                            <h4 className="text-[15px] font-extrabold text-[#172033]">{activeChat.name}</h4>
                            <p className="mt-1 text-[11px] font-medium text-gray-500">{activeChat.role}</p>

                            <div className="mt-5 flex justify-center gap-2">
                                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0475FB] transition hover:bg-[#DCEBFF]">
                                    <Phone size={16} />
                                </button>
                                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                                    <BriefcaseIcon size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</p>
                                <p className="mt-1 text-[12px] font-semibold text-[#172033]">contact@university.edu</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Internship Program</p>
                                <p className="mt-1 text-[12px] font-semibold text-[#172033]">Field Training 2026</p>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[12px] font-extrabold text-[#172033]">Notes</h4>
                            <button className="text-[11px] font-bold text-[#0475FB]">Add</button>
                        </div>

                        <div className="rounded-xl bg-[#F2F4F7] p-3 border border-gray-200">
                            <p className="text-[11px] font-medium leading-relaxed text-[#172033]">
                                Discussed the final evaluation criteria for the software engineering internship project.
                            </p>
                            <p className="mt-2 text-[9px] font-bold text-gray-400">Aug 20, 2026</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}