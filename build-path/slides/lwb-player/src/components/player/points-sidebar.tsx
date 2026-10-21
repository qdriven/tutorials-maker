"use client"

/**
 * 右侧要点栏：本课的「前置知识 / 机制 / 误区 / 检查点」来自课程源 README 的
 * 对应小节，检查点来自 code.py 的 PROGRESSION 元数据。
 */
import { CircleAlert, CircleCheck, Layers, ListChecks, TriangleAlert } from "lucide-react"

import { Badge, ScrollArea, Separator } from "@innate/ui"

import type { LessonContent } from "@/lib/parse-lesson"

export function PointsSidebar({
  lesson,
  slideNo,
}: {
  lesson: LessonContent
  slideNo: number
}) {
  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l bg-background lg:flex">
      <div className="shrink-0 px-4 pt-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono">
            {lesson.id}
          </Badge>
          <h2 className="min-w-0 truncate text-sm font-semibold" title={lesson.title}>
            {lesson.title}
          </h2>
        </div>
        {lesson.layer ? (
          <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
            <Layers className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {lesson.layer}
          </p>
        ) : null}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-5 px-4 py-4">
          <PointSection
            icon={<ListChecks className="size-4" aria-hidden="true" />}
            title="前置知识"
            items={lesson.prerequisites}
          />
          <PointSection
            icon={<CircleCheck className="size-4" aria-hidden="true" />}
            title="本课机制"
            items={lesson.mechanisms}
          />
          <PointSection
            icon={<TriangleAlert className="size-4" aria-hidden="true" />}
            title="常见误区"
            items={lesson.pitfalls}
            tone="warning"
          />
          <PointSection
            icon={<CircleAlert className="size-4" aria-hidden="true" />}
            title="检查点（来自 PROGRESSION）"
            items={lesson.progression.adds}
          />

          <Separator />
          <p className="text-xs leading-5 text-muted-foreground">
            当前第 <span className="font-semibold tabular-nums text-foreground">{slideNo}</span> 页 ·
            底部 AI 助教已注入本课 README 与 code.py 全文
          </p>
        </div>
      </ScrollArea>
    </aside>
  )
}

function PointSection({
  icon,
  title,
  items,
  tone = "default",
}: {
  icon: React.ReactNode
  title: string
  items: string[]
  tone?: "default" | "warning"
}) {
  if (items.length === 0) {
    return null
  }
  return (
    <section>
      <h3
        className={
          tone === "warning"
            ? "flex items-center gap-1.5 text-xs font-semibold text-[oklch(0.55_0.16_70)]"
            : "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"
        }
      >
        {icon}
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <li
            key={`${index}-${item.slice(0, 12)}`}
            className="rounded-md bg-muted/40 px-2.5 py-1.5 text-xs leading-5 text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
