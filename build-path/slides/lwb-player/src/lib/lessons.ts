/**
 * 课程内容访问层：读取构建期生成的 lessons.json。
 * 数据由 scripts/build-content.ts 从 learn-workbuddy 教程源生成。
 */
import rawLessons from "@/content/lessons.json"

import type { LessonContent } from "./parse-lesson"

export type LessonMeta = Pick<LessonContent, "id" | "dir" | "title" | "tagline" | "layer">

export const allLessons: LessonContent[] = rawLessons as LessonContent[]

export const lessonIndex = new Map(allLessons.map((lesson) => [lesson.id, lesson]))

/** 课程目录（不含全文，供目录切换器使用） */
export const lessonCatalog: LessonMeta[] = allLessons.map(({ id, dir, title, tagline, layer }) => ({
  id,
  dir,
  title,
  tagline,
  layer,
}))

export function getLesson(id: string): LessonContent | undefined {
  return lessonIndex.get(id)
}

export function lessonNeighbors(id: string): { prev?: LessonMeta; next?: LessonMeta } {
  const position = allLessons.findIndex((lesson) => lesson.id === id)
  if (position < 0) {
    return {}
  }
  return {
    prev: position > 0 ? lessonCatalog[position - 1] : undefined,
    next: position < allLessons.length - 1 ? lessonCatalog[position + 1] : undefined,
  }
}

/** AI 助教上下文：README 全文 + code.py 全文。单课约 20-25KB。 */
export function lessonContext(lesson: LessonContent): string {
  return [
    `# ${lesson.id}: ${lesson.title}`,
    lesson.tagline ? `> ${lesson.tagline}` : "",
    "",
    "## README.md",
    lesson.readme,
    "",
    "## code.py",
    lesson.code,
  ]
    .filter(Boolean)
    .join("\n")
}
