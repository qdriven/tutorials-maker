/**
 * :::stage 卡渲染器：一个完整的分步演示工作台。
 *
 * 布局（同屏展示是本次迁移的核心诉求）：
 * - ≥xl：左=竖排步进条，中=节点图（当前动作 pill + 图例）+ 运行日志，右=当前步代码
 * - <xl：横向步进条、图、日志、代码自上而下堆叠，靠卡片自身滚动
 *
 * 移植自 vivid-dsh src/tutorial/LessonView.tsx 的工作台部分（无代码抽屉）。
 * 键盘：事件接管在本容器上（tabIndex=0），到头后 blur 放行给卡组级翻卡。
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildDiagramFrame, buildFlowGroups } from "@/lib/diagram-frames";
import { hasMobileCells, parseStageBody } from "@/lib/stage";
import type { Card } from "@/lib/cards";
import type { NodeKind, StageLesson } from "@/lib/stage";
import { useStagePlayer } from "@/hooks/use-stage-player";
import { CodePanel } from "./CodePanel";
import { RunLog } from "./RunLog";
import { StageDiagram } from "./StageDiagram";

/** 媒体查询 hook（vivid useNarrowViewport 的泛化版） */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const LEGEND: { kind: NodeKind; label: string; color: string }[] = [
  { kind: "core", label: "内核", color: "var(--node-core-stroke)" },
  { kind: "plugin", label: "插件", color: "var(--node-plugin-stroke)" },
  { kind: "external", label: "外部", color: "var(--node-external-stroke)" },
  { kind: "data", label: "数据", color: "var(--node-data-stroke)" },
];

type TeachingFrame =
  | { kind: "step"; stepIndex: number; beatIndex: number; beatCount: number }
  | { kind: "overview"; stepIndex: number; beatIndex: number; beatCount: number };

function teachingFramesOf(lesson: StageLesson): TeachingFrame[] {
  return [
    ...lesson.steps.flatMap((item, stepIndex) => {
      const beatCount = Math.max(1, buildFlowGroups(item, lesson.stage.edges).length);
      return Array.from({ length: beatCount }, (_, beatIndex) => ({ kind: "step" as const, stepIndex, beatIndex, beatCount }));
    }),
    { kind: "overview" as const, stepIndex: lesson.steps.length, beatIndex: 0, beatCount: 1 },
  ];
}

function ErrorPanel({ errors }: { errors: string[] }) {
  return (
    <div className="rounded-xl bg-hot-wash p-4 text-sm leading-relaxed text-hot">
      <p className="font-semibold">这张 stage 卡的内容没解析出来：</p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-[13px]">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

export function StageCard({ card, active = false }: { card: Card; active?: boolean }) {
  const { lesson, errors } = useMemo(() => parseStageBody(card.directiveBody), [card.directiveBody]);
  const teachingFrames = useMemo(() => (lesson ? teachingFramesOf(lesson) : []), [lesson]);

  const player = useStagePlayer(Math.max(teachingFrames.length, 1), 2600, active);
  const containerRef = useRef<HTMLElement>(null);
  const playedOnce = useRef(false);
  // active 效果里只读播放器方法，用 ref 隔离，避免播放状态变化把焦点抢回来
  const playerRef = useRef(player);
  useEffect(() => {
    playerRef.current = player;
  });

  const wide = useMediaQuery("(min-width: 1280px)");
  const narrow = useMediaQuery("(max-width: 639px)");

  const cursor = teachingFrames[player.currentFrame] ?? { kind: "overview" as const, stepIndex: 0, beatIndex: 0, beatCount: 1 };
  const isOverview = cursor.kind === "overview";
  const stepIndex = isOverview ? (lesson?.steps.length ?? 1) - 1 : cursor.stepIndex;
  const step = lesson?.steps[stepIndex];
  const usedKinds = useMemo(() => new Set(lesson?.stage.nodes.map((node) => node.kind) ?? []), [lesson]);
  const hasMobileLayout = lesson ? hasMobileCells(lesson.stage.nodes) : false;
  const diagramFrame = useMemo(
    () => (lesson ? buildDiagramFrame(lesson, cursor.stepIndex, cursor.beatIndex) : null),
    [cursor.beatIndex, cursor.stepIndex, lesson],
  );
  const firstFrameForStep = useMemo(() => {
    const result: number[] = [];
    teachingFrames.forEach((frame, frameIndex) => {
      if (frame.kind === "step" && result[frame.stepIndex] === undefined) result[frame.stepIndex] = frameIndex;
    });
    return result;
  }, [teachingFrames]);

  const currentStepRef = useRef<HTMLButtonElement>(null);
  // 步进条横排装不下所有步，当前步会滑出可视区；nearest 只在真的看不见时才滚
  useEffect(() => {
    currentStepRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [stepIndex, isOverview]);

  // 焦点交接：卡激活时拿焦点 + 首次延迟自动播放；失活时暂停
  useEffect(() => {
    if (!lesson) return;
    if (active) {
      containerRef.current?.focus({ preventScroll: true });
      if (!playedOnce.current) {
        playedOnce.current = true;
        const timer = window.setTimeout(() => playerRef.current.togglePlaying(), 700);
        return () => window.clearTimeout(timer);
      }
    } else {
      playerRef.current.pause();
    }
  }, [active, lesson]);

  if (!lesson || !step || !diagramFrame) {
    return <ErrorPanel errors={errors.length > 0 ? errors : ["stage 数据不完整"]} />;
  }

  const total = teachingFrames.length;

  // 键盘只在本容器聚焦时接管；到头后 blur，下一次按键交还卡组级导航
  function onKeyDown(event: React.KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (target?.closest("input, textarea, [contenteditable='true']")) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      if (player.currentFrame === 0) containerRef.current?.blur();
      else player.previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      if (player.currentFrame >= total - 1) containerRef.current?.blur();
      else player.next();
    } else if (event.key === " " && target?.tagName !== "BUTTON") {
      event.preventDefault();
      event.stopPropagation();
      player.togglePlaying();
    }
  }

  const displayCode = isOverview ? lesson.steps[lesson.steps.length - 1].code : step.code;

  return (
    <section
      aria-label={card.title ?? "分步演示"}
      className="stage-workbench flex min-h-0 flex-1 flex-col gap-4 rounded-[1.25rem] outline-none"
      onKeyDown={onKeyDown}
      ref={containerRef}
      tabIndex={0}
    >
      {/* 步头：大号步号 + 标题 + detail（每拍 cross-fade） */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid min-h-[72px] grid-cols-[auto_1fr] items-start gap-4"
          exit={{ opacity: 0, y: -5 }}
          initial={{ opacity: 0, y: 5 }}
          key={isOverview ? "overview" : `${step.id}-${cursor.kind === "step" ? cursor.beatIndex : 0}`}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="font-mono text-[2rem] font-bold leading-none text-[var(--ink)]">
              {isOverview ? "◎" : String(stepIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-4)]">
              {isOverview ? "全景" : `/ ${String(lesson.steps.length).padStart(2, "0")}`}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight text-[var(--ink)] sm:text-lg">
              {isOverview ? "完整链路已经串起来" : step.title}
            </h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--ink-2)] sm:text-[13px]">
              {isOverview
                ? "总览只保留组件关系。点击左侧任一步，可以重新查看当时新增的数据流。"
                : step.detail}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 同屏网格：步进条 | 图+日志 | 代码 */}
      <div className="grid min-w-0 gap-3 xl:h-[min(700px,calc(100dvh-230px))] xl:grid-cols-[190px_minmax(0,1fr)_minmax(320px,0.9fr)]">
        <div
          aria-label="演示步骤"
          className="step-rail thin-scroll"
          data-orientation={wide ? "vertical" : "horizontal"}
        >
          <div className="step-rail-label">步骤</div>
          {lesson.steps.map((item, itemIndex) => {
            const current = !isOverview && itemIndex === stepIndex;
            const past = isOverview || itemIndex < stepIndex;
            return (
              <button
                aria-current={current ? "step" : undefined}
                className={`step-rail-item ${current ? "step-rail-item--current" : ""}`}
                key={item.id}
                onClick={() => player.goTo(firstFrameForStep[itemIndex])}
                ref={current ? currentStepRef : undefined}
                type="button"
              >
                <span className={`step-rail-number ${current ? "is-current" : past ? "is-past" : ""}`}>
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                <span className={`step-rail-title ${current ? "is-current" : past ? "is-past" : ""}`}>{item.title}</span>
              </button>
            );
          })}
          <button
            aria-current={isOverview ? "step" : undefined}
            className={`step-rail-item ${isOverview ? "step-rail-item--current" : ""}`}
            onClick={() => player.goTo(total - 1)}
            ref={isOverview ? currentStepRef : undefined}
            type="button"
          >
            <span className={`step-rail-number ${isOverview ? "is-current" : ""}`}>◎</span>
            <span className={`step-rail-title ${isOverview ? "is-current" : ""}`}>完整链路总览</span>
          </button>
        </div>

        {/* 中列：节点图 + 运行日志 */}
        <div className="flex min-h-0 min-w-0 flex-col gap-3">
          <div className="soft-inset thin-scroll relative h-[min(340px,46vh)] min-w-0 overflow-x-auto rounded-[1.25rem] px-2 pb-8 pt-2 xl:h-auto xl:min-h-[300px] xl:flex-1">
            <div aria-live="polite" className="current-flow">
              <span>{isOverview ? "全局关系" : `当前动作${cursor.beatCount > 1 ? ` ${cursor.beatIndex + 1}/${cursor.beatCount}` : ""}`}</span>
              <strong>{diagramFrame.actionText}</strong>
            </div>
            {/* 窄屏给图一个不再缩小的底线：宁可横滚，也不要缩到看不清 */}
            <div className={`h-full pt-10 ${hasMobileLayout ? "" : "min-w-[800px] xl:min-w-0"}`}>
              <StageDiagram
                caption={isOverview ? `${card.title ?? "分步演示"} 完整链路总览` : `${card.title ?? "分步演示"} 第 ${stepIndex + 1} 步：${step.title}`}
                columnLabels={diagramFrame.columnLabels}
                currentEdges={diagramFrame.currentEdges}
                currentNodes={diagramFrame.currentNodes}
                edges={diagramFrame.edges}
                enteringNodes={diagramFrame.enteringNodes}
                frameKey={`${player.currentFrame}`}
                mode={diagramFrame.mode}
                narrow={narrow && hasMobileLayout}
                nodes={diagramFrame.nodes}
                revealedEdges={diagramFrame.revealedEdges}
                revealedNodes={diagramFrame.revealedNodes}
              />
            </div>
            <div className="absolute bottom-3 left-4 flex flex-wrap gap-3 sm:gap-4">
              {LEGEND.filter((entry) => usedKinds.has(entry.kind)).map((entry) => (
                <span className="flex items-center gap-1.5 text-[9.5px] text-[var(--ink-3)]" key={entry.kind}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {lesson.stage.legendLabels?.[entry.kind] ?? entry.label}
                </span>
              ))}
            </div>
          </div>

          <div className="h-[min(160px,22vh)] xl:h-[min(200px,26vh)]">
            <RunLog currentStep={stepIndex} steps={lesson.steps} />
          </div>
        </div>

        {/* 右列：当前步的代码（总览帧显示末步代码） */}
        <div className="min-h-[320px] min-w-0 xl:h-full">
          {displayCode ? (
            <CodePanel code={displayCode} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-[1.25rem] bg-teal-wash px-4 text-center text-xs text-ink-3">
              这一步没有代码
            </div>
          )}
        </div>
      </div>

      {/* 控制条 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={player.reset} size="sm" title="重置到第一步" variant="outline">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button disabled={player.currentFrame === 0} onClick={player.previous} size="sm" variant="outline">
            <ArrowLeft className="h-3.5 w-3.5" /> 上一步
          </Button>
          <Button onClick={player.togglePlaying} size="sm" variant="default">
            {player.isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" /> 暂停
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> {player.status === "complete" ? "从头播" : "播放"}
              </>
            )}
          </Button>
          <Button disabled={player.currentFrame >= total - 1} onClick={player.next} size="sm" variant="outline">
            下一步 <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--ink-3)]">
            <kbd className="control-kbd">←</kbd>
            <kbd className="control-kbd">→</kbd>
            翻步
            <span className="hidden items-center gap-1.5 sm:flex">
              <kbd className="control-kbd ml-1">空格</kbd>
              播放
            </span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[var(--ink)]">
            {isOverview ? "总览" : `步骤 ${String(stepIndex + 1).padStart(2, "0")}${cursor.kind === "step" && cursor.beatCount > 1 ? ` · 动作 ${cursor.beatIndex + 1}/${cursor.beatCount}` : ""}`}
          </span>
        </div>
      </div>
    </section>
  );
}
