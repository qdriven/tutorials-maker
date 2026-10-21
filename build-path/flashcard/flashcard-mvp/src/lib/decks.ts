/**
 * 内容发现：构建时收集 content/decks 下的全部 .md 文件。
 * 新增一套卡组 = 往 content/decks/ 丢一个 md 文件，不用改任何代码。
 */
import { parseDeck, type Deck } from "./cards";

const modules = import.meta.glob("../../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function idFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "");
}

export const decks: Deck[] = Object.entries(modules)
  .map(([path, source]) => parseDeck(source, idFromPath(path)))
  .sort((a, b) => a.meta.id.localeCompare(b.meta.id));

export function deckById(id: string): Deck | undefined {
  return decks.find((deck) => deck.meta.id === id);
}
