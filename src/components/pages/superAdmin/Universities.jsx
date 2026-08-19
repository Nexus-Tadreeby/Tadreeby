import React from "react";
import {
  LayoutDashboard,
  Landmark,
  Building2,
  Users,
  ScanEye,
  MessageCircle,
  Settings,
  Search,
  Plus,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import Sidebar from "../../layout/Sidebar";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";

// ---------- Super Admin navigation (shared across pages) ----------
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/superAdmin/dashboard" },
  { label: "Universities", icon: Landmark, path: "/superAdmin/universities" },
  { label: "Companies", icon: Building2, path: "/superAdmin/companies" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "System Logs", icon: ScanEye, path: "/logs" },
];

const NAV_FOOTER_ITEMS = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

const user = {
  name: "Deema Abd Alhady",
  role: "Super Admin",
  avatar: "",
};

// ---------- Mock university data ----------
const universitiesData = [
  {
    id: 1,
    name: "Al Azhar University",
    abbreviation: "AZHU",
    location: "Gaza, Palestine",
    students: 3210,
    admins: 32,
    supervisors: 74,
    status: "active", // 'active' or 'inactive'
  },
  {
    id: 2,
    name: "Islamic University of Gaza",
    abbreviation: "IUG",
    location: "Gaza, Palestine",
    students: 4500,
    admins: 45,
    supervisors: 90,
    status: "active",
  },
  {
    id: 3,
    name: "Palestine University",
    abbreviation: "PU",
    location: "Gaza, Palestine",
    students: 2800,
    admins: 28,
    supervisors: 56,
    status: "active",
  },
  {
    id: 4,
    name: "Al-Aqsa University",
    abbreviation: "AU",
    location: "Gaza, Palestine",
    students: 1900,
    admins: 19,
    supervisors: 38,
    status: "inactive", // this one will have an overlay
  },
  {
    id: 5,
    name: "University of Palestine",
    abbreviation: "UP",
    location: "Gaza, Palestine",
    students: 3500,
    admins: 35,
    supervisors: 70,
    status: "active",
  },
  {
    id: 6,
    name: "Gaza University",
    abbreviation: "GU",
    location: "Gaza, Palestine",
    students: 2100,
    admins: 21,
    supervisors: 42,
    status: "active",
  },
];

// ---------- Main Component ----------
export default function Universities () {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#eef1f8] font-sans">
      <Sidebar
        navItems={NAV_ITEMS}
        footerItems={NAV_FOOTER_ITEMS}
        user={user}
        profilePath="/profile"
      />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 animate-fade-in">
        <div className="mx-auto max-w-[1186px]">
          {/* Header with search bar and icon cluster */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-[576px]">
              <Search className="absolute left-[19px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1677FF]" />
              <input
                type="text"
                placeholder="Search universities..."
                className="w-full rounded-full border border-blue-600/10 bg-white/80 backdrop-blur-md py-[11px] pl-[48px] pr-4 text-[15px] text-[#374151] shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus:border-[#1677FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-['Inter']"
              />
            </div>
            <TopIconCluster
              chatBadge={9}
              notificationBadge={5}
              avatarUrl={user.avatar}
              userName={user.name}
            />
          </div>

          {/* Page title and "Add university" button */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-['Inter'] text-[26px] font-extrabold text-gray-900 tracking-tight">
                Universities
              </h1>
              <p className="font-['Inter'] text-[13px] font-medium text-gray-500">
                Manage affiliated universities and academic institutions.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-[#1677FF] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(22,119,255,0.3)] hover:bg-blue-600 hover:shadow-[0_6px_20px_rgba(22,119,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
              Add University
            </button>
          </div>

          {/* University cards grid (3 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universitiesData.map((uni) => (
              <div
                key={uni.id}
                className="relative rounded-2xl bg-white/90 backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-blue-600/5 hover-lift transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]"
              >
                {/* Card header: logo placeholder, name, abbreviation, location, status badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* University logo placeholder */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-200/50 text-[#1677FF] shadow-sm font-['Inter'] font-extrabold text-sm">
                      {uni.abbreviation}
                    </div>
                    <div>
                      <h3 className="font-['Inter'] text-[15px] font-extrabold text-gray-900 leading-tight">
                        {uni.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1677FF] border border-blue-100">
                          {uni.abbreviation}
                        </span>
                        <span className="text-[11px] font-medium text-gray-400">
                          {uni.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Status badge */}
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      uni.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        uni.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    {uni.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* Stats row: students, admins, supervisors */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-800 font-['Inter']">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-[#1677FF]" />
                    <span>{uni.students.toLocaleString()}</span>
                    <span className="font-medium text-gray-400">Students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#FD761A]" />
                    <span>{uni.admins}</span>
                    <span className="font-medium text-gray-400">Admins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="h-4 w-4 text-emerald-600" />
                    <span>{uni.supervisors}</span>
                    <span className="font-medium text-gray-400">Supervisors</span>
                  </div>
                </div>

                {/* Overlay for inactive universities */}
                {uni.status === "inactive" && (
                  <div className="absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-[1px] pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}