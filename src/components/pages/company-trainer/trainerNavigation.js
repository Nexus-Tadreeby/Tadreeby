import {
  LayoutDashboard,
  Users,
  ClipboardList,
  UserCheck,
  CalendarCheck2,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";

export const trainerNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/company/trainer/dashboard" },
  { label: "Internship Details", icon: BriefcaseBusiness, path: "/company/trainer/internship" },
  { label: "My Trainees", icon: Users, path: "/company/trainer/students" },
  { label: "Tasks", icon: ClipboardList, path: "/company/trainer/tasks" },
  { label: "Applications", icon: UserCheck, path: "/company/trainer/applications" },
  { label: "Attendance", icon: CalendarCheck2, path: "/company/trainer/attendance" },
];

export const trainerNavGroups = [
  { label: "Discovery", items: trainerNavItems.slice(0, 2) },
  { label: "Management", items: trainerNavItems.slice(2) },
];

// Shared trainer sidebar behavior used by every trainer screen.
export const trainerSidebarProps = {
  navGroups: trainerNavGroups,
  footerItems: [
    { label: "Settings", icon: Settings, path: "/company/trainer/settings" },
  ],
  profilePath: "/company/trainer/settings",
  chatPath: "/company/trainer/chat",
  brandPath: "/company/trainer/dashboard",
  storageKey: "sidebar-company-trainer",
};
