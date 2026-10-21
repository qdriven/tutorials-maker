import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { decks, deckById } from "@/lib/decks";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { DeckSidebar } from "@/components/DeckSidebar";
import { useHashRoute } from "@/hooks/use-hash-route";
import { cn } from "@/lib/utils";

// v2：内容重切卡后 quiz 下标漂移，旧进度作废（格式不变，不做下标迁移）
const STORAGE_KEY = "flashcard-mvp-progress-v2";

type Progress = Record<string, number[]>;

function loadProgress(): Progress {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Progress;
  } catch {
    return {};
  }
}

export default function App() {
  const { route, goToCard } = useHashRoute();
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const activeDeck = useMemo(() => deckById(route.deckId) ?? decks[0], [route.deckId]);

  const resolveCard = useCallback((deckId: string, cardIndex: number) => {
    setProgress((current) => {
      const list = current[deckId] ?? [];
      if (list.includes(cardIndex)) return current;
      return { ...current, [deckId]: [...list, cardIndex] };
    });
  }, []);

  return (
    <div className="flex h-dvh bg-background text-foreground">
      <DeckSidebar
        activeDeckId={activeDeck?.meta.id ?? ""}
        activeCardIndex={route.cardIndex}
        progress={progress}
        onNavigate={goToCard}
      />

      {/* 主区：slides 舞台。换卡组走 vivid 式的弹簧滑动 */}
      <main className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 lg:p-8">
        {/* 移动端卡组选择（md 以下没有侧栏） */}
        <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
          {decks.map((deck) => (
            <button
              key={deck.meta.id}
              type="button"
              onClick={() => goToCard(deck.meta.id, 0)}
              className={cn(
                "shrink-0 rounded-full border border-border px-3 py-1.5 text-xs transition-colors",
                deck.meta.id === activeDeck?.meta.id
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-surface-hover",
              )}
            >
              {deck.meta.title}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeDeck?.meta.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ type: "spring", stiffness: 170, damping: 24 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            {activeDeck ? (
              <FlashcardDeck
                deck={activeDeck}
                initialIndex={route.cardIndex}
                onCardChange={(index) => goToCard(activeDeck.meta.id, index)}
                resolved={new Set(
                  (progress[activeDeck.meta.id] ?? []).filter(
                    (index) => index < activeDeck.cards.length,
                  ),
                )}
                onResolve={(cardIndex) => resolveCard(activeDeck.meta.id, cardIndex)}
              />
            ) : (
              <p className="text-muted-foreground">content/decks/ 下还没有任何 markdown 卡组。</p>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
