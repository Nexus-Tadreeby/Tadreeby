// src/components/pages/company/CompanyDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  Activity,
  LayoutDashboard,
  Settings,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Sidebar from "../../layout/Sidebar";
import PageHeader from "../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/Button";
import { companyAdminAPI } from "../../../services/api";

// ─── Design Tokens ──────────────────────────────────────────────────
const COLORS = {
  primary: "#0475FB",
  primaryDark: "#035CC9",
  primarySoft: "#EAF3FF",
  accent: "#FFAD4E",
  accentSoft: "#FFF4E5",
  green: "#22C55E",
  greenSoft: "#EAF9EF",
  red: "#EF4444",
  redSoft: "#FEF0F0",
  purple: "#8B5CF6",
  purpleSoft: "#F2EDFF",
  text: "#172033",
  muted: "#7B8497",
  border: "#E9EDF4",
  background: "#F5F7FB",
};

// ─── Navigation ──────────────────────────────────────────────────────
const companyNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/company/dashboard" },
  { label: "Opportunities", icon: Briefcase, path: "/company/opportunities" },
  { label: "Trainers", icon: Users, path: "/company/trainers" },
];
const companyFooterItems = [{ label: "Settings", icon: Settings, path: "/company/settings" }];

// ─── Chart Data (mock, replace with real data later) ──────────────
const chartData = [
  { month: "Jan", students: 15, internships: 3 },
  { month: "Feb", students: 22, internships: 5 },
  { month: "Mar", students: 18, internships: 4 },
  { month: "Apr", students: 30, internships: 7 },
  { month: "May", students: 25, internships: 6 },
  { month: "Jun", students: 35, internships: 8 },
];

// ─── Welcome Header ──────────────────────────────────────────────────
const WelcomeHeader = ({ profile, onAddOpportunity, onAddTrainer }) => {
  const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "Company Admin";
  const firstName = fullName.split(" ")[0];
  const companyName = profile?.company?.name || "Your Company";

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7B8497]">
          Company Dashboard
        </p>
        <h1 className="text-[25px] font-extrabold tracking-[-0.6px] text-[#172033]">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1.5 text-[13px] font-medium text-[#7B8497]">
          {companyName} · Company Admin
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="blue"
          onClick={onAddTrainer}
          className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-bold"
        >
          <Users size={16} strokeWidth={2} />
          Add Trainer
        </Button>
        <Button
          variant="gold"
          onClick={onAddOpportunity}
          className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-bold"
        >
          <Plus size={16} strokeWidth={2} />
          Add Opportunity
        </Button>
      </div>
    </div>
  );
};

// ─── Stats Cards ──────────────────────────────────────────────────────
const DashboardStats = ({ stats }) => {
  const statItems = [
    { icon: Briefcase, label: "Total Opportunities", value: stats.opportunities || 0, color: COLORS.primary, bg: COLORS.primarySoft },
    { icon: Users, label: "Active Internships", value: stats.activeInternships || 0, color: COLORS.green, bg: COLORS.greenSoft },
    { icon: UserCheck, label: "Total Trainees", value: stats.totalTrainees || 0, color: COLORS.purple, bg: COLORS.purpleSoft },
    { icon: UserX, label: "Pending Applications", value: stats.pendingApplications || 0, color: COLORS.accent, bg: COLORS.accentSoft },
    { icon: Users, label: "Trainers", value: stats.trainers || 0, color: COLORS.red, bg: COLORS.redSoft },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
      {statItems.map((item, idx) => (
        <div
          key={idx}
          className="rounded-[18px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ borderColor: COLORS.border }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">{item.label}</p>
              <p className="mt-1 text-[19px] font-extrabold text-[#172033]">{item.value}</p>
            </div>
            <div className="rounded-full p-2" style={{ backgroundColor: item.bg }}>
              <item.icon size={17} strokeWidth={1.8} style={{ color: item.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Chart Component ──────────────────────────────────────────────────
const ChartComponent = ({ data }) => (
  <div className="rounded-[18px] border bg-white p-5 shadow-sm" style={{ borderColor: COLORS.border }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[16px] font-extrabold text-[#172033]">Monthly Training Activity</h3>
      <div className="flex items-center gap-4 text-[11px] text-[#7B8497]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#0475FB]" /> Students
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#FFAD4E]" /> Opportunities
        </span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid stroke="#F0F2F5" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#7B8497" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#7B8497" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E9EDF4", fontSize: "12px" }} />
        <Line type="monotone" dataKey="students" stroke="#0475FB" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="internships" stroke="#FFAD4E" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ─── Opportunity List ──────────────────────────────────────────────────
const OpportunityList = ({ opportunities, onEdit, onDelete }) => (
  <div className="rounded-[18px] border bg-white p-5 shadow-sm" style={{ borderColor: COLORS.border }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[16px] font-extrabold text-[#172033]">Training Opportunities</h3>
      <Button
        variant="blue"
        onClick={onEdit} // reusing onEdit to navigate to create page
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold"
      >
        <Plus size={14} /> New
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {opportunities.map((opp) => (
        <div key={opp.id} className="border border-[#E9EDF4] rounded-xl p-4 hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <h4 className="text-[14px] font-extrabold text-[#172033]">{opp.title}</h4>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${opp.totalSeats > 0 ? "bg-[#EAF9EF] text-[#22C55E]" : "bg-[#FEF0F0] text-[#EF4444]"
                }`}
            >
              {opp.totalSeats > 0 ? `${opp.totalSeats} seats` : "Full"}
            </span>
          </div>
          <div className="mt-2 space-y-1.5 text-[12px] text-[#7B8497]">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} /> {opp.duration || "Flexible"}
            </div>
            <div className="text-[11px] line-clamp-1">Skills: {opp.requiredSkills || "None listed"}</div>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E9EDF4]">
            <button
              onClick={() => onEdit(opp)}
              className="flex items-center gap-1 text-[#0475FB] hover:bg-[#EAF3FF] px-3 py-1.5 rounded-lg text-[12px] font-medium transition"
            >
              <Edit size={14} /> Edit
            </button>
            <button
              onClick={() => onDelete(opp.id)}
              className="flex items-center gap-1 text-[#EF4444] hover:bg-[#FEF0F0] px-3 py-1.5 rounded-lg text-[12px] font-medium transition"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────
export default function CompanyDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({});
  const [opportunities, setOpportunities] = useState([]);

  // ── User for Sidebar ──
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Company Admin";
  const companyUser = {
    name: fullName,
    role: "Company Admin",
    avatar: user?.profileImage || "",
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  // ── Fetch data ──
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [dashboardData, opportunitiesData] = await Promise.all([
        companyAdminAPI.getDashboard(),
        companyAdminAPI.getOpportunities(1, 10),
      ]);
      setStats(dashboardData || {});
      setOpportunities(opportunitiesData?.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Handlers ──
  const handleAddOpportunity = () => navigate("/company/opportunities/create");
  const handleAddTrainer = () => navigate("/company/trainers/create");
  const handleEditOpportunity = (opp) => navigate(`/company/opportunities/${opp.id}/edit`);
  const handleDeleteOpportunity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;
    try {
      await companyAdminAPI.deleteOpportunity(id);
      await fetchData();
    } catch (err) {
      console.error("Failed to delete opportunity:", err);
      alert(err?.message || "Failed to delete opportunity.");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter'] relative">
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

      <Sidebar
        navItems={companyNavItems}
        footerItems={companyFooterItems}
        user={companyUser}
        profilePath="/company/profile"
        onSignOut={handleSignOut}
      />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
          <PageHeader
            loading={loading}
            profile={user}
            fullName={fullName}
            studentUser={companyUser}
            searchValue=""
            onSearchChange={() => { }}
            chatBadge={3}
            notificationBadge={4}
          />

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#F8D5D5] bg-[#FEF7F7] px-4 py-3 text-[10px] text-[#B42318]">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-4">
            <WelcomeHeader
              profile={user}
              onAddOpportunity={handleAddOpportunity}
              onAddTrainer={handleAddTrainer}
            />
          </div>

          <DashboardStats stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            <div className="lg:col-span-2">
              <ChartComponent data={chartData} />
            </div>
            <div
              className="rounded-[18px] p-5 text-white shadow-md flex flex-col justify-between"
              style={{
                background: "linear-gradient(110deg, #0475FB 0%, #176FE0 55%, #0B61C9 100%)",
              }}
            >
              <div>
                <p className="text-[11px] font-medium opacity-80 tracking-wider">Today's Activity</p>
                <p className="text-[23px] font-extrabold mt-1">{stats.pendingApplications || 0} Pending Applications</p>
                <p className="text-[12px] opacity-80 mt-0.5">Awaiting review</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="bg-white/20 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-sm">
                  Quick Review
                </span>
                <span className="bg-white/20 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-sm">
                  Update
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <OpportunityList
              opportunities={opportunities}
              onEdit={handleEditOpportunity}
              onDelete={handleDeleteOpportunity}
            />
          </div>
        </div>
      </main>
    </div>
  );
}