import React from "react";

/**
 * Lightweight, dependency-free grouped bar chart for the verification
 * trend (approved / pending / rejected per month). Renders with plain
 * divs so it needs no charting library.
 *
 * @param {{month: string, approved: number, pending: number, rejected: number}[]} data
 */
const SERIES = [
    { key: "approved", label: "Approved", color: "bg-[#22C55E]" },
    { key: "pending", label: "Pending", color: "bg-[#FFAD4E]" },
    { key: "rejected", label: "Rejected", color: "bg-[#EF4444]" },
];

export default function VerificationTrendChart({ data }) {
    const maxValue = Math.max(
        1,
        ...data.flatMap((row) => [row.approved, row.pending, row.rejected])
    );

    return (
        <div>
            <div className="flex items-center gap-4">
                {SERIES.map((s) => (
                    <div key={s.key} className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${s.color}`} aria-hidden="true" />
                        <span className="text-xs font-medium text-[#7B8497]">{s.label}</span>
                    </div>
                ))}
            </div>

            <div
                className="mt-6 flex items-end gap-4 sm:gap-6"
                role="img"
                aria-label="Verification requests by month, showing approved, pending and rejected counts"
            >
                {data.map((row) => (
                    <div key={row.month} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex h-40 items-end gap-1">
                            {SERIES.map((s) => {
                                const value = row[s.key];
                                const heightPct = Math.max(4, (value / maxValue) * 100);
                                return (
                                    <div
                                        key={s.key}
                                        className={`w-2.5 rounded-t-md sm:w-3 ${s.color}`}
                                        style={{ height: `${heightPct}%` }}
                                        title={`${s.label}: ${value}`}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-xs font-medium text-[#7B8497]">{row.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}