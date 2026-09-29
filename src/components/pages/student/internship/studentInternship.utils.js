export const asList = (value) => Array.isArray(value) ? value : [];
const numeric = (value) => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)) ? Number(value) : null;
const mean = (values) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length * 10) / 10 : null;
export const dateLabel = (value) => value && !Number.isNaN(new Date(value).getTime())
  ? new Date(value).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }) : "Not specified";
export const universityName = (value) => typeof value === "string" ? value : value?.name;

function durationHours(value) {
  if (typeof value === "number") return value;
  const hours = String(value || "").match(/(\d+(?:\.\d+)?)\s*h/i);
  const minutes = String(value || "").match(/(\d+(?:\.\d+)?)\s*m/i);
  return Number(hours?.[1] || 0) + Number(minutes?.[1] || 0) / 60;
}

export function evaluationSkills(evaluation) {
  if (Array.isArray(evaluation?.breakdown)) {
    return evaluation.breakdown.map((item) => ({ label: item.name || item.title, value: numeric(item.score) }))
      .filter((item) => item.label && item.value !== null);
  }
  return Object.entries(evaluation?.skills || {})
    .map(([label, value]) => ({ label, value: numeric(value) })).filter((item) => item.value !== null);
}

function normalizeTask(task) {
  return {
    ...task,
    evaluationCriteria: asList(task.evaluationCriteria ?? (Array.isArray(task.rubric) ? task.rubric : task.rubric?.criteria) ?? task.criteria),
    submissions: task.submission ? [task.submission] : asList(task.submissions),
  };
}

// The student endpoint owns personal statistics; never substitute cohort totals.
export function mapStudentInternship(response) {
  if (response?.success === false) throw new Error("Unable to load internship details");
  const data = response?.data ?? response;
  const opportunity = data.opportunity || {};
  const header = data.header || {};
  const stats = data.stats || {};
  const about = data.about || {};
  const overview = data.overview || {};
  const logistics = data.logistics || {};
  const attendance = asList(data.attendance);
  const tasks = asList(data.tasks).map(normalizeTask);
  // currentTask can carry more details than its corresponding list entry.
  if (data.currentTask) {
    const index = tasks.findIndex((task) => task.id === data.currentTask.id);
    const current = normalizeTask({ ...(tasks[index] || {}), ...data.currentTask });
    if (Object.hasOwn(data.currentTask, "submission")) current.submissions = data.currentTask.submission ? [data.currentTask.submission] : [];
    if (index >= 0) tasks[index] = current;
    else tasks.push(current);
  }
  const evaluations = [...asList(data.evaluations)].sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0));
  const recordedAttendance = attendance.filter((item) => item.status !== "CHECKED_IN" || item.checkOut);
  const present = numeric(stats.attendance?.presentRecords) ?? recordedAttendance.filter((item) => ["CHECKED_OUT", "MARKED_PRESENT", "PRESENT", "LATE"].includes(item.status) || (item.status === "CHECKED_IN" && item.checkOut)).length;
  const absent = numeric(stats.attendance?.absentRecords) ?? attendance.filter((item) => ["ABSENT", "MARKED_ABSENT"].includes(item.status)).length;
  const late = numeric(stats.attendance?.lateRecords) ?? attendance.filter((item) => item.isLate === true || item.status === "LATE").length;
  const totalHours = numeric(stats.progress?.hoursTotal ?? stats.totalHours ?? opportunity.totalHours ?? overview.totalDuration?.hours);
  const completedHours = numeric(stats.progress?.hoursCompleted ?? stats.completedHours) ?? (attendance.length ? Math.round(attendance.reduce((sum, item) => sum + durationHours(item.duration), 0) * 10) / 10 : null);
  const hoursProgress = totalHours > 0 && completedHours !== null ? Math.round(completedHours / totalHours * 100) : null;
  const progress = numeric(stats.progress?.percent ?? stats.progress) ?? hoursProgress;
  const completed = numeric(stats.tasks?.completed) ?? tasks.filter((task) => ["DONE", "COMPLETED"].includes(task.status)).length;
  const submitted = tasks.filter((task) => task.submissions.length || task.status === "SUBMITTED").length;
  const activeTasks = tasks.filter((task) => !["DONE", "COMPLETED"].includes(task.status)).sort((a, b) => {
    if (a.id === data.currentTask?.id) return -1;
    if (b.id === data.currentTask?.id) return 1;
    return (Date.parse(a.deadline) || Infinity) - (Date.parse(b.deadline) || Infinity);
  });
  // Explicit null means no task evaluation, even if internship evaluations exist.
  const latestEvaluation = Object.hasOwn(data, "lastTaskEvaluation") ? data.lastTaskEvaluation : evaluations[0] || null;
  const skills = data.skills ? evaluationSkills({ skills: data.skills }) : evaluationSkills(evaluations[0] || latestEvaluation);
  const attendanceModel = logistics.attendanceModel ?? data.attendanceModel ?? opportunity.attendanceModel;
  const insight = data.aiEvaluation ?? data.aiInsight;
  return {
    id: data.id, title: header.title || opportunity.title || "My Internship",
    status: data.status || "", company: header.company || data.company || {},
    coverImage: header.coverImage || opportunity.coverImage || data.company?.coverImage,
    cohort: header.cohort || data.cohort,
    location: header.location || opportunity.location || overview.trainingVenue?.name,
    trainer: header.trainer || data.trainer,
    supervisors: Array.isArray(data.supervisors) ? data.supervisors : data.supervisor ? [data.supervisor] : asList(overview.universitySupervisors).map((item) => ({ ...item.supervisor, university: item.university })),
    description: about.description || opportunity.description,
    techStack: asList(about.techStack || opportunity.techStack),
    objectives: asList(about.learningObjectives || opportunity.learningObjectives),
    competencies: asList(about.competencies),
    academicPartners: asList(overview.academicPartners),
    startDate: data.startDate || overview.trainingPeriod?.startDate || data.createdAt,
    endDate: data.endDate || overview.trainingPeriod?.endDate || opportunity.endDate,
    workingDays: logistics.workingSchedule?.days || overview.totalDuration?.workingDays || opportunity.workingDays,
    workingSchedule: logistics.workingSchedule || {},
    hoursPerWeek: overview.totalDuration?.hoursPerWeek ?? opportunity.hoursPerWeek,
    attendanceModel: typeof attendanceModel === "string" ? attendanceModel : attendanceModel?.type,
    checkInStart: attendanceModel?.checkInStart, checkInEnd: attendanceModel?.checkInEnd, minAttendance: attendanceModel?.minPercent,
    venue: logistics.venue || overview.trainingVenue || {}, trainingType: header.trainingType || opportunity.type,
    totalHours, completedHours, progress, hoursProgress, present, absent, late,
    weeksCompleted: numeric(stats.progress?.weeksCompleted), weeksTotal: numeric(stats.progress?.weeksTotal),
    weeksRemaining: numeric(overview.trainingPeriod?.weeksRemaining),
    attendanceRate: numeric(stats.attendance?.ratePercent ?? stats.attendanceRate) ?? (recordedAttendance.length ? Math.round(present / recordedAttendance.length * 100) : null),
    tasks, activeTasks, completed, submitted, totalTasks: numeric(stats.tasks?.total) ?? tasks.length,
    inProgress: numeric(stats.tasks?.inProgress) ?? tasks.filter((task) => task.status === "IN_PROGRESS").length,
    needsSubmission: activeTasks.filter((task) => !task.submissions.length && task.status !== "SUBMITTED").length,
    score: mean(evaluations.map((item) => numeric(item.score)).filter((value) => value !== null)),
    latestEvaluation, skills, latestSkills: evaluationSkills(latestEvaluation),
    insight: typeof insight === "string" ? insight : insight?.analysis || insight?.summary || insight?.feedback,
    insightRecommendations: typeof insight?.recommendations === "string" ? insight.recommendations : undefined,
  };
}
