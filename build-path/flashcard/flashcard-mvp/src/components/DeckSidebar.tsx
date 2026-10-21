import { createElement, useEffect, useRef } from "react";
import { BookOpen, Check, Layers, Milestone } from "lucide-react";
import { decks } from "@/lib/decks";
import type { Card } from "@/lib/cards";
import { cardIcon, cardLabel } from "@/lib/card-labels";
import { deriveStructure } from "@/lib/deck-structure";
import { cn } from "@/lib/utils";

type Progress = Record<string, number[]>;

type Navigate = (deckId: string, cardIndex: number) => void;

/**
 * 大纲里的一行卡。从原有内联 markup 原样抽出（全局编号、勾选、图标），
 * 平铺和单元分组两种渲染共用——进度和 hash 路由都按全局下标走。
 */
function CardRow({
  card,
  deckId,
  index,
  isActive,
  resolvedCard,
  onNavigate,
  rowRef,
}: {
  card: Card;
  deckId: string;
  index: number;
  isActive: boolean;
  resolvedCard: boolean;
  onNavigate: Navigate;
  rowRef: React.RefObject<HTMLButtonElement | null> | undefined;
}) {
  return (
    <li>
      <button
        ref={isActive ? rowRef : undefined}
        type="button"
        onClick={() => onNavigate(deckId, index)}
        className={cn(
          "group relative flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors",
          isActive
            ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
            : "text-ink-3 hover:bg-surface-hover hover:text-ink",
        )}
      >
        {isActive && (
          <span className="absolute -left-[5px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
        )}
        <span
          className={cn(
            "w-5 shrink-0 text-right font-mono text-[10px]",
            isActive ? "text-teal-deep" : "text-ink-4",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 truncate">{cardLabel(card, index)}</span>
        {resolvedCard && <Check className="h-3 w-3 shrink-0 text-teal" />}
        {createElement(
          cardIcon(card),
          {
            className: cn(
              "h-3.5 w-3.5 shrink-0 text-ink-4 transition-colors group-hover:text-ink-3",
              isActive && "text-teal-deep",
            ),
          },
        )}
      </button>
    </li>
  );
}

/**
 * 侧栏大纲：deck 分组，活跃 deck 展开到每张卡，点卡直达（hash 定位）。
 * 活跃行滚动到视野内 —— 活跃下标来自路由，不需要 IntersectionObserver。
 *
 * 声明 interactive 且带 :::unit 的 deck 按单元分组（单元头可点，跳到该单元
 * 分隔卡）；其余 deck 保持平铺——老内容零变化。
 */
export function DeckSidebar({
  activeDeckId,
  activeCardIndex,
  progress,
  onNavigate,
}: {
  activeDeckId: string;
  activeCardIndex: number;
  progress: Progress;
  onNavigate: Navigate;
}) {
  const activeRowRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRowRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeDeckId, activeCardIndex]);

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 md:flex">
      <div className="flex items-center gap-2.5 px-2 py-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal-deep text-white shadow-[var(--shadow-button)]">
          <Layers className="h-4 w-4" />
        </span>
        <div>
          <div className="text-sm font-semibold">Flashcard MVP</div>
          <div className="font-mono text-[10px] text-ink-3">{decks.length} 套卡组</div>
        </div>
      </div>

      <nav className="thin-scroll mt-4 flex-1 space-y-4 overflow-y-auto px-1 pb-2">
        {decks.map((deck) => {
          const active = deck.meta.id === activeDeckId;
          const resolved = progress[deck.meta.id] ?? [];
          const quizCount = deck.cards.filter((card) => card.type === "quiz").length;
          const done = quizCount > 0 && resolved.filter((index) => deck.cards[index]?.type === "quiz").length >= quizCount;
          return (
            <div key={deck.meta.id}>
              <button
                type="button"
                onClick={() => onNavigate(deck.meta.id, 0)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-surface-hover",
                )}
              >
                <BookOpen className="h-4 w-4 shrink-0 text-teal" />
                <span className="min-w-0 flex-1 truncate">{deck.meta.title}</span>
                {done ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-teal" />
                ) : (
                  <span className="shrink-0 font-mono text-[10px] text-ink-4">
                    {deck.cards.length} 卡
                  </span>
                )}
              </button>

              {active && (
                <ActiveDeckOutline
                  deck={deck}
                  activeCardIndex={activeCardIndex}
                  resolved={resolved}
                  onNavigate={onNavigate}
                  activeRowRef={activeRowRef}
                />
              )}
            </div>
          );
        })}
      </nav>

      <p className="mt-3 px-2 text-[10px] leading-relaxed text-ink-4">
        内容来自 content/decks/*.md，构建时自动收集
      </p>
    </aside>
  );
}

function ActiveDeckOutline({
  deck,
  activeCardIndex,
  resolved,
  onNavigate,
  activeRowRef,
}: {
  deck: (typeof decks)[number];
  activeCardIndex: number;
  resolved: number[];
  onNavigate: Navigate;
  activeRowRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const rowFor = (index: number) => (
    <CardRow
      card={deck.cards[index]}
      deckId={deck.meta.id}
      index={index}
      isActive={index === activeCardIndex}
      resolvedCard={deck.cards[index].type === "quiz" && resolved.includes(index)}
      onNavigate={onNavigate}
      rowRef={activeRowRef}
    />
  );

  const structure = deriveStructure(deck);
  if (!(deck.meta.interactive && structure.units.length > 0)) {
    return (
      <ol className="mt-1 space-y-px border-l border-sidebar-border pl-1">
        {deck.cards.map((_, index) => rowFor(index))}
      </ol>
    );
  }

  return (
    <div className="mt-1">
      {structure.intro && (
        <ol className="space-y-px border-l border-sidebar-border pl-1">
          {structure.intro.cardIndexes.map(rowFor)}
        </ol>
      )}
      {structure.units.map((unit) => {
        const unitActive = activeCardIndex >= unit.startIndex && activeCardIndex <= unit.endIndex;
        return (
          <div key={unit.index} className="mt-2">
            <button
              type="button"
              onClick={() => onNavigate(deck.meta.id, unit.startIndex)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-surface-hover",
                unitActive ? "font-semibold text-teal-deep" : "font-semibold text-ink-2",
              )}
            >
              <Milestone className={cn("h-3.5 w-3.5 shrink-0", unitActive ? "text-teal" : "text-ink-4")} />
              <span className="min-w-0 flex-1 truncate">{unit.title}</span>
            </button>
            <ol className="mt-1 space-y-px border-l border-sidebar-border pl-1">
              {unit.cardIndexes.map(rowFor)}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
