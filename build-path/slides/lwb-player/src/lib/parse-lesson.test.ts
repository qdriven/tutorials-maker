import { describe, expect, it } from "vitest"

import { parseLesson, parseProgression } from "./parse-lesson"

const README = `# s01: Agent Loop — 一个循环就够了

[中文](README.md) · [English](README.en.md)
> *"一个循环 + 一个工具 = 一个 Agent"* — tool_use 驱动继续，显式结果说明停止。
>
> **Harness 层**: 循环 — 模型与真实世界的第一道连接。

---

## 学习前置知识

- LLM 一次响应可能包含普通文本, 也可能包含 tool_use。
- Agent loop 的核心不是"会聊天", 而是能把结果重新喂回模型。

## 本章抓住的 WorkBuddy-style 机制

- 用最小 while 循环模拟心跳。
- 用 \`AgentLoopResult\` 显式区分停止原因。

## 常见误区

- 把 agent 写成一次性 prompt 调用。

## 问题

你提出了一个问题给大模型。

模型能输出一条 bash 命令，但输出完了就停了。

---

## 解决方案

模型返回工具调用就继续。
`

const CODE = `PROGRESSION = {
    "chapter": "s01_agent_loop",
    "builds_on": [],
    "adds": [
        "minimal agent loop",
        "single bash tool",
    ],
    "preserves": ["interactive CLI"],
}`

describe("parseLesson", () => {
  const lesson = parseLesson({ id: "s01", dir: "s01_agent_loop", readme: README, code: CODE })

  it("去掉标题里的课程号前缀", () => {
    expect(lesson.title).toBe("Agent Loop — 一个循环就够了")
  })

  it("解析引导语与 Harness 层定位", () => {
    expect(lesson.tagline).toBe(
      "一个循环 + 一个工具 = 一个 Agent — tool_use 驱动继续，显式结果说明停止。",
    )
    expect(lesson.layer).toContain("循环 — 模型与真实世界的第一道连接")
  })

  it("解析三个要点小节", () => {
    expect(lesson.prerequisites).toHaveLength(2)
    expect(lesson.mechanisms[0]).toContain("最小 while 循环")
    expect(lesson.pitfalls).toHaveLength(1)
  })

  it("解析问题小节首段（跳过代码块与表格）", () => {
    expect(lesson.problemExcerpt.startsWith("你提出了一个问题")).toBe(true)
  })

  it("解析 PROGRESSION 元数据", () => {
    expect(lesson.progression.chapter).toBe("s01_agent_loop")
    expect(lesson.progression.buildsOn).toEqual([])
    expect(lesson.progression.adds).toEqual(["minimal agent loop", "single bash tool"])
    expect(lesson.progression.preserves).toEqual(["interactive CLI"])
  })
})

describe("parseLesson 宽容性", () => {
  it("小节缺失时返回空数组而不是抛错", () => {
    const lesson = parseLesson({
      id: "s99",
      dir: "s99_missing",
      readme: "# s99: 只有标题",
      code: "",
    })
    expect(lesson.title).toBe("只有标题")
    expect(lesson.prerequisites).toEqual([])
    expect(lesson.progression.adds).toEqual([])
  })
})

describe("parseProgression", () => {
  it("chapter 为空时兜底为空字符串", () => {
    expect(parseProgression("")).toEqual({
      chapter: "",
      buildsOn: [],
      adds: [],
      preserves: [],
    })
  })

  it("兼容 s24 的单引号风格", () => {
    const single = `PROGRESSION = {'chapter': 's24_comprehensive',
     'builds_on': ['s23_audit_sandbox'],
     'adds': ['integrated mini harness', 'offline RAG-memory restart contract'],
     'preserves': ['all previous chapter mechanisms']}`
    expect(parseProgression(single)).toEqual({
      chapter: "s24_comprehensive",
      buildsOn: ["s23_audit_sandbox"],
      adds: ["integrated mini harness", "offline RAG-memory restart contract"],
      preserves: ["all previous chapter mechanisms"],
    })
  })
})
