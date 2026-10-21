/**
 * learn-workbuddy 课程内容解析（纯函数，无 fs / node 依赖）。
 *
 * 输入是每课目录下的 README.md 与 code.py 原文，输出结构化 LessonContent：
 * 右侧要点栏、课程目录、AI 助教上下文都从这一份结构渲染。
 * 解析规则对课程源（learn-workbuddy，MIT）的既有写作约定保持宽容：
 * 缺失的小节返回空数组而不是抛错，未解析的课程仍可打开。
 */

export interface LessonProgression {
  chapter: string
  buildsOn: string[]
  adds: string[]
  preserves: string[]
}

export interface LessonContent {
  /** 课程短 id，如 "s01" */
  id: string
  /** 课程目录名，如 "s01_agent_loop" */
  dir: string
  /** 去掉 "s01: " 前缀后的标题 */
  title: string
  /** 标题下方引导语（blockquote 第一行） */
  tagline: string
  /** "Harness 层" 一句话定位 */
  layer: string
  /** 「学习前置知识」要点 */
  prerequisites: string[]
  /** 「本章抓住的 WorkBuddy-style 机制」要点 */
  mechanisms: string[]
  /** 「常见误区」要点 */
  pitfalls: string[]
  /** code.py 顶部 PROGRESSION 元数据 */
  progression: LessonProgression
  /** 「问题」小节首段 */
  problemExcerpt: string
  /** README.md 全文（AI 助教上下文） */
  readme: string
  /** code.py 全文（AI 助教上下文） */
  code: string
}

export function parseLesson(input: {
  id: string
  dir: string
  readme: string
  code: string
}): LessonContent {
  const { id, dir, readme, code } = input
  const heading = firstMatch(readme, /^#\s+(.+)$/m) ?? dir
  const title = heading.replace(/^s\d+:\s*/, "").trim() || heading

  return {
    id,
    dir,
    title,
    tagline: stripQuoteDecorations(
      firstMatch(readme, /^>\s*(.+)$/m) ?? "",
    ),
    layer: parseLayer(readme),
    prerequisites: parseBulletSection(readme, "学习前置知识"),
    mechanisms: parseBulletSection(readme, "本章抓住的 WorkBuddy-style 机制"),
    pitfalls: parseBulletSection(readme, "常见误区"),
    progression: parseProgression(code),
    problemExcerpt: parseProblemExcerpt(readme),
    readme,
    code,
  }
}

function firstMatch(text: string, pattern: RegExp): string | undefined {
  const match = pattern.exec(text)
  return match?.[1]?.trim()
}

/** `> *"引语"* — 尾注` → `引语 — 尾注`；没有装饰时原样返回 */
function stripQuoteDecorations(line: string): string {
  const match = /^\*?["'“](.+?)["'”]\*?\s*(—.*)?$/.exec(line)
  if (!match) {
    return line
  }
  return [match[1], match[2]].filter(Boolean).join(" ").trim()
}

/** "Harness 层" 在 blockquote 中写作 `**Harness 层**：循环 — …` */
function parseLayer(readme: string): string {
  const match = /\*\*Harness 层\*\*[：:]\s*(.+)$/m.exec(readme)
  return match?.[1]?.trim() ?? ""
}

/** 取 `## <heading>` 小节内的 `- ` 列表项；列表里代码片段（缩进块）跳过 */
function parseBulletSection(readme: string, heading: string): string[] {
  const section = extractSection(readme, heading)
  if (!section) {
    return []
  }
  return section
    .split("\n")
    .map((line) => {
      const match = /^[-*]\s+(.+)$/.exec(line.trim())
      return match?.[1]?.trim()
    })
    .filter((item): item is string => Boolean(item))
}

/** `## 问题` 之后到下一个 `## ` 之间的第一段非空文本 */
function parseProblemExcerpt(readme: string): string {
  const section = extractSection(readme, "问题")
  if (!section) {
    return ""
  }
  const paragraph = section
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("```") && !block.startsWith("|"))
  return paragraph ?? ""
}

/**
 * code.py 里的 PROGRESSION 字典：
 *   PROGRESSION = { "chapter": "s01_agent_loop", "builds_on": [], "adds": ["..."], ... }
 */
export function parseProgression(code: string): LessonProgression {
  const start = code.indexOf("PROGRESSION")
  const scope = start >= 0 ? code.slice(start, start + 1600) : code
  return {
    chapter: parsePythonStringList(scope, "chapter")[0] ?? "",
    buildsOn: parsePythonStringList(scope, "builds_on"),
    adds: parsePythonStringList(scope, "adds"),
    preserves: parsePythonStringList(scope, "preserves"),
  }
}

function parsePythonStringList(scope: string, key: string): string[] {
  // 课程源存在两种风格：双引号（s01-s23）与单引号（s24）
  const listMatch = new RegExp(`["']${key}["']\\s*:\\s*\\[(.*?)\\]`, "s").exec(scope)
  if (listMatch) {
    return [...listMatch[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  }
  // 标量字段（chapter）
  const scalar = new RegExp(`["']${key}["']\\s*:\\s*["']([^"']+)["']`).exec(scope)
  return scalar ? [scalar[1]] : []
}

/** 提取 `## <heading>` 到下一个同级标题之间的内容（不含标题行） */
function extractSection(readme: string, heading: string): string | undefined {
  const pattern = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, "m")
  const startMatch = pattern.exec(readme)
  if (!startMatch) {
    return undefined
  }
  const afterHeading = readme.slice(startMatch.index + startMatch[0].length)
  const nextHeading = /^##\s+/m.exec(afterHeading)
  const section = nextHeading
    ? afterHeading.slice(0, nextHeading.index)
    : afterHeading
  return section.trim()
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
