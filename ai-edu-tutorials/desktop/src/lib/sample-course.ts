/**
 * Sample course package - a short STEM lesson used as the MVP acceptance
 * course (issue edu-sample-course) and as a manifest fixture.
 *
 * Passes validateCoursePackage() (see desktop/src/lib/course-manifest.ts).
 */
import type { CoursePackage } from "./course-manifest"

export const SAMPLE_COURSE: CoursePackage = {
  schemaVersion: 1,
  meta: {
    id: "newtons-second-law",
    title: "Newton's Second Law in 15 Minutes",
    description:
      "A short interactive lesson on F = ma: slide recap, a guided chat with a peer, and a quick task quiz.",
    audience: "High-school physics, first exposure to dynamics",
    durationMinutes: 15,
    sourcePdf: "samples/newtons-second-law.pdf",
    version: "1.0.0",
  },
  roles: [
    {
      id: "teacher",
      name: "Ms. Liu",
      kind: "teacher",
      persona: "A patient physics teacher who reasons from diagrams and checks understanding.",
      openingLine: "Today we connect force, mass, and acceleration with one equation.",
    },
    {
      id: "peer",
      name: "Sam",
      kind: "peer",
      persona: "A curious classmate who asks the questions a student would.",
      openingLine: "Wait, doesn't a heavier thing just fall faster?",
    },
  ],
  scenes: [
    {
      id: "scene-slide-recap",
      title: "Recap: what is F = ma",
      kind: "slide",
      roleIds: ["teacher", "peer"],
      slide: {
        title: "F = ma",
        body: "Net force equals mass times acceleration.\n\n- F in newtons (N)\n- m in kilograms (kg)\n- a in m/s^2",
        speakerNotes: "Emphasize net force, not any single force.",
      },
    },
    {
      id: "scene-interactive-freedom",
      title: "Free fall chat with Sam",
      kind: "interactive",
      roleIds: ["peer", "teacher"],
      interactive: {
        prompt: "Resolve Sam's misconception about heavier objects falling faster.",
        interactionType: "chat",
        expectedOutcome:
          "Sam articulates that g is the same for all masses in vacuum (ignoring air resistance).",
      },
    },
    {
      id: "scene-pbl-cart",
      title: "Task: push a cart",
      kind: "pbl",
      roleIds: ["teacher", "peer"],
      pbl: {
        task: "Given a 2 kg cart, compute the acceleration under a 6 N net force, then explain what doubling the force does.",
        resources: ["whiteboard", "newton-balance"],
      },
    },
  ],
  quizzes: [
    {
      id: "quiz-cart",
      sceneId: "scene-pbl-cart",
      title: "Cart computation check",
      passThresholdPct: 60,
      questions: [
        {
          id: "q-accel",
          kind: "choice",
          prompt: "A 2 kg cart under a 6 N net force accelerates at:",
          options: ["1 m/s^2", "3 m/s^2", "6 m/s^2", "12 m/s^2"],
          correctIndex: 1,
          points: 5,
          explanation: "a = F/m = 6/2 = 3 m/s^2.",
        },
        {
          id: "q-double",
          kind: "open",
          prompt: "If the force doubles to 12 N, what happens to the acceleration, and why?",
          rubric: "Must state acceleration doubles (to 6 m/s^2) because a is proportional to F at constant m.",
          referenceAnswer: "It doubles to 6 m/s^2 since a = F/m and m is unchanged.",
          points: 5,
        },
        {
          id: "q-task-explain",
          kind: "task",
          prompt: "Explain to Sam why a heavier cart needs more force for the same acceleration.",
          roleIds: ["peer"],
          gradingNotes: "Look for m in the denominator: same a needs larger F as m grows.",
          points: 5,
        },
      ],
    },
    {
      id: "quiz-final",
      title: "Lesson mastery check",
      passThresholdPct: 70,
      questions: [
        {
          id: "q-units",
          kind: "choice",
          prompt: "Which unit combination is consistent with F = ma?",
          options: ["kg * m/s", "kg * m/s^2", "g * cm/s", "kg / s^2"],
          correctIndex: 1,
          points: 5,
          explanation: "1 N = 1 kg*m/s^2.",
        },
      ],
    },
  ],
  mastery: [
    {
      id: "mastery-dynamics",
      label: "Can apply F = ma",
      quizIds: ["quiz-cart", "quiz-final"],
      requiredPct: 70,
    },
  ],
}
