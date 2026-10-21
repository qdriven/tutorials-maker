"use client"

/**
 * 底部 AI 助教区。
 * - live：CopilotKit runtimeUrl 指向 /api/copilotkit（Anthropic 兼容多 Provider）
 * - offline：未配置 API key 时的本地降级 —— 关键词检索本课内容，零依赖可跑
 * 两者的差异只在消息生成来源，「按课注入上下文」与 go_to_slide 联动结构一致。
 */
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { useState } from "react"

import { CopilotKit, useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"
import { CopilotChat } from "@copilotkit/react-ui"
import { Badge, Button } from "@innate/ui"

import type { LessonContent } from "@/lib/parse-lesson"
import { deckTitles } from "@/lib/slides-manifest"

import { OfflineAssistant } from "./offline-assistant"

export function ChatDock({
  lesson,
  context,
  slideNo,
  chatLive,
  providerLabel,
  goToSlide,
}: {
  lesson: LessonContent
  context: string
  slideNo: number
  chatLive: boolean
  providerLabel: string
  goToSlide: (slide: number) => void
}) {
  const [open, setOpen] = useState(true)
  const titles = deckTitles(lesson.id)

  return (
    <div className="flex shrink-0 flex-col border-t bg-background" style={{ height: open ? 340 : 48 }}>
      <div className="flex h-12 shrink-0 items-center gap-2 px-4">
        <Sparkles className="size-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-semibold">AI 助教</span>
        <Badge variant={chatLive ? "default" : "secondary"} className="font-normal">
          {providerLabel}
        </Badge>
        <span className="ml-auto truncate text-xs text-muted-foreground">
          {chatLive
            ? "已注入本课 README + code.py，回答基于课程语境"
            : "离线模式：本地检索本课要点，配置 key 后启用 AI 助教"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={open ? "收起对话区" : "展开对话区"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <ChevronDown className="size-4" aria-hidden="true" />
          ) : (
            <ChevronUp className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      {open ? (
        chatLive ? (
          <CopilotKit runtimeUrl="/api/copilotkit">
            <ChatWiring
              lesson={lesson}
              context={context}
              slideNo={slideNo}
              slideTitles={titles}
              goToSlide={goToSlide}
            />
          </CopilotKit>
        ) : (
          <OfflineAssistant lesson={lesson} />
        )
      ) : null}
    </div>
  )
}

function ChatWiring({
  lesson,
  context,
  slideNo,
  slideTitles,
  goToSlide,
}: {
  lesson: LessonContent
  context: string
  slideNo: number
  slideTitles: string[]
  goToSlide: (slide: number) => void
}) {
  // RAG-lite：本课全文（README + code.py）作为可读上下文注入每次请求
  useCopilotReadable({
    description: "当前课程的完整内容（README.md 与 code.py 原文）",
    value: context,
  })

  // 课件位置联动：翻页自动更新，AI 始终知道学员看到哪一页
  useCopilotReadable({
    description: "学员当前所在的课件位置",
    value: {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      slideNo,
      slideTitle: slideTitles[slideNo - 1] ?? "",
      totalSlides: slideTitles.length,
    },
  })

  // 联动动作：AI 说「看第 5 页」时课件真的翻过去
  useCopilotAction({
    name: "go_to_slide",
    description: `把课件跳转到指定页码（1-${slideTitles.length || 1}）`,
    parameters: [
      {
        name: "slide",
        type: "number",
        description: "目标页码，从 1 开始",
        required: true,
      },
    ],
    handler: ({ slide }) => {
      if (typeof slide === "number" && Number.isFinite(slide)) {
        goToSlide(Math.round(slide))
      }
    },
  })

  return (
    <div className="slides-chat min-h-0 flex-1 px-3 pb-3">
      <CopilotChat
        className="h-full"
        instructions={TUTOR_INSTRUCTIONS}
        labels={{
          title: `${lesson.id} 助教`,
          placeholder: `问任何关于「${lesson.title}」的问题…`,
          error: "请求失败，请重试或检查 provider 配置",
        }}
        suggestions={[
          {
            title: "这一页讲什么",
            message: `学员在第 ${slideNo} 页，标题是「${slideTitles[slideNo - 1] ?? lesson.title}」。请用两三句话讲清这一页的核心，再指出一个最容易踩的坑。`,
          },
          {
            title: "考考我",
            message: `针对本课（${lesson.title}）出 2 道小测验题考我，先不要给答案，等我回复后逐题点评。`,
          },
          {
            title: "和上一课的关系",
            message: `本课 ${lesson.id} 建立在哪些前面课程的基础上？请结合课程内容解释这个机制是如何演进的。`,
          },
        ]}
      />
    </div>
  )
}

const TUTOR_INSTRUCTIONS = `你是开源教程《从 0 手搓桌面 AI 助手（learn-workbuddy）》的助教。
学员正在用交互式课件学习，你总能读到当前课程的 README 与 code.py 全文，以及学员当前所在的页码。

回答要求：
- 用简体中文，简洁直接，先给结论再展开
- 讲机制时优先引用本课 code.py 里的真实代码片段（标明函数名）
- 学员问"这页没懂"时，先说明当前页核心，再给出一个最小例子
- 适当使用 go_to_slide 动作把课件跳到相关页（比如讲到某个代码段时）
- 不确定时明确说"课程原文没有覆盖"，不要编造教程里不存在的内容`
