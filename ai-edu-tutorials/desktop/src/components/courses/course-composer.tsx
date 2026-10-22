import { useMemo, useState } from "react"
import { AlertTriangle, CheckCircle2, Save } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleEditor } from "@/components/courses/role-editor"
import { ScenesEditor } from "@/components/courses/scenes-editor"
import { QuizBuilder } from "@/components/courses/quiz-builder"
import {
  createEmptyCourse,
  newId,
  validateCoursePackage,
  type CoursePackage,
} from "@/lib/course-manifest"

type CourseComposerProps = {
  initial?: CoursePackage
  onSave: (pkg: CoursePackage) => void
  onCancel: () => void
}

const FIELD =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"

export function CourseComposer({ initial, onSave, onCancel }: CourseComposerProps) {
  const [draft, setDraft] = useState<CoursePackage>(
    () =>
      initial ??
      createEmptyCourse({
        id: newId("course"),
        title: "",
        description: "",
        audience: "",
        durationMinutes: 15,
        version: "0.1.0",
      }),
  )
  const [tab, setTab] = useState("meta")

  const validation = useMemo(() => validateCoursePackage(draft), [draft])

  function patchMeta(patch: Partial<CoursePackage["meta"]>) {
    setDraft((d) => ({ ...d, meta: { ...d.meta, ...patch } }))
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Course composer</Badge>
          {validation.ok ? (
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" /> valid
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
              <AlertTriangle className="size-3.5" /> {validation.errors.length} issue(s)
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(draft)} disabled={!validation.ok}>
            <Save className="size-4" />
            Save course
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col gap-3">
        <TabsList className="flex w-fit">
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="scenes">Scenes</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="meta" className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block space-y-1 md:col-span-2">
              <span className="text-xs text-muted-foreground">Title</span>
              <Input value={draft.meta.title} onChange={(e) => patchMeta({ title: e.target.value })} />
            </label>
            <label className="block space-y-1 md:col-span-2">
              <span className="text-xs text-muted-foreground">Description</span>
              <textarea
                className={FIELD}
                rows={2}
                value={draft.meta.description}
                onChange={(e) => patchMeta({ description: e.target.value })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Audience</span>
              <Input value={draft.meta.audience} onChange={(e) => patchMeta({ audience: e.target.value })} />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Duration (min)</span>
              <Input
                type="number"
                min={1}
                value={draft.meta.durationMinutes}
                onChange={(e) => patchMeta({ durationMinutes: Number(e.target.value) })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Version</span>
              <Input value={draft.meta.version} onChange={(e) => patchMeta({ version: e.target.value })} />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Source PDF (path/URL, optional)</span>
              <Input
                value={draft.meta.sourcePdf ?? ""}
                onChange={(e) => patchMeta({ sourcePdf: e.target.value || undefined })}
              />
            </label>
            <label className="block space-y-1 md:col-span-2">
              <span className="text-xs text-muted-foreground">Course ID</span>
              <Input value={draft.meta.id} onChange={(e) => patchMeta({ id: e.target.value })} className="font-mono" />
            </label>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
          <RoleEditor roles={draft.roles} onChange={(roles) => setDraft((d) => ({ ...d, roles }))} />
        </TabsContent>

        <TabsContent value="scenes" className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
          <ScenesEditor
            scenes={draft.scenes}
            roles={draft.roles}
            onChange={(scenes) => setDraft((d) => ({ ...d, scenes }))}
          />
        </TabsContent>

        <TabsContent value="quizzes" className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
          <QuizBuilder
            quizzes={draft.quizzes}
            scenes={draft.scenes}
            roles={draft.roles}
            onChange={(quizzes) => setDraft((d) => ({ ...d, quizzes }))}
          />
        </TabsContent>

        <TabsContent value="review" className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
          {validation.ok ? (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" /> Course package is valid and ready to save.
              </p>
              <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[11px] leading-relaxed">
                {JSON.stringify(draft, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <AlertTriangle className="size-4" /> Fix the following before saving:
              </p>
              <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                {validation.errors.map((err, i) => (
                  <li key={i} className="font-mono">{err}</li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
