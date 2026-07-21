import React from "react";
import {
  LayoutDashboard,
  Landmark,
  Building2,
  Users,
  ScanEye,
  Settings,
  Search,
  Plus,
  BriefcaseBusiness,
  CheckCircle2,
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

// ---------- Mock company data ----------
const companiesData = [
  {
    id: 1,
    name: "TechCorp",
    abbreviation: "TC",
    industry: "Software Development",
    location: "Gaza, Palestine",
    employees: 180,
    internships: 16,
    verified: true,
    status: "active",
  },
  {
    id: 2,
    name: "InnovateLab",
    abbreviation: "IL",
    industry: "AI & Data",
    location: "Ramallah, Palestine",
    employees: 92,
    internships: 9,
    verified: true,
    status: "active",
  },
  {
    id: 3,
    name: "BrightWorks",
    abbreviation: "BW",
    industry: "Design & UX",
    location: "Hebron, Palestine",
    employees: 64,
    internships: 5,
    verified: false,
    status: "active",
  },
  {
    id: 4,
    name: "Nexora Studio",
    abbreviation: "NS",
    industry: "Product Engineering",
    location: "Gaza, Palestine",
    employees: 48,
    internships: 3,
    verified: false,
    status: "inactive",
  },
  {
    id: 5,
    name: "BlueWave",
    abbreviation: "BW",
    industry: "Cloud Solutions",
    location: "Nablus, Palestine",
    employees: 120,
    internships: 12,
    verified: true,
    status: "active",
  },
  {
    id: 6,
    name: "Apex Systems",
    abbreviation: "AS",
    industry: "Cybersecurity",
    location: "Bethlehem, Palestine",
    employees: 75,
    internships: 7,
    verified: true,
    status: "active",
  },
];

// ---------- Main Component ----------
export default function Companies() {
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
                placeholder="Search companies..."
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

          {/* Page title and button */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-inter text-[25px] font-bold text-[#155DFC]">
                Companies
              </h1>
              <p className="font-inter text-[12px] text-[#737686]">
                Manage companies freely.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-md bg-[#1677FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              <Plus className="h-5 w-5" strokeWidth={2} />
              Add company
            </button>
          </div>

          {/* Company cards grid */}
          <div className="grid grid-cols-3 gap-[29px]">
            {companiesData.map((company) => (
              <div
                key={company.id}
                className="relative rounded-xl bg-white p-4 shadow-[0_4px_8px_1px_rgba(219,234,254,0.7)]"
              >
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                      <span className="text-sm font-bold">{company.abbreviation}</span>
                    </div>
                    <div>
                      <h3 className="font-inter text-[15px] font-bold text-black">
                        {company.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded bg-[#EEF5FF] px-1.5 py-0.5 text-[9px] font-bold text-[#1677FF]">
                          {company.industry}
                        </span>
                        <span className="text-[10px] text-[#999999]">
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1 rounded px-2 py-0.5 text-[8px] font-medium ${
                      company.status === "active"
                        ? "bg-[#EBF8F4] text-[#1E8B3F]"
                        : "bg-[#FFC896] text-[#FF7A00]"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        company.status === "active" ? "bg-[#1E8B3F]" : "bg-[#FF7A00]"
                      }`}
                    />
                    {company.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-black">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    <span>{company.employees.toLocaleString()}</span>
                    <span className="font-normal text-[#999999]">Employees</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-gray-500" />
                    <span>{company.internships}</span>
                    <span className="font-normal text-[#999999]">Internships</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gray-500" />
                    <span>{company.verified ? "Verified" : "Pending"}</span>
                  </div>
                </div>

                {/* Overlay for inactive companies */}
                {company.status === "inactive" && (
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
