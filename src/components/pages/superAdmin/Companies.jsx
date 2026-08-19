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
                placeholder="Search companies..."
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

          {/* Page title and button */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-['Inter'] text-[26px] font-extrabold text-gray-900 tracking-tight">
                Companies
              </h1>
              <p className="font-['Inter'] text-[13px] font-medium text-gray-500">
                Manage partner companies and training providers.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-[#FD761A] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(253,118,26,0.3)] hover:bg-orange-600 hover:shadow-[0_6px_20px_rgba(253,118,26,0.4)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
              Add Company
            </button>
          </div>

          {/* Company cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companiesData.map((company) => (
              <div
                key={company.id}
                className="relative rounded-2xl bg-white/90 backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-blue-600/5 hover-lift transition-all duration-300 hover:shadow-[0_8px_30px_rgba(253,118,26,0.12)]"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/60 border border-orange-200/50 text-[#FD761A] shadow-sm font-['Inter'] font-extrabold text-sm">
                      {company.abbreviation}
                    </div>
                    <div>
                      <h3 className="font-['Inter'] text-[15px] font-extrabold text-gray-900 leading-tight">
                        {company.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#FD761A] border border-orange-100">
                          {company.industry}
                        </span>
                        <span className="text-[11px] font-medium text-gray-400">
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      company.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        company.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    {company.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-800 font-['Inter']">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#1677FF]" />
                    <span>{company.employees.toLocaleString()}</span>
                    <span className="font-medium text-gray-400">Employees</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-4 w-4 text-[#FD761A]" />
                    <span>{company.internships}</span>
                    <span className="font-medium text-gray-400">Internships</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className={`h-4 w-4 ${company.verified ? "text-emerald-500" : "text-gray-300"}`} />
                    <span className={company.verified ? "text-emerald-700 font-bold" : "text-gray-400 font-medium"}>
                      {company.verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Overlay for inactive companies */}
                {company.status === "inactive" && (
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
