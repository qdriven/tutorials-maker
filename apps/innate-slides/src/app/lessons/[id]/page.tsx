import { notFound } from "next/navigation"

import { PlayerShell } from "@/components/player/player-shell"
import { allLessons, getLesson, lessonContext, lessonNeighbors } from "@/lib/lessons"

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return allLessons.map((lesson) => ({ id: lesson.id }))
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params
  const lesson = getLesson(id)

  if (!lesson) {
    notFound()
  }

  const { prev, next } = lessonNeighbors(id)

  return (
    <PlayerShell
      lesson={lesson}
      context={lessonContext(lesson)}
      catalog={allLessons.map(({ id: lessonId, title }) => ({ id: lessonId, title }))}
      prev={prev}
      next={next}
      chatLive={Boolean(process.env.ANTHROPIC_API_KEY)}
      providerLabel={providerLabel()}
    />
  )
}

/** 助教后端标签：live 时显示 provider/model，离线时显示配置提示 */
function providerLabel(): string {
  if (!process.env.ANTHROPIC_API_KEY) {
    return "离线模式"
  }
  const model = process.env.MODEL_ID ?? "claude-sonnet-4-6"
  const base = process.env.ANTHROPIC_BASE_URL
    ? new URL(process.env.ANTHROPIC_BASE_URL).host
    : "api.anthropic.com"
  return `${model} · ${base}`
}
