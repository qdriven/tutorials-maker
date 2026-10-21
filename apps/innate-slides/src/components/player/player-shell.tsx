"use client"

/**
 * 三区播放器编排：中央课件 iframe + 右侧要点栏 + 底部 AI 助教。
 * slideNavRef 由 SlidesPane 注册，AI 助教的 go_to_slide 动作通过它驱动课件翻页，
 * 实现「对话 ↔ 课件」双向联动。
 */
import { useCallback, useRef, useState } from "react"

import type { LessonContent } from "@/lib/parse-lesson"

import { ChatDock } from "./chat-dock"
import { LessonHeader } from "./lesson-header"
import { PointsSidebar } from "./points-sidebar"
import { SlidesPane } from "./slides-pane"

export interface CatalogEntry {
  id: string
  title: string
}

export interface NeighborLesson {
  id: string
  title: string
  tagline: string
  layer: string
}

export function PlayerShell({
  lesson,
  context,
  catalog,
  prev,
  next,
  chatLive,
  providerLabel,
}: {
  lesson: LessonContent
  context: string
  catalog: CatalogEntry[]
  prev?: NeighborLesson
  next?: NeighborLesson
  chatLive: boolean
  providerLabel: string
}) {
  const [slideNo, setSlideNo] = useState(1)
  const slideNavRef = useRef<(slide: number) => void>(() => {})

  const registerSlideNav = useCallback((navigate: (slide: number) => void) => {
    slideNavRef.current = navigate
  }, [])

  const goToSlide = useCallback((slide: number) => {
    slideNavRef.current(slide)
  }, [])

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <LessonHeader
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        catalog={catalog}
        prev={prev}
        next={next}
      />
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <SlidesPane
            key={`slides-${lesson.id}`}
            lessonId={lesson.id}
            onSlideChange={setSlideNo}
            registerNav={registerSlideNav}
          />
          <ChatDock
            key={`chat-${lesson.id}`}
            lesson={lesson}
            context={context}
            slideNo={slideNo}
            chatLive={chatLive}
            providerLabel={providerLabel}
            goToSlide={goToSlide}
          />
        </div>
        <PointsSidebar lesson={lesson} slideNo={slideNo} />
      </div>
    </div>
  )
}
