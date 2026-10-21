/**
 * 静态 deck 清单：decks/*.html 的元数据。
 * 由 scripts/build-decks.mjs 生成；协议含义见该脚本头注释。
 */
import raw from "@/content/decks-manifest.json"

export type DeckProtocol = "slidev" | "slides-html" | "iframe"

export interface DeckMeta {
  title: string
  pages: number
  protocol: DeckProtocol
  bytes: number
}

export interface DeckEntry extends DeckMeta {
  id: string
  /** 产物地址（public/decks/<id>.html） */
  href: string
}

export const decksManifest = raw as Record<string, DeckMeta>

export const allDecks: DeckEntry[] = Object.entries(decksManifest).map(([id, meta]) => ({
  id,
  href: `/decks/${id}.html`,
  ...meta,
}))

export function getDeck(id: string): DeckEntry | undefined {
  return allDecks.find((deck) => deck.id === id)
}
