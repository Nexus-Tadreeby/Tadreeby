import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mapTrainerInternship } from "./mapTrainerInternship.js";

const response = JSON.parse(readFileSync(new URL("./fixtures/trainer-internship.json", import.meta.url), "utf8"));

test("adapts the supplied trainer response without substituting student statistics", () => {
  const result = mapTrainerInternship(response);
  assert.equal(result.stats.internshipProgress.hoursCompleted, 240);
  assert.equal(result.stats.tasks.total, 4);
  assert.equal(result.stats.tasks.completed, null);
  assert.equal(result.capacity.enrolledCount, 2);
  assert.equal(result.capacity.maxStudents, null);
  assert.equal(result.tasks[0].expectedSubmissions, 2);
  assert.equal(result.tasks[0].status, "IN_REVIEW");
  assert.equal(result.students[0].university.name, "Islamic University of Gaza");
  assert.equal(result.students[0].university.shortCode, "iug");
  const assignment = result.overview.universitySupervisors[0];
  assert.equal(assignment.university.id, result.students[0].university.id);
  assert.equal(assignment.supervisor.supervisorProfile.department, "Computer Science");
  assert.equal(assignment.assignmentRole, "Islamic University Coordinator");
  assert.equal(typeof response.trainees[0].university, "string");
});

test("supports the previous trainer model without duplicating its current task", () => {
  const previous = mapTrainerInternship(response);
  delete previous.stats.progress;
  delete previous.trainees;
  delete previous.supervisors;
  previous.capacity.maxStudents = 20;
  previous.stats.tasks.completed = 0;
  const result = mapTrainerInternship(previous);
  assert.equal(result.tasks.length, 1);
  assert.equal(result.capacity.maxStudents, 20);
  assert.equal(result.stats.tasks.completed, 0);
  assert.equal(result.stats.internshipProgress.percent, 67);
  assert.equal(result.overview.universitySupervisors.length, 2);
});

test("raw trainer data without students can safely render the trainee preview", () => {
  assert.equal(response.students, undefined);
  const result = mapTrainerInternship(response);
  assert.deepEqual(result.students.slice(0, 4).map((student) => student.id), [7, 8]);
  assert.deepEqual(mapTrainerInternship(result), result);
});

test("missing, null, and malformed roster collections render an empty preview", () => {
  for (const trainees of [undefined, null, {}]) {
    const result = mapTrainerInternship({ ...response, trainees, students: undefined, supervisors: null, tasks: null });
    assert.deepEqual(result.students.slice(0, 4), []);
    assert.deepEqual(result.overview.universitySupervisors, []);
    assert.equal(result.capacity.enrolledCount, 0);
  }
});

test("keeps logistics and academic counts from the API even when they differ from the roster", () => {
  const input = structuredClone(response);
  input.logistics.attendanceModel = { type: "Remote", minPercent: 0 };
  input.logistics.workingSchedule = { days: "Monday", hours: "10:00 - 14:00", notes: "Online" };
  input.overview.academicPartners[0].studentCount = 12;
  const result = mapTrainerInternship(input);
  assert.deepEqual(result.logistics, input.logistics);
  assert.equal(result.overview.academicPartners[0].studentCount, 12);
  assert.equal(result.currentTaskId, input.currentTask.id);
  assert.equal(result.hasCompleteTaskList, false);
  assert.deepEqual(result.mostActiveTrainees, result.students);
});

test("distinguishes a full task list from the summary endpoint's single task", () => {
  const input = { ...response, tasks: [response.currentTask, { id: 2 }, { id: 3 }, { id: 4 }] };
  assert.equal(mapTrainerInternship(input).hasCompleteTaskList, true);
  assert.equal(mapTrainerInternship(response).tasks.length, 1);
  assert.equal(mapTrainerInternship(response).stats.tasks.total, 4);
});

test("normalizes optional collections and accepts a success envelope", () => {
  const input = { ...response, about: {}, logistics: null, mostActiveTrainees: null };
  const result = mapTrainerInternship({ success: true, data: input });
  assert.deepEqual(result.about.techStack, []);
  assert.deepEqual(result.about.learningObjectives, []);
  assert.deepEqual(result.about.competencies, []);
  assert.deepEqual(result.logistics.attendanceModel, {});
  assert.deepEqual(result.mostActiveTrainees, result.students);
});

test("uses the supplied trainee roster when activity is empty, and prefers populated activity", () => {
  const result = mapTrainerInternship(response);
  assert.equal(result.mostActiveTrainees[0].firstName, "Approved");
  assert.equal(result.mostActiveTrainees[0].university.name, "Islamic University of Gaza");
  assert.equal(result.mostActiveTrainees[0].status, "Optimal");
  const ranked = [response.trainees[1]];
  const active = mapTrainerInternship({ ...response, mostActiveTrainees: ranked }).mostActiveTrainees;
  assert.deepEqual(active.map((student) => student.id), ranked.map((student) => student.id));
  assert.equal(active[0].university.shortCode, "azu");
});

test("rejects incomplete nested data before it can reach the screen", () => {
  assert.throws(() => mapTrainerInternship({ ...response, stats: {} }), /incomplete/);
  assert.throws(() => mapTrainerInternship({ success: false }), /Unable/);
});
