/**
 * 卡片的人类可读标签 + 类型图标，喂给侧栏大纲和卡头。
 * 标题来自卡内第一个 heading 或指令的 title 属性（cards.ts 已解析），
 * 没有就按卡类型从指令正文里捞一句兜底。
 */
import { CircleHelp, FileText, Goal, Milestone, MonitorPlay, Repeat2, Terminal } from "lucide-react";
import type { Card } from "@/lib/cards";

const LABEL_LIMIT = 16;

function truncate(text: string, limit = LABEL_LIMIT): string {
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

function quizQuestion(card: Card): string {
  for (const line of (card.directiveBody ?? "").split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("question:")) return trimmed.slice("question:".length).trim();
  }
  return "";
}

function flipFront(card: Card): string {
  for (const line of (card.directiveBody ?? "").split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("front:")) return trimmed.slice("front:".length).trim();
  }
  return "";
}

export function cardLabel(card: Card, index: number): string {
  if (card.title) return card.title;
  if (card.type === "quiz") {
    const question = quizQuestion(card);
    return question ? `测验 · ${truncate(question)}` : `测验 ${index + 1}`;
  }
  if (card.type === "flip") {
    const front = flipFront(card);
    return front ? `翻面 · ${truncate(front)}` : `翻面卡 ${index + 1}`;
  }
  return `第 ${index + 1} 张`;
}

/** 卡类型徽标的文案 */
export function cardTypeLabel(card: Card): string {
  if (card.type === "quiz") return "测验";
  if (card.type === "flip") return "翻面";
  if (card.type === "stage") return "演示";
  if (card.type === "goal") return "目标";
  if (card.type === "unit") return "单元";
  if (card.type === "practice") return "动手";
  return "文档";
}

export function cardIcon(card: Card) {
  if (card.type === "quiz") return CircleHelp;
  if (card.type === "flip") return Repeat2;
  if (card.type === "stage") return MonitorPlay;
  if (card.type === "goal") return Goal;
  if (card.type === "unit") return Milestone;
  if (card.type === "practice") return Terminal;
  return FileText;
}
