import { BookOpen, Download, FileText, Plus, Trash2, Upload } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CoursePackage } from "@/lib/course-manifest"

type CourseListProps = {
  courses: CoursePackage[]
  busy?: boolean
  onOpen: (course: CoursePackage) => void
  onNew: () => void
  onDelete: (id: string) => void
  onImport: () => void
  onExport: (course: CoursePackage) => void
  onLoadSample: () => void
}

export function CourseList({
  courses,
  busy,
  onOpen,
  onNew,
  onDelete,
  onImport,
  onExport,
  onLoadSample,
}: CourseListProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Course library</Badge>
          <span className="text-xs text-muted-foreground">{courses.length} local</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onLoadSample}>
            <BookOpen className="size-4" />
            Load sample
          </Button>
          <Button size="sm" variant="outline" onClick={onImport}>
            <Upload className="size-4" />
            Import
          </Button>
          <Button size="sm" onClick={onNew}>
            <Plus className="size-4" />
            New course
          </Button>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-card text-sm text-muted-foreground">
          No courses yet. Create one, import a package, or load the sample.
        </div>
      ) : (
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {courses.map((course) => (
            <li
              key={course.meta.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <button
                  className="block w-full truncate text-left text-sm font-medium hover:underline"
                  onClick={() => onOpen(course)}
                >
                  {course.meta.title || "(untitled)"}
                </button>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-mono">{course.meta.id}</span>
                  <span>·</span>
                  <span>{course.scenes.length} scenes</span>
                  <span>·</span>
                  <span>{course.quizzes.length} quizzes</span>
                  <span>·</span>
                  <span>{course.meta.durationMinutes} min</span>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => onExport(course)} aria-label="Export course">
                <Download className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(course.meta.id)}
                aria-label="Delete course"
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
