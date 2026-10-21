/**
 * 卡片渲染器注册表：卡类型 → 组件。
 * 新增一种内容 = 写一个组件 + 在这里登记一行。
 * 未注册的类型回落到 MarkdownCard，不会因为写了陌生指令而白屏。
 */
import { MarkdownCard } from "./MarkdownCard";
import { QuizCard } from "./QuizCard";
import { FlipCard } from "./FlipCard";
import { GoalCard } from "./GoalCard";
import { UnitDivider } from "./UnitDivider";
import { PracticeCard } from "./PracticeCard";
import { StageCard } from "@/components/stage/StageCard";
import type { CardRenderer } from "@/lib/renderer";

const registry = new Map<string, CardRenderer>();

export function registerCard(type: string, renderer: CardRenderer): void {
  registry.set(type, renderer);
}

export function resolveCard(type: string): CardRenderer {
  return registry.get(type) ?? MarkdownCard;
}

registerCard("markdown", MarkdownCard);
registerCard("quiz", QuizCard);
registerCard("flip", FlipCard);
registerCard("stage", StageCard);
registerCard("goal", GoalCard);
registerCard("unit", UnitDivider);
registerCard("practice", PracticeCard);
