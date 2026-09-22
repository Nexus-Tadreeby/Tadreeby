import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Circle,
  CircleCheck,
  ChevronRight,
  ClipboardList,
  Clock3,
  Download,
  MapPin,
  Users,
} from "lucide-react";
import Sidebar from "../../../layout/Sidebar";
import PageHeader from "../../../common/pagesAssets/PageHeader";
import { useAuth } from "../../../../context/AuthContext";
import { trainerSidebarProps } from "../trainerNavigation";
import { useTrainerInternship } from "./useTrainerInternship";
import {
  Avatar,
  actionClass,
  DetailsDialog,
  InternshipHero,
  MetricsRow,
  Panel,
  TaskCard,
  TechnicalScopeIcon,
} from "./TrainerInternshipDetails.ui";
import {
  dateLabel,
  downloadTextReport,
  fullName,
  humanize,
  uniqueUniversities,
} from "./trainerInternshipDetails.utils";
import "./trainerInternshipDetails.css";

export default function TrainerInternshipDetails() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data, error, loading, retry } = useTrainerInternship();
  if (data) return <InternshipContent key={data.id} internship={data} />;
  return (
    <div className="relative flex h-dvh w-full overflow-hidden font-['Inter']">
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
      <Sidebar
        {...trainerSidebarProps}
        user={{
          name:
            [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
            "Trainer",
          role: "Company Trainer",
          avatar: user?.profileImage || "",
        }}
        onSignOut={() => {
          logout();
          navigate("/login", { replace: true });
        }}
      />
      <main className="relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-7 sm:px-7 lg:px-8">
          <PageHeader
            loading={loading}
            profile={user}
            fullName={
              [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
              "Trainer"
            }
            studentUser={{
              name: "Trainer",
              role: "Company Trainer",
              avatar: user?.profileImage || "",
            }}
            searchValue=""
            onSearchChange={() => {}}
            chatBadge={0}
            notificationBadge={0}
            onChatClick={() => navigate("/company/trainer/chat")}
            onLogout={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          />
          <h1 className="mb-6 text-2xl font-semibold">Internship Details</h1>
          {loading ? (
            <div role="status" className="space-y-6">
              <p>Loading internship details&hellip;</p>
              <div className="h-56 animate-pulse rounded-2xl bg-slate-200" />
              <div className="h-80 animate-pulse rounded-2xl bg-white" />
            </div>
          ) : (
            <div role="alert" className="rounded-2xl bg-white p-6">
              <p>{error}</p>
              <button
                className={`${actionClass} mt-4`}
                onClick={retry}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function InternshipContent({ internship }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [coverFailed, setCoverFailed] = useState(false);
  const [dialog, setDialog] = useState(null);
  const showDetails = (title, items) => setDialog({ title, items });
  const { header, stats, about, overview, students, tasks, capacity } =
    internship;
  const trainerName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    fullName(header.trainer);
  const visibleStudents = students.slice(0, 4);
  const universities = uniqueUniversities(overview.universitySupervisors);
  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };
  const downloadReport = () => downloadTextReport(internship);

  return (
    <div className="trainer-internship relative flex h-dvh w-full overflow-hidden font-['Inter'] text-[#434655]">
      <div className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
      <Sidebar
        {...trainerSidebarProps}
        user={{
          name: trainerName,
          role: "Company Trainer",
          avatar: user?.profileImage || "",
        }}
        onSignOut={signOut}
      />
      <main className="relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
          <PageHeader
            profile={user}
            fullName={trainerName}
            studentUser={{
              name: trainerName,
              role: "Company Trainer",
              avatar: user?.profileImage || "",
            }}
            searchValue=""
            onSearchChange={() => {}}
            chatBadge={0}
            notificationBadge={stats.tasks.needsGrading}
            onChatClick={() => navigate("/company/trainer/chat")}
            onLogout={signOut}
          />
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-medium"
          >
            <Link
              to="/company/trainer/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>
            <ChevronRight size={12} />
            <span aria-current="page" className="text-[#1677FF]">
              Internship Details
            </span>
          </nav>
          <header className="mb-6 flex min-h-[52px] flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-col items-start">
              <div className="flex min-h-8 flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold leading-8 tracking-[-0.6px] text-[#0B1C30]">
                  Internship Details
                </h1>
                <span
                  className={`inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-[11px] font-semibold leading-[14px] tracking-[0.33px] capitalize ${internship.status === "ACTIVE" ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]" : "border-slate-200 bg-slate-50 text-slate-600"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${internship.status === "ACTIVE" ? "bg-[#10B981]" : "bg-slate-400"}`}
                  />
                  {humanize(internship.status)}
                </span>
              </div>
              <p className="mt-0.5 max-w-[649px] text-[13px] leading-[18px] text-[#434655]">
                {header.subtitle}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-[34px] w-[157px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-normal leading-[18px] text-[#0B1C30] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:bg-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004AC6]"
              onClick={downloadReport}
            >
              <Download size={12} className="shrink-0 text-[#004AC6]" aria-hidden="true" />
              Internship Report
            </button>
          </header>

          <InternshipHero
            header={header}
            overview={overview}
            capacity={capacity}
            coverFailed={coverFailed}
            onCoverError={() => setCoverFailed(true)}
          />
          <MetricsRow stats={stats} />

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,632fr)_minmax(0,304fr)]">
            <div className="min-w-0 space-y-6">
              <Panel
                title="About This Internship & Technical Scope"
                className="technical-scope-card"
                subtitle="Explore the training program, target technologies, and key learning objectives."
                icon={TechnicalScopeIcon}
                action={
                  <span className="engineering-badge">Engineering Track</span>
                }
              >
                <p className="technical-scope-description">
                  {about.description}
                </p>
                <h3 className="technical-scope-label technology-label">
                  Target Technologies & Tooling
                </h3>
                <div className="technology-tags">
                  {about.techStack.map((tech) => (
                    <span key={tech} className="technology-tag">
                      <span className="technology-tag-dot" aria-hidden="true" />
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="technical-scope-label objectives-label">
                  Key Learning Objectives & Competencies
                </h3>
                <div className="learning-objectives">
                  {about.learningObjectives.map((objective) => (
                    <div key={objective.title} className="learning-objective">
                      <span
                        className="learning-objective-check"
                        aria-hidden="true"
                      >
                        <Check />
                      </span>
                      <div className="learning-objective-copy">
                        <h4>{objective.title}</h4>
                        <p>{objective.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
              <TaskCard
                tasks={tasks}
                capacity={capacity}
                students={students}
                onAction={showDetails}
              />
              <section className="curriculum-card" aria-labelledby="curriculum-heading">
                <header className="curriculum-heading">
                  <div>
                    <h2 id="curriculum-heading">Curriculum Syllabus & Competencies</h2>
                    <p>Explore the technologies and skills covered in this internship.</p>
                  </div>
                  <button type="button" className="curriculum-action" onClick={() => showDetails("Curriculum Syllabus", about.learningObjectives.map((objective) => ({ title: objective.title, description: objective.description })))}>
                    <ClipboardList size={14} aria-hidden="true" />View syllabus
                  </button>
                </header>
                <div className="curriculum-tags">
                  {about.techStack.map((tech) => (
                    <span className="curriculum-tag" key={tech}>
                      <span className="curriculum-dot" aria-hidden="true" />
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="curriculum-outcomes">
                  {about.competencies.map((competency) => {
                    const title = typeof competency === "string" ? competency : competency.title;
                    const completed = typeof competency === "object" ? competency.completed : undefined;
                    const StatusIcon = completed === true ? CircleCheck : Circle;
                    return (
                      <li key={competency.id ?? title} data-completed={completed === true}>
                        <StatusIcon size={15} aria-hidden="true" />
                        <span>
                          <span className="sr-only">{completed === true ? "Completed: " : completed === false ? "Not completed: " : "Completion status unavailable: "}</span>
                          {title}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
              <Panel
                title="Training Logistics & Physical Schedule"
                subtitle="Training attendance, working hours, facilities, and academic partners."
                className="logistics-card"
                icon={MapPin}
              >
                <div className="logistics-grid">
                  <div>
                    <h3>Attendance & Check-in Model</h3>
                    <h4>On-Site Lab + QR Verification</h4>
                    <p>
                      Daily morning QR check-in between 08:45 &ndash; 09:15 AM. 90%
                      attendance minimum required for university credit
                      eligibility.
                    </p>
                  </div>
                  <div>
                    <h3>Working Schedule & Hours</h3>
                    <h4>{overview.totalDuration.workingDays}</h4>
                    <p>
                      {overview.totalDuration.hoursPerWeek} hours per week.
                      09:00 AM &ndash; 03:00 PM EET daily. Friday and Saturday
                      reserved for asynchronous reading and independent project
                      catch-up.
                    </p>
                  </div>
                  <div>
                    <h3>Designated Physical Facility</h3>
                    <h4>{overview.trainingVenue.name}</h4>
                    <p>
                      {overview.trainingVenue.address}. Equipped with
                      dual-monitor workstations, high-speed fiber backhaul, and
                      gigabit LAN.
                    </p>
                  </div>
                  <div>
                    <h3>University Academic Partnerships</h3>
                    <h4>{universities.length} Partner Institutions</h4>
                    <div className="logistics-partners">
                      {universities.map((university) => <span key={university.id}>{university.name}</span>)}
                    </div>
                  </div>
                </div>
                <a
                  className="facility-map"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(overview.trainingVenue.address)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="facility-map-footer">
                    <span className="facility-map-location"><MapPin size={20} aria-hidden="true" />{overview.trainingVenue.name}</span>
                    <span className="map-button">View on Google Maps <ArrowUpRight size={12} aria-hidden="true" /></span>
                  </span>
                </a>
              </Panel>
            </div>

            <aside className="min-w-0 space-y-6">
              <section
                className="internship-overview"
                aria-labelledby="internship-overview-title"
              >
                <header className="overview-heading">
                  <h2 id="internship-overview-title">Internship Overview</h2>
                  <details className="overview-menu">
                    <summary aria-label="Internship overview options">
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="3"
                        viewBox="0 0 12 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5 3C1.0875 3 0.734375 2.85313 0.440625 2.55938C0.146875
                           2.26562 0 1.9125 0 1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0C1.9125 0 2.26562 0.146875 2.55938 0.440625C2.85313 0.734375 3 1.0875 3 1.5C3 1.9125 2.85313 2.26562 2.55938 2.55938C2.26562 2.85313 1.9125 3 1.5 3ZM6 3C5.5875 3 5.23438 2.85313 4.94063 2.55938C4.64688 2.26562 4.5 1.9125
                           4.5 1.5C4.5 1.0875 4.64688 0.734375 4.94063 0.440625C5.23438 0.146875 5.5875 0 6 0C6.4125 0 6.76562 0.146875 7.05937 0.440625C7.35312 0.734375 7.5 1.0875 7.5 1.5C7.5 1.9125 7.35312 2.26562 7.05937 2.55938C6.76562 2.85313 6.4125 3 6 3ZM10.5 3C10.0875 3 9.73438 2.85313 9.44063 2.55938C9.14688 2.26562 9
                           1.9125 9 1.5C9 1.0875 9.14688 0.734375 9.44063 0.440625C9.73438 0.146875 10.0875 0 10.5 0C10.9125 0 11.2656 0.146875 11.5594 0.440625C11.8531 0.734375 12 1.0875 12 1.5C12 1.9125 11.8531 2.26562 11.5594 2.55938C11.2656 2.85313 10.9125 3 10.5 3Z"
                          fill="#737686"
                        />
                      </svg>
                    </summary>
                    <button
                      type="button"
                      onClick={(event) => {
                        downloadReport();
                        event.currentTarget.closest("details").open = false;
                      }}
                    >
                      Download report
                    </button>
                  </details>
                </header>
                <dl className="overview-rows">
                  <div className="overview-row">
                    <span className="overview-icon" aria-hidden="true">
                      <CalendarDays />
                    </span>
                    <div className="overview-copy">
                      <dt>Training Period</dt>
                      <dd className="overview-value">
                        {new Date(
                          overview.trainingPeriod.startDate,
                        ).toLocaleDateString("en", {
                          month: "short",
                          day: "numeric",
                          timeZone: "UTC",
                        })}{" "}
                        &ndash; {dateLabel(overview.trainingPeriod.endDate)}
                      </dd>
                      <dd className="overview-detail overview-remaining">
                        {overview.trainingPeriod.weeksRemaining} weeks remaining
                      </dd>
                    </div>
                  </div>
                  <div className="overview-row">
                    <span className="overview-icon" aria-hidden="true">
                      <Clock3 />
                    </span>
                    <div className="overview-copy">
                      <dt>Training Hours</dt>
                      <dd className="overview-value">
                        {overview.totalDuration.hours} Hours Program
                      </dd>
                      <dd className="overview-detail">
                        {overview.totalDuration.hoursPerWeek} hrs/week &middot;{" "}
                        {overview.totalDuration.workingDays}
                      </dd>
                    </div>
                  </div>
                  <div className="overview-row">
                    <span className="overview-icon" aria-hidden="true">
                      <MapPin />
                    </span>
                    <div className="overview-copy">
                      <dt>Training Venue</dt>
                      <dd className="overview-value">
                        {overview.trainingVenue.name}
                      </dd>
                      <dd className="overview-detail">
                        {overview.trainingVenue.address}
                      </dd>
                    </div>
                  </div>
                  <div className="overview-row">
                    <span className="overview-icon" aria-hidden="true">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 13.3333V7.5H4.16667V13.3333H2.5ZM7.5 13.3333V7.5H9.16667V13.3333H7.5ZM0 16.6667V15H16.6667V16.6667H0ZM12.5 13.3333V7.5H14.1667V13.3333H12.5ZM0 5.83333V4.16667L8.33333 0L16.6667 4.16667V5.83333H0ZM3.70833 4.16667H8.33333H12.9583H3.70833ZM3.70833 4.16667H12.9583L8.33333 1.875L3.70833 4.16667Z"
                          fill="#004AC6"
                        />
                      </svg>
                    </span>
                    <div className="overview-copy">
                      <dt>Academic Partners</dt>
                      <dd className="overview-value">
                        {universities.length} Universities
                      </dd>
                      <dd className="overview-detail">
                        {universities
                          .map(
                            (university) =>
                              `${university.shortCode?.toUpperCase() || university.name} (${students.filter((student) => student.university.id === university.id).length})`,
                          )
                          .join(" \u00B7 ")}
                      </dd>
                    </div>
                  </div>
                </dl>
              </section>
              <section
                className="supervisor-widget"
                aria-labelledby="supervisor-widget-title"
              >
                <h2 id="supervisor-widget-title">University Supervisors</h2>
                {overview.universitySupervisors.map((assignment) => (
                  <div key={assignment.id} className="supervisor-row">
                    <Avatar person={assignment.supervisor} supervisor />
                    <div className="supervisor-copy">
                      <h3>{fullName(assignment.supervisor)}</h3>
                      <p className="supervisor-department">
                        {assignment.supervisor.supervisorProfile?.department}
                      </p>
                      <p className="supervisor-role">
                        {assignment.assignmentRole}
                      </p>
                    </div>
                  </div>
                ))}
                {!overview.universitySupervisors.length && (
                  <p className="supervisor-department">
                    No university supervisors assigned yet.
                  </p>
                )}
                <button
                  type="button"
                  className="supervisor-details-button"
                  disabled={!overview.universitySupervisors.length}
                  onClick={() =>
                    showDetails("Message Academic Supervisor", [
                      {
                        title: "Messaging is not available yet",
                        description:
                          "Academic supervisor messaging has not been connected yet.",
                      },
                    ])
                  }
                >
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M0 15V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12H3L0 15ZM2.3625 10.5H13.5V1.5H1.5V11.3438L2.3625 10.5ZM1.5 10.5V1.5V10.5Z"
                      fill="#004AC6"
                    />
                  </svg>
                  Message Academic Supervisor
                </button>
              </section>
              <section
                className="trainee-roster"
                aria-labelledby="trainee-roster-title"
              >
                <header className="trainee-roster-heading">
                  <h2 id="trainee-roster-title">
                    Internship Trainees ({capacity.enrolledCount})
                  </h2>
                  <button
                    type="button"
                    className="internship-text-action"
                    onClick={() =>
                      showDetails(
                        "Internship Trainees",
                        students.map((student) => ({
                          title: fullName(student),
                          description: student.university.name,
                          detail: `${student.attendanceRate}% attendance \u00B7 ${student.status}`,
                        })),
                      )
                    }
                  >
                    View all
                  </button>
                </header>
                <div className="trainee-roster-list">
                  {visibleStudents.map((student) => (
                    <div
                      key={student.id}
                      className="trainee-roster-row"
                      data-status={student.status
                        ?.toLowerCase()
                        .replaceAll("_", " ")}
                    >
                      <div className="trainee-roster-person">
                        <Avatar
                          person={student}
                          className="trainee-roster-avatar"
                        />
                        <div className="trainee-roster-copy">
                          <h3>{fullName(student)}</h3>
                          <p>{student.university.name}</p>
                        </div>
                      </div>
                      <span className="trainee-roster-status">
                        {student.status}
                      </span>
                    </div>
                  ))}
                  {!visibleStudents.length && (
                    <p className="text-xs text-[#737686]">No trainees found.</p>
                  )}
                </div>
              </section>
              <Panel title="Most active trainees last week" icon={Users}>
                <p className="text-[13px] leading-6 text-[#737686]">
                  Weekly trainee activity is not available yet.
                </p>
              </Panel>
            </aside>
          </div>
          <p className="pb-5 pt-8 text-center text-[10px] text-[#9AA2B1]">
            Tadreeby helps you stay on track throughout your field training.
          </p>
        </div>
      </main>
      <DetailsDialog dialog={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}
