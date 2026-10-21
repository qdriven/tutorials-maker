import { ChevronLeft, ChevronRight, Milestone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Deck } from "@/lib/cards";
import { BEAT_LABEL, BEAT_ORDER, beatOfCard, type BeatKind, type DeckStructure } from "@/lib/deck-structure";

/**
 * 节奏指示器：当前卡在哪个单元、走到五拍的哪一拍。
 * 只在 frontmatter 声明 interactive: true 且当前卡在单元内时渲染——
 * :::goal 卡、无结构的 deck 都不出现。
 *
 * 中间的拍 pill 可点：跳到本单元该拍的第一张卡。实操拍缺席时显示
 * 幽灵态（终端本期不接），节奏本身保持可见。
 */
export function RhythmStepper({
  structure,
  deck,
  current,
  onJump,
}: {
  structure: DeckStructure;
  deck: Deck;
  current: number;
  onJump: (cardIndex: number) => void;
}) {
  const unit = structure.unitOfCard[current];
  if (!unit) return null;

  // 本单元每个拍的第一张卡；顺序以外的卡（分隔卡自己）不算拍
  const firstOfBeat = new Map<BeatKind, number>();
  for (const index of unit.cardIndexes) {
    const beat = beatOfCard(deck.cards[index]);
    if (beat !== "goal" && !firstOfBeat.has(beat)) firstOfBeat.set(beat, index);
  }
  const currentBeat = beatOfCard(deck.cards[current]);
  const prevUnit = structure.units[unit.index - 1];
  const nextUnit = structure.units[unit.index + 1];

  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-ink-3">
        <Milestone className="h-3.5 w-3.5 shrink-0 text-teal" />
        <span className="truncate">{unit.title}</span>
      </div>

      <div className="flex items-center gap-1">
        {BEAT_ORDER.map((beat) => {
          const target = firstOfBeat.get(beat);
          if (target === undefined) {
            // 本单元没有这一拍。只有实操会缺席（终端暂缓），其余拍缺了说明内容没写全
            return (
              <span
                key={beat}
                className="cursor-default rounded-full px-2.5 py-1 font-mono text-[11px] text-ink-4 opacity-60"
              >
                {BEAT_LABEL[beat]} · 暂缓
              </span>
            );
          }
          const isCurrent = beat === currentBeat;
          return (
            <button
              key={beat}
              type="button"
              onClick={() => onJump(target)}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors duration-200",
                isCurrent
                  ? "bg-teal-soft font-semibold text-teal-deep"
                  : "text-ink-3 hover:bg-surface-hover hover:text-ink",
              )}
            >
              {BEAT_LABEL[beat]}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={!prevUnit}
          onClick={() => prevUnit && onJump(prevUnit.startIndex)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> 上一单元
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!nextUnit}
          onClick={() => nextUnit && onJump(nextUnit.startIndex)}
        >
          下一单元 <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
