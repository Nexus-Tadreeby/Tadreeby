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
    <div className="flex h-screen w-full overflow-hidden bg-[#F9FAFB] font-sans">
      <Sidebar
        navItems={NAV_ITEMS}
        footerItems={NAV_FOOTER_ITEMS}
        user={user}
        profilePath="/profile"
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-[1186px]">
          {/* Header with search bar and icon cluster */}
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-full max-w-[576px]">
              <Search className="absolute left-[19px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0365FA]" />
              <input
                type="text"
                placeholder="Search universities..."
                className="font-jakarta w-full rounded-full border border-[#C3C5D7] bg-[#F9F9F9] py-[9px] pl-[48px] pr-4 text-[16px] text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:border-[#1677FF] focus:outline-none"
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
              <h1 className="font-inter text-[25px] font-bold text-[#155DFC]">
                Universities
              </h1>
              <p className="font-inter text-[12px] text-[#737686]">
                Manage universities freely.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-md bg-[#1677FF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              <Plus className="h-5 w-5" strokeWidth={2} />
              Add university
            </button>
          </div>

          {/* University cards grid (3 columns) */}
          <div className="grid grid-cols-3 gap-[29px]">
            {universitiesData.map((uni) => (
              <div
                key={uni.id}
                className="relative rounded-xl bg-white p-4 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]"
              >
                {/* Card header: logo placeholder, name, abbreviation, location, status badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* University logo placeholder */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                      <span className="text-sm font-bold">{uni.abbreviation}</span>
                    </div>
                    <div>
                      <h3 className="font-inter text-[15px] font-bold text-black">
                        {uni.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded bg-[#EEF5FF] px-1.5 py-0.5 text-[9px] font-bold text-[#1677FF]">
                          {uni.abbreviation}
                        </span>
                        <span className="text-[10px] text-[#999999]">
                          {uni.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Status badge */}
                  <div
                    className={`flex items-center gap-1 rounded px-2 py-0.5 text-[8px] font-medium ${
                      uni.status === "active"
                        ? "bg-[#EBF8F4] text-[#1E8B3F]"
                        : "bg-[#FFC896] text-[#FF7A00]"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        uni.status === "active" ? "bg-[#1E8B3F]" : "bg-[#FF7A00]"
                      }`}
                    />
                    Active
                  </div>
                </div>

                {/* Stats row: students, admins, supervisors */}
                <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-black">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-gray-500" />
                    <span>{uni.students.toLocaleString()}</span>
                    <span className="font-normal text-[#999999]">Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    <span>{uni.admins}</span>
                    <span className="font-normal text-[#999999]">Admins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-gray-500" />
                    <span>{uni.supervisors}</span>
                    <span className="font-normal text-[#999999]">Supervisors</span>
                  </div>
                </div>

                {/* Overlay for inactive universities (matches Figma) */}
                {uni.status === "inactive" && (
                  <div className="absolute inset-0 rounded-xl bg-white/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}