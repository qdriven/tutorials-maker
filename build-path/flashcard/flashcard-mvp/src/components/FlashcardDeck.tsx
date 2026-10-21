import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookMarked, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import type { Card, Deck } from "@/lib/cards";
import { CardCallbacksContext } from "@/lib/renderer";
import { resolveCard } from "./cards/registry";
import { cardIcon, cardLabel, cardTypeLabel } from "@/lib/card-labels";
import { deriveStructure } from "@/lib/deck-structure";
import { RhythmStepper } from "./RhythmStepper";

/** 一屏一张卡（slide）。容器是 vivid 式软表面卡，卡类型徽标在左上。stage 工作台需要全宽。 */
function CardSlide({ card, index, active }: { card: Card; index: number; active: boolean }) {
  const isStage = card.type === "stage";
  return (
    <div className="flex h-full min-w-0 flex-[0_0_100%] flex-col px-1 sm:px-2">
      <div
        className={cn(
          "soft-card thin-scroll mx-auto flex h-full min-h-0 w-full flex-col overflow-y-auto rounded-[1.75rem] backdrop-blur-xl",
          isStage ? "max-w-6xl p-4 sm:p-6" : "max-w-2xl p-6 sm:p-10",
        )}
      >
        <div className="mb-5 flex items-center gap-1.5 self-start rounded-full bg-teal-soft px-2.5 py-1 text-[11px] font-semibold text-teal-deep">
          {/* 类型图标同样走 createElement：局部变量当组件用会被 React Compiler lint 判为「render 中创建组件」 */}
          {createElement(cardIcon(card), { className: "h-3 w-3" })}
          <span className="font-mono tracking-wider">{cardTypeLabel(card)}</span>
          <span className="font-mono text-ink-4">/{String(index + 1).padStart(2, "0")}</span>
        </div>
        {/* 动态渲染器走 createElement：局部变量当组件用会被 React Compiler lint 判为「render 中创建组件」 */}
        {createElement(resolveCard(card.type), { card, key: index, active })}
      </div>
    </div>
  );
}

/** 当前卡的 :::ref 参考信息：有则动画展开，无则整块消失（不再常驻占位） */
function ReferencePanel({ reference }: { reference: string | undefined }) {
  return (
    <AnimatePresence initial={false}>
      {reference && (
        <motion.div
          key="reference"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="soft-inset thin-scroll mx-auto mt-3 max-h-32 w-full max-w-2xl overflow-y-auto rounded-xl px-4 py-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-ink-3">
              <BookMarked className="h-3 w-3" />
              参考信息
            </div>
            <div className="prose prose-sm max-w-none text-[13px] leading-relaxed text-muted-foreground dark:prose-invert prose-p:my-1 prose-ul:my-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{reference}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FlashcardDeck({
  deck,
  initialIndex,
  onCardChange,
  resolved,
  onResolve,
}: {
  deck: Deck;
  /** 深链恢复/大纲跳转的目标下标（来自 hash 路由） */
  initialIndex: number;
  onCardChange: (cardIndex: number) => void;
  /** 已通过互动（quiz 答对）的卡下标集合，父层持久化 */
  resolved: Set<number>;
  onResolve: (cardIndex: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [current, setCurrent] = useState(initialIndex);
  const currentRef = useRef(current);

  const total = deck.cards.length;
  const quizIndexes = deck.cards
    .map((card, index) => (card.type === "quiz" ? index : -1))
    .filter((index) => index >= 0);
  const done = quizIndexes.length > 0 && quizIndexes.every((index) => resolved.has(index));

  // select：翻卡（键盘/滑动/按钮/程序跳转）→ 上报给路由。路由写 hash 的回声被 sameRoute 吸收
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      currentRef.current = index;
      setCurrent(index);
      onCardChange(index);
    };
    emblaApi.on("select", onSelect);
    // 深链/大纲跳转恢复：挂载时立即跳到 initialIndex，不播动画
    emblaApi.scrollTo(initialIndex, true);
    return () => {
      emblaApi.off("select", onSelect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, deck.meta.id]);

  // 路由侧主动改卡（后退/前进/大纲点击）：与当前不同才滚动
  useEffect(() => {
    if (!emblaApi) return;
    if (initialIndex !== currentRef.current) {
      emblaApi.scrollTo(initialIndex);
    }
  }, [emblaApi, initialIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  // 单元跳转走和翻卡同一条 embla 通道：select 事件 → onCardChange → hash 同步
  const jumpTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const structure = useMemo(() => deriveStructure(deck), [deck]);

  // 键盘：←/→ 翻卡，Space 下一张。输入框内不拦截，Space 跳过按钮焦点防连跳。
  // stage 工作台聚焦时按键归它管（其容器上的 onKeyDown 会 stopPropagation，
  // 这里的 closest 守卫是兜底——焦点在其子节点上时事件仍可能冒到 window）
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".stage-workbench")) return;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      } else if (event.key === " " && target?.tagName !== "BUTTON") {
        event.preventDefault();
        scrollNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  const handleResolved = useCallback((cardIndex: number) => onResolve(cardIndex), [onResolve]);

  const currentCard = deck.cards[current];

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 卡头：deck 元数据降级为 eyebrow，当前卡标题是主视觉（vivid 步头同款 cross-fade） */}
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            {deck.meta.group && <span>{deck.meta.group}</span>}
            <span className="font-mono">
              {total} 张{deck.meta.minutes ? ` · 约 ${deck.meta.minutes} 分钟` : ""}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mt-1 truncate text-xl font-semibold tracking-tight text-ink sm:text-2xl"
            >
              {currentCard ? cardLabel(currentCard, current) : deck.meta.title}
            </motion.h1>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3">
          {done && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep">
              <CheckCircle2 className="h-3.5 w-3.5" /> 已完成
            </span>
          )}
          <span className="font-mono text-xs text-ink-3">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* 节奏指示器：只给声明 interactive 且带单元结构的 deck */}
      {deck.meta.interactive && (
        <RhythmStepper structure={structure} deck={deck} current={current} onJump={jumpTo} />
      )}

      {/* slides 舞台：横向滑动，纵向滚动留给卡片内部 */}
      <div className="min-h-0 flex-1 touch-pan-y overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {deck.cards.map((card, index) => (
            <CardCallbacksContext.Provider
              key={`${deck.meta.id}-${index}`}
              value={{ onResolved: handleResolved, cardIndex: index }}
            >
              <CardSlide active={index === current} card={card} index={index} />
            </CardCallbacksContext.Provider>
          ))}
        </div>
      </div>

      <ReferencePanel reference={currentCard?.reference} />

      <footer className="mt-4 flex items-center justify-between gap-4">
        <Button variant="outline" size="sm" onClick={scrollPrev} disabled={current === 0}>
          <ArrowLeft className="mr-1.5 h-4 w-4" /> 上一张
        </Button>

        {/* 移动端分卡进度条（md 以下没有大纲） */}
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:hidden">
          {deck.cards.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-200",
                index <= current ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
        <div className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
          <Progress value={total > 0 ? ((current + 1) / total) * 100 : 0} className="h-1.5" />
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          <span className="control-kbd">←</span>
          <span className="control-kbd">→</span>
          <span className="control-kbd">Space</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={scrollNext}
          disabled={current >= total - 1}
        >
          下一张 <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}
