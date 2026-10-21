import Link from "next/link"

import { allDecks } from "@/lib/decks-manifest"
import { allLessons } from "@/lib/lessons"

/** 入口页：两条播放路线 —— 互动课件 / 静态 deck 直出 */
export default function Home() {
  const firstLesson = allLessons[0]

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-8 bg-background px-6 py-12 text-foreground">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">lwb-player</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          课件播放器 · 两种形态：Slidev 互动课件（要点 + AI 助教联动）与静态 HTML deck 直出预览。
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">互动课件 · {allLessons.length} 课</h2>
        <Link
          href={`/lessons/${firstLesson?.id ?? "s01"}`}
          className="rounded-xl border p-5 shadow-sm transition-colors hover:bg-muted/40"
        >
          <p className="text-base font-semibold">{firstLesson?.title ?? "s01"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            中央 Slidev 课件 + 右侧本课要点 + 底部 AI 助教，三区联动
          </p>
        </Link>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">静态 Deck · {allDecks.length} 份</h2>
        <Link
          href="/decks"
          className="rounded-xl border p-5 shadow-sm transition-colors hover:bg-muted/40"
        >
          <p className="text-base font-semibold">静态文件预览</p>
          <p className="mt-1 text-sm text-muted-foreground">
            自包含 HTML slides 直出播放，frontend-slides 家族自动页码同步
          </p>
        </Link>
      </section>
    </main>
  )
}
