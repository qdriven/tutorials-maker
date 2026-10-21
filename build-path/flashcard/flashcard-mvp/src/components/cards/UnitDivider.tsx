import { useMemo } from "react";
import type { Card } from "@/lib/cards";

/**
 * :::unit 单元分隔卡。一章分成几个单元，一张分隔卡宣布一个。
 *   goal: 这一单元解决什么，一句话。
 * 五拍节奏（概念→关系→例子→实操→问题）从这张卡开始走。
 */
export function UnitDivider({ card }: { card: Card }) {
  const goal = useMemo(() => {
    for (const raw of (card.directiveBody ?? "").split("\n")) {
      const line = raw.trim();
      if (line.startsWith("goal:")) return line.slice("goal:".length).trim();
    }
    return "";
  }, [card.directiveBody]);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-start justify-center gap-4">
      <div className="h-px w-16 bg-teal/30" aria-hidden />
      <div className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {card.title}
      </div>
      {goal && (
        <div className="border-l-2 border-teal/40 pl-3">
          <div className="font-mono text-[11px] font-semibold tracking-wider text-teal-deep">
            单元目标
          </div>
          <div className="mt-1 text-sm leading-relaxed text-ink-3">{goal}</div>
        </div>
      )}
    </div>
  );
}
