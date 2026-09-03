import React from "react";

/**
 * Status pill used for verification/training statuses across the app.
 * @param {"approved"|"pending"|"rejected"} status
 */
const STATUS_STYLES = {
    approved: "bg-[#EAF9EF] text-[#22C55E]",
    pending: "bg-[#FFF4E5] text-[#FFAD4E]",
    rejected: "bg-[#FEF0F0] text-[#EF4444]",
};

const STATUS_LABELS = {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
};

export default function StatusBadge({ status }) {
    const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600";
    const label = STATUS_LABELS[status] ?? status;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
        >
            {label}
        </span>
    );
}