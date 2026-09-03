import React from "react";

/**
 * Simple pulse skeleton block. Pass a className to control size/shape.
 */
export default function LoadingSkeleton({ className = "" }) {
    return (
        <div
            className={`animate-pulse rounded-xl bg-[#E9EDF4] ${className}`}
            aria-hidden="true"
        />
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <LoadingSkeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <LoadingSkeleton key={i} className="h-24" />
                ))}
            </div>
            <LoadingSkeleton className="h-72 w-full" />
            <LoadingSkeleton className="h-64 w-full" />
        </div>
    );
}