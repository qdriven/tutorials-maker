// 右栏：提问区（EARS-4/5）
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircleQuestion, Send } from 'lucide-react'
import type { QaEntry } from '@/types'

interface Props {
  history: QaEntry[]
  pending: boolean
  onAsk: (question: string) => void
}

export default function QaPanel({ history, pending, onAsk }: Props) {
  const [question, setQuestion] = useState('')

  const submit = () => {
    const q = question.trim()
    if (!q || pending) return
    onAsk(q)
    setQuestion('')
  }

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l bg-muted/30">
      <div className="flex items-center gap-2 px-4 py-4">
        <MessageCircleQuestion className="h-5 w-5 text-primary" />
        <h2 className="text-sm font-semibold">提问区</h2>
      </div>
      <Separator />

      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col gap-4 py-4">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground">
              还没有提问。试试问：「什么是阶段门禁？」
            </p>
          )}
          {history.map((qa) => (
            <div key={qa.id} className="space-y-2">
              <div className="rounded-lg bg-primary/10 px-3 py-2 text-sm">
                {qa.question}
              </div>
              <div className="whitespace-pre-wrap rounded-lg border bg-card px-3 py-2 text-sm leading-6">
                {qa.answer}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />
      <div className="flex flex-col gap-2 p-4">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="输入你的问题…"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit()
          }}
        />
        <Button onClick={submit} disabled={pending || !question.trim()} size="sm">
          <Send className="mr-1 h-4 w-4" />
          {pending ? '解答中…' : '提交问题'}
        </Button>
      </div>
    </aside>
  )
}
