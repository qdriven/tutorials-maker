import { Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  newId,
  type Question,
  type Quiz,
  type Role,
  type Scene,
} from "@/lib/course-manifest"

const FIELD =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"

type QuizBuilderProps = {
  quizzes: Quiz[]
  scenes: Scene[]
  roles: Role[]
  onChange: (quizzes: Quiz[]) => void
}

export function QuizBuilder({ quizzes, scenes, roles, onChange }: QuizBuilderProps) {
  function updateQuiz(id: string, patch: Partial<Quiz>) {
    onChange(quizzes.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }

  function addQuiz() {
    onChange([
      ...quizzes,
      {
        id: newId("quiz"),
        title: "New quiz",
        questions: [],
        passThresholdPct: 60,
      },
    ])
  }

  function removeQuiz(id: string) {
    onChange(quizzes.filter((q) => q.id !== id))
  }

  function addQuestion(quizId: string, kind: Question["kind"]) {
    const base = { id: newId("q"), prompt: "", points: 1 }
    const question: Question =
      kind === "choice"
        ? { ...base, kind: "choice", options: ["", ""], correctIndex: 0 }
        : kind === "open"
          ? { ...base, kind: "open", rubric: "" }
          : { ...base, kind: "task", roleIds: roles.slice(0, 1).map((r) => r.id), gradingNotes: "" }
    onChange(
      quizzes.map((q) =>
        q.id === quizId ? { ...q, questions: [...q.questions, question] } : q,
      ),
    )
  }

  function updateQuestion(quizId: string, qId: string, patch: Record<string, unknown>) {
    onChange(
      quizzes.map((q) =>
        q.id === quizId
          ? {
              ...q,
              questions: q.questions.map((qn) =>
                qn.id === qId ? ({ ...qn, ...patch } as Question) : qn,
              ),
            }
          : q,
      ),
    )
  }

  function removeQuestion(quizId: string, qId: string) {
    onChange(
      quizzes.map((q) =>
        q.id === quizId
          ? { ...q, questions: q.questions.filter((qn) => qn.id !== qId) }
          : q,
      ),
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Attach a quiz to a scene or leave it as a course-final check.
        </p>
        <Button size="sm" variant="outline" onClick={addQuiz}>
          <Plus className="size-4" />
          Add quiz
        </Button>
      </div>

      {quizzes.map((quiz) => (
        <div key={quiz.id} className="space-y-3 rounded-lg border border-border bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">quiz</Badge>
            <span className="font-mono text-[11px] text-muted-foreground">{quiz.id}</span>
            <Button
              size="icon-sm"
              variant="ghost"
              className="ml-auto"
              onClick={() => removeQuiz(quiz.id)}
              aria-label="Remove quiz"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <label className="block space-y-1 md:col-span-2">
              <span className="text-xs text-muted-foreground">Title</span>
              <Input
                value={quiz.title}
                onChange={(e) => updateQuiz(quiz.id, { title: e.target.value })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-muted-foreground">Pass threshold %</span>
              <Input
                type="number"
                min={0}
                max={100}
                value={quiz.passThresholdPct}
                onChange={(e) =>
                  updateQuiz(quiz.id, { passThresholdPct: Number(e.target.value) })
                }
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-xs text-muted-foreground">Attached scene (optional)</span>
            <select
              className={FIELD}
              value={quiz.sceneId ?? ""}
              onChange={(e) =>
                updateQuiz(quiz.id, { sceneId: e.target.value || undefined })
              }
            >
              <option value="">(course-final)</option>
              {scenes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Questions</span>
              <div className="ml-auto flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => addQuestion(quiz.id, "choice")}>
                  + choice
                </Button>
                <Button size="sm" variant="ghost" onClick={() => addQuestion(quiz.id, "open")}>
                  + open
                </Button>
                <Button size="sm" variant="ghost" onClick={() => addQuestion(quiz.id, "task")}>
                  + task
                </Button>
              </div>
            </div>

            {quiz.questions.map((q) => (
              <div key={q.id} className="space-y-2 rounded-md border border-border bg-background p-2.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{q.kind}</Badge>
                  <span className="font-mono text-[11px] text-muted-foreground">{q.id}</span>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="ml-auto"
                    onClick={() => removeQuestion(quiz.id, q.id)}
                    aria-label="Remove question"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Input
                  value={q.prompt}
                  onChange={(e) => updateQuestion(quiz.id, q.id, { prompt: e.target.value })}
                  placeholder="Prompt"
                />

                {q.kind === "choice" ? (
                  <ChoiceEditor
                    options={q.options}
                    correctIndex={q.correctIndex}
                    onChange={(options, correctIndex) =>
                      updateQuestion(quiz.id, q.id, { options, correctIndex })
                    }
                  />
                ) : null}

                {q.kind === "open" ? (
                  <>
                    <textarea
                      className={FIELD}
                      rows={2}
                      value={q.rubric}
                      onChange={(e) => updateQuestion(quiz.id, q.id, { rubric: e.target.value })}
                      placeholder="Rubric"
                    />
                    <Input
                      value={q.referenceAnswer ?? ""}
                      onChange={(e) =>
                        updateQuestion(quiz.id, q.id, { referenceAnswer: e.target.value })
                      }
                      placeholder="Reference answer (optional)"
                    />
                  </>
                ) : null}

                {q.kind === "task" ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {roles.map((role) => (
                        <label
                          key={role.id}
                          className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={q.roleIds.includes(role.id)}
                            onChange={() =>
                              updateQuestion(quiz.id, q.id, {
                                roleIds: q.roleIds.includes(role.id)
                                  ? q.roleIds.filter((r) => r !== role.id)
                                  : [...q.roleIds, role.id],
                              })
                            }
                          />
                          {role.name}
                        </label>
                      ))}
                    </div>
                    <textarea
                      className={FIELD}
                      rows={2}
                      value={q.gradingNotes}
                      onChange={(e) =>
                        updateQuestion(quiz.id, q.id, { gradingNotes: e.target.value })
                      }
                      placeholder="Grading notes"
                    />
                  </>
                ) : null}

                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  Points
                  <Input
                    type="number"
                    min={0}
                    value={q.points}
                    onChange={(e) =>
                      updateQuestion(quiz.id, q.id, { points: Number(e.target.value) })
                    }
                    className="w-20"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ChoiceEditor({
  options,
  correctIndex,
  onChange,
}: {
  options: string[]
  correctIndex: number
  onChange: (options: string[], correctIndex: number) => void
}) {
  function setOption(i: number, value: string) {
    const next = options.map((o, idx) => (idx === i ? value : o))
    onChange(next, correctIndex)
  }
  function add() {
    onChange([...options, ""], correctIndex)
  }
  function remove(i: number) {
    const next = options.filter((_, idx) => idx !== i)
    const corrected = Math.min(correctIndex, next.length - 1)
    onChange(next, Math.max(0, corrected))
  }
  return (
    <div className="space-y-1.5">
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="radio"
            name={`correct-${i}`}
            checked={correctIndex === i}
            onChange={() => onChange(options, i)}
            title="Mark as correct"
          />
          <Input
            value={opt}
            onChange={(e) => setOption(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
          />
          <Button size="icon-sm" variant="ghost" onClick={() => remove(i)} aria-label="Remove option">
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="ghost" onClick={add}>
        <Plus className="size-4" />
        Add option
      </Button>
    </div>
  )
}
