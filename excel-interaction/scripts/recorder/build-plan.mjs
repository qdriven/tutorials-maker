#!/usr/bin/env node
// build-plan.mjs — 课程契约 → 录制计划（出片第一步），零依赖。
// 口径：skill/excel-desktop-recorder/SKILL.md + references/tts.md（无废话三规则、语音驱动节奏）。
// 产物：out/<id>/plan.json（中间产物，不手改、不入库）+ out/<id>/tts/（逐段语音 + 整轨）。
// 用法：node scripts/recorder/build-plan.mjs --config courses/<id>.json [--out out/<id>/plan.json]
//        [--tts edge|sapi|off] [--voice …] [--rate "+25%"] [--mode render|capture|browser] [--engine auto|excel|wps|libreoffice|hot]
//        [--size 1280x800] [--min-hold 1200] [--full]
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { speakSegment, buildNarration, DEFAULT_VOICE, ratePct } from "./tts.mjs";

const MIN_HOLD_MS = 1200;
const DEFAULT_RATE = "+25%"; /* 无废话节奏（task-16）：默认加速口播，--rate "+0%" 恢复原速 */

function parseArgs(argv) {
  const opt = { tts: "edge", mode: "render", engine: "auto", size: "1280x800", minHoldMs: MIN_HOLD_MS, full: false, rate: DEFAULT_RATE };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--config") opt.config = argv[++i];
    else if (k === "--out") opt.out = argv[++i];
    else if (k === "--tts") opt.tts = argv[++i];
    else if (k === "--voice") opt.voice = argv[++i];
    else if (k === "--rate") opt.rate = argv[++i];
    else if (k === "--mode") opt.mode = argv[++i];
    else if (k === "--engine") opt.engine = argv[++i];
    else if (k === "--size") opt.size = argv[++i];
    else if (k === "--min-hold") opt.minHoldMs = Number(argv[++i]);
    else if (k === "--full") opt.full = true;
  }
  return opt;
}

/** 剔除公式片段（画面上有、念出来是噪音）："=VLOOKUP(...)"、裸 "A2:B5" 不动。 */
function stripFormula(s) {
  return String(s ?? "")
    .replace(/\s*=?[A-Z][A-Z0-9_.]*\([^）)]*\)/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([，。；;、])/g, "$1")
    .trim();
}

/**
 * 解说词派生（无废话三规则，task-20 节奏收紧版）：
 * 1) 公式行不念（expect 内嵌公式片段剔除）；2) brief 只念动作名（菜单标题）；
 *    公式步只念参数清单（动作名不念——打字画面 + 步骤卡自明）；3) --full 逐字念（标题：细节）。
 * 步骤自定义 narration 是作者定稿，直接采用（仍剔公式片段）。
 * argNote（task-13 参数逐位口播）：挂在首个公式的一步，brief 下直接替代动作名——
 * 这一步的教学点就是参数（每步口播 -2s，动作与口播齐步走）。
 */
export function narrationForStep(g, full = false, argNote = null) {
  if (g.narration) return stripFormula(String(g.narration).replace(/[「」]/g, "").trim());
  const title = String(g.menu ?? "").trim().replace(/[。.]+$/, "");
  if (full) {
    const detail = stripFormula(g.expect).replace(/[「」]/g, "").trim();
    const body = [title, detail].filter(Boolean).join("：");
    return argNote ? [body, stripFormula(argNote)].filter(Boolean).join("。") : body;
  }
  return argNote ? stripFormula(argNote) : title;
}

/**
 * 参数逐位口播文（task-13，task-16 无废话紧凑式）：formulaArgs 单源，挂在首个
 * formula 以 = 开头的步骤（公式首次写入那一步）——其余步骤不重复念。返回 {step, text} 或 null。
 * brief（默认）：`参数：<标签>、<标签>…`（标签 = meaning 首个：前缀，画面上有全文）；
 * --full：逐字 `参数：<part> 是 <meaning>；…`。
 */
export function argsNoteFor(course, full = false) {
  const list = course.formulaArgs;
  if (!Array.isArray(list) || !list.length) return null;
  const first = (course.guide || []).find((g) => /^=/.test(String(g.formula ?? "").trim()));
  if (!first) return null;
  const text = full
    ? "参数：" + list.map((a) => `${a.part} 是 ${a.meaning}`).join("；")
    : "参数：" + list.map((a) => String(a.meaning).split("：")[0].trim()).join("、");
  return { step: first.step, text };
}

/** provider=off：无语音，按字数估读时长（纯字幕版节奏）；rate 加速按比例压缩。 */
function estimateSpeechMs(text, rate) {
  const base = Math.min(6000, Math.max(1500, text.length * 220));
  return Math.round(base / (1 + ratePct(rate) / 100));
}

function main() {
  const opt = parseArgs(process.argv.slice(2));
  if (!opt.config) {
    console.log("用法：node scripts/recorder/build-plan.mjs --config courses/<id>.json [--out out/<id>/plan.json] [--tts edge|sapi|off] [--rate \"+25%\"] [--full]");
    process.exit(1);
  }
  const course = JSON.parse(readFileSync(opt.config, "utf8"));
  const id = course.id;
  const outDir = resolve(join(dirname(opt.config), "..", "out", id));
  const ttsDir = join(outDir, "tts");
  const planPath = opt.out ? resolve(opt.out) : join(outDir, "plan.json");
  mkdirSync(ttsDir, { recursive: true });

  const gapMs = (course.narration && course.narration.gapMs) || 800;
  const [w, h] = String(opt.size).split("x").map(Number);
  const provider = opt.tts;
  const voice = opt.voice || DEFAULT_VOICE[provider] || DEFAULT_VOICE.edge;

  // 1) 解说词派生（参数逐位口播挂首个公式步，task-13；brief 走紧凑式，task-16）
  const note = argsNoteFor(course, opt.full);
  const steps = course.guide.map((g, i) => ({
    kind: "step",
    n: i + 1,
    cell: g.cell,
    menu: g.menu,
    formula: g.formula,
    expect: g.expect,
    narration: narrationForStep(g, opt.full, note && note.step === g.step ? note.text : null),
    params: note && note.step === g.step
      ? (course.formulaArgs || []).map((a) => ({ part: a.part, meaning: a.meaning, label: String(a.meaning).split("：")[0].trim() }))
      : null,
    audio: null,
    speechMs: 0,
    holdMs: 0,
  }));

  // 开篇/收尾段（契约 summary，task-11）：口播开篇只念一句话总结（无废话口径，task-16）——
  // SQL 解释上屏不念（画面卡/文章里有全文）；收尾总结照念。--full 逐字全念。
  // 时间线 intro → 4 步 → outro；steps 字段保留 4 步本体（UNO 重演等按步消费）。
  const sum = course.summary || {};
  const introText = opt.full
    ? [sum.oneLiner, sum.explain].filter(Boolean).join(" ").trim()
    : String(sum.oneLiner || sum.explain || "").trim();
  const outroText = String(sum.outro || "").trim();
  const introSeg = introText ? { kind: "intro", narration: introText, audio: null, speechMs: 0, holdMs: 0 } : null;
  const outroSeg = outroText ? { kind: "outro", narration: outroText, audio: null, speechMs: 0, holdMs: 0 } : null;
  const segments = [...(introSeg ? [introSeg] : []), ...steps, ...(outroSeg ? [outroSeg] : [])];

  // 2) 先 TTS 拿真实时长（禁先定帧数再塞语音）
  let degraded = null;
  segments.forEach((sg) => {
    const key = sg.kind === "step" ? `step-${sg.n}` : sg.kind;
    if (provider === "off") {
      sg.speechMs = estimateSpeechMs(sg.narration, opt.rate);
    } else {
      const out = join(ttsDir, `${key}.wav`);
      const r = speakSegment({ provider, voice, text: sg.narration, out, workDir: ttsDir, rate: opt.rate });
      sg.audio = out;
      sg.speechMs = r.durationMs;
      degraded = degraded || r.degraded;
    }
    sg.holdMs = Math.max(opt.minHoldMs, sg.speechMs + gapMs);
  });

  // 逐参数高亮拆段（遗留 #4 清偿）：公式步驻留按参数标签字数占比切块——
  // 块边界驱动 Lesson.focusParam + 步骤卡行高亮，画面随口播推进（总时长不变）
  steps.forEach((sg) => {
    if (!Array.isArray(sg.params) || !sg.params.length) return;
    const weights = sg.params.map((p) => Math.max(1, String(p.label || p.part).length));
    const total = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    sg.paramBlocks = sg.params.map((p, i) => {
      const ms = i === sg.params.length - 1 ? sg.holdMs - acc : Math.round((sg.holdMs * weights[i]) / total);
      acc += ms;
      return { i, ms };
    });
  });

  // 3) 整轨（每段按 holdMs 补静音拼接，总长 = Σ holdMs）
  let narrationTrack = null;
  let trackMs = 0;
  if (provider !== "off") {
    const r = buildNarration({
      segments: segments.map((sg) => ({ file: sg.audio, holdMs: sg.holdMs })),
      workDir: ttsDir,
      out: join(ttsDir, "narration.wav"),
    });
    narrationTrack = r.file;
    trackMs = r.totalMs;
  }

  const totalMs = segments.reduce((a, sg) => a + sg.holdMs, 0);
  const plan = {
    id,
    title: course.title,
    theme: course.theme,
    engine: opt.engine === "auto" ? course.engine : opt.engine,
    mode: opt.mode,
    size: [w, h],
    full: opt.full,
    tts: { provider, voice, rate: opt.rate, gapMs, minHoldMs: opt.minHoldMs, degraded },
    config: opt.config.replace(/\\/g, "/"),
    checks: course.checks,
    steps,
    segments,
    totalMs,
    narrationTrack: narrationTrack ? narrationTrack.replace(/\\/g, "/") : null,
    trackMs,
  };
  mkdirSync(dirname(planPath), { recursive: true });
  writeFileSync(planPath, JSON.stringify(plan, null, 2) + "\n", "utf8");

  console.log(`✓ 录制计划 ${planPath}`);
  console.log(`  模式 ${plan.mode} · 引擎 ${plan.engine} · 画幅 ${w}x${h} · tts ${provider} rate ${opt.rate}${degraded ? "（降级 " + degraded + "）" : ""}`);
  segments.forEach((sg) => {
    const label = sg.kind === "step" ? `第 ${sg.n} 步` : sg.kind === "intro" ? "开篇段" : "收尾段";
    console.log(`  ${label} ${sg.holdMs}ms = max(${opt.minHoldMs}, ${sg.speechMs}+${gapMs})｜${sg.narration}`);
  });
  console.log(`  总时长 ${totalMs}ms（${(totalMs / 1000).toFixed(1)}s）${narrationTrack ? "｜整轨 " + trackMs + "ms" : "｜纯字幕（无音频）"}`);
}

/* 直接执行才跑主流程（导出函数供断言/复用，import 不触发 CLI） */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
