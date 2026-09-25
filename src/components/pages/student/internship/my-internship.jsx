import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  MapPin,
  MessageCircle,
  Ellipsis,
  Play,
  Sparkles,
  UserRound,
} from "lucide-react";
import PageHeader from "../../../common/pagesAssets/PageHeader";
import {
  SkeletonCard,
  SkeletonRect,
  SkeletonText,
} from "../../../common/pagesAssets/Skeleton";
import {
  Avatar,
  InternshipHero,
  Metric,
  Panel,
  ProgressBar,
  TechnicalScopeIcon,
} from "../../../internship/InternshipDetails.ui";
import {
  actionClass,
  fullName,
  humanize,
} from "../../../internship/internship.utils";
import { asList, dateLabel, universityName } from "./studentInternship.utils";
import { useStudentInternship } from "./useStudentInternship";
import "../../../internship/internshipDetails.css";
import "./studentInternship.css";

const percent = (value) => (value === null ? "—" : `${value}%`);
const hours = (value) => (value === null ? "—" : `${value}h`);
const empty = "Details have not been provided yet.";

function InternshipSkeleton() {
  return (
    <div role="status" aria-label="Loading internship" className="space-y-6">
      <span className="sr-only">Loading internship details</span>
      <SkeletonText className="h-8 w-64 max-w-full" />
      <SkeletonCard className="overflow-hidden">
        <SkeletonRect className="h-56 rounded-none" />
        <div className="p-6">
          <SkeletonText className="h-6 w-2/3" />
          <SkeletonText className="mt-3 h-4 w-1/2" />
        </div>
      </SkeletonCard>
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <SkeletonCard key={key} className="p-5">
            <SkeletonText className="h-4 w-24" />
            <SkeletonText className="mt-4 h-8 w-20" />
          </SkeletonCard>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {[0, 1].map((key) => (
          <SkeletonCard key={key} className="h-80 p-6">
            <SkeletonText className="h-5 w-3/4" />
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
}

function ContactCard({ title, people, company, trainer = false }) {
  return (
    <section className={`student-sidebar-card student-contact-card${trainer ? " student-contact-card-trainer" : ""}`} aria-label={title}>
      <h2 className="student-widget-label">{title}</h2>
      {people.length ? <div className="student-contact-list">
        {people.map((person, index) => <div className="student-contact-row" key={person.id ?? index}>
          <Avatar person={person} className={`student-contact-avatar${trainer ? " student-contact-avatar-trainer" : ""}`} />
          <div className="student-contact-copy">
            <h3>{fullName(person) || person.name || "Contact"}</h3>
            {trainer ? <><p className="student-contact-company">{company}</p><p>Trainer</p></> : <>
              {person.department && <p>{person.department}</p>}
              <p className="student-contact-role">{person.role || universityName(person.university) || "University Supervisor"}</p>
            </>}
          </div>
          {trainer && <Link className="student-contact-chat" to="/student/chats" aria-label="Open trainer chat">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C7.029 3 3 6.582 3 11c0 2.2 1.033 4.19 2.75 5.65L5 20l3.59-1.8c1.04.39 2.2.6 3.41.6 4.971 0 9-3.582 9-8S16.971 3 12 3Z" /></svg>
          </Link>}
        </div>)}
      </div> : <p className="student-widget-empty">Not assigned yet.</p>}
    </section>
  );
}

function SkillBars({ skills }) {
  return (
    <div className="space-y-4">
      {skills.map(({ label, value }) => (
        <div key={label}>
          <div className="mb-2 flex justify-between gap-3 text-xs">
            <span className="capitalize">{humanize(label)}</span>
            <strong className="text-[#2BB186]">{value}%</strong>
          </div>
          <ProgressBar
            value={value}
            label={humanize(label)}
            color="bg-[#2BB186]"
          />
        </div>
      ))}
    </div>
  );
}

function ActiveTasks({ tasks }) {
  return (
    <section
      className="active-task-card student-active-task-card"
      aria-labelledby="student-active-tasks"
    >
      <header className="active-task-heading">
        <div>
          <h2 id="student-active-tasks">Your Current Active Tasks</h2>
          <p>Track your task status</p>
        </div>
        <Link className="active-task-link" to="/student/tasks">
          All tasks <ArrowUpRight size={14} />
        </Link>
      </header>
      {tasks.length ? (
        tasks.slice(0, 1).map((task) => {
          const criteria = asList(task.evaluationCriteria);
          const recentSubmitters = asList(task.recentSubmitters).slice(0, 3);
          const deadline = task.deadline ? new Date(task.deadline) : null;
          const validDeadline = deadline && !Number.isNaN(deadline.getTime());
          const submitted =
            asList(task.submissions).length > 0 || task.status === "SUBMITTED";
          return (
            <article className="active-task-box" key={task.id}>
              <div className="active-task-top">
                <div className="active-task-intro">
                  <span className="task-play">
                    <Play size={18} fill="currentColor" />
                  </span>
                  <div className="active-task-copy">
                    <div className="active-task-title-row">
                      <h3>{task.title}</h3>
                      {task.id != null && (
                        <span className="active-task-number">
                          Task #{String(task.id).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <p className="active-task-deadline">
                      Due: {validDeadline ? `${deadline.toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })} at ${deadline.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" })} UTC` : "No deadline"}
                    </p>
                  </div>
                </div>
                <span className="task-status">
                  {submitted ? "Submitted" : humanize(task.status || "TODO")}
                </span>
              </div>
              <div className="student-task-criteria">
                <h4>
                  {criteria.length
                    ? `${criteria.length} task evaluation criteria`
                    : "Evaluation criteria"}
                </h4>
                {criteria.length ? (
                  <div className="student-task-rubric-grid">
                    {criteria.map((criterion, index) => (
                      <div
                        className="student-rubric"
                        key={criterion.id ?? index}
                      >
                        <div className="student-rubric-copy">
                          <h5>{criterion.title || criterion.name}</h5>
                          {criterion.description && <p>{criterion.description}</p>}
                        </div>
                        {(criterion.weight ?? criterion.weightPercent) !=
                          null && (
                          <strong>
                            {criterion.weight ?? criterion.weightPercent}<span>%</span>
                          </strong>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#737686]">
                    Your trainer hasn't published a rubric yet.
                  </p>
                )}
              </div>
              <div className="active-task-footer">
                <div className="student-task-submission">
                  {recentSubmitters.length > 0 && <div className="active-task-avatars" aria-label="Latest submitters">
                    {recentSubmitters.map((person) => <Avatar key={person.id} person={person} className="active-task-avatar" />)}
                  </div>}
                  <p>
                    {submitted
                      ? "Your submission has been received."
                      : "Awaiting your submission"}
                  </p>
                </div>
                <Link
                  className="active-task-link"
                  to="/student/tasks"
                  state={{ task }}
                >
                  View Full Task <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          );
        })
      ) : (
        <p className="text-sm text-[#737686]">
          You're all caught up. No active tasks right now.
        </p>
      )}
    </section>
  );
}

function AcademicPartnerIcon({ size = 17, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.5 13.3333V7.5H4.16667V13.3333H2.5ZM7.5 13.3333V7.5H9.16667V13.3333H7.5ZM0 16.6667V15H16.6667V16.6667H0ZM12.5 13.3333V7.5H14.1667V13.3333H12.5ZM0 5.83333V4.16667L8.33333 0L16.6667 4.16667V5.83333H0ZM3.70833 4.16667H8.33333H12.9583H3.70833ZM3.70833 4.16667H12.9583L8.33333 1.875L3.70833 4.16667Z" fill="#004AC6" />
    </svg>
  );
}

function OverviewItem({ icon: Icon, label, children, className = "" }) {
  return <div className={`student-overview-row ${className}`}>
    <span className="student-overview-icon"><Icon size={17} aria-hidden="true" /></span>
    <div className="student-overview-copy"><h3>{label}</h3><div>{children}</div></div>
  </div>;
}

function InternshipContent({ internship: data }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const trainerName = fullName(data.trainer) || data.trainer?.name;
  const latest = data.latestEvaluation;
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium"
      >
        <Link to="/student/my-internship" className="hover:text-blue-600">
          My Internship
        </Link>
        <ChevronRight size={12} />
        {data.company.name && (
          <>
            <span>{data.company.name}</span>
            <ChevronRight size={12} />
          </>
        )}
        <span aria-current="page" className="text-[#1677FF]">
          {data.title} Details
        </span>
      </nav>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-[-.6px] text-[#0B1C30]">
              {data.title}
            </h1>
            {data.status && (
              <span
                className={`student-status ${data.status === "ACTIVE" ? "student-status-active" : ""}`}
              >
                <span aria-hidden="true">●</span> {humanize(data.status)}
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px]">
            Track your training progress, attendance and tasks
          </p>
        </div>
        <Link className={actionClass} to="/attendance">
          <CalendarDays size={14} />
          Attendance Timesheet
        </Link>
      </header>
      <InternshipHero
        title={data.title}
        cohort={data.cohort}
        coverImage={data.coverImage}
        coverFailed={coverFailed}
        onCoverError={() => setCoverFailed(true)}
        badge="Student Workspace"
        indicator={
          data.totalHours !== null ? (
            <>
              <Clock3 size={14} />
              {data.totalHours} Hours Program
            </>
          ) : null
        }
        metadata={
          <>
            <span>
              <Building2 size={14} />
              {data.company.name || "Company not specified"}
            </span>
            {data.location && (
              <span>
                <MapPin size={14} />
                {data.location}
              </span>
            )}
            {trainerName && (
              <span>
                <UserRound size={14} />
                Lead Trainer: {trainerName}
              </span>
            )}
          </>
        }
        action={
          data.trainer ? (
            <Link className="internship-primary-action" to="/student/chats">
              <MessageCircle size={16} />
              Contact Trainer
            </Link>
          ) : null
        }
      />
      <div className="my-6 grid gap-4 md:grid-cols-3">
        <Metric
          title="Internship progress"
          value={percent(data.progress)}
          detail={`${data.weeksCompleted !== null && data.weeksTotal !== null ? `Week ${data.weeksCompleted} of ${data.weeksTotal} · ` : ""}${hours(data.completedHours)} / ${hours(data.totalHours)}`}
          variant="progress"
        />
        <Metric
          title="Total tasks"
          value={`${data.completed} / ${data.totalTasks}`}
          detail={`${data.submitted} submitted · ${data.needsSubmission} need submission`}
          variant="tasks"
        />
        <Metric
          title="Attendance rate"
          value={percent(data.attendanceRate)}
          detail={`${data.present} present · ${data.absent} absent${data.late ? ` · ${data.late} late` : ""}`}
          variant="attendance"
        />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,632fr)_minmax(0,304fr)]">
        <div className="min-w-0 space-y-6">
          <Panel
            title="About This Internship"
            className="technical-scope-card"
            icon={TechnicalScopeIcon}
            subtitle="Technical architecture and learning objectives"
            action={<span className="engineering-badge">Engineering Track</span>}
          >
            <p className="technical-scope-description whitespace-pre-line">
              {data.description || empty}
            </p>
            <h3 className="technical-scope-label technology-label">
              Target technologies & tooling
            </h3>
            {data.techStack.length ? (
              <div className="technology-tags">
                {data.techStack.map((tech, index) => (
                  <span className="technology-tag" key={index}>
                    <span className="technology-tag-dot" />
                    {typeof tech === "string" ? tech : tech.name || tech.title}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-[#737686]">
                Technologies have not been listed yet.
              </p>
            )}
            <h3 className="technical-scope-label objectives-label">
              Key learning objectives & competencies
            </h3>
            {data.objectives.length ? (
              <ul className="learning-objectives">
                {data.objectives.map((objective, index) => (
                  <li className="learning-objective" key={index}>
                    <span className="learning-objective-check"><Check size={16} aria-hidden="true" /></span>
                    <div className="learning-objective-copy">
                      <h4>
                        {typeof objective === "string"
                          ? objective
                          : objective.title}
                      </h4>
                      {objective.description && (
                        <p>
                          {objective.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-[#737686]">
                Learning objectives will appear here when published.
              </p>
            )}
            {data.competencies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.competencies.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[#EFF4FF] px-3 py-2 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </Panel>
          <ActiveTasks tasks={data.activeTasks} />
          <section className="student-attendance-card" aria-labelledby="student-attendance-title">
            <header className="student-attendance-heading">
              <div className="student-attendance-intro">
                <span className="student-attendance-icon"><CalendarDays size={18} aria-hidden="true" /></span>
                <div>
                  <h2 id="student-attendance-title">Attendance &amp; Training Hours</h2>
                  <p>Your logged attendance, QR check-ins, and training timesheet records.</p>
                </div>
              </div>
              <Link className="student-attendance-link" to="/attendance">View Attendance <ArrowUpRight size={12} /></Link>
            </header>
            <div className="student-attendance-progress">
              <div className="student-attendance-summary">
                <strong>
                  {data.completedHours ?? "—"} / {data.totalHours ?? "—"}{" "}
                  training hours completed
                </strong>
                <span className="student-attendance-badge">
                  {data.hoursProgress === null ? "Not available" : `${data.hoursProgress}% Completed`}
                </span>
              </div>
              <p className="student-attendance-pace">
                {data.hoursPerWeek != null ? `Scheduled pace: ${Number(data.hoursPerWeek).toFixed(1)} hrs/week · ` : ""}
                Target completion date: {dateLabel(data.endDate)}
              </p>
              <ProgressBar
                value={data.hoursProgress}
                label="Training hours completed"
              />
            </div>
          </section>
          <section className="student-performance-card" aria-labelledby="student-performance-title">
            <header className="student-performance-heading">
              <span className="student-performance-icon"><Sparkles size={20} aria-hidden="true" /></span>
              <div>
                <h2 id="student-performance-title">Performance &amp; AI Insights</h2>
                <p>Track your evaluation scores, skill development, and available performance insights.</p>
              </div>
            </header>
            <div className="student-performance-grid">
              <div className="student-performance-gauge" data-empty={data.score === null}>
                <div className="student-performance-ring" aria-label={data.score === null ? "Overall score not available" : `Overall score: ${data.score} out of 100`}>
                  <strong>{data.score ?? "—"}</strong>
                  <span>/ 100</span>
                </div>
                <span className="student-performance-rating">{data.score === null ? "Awaiting evaluation" : "Overall score"}</span>
                <p>Average evaluation score</p>
              </div>
              {data.skills.length ? (
                <div className="student-performance-skills"><SkillBars skills={data.skills} /></div>
              ) : (
                <p className="student-performance-empty">
                  Your skill breakdown will appear after your trainer publishes
                  an evaluation.
                </p>
              )}
            </div>
            <div className="student-performance-insight">
              <span className="student-performance-insight-icon"><Sparkles size={17} aria-hidden="true" /></span>
              <div className="student-performance-insight-copy">
                <div className="student-performance-insight-heading">
                  <h3>AI Performance Insight</h3>
                  {data.insight && <span>Automated Audit</span>}
                </div>
                <p>{data.insight || "No performance insight is available yet."}</p>
                {data.insightRecommendations && <p className="mt-2"><strong>Recommendations: </strong>{data.insightRecommendations}</p>}
              </div>
            </div>
          </section>
          <Panel title="Training Logistics & Physical Schedule" subtitle="Training attendance, working hours, facilities, and academic partners." icon={MapPin} className="logistics-card student-logistics-card">
            <div className="logistics-grid">
              <div>
                <h3>Attendance &amp; Check-in Model</h3>
                <h4>{data.attendanceModel || "Not specified"}</h4>
                {data.checkInStart && data.checkInEnd && <p>Daily check-in between {data.checkInStart} &ndash; {data.checkInEnd}.</p>}
                {data.minAttendance != null && <p>{data.minAttendance}% minimum attendance required.</p>}
              </div>
              <div>
                <h3>Working Schedule &amp; Hours</h3>
                <h4>{data.workingDays || "Schedule not specified"}{data.workingSchedule.dailyHours != null && <> ({data.workingSchedule.dailyHours}h / day)</>}</h4>
                {data.workingSchedule.startTime && data.workingSchedule.endTime && <p>{data.workingSchedule.startTime} &ndash; {data.workingSchedule.endTime} daily.</p>}
                {data.hoursPerWeek != null && <p>{data.hoursPerWeek} hours per week.</p>}
                {data.workingSchedule.notes && <p>{data.workingSchedule.notes}</p>}
              </div>
              <div>
                <h3>Designated Physical Facility</h3>
                <h4>{data.venue.name || data.location || "Location not specified"}</h4>
                {data.venue.address && <p>{data.venue.address}</p>}
                {data.venue.equipment && <p>{data.venue.equipment}</p>}
                {data.venue.remoteTools && <p>Remote tools: {data.venue.remoteTools}</p>}
              </div>
              <div>
                <h3>University Academic Partnerships</h3>
                {data.academicPartners.length ? <>
                  <h4>{data.academicPartners.length} Partner {data.academicPartners.length === 1 ? "Institution" : "Institutions"}</h4>
                  <div className="logistics-partners">{data.academicPartners.map((partner) => <span key={partner.shortCode || partner.university}>{partner.university}</span>)}</div>
                </> : <p>Academic partners have not been listed yet.</p>}
              </div>
            </div>
            {data.venue.address && <a className="facility-map" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data.venue.address)} target="_blank" rel="noreferrer" aria-label={"View " + (data.venue.name || data.venue.address) + " on Google Maps (opens in a new tab)"}>
              <span className="facility-map-footer">
                <span className="facility-map-location"><MapPin size={20} aria-hidden="true" />{data.venue.name || data.venue.address}</span>
                <span className="map-button">View on Google Maps <ArrowUpRight size={12} aria-hidden="true" /></span>
              </span>
            </a>}
          </Panel>
        </div>
        <aside className="student-details-sidebar">
          <section className="student-sidebar-card student-overview-card" aria-labelledby="student-overview-title">
            <header className="student-overview-heading">
              <h2 id="student-overview-title">Internship Overview</h2>
              <details className="student-overview-menu">
                <summary aria-label="Internship overview options"><Ellipsis size={16} /></summary>
                <div><Link to="/attendance">View attendance</Link><Link to="/student/tasks">View tasks</Link></div>
              </details>
            </header>
            <div className="student-overview-rows">
              <OverviewItem icon={CalendarDays} label="Training Period" className="student-training-period">
                <span>{dateLabel(data.startDate)} to {dateLabel(data.endDate)}</span>
                <p className="student-overview-remaining">
                  {data.weeksRemaining != null && <span>{data.weeksRemaining} {data.weeksRemaining === 1 ? "week" : "weeks"} remaining</span>}
                </p>
              </OverviewItem>
              <OverviewItem icon={Clock3} label="Training Hours" className="student-training-hours">
                {data.totalHours !== null
                  ? `${data.totalHours} Hours Program`
                  : "Hours not specified"}
                {data.hoursPerWeek != null && (
                  <p>
                    {data.hoursPerWeek} hrs/week{data.workingDays ? " \u00b7 " + data.workingDays : ""}
                  </p>
                )}
              </OverviewItem>
              <OverviewItem icon={MapPin} label="Physical / Hybrid Location" className="student-training-location">
                {data.venue.name || data.location || "Not specified"}
                {(data.venue.address || data.trainingType) && <p>{data.venue.address || humanize(data.trainingType)}</p>}
              </OverviewItem>
              {data.academicPartners.length > 0 && (
                <OverviewItem icon={AcademicPartnerIcon} label="Academic Partner Breakdown" className="student-training-partners">
                  {data.academicPartners.length} {data.academicPartners.length === 1 ? "University" : "Universities"}
                  <p>
                  {data.academicPartners
                    .map((partner) => (partner.shortCode?.toUpperCase() || partner.university) + (partner.studentCount != null ? " (" + partner.studentCount + ")" : ""))
                    .join(" · ")}
                  </p>
                </OverviewItem>
              )}
            </div>
          </section>
          <ContactCard
            title="Company Trainer"
            people={data.trainer ? [data.trainer] : []}
            company={data.company.name}
            trainer
          />
          <ContactCard
            title="University Supervisors"
            people={data.supervisors}
          />
          <section className="student-sidebar-card student-evaluation-card" aria-labelledby="student-evaluation-title">
            <h2 id="student-evaluation-title" className="student-widget-label">Last Task Evaluation</h2>
            {latest ? (
              <>
                <div className="student-evaluation-score">
                  <strong className="text-[44px] font-extrabold leading-none text-[#2BB186]">
                    {latest.score ?? "—"}
                  </strong>
                  <span className="student-evaluation-total">/ 100</span>
                </div>
                <p className="sr-only">
                  {dateLabel(latest.createdAt)}
                </p>
                {data.latestSkills.length > 0 && (
                  <div className="student-evaluation-skills">
                    <SkillBars skills={data.latestSkills} />
                  </div>
                )}
                {latest.feedback ? (
                  <blockquote className="student-mentor-note">
                    {latest.feedback}
                    {latest.evaluator && (
                      <footer className="student-mentor-author">
                        — {fullName(latest.evaluator)}
                      </footer>
                    )}
                  </blockquote>
                ) : (
                  <p className="text-xs text-[#737686]">
                    No written feedback provided.
                  </p>
                )}
              </>
            ) : (
              <p className="text-[13px] text-[#737686]">
                Your latest evaluation and mentor feedback will appear here.
              </p>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}

export default function MyInternship() {
  const { data, loading, error, retry } = useStudentInternship();
  return (
    <div className="relative isolate h-full min-w-0 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
    <main className="student-internship relative h-full min-w-0 overflow-y-auto overscroll-y-contain text-[#434655]">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-5 sm:px-7 lg:px-8 lg:py-7">
        <PageHeader />
        {loading ? (
          <InternshipSkeleton />
        ) : error ? (
          <section role="alert" className="rounded-2xl bg-white p-8">
            <h1 className="mb-3 text-2xl font-semibold text-[#0B1C30]">
              My Internship
            </h1>
            <p>{error}</p>
            <button
              type="button"
              className={`${actionClass} mt-5`}
              onClick={retry}
            >
              Try again
            </button>
          </section>
        ) : data ? (
          <InternshipContent key={data.id} internship={data} />
        ) : (
          <section className="rounded-2xl bg-white p-8 text-center">
            <GraduationCap className="mx-auto mb-4 text-[#004AC6]" size={40} />
            <h1 className="text-2xl font-semibold text-[#0B1C30]">
              Your internship starts here
            </h1>
            <p className="my-4 text-sm">
              You aren't enrolled in an internship yet. Explore opportunities to
              get started.
            </p>
            <Link
              className="internship-primary-action"
              to="/student/opportunities"
            >
              Explore Opportunities <ArrowUpRight size={16} />
            </Link>
          </section>
        )}
      </div>
    </main>
    </div>
  );
}
