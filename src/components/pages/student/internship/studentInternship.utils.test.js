import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mapStudentInternship, dateLabel } from "./studentInternship.utils.js";

const response = JSON.parse(readFileSync(new URL("./fixtures/student-internship.json", import.meta.url), "utf8"));

test("maps updated student response with named skills and AI analysis and recommendations", () => {
  const updated = JSON.parse(readFileSync(new URL("./fixtures/student-internship-updated.json", import.meta.url), "utf8"));
  const result = mapStudentInternship(updated);
  assert.equal(result.completedHours, 36);
  assert.equal(result.hoursProgress, 10);
  assert.equal(result.progress, 67);
  assert.equal(result.completed, 3);
  assert.equal(result.totalTasks, 6);
  assert.equal(result.submitted, 3);
  assert.equal(result.needsSubmission, 3);
  assert.equal(result.present, 6);
  assert.equal(result.score, 92);
  assert.equal(result.latestEvaluation.score, 92);
  const skills = updated.data.evaluations[0].breakdown.map(({ name, score }) => ({ label: name, value: score }));
  assert.deepEqual(result.skills, skills);
  assert.deepEqual(result.latestSkills, skills);
  assert.equal(result.insight, updated.data.aiEvaluation.analysis);
  assert.equal(result.insightRecommendations, updated.data.aiEvaluation.recommendations);
  assert.deepEqual(mapStudentInternship(updated.data), result);
});

test("maps the supplied student endpoint response, keeping personal hours distinct from overall progress", () => {
  const result = mapStudentInternship(response);
  assert.equal(result.progress, 67);
  assert.equal(result.completedHours, 18);
  assert.equal(result.totalHours, 360);
  assert.equal(result.hoursProgress, 5);
  assert.equal(result.weeksCompleted, 8);
  assert.equal(result.weeksTotal, 12);
  assert.equal(result.completed, 1);
  assert.equal(result.totalTasks, 4);
  assert.equal(result.inProgress, 2);
  assert.equal(result.present, 3);
  assert.equal(result.attendanceRate, 100);
  assert.equal(result.location, "Gaza Tech Hub");
  assert.equal(result.supervisors.length, 2);
  assert.equal(result.supervisors[0].university, "Islamic University of Gaza");
  assert.equal(result.academicPartners.length, 2);
  assert.equal(result.attendanceModel, "On-Site Lab + QR Verification");
  assert.equal(result.checkInStart, "08:45");
  assert.equal(result.minAttendance, 90);
  assert.equal(result.workingSchedule.dailyHours, 6);
  assert.equal(result.venue.remoteTools, "Discord, GitHub");
  assert.equal(result.latestEvaluation.score, 88);
  assert.deepEqual(result.latestSkills.map((item) => item.value), [94, 96, 88, 90]);
  assert.equal(result.insight, undefined);
  assert.deepEqual(mapStudentInternship(response.data), result);
});

test("preserves rubric values and does not mistake the IN_REVIEW badge for a personal submission", () => {
  const result = mapStudentInternship(response);
  assert.equal(result.activeTasks[0].id, response.data.currentTask.id);
  assert.equal(result.activeTasks[0].evaluationCriteria.length, 4);
  assert.equal(result.activeTasks[0].evaluationCriteria.reduce((sum, item) => sum + item.weight, 0), 110);
  assert.deepEqual(result.activeTasks[0].submissions, []);
  assert.equal(result.submitted, 1);
  assert.equal(result.needsSubmission, 3);
});

test("respects nested zero counts and an explicitly missing last task evaluation", () => {
  const result = mapStudentInternship({ ...response.data,
    stats: { progress: { percent: 0, hoursCompleted: 0, hoursTotal: 360 }, tasks: { completed: 0, total: 0 }, attendance: { ratePercent: 0, presentRecords: 0 } },
    lastTaskEvaluation: null,
  });
  assert.equal(result.progress, 0);
  assert.equal(result.completedHours, 0);
  assert.equal(result.completed, 0);
  assert.equal(result.totalTasks, 0);
  assert.equal(result.present, 0);
  assert.equal(result.attendanceRate, 0);
  assert.equal(result.latestEvaluation, null);
  assert.deepEqual(result.latestSkills, []);
});

test("handles currentTask alone and normalizes its singular submission for the existing task drawer", () => {
  const result = mapStudentInternship({ currentTask: { id: 42, status: "IN_PROGRESS", submission: { id: 9, score: 0 }, rubric: [{ title: "Code", weight: 100 }] } });
  assert.equal(result.tasks.length, 1);
  assert.deepEqual(result.activeTasks[0].submissions, [{ id: 9, score: 0 }]);
  assert.equal(result.submitted, 1);
  assert.equal(result.needsSubmission, 0);
});

test("parses spelled-out durations when summary hours are absent", () => {
  const result = mapStudentInternship({ attendance: [{ status: "CHECKED_IN", checkOut: "2026-09-24T12:00:00Z", duration: "6 hours 30 minutes" }] });
  assert.equal(result.completedHours, 6.5);
  assert.equal(result.present, 1);
  assert.equal(result.attendanceRate, 100);
  assert.equal(result.late, 0);
});

test("rejects unsuccessful response envelopes", () => {
  assert.throws(() => mapStudentInternship({ success: false, data: null }));
});

test("preserves authoritative zero statistics and evaluation scores", () => {
  const result = mapStudentInternship({
    stats: { progress: 0, completedHours: 0, totalHours: 360, attendanceRate: 0 },
    attendance: [{ status: "CHECKED_OUT", duration: "6h 30m" }],
    evaluations: [{ score: 0 }],
  });
  assert.equal(result.progress, 0);
  assert.equal(result.completedHours, 0);
  assert.equal(result.attendanceRate, 0);
  assert.equal(result.score, 0);
});

test("missing program and evaluation data stays unknown", () => {
  const result = mapStudentInternship({ opportunity: { duration: "3 months" } });
  assert.equal(result.totalHours, null);
  assert.equal(result.completedHours, null);
  assert.equal(result.progress, null);
  assert.equal(result.attendanceRate, null);
  assert.equal(result.score, null);
  assert.equal(result.endDate, undefined);
  assert.deepEqual(result.skills, []);
  assert.equal(dateLabel(result.endDate), "Not specified");
});

test("pending check-ins are not counted as late or absent", () => {
  const result = mapStudentInternship({
    attendance: [{ status: "CHECKED_IN" }, { status: "CHECKED_OUT", duration: "6h 30m" }, { status: "MARKED_ABSENT" }, { status: "LATE", duration: "5h" }],
    stats: { totalHours: 100 },
  });
  assert.equal(result.present, 2);
  assert.equal(result.late, 1);
  assert.equal(result.attendanceRate, 67);
  assert.equal(result.completedHours, 11.5);
  assert.equal(result.progress, 12);
});

test("shows active tasks by deadline, distinguishing received submissions", () => {
  const tasks = [
    { id: 1, status: "TODO", deadline: "2026-10-10" },
    { id: 2, status: "DONE" },
    { id: 3, status: "IN_PROGRESS", deadline: "2026-10-01", submissions: [{ id: 10 }] },
  ];
  const result = mapStudentInternship({ tasks });
  assert.deepEqual(result.activeTasks.map((task) => task.id), [3, 1]);
  assert.equal(result.completed, 1);
  assert.equal(result.submitted, 1);
  assert.equal(result.needsSubmission, 1);
  assert.deepEqual(tasks.map((task) => task.id), [1, 2, 3]);
});

test("selects latest evaluation without mutating server data or inventing skills", () => {
  const evaluations = [
    { createdAt: "2026-08-01", score: 60 },
    { createdAt: "2026-09-01", score: 90, skills: { technical: 94, communication: 0 } },
    { createdAt: "2026-07-01", score: null },
  ];
  const result = mapStudentInternship({ evaluations });
  assert.equal(result.latestEvaluation.score, 90);
  assert.equal(result.score, 75);
  assert.deepEqual(result.skills, [{ label: "technical", value: 94 }, { label: "communication", value: 0 }]);
  assert.equal(evaluations[0].score, 60);
});

test("accepts null collections and invalid dates without crashing", () => {
  const result = mapStudentInternship({ tasks: null, evaluations: null, attendance: null });
  assert.deepEqual(result.activeTasks, []);
  assert.equal(result.latestEvaluation, null);
  assert.equal(dateLabel("not-a-date"), "Not specified");
});
