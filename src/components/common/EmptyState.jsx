import React from "react";
import { Inbox } from "lucide-react";

/**
 * Generic empty state block.
 * @param {React.ComponentType} icon - Optional Lucide icon component.
 * @param {string} title
 * @param {string} description
 */
export default function EmptyState({ icon: Icon = Inbox, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E9EDF4] bg-[#F5F7FB] px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon size={20} strokeWidth={1.8} className="text-[#7B8497]" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-[#172033]">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-[#7B8497]">{description}</p>
            )}
        </div>
    );
}