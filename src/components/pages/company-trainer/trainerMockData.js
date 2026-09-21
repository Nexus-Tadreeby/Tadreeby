// Temporary frontend-only demo data.
// Remove/replace these fallbacks when the trainer backend endpoints are ready.

export const DUMMY_TRAINER_STUDENTS = [
  { id: "dummy-student-1", student: { user: { firstName: "Lina", lastName: "Hassan" }, major: "Software Engineering", email: "lina.hassan@example.com" } },
  { id: "dummy-student-2", student: { user: { firstName: "Omar", lastName: "Khaled" }, major: "Computer Science", email: "omar.khaled@example.com" } },
  { id: "dummy-student-3", student: { user: { firstName: "Sara", lastName: "Ali" }, major: "Information Technology", email: "sara.ali@example.com" } },
  { id: "dummy-student-4", student: { user: { firstName: "Yousef", lastName: "Nasser" }, major: "Software Engineering", email: "yousef.nasser@example.com" } },
  { id: "dummy-student-5", student: { user: { firstName: "Maya", lastName: "Saleh" }, major: "Computer Science", email: "maya.saleh@example.com" } },
];

export const DUMMY_TRAINER_APPLICATIONS = [
  { id: "dummy-app-1", student: { user: { firstName: "Lina", lastName: "Hassan" }, major: "Software Engineering" }, opportunity: { title: "Frontend Development Internship" } },
  { id: "dummy-app-2", student: { user: { firstName: "Omar", lastName: "Khaled" }, major: "Computer Science" }, opportunity: { title: "Frontend Development Internship" } },
  { id: "dummy-app-3", student: { user: { firstName: "Sara", lastName: "Ali" }, major: "Information Technology" }, opportunity: { title: "Frontend Development Internship" } },
  { id: "dummy-app-4", student: { user: { firstName: "Yousef", lastName: "Nasser" }, major: "Software Engineering" }, opportunity: { title: "Frontend Development Internship" } },
];

export const DUMMY_TRAINER_TASKS = [
  { id: "dummy-task-1", title: "Company Introduction", description: "Prepare a short introduction about the company and its products.", dueDate: "2026-09-10", status: "PENDING", submittedCount: 22, totalStudents: 24 },
  { id: "dummy-task-2", title: "Project Proposal", description: "Submit the proposal for the internship project.", dueDate: "2026-09-12", status: "SUBMITTED", submittedCount: 20, totalStudents: 24 },
  { id: "dummy-task-3", title: "Weekly Report – Week 1", description: "Submit the first weekly internship progress report.", dueDate: "2026-09-05", status: "SUBMITTED", submittedCount: 24, totalStudents: 24 },
  { id: "dummy-task-4", title: "Weekly Report – Week 2", description: "Submit the second weekly internship progress report.", dueDate: "2026-09-12", status: "SUBMITTED", submittedCount: 18, totalStudents: 24 },
  { id: "dummy-task-5", title: "Midterm Presentation", description: "Prepare and submit the midterm presentation.", dueDate: "2026-09-20", status: "PENDING", submittedCount: 16, totalStudents: 24 },
  { id: "dummy-task-6", title: "Final Report", description: "Submit the final internship report.", dueDate: "2026-10-01", status: "PENDING", submittedCount: 10, totalStudents: 24 },
];

export const DUMMY_TRAINER_DASHBOARD = {
  company: { name: "Atlas Technologies" },
  internship: { startDate: "2026-07-20", endDate: "2026-10-07" },
  stats: {
    totalStudents: 24,
    pendingApplications: 4,
    activeTasks: 5,
    completedTasks: 1,
    attendanceRate: 86.7,
  },
};
