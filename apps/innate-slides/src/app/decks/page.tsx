import Link from "next/link"

import { allDecks } from "@/lib/decks-manifest"
import { allLessons } from "@/lib/lessons"

/** 静态 deck 列表页：decks/ 里有什么，这里就列出什么 */
export default function DecksPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-8 bg-background px-6 py-12 text-foreground">
      <header className="flex flex-col gap-2">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← 返回首页
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">静态 Deck 预览</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          自包含 HTML slides 文件直出预览。放入 <code className="rounded bg-muted px-1 font-mono text-xs">decks/*.html</code>
          后运行 <code className="rounded bg-muted px-1 font-mono text-xs">pnpm decks:build</code> 即可出现在这里；
          frontend-slides 家族（deck-stage 固定舞台）自动获得页码同步。
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {allDecks.map((deck) => (
          <li key={deck.id}>
            <Link
              href={`/decks/${deck.id}`}
              className="block rounded-xl border bg-background p-5 shadow-sm transition-colors hover:bg-muted/40"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold">{deck.title}</h2>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {deck.protocol === "slides-html" ? "页码同步" : deck.protocol === "slidev" ? "Slidev" : "直出"}
                </span>
              </div>
              <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                {deck.id}.html · {deck.pages || "?"} 页 · {(deck.bytes / 1024).toFixed(0)} KB
              </p>
            </Link>
          </li>
        ))}
        {allDecks.length === 0 ? (
          <li className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            decks/ 下还没有 .html 文件 —— 把任意自包含 slides 文件放进去，跑一次 pnpm decks:build
          </li>
        ) : null}
      </ul>

      <footer className="mt-auto border-t pt-6 text-sm text-muted-foreground">
        互动课件（Slidev + 要点 + AI 助教）仍在{" "}
        <Link href={`/lessons/${allLessons[0]?.id ?? "s01"}`} className="underline underline-offset-4 hover:text-foreground">
          /lessons
        </Link>
      </footer>
    </main>
  )
}
