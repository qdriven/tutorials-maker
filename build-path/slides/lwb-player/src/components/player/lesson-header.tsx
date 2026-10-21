"use client"

import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@innate/ui"

import type { CatalogEntry, NeighborLesson } from "./player-shell"

export function LessonHeader({
  lessonId,
  lessonTitle,
  catalog,
  prev,
  next,
}: {
  lessonId: string
  lessonTitle: string
  catalog: CatalogEntry[]
  prev?: NeighborLesson
  next?: NeighborLesson
}) {
  const router = useRouter()

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <div className="flex min-w-0 items-center gap-2">
        <GraduationCap className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <span className="hidden shrink-0 text-sm font-semibold tracking-tight md:inline">
          learn-workbuddy
        </span>
        <span className="hidden text-muted-foreground md:inline">·</span>
        <span className="truncate text-sm text-muted-foreground">{lessonTitle}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={!prev}
          aria-label={prev ? `上一课：${prev.title}` : "已是第一课"}
          onClick={() => prev && router.push(`/lessons/${prev.id}`)}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>

        <Select value={lessonId} onValueChange={(value) => router.push(`/lessons/${value}`)}>
          <SelectTrigger className="w-44 sm:w-64" aria-label="切换课程">
            <SelectValue>{`${lessonId} · ${lessonTitle}`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {catalog.map((entry) => (
              <SelectItem key={entry.id} value={entry.id}>
                {entry.id} · {entry.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={!next}
          aria-label={next ? `下一课：${next.title}` : "已是最后一课"}
          onClick={() => next && router.push(`/lessons/${next.id}`)}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}
