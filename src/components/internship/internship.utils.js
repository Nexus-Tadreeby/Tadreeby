export const humanize = (value = "") =>
  value.toLowerCase().replaceAll("_", " ");

export const fullName = (person) =>
  `${person?.firstName || ""} ${person?.lastName || ""}`.trim();

export const actionClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#E4E8EF] bg-white px-4 py-2 text-xs font-semibold text-[#1677FF] transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
