import { Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { newId, type Role, type RoleKind } from "@/lib/course-manifest"

const FIELD =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"

type RoleEditorProps = {
  roles: Role[]
  onChange: (roles: Role[]) => void
}

export function RoleEditor({ roles, onChange }: RoleEditorProps) {
  function update(id: string, patch: Partial<Role>) {
    onChange(roles.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  function add() {
    onChange([
      ...roles,
      { id: newId("role"), name: "New role", kind: "peer", persona: "" },
    ])
  }

  function remove(id: string) {
    onChange(roles.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          At least 1 teacher + 1 peer is required.
        </p>
        <Button size="sm" variant="outline" onClick={add}>
          <Plus className="size-4" />
          Add role
        </Button>
      </div>

      {roles.map((role) => (
        <div key={role.id} className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{role.kind}</Badge>
            <span className="font-mono text-[11px] text-muted-foreground">{role.id}</span>
            <Button
              size="icon-sm"
              variant="ghost"
              className="ml-auto"
              onClick={() => remove(role.id)}
              aria-label="Remove role"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Name</span>
              <Input
                value={role.name}
                onChange={(e) => update(role.id, { name: e.target.value })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Kind</span>
              <select
                className={FIELD}
                value={role.kind}
                onChange={(e) => update(role.id, { kind: e.target.value as RoleKind })}
              >
                <option value="teacher">teacher</option>
                <option value="peer">peer</option>
                <option value="ta">ta</option>
              </select>
            </label>
          </div>
          <label className="block space-y-1">
            <span className="text-xs text-muted-foreground">Persona</span>
            <textarea
              className={FIELD}
              rows={2}
              value={role.persona}
              onChange={(e) => update(role.id, { persona: e.target.value })}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs text-muted-foreground">Opening line (optional)</span>
            <Input
              value={role.openingLine ?? ""}
              onChange={(e) => update(role.id, { openingLine: e.target.value })}
            />
          </label>
        </div>
      ))}
    </div>
  )
}
