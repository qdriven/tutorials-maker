import { useState } from "react"
import { Send, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { runDeepTutorChat, type DeepTutorReply } from "@/lib/deeptutor"

const FIELD =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"

type DeepTutorPanelProps = {
  repo: string
}

export function DeepTutorPanel({ repo }: DeepTutorPanelProps) {
  const [kb, setKb] = useState("")
  const [question, setQuestion] = useState("")
  const [reply, setReply] = useState<DeepTutorReply | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function onAsk() {
    if (!kb.trim() || !question.trim()) return
    setBusy(true)
    setError("")
    setReply(null)
    try {
      const result = await runDeepTutorChat(repo, kb.trim(), question.trim())
      setReply(result)
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-muted-foreground" />
        <h2 className="text-sm font-medium">Ask DeepTutor</h2>
        <Badge variant="outline" className="ml-auto">
          knowledge hook
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">
        Shell out to the <code>deeptutor</code> CLI at <code>{repo || "(unset)"}</code>. Make sure
        DeepTutor is installed and the KB exists (see <code>notes/baselines/deeptutor.md</code>).
      </p>

      <label className="block space-y-1">
        <span className="text-xs text-muted-foreground">Knowledge base</span>
        <Input
          value={kb}
          onChange={(e) => setKb(e.target.value)}
          placeholder="e.g. my-course-kb"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-muted-foreground">Question</span>
        <textarea
          className={FIELD}
          rows={2}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about the material..."
        />
      </label>

      <Button size="sm" onClick={onAsk} disabled={busy || !kb.trim() || !question.trim()}>
        <Send className="size-4" />
        {busy ? "Asking..." : "Ask"}
      </Button>

      {error ? (
        <pre className="overflow-x-auto rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-[11px] text-destructive">
          {error}
        </pre>
      ) : null}

      {reply ? (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Answer</span>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[11px] leading-relaxed">
            {reply.answer || "(empty reply)"}
          </pre>
        </div>
      ) : null}
    </div>
  )
}
