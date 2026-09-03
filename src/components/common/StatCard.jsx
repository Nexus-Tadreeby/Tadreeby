import React from "react";

/**
 * Generic statistic card used across admin/supervisor dashboards.
 *
 * @param {React.ComponentType} icon - Lucide icon component (not an element).
 * @param {string} label - Short label describing the metric.
 * @param {string|number} value - The metric value to display.
 * @param {"primary"|"accent"|"green"|"red"|"purple"} tone - Color tone from the design system.
 */
const TONES = {
    primary: {
        bg: "bg-[#EAF3FF]",
        icon: "text-[#0475FB]",
    },
    accent: {
        bg: "bg-[#FFF4E5]",
        icon: "text-[#FFAD4E]",
    },
    green: {
        bg: "bg-[#EAF9EF]",
        icon: "text-[#22C55E]",
    },
    red: {
        bg: "bg-[#FEF0F0]",
        icon: "text-[#EF4444]",
    },
    purple: {
        bg: "bg-[#F2EDFF]",
        icon: "text-[#8B5CF6]",
    },
};

export default function StatCard({ icon: Icon, label, value, tone = "primary" }) {
    const { bg, icon } = TONES[tone] || TONES.primary;

    return (
        <div className="rounded-2xl border border-[#E9EDF4] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                    <Icon size={20} className={icon} strokeWidth={1.8} />
                </div>
                <span className="text-2xl font-bold text-[#172033]">{value}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-[#7B8497]">{label}</p>
        </div>
    );
}