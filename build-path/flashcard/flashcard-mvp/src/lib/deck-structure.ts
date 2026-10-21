/**
 * Deck 的教学结构层：从卡片序列推导「单元」和「五拍节奏」。
 *
 * 单元：:::unit 分隔卡开一组，直到下一张 :::unit。第一张 :::unit 之前是
 * 章节 intro（:::goal 卡等）。没有 :::unit 的 deck 返回 intro=全部、
 * units=[]，调用方据此走原来的平铺渲染——老 deck 零回归。
 *
 * 五拍节奏（概念→关系→例子→实操→问题）按卡片类型推断，作者零额外标记：
 *   :::goal → 目标    markdown → 概念/例子（有代码围栏算例子）
 *   :::stage → 关系   :::practice → 实操   quiz/flip → 问题
 * 推断而不是显式标记，是为了「同一份内容、不同呈现层」的对比实验成立——
 * 换渲染层不用改内容。
 */
import type { Card, Deck } from "./cards";

export type BeatKind = "goal" | "concept" | "relation" | "example" | "practice" | "question";

/** 单元内的教学节奏，顺序固定；元素可选（不是每个单元五拍全齐） */
export const BEAT_ORDER: BeatKind[] = ["concept", "relation", "example", "practice", "question"];

export const BEAT_LABEL: Record<BeatKind, string> = {
  goal: "目标",
  concept: "概念",
  relation: "关系",
  example: "例子",
  practice: "实操",
  question: "问题",
};

export function beatOfCard(card: Card): BeatKind {
  switch (card.type) {
    case "goal":
      return "goal";
    case "stage":
      return "relation";
    case "practice":
      return "practice";
    case "quiz":
    case "flip":
      return "question";
  }
  return /(^|\n)\s*(```|~~~)/.test(card.markdown) ? "example" : "concept";
}

export interface UnitInfo {
  /** 第几个单元，从 0 开始 */
  index: number;
  title: string;
  /** 这一张 :::unit 的 goal: 行 */
  goal?: string;
  /** 分隔卡自己的全局下标 */
  startIndex: number;
  /** 最后一张卡的全局下标（含） */
  endIndex: number;
  /** 分隔卡 + 本单元全部卡的全局下标 */
  cardIndexes: number[];
}

export interface DeckStructure {
  /** 第一个 :::unit 之前的部分（:::goal 等）；无 :::unit 时是全部卡 */
  intro: UnitInfo | null;
  units: UnitInfo[];
  /** 每张卡属于哪个单元；intro 卡为 undefined（intro 本身不算单元） */
  unitOfCard: (UnitInfo | undefined)[];
}

function unitGoal(card: Card): string | undefined {
  for (const raw of (card.directiveBody ?? "").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("goal:")) return line.slice("goal:".length).trim() || undefined;
  }
  return undefined;
}

export function deriveStructure(deck: Deck): DeckStructure {
  const unitStarts = deck.cards
    .map((card, index) => (card.type === "unit" ? index : -1))
    .filter((index) => index >= 0);

  const units: UnitInfo[] = unitStarts.map((start, position) => {
    const end = position + 1 < unitStarts.length ? unitStarts[position + 1] - 1 : deck.cards.length - 1;
    const cardIndexes: number[] = [];
    for (let index = start; index <= end; index++) cardIndexes.push(index);
    return {
      index: position,
      title: deck.cards[start].title ?? `单元 ${position + 1}`,
      goal: unitGoal(deck.cards[start]),
      startIndex: start,
      endIndex: end,
      cardIndexes,
    };
  });

  const intro: UnitInfo | null =
    units.length > 0 && units[0].startIndex > 0
      ? {
          index: -1,
          title: "开头",
          startIndex: 0,
          endIndex: units[0].startIndex - 1,
          cardIndexes: Array.from({ length: units[0].startIndex }, (_, index) => index),
        }
      : null;

  const unitOfCard: (UnitInfo | undefined)[] = deck.cards.map((_, index) =>
    units.find((unit) => index >= unit.startIndex && index <= unit.endIndex),
  );

  return { intro, units, unitOfCard };
}
