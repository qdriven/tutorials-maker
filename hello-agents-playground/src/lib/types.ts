export const VIEWS = [
  "roadmap",
  "lesson",
  "slides",
  "demo",
  "lab",
  "uc",
  "dict",
] as const

export type ViewName = (typeof VIEWS)[number]

export type PathLine = "tool" | "base" | "build" | "apply"
export type PathFilter = "all" | PathLine

export type PersonaId = "p1" | "p2" | "p3" | "p4"

export type StageId =
  | "tool"
  | "base"
  | "build"
  | "advanced"
  | "capstone"
  | "graduate"

export interface RoadBadge {
  label: string
  tone?: "hot" | "blue" | "dk"
}

export interface RoadNode {
  id: string
  index: string
  title: string
  sub: string
  badges: RoadBadge[]
  time: string
  goto: ViewName
  paths: PathLine[]
  status?: "done" | "now"
}

export interface Stage {
  id: StageId
  index: string
  name: string
  desc: string
  tag: string
  nodes: RoadNode[]
}

export interface LessonQuiz {
  q: string
  opts: string[]
  answer: number
  why: string
}

export interface Lesson {
  title: string
  seconds: number
  pro: boolean
  body: string[]
  code: string
  quiz: LessonQuiz
}

export interface UseCase {
  category: "work" | "research" | "dev" | "life"
  title: string
  en: string
  body: string
  badges: RoadBadge[]
  principle: string
  goto: ViewName
  href: string
  hrefLabel: string
}

export interface Term {
  category: "base" | "paradigm" | "memory" | "proto" | "eval" | "eng"
  title: string
  en: string
  body: string
  jump: string
  goto: ViewName
}

export type Phase = "idle" | "start" | "reason" | "act" | "observe" | "done"

export interface ScenarioStep {
  phase: Exclude<Phase, "idle" | "start">
  kind: "thought" | "action" | "obs" | "answer"
  text?: string
  tool?: string
  arg?: string
}

export interface Scenario {
  goal: string
  steps: ScenarioStep[]
}
