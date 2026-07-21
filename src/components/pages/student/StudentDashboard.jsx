import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Clock,
  Settings,
  MessageCircle,
  Search,
  Cloud,
  Sparkles,
  TrendingUp,
  ClipboardList,
  CheckCircle2,
  MoreVertical,
  MessageSquare,
  MapPin,
} from "lucide-react";
import TechCorp from "../../../assets/Temp/TechCorp.jpg";
import UXResearch from "../../../assets/Temp/UXResearch.jpg";
import dataScienceIntern from "../../../assets/Temp/dataScienceIntern.jpg";
import { RocketIcon, InsightsIcon } from "../../common/Icons";
import Sidebar from "../../layout/Sidebar";
import TopIconCluster from "../../common/pagesAssets/TopIconCluster";
import GreetingBanner from "../../common/pagesAssets/GreetingBanner";

// ------------------------------------------------------------
// 1. Student navigation & user data
// ------------------------------------------------------------
const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Internships", icon: Briefcase, path: "/student/internships" },
  { label: "My Internship", icon: GraduationCap, path: "/my/internship" },
  { label: "Attendance", icon: Clock, path: "/attendance" },
];

const studentFooterItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

const studentUser = {
  name: "Afnan Kullab",
  role: "Student",
  avatar: "",
};

// ------------------------------------------------------------
// 3. Smart Action Center
// ------------------------------------------------------------
const SmartActionCenter = () => (
  <div className="flex w-full items-center justify-between rounded-xl border border-[rgba(0,63,177,0.2)] bg-[linear-gradient(90deg,rgba(195,200,213,0.35)_0%,rgba(218,226,255,0.35)_100%)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A56DB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <RocketIcon className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col gap-1">
      </div>
      <div>
        <p className="font-jakarta text-base text-[#1A56DB]">
          3 action items need your attention
        </p>
        <p className="font-jakarta text-base text-[#434654]">
          Complete these to stay on track
        </p>
      </div>
    </div>
    <button className="rounded-[50px] bg-[#1A56DB] px-8 py-4 font-jakarta text-base text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition hover:bg-[#1646b0]">
      Take Action
    </button>
  </div>
);

// ------------------------------------------------------------
// 4. Metric Card (reusable)
// ------------------------------------------------------------
const MetricCard = ({
  icon: Icon,
  iconColor,
  iconBg,
  badgeText,
  badgeColor,
  badgeBg,
  label,
  value,
  subtext,
  progress,
}) => (
  <div className="flex flex-1 flex-col rounded-xl border border-[rgba(195,197,215,0.3)] bg-white p-4 pb-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
    <div className="flex items-center justify-between">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-4 w-4" style={{ color: iconColor }} strokeWidth={2} />
      </div>
      <span
        className="rounded-full px-2 py-0.5 font-jakarta text-[12px] font-bold leading-4"
        style={{ backgroundColor: badgeBg, color: badgeColor }}
      >
        {badgeText}
      </span>
    </div>

    <p className="mt-3 font-jakarta text-base text-[#434654]">{label}</p>
    <p className="font-jakarta text-base text-[#151C27]">{value}</p>

    {progress != null ? (
      <div className="mt-5 h-2 w-full rounded-full bg-[#E2E8F8]">
        <div
          className="h-2 rounded-full bg-[#1A56DB]"
          style={{ width: `${progress}%` }}
        />
      </div>
    ) : (
      <p className="mt-5 font-jakarta text-[12px] font-medium text-[#434654]">
        {subtext}
      </p>
    )}
  </div>
);

// ------------------------------------------------------------
// 5. Recommendation Card (reusable)
// ------------------------------------------------------------
const RecommendationCard = ({
  title,
  meta,
  tags,
  badgeText,
  badgeBg,
  image,
}) => (
  <div className="min-w-[160px] flex-1 basis-[200px] rounded-xl border border-[rgba(195,197,215,0.3)] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
    <div className="relative m-[17px] mb-0 h-32 overflow-hidden rounded-lg bg-[#E7EEFE]">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
      <span
        className="absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-1 font-jakarta text-[10px] font-bold leading-[15px] text-white"
        style={{ backgroundColor: badgeBg }}
      >
        <Sparkles className="h-[11px] w-[11px]" />
        {badgeText}
      </span>
    </div>
    <div className="px-[17px] pb-4 pt-4">
      <h4 className="font-jakarta text-base text-[#151C27]">{title}</h4>
      <p className="mt-1 font-jakarta text-[12px] font-medium text-[#434654]">
        {meta}
      </p>
      <div className="mt-4 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#E2E8F8] px-2 py-0.5 font-jakarta text-[10px] text-[#434654]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ------------------------------------------------------------
// 6. AI Profile Strength Card
// ------------------------------------------------------------
const AIProfileCard = () => (
  <div className="relative w-full overflow-hidden rounded-xl bg-[linear-gradient(180deg,#1A56DB_0%,#1CACFF_100%)] p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-white/30">
          <InsightsIcon className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-jakarta text-base text-[#FFFEED]">AI Insight</h3>
      </div>
      <p className="font-jakarta text-base leading-6 text-white/80">
        Great job! Your profile is at 88% complete. Finish your &quot;Skills&quot;
        section to unlock premium recommendations!
      </p>
      <div className="h-2 w-full rounded-full bg-white/20">
        <div className="h-2 w-[88%] rounded-full bg-white" />
      </div>
      <button className="w-full rounded-[60px] bg-white py-4 font-jakarta text-base text-[#1A56DB] backdrop-blur-[10px] transition hover:bg-blue-50">
        Complete Your Profile
      </button>
    </div>
  </div>
);

// ------------------------------------------------------------
// 7. Activity Feed
// ------------------------------------------------------------
const ACTIVITIES = [
  {
    icon: CheckCircle2,
    iconColor: "#16A34A",
    iconBg: "rgba(34,197,94,0.1)",
    title: "Registration Approved",
    description: "University Admin approved your registration at UP.",
    time: "2 hours ago",
  },
  {
    icon: ClipboardList,
    iconColor: "#1A56DB",
    iconBg: "rgba(0,63,177,0.1)",
    title: "New Task Assigned",
    description:
      '"Project Planning Phase 1" assigned by TAQAT Supervisor.',
    time: "5 hours ago",
  },
  {
    icon: Clock,
    iconColor: "#FD761A",
    iconBg: "rgba(253,118,26,0.1)",
    title: "Deadline Approaching",
    description: "Weekly report submission is due in 48 hours.",
    time: "1 day ago",
  },
  {
    icon: MessageSquare,
    iconColor: "#434654",
    iconBg: "#E2E8F8",
    title: "New Message",
    description:
      "Sarah from Designly sent you a message about your application.",
    time: "2 days ago",
  },
];

const ActivityItem = ({ activity, isLast }) => {
  const Icon = activity.icon;
  return (
    <div className="flex gap-4">
      <div className="relative flex shrink-0 flex-col items-center">
        {!isLast && (
          <span className="absolute top-10 h-[calc(100%+24px-40px)] w-0.5 bg-[#C3C5D7]" />
        )}
        <div
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white"
          style={{ backgroundColor: activity.iconBg }}
        >
          <Icon
            className="h-[17px] w-[17px]"
            style={{ color: activity.iconColor }}
            strokeWidth={2}
          />
        </div>
      </div>
      <div className={`flex-1 ${isLast ? "" : "pb-6"}`}>
        <p className="font-jakarta text-base text-[#151C27]">
          {activity.title}
        </p>
        <p className="mt-1 font-jakarta text-[12px] font-medium leading-4 text-[#434654]">
          {activity.description}
        </p>
        <p className="mt-1 font-jakarta text-[10px] text-[#737686]">
          {activity.time}
        </p>
      </div>
    </div>
  );
};

const ActivityFeed = () => (
  <div className="flex max-h-[600px] w-full flex-col rounded-xl border border-[rgba(195,197,215,0.3)] bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
    <div className="flex items-center justify-between pb-6">
      <h3 className="font-jakarta text-base text-[#151C27]">
        Recent Activity
      </h3>
      <button
        aria-label="More options"
        className="flex h-[30px] w-3 items-center justify-center rounded-full text-[#1A56DB] hover:bg-gray-50"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>

    <div className="flex-1 space-y-0 overflow-y-auto pr-2">
      {ACTIVITIES.map((activity, idx) => (
        <ActivityItem
          key={activity.title}
          activity={activity}
          isLast={idx === ACTIVITIES.length - 1}
        />
      ))}
    </div>

    <button className="mt-6 w-full rounded-[60px] border border-[rgba(0,63,177,0.2)] bg-[#0368FA] py-4 font-jakarta text-base text-white transition hover:bg-[#0257d1]">
      View All Activity
    </button>
  </div>
);

// ------------------------------------------------------------
// 8. Main StudentDashboard Component
// ------------------------------------------------------------
const StudentDashboard = () => {
  const metrics = [
    {
      icon: TrendingUp,
      iconColor: "#1A56DB",
      iconBg: "rgba(0,63,177,0.1)",
      badgeText: "In progress",
      badgeColor: "#1A56DB",
      badgeBg: "#E2E8F8",
      label: "Internship Progress",
      value: "8 of 12 weeks",
      progress: 65,
    },
    {
      icon: ClipboardList,
      iconColor: "#FD761A",
      iconBg: "rgba(253,118,26,0.1)",
      badgeText: "Due Soon",
      badgeColor: "#FD761A",
      badgeBg: "rgba(253,118,26,0.1)",
      label: "Pending Tasks",
      value: "2 Tasks",
      subtext: "1 High Priority Task",
    },
    {
      icon: Briefcase,
      iconColor: "#AD3B00",
      iconBg: "rgba(173,59,0,0.1)",
      badgeText: "Active",
      badgeColor: "#AD3B00",
      badgeBg: "rgba(173,59,0,0.1)",
      label: "Active Applications",
      value: "3 Positions",
      subtext: "2 in interview stage",
    },
    {
      icon: CheckCircle2,
      iconColor: "#16A34A",
      iconBg: "rgba(34,197,94,0.1)",
      badgeText: "On Track",
      badgeColor: "#16A34A",
      badgeBg: "rgba(34,197,94,0.1)",
      label: "Attendance",
      value: "90% Rate",
      subtext: "0 Late arrivals",
    },
  ];

  const recommendations = [
    {
      title: "Frontend Developer",
      meta: "TechCorp • Gaza City",
      tags: ["Remote", "Full-Time"],
      badgeText: "Matched",
      badgeBg: "#1A56DB",
      image: TechCorp,
    },
    {
      title: "UI/UX Designer",
      meta: "Designly • Gaza City",
      tags: ["Design", "Part-Time"],
      badgeText: "Great Match",
      badgeBg: "#1A56DB",
        image: UXResearch,
    },
    {
      title: "Data Engineering Intern",
      meta: "DataFlow • Gaza City",
      tags: ["Hybrid", "Paid"],
      badgeText: "Popular",
      badgeBg: "#FB8A04",
      image: dataScienceIntern,
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F9F9FF] font-sans">
      <Sidebar
        navItems={studentNavItems}
        footerItems={studentFooterItems}
        user={studentUser}
        profilePath="/student/profile"
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-[1186px]">
          {/* Header with search and icons */}
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-full max-w-[576px]">
              <Search className="absolute left-[19px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0365FA]" />
              <input
                type="text"
                placeholder="Search internships or tasks..."
                className="font-jakarta w-full rounded-full border border-[#C3C5D7] bg-[#F9F9F9] py-[9px] pl-[48px] pr-4 text-[16px] text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:border-[#1677FF] focus:outline-none"
              />
            </div>
            <TopIconCluster
              chatBadge={9}
              notificationBadge={5}
              avatarUrl=""
              userName="Afnan Kullab"
            />
          </div>

          {/* Welcome banner */}
          <GreetingBanner name={studentUser.name} />  

          {/* Smart action center */}
          <div className="mt-6">
            <SmartActionCenter />
          </div>

          {/* Two-column grid: metrics/recommendations (left) + AI card/activity (right) */}
          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            {/* Left column */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Metric cards */}
              <div className="flex flex-wrap gap-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              {/* Recommendations */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-jakarta text-base text-[#151C27]">
                    Recommended for You
                  </h2>
                  <button className="font-jakarta text-base text-[#1A56DB] hover:underline">
                    View All Recommendations
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {recommendations.map((rec) => (
                    <RecommendationCard key={rec.title} {...rec} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex w-full flex-col gap-6 lg:w-[304px] lg:shrink-0">
              <AIProfileCard />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;