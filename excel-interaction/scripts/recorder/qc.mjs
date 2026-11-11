#!/usr/bin/env node
// qc.mjs — 出片质检：ffprobe 流信息 + 时长偏差 + 抽帧清单（抽帧目检人工核对字幕/画面同步）。
// 口径：skill/excel-desktop-recorder/SKILL.md 验收清单 + references/tts.md（时长偏差 <5%）。
// 用法：node scripts/recorder/qc.mjs --plan out/<id>/plan.json [--video out/<id>/<id>.mp4] [--shots 4]
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveFfmpeg, resolveFfprobe } from "./bin.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

function parseArgs(argv) {
  const opt = { shots: 4 };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--plan") opt.plan = argv[++i];
    else if (k === "--video") opt.video = argv[++i];
    else if (k === "--shots") opt.shots = Number(argv[++i]);
  }
  return opt;
}

function main() {
  const opt = parseArgs(process.argv.slice(2));
  if (!opt.plan) {
    console.log("用法：node scripts/recorder/qc.mjs --plan out/<id>/plan.json [--video out/<id>/<id>.mp4] [--shots 4]");
    process.exit(1);
  }
  const plan = JSON.parse(readFileSync(opt.plan, "utf8"));
  const video = opt.video ? resolve(opt.video) : join(ROOT, "out", plan.id, `${plan.id}.mp4`);
  const ffmpeg = resolveFfmpeg();
  const ffprobe = resolveFfprobe();
  const problems = [];

  // 1) 流信息：视频流 +（非 off）音频流齐全，编码 h264/aac
  const info = JSON.parse(spawnSync(ffprobe, ["-v", "error", "-show_entries",
    "format=duration:stream=codec_type,codec_name,width,height", "-of", "json", video],
    { encoding: "utf8" }).stdout);
  const kinds = info.streams.map((s) => `${s.codec_type}/${s.codec_name}`);
  const hasVideo = kinds.some((k) => k.startsWith("video/"));
  const hasAudio = kinds.some((k) => k.startsWith("audio/"));
  if (!hasVideo) problems.push("缺视频流");
  if (plan.narrationTrack && !hasAudio) problems.push("缺音频流（计划有配音）");
  if (!plan.narrationTrack && hasAudio) problems.push("计划纯字幕却有音频流");

  // 2) 时长：成品 vs Σ holdMs（偏差 <5%）
  const timeline = plan.segments || plan.steps; // intro → 4 步 → outro（task-11）
  const totalMs = timeline.reduce((a, s) => a + s.holdMs, 0);
  const durMs = Math.round(parseFloat(info.format.duration) * 1000);
  const drift = Math.abs(durMs - totalMs) / totalMs;
  if (drift >= 0.05) problems.push(`时长偏差 ${(drift * 100).toFixed(1)}% ≥ 5%`);

  // 3) 抽帧：每段中点 → out/<id>/qc/（人工核对字幕/画面同步）
  const qcDir = join(ROOT, "out", plan.id, "qc");
  mkdirSync(qcDir, { recursive: true });
  const shots = [];
  let at = 0;
  timeline.forEach((s) => {
    const mid = (at + s.holdMs / 2) / 1000;
    const name = s.kind === "intro" ? "intro-mid" : s.kind === "outro" ? "outro-mid" : `step-${s.n}-mid`;
    const f = join(qcDir, `${name}.png`);
    spawnSync(ffmpeg, ["-y", "-ss", mid.toFixed(3), "-i", video, "-frames:v", "1", f], { encoding: "utf8" });
    shots.push({ n: s.n, kind: s.kind || "step", at: mid, expect: s.expect || s.narration, narration: s.narration, file: f.replace(/\\/g, "/") });
    at += s.holdMs;
  });

  console.log(`流 ${kinds.join(" + ")}｜画幅 ${info.streams.find((s) => s.width)?.width || "?"}x${info.streams.find((s) => s.height)?.height || "?"}`);
  console.log(`时长 ${durMs}ms vs ΣholdMs ${totalMs}ms（偏差 ${(drift * 100).toFixed(1)}%${drift < 0.05 ? " ✓" : " ✗"}）`);
  shots.forEach((s) => console.log(`  抽帧 ${s.kind}${s.n ? " 第" + s.n + "步" : ""} @${s.at.toFixed(1)}s → ${s.file}｜预期 ${s.expect}`));
  if (problems.length) {
    problems.forEach((p) => console.log("✗ " + p));
    process.exit(1);
  }
  console.log(`✓ qc 全过（抽帧 ${shots.length} 张待目检核对字幕/画面同步）`);
}

main();
