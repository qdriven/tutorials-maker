import { useCallback, useEffect, useState } from "react"
import { PersonaDialog } from "./components/persona-dialog"
import { Shell } from "./components/shell"
import { hashFor, parseHash } from "./lib/hash"
import { LESSONS } from "./lib/lessons"
import { PERSONAS } from "./lib/roadmap"
import { readPersona, writePersona } from "./lib/storage"
import type { PathFilter, PersonaId, ViewName } from "./lib/types"
import { DictionaryView } from "./views/dictionary"
import { LabView } from "./views/lab"
import { LessonView } from "./views/lesson"
import { PlaygroundView } from "./views/playground"
import { RoadmapView } from "./views/roadmap"
import { SlidesView } from "./views/slides"
import { UseCasesView } from "./views/usecases"

function initialRoute() {
  if (!location.hash) return { view: "roadmap" as ViewName, lesson: 1 }
  return parseHash(location.hash, LESSONS.length)
}

export function App() {
  const initialPersona = readPersona()
  const [view, setView] = useState<ViewName>(() => initialRoute().view)
  const [lesson, setLesson] = useState(() => initialRoute().lesson)
  const [persona, setPersona] = useState<PersonaId | null>(initialPersona)
  const [path, setPath] = useState<PathFilter>(initialPersona ? PERSONAS[initialPersona].line : "all")
  const [personaOpen, setPersonaOpen] = useState(false)

  const syncHash = useCallback((nextView: ViewName, nextLesson: number, mode: "push" | "replace") => {
    const hash = hashFor(nextView, nextLesson)
    if (location.hash === hash) return
    if (mode === "push") history.pushState(null, "", hash)
    else history.replaceState(null, "", hash)
  }, [])

  const go = useCallback(
    (nextView: ViewName, nextLesson = lesson) => {
      const lessonNo = nextView === "lesson" ? nextLesson : lesson
      setView(nextView)
      if (nextView === "lesson") setLesson(lessonNo)
      syncHash(nextView, lessonNo, "push")
    },
    [lesson, syncHash]
  )

  useEffect(() => {
    if (!location.hash) history.replaceState(null, "", "#/roadmap")
    const apply = () => {
      const next = parseHash(location.hash, LESSONS.length)
      setView(next.view)
      if (next.view === "lesson") setLesson(next.lesson)
    }
    window.addEventListener("hashchange", apply)
    window.addEventListener("popstate", apply)
    return () => {
      window.removeEventListener("hashchange", apply)
      window.removeEventListener("popstate", apply)
    }
  }, [])

  useEffect(() => {
    if (readPersona()) return
    const timer = window.setTimeout(() => setPersonaOpen(true), 700)
    return () => window.clearTimeout(timer)
  }, [])

  function choosePersona(id: PersonaId) {
    setPersona(id)
    setPath(PERSONAS[id].line)
    writePersona(id)
    setPersonaOpen(false)
    go("roadmap")
  }

  function skipPersona() {
    setPersona(null)
    setPath("all")
    writePersona(null)
    setPersonaOpen(false)
  }

  return (
    <>
      <Shell
        view={view}
        personaName={persona ? PERSONAS[persona].name : "选择画像"}
        onNavigate={(next) => go(next)}
        onPersona={() => setPersonaOpen(true)}
      >
        <RoadmapView
          hidden={view !== "roadmap"}
          path={path}
          persona={persona}
          onPath={setPath}
          onNavigate={go}
          onPersona={() => setPersonaOpen(true)}
        />
        <LessonView hidden={view !== "lesson"} lesson={lesson} onLesson={(next) => go("lesson", next)} />
        <SlidesView hidden={view !== "slides"} onNavigate={go} />
        <PlaygroundView hidden={view !== "demo"} />
        <LabView hidden={view !== "lab"} />
        <UseCasesView hidden={view !== "uc"} onNavigate={go} />
        <DictionaryView hidden={view !== "dict"} onNavigate={go} />
      </Shell>
      <PersonaDialog
        open={personaOpen}
        onOpenChange={setPersonaOpen}
        onChoose={choosePersona}
        onSkip={skipPersona}
      />
    </>
  )
}
