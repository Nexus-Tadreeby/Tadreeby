import { useEffect, useRef } from "react";
import { ArrowUpRight, Building2, Clock3, MapPin, Play, Plus, Users } from "lucide-react";
import { fullName, humanize } from "./trainerInternshipDetails.utils";

import { Avatar, ProgressBar, Metric, InternshipHero as SharedInternshipHero } from "../../../internship/InternshipDetails.ui";
import { actionClass } from "../../../internship/internship.utils";
export { Avatar, Panel, TechnicalScopeIcon } from "../../../internship/InternshipDetails.ui";

export function MostActiveTrainees({ trainees, onViewAll }) {
  return (
    <section className="trainee-roster most-active-trainees" aria-labelledby="most-active-trainees-title">
      <header className="trainee-roster-heading">
        <h2 id="most-active-trainees-title">Most active trainees last week</h2>
        {trainees.length > 3 && <button type="button" className="internship-text-action" onClick={onViewAll}>View all</button>}
      </header>
      {trainees.length ? (
        <div className="trainee-roster-list">
          {trainees.slice(0, 3).map((student) => {
            const university = student.university?.shortCode?.toUpperCase() || student.shortCode?.toUpperCase()
              || (typeof student.university === "string" ? student.university : student.university?.name);
            const subtitle = [university, student.attendanceRate != null ? `${student.attendanceRate}% Attendance` : null].filter(Boolean).join(" · ");
            return (
              <div key={student.id} className="trainee-roster-row" data-status={student.status?.toLowerCase().replaceAll("_", " ")}>
                <div className="trainee-roster-person">
                  <Avatar person={student} className="trainee-roster-avatar" />
                  <div className="trainee-roster-copy">
                    <h3>{fullName(student)}</h3>
                    {subtitle && <p>{subtitle}</p>}
                  </div>
                </div>
                {student.status && <span className="trainee-roster-status">{humanize(student.status)}</span>}
              </div>
            );
          })}
        </div>
      ) : <p className="most-active-trainees-empty">No trainee activity is available for last week yet.</p>}
    </section>
  );
}

export function TaskCard({ tasks, capacity, students, currentTaskId, hasCompleteTaskList, onAction }) {
  const task = tasks.find(({ id }) => id === currentTaskId) || tasks.find(({ status }) => status === "IN_PROGRESS") || tasks.find(({ status }) => status !== "DONE") || tasks[0];
  const expectedSubmissions = task?.expectedSubmissions ?? capacity.maxStudents;
  const submitters = [...new Map(
    [...(task?.submissions || [])]
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .map(({ studentId }) => students.find(({ id }) => id === studentId))
      .filter(Boolean)
      .map((student) => [student.id, student]),
  ).values()].slice(0, 3);

  return (
    <section className="active-task-card" aria-labelledby="active-task-heading">
      <header className="active-task-heading"><div><h2 id="active-task-heading">Current Active Task</h2><p>Track trainee submissions and review progress.</p></div><button type="button" className="active-task-link" disabled={!tasks.length} onClick={() => onAction(hasCompleteTaskList ? "All training tasks" : "Available task details", tasks.map((item) => ({ title: item.title, description: item.description, detail: humanize(item.status) })))}>{hasCompleteTaskList ? "View all tasks" : "View task details"} <ArrowUpRight size={11} /></button></header>
      {task ? <div className="active-task-box">
        <div className="active-task-top"><div className="active-task-intro"><span className="task-play"><Play size={18} fill="currentColor" /></span><div className="active-task-copy"><div className="active-task-title-row"><h3>{task.title}</h3><span className="active-task-number">Task #{String(task.id).padStart(2, "0")}</span></div><p className="active-task-deadline">Due: {new Date(task.deadline).toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })} at {new Date(task.deadline).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" })} UTC</p></div></div><span className="task-status">{humanize(task.badge || task.status)}</span></div>
        <div className="active-task-progress"><div className="active-task-progress-label"><span>Trainee Submissions Progress</span><span>{task.submissionCount}{expectedSubmissions != null ? ` / ${expectedSubmissions}` : ""} submissions</span></div><ProgressBar value={expectedSubmissions ? task.submissionCount / expectedSubmissions * 100 : 0} label="Expected trainee submissions" /></div>
        <div className="active-task-footer"><div className="active-task-review">{submitters.length > 0 && <div className="active-task-avatars">{submitters.map((student) => <Avatar key={student.id} person={student} className="active-task-avatar" />)}</div>}<span>{task.needsReviewCount} submissions need review</span></div>{task.rubricUrl && <a className="active-task-link" href={task.rubricUrl} target="_blank" rel="noreferrer">View grading rubric <ArrowUpRight size={12} /></a>}</div>
      </div> : <p className="text-sm text-[#737686]">No tasks assigned yet.</p>}
    </section>
  );
}

export function InternshipHero({ header, overview, capacity, coverFailed, onCoverError }) {
  return <SharedInternshipHero
    title={header.title} cohort={header.cohort} coverImage={header.coverImage}
    coverFailed={coverFailed} onCoverError={onCoverError}
    badge={header.trainingType + " Training"}
    indicator={<><Clock3 size={14} aria-hidden="true" />{overview.totalDuration.hours} Hours Program</>}
    metadata={<>
      <span><Building2 size={14} aria-hidden="true" />{header.company.name}</span>
      <span><MapPin size={16} aria-hidden="true" />{header.location}</span>
      <span><Users size={16} aria-hidden="true" />{capacity.enrolledCount}{capacity.maxStudents != null ? ` / ${capacity.maxStudents}` : ""} trainees</span>
    </>}
    action={<button type="button" className="internship-primary-action" disabled title="Task creation is not available yet"><Plus size={16} aria-hidden="true" />Create New Task</button>}
  />;
}

export function MetricsRow({ stats }) {
  const progress = stats.internshipProgress;
  return (
    <div className="my-6 grid gap-4 md:grid-cols-3">
      <Metric title="Internship progress" value={`${progress.percent}%`} detail={`Week ${progress.weeksCompleted} of ${progress.weeksTotal} · ${progress.hoursCompleted}h / ${progress.hoursTotal}h`} variant="progress" />
      <Metric title="Total tasks" value={stats.tasks.completed == null ? stats.tasks.total : `${stats.tasks.completed} / ${stats.tasks.total}`} detail={`${stats.tasks.inProgress} in progress · ${stats.tasks.needsGrading} need grading`} variant="tasks" />
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
