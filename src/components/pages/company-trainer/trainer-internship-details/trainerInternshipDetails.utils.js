export const dateLabel = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

import { fullName } from "../../../internship/internship.utils";
export { humanize, fullName } from "../../../internship/internship.utils";

export function uniqueUniversities(assignments) {
  return [
    ...new Map(
      assignments.map(({ university }) => [university.id, university]),
    ).values(),
  ];
}

export function buildInternshipReport(internship) {
  const { header, stats, about, overview, students, tasks, capacity } = internship;
  const progress = stats.internshipProgress;

  return [
    header.title,
    header.cohort,
    `Status: ${internship.status}`,
    `Company: ${header.company.name}`,
    `Trainer: ${fullName(header.trainer)}`,
    "",
    about.description,
    "",
    `Progress: ${progress.percent}%`,
    `Training: ${dateLabel(overview.trainingPeriod.startDate)} - ${dateLabel(overview.trainingPeriod.endDate)}`,
    `Hours: ${progress.hoursCompleted}/${progress.hoursTotal}`,
    `Enrolled: ${capacity.enrolledCount}${capacity.maxStudents != null ? `/${capacity.maxStudents}` : ""}`,
    `Attendance: ${stats.attendance.ratePercent}%`,
    "",
    "Learning objectives",
    ...about.learningObjectives.map(
      ({ title, description }) => `${title}: ${description}`,
    ),
    "",
    "Tasks",
    ...tasks.map(
      (task) =>
        `${task.title} | ${task.status} | Due ${dateLabel(task.deadline)} | ${task.submissionCount} submissions | ${task.needsReviewCount} need review`,
    ),
    "",
    "Trainees",
    ...students.map(
      (student) =>
        `${fullName(student)} | ${student.university.name} | Attendance ${student.attendanceRate}%`,
    ),
  ].join("\n");
}

export function downloadTextReport(internship) {
  const url = URL.createObjectURL(
    new Blob([buildInternshipReport(internship)], {
      type: "text/plain;charset=utf-8",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `internship-${internship.id}-report.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
