import type { PersonaId } from "./types"

const LESSON_KEY = "hap.lesson.v1"
const PERSONA_KEY = "hap.persona"

const PERSONA_IDS: readonly PersonaId[] = ["p1", "p2", "p3", "p4"]

export interface LessonProgress {
  cur: number
  done: Record<string, boolean>
}

export function readPersona(): PersonaId | null {
  try {
    const value = JSON.parse(localStorage.getItem(PERSONA_KEY) || "null") as unknown
    if (typeof value === "string" && PERSONA_IDS.includes(value as PersonaId)) {
      return value as PersonaId
    }
  } catch {
    /* ignore broken storage */
  }
  return null
}

export function writePersona(persona: PersonaId | null) {
  localStorage.setItem(PERSONA_KEY, JSON.stringify(persona))
}

export function readLessonProgress(count: number): LessonProgress {
  try {
    const value = JSON.parse(localStorage.getItem(LESSON_KEY) || "null") as
      | { cur?: number; done?: Record<string, boolean> }
      | null
    if (value?.done) {
      const cur = Math.min(Math.max(value.cur ?? 0, 0), Math.max(count - 1, 0))
      return { cur, done: value.done }
    }
  } catch {
    /* ignore broken storage */
  }
  return { cur: 0, done: {} }
}

export function writeLessonProgress(progress: LessonProgress) {
  localStorage.setItem(LESSON_KEY, JSON.stringify(progress))
}
