import Link from "next/link"
import { notFound } from "next/navigation"

import { DeckViewer } from "@/components/decks/deck-viewer"
import { allDecks, getDeck } from "@/lib/decks-manifest"

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return allDecks.map((deck) => ({ id: deck.id }))
}

/** 静态 deck 播放页：头部信息 + 16:9 iframe 直出 */
export default async function DeckPage({ params }: PageProps) {
  const { id } = await params
  const deck = getDeck(id)

  if (!deck) {
    notFound()
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="flex items-center justify-between gap-4 border-b px-6 py-3">
        <div className="flex min-w-0 flex-col">
          <Link href="/decks" className="text-xs text-muted-foreground hover:text-foreground">
            ← 全部 deck
          </Link>
          <h1 className="truncate text-base font-semibold">{deck.title}</h1>
        </div>
        <p className="shrink-0 font-mono text-xs text-muted-foreground">
          {deck.id}.html · {deck.pages || "?"} 页
        </p>
      </header>
      <DeckViewer deck={deck} />
    </main>
  )
}
