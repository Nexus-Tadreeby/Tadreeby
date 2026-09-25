const list = (value) => Array.isArray(value) ? value.filter((item) => item != null) : [];

// Translate the trainer endpoint into its existing page model, independently
// of the student's personal enrollment statistics and submissions.
export function mapTrainerInternship(response) {
  if (response?.success === false) throw new Error("Unable to load internship details");
  const data = response?.data ?? response;
  if (!data?.header || !data?.stats || !data?.about || !data?.overview) {
    throw new Error("The internship response is incomplete.");
  }
  if (!data.header.company || !(data.stats.progress ?? data.stats.internshipProgress)
    || !data.stats.tasks || !data.stats.attendance || !data.overview.trainingPeriod
    || !data.overview.totalDuration || !data.overview.trainingVenue) {
    throw new Error("The internship response is incomplete.");
  }
  const partners = list(data.overview?.academicPartners);
  const university = (value) => {
    if (value && typeof value === "object") return value;
    const partner = partners.find((item) => item.university === value);
    return { id: value || "unknown", name: value || "Not specified", shortCode: partner?.shortCode };
  };
  const students = list(data.trainees ?? data.students).map((student) => ({ ...student, university: university(student.university) }));
  const assignments = Array.isArray(data.supervisors)
    ? data.supervisors.map((person) => ({
      id: person.id,
      supervisor: { ...person, supervisorProfile: { department: person.department } },
      university: university(person.university), assignmentRole: person.role,
    })) : list(data.overview?.universitySupervisors);
  const tasks = list(data.tasks).map((task) => ({ ...task }));
  if (data.currentTask) {
    const index = tasks.findIndex((task) => task.id === data.currentTask.id);
    const task = { ...(tasks[index] || {}), ...data.currentTask };
    if (index < 0) tasks.push(task);
    else tasks[index] = task;
  }
  return {
    ...data,
    students,
    currentTaskId: data.currentTask?.id ?? data.currentTaskId,
    hasCompleteTaskList: data.hasCompleteTaskList ?? (Array.isArray(data.tasks) && data.tasks.length >= (data.stats.tasks?.total ?? 0)),
    mostActiveTrainees: list(data.mostActiveTrainees).length
      ? list(data.mostActiveTrainees).map((student) => ({ ...student, university: university(student.university) }))
      : students,
    logistics: {
      ...data.logistics,
      attendanceModel: data.logistics?.attendanceModel || {},
      workingSchedule: data.logistics?.workingSchedule || {},
    },
    about: {
      ...data.about,
      techStack: list(data.about.techStack),
      learningObjectives: list(data.about.learningObjectives),
      competencies: list(data.about.competencies),
    },
    tasks: tasks.map((task) => ({ ...task, status: task.status ?? task.badge ?? "", submissions: list(task.submissions) })),
    capacity: { enrolledCount: students.length, maxStudents: null, ...data.capacity },
    stats: {
      ...data.stats,
      internshipProgress: data.stats?.progress ?? data.stats?.internshipProgress,
      tasks: { ...data.stats?.tasks, completed: data.stats?.tasks?.completed ?? null },
    },
    overview: {
      ...data.overview,
      academicPartners: partners,
      universitySupervisors: assignments,
    },
  };
}
