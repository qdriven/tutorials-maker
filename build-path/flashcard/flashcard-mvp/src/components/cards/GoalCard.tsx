import { useMemo } from "react";
import { Target } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Card } from "@/lib/cards";

interface GoalData {
  /** 章节的目标问题——学完要能回答什么 */
  question: string;
  /** 读完能干什么（目的） */
  objective: string;
  /** 单元清单，逐项解决目标 */
  units: string[];
}

/**
 * :::goal 章节目标卡，一章一张，放在最前面。
 *   question: 学完这节课，你能回答：……
 *   objective: 读完你能干什么，一句话。
 *   - 单元一要解决的
 *   - 单元二要解决的
 * 反向设计的锚点：读者带着问题往下走，最后一并回收。
 */
function parseGoal(body: string): GoalData {
  const data: GoalData = { question: "", objective: "", units: [] };
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("question:")) {
      data.question = line.slice("question:".length).trim();
    } else if (line.startsWith("objective:")) {
      data.objective = line.slice("objective:".length).trim();
    } else if (line.startsWith("- ")) {
      const unit = line.slice(2).trim();
      if (unit) data.units.push(unit);
    }
  }
  return data;
}

export function GoalCard({ card }: { card: Card }) {
  const goal = useMemo(() => parseGoal(card.directiveBody ?? ""), [card.directiveBody]);

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-5 py-2">
      <div className="flex flex-col gap-2">
        <div className="font-mono text-[11px] font-semibold tracking-wider text-amber">本章目标</div>
        <div className="text-lg leading-snug font-semibold text-ink sm:text-xl">
          {goal.question || card.title}
        </div>
      </div>

      {goal.objective && (
        <div className="flex items-start gap-2.5 rounded-xl border border-teal/40 bg-teal-wash px-4 py-3">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
          <div className="text-sm leading-relaxed text-ink">
            <span className="mr-2 font-mono text-[11px] font-semibold tracking-wider text-teal-deep">
              读完你能
            </span>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{goal.objective}</ReactMarkdown>
          </div>
        </div>
      )}

      {goal.units.length > 0 && (
        <div className="grid gap-2">
          {goal.units.map((unit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-border-glass bg-surface-active px-4 py-2.5 text-sm text-ink shadow-[var(--shadow-button)]"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-teal-soft font-mono text-xs text-teal-deep">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">{unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
