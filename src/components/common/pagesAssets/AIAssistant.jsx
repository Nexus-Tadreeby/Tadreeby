// // src/components/common/AIAssistant.jsx
// import React, { useState, useRef, useEffect } from "react";
// import {
//     X,
//     Send,
//     Sparkles,
//     Minimize2,
//     Maximize2,
// } from "lucide-react";

// const COLORS = {
//     primary: "#0475FB",
//     primaryDark: "#035CC9",
//     primarySoft: "#EAF3FF",
//     accent: "#FCA83E",
//     accentSoft: "#FFF4E5",
//     green: "#22C55E",
//     greenSoft: "#EAF9EF",
//     purple: "#8B5CF6",
//     purpleSoft: "#F2EDFF",
//     pink: "#EC4899",
//     pinkSoft: "#FDF2F8",
//     teal: "#14B8A6",
//     tealSoft: "#F0FDFA",
//     text: "#172033",
//     muted: "#7B8497",
//     border: "#E9EDF4",
//     background: "#F5F7FB",
// };

// const colorPalette = [
//     { bg: "#EAF3FF", text: "#0475FB", border: "#0475FB" },
//     { bg: "#FFF4E5", text: "#F59E0B", border: "#F59E0B" },
//     { bg: "#F2EDFF", text: "#8B5CF6", border: "#8B5CF6" },
//     { bg: "#EAF9EF", text: "#22C55E", border: "#22C55E" },
//     { bg: "#FDF2F8", text: "#EC4899", border: "#EC4899" },
//     { bg: "#F0FDFA", text: "#14B8A6", border: "#14B8A6" },
// ];

// // Mock responses with different tones
// const mockResponses = [
//     { text: "Hello! I'm here to help you with your internship journey! 🚀", color: "blue" },
//     { text: "Your profile is looking great! Keep it up! ✨", color: "green" },
//     { text: "There are new opportunities waiting for you! 🎯", color: "purple" },
//     { text: "Don't forget to check your pending tasks! 📋", color: "orange" },
//     { text: "I can help you find the perfect internship match! 🤝", color: "pink" },
//     { text: "You're doing amazing! Stay focused! 💪", color: "teal" },
//     { text: "Need help with your application? I'm here! 📝", color: "blue" },
//     { text: "Have you completed your profile? It helps us match you better! 🎨", color: "orange" },
// ];

// const getColorSet = (colorName) => {
//     const map = {
//         blue: { bg: "#EAF3FF", text: "#0475FB", border: "#0475FB" },
//         orange: { bg: "#FFF4E5", text: "#F59E0B", border: "#F59E0B" },
//         purple: { bg: "#F2EDFF", text: "#8B5CF6", border: "#8B5CF6" },
//         green: { bg: "#EAF9EF", text: "#22C55E", border: "#22C55E" },
//         pink: { bg: "#FDF2F8", text: "#EC4899", border: "#EC4899" },
//         teal: { bg: "#F0FDFA", text: "#14B8A6", border: "#14B8A6" },
//     };
//     return map[colorName] || map.blue;
// };

// // Robot with body and arms
// const RobotAvatar = ({ isSpeaking, colorSet, isWaving }) => {
//     const [waveAngle, setWaveAngle] = useState(0);

//     useEffect(() => {
//         if (isWaving || isSpeaking) {
//             const interval = setInterval(() => {
//                 setWaveAngle((prev) => (prev === 20 ? -20 : 20));
//             }, 600);
//             return () => clearInterval(interval);
//         } else {
//             setWaveAngle(0);
//         }
//     }, [isWaving, isSpeaking]);

//     return (
//         <div className="relative flex items-center justify-center">
//             <svg
//                 width="64"
//                 height="64"
//                 viewBox="0 0 64 64"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`transition-transform duration-300 ${isSpeaking ? "scale-105" : "scale-100"}`}
//             >
//                 {/* Body */}
//                 <rect x="16" y="34" width="32" height="22" rx="8" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="2" />
//                 {/* Chest detail */}
//                 <rect x="24" y="38" width="16" height="4" rx="2" fill={colorSet.text} opacity="0.1" />
//                 <circle cx="28" cy="46" r="2" fill={colorSet.text} opacity="0.1" />
//                 <circle cx="36" cy="46" r="2" fill={colorSet.text} opacity="0.1" />

//                 {/* Left arm */}
//                 <g
//                     style={{
//                         transform: `rotate(${waveAngle}deg)`,
//                         transformOrigin: "16px 34px",
//                         transition: "transform 0.4s ease-in-out",
//                     }}
//                 >
//                     <rect x="8" y="34" width="8" height="18" rx="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />
//                     <circle cx="12" cy="52" r="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />
//                 </g>

//                 {/* Right arm */}
//                 <rect x="48" y="34" width="8" height="18" rx="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />
//                 <circle cx="52" cy="52" r="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />

//                 {/* Neck */}
//                 <rect x="26" y="28" width="12" height="8" rx="2" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />

//                 {/* Head */}
//                 <rect x="12" y="10" width="40" height="20" rx="10" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="2" />

//                 {/* Antenna */}
//                 <rect x="28" y="2" width="8" height="10" rx="3" fill={colorSet.border} />
//                 <circle cx="32" cy="2" r="5" fill={colorSet.text} opacity="0.3">
//                     {isSpeaking && (
//                         <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
//                     )}
//                 </circle>

//                 {/* Eyes */}
//                 <g className={`transition-all duration-300 ${isSpeaking ? "translate-y-[-2px]" : ""}`}>
//                     <ellipse cx="24" cy="18" rx="4" ry="5" fill="white" />
//                     <ellipse cx="40" cy="18" rx="4" ry="5" fill="white" />
//                     <circle cx="24" cy={isSpeaking ? "16" : "18"} r="2.5" fill={colorSet.text} />
//                     <circle cx="40" cy={isSpeaking ? "16" : "18"} r="2.5" fill={colorSet.text} />
//                 </g>

//                 {/* Mouth */}
//                 {isSpeaking ? (
//                     <ellipse cx="32" cy="24" rx="5" ry="3" fill={colorSet.text} opacity="0.6" />
//                 ) : (
//                     <path
//                         d="M24 24 C28 27, 36 27, 40 24"
//                         stroke={colorSet.text}
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         fill="none"
//                     />
//                 )}

//                 {/* Cheeks */}
//                 <circle cx="16" cy="22" r="4" fill={colorSet.text} opacity="0.08" />
//                 <circle cx="48" cy="22" r="4" fill={colorSet.text} opacity="0.08" />

//                 {/* Eyes highlight */}
//                 <circle cx="22" cy="16" r="1" fill="white" opacity="0.8" />
//                 <circle cx="38" cy="16" r="1" fill="white" opacity="0.8" />
//             </svg>
//         </div>
//     );
// };

// // Speech bubble – with arrow from the right side
// const SpeechBubble = ({ message, colorSet, isTyping }) => {
//     if (!message && !isTyping) return null;

//     return (
//         <div
//             className="relative animate-fade-in-up"
//             style={{
//                 animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
//             }}
//         >
//             {/* Arrow – now on the right side */}
//             <div
//                 className="absolute -bottom-2 right-6 h-4 w-4 rotate-45"
//                 style={{ backgroundColor: colorSet.bg }}
//             />
//             <div
//                 className="rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm"
//                 style={{
//                     backgroundColor: colorSet.bg,
//                     border: `1px solid ${colorSet.border}30`,
//                 }}
//             >
//                 {isTyping ? (
//                     <div className="flex items-center gap-1 py-1">
//                         <div className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: colorSet.text, animationDelay: "-0.3s" }} />
//                         <div className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: colorSet.text, animationDelay: "-0.15s" }} />
//                         <div className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: colorSet.text }} />
//                     </div>
//                 ) : (
//                     <p className="text-sm font-medium leading-relaxed" style={{ color: colorSet.text }}>
//                         {message}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// const AIAssistant = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMinimized, setIsMinimized] = useState(false);
//     const [messages, setMessages] = useState([
//         {
//             id: 1,
//             sender: "ai",
//             text: "Hi there! I'm your AI buddy 🤖 Ready to help you navigate Tadreeby!",
//             time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             color: "blue",
//         },
//     ]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const [speechMessage, setSpeechMessage] = useState("");
//     const [speechColor, setSpeechColor] = useState("blue");
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [bubbleVisible, setBubbleVisible] = useState(false);
//     const [isWaving, setIsWaving] = useState(false);
//     const messagesEndRef = useRef(null);

//     // Auto-rotate speech messages when assistant is idle (always visible, even without clicking)
//     useEffect(() => {
//         // Show first message after 1.5 seconds
//         const showRandomMessage = () => {
//             const random = mockResponses[Math.floor(Math.random() * mockResponses.length)];
//             setSpeechColor(random.color);
//             setSpeechMessage(random.text);
//             setIsSpeaking(true);
//             setIsWaving(true);
//             setBubbleVisible(true);

//             // Stop speaking after 4 seconds
//             setTimeout(() => {
//                 setIsSpeaking(false);
//                 setIsWaving(false);
//                 // Hide bubble after 1 more second
//                 setTimeout(() => {
//                     setBubbleVisible(false);
//                 }, 1000);
//             }, 4000);
//         };

//         const initialTimer = setTimeout(showRandomMessage, 1500);

//         // Then rotate every 7 seconds
//         const interval = setInterval(showRandomMessage, 7000);

//         return () => {
//             clearTimeout(initialTimer);
//             clearInterval(interval);
//         };
//     }, []);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const handleSend = async () => {
//         if (!input.trim()) return;

//         const userMessage = {
//             id: messages.length + 1,
//             sender: "user",
//             text: input.trim(),
//             time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         };

//         setMessages((prev) => [...prev, userMessage]);
//         setInput("");
//         setIsTyping(true);

//         // Simulate AI response
//         setTimeout(() => {
//             const random = mockResponses[Math.floor(Math.random() * mockResponses.length)];
//             const aiMessage = {
//                 id: messages.length + 2,
//                 sender: "ai",
//                 text: random.text,
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//                 color: random.color,
//             };
//             setMessages((prev) => [...prev, aiMessage]);
//             setIsTyping(false);

//             // Also show in speech bubble
//             setSpeechColor(random.color);
//             setSpeechMessage(random.text);
//             setIsSpeaking(true);
//             setIsWaving(true);
//             setBubbleVisible(true);
//             setTimeout(() => {
//                 setIsSpeaking(false);
//                 setIsWaving(false);
//                 setTimeout(() => setBubbleVisible(false), 1000);
//             }, 4000);
//         }, 1200);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSend();
//         }
//     };

//     const toggleOpen = () => {
//         setIsOpen(!isOpen);
//         if (!isOpen) {
//             // When opening, show a greeting
//             setTimeout(() => {
//                 const greeting = mockResponses[0];
//                 setSpeechColor(greeting.color);
//                 setSpeechMessage(greeting.text);
//                 setIsSpeaking(true);
//                 setIsWaving(true);
//                 setBubbleVisible(true);
//                 setTimeout(() => {
//                     setIsSpeaking(false);
//                     setIsWaving(false);
//                     setTimeout(() => setBubbleVisible(false), 1000);
//                 }, 4000);
//             }, 300);
//         }
//     };

//     const toggleMinimize = () => setIsMinimized(!isMinimized);

//     const colorSet = getColorSet(speechColor);

//     return (
//         <>
//             {/* Floating button with robot - positioned further from edge */}
//             <button
//                 onClick={toggleOpen}
//                 className="fixed bottom-12 right-8 z-50 flex h-23 w-23 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2"
//                 style={{ borderColor: COLORS.border }}
//                 aria-label="Toggle AI Assistant"
//             >
//                 <RobotAvatar isSpeaking={isSpeaking} colorSet={colorSet} isWaving={isWaving} />
//             </button>

//             {/* Speech bubble above the robot - with arrow on the right side */}
//             {bubbleVisible && (
//                 <div className="fixed bottom-38 right-6 z-50 max-w-[280px] animate-fade-in-up">
//                     <SpeechBubble message={speechMessage} colorSet={colorSet} isTyping={isSpeaking && !speechMessage} />
//                 </div>
//             )}

//             {/* Chat panel */}
//             {isOpen && (
//                 <div
//                     className={`fixed bottom-32 right-8 z-50 w-[400px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ${isMinimized ? "h-[60px]" : "h-[560px]"
//                         }`}
//                     style={{ borderColor: COLORS.border, backgroundColor: "white" }}
//                 >
//                     {/* Header - gradient from blue to yellow/orange */}
//                     <div className="relative flex items-center justify-between px-4 py-3 overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#0475FB] via-[#3B82F6] to-[#FCA83E] opacity-95" />
//                         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')} opacity-10" />
//                         <div className="relative z-10 flex items-center gap-2">
//                             <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
//                                 <Sparkles size={14} className="text-white" />
//                             </div>
//                             <span className="font-bold text-white">AI Assistant</span>
//                             <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold text-white">
//                                 Beta
//                             </span>
//                         </div>
//                         <div className="relative z-10 flex items-center gap-1">
//                             <button
//                                 onClick={toggleMinimize}
//                                 className="rounded p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
//                             >
//                                 {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
//                             </button>
//                             <button
//                                 onClick={toggleOpen}
//                                 className="rounded p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
//                             >
//                                 <X size={16} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Chat body */}
//                     {!isMinimized && (
//                         <>
//                             <div className="flex h-[calc(100%-112px)] flex-col overflow-y-auto bg-[#F9FAFD] p-4">
//                                 {messages.map((msg) => {
//                                     const msgColorSet = msg.color ? getColorSet(msg.color) : colorSet;
//                                     return (
//                                         <div
//                                             key={msg.id}
//                                             className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"
//                                                 }`}
//                                         >
//                                             {msg.sender === "ai" && (
//                                                 <div className="mr-2 flex items-end">
//                                                     <RobotAvatar isSpeaking={false} colorSet={msgColorSet} isWaving={false} />
//                                                 </div>
//                                             )}
//                                             <div
//                                                 className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.sender === "user"
//                                                     ? "rounded-tr-sm bg-[#0475FB] text-white"
//                                                     : `rounded-tl-sm border shadow-sm`
//                                                     }`}
//                                                 style={
//                                                     msg.sender === "ai"
//                                                         ? {
//                                                             backgroundColor: msgColorSet.bg,
//                                                             borderColor: `${msgColorSet.border}30`,
//                                                             color: msgColorSet.text,
//                                                         }
//                                                         : {}
//                                                 }
//                                             >
//                                                 {msg.text}
//                                                 <div
//                                                     className={`mt-1 text-[9px] font-medium ${msg.sender === "user" ? "text-white/60" : "text-gray-400"
//                                                         }`}
//                                                 >
//                                                     {msg.time}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                                 {isTyping && (
//                                     <div className="flex justify-start">
//                                         <div className="mr-2 flex items-end">
//                                             <RobotAvatar isSpeaking={false} colorSet={colorSet} isWaving={false} />
//                                         </div>
//                                         <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm">
//                                             <div className="flex items-center gap-1">
//                                                 <div className="h-2 w-2 animate-bounce rounded-full bg-[#0475FB] [animation-delay:-0.3s]" />
//                                                 <div className="h-2 w-2 animate-bounce rounded-full bg-[#8B5CF6] [animation-delay:-0.15s]" />
//                                                 <div className="h-2 w-2 animate-bounce rounded-full bg-[#22C55E]" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div ref={messagesEndRef} />
//                             </div>

//                             {/* Input */}
//                             <div className="border-t p-3" style={{ borderColor: COLORS.border }}>
//                                 <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white p-1.5 focus-within:border-[#0475FB] focus-within:ring-1 focus-within:ring-[#0475FB]">
//                                     <textarea
//                                         value={input}
//                                         onChange={(e) => setInput(e.target.value)}
//                                         onKeyDown={handleKeyDown}
//                                         placeholder="Ask me anything..."
//                                         className="max-h-[60px] min-h-[36px] w-full resize-none bg-transparent px-2 py-1.5 text-[13px] text-[#172033] outline-none placeholder:text-gray-400"
//                                         rows={1}
//                                     />
//                                     <button
//                                         onClick={handleSend}
//                                         disabled={!input.trim()}
//                                         className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0475FB] via-[#3B82F6] to-[#FCA83E] text-white transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <Send size={15} className="ml-0.5" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             )}

//             <style>
//                 {`
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(12px) scale(0.95);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0) scale(1);
//             }
//           }
//           .animate-fade-in-up {
//             animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//           }
//         `}
//             </style>
//         </>
//     );
// };

// export default AIAssistant;



// src/components/common/AIAssistant.jsx
import React, { useState, useRef, useEffect } from "react";
import {
    X,
    Send,
    Sparkles,
    Minimize2,
    Maximize2,
} from "lucide-react";

const COLORS = {
    primary: "#0475FB",
    primaryDark: "#035CC9",
    primarySoft: "#EAF3FF",
    accent: "#FCA83E",
    accentSoft: "#FFF4E5",
    green: "#22C55E",
    greenSoft: "#EAF9EF",
    purple: "#8B5CF6",
    purpleSoft: "#F2EDFF",
    pink: "#EC4899",
    pinkSoft: "#FDF2F8",
    teal: "#14B8A6",
    tealSoft: "#F0FDFA",
    text: "#172033",
    muted: "#7B8497",
    border: "#E9EDF4",
    background: "#F5F7FB",
};

const colorPalette = [
    { bg: "#EAF3FF", text: "#0475FB", border: "#0475FB" },
    { bg: "#FFF4E5", text: "#F59E0B", border: "#F59E0B" },
    { bg: "#F2EDFF", text: "#8B5CF6", border: "#8B5CF6" },
    { bg: "#EAF9EF", text: "#22C55E", border: "#22C55E" },
    { bg: "#FDF2F8", text: "#EC4899", border: "#EC4899" },
    { bg: "#F0FDFA", text: "#14B8A6", border: "#14B8A6" },
];

// Mock responses with different tones
const mockResponses = [
    { text: "Hello! I'm here to help you with your internship journey! 🚀", color: "blue" },
    { text: "Your profile is looking great! Keep it up! ✨", color: "green" },
    { text: "There are new opportunities waiting for you! 🎯", color: "purple" },
    { text: "Don't forget to check your pending tasks! 📋", color: "orange" },
    { text: "I can help you find the perfect internship match! 🤝", color: "pink" },
    { text: "You're doing amazing! Stay focused! 💪", color: "teal" },
    { text: "Need help with your application? I'm here! 📝", color: "blue" },
    { text: "Have you completed your profile? It helps us match you better! 🎨", color: "orange" },
];

const getColorSet = (colorName) => {
    const map = {
        blue: { bg: "#EAF3FF", text: "#0475FB", border: "#0475FB" },
        orange: { bg: "#FFF4E5", text: "#F59E0B", border: "#F59E0B" },
        purple: { bg: "#F2EDFF", text: "#8B5CF6", border: "#8B5CF6" },
        green: { bg: "#EAF9EF", text: "#22C55E", border: "#22C55E" },
        pink: { bg: "#FDF2F8", text: "#EC4899", border: "#EC4899" },
        teal: { bg: "#F0FDFA", text: "#14B8A6", border: "#14B8A6" },
    };
    return map[colorName] || map.blue;
};

// Skeleton loader for messages
const MessageSkeleton = () => {
    return (
        <div className="mb-3 flex justify-start">
            <div className="mr-2 flex items-end">
                <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-gray-200 animate-pulse px-4 py-3">
                <div className="h-4 w-48 bg-gray-300 rounded animate-pulse" />
                <div className="mt-2 h-3 w-32 bg-gray-300 rounded animate-pulse" />
            </div>
        </div>
    );
};

// Robot with body and arms
const RobotAvatar = ({ isSpeaking, colorSet, isWaving }) => {
    const [waveAngle, setWaveAngle] = useState(0);

    useEffect(() => {
        if (isWaving || isSpeaking) {
            const interval = setInterval(() => {
                setWaveAngle((prev) => (prev === 20 ? -20 : 20));
            }, 600);
            return () => clearInterval(interval);
        } else {
            setWaveAngle(0);
        }
    }, [isWaving, isSpeaking]);

    return (
        <div className="relative flex items-center justify-center">
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ${isSpeaking ? "scale-105" : "scale-100"}`}
            >
                {/* Body */}
                <rect x="16" y="34" width="32" height="22" rx="8" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="2" />
                {/* Chest detail */}
                <rect x="24" y="38" width="16" height="4" rx="2" fill={colorSet.text} opacity="0.1" />
                <circle cx="28" cy="46" r="2" fill={colorSet.text} opacity="0.1" />
                <circle cx="36" cy="46" r="2" fill={colorSet.text} opacity="0.1" />

                {/* Left arm */}
                <g
                    style={{
                        transform: `rotate(${waveAngle}deg)`,
                        transformOrigin: "16px 34px",
                        transition: "transform 0.4s ease-in-out",
                    }}
                >
                    <rect x="8" y="34" width="8" height="18" rx="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />
                    <circle cx="12" cy="52" r="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />
                </g>

                {/* Right arm */}
                <rect x="48" y="34" width="8" height="18" rx="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />
                <circle cx="52" cy="52" r="4" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />

                {/* Neck */}
                <rect x="26" y="28" width="12" height="8" rx="2" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="1.5" />

                {/* Head */}
                <rect x="12" y="10" width="40" height="20" rx="10" fill={colorSet.bg} stroke={colorSet.border} strokeWidth="2" />

                {/* Antenna */}
                <rect x="28" y="2" width="8" height="10" rx="3" fill={colorSet.border} />
                <circle cx="32" cy="2" r="5" fill={colorSet.text} opacity="0.3">
                    {isSpeaking && (
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                    )}
                </circle>

                {/* Eyes */}
                <g className={`transition-all duration-300 ${isSpeaking ? "translate-y-[-2px]" : ""}`}>
                    <ellipse cx="24" cy="18" rx="4" ry="5" fill="white" />
                    <ellipse cx="40" cy="18" rx="4" ry="5" fill="white" />
                    <circle cx="24" cy={isSpeaking ? "16" : "18"} r="2.5" fill={colorSet.text} />
                    <circle cx="40" cy={isSpeaking ? "16" : "18"} r="2.5" fill={colorSet.text} />
                </g>

                {/* Mouth */}
                {isSpeaking ? (
                    <ellipse cx="32" cy="24" rx="5" ry="3" fill={colorSet.text} opacity="0.6" />
                ) : (
                    <path
                        d="M24 24 C28 27, 36 27, 40 24"
                        stroke={colorSet.text}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                )}

                {/* Cheeks */}
                <circle cx="16" cy="22" r="4" fill={colorSet.text} opacity="0.08" />
                <circle cx="48" cy="22" r="4" fill={colorSet.text} opacity="0.08" />

                {/* Eyes highlight */}
                <circle cx="22" cy="16" r="1" fill="white" opacity="0.8" />
                <circle cx="38" cy="16" r="1" fill="white" opacity="0.8" />
            </svg>
        </div>
    );
};

// Speech bubble – with arrow from the right side
const SpeechBubble = ({ message, colorSet, isTyping }) => {
    if (!message && !isTyping) return null;

    return (
        <div
            className="relative animate-fade-in-up"
            style={{
                animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
        >
            {/* Arrow – now on the right side */}
            <div
                className="absolute -bottom-2 right-6 h-4 w-4 rotate-45"
                style={{ backgroundColor: colorSet.bg }}
            />
            <div
                className="rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm"
                style={{
                    backgroundColor: colorSet.bg,
                    border: `1px solid ${colorSet.border}30`,
                }}
            >
                {isTyping ? (
                    <div className="flex items-center gap-1 py-1">
                        <div className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: colorSet.text, animationDelay: "-0.3s" }} />
                        <div className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: colorSet.text, animationDelay: "-0.15s" }} />
                        <div className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: colorSet.text }} />
                    </div>
                ) : (
                    <p className="text-sm font-medium leading-relaxed" style={{ color: colorSet.text }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "ai",
            text: "Hi there! I'm your AI buddy 🤖 Ready to help you navigate Tadreeby!",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            color: "blue",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [speechMessage, setSpeechMessage] = useState("");
    const [speechColor, setSpeechColor] = useState("blue");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [isWaving, setIsWaving] = useState(false);
    const messagesEndRef = useRef(null);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Auto-rotate speech messages when assistant is idle (always visible, even without clicking)
    // Changed interval to 60 seconds (60000ms)
    useEffect(() => {
        // Show first message after 2 seconds
        const showRandomMessage = () => {
            const random = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            setSpeechColor(random.color);
            setSpeechMessage(random.text);
            setIsSpeaking(true);
            setIsWaving(true);
            setBubbleVisible(true);

            // Stop speaking after 4 seconds
            setTimeout(() => {
                setIsSpeaking(false);
                setIsWaving(false);
                // Hide bubble after 1 more second
                setTimeout(() => {
                    setBubbleVisible(false);
                }, 1000);
            }, 4000);
        };

        const initialTimer = setTimeout(showRandomMessage, 2000);

        // Then rotate every 60 seconds (60000ms)
        const interval = setInterval(showRandomMessage, 60000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            sender: "user",
            text: input.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const random = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            const aiMessage = {
                id: messages.length + 2,
                sender: "ai",
                text: random.text,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                color: random.color,
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);

            // Also show in speech bubble
            setSpeechColor(random.color);
            setSpeechMessage(random.text);
            setIsSpeaking(true);
            setIsWaving(true);
            setBubbleVisible(true);
            setTimeout(() => {
                setIsSpeaking(false);
                setIsWaving(false);
                setTimeout(() => setBubbleVisible(false), 1000);
            }, 4000);
        }, 1200);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // When opening, show a greeting
            setTimeout(() => {
                const greeting = mockResponses[0];
                setSpeechColor(greeting.color);
                setSpeechMessage(greeting.text);
                setIsSpeaking(true);
                setIsWaving(true);
                setBubbleVisible(true);
                setTimeout(() => {
                    setIsSpeaking(false);
                    setIsWaving(false);
                    setTimeout(() => setBubbleVisible(false), 1000);
                }, 4000);
            }, 300);
        }
    };

    const toggleMinimize = () => setIsMinimized(!isMinimized);

    const colorSet = getColorSet(speechColor);

    return (
        <>
            {/* Floating button with robot - positioned further from edge */}
            <button
                onClick={toggleOpen}
                className="fixed bottom-12 right-25 z-50 flex h-23 w-23 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2"
                style={{ borderColor: COLORS.border }}
                aria-label="Toggle AI Assistant"
            >
                <RobotAvatar isSpeaking={isSpeaking} colorSet={colorSet} isWaving={isWaving} />
            </button>

            {/* Speech bubble above the robot - with arrow on the right side */}
            {bubbleVisible && (
                <div className="fixed bottom-38 right-23 z-50 max-w-[280px] animate-fade-in-up">
                    <SpeechBubble message={speechMessage} colorSet={colorSet} isTyping={isSpeaking && !speechMessage} />
                </div>
            )}

            {/* Chat panel */}
            {isOpen && (
                <div
                    className={`fixed bottom-32 right-8 z-50 w-[400px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ${isMinimized ? "h-[60px]" : "h-[560px]"
                        }`}
                    style={{ borderColor: COLORS.border, backgroundColor: "white" }}
                >
                    {/* Header - gradient from blue to yellow/orange */}
                    <div className="relative flex items-center justify-between px-4 py-3 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0475FB] via-[#3B82F6] to-[#FCA83E] opacity-95" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')} opacity-10" />
                        <div className="relative z-10 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                                <Sparkles size={14} className="text-white" />
                            </div>
                            <span className="font-bold text-white">AI Assistant</span>
                            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold text-white">
                                Beta
                            </span>
                        </div>
                        <div className="relative z-10 flex items-center gap-1">
                            <button
                                onClick={toggleMinimize}
                                className="rounded p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
                            >
                                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                            </button>
                            <button
                                onClick={toggleOpen}
                                className="rounded p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Chat body */}
                    {!isMinimized && (
                        <>
                            <div className="flex h-[calc(100%-112px)] flex-col overflow-y-auto bg-[#F9FAFD] p-4">
                                {isLoading ? (
                                    // Show skeleton while loading
                                    <>
                                        <MessageSkeleton />
                                        <MessageSkeleton />
                                        <MessageSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {messages.map((msg) => {
                                            const msgColorSet = msg.color ? getColorSet(msg.color) : colorSet;
                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                                        }`}
                                                >
                                                    {msg.sender === "ai" && (
                                                        <div className="mr-2 flex items-end">
                                                            <RobotAvatar isSpeaking={false} colorSet={msgColorSet} isWaving={false} />
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.sender === "user"
                                                            ? "rounded-tr-sm bg-[#0475FB] text-white"
                                                            : `rounded-tl-sm border shadow-sm`
                                                            }`}
                                                        style={
                                                            msg.sender === "ai"
                                                                ? {
                                                                    backgroundColor: msgColorSet.bg,
                                                                    borderColor: `${msgColorSet.border}30`,
                                                                    color: msgColorSet.text,
                                                                }
                                                                : {}
                                                        }
                                                    >
                                                        {msg.text}
                                                        <div
                                                            className={`mt-1 text-[9px] font-medium ${msg.sender === "user" ? "text-white/60" : "text-gray-400"
                                                                }`}
                                                        >
                                                            {msg.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="mr-2 flex items-end">
                                                    <RobotAvatar isSpeaking={false} colorSet={colorSet} isWaving={false} />
                                                </div>
                                                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm">
                                                    <div className="flex items-center gap-1">
                                                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#0475FB] [animation-delay:-0.3s]" />
                                                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#8B5CF6] [animation-delay:-0.15s]" />
                                                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#22C55E]" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="border-t p-3" style={{ borderColor: COLORS.border }}>
                                <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-white p-1.5 focus-within:border-[#0475FB] focus-within:ring-1 focus-within:ring-[#0475FB]">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask me anything..."
                                        className="max-h-[60px] min-h-[36px] w-full resize-none bg-transparent px-2 py-1.5 text-[13px] text-[#172033] outline-none placeholder:text-gray-400"
                                        rows={1}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim()}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0475FB] via-[#3B82F6] to-[#FCA83E] text-white transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={15} className="ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            <style>
                {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
            </style>
        </>
    );
};

export default AIAssistant;