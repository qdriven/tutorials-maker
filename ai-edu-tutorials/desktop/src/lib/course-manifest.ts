/**
 * Course package manifest - types + validator.
 * Contract: docs/project/spec/contracts/course-manifest.md
 *
 * No zod dependency: validation is hand-rolled so the schema stays
 * install-free and easy to read alongside the contract doc.
 */

export type RoleKind = "teacher" | "peer" | "ta"

export type Role = {
  id: string
  name: string
  kind: RoleKind
  persona: string
  openingLine?: string
}

export type SceneKind = "slide" | "interactive" | "pbl"

export type SlideContent = {
  title: string
  body: string
  speakerNotes?: string
}

export type InteractiveContent = {
  prompt: string
  interactionType: "chat" | "drag-drop" | "input" | "sandbox"
  expectedOutcome?: string
}

export type PblContent = {
  task: string
  resources?: string[]
}

export type Scene = {
  id: string
  title: string
  kind: SceneKind
  roleIds: string[]
  slide?: SlideContent
  interactive?: InteractiveContent
  pbl?: PblContent
  quizId?: string
}

export type ChoiceQuestion = {
  id: string
  kind: "choice"
  prompt: string
  options: string[]
  correctIndex: number
  points: number
  explanation?: string
}

export type OpenQuestion = {
  id: string
  kind: "open"
  prompt: string
  rubric: string
  referenceAnswer?: string
  points: number
}

export type TaskQuestion = {
  id: string
  kind: "task"
  prompt: string
  roleIds: string[]
  gradingNotes: string
  points: number
}

export type Question = ChoiceQuestion | OpenQuestion | TaskQuestion

export type Quiz = {
  id: string
  sceneId?: string
  title: string
  questions: Question[]
  passThresholdPct: number
}

export type MasteryCheckpoint = {
  id: string
  label: string
  quizIds: string[]
  requiredPct: number
}

export type CourseMeta = {
  id: string
  title: string
  description: string
  audience: string
  durationMinutes: number
  sourcePdf?: string
  version: string
}

export type CoursePackage = {
  schemaVersion: 1
  meta: CourseMeta
  roles: Role[]
  scenes: Scene[]
  quizzes: Quiz[]
  mastery: MasteryCheckpoint[]
}

export type ValidationResult =
  | { ok: true; value: CoursePackage }
  | { ok: false; errors: string[] }

const SCHEMA_VERSION = 1 as const

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isString(value: unknown): value is string {
  return typeof value === "string"
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value)
}

function nonEmpty(value: unknown): value is string {
  return isString(value) && value.trim().length > 0
}

/**
 * Validate an untrusted object as a CoursePackage.
 * Returns all discovered errors (does not short-circuit) so callers can
 * show the user every problem at once.
 */
export function validateCoursePackage(input: unknown): ValidationResult {
  const errors: string[] = []

  if (!isObject(input)) {
    return { ok: false, errors: ["Root must be an object."] }
  }

  if (input.schemaVersion !== SCHEMA_VERSION) {
    errors.push(
      `meta.schemaVersion must be ${SCHEMA_VERSION} (got ${JSON.stringify(input.schemaVersion)}).`,
    )
  }

  const roleIds = new Set<string>()
  const sceneIds = new Set<string>()
  const quizIds = new Set<string>()

  // ---- meta ----
  const meta = input.meta
  if (!isObject(meta)) {
    errors.push("meta must be an object.")
  } else {
    if (!nonEmpty(meta.id)) errors.push("meta.id must be a non-empty string.")
    if (!nonEmpty(meta.title)) errors.push("meta.title must be a non-empty string.")
    if (!nonEmpty(meta.description)) errors.push("meta.description must be a non-empty string.")
    if (!nonEmpty(meta.audience)) errors.push("meta.audience must be a non-empty string.")
    if (!isNumber(meta.durationMinutes) || meta.durationMinutes <= 0) {
      errors.push("meta.durationMinutes must be a positive number.")
    }
    if (!nonEmpty(meta.version)) errors.push("meta.version must be a non-empty string.")
  }

  // ---- roles ----
  const roles = input.roles
  if (!Array.isArray(roles)) {
    errors.push("roles must be an array.")
  } else {
    let teacherCount = 0
    let peerCount = 0
    roles.forEach((role, i) => {
      if (!isObject(role)) {
        errors.push(`roles[${i}] must be an object.`)
        return
      }
      if (!nonEmpty(role.id)) errors.push(`roles[${i}].id must be non-empty.`)
      else if (roleIds.has(role.id as string)) errors.push(`roles[${i}].id duplicates "${role.id}".`)
      else roleIds.add(role.id as string)
      if (!nonEmpty(role.name)) errors.push(`roles[${i}].name must be non-empty.`)
      const kind = role.kind
      if (kind !== "teacher" && kind !== "peer" && kind !== "ta") {
        errors.push(`roles[${i}].kind must be teacher|peer|ta (got ${JSON.stringify(kind)}).`)
      } else {
        if (kind === "teacher") teacherCount++
        if (kind === "peer") peerCount++
      }
      if (!nonEmpty(role.persona)) errors.push(`roles[${i}].persona must be non-empty.`)
    })
    if (teacherCount < 1) errors.push("roles must include at least 1 teacher.")
    if (peerCount < 1) errors.push("roles must include at least 1 peer.")
  }

  // ---- scenes ----
  const scenes = input.scenes
  if (!Array.isArray(scenes)) {
    errors.push("scenes must be an array.")
  } else {
    scenes.forEach((scene, i) => {
      if (!isObject(scene)) {
        errors.push(`scenes[${i}] must be an object.`)
        return
      }
      if (!nonEmpty(scene.id)) errors.push(`scenes[${i}].id must be non-empty.`)
      else if (sceneIds.has(scene.id as string)) errors.push(`scenes[${i}].id duplicates "${scene.id}".`)
      else sceneIds.add(scene.id as string)
      if (!nonEmpty(scene.title)) errors.push(`scenes[${i}].title must be non-empty.`)
      const kind = scene.kind
      if (kind !== "slide" && kind !== "interactive" && kind !== "pbl") {
        errors.push(`scenes[${i}].kind must be slide|interactive|pbl.`)
      }
      if (!Array.isArray(scene.roleIds) || scene.roleIds.length === 0) {
        errors.push(`scenes[${i}].roleIds must be a non-empty array.`)
      } else {
        for (const rid of scene.roleIds as unknown[]) {
          if (!roleIds.has(rid as string)) {
            errors.push(`scenes[${i}].roleIds references unknown role "${rid}".`)
          }
        }
      }
      if (kind === "slide" && !isObject(scene.slide)) {
        errors.push(`scenes[${i}] kind=slide requires slide content.`)
      }
      if (kind === "interactive" && !isObject(scene.interactive)) {
        errors.push(`scenes[${i}] kind=interactive requires interactive content.`)
      }
      if (kind === "pbl" && !isObject(scene.pbl)) {
        errors.push(`scenes[${i}] kind=pbl requires pbl content.`)
      }
    })
  }

  // ---- quizzes ----
  const quizzes = input.quizzes
  if (!Array.isArray(quizzes)) {
    errors.push("quizzes must be an array.")
  } else {
    quizzes.forEach((quiz, i) => {
      if (!isObject(quiz)) {
        errors.push(`quizzes[${i}] must be an object.`)
        return
      }
      if (!nonEmpty(quiz.id)) errors.push(`quizzes[${i}].id must be non-empty.`)
      else if (quizIds.has(quiz.id as string)) errors.push(`quizzes[${i}].id duplicates "${quiz.id}".`)
      else quizIds.add(quiz.id as string)
      if (quiz.sceneId !== undefined && !sceneIds.has(quiz.sceneId as string)) {
        errors.push(`quizzes[${i}].sceneId references unknown scene "${quiz.sceneId}".`)
      }
      if (!nonEmpty(quiz.title)) errors.push(`quizzes[${i}].title must be non-empty.`)
      const pct = quiz.passThresholdPct
      if (!isNumber(pct) || pct < 0 || pct > 100) {
        errors.push(`quizzes[${i}].passThresholdPct must be 0..100.`)
      }
      if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        errors.push(`quizzes[${i}].questions must be a non-empty array.`)
      } else {
        quiz.questions.forEach((q, qi) => validateQuestion(q, i, qi, roleIds, errors))
      }
    })
  }

  // ---- mastery ----
  const mastery = input.mastery
  if (!Array.isArray(mastery)) {
    errors.push("mastery must be an array.")
  } else {
    mastery.forEach((cp, i) => {
      if (!isObject(cp)) {
        errors.push(`mastery[${i}] must be an object.`)
        return
      }
      if (!nonEmpty(cp.id)) errors.push(`mastery[${i}].id must be non-empty.`)
      if (!nonEmpty(cp.label)) errors.push(`mastery[${i}].label must be non-empty.`)
      if (!Array.isArray(cp.quizIds) || cp.quizIds.length === 0) {
        errors.push(`mastery[${i}].quizIds must be a non-empty array.`)
      } else {
        for (const qid of cp.quizIds as unknown[]) {
          if (!quizIds.has(qid as string)) {
            errors.push(`mastery[${i}].quizIds references unknown quiz "${qid}".`)
          }
        }
      }
      const req = cp.requiredPct
      if (!isNumber(req) || req < 0 || req > 100) {
        errors.push(`mastery[${i}].requiredPct must be 0..100.`)
      }
    })
  }

  if (errors.length > 0) {
    return { ok: false, errors }
  }
  return { ok: true, value: input as CoursePackage }
}

function validateQuestion(
  q: unknown,
  quizIndex: number,
  qIndex: number,
  roleIds: Set<string>,
  errors: string[],
) {
  const where = `quizzes[${quizIndex}].questions[${qIndex}]`
  if (!isObject(q)) {
    errors.push(`${where} must be an object.`)
    return
  }
  if (!nonEmpty(q.id)) errors.push(`${where}.id must be non-empty.`)
  if (!nonEmpty(q.prompt)) errors.push(`${where}.prompt must be non-empty.`)
  if (!isNumber(q.points) || q.points < 0) errors.push(`${where}.points must be >= 0.`)
  const kind = q.kind
  if (kind === "choice") {
    if (!Array.isArray(q.options) || q.options.length < 2) {
      errors.push(`${where} kind=choice requires options (>=2).`)
    }
    if (!isNumber(q.correctIndex) || (Array.isArray(q.options) && (q.correctIndex < 0 || q.correctIndex >= q.options.length))) {
      errors.push(`${where}.correctIndex out of range.`)
    }
  } else if (kind === "open") {
    if (!nonEmpty(q.rubric)) errors.push(`${where} kind=open requires rubric.`)
  } else if (kind === "task") {
    if (!nonEmpty(q.gradingNotes)) errors.push(`${where} kind=task requires gradingNotes.`)
    if (!Array.isArray(q.roleIds) || q.roleIds.length === 0) {
      errors.push(`${where} kind=task requires roleIds.`)
    } else {
      for (const rid of q.roleIds as unknown[]) {
        if (!roleIds.has(rid as string)) errors.push(`${where}.roleIds references unknown role "${rid}".`)
      }
    }
  } else {
    errors.push(`${where}.kind must be choice|open|task (got ${JSON.stringify(kind)}).`)
  }
}

export const COURSE_FILE_EXTENSION = ".edu-course.json"

export function createEmptyCourse(meta: CourseMeta): CoursePackage {
  return {
    schemaVersion: 1,
    meta,
    roles: [
      { id: "teacher", name: "Teacher", kind: "teacher", persona: "A patient STEM teacher." },
      { id: "peer", name: "Peer", kind: "peer", persona: "A curious classmate." },
    ],
    scenes: [],
    quizzes: [],
    mastery: [],
  }
}

export function newId(prefix: string): string {
  // crypto.randomUUID is available in Tauri webview + modern browsers.
  return `${prefix}_${crypto.randomUUID()}`
}
