"use client"

/**
 * 离线助教：无 API key 时的零依赖降级。
 * 不调用任何模型 —— 在本课解析出的要点/误区/机制与 README 原文里做关键词检索，
 * 命中则返回对应段落。保证「无 key 也能跑」，与教程自身的离线哲学一致。
 */
import { Bot, Send, User } from "lucide-react"
import { useMemo, useRef, useState } from "react"

import { Button, ScrollArea, Textarea } from "@innate/ui"

import type { LessonContent } from "@/lib/parse-lesson"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function OfflineAssistant({ lesson }: { lesson: LessonContent }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: offlineGreeting(lesson),
    },
  ])
  const [draft, setDraft] = useState("")
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const searchable = useMemo(() => buildSearchIndex(lesson), [lesson])

  function submit() {
    const query = draft.trim()
    if (!query) {
      return
    }
    setDraft("")
    setMessages((current) => [
      ...current,
      { role: "user", content: query },
      { role: "assistant", content: searchAnswer(query, searchable) },
    ])
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ScrollArea className="min-h-0 flex-1">
        <div ref={scrollRef} className="mx-auto max-w-3xl space-y-4 px-4 py-3">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-2.5">
              {message.role === "assistant" ? (
                <Bot className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
              <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t px-4 py-2.5">
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <Textarea
            value={draft}
            rows={1}
            placeholder="离线检索：输入关键词，如 max_turns / 误区 / registry…"
            className="min-h-9 resize-none"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                submit()
              }
            }}
          />
          <Button type="button" size="icon" aria-label="发送" disabled={!draft.trim()} onClick={submit}>
            <Send className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function offlineGreeting(lesson: LessonContent): string {
  return [
    `你好！这里是「${lesson.id} · ${lesson.title}」的离线助教。`,
    "",
    "当前没有配置 ANTHROPIC_API_KEY，我在本地对本课内容做关键词检索。",
    "你可以试试：本课机制 / 常见误区 / stop_reason 等关键词。",
    "",
    "启用完整 AI 助教：复制 apps/lwb-player/.env.example 为 .env，填入任意",
    "Anthropic 兼容 Provider（Anthropic / GLM / DeepSeek / Kimi / MiniMax）的 key。",
  ].join("\n")
}

interface SearchEntry {
  label: string
  text: string
}

function buildSearchIndex(lesson: LessonContent): SearchEntry[] {
  const entries: SearchEntry[] = []
  const pushAll = (label: string, items: string[]) =>
    items.forEach((item, index) => entries.push({ label: `${label} #${index + 1}`, text: item }))

  pushAll("前置知识", lesson.prerequisites)
  pushAll("本课机制", lesson.mechanisms)
  pushAll("常见误区", lesson.pitfalls)
  pushAll("PROGRESSION", lesson.progression.adds)

  // README 按「## 小节」切块
  const sections = lesson.readme.split(/^##\s+/m).slice(1)
  for (const section of sections.slice(0, 20)) {
    const [heading, ...rest] = section.split("\n")
    const body = rest.join("\n").trim()
    if (body) {
      entries.push({ label: `README · ${heading.trim()}`, text: body.slice(0, 600) })
    }
  }
  return entries
}

function searchAnswer(query: string, entries: SearchEntry[]): string {
  const keywords = query
    .toLowerCase()
    .split(/[\s,，、/]+/)
    .filter((token) => token.length > 1)

  const hits = keywords.length
    ? entries
        .map((entry) => {
          const haystack = `${entry.label} ${entry.text}`.toLowerCase()
          const score = keywords.reduce(
            (sum, keyword) => sum + (haystack.includes(keyword) ? 1 : 0),
            0,
          )
          return { entry, score }
        })
        .filter((hit) => hit.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : []

  if (hits.length === 0) {
    return `没有在「本课内容」里检索到 ${query} 的相关段落。\n\n可以换个关键词（例如本课机制里出现的术语），或配置 API key 启用完整 AI 助教做语义问答。`
  }

  return [
    `在 ${hits.length} 处命中「${query}」：`,
    "",
    ...hits.map((hit) => `【${hit.entry.label}】\n${hit.entry.text}`),
  ].join("\n")
}
