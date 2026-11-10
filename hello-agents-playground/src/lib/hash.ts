import { VIEWS, type ViewName } from "./types"

export function isViewName(value: string): value is ViewName {
  return (VIEWS as readonly string[]).includes(value)
}

export function parseHash(
  hash: string,
  lessonCount: number
): { view: ViewName; lesson: number } {
  const raw = hash.replace(/^#\/?/, "")
  const [name, lessonPart] = raw.split("/")
  const view = name && isViewName(name) ? name : "roadmap"
  const parsed = Number.parseInt(lessonPart ?? "", 10)
  const lesson =
    view === "lesson" && Number.isFinite(parsed)
      ? Math.min(lessonCount, Math.max(1, parsed))
      : 1
  return { view, lesson }
}

export function hashFor(view: ViewName, lesson: number): string {
  return view === "lesson" ? `#/lesson/${lesson}` : `#/${view}`
}
