import {
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  ClipboardList,
  Clock,
  Landmark,
  LayoutDashboard,
  ListTodo,
  ScanEye,
  Search,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";

const settingsItem = (path) => [{ label: "Settings", icon: Settings, path }];

export const roleNavigation = {
  STUDENT: {
    label: "Student",
    navGroups: [
      {
        label: "Discovery",
        items: [
          { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
          { label: "Opportunities", icon: Search, path: "/student/opportunities" },
        ],
      },
      {
        label: "Management",
        items: [
          { label: "My Internship", icon: BriefcaseBusiness, path: "/student/my-internship" },
          { label: "Attendance", icon: Clock, path: "/attendance" },
          { label: "Tasks", icon: ListTodo, path: "/student/tasks" },
        ],
      },
    ],
    footerItems: settingsItem("/settings"),
    profilePath: "/student/profile",
    internshipPath: "/student/my-internship",
    settingsPath: "/settings",
    chatPath: "/student/chats",
    brandPath: "/student/dashboard",
    storageKey: "sidebar-student",
  },
  COMPANY_TRAINER: {
    label: "Company Trainer",
    navGroups: [
      {
        label: "Discovery",
        items: [
          { label: "Dashboard", icon: LayoutDashboard, path: "/company/trainer/dashboard" },
          { label: "Internship Details", icon: BriefcaseBusiness, path: "/company/trainer/internship" },
        ],
      },
      {
        label: "Management",
        items: [
          { label: "My Trainees", icon: Users, path: "/company/trainer/students" },
          { label: "Tasks", icon: ClipboardList, path: "/company/trainer/tasks" },
          { label: "Applications", icon: UserCheck, path: "/company/trainer/applications" },
          { label: "Attendance", icon: CalendarCheck2, path: "/company/trainer/attendance" },
        ],
      },
    ],
    footerItems: settingsItem("/company/trainer/settings"),
    profilePath: "/company/trainer/settings",
    internshipPath: "/company/trainer/internship",
    chatPath: "/company/trainer/chat",
    brandPath: "/company/trainer/dashboard",
    storageKey: "sidebar-company-trainer",
  },
  COMPANY_ADMIN: {
    label: "Company Admin",
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/company/admin/dashboard" },
      { label: "Opportunities", icon: Briefcase, path: "/company/admin/opportunities" },
      { label: "Trainers", icon: Users, path: "/company/admin/trainers" },
    ],
    footerItems: settingsItem("/company/admin/settings"),
    profilePath: "/company/admin/settings",
    settingsPath: "/company/admin/settings",
    brandPath: "/company/admin/dashboard",
    storageKey: "sidebar-company-admin",
  },
  UNIVERSITY_ADMIN: {
    label: "University Admin",
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/universityAdmin/dashboard" },
    ],
    footerItems: settingsItem("/university-admin/settings"),
    profilePath: "/university-admin/settings",
    settingsPath: "/university-admin/settings",
    brandPath: "/universityAdmin/dashboard",
    storageKey: "sidebar-university-admin",
  },
  SUPER_ADMIN: {
    label: "Super Admin",
    showHeader: false,
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/superAdmin/dashboard" },
      { label: "Universities", icon: Landmark, path: "/superAdmin/universities" },
      { label: "Companies", icon: Building2, path: "/superAdmin/companies" },
      { label: "Users", icon: Users, path: "/users" },
      { label: "System Logs", icon: ScanEye, path: "/logs" },
    ],
    footerItems: settingsItem("/settings"),
    profilePath: "/settings",
    settingsPath: "/settings",
    brandPath: "/superAdmin/dashboard",
    storageKey: "sidebar-super-admin",
  },
};
