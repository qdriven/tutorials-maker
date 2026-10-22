import { useCallback, useEffect, useState } from "react"

import { CourseComposer } from "@/components/courses/course-composer"
import { CourseList } from "@/components/courses/course-list"
import { importCourse, exportCourse } from "@/lib/course-io"
import { deleteCourse, listCourses, saveCourse } from "@/lib/course-store"
import { SAMPLE_COURSE } from "@/lib/sample-course"
import type { CoursePackage } from "@/lib/course-manifest"

type Editing = { pkg: CoursePackage; isNew: boolean }

export function CoursesView() {
  const [courses, setCourses] = useState<CoursePackage[]>([])
  const [editing, setEditing] = useState<Editing | null>(null)
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)

  const refresh = useCallback(async () => {
    setCourses(await listCourses())
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  async function handleSave(pkg: CoursePackage) {
    setBusy(true)
    try {
      await saveCourse(pkg)
      await refresh()
      setEditing(null)
      setStatus(`Saved "${pkg.meta.title || pkg.meta.id}".`)
    } catch (e) {
      setStatus(`Save failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id: string) {
    setBusy(true)
    try {
      await deleteCourse(id)
      await refresh()
      setStatus(`Deleted ${id}.`)
    } catch (e) {
      setStatus(`Delete failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleImport() {
    setBusy(true)
    try {
      const pkg = await importCourse()
      if (!pkg) return
      await saveCourse(pkg)
      await refresh()
      setStatus(`Imported "${pkg.meta.title || pkg.meta.id}".`)
    } catch (e) {
      setStatus(`Import failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleExport(course: CoursePackage) {
    setBusy(true)
    try {
      await exportCourse(course)
      setStatus(`Exported "${course.meta.id}".`)
    } catch (e) {
      setStatus(`Export failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleLoadSample() {
    setBusy(true)
    try {
      await saveCourse(SAMPLE_COURSE)
      await refresh()
      setStatus("Sample course loaded.")
    } catch (e) {
      setStatus(`Load sample failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  if (editing) {
    return (
      <div className="flex h-full min-h-0 flex-col gap-2">
        {status ? (
          <p className="ui-selectable text-[11px] text-muted-foreground">{status}</p>
        ) : null}
        <div className="min-h-0 flex-1">
          <CourseComposer
            initial={editing.pkg}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      {status ? (
        <p className="ui-selectable text-[11px] text-muted-foreground">{status}</p>
      ) : null}
      <div className="min-h-0 flex-1">
        <CourseList
          courses={courses}
          busy={busy}
          onOpen={(course) => setEditing({ pkg: course, isNew: false })}
          onNew={() =>
            setEditing({
              pkg: {
                schemaVersion: 1,
                meta: {
                  id: `course_${Math.random().toString(36).slice(2, 8)}`,
                  title: "",
                  description: "",
                  audience: "",
                  durationMinutes: 15,
                  version: "0.1.0",
                },
                roles: [
                  { id: "teacher", name: "Teacher", kind: "teacher", persona: "" },
                  { id: "peer", name: "Peer", kind: "peer", persona: "" },
                ],
                scenes: [],
                quizzes: [],
                mastery: [],
              },
              isNew: true,
            })
          }
          onDelete={handleDelete}
          onImport={handleImport}
          onExport={handleExport}
          onLoadSample={handleLoadSample}
        />
      </div>
    </div>
  )
}
