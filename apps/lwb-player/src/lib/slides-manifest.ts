/**
 * 课件清单：每课的页码 → 标题。
 * 由 scripts/build-slides.mjs 生成；没有课件的课程返回空数组（页面显示占位提示）。
 */
import raw from "@/content/slides-manifest.json"

export const slidesManifest = raw as Record<string, string[]>

export function deckTitles(lessonId: string): string[] {
  return slidesManifest[lessonId] ?? []
}
