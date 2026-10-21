import { useCallback, useEffect, useRef, useState } from "react";
import { decks } from "@/lib/decks";

/**
 * hash 路由：#/<deckId>/<cardIndex>，hash 是唯一真源。
 *
 * - embla select → goToCard → 写 hash → hashchange 回声 → 解析结果与当前相等 → no-op（防环）
 * - 大纲点击 / 后退前进 → hashchange → 解析结果不同 → 更新 state → FlashcardDeck 联动滚动
 * - 每次换卡 push 一条历史（后退逐张回溯，slides 的自然行为）；空 hash 首填用 replace
 */
export interface Route {
  deckId: string;
  cardIndex: number;
}

const HASH_RE = /^#\/([\w-]+)(?:\/(\d+))?$/;

export function parseRoute(hash: string): Route | null {
  const match = HASH_RE.exec(hash);
  if (!match) return null;
  return { deckId: match[1], cardIndex: match[2] !== undefined ? Number(match[2]) : 0 };
}

function normalizeRoute(route: Route | null): Route {
  const deck = route ? decks.find((deck) => deck.meta.id === route.deckId) : undefined;
  if (!deck) return { deckId: decks[0]?.meta.id ?? "", cardIndex: 0 };
  const maxIndex = Math.max(deck.cards.length - 1, 0);
  return {
    deckId: deck.meta.id,
    cardIndex: Math.min(Math.max(route!.cardIndex, 0), maxIndex),
  };
}

function hashOf(route: Route): string {
  return `#/${route.deckId}/${route.cardIndex}`;
}

function sameRoute(a: Route, b: Route): boolean {
  return a.deckId === b.deckId && a.cardIndex === b.cardIndex;
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => normalizeRoute(parseRoute(location.hash)));
  const routeRef = useRef<Route>(route);

  const commit = useCallback((next: Route) => {
    routeRef.current = next;
    setRoute(next);
  }, []);

  // 空路由首填：state 初始化时 normalizeRoute(null) 已给出第一套卡组，
  // 这里只把 URL 补成规范形态（replace 掉裸地址），不改 state
  useEffect(() => {
    if (!HASH_RE.test(location.hash)) {
      location.replace(hashOf(routeRef.current));
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = normalizeRoute(parseRoute(location.hash));
      if (sameRoute(next, routeRef.current)) return;
      commit(next);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [commit]);

  const goToCard = useCallback(
    (deckId: string, cardIndex: number, opts?: { replace?: boolean }) => {
      const next = normalizeRoute({ deckId, cardIndex });
      if (sameRoute(next, routeRef.current)) return;
      commit(next); // 立即更新 state，UI 跟手；随后的 hashchange 回声会被 sameRoute 吸收
      const hash = hashOf(next);
      if (opts?.replace) location.replace(hash);
      else location.assign(hash);
    },
    [commit],
  );

  return { route, goToCard };
}
