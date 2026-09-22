import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Building2, Clock3, MapPin, Play, Plus, Users } from "lucide-react";
import { fullName, humanize } from "./trainerInternshipDetails.utils";

export const actionClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#E4E8EF] bg-white px-4 py-2 text-xs font-semibold text-[#1677FF] transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export function TechnicalScopeIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path d="M2 16C1.45 16 .979167 15.8042.5875 15.4125.195833 15.0208 0 14.55 0 14V2C0 1.45.195833.979167.5875.5875.979167.195833 1.45 0 2 0H18C18.55 0 19.0208.195833 19.4125.5875 19.8042.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125 19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V4H2V14ZM5.5 13 4.1 11.6 6.675 9 4.075 6.4 5.5 5 9.5 9 5.5 13ZM10 13V11H16V13H10Z" fill="#004AC6" />
    </svg>
  );
}

export function Panel({ title, icon: Icon, children, action, subtitle, className = "" }) {
  return (
    <section className={`internship-panel min-w-0 rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(11,28,48,0.03)] sm:p-6 ${className}`}>
      {subtitle ? (
        <div className="technical-scope-heading">
          <div className="technical-scope-heading-main">
            <span className="technical-scope-icon"><Icon /></span>
            <div className="technical-scope-heading-copy"><h2>{title}</h2><p>{subtitle}</p></div>
          </div>
          {action}
        </div>
      ) : (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0B1C30]"><Icon size={18} className="shrink-0 text-[#1677FF]" />{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Avatar({ person, supervisor = false, className }) {
  const [failed, setFailed] = useState(false);
  const fallbackClass = supervisor
    ? "supervisor-avatar"
    : "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-xs font-bold text-blue-600";

  return (
    <div className={className || fallbackClass}>
      {person.profileImage && !failed ? (
        <img src={person.profileImage} alt={fullName(person)} className="h-full w-full object-cover" onError={() => setFailed(true)} />
      ) : `${person.firstName?.[0] || ""}${person.lastName?.[0] || ""}`}
    </div>
  );
}

export function ProgressBar({ value, label, color = "bg-[#1677FF]" }) {
  const percent = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="h-1.5 overflow-hidden rounded-full bg-[#EEF2F7]">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

const metricStyles = {
  progress: { indicator: "bg-[#DBE1FF] text-[#004AC6]", detail: "text-[#434655]" },
  tasks: { indicator: "bg-[#ECFDF5] text-[#059669]", detail: "font-medium text-[#059669]" },
  attendance: { indicator: "bg-[#FFFBEB] text-[#D97706]", detail: "text-[#434655]" },
};

export function MetricIcon({ variant }) {
  const paths = {
    progress: "M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z",
    tasks: "m8.6 14.6 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4 4.25 4.25ZM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
    attendance: "m13.3 14.7 1.4-1.4-3.7-3.7V5H9v5.4l4.3 4.3ZM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  };
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={paths[variant]} fill="currentColor" /></svg>;
}

export function Metric({ title, value, detail, variant }) {
  const styles = metricStyles[variant];
  return (
    <section className="flex min-h-[105px] min-w-0 items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(11,28,48,0.03)]">
      <div className="min-w-0">
        <h2 className="text-[11px] font-semibold uppercase leading-[14px] tracking-[.55px] text-[#737686]">{title}</h2>
        <strong className="block pt-1 text-[28px] font-bold leading-[35px] tracking-[-.56px] text-[#0B1C30]">{value}</strong>
        <p className={`mt-0.5 whitespace-nowrap text-[13px] leading-[18px] ${styles.detail}`}>{detail}</p>
      </div>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${styles.indicator}`}><MetricIcon variant={variant} /></span>
    </section>
  );
}

export function TaskCard({ tasks, capacity, students, onAction }) {
  const task = tasks.find(({ status }) => status === "IN_PROGRESS") || tasks.find(({ status }) => status !== "DONE") || tasks[0];
  const submitters = [...new Map(
    [...(task?.submissions || [])]
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .map(({ studentId }) => students.find(({ id }) => id === studentId))
      .filter(Boolean)
      .map((student) => [student.id, student]),
  ).values()].slice(0, 3);

  return (
    <section className="active-task-card" aria-labelledby="active-task-heading">
      <header className="active-task-heading"><div><h2 id="active-task-heading">Current Active Task</h2><p>Track trainee submissions and review progress.</p></div><button type="button" className="active-task-link" onClick={() => onAction("All training tasks", tasks.map((item) => ({ title: item.title, description: item.description, detail: humanize(item.status) })))}>View all tasks <ArrowUpRight size={11} /></button></header>
      {task ? <div className="active-task-box">
        <div className="active-task-top"><div className="active-task-intro"><span className="task-play"><Play size={18} fill="currentColor" /></span><div className="active-task-copy"><div className="active-task-title-row"><h3>{task.title}</h3><span className="active-task-number">Task #{String(task.id).padStart(2, "0")}</span></div><p className="active-task-deadline">Due: {new Date(task.deadline).toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })} at {new Date(task.deadline).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" })} UTC</p></div></div><span className="task-status">{humanize(task.badge || task.status)}</span></div>
        <div className="active-task-progress"><div className="active-task-progress-label"><span>Trainee Submissions Progress</span><span>{task.submissionCount} / {capacity.maxStudents} submissions</span></div><ProgressBar value={capacity.maxStudents ? task.submissionCount / capacity.maxStudents * 100 : 0} label="Submissions relative to internship capacity" /></div>
        <div className="active-task-footer"><div className="active-task-review">{submitters.length > 0 && <div className="active-task-avatars">{submitters.map((student) => <Avatar key={student.id} person={student} className="active-task-avatar" />)}</div>}<span>{task.needsReviewCount} submissions need review</span></div>{task.rubricUrl && <a className="active-task-link" href={task.rubricUrl} target="_blank" rel="noreferrer">View grading rubric <ArrowUpRight size={12} /></a>}</div>
      </div> : <p className="text-sm text-[#737686]">No tasks assigned yet.</p>}
    </section>
  );
}

export function InternshipHero({ header, overview, capacity, coverFailed, onCoverError }) {
  return (
    <section className="internship-hero">
      <div className="internship-hero-banner">
        {header.coverImage && !coverFailed && <img src={header.coverImage} alt="" className="absolute inset-0 z-0 h-full w-full object-cover object-center" onError={onCoverError} />}
        <div className="internship-hero-shade" />
        <div className="internship-hero-badges">
          <span className="internship-hero-type">{header.trainingType} Training</span>
          <span className="internship-hero-duration"><Clock3 size={14} aria-hidden="true" />{overview.totalDuration.hours} Hours Program</span>
        </div>
      </div>
      <div className="internship-hero-info">
        <div className="internship-hero-copy">
          <div className="internship-hero-title"><h2>{header.title}</h2><span className="internship-hero-cohort">{header.cohort}</span></div>
          <div className="internship-hero-meta">
            <span><Building2 size={14} aria-hidden="true" />{header.company.name}</span>
            <span><MapPin size={16} aria-hidden="true" />{header.location}</span>
            <span><Users size={16} aria-hidden="true" />{capacity.enrolledCount} / {capacity.maxStudents} trainees</span>
          </div>
        </div>
        <button type="button" className="internship-primary-action" disabled title="Task creation is not available yet"><Plus size={16} aria-hidden="true" />Create New Task</button>
      </div>
    </section>
  );
}

export function MetricsRow({ stats }) {
  const progress = stats.internshipProgress;
  return (
    <div className="my-6 grid gap-4 md:grid-cols-3">
      <Metric title="Internship progress" value={`${progress.percent}%`} detail={`Week ${progress.weeksCompleted} of ${progress.weeksTotal} · ${progress.hoursCompleted}h / ${progress.hoursTotal}h`} variant="progress" />
      <Metric title="Total tasks" value={`${stats.tasks.completed} / ${stats.tasks.total}`} detail={`${stats.tasks.inProgress} in progress · ${stats.tasks.needsGrading} need grading`} variant="tasks" />
      <Metric title="Attendance rate" value={`${stats.attendance.ratePercent}%`} detail={`${stats.attendance.studentsTracked} students tracked · ${stats.attendance.absentRecords} absent records`} variant="attendance" />
    </div>
  );
}

export function DetailsDialog({ dialog, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (dialog && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [dialog]);

  if (!dialog) return null;
  return (
    <dialog ref={dialogRef} onCancel={onClose} className="internship-dialog" aria-labelledby="internship-dialog-title" onKeyDown={(event) => event.key === "Escape" && onClose()}>
      <div className="flex items-center justify-between gap-4"><h2 id="internship-dialog-title" className="text-lg font-semibold">{dialog.title}</h2><button autoFocus className={actionClass} onClick={onClose}>Close</button></div>
      <div className="mt-5 space-y-4">{dialog.items.map((item, index) => <article key={index} className="rounded-xl bg-blue-50 p-4"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-sm">{item.description}</p>{item.detail && <p className="mt-2 text-xs text-blue-700">{item.detail}</p>}</article>)}</div>
    </dialog>
  );
}
