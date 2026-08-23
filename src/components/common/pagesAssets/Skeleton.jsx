import React from "react";

/**
 * SkeletonText
 * @param {string} className
 */
export const SkeletonText = ({ className = "h-3 w-3/4" }) => (
    <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

/**
 * SkeletonCircle 
 * @param {string} className 
 */
export const SkeletonCircle = ({ className = "h-12 w-12" }) => (
    <div className={`animate-pulse rounded-full bg-gray-200 ${className}`} />
);

/**
 * SkeletonRect
 * @param {string} className 
 */
export const SkeletonRect = ({ className = "h-10 w-full" }) => (
    <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

/**
 * SkeletonButton 
 * @param {string} className 
 */
export const SkeletonButton = ({ className = "h-10 w-24" }) => (
    <div className={`animate-pulse rounded-full bg-gray-200 ${className}`} />
);

/**
 * SkeletonCard 
 */
export const SkeletonCard = ({ children, className = "" }) => (
    <div className={`rounded-2xl border border-gray-200/80 bg-white shadow-[0_2px_12px_rgba(20,35,60,0.04)] ${className}`}>
        {children}
    </div>
);

/**
 * SkeletonAvatar
 * @param {string} className 
 */
export const SkeletonAvatar = ({ className = "h-24 w-24 rounded-2xl" }) => (
    <div className={`animate-pulse bg-gray-200 border-4 border-white shadow-lg ${className}`} />
);

/**
 * SkeletonBadge
 */
export const SkeletonBadge = ({ className = "h-5 w-16" }) => (
    <div className={`animate-pulse rounded-full bg-gray-200 ${className}`} />
);



/**
 * SkeletonProfileHeader
 */
export const SkeletonProfileHeader = () => (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(20,35,60,0.06)]">
        <div className="relative h-[140px] overflow-hidden bg-gradient-to-r from-blue-100/20 via-blue-200/20 to-orange-100/20 sm:h-[160px]" />
        <div className="relative px-5 pb-5 sm:px-7">
            <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex min-w-0 items-end gap-4">
                    <SkeletonAvatar className="h-24 w-24 rounded-2xl sm:h-28 sm:w-28" />
                    <div className="min-w-0 pb-1">
                        <SkeletonText className="h-6 w-40" />
                        <SkeletonText className="mt-1 h-4 w-32" />
                        <div className="mt-2 flex items-center gap-2">
                            <SkeletonBadge className="h-5 w-24" />
                            <SkeletonText className="h-4 w-32" />
                        </div>
                    </div>
                </div>
                <SkeletonButton className="h-8 w-24 rounded-xl" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="px-2">
                        <SkeletonText className="h-3 w-16" />
                        <SkeletonText className="mt-1 h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/**
 * SkeletonPersonalInfoCard 
 */
export const SkeletonPersonalInfoCard = () => (
    <SkeletonCard>
        <div className="border-b border-gray-100 px-6 py-5">
            <SkeletonText className="h-4 w-24" />
            <SkeletonText className="mt-2 h-6 w-40" />
            <SkeletonText className="mt-1 h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
            {[...Array(10)].map((_, i) => (
                <div key={i}>
                    <SkeletonText className="h-3 w-20" />
                    <SkeletonRect className="mt-1.5 h-10 rounded-xl" />
                </div>
            ))}
        </div>
    </SkeletonCard>
);

/**
 * SkeletonDocumentsCard 
 */
export const SkeletonDocumentsCard = () => (
    <SkeletonCard className="h-full">
        <div className="border-b border-gray-100 px-6 py-5">
            <SkeletonText className="h-4 w-24" />
            <SkeletonText className="mt-2 h-6 w-32" />
            <SkeletonText className="mt-1 h-4 w-48" />
        </div>
        <div className="space-y-3 p-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                        <SkeletonRect className="h-10 w-10 rounded-xl" />
                        <div>
                            <SkeletonText className="h-4 w-24" />
                            <SkeletonText className="mt-1 h-3 w-32" />
                        </div>
                    </div>
                    <SkeletonBadge className="h-5 w-16" />
                </div>
            ))}
        </div>
    </SkeletonCard>
);

/**
 * SkeletonSkillsCard 
 */
export const SkeletonSkillsCard = () => (
    <SkeletonCard className="h-full">
        <div className="border-b border-gray-100 px-6 py-5">
            <SkeletonText className="h-4 w-24" />
            <SkeletonText className="mt-2 h-6 w-32" />
            <SkeletonText className="mt-1 h-4 w-48" />
        </div>
        <div className="p-6">
            <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                    <SkeletonBadge key={i} className="h-6 w-16 rounded-lg" />
                ))}
            </div>
            <div className="mt-5 flex gap-2">
                <SkeletonRect className="h-10 flex-1 rounded-xl" />
                <SkeletonButton className="h-10 w-20 rounded-xl" />
            </div>
        </div>
    </SkeletonCard>
);

/**
 * SkeletonCompletionChecklist
 */
export const SkeletonCompletionChecklist = () => (
    <SkeletonCard>
        <div className="border-b border-gray-100 bg-gray-50/60 px-5 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <SkeletonText className="h-3 w-24" />
                    <SkeletonText className="mt-1 h-5 w-32" />
                </div>
                <SkeletonCircle className="h-16 w-16" />
            </div>
            <SkeletonText className="mt-2 h-4 w-48" />
        </div>
        <ul className="space-y-1.5 p-4">
            {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-center gap-2.5 px-2.5 py-2">
                    <SkeletonCircle className="h-4 w-4" />
                    <SkeletonText className="h-4 flex-1" />
                </li>
            ))}
        </ul>
    </SkeletonCard>
);

/**
 * SkeletonProfilePreview 
 */
export const SkeletonProfilePreview = () => (
    <SkeletonCard>
        <div className="border-b border-gray-100 px-6 py-5">
            <SkeletonText className="h-4 w-24" />
            <SkeletonText className="mt-2 h-6 w-40" />
            <SkeletonText className="mt-1 h-4 w-56" />
        </div>
        <div className="p-5">
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <div className="flex items-center gap-3">
                    <SkeletonCircle className="h-12 w-12 rounded-xl" />
                    <div>
                        <SkeletonText className="h-4 w-32" />
                        <SkeletonText className="mt-1 h-3 w-24" />
                    </div>
                </div>
                <div className="mt-3 flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                        <SkeletonBadge key={i} className="h-6 w-16 rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    </SkeletonCard>
);

/**
 * SkeletonAccountStatus 
 */
export const SkeletonAccountStatus = () => (
    <SkeletonCard>
        <div className="border-b border-gray-100 px-5 py-4">
            <SkeletonText className="h-3 w-24" />
            <SkeletonText className="mt-1 h-5 w-32" />
        </div>
        <div className="space-y-3 p-5">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <SkeletonCircle className="h-9 w-9 rounded-xl" />
                    <div>
                        <SkeletonText className="h-4 w-20" />
                        <SkeletonText className="h-3 w-32" />
                    </div>
                </div>
            ))}
        </div>
    </SkeletonCard>
);

/**
 * SkeletonTabNav
 */
export const SkeletonTabNav = () => (
    <div className="mt-5 flex gap-6 border-b border-gray-200">
        {["Overview", "Personal Info", "Documents & Skills"].map((_, i) => (
            <SkeletonText key={i} className="h-8 w-24" />
        ))}
    </div>
);

/**
 * SkeletonVerificationStatus 
 */
export const SkeletonVerificationStatus = () => (
    <SkeletonCard>
        <div className="border-b border-gray-100 bg-gray-50/60 px-6 py-4">
            <div className="flex items-start gap-3">
                <SkeletonCircle className="h-9 w-9 rounded-xl" />
                <div>
                    <SkeletonText className="h-5 w-48" />
                    <SkeletonText className="mt-1 h-4 w-64" />
                </div>
            </div>
        </div>
    </SkeletonCard>
);

// ============================================================
// Dashboard-specific Skeleton components
// ============================================================

export const SkeletonWelcomeHeader = () => (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
            <SkeletonText className="h-3 w-24" />
            <SkeletonText className="mt-2 h-8 w-64" />
            <SkeletonText className="mt-1.5 h-4 w-48" />
        </div>
        <div className="flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
            <div className="flex items-center gap-2 rounded-full border bg-white py-1.5 pl-1.5 pr-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                <SkeletonText className="h-3 w-16" />
            </div>
        </div>
    </div>
);

export const SkeletonBanner = () => (
    <div className="relative overflow-hidden rounded-[22px] p-5 sm:p-6" style={{ background: "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)" }}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/20" />
                <div>
                    <SkeletonText className="h-3 w-32 bg-white/30" />
                    <SkeletonText className="mt-1 h-6 w-48 bg-white/30" />
                    <SkeletonText className="mt-1 h-3 w-36 bg-white/30" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <SkeletonText className="h-4 w-20 bg-white/30" />
                <div className="h-10 w-24 animate-pulse rounded-full bg-white/30" />
            </div>
        </div>
    </div>
);

export const SkeletonStatCard = () => (
    <div className="rounded-[18px] border bg-white p-4" style={{ borderColor: "#E9EDF4" }}>
        <div className="flex items-start justify-between">
            <div className="h-9 w-9 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
        </div>
        <SkeletonText className="mt-3 h-3 w-16" />
        <SkeletonText className="mt-0.5 h-6 w-20" />
        <SkeletonText className="mt-1 h-3 w-24" />
    </div>
);

export const SkeletonCalendar = () => (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: "#E9EDF4" }}>
        <div className="flex items-center justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
                    <SkeletonText className="h-4 w-24" />
                </div>
                <SkeletonText className="mt-1 h-3 w-32" />
            </div>
            <SkeletonText className="h-6 w-20" />
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1.5">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            ))}
            {[...Array(28)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-200" />
            ))}
        </div>
    </div>
);

export const SkeletonChart = () => (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: "#E9EDF4" }}>
        <div className="flex items-center justify-between">
            <div>
                <SkeletonText className="h-4 w-24" />
                <SkeletonText className="mt-1 h-3 w-32" />
            </div>
            <SkeletonText className="h-6 w-20" />
        </div>
        <div className="mt-5 flex h-[150px] items-end justify-between gap-2">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="flex-1">
                    <div className="h-16 w-full animate-pulse rounded-t bg-gray-200" />
                </div>
            ))}
        </div>
    </div>
);

export const SkeletonAICard = () => (
    <div className="rounded-[20px] p-5" style={{ background: "linear-gradient(145deg, #102B4F 0%, #123E70 60%, #0475FB 140%)" }}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-white/20" />
                <div>
                    <SkeletonText className="h-4 w-32 bg-white/30" />
                    <SkeletonText className="h-3 w-24 bg-white/30" />
                </div>
            </div>
            <div className="h-5 w-5 animate-pulse rounded-full bg-white/20" />
        </div>
        <div className="mt-6 flex items-center gap-5">
            <div className="h-[92px] w-[92px] animate-pulse rounded-full bg-white/20" />
            <div className="flex-1">
                <SkeletonText className="h-4 w-24 bg-white/30" />
                <SkeletonText className="mt-2 h-3 w-full bg-white/30" />
            </div>
        </div>
    </div>
);

export const SkeletonAssignments = () => (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: "#E9EDF4" }}>
        <div className="flex items-center justify-between">
            <div>
                <SkeletonText className="h-4 w-24" />
                <SkeletonText className="mt-1 h-3 w-32" />
            </div>
            <SkeletonText className="h-4 w-16" />
        </div>
        {[...Array(3)].map((_, i) => (
            <div key={i} className="mt-3 flex items-center gap-3 rounded-xl p-2.5">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-gray-200" />
                <div className="flex-1">
                    <SkeletonText className="h-3 w-3/4" />
                    <SkeletonText className="mt-1 h-2 w-1/2" />
                </div>
                <SkeletonText className="h-5 w-16" />
            </div>
        ))}
    </div>
);

export const SkeletonSchedule = () => (
    <div className="rounded-[20px] border bg-white p-5" style={{ borderColor: "#E9EDF4" }}>
        <div className="flex items-center justify-between">
            <div>
                <SkeletonText className="h-4 w-24" />
                <SkeletonText className="mt-1 h-3 w-32" />
            </div>
            <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
        </div>
        {[...Array(4)].map((_, i) => (
            <div key={i} className="mt-2 flex items-center gap-3 py-2">
                <SkeletonText className="h-3 w-8" />
                <div className="h-8 w-8 animate-pulse rounded-xl bg-gray-200" />
                <div className="flex-1">
                    <SkeletonText className="h-3 w-1/2" />
                    <SkeletonText className="mt-1 h-2 w-1/3" />
                </div>
            </div>
        ))}
    </div>
);