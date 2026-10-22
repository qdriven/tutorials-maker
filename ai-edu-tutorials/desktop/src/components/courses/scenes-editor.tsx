import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  newId,
  type Role,
  type Scene,
  type SceneKind,
} from "@/lib/course-manifest"

const FIELD =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"

type ScenesEditorProps = {
  scenes: Scene[]
  roles: Role[]
  onChange: (scenes: Scene[]) => void
}

export function ScenesEditor({ scenes, roles, onChange }: ScenesEditorProps) {
  function update(id: string, patch: Partial<Scene>) {
    onChange(scenes.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function add() {
    onChange([
      ...scenes,
      {
        id: newId("scene"),
        title: "New scene",
        kind: "slide",
        roleIds: roles.slice(0, 1).map((r) => r.id),
        slide: { title: "New scene", body: "" },
      },
    ])
  }

  function remove(id: string) {
    onChange(scenes.filter((s) => s.id !== id))
  }

  function move(id: string, dir: -1 | 1) {
    const idx = scenes.findIndex((s) => s.id === id)
    const next = idx + dir
    if (idx < 0 || next < 0 || next >= scenes.length) return
    const copy = [...scenes]
    ;[copy[idx], copy[next]] = [copy[next], copy[idx]]
    onChange(copy)
  }

  function toggleRole(scene: Scene, roleId: string) {
    const has = scene.roleIds.includes(roleId)
    update(scene.id, {
      roleIds: has ? scene.roleIds.filter((r) => r !== roleId) : [...scene.roleIds, roleId],
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Scenes play in list order. Each needs at least one role.
        </p>
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="size-4" />
          Add scene
        </Button>
      </div>

      {scenes.map((scene, index) => (
        <div key={scene.id} className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{index + 1}</Badge>
            <Badge variant="secondary">{scene.kind}</Badge>
            <span className="font-mono text-[11px] text-muted-foreground">{scene.id}</span>
            <div className="ml-auto flex items-center gap-1">
              <Button size="icon-sm" variant="ghost" onClick={() => move(scene.id, -1)} aria-label="Move up">
                <ChevronUp className="size-4" />
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={() => move(scene.id, 1)} aria-label="Move down">
                <ChevronDown className="size-4" />
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={() => remove(scene.id)} aria-label="Remove scene">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Title</span>
              <Input
                value={scene.title}
                onChange={(e) => update(scene.id, { title: e.target.value })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Kind</span>
              <select
                className={FIELD}
                value={scene.kind}
                onChange={(e) => {
                  const kind = e.target.value as SceneKind
                  const patch: Partial<Scene> = { kind }
                  if (kind === "slide" && !scene.slide) patch.slide = { title: scene.title, body: "" }
                  if (kind === "interactive" && !scene.interactive) patch.interactive = { prompt: "", interactionType: "chat" }
                  if (kind === "pbl" && !scene.pbl) patch.pbl = { task: "" }
                  update(scene.id, patch)
                }}
              >
                <option value="slide">slide</option>
                <option value="interactive">interactive</option>
                <option value="pbl">pbl</option>
              </select>
            </label>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Roles in scene</span>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs"
                >
                  <input
                    type="checkbox"
                    checked={scene.roleIds.includes(role.id)}
                    onChange={() => toggleRole(scene, role.id)}
                  />
                  {role.name} <span className="text-muted-foreground">({role.kind})</span>
                </label>
              ))}
            </div>
          </div>

          {scene.kind === "slide" && scene.slide ? (
            <div className="space-y-2">
              <Input
                value={scene.slide.title}
                onChange={(e) => update(scene.id, { slide: { ...scene.slide!, title: e.target.value } })}
                placeholder="Slide title"
              />
              <textarea
                className={FIELD}
                rows={3}
                value={scene.slide.body}
                onChange={(e) => update(scene.id, { slide: { ...scene.slide!, body: e.target.value } })}
                placeholder="Slide body (markdown)"
              />
            </div>
          ) : null}

          {scene.kind === "interactive" && scene.interactive ? (
            <div className="space-y-2">
              <textarea
                className={FIELD}
                rows={2}
                value={scene.interactive.prompt}
                onChange={(e) =>
                  update(scene.id, { interactive: { ...scene.interactive!, prompt: e.target.value } })
                }
                placeholder="Interaction prompt"
              />
              <select
                className={FIELD}
                value={scene.interactive.interactionType}
                onChange={(e) =>
                  update(scene.id, {
                    interactive: { ...scene.interactive!, interactionType: e.target.value as never },
                  })
                }
              >
                <option value="chat">chat</option>
                <option value="drag-drop">drag-drop</option>
                <option value="input">input</option>
                <option value="sandbox">sandbox</option>
              </select>
            </div>
          ) : null}

          {scene.kind === "pbl" && scene.pbl ? (
            <textarea
              className={FIELD}
              rows={2}
              value={scene.pbl.task}
              onChange={(e) => update(scene.id, { pbl: { ...scene.pbl!, task: e.target.value } })}
              placeholder="PBL task"
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
