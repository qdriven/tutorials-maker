#!/usr/bin/env node
// tts.mjs — 配音合成（provider 抽象），零依赖。口径见 skill/excel-desktop-recorder/references/tts.md。
// providers: edge（神经语音首选，默认 zh-CN-XiaoxiaoNeural）/ sapi（Windows 离线兜底，
//   Microsoft Huihui Desktop）/ off（纯字幕，不合成）。
// 接口：speakSegment({provider, voice, text, out}) → {file, durationMs}
//      buildNarration({segments, workDir, out}) → {file, totalMs}（每段按 holdMs 补静音后拼接）
// 输出统一 22050Hz 单声道 pcm_s16le wav；时长 ffprobe 实测。
// 用法：node tts.mjs --provider edge --text "…" --out out/x.wav
//      node tts.mjs --segments out/<id>/tts/segments.json --out out/<id>/tts/narration.wav
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { resolveFfmpeg, resolveFfprobe, resolvePython } from "./bin.mjs";

export const PROVIDERS = ["off", "sapi", "edge"];
export const DEFAULT_VOICE = {
  edge: "zh-CN-XiaoxiaoNeural",
  sapi: "Microsoft Huihui Desktop",
};

function probeDurationMs(ffprobe, file) {
  const res = spawnSync(
    ffprobe,
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
    { encoding: "utf8" },
  );
  if (res.status !== 0) throw new Error("ffprobe 读时长失败：" + (res.stderr || file));
  return Math.round(parseFloat(res.stdout.trim()) * 1000);
}

/** "+25%" → 25；sapi 侧再折算到 -10..10 档。导出供 build-plan 按速估时。 */
export function ratePct(rate) {
  if (!rate) return 0;
  const m = String(rate).trim().match(/^[+-]?\d+/);
  return m ? Number(m[0]) : 0;
}

/** sapi：PowerShell System.Speech 离线合成。文本走临时文件（避开 GBK 控制台编码坑）。 */
function speakSapi({ voice, text, out, workDir, rate }) {
  const dir = workDir || dirname(out);
  mkdirSync(dir, { recursive: true });
  const textFile = resolve(dir, ".sapi-text.txt");
  const ps1 = resolve(dir, ".sapi.ps1");
  const sapiRate = Math.max(-10, Math.min(10, Math.round(ratePct(rate) / 10)));
  writeFileSync(textFile, text, "utf8");
  // UTF-8 BOM：PowerShell 5.1 读 .ps1 无 BOM 会按 ANSI 解，中文注释/字符串会烂
  writeFileSync(
    ps1,
    "﻿param([string]$TextFile,[string]$OutFile,[string]$Voice,[int]$Rate)\n" +
      "Add-Type -AssemblyName System.Speech\n" +
      "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer\n" +
      "if ($Voice) { $s.SelectVoice($Voice) }\n" +
      "$s.Rate = $Rate\n" +
      "$t = [System.IO.File]::ReadAllText($TextFile, [System.Text.Encoding]::UTF8)\n" +
      "$s.SetOutputToWaveFile($OutFile)\n" +
      "$s.Speak($t)\n" +
      "$s.Dispose()\n",
    "utf8",
  );
  const res = spawnSync(
    "powershell",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps1,
      "-TextFile", textFile, "-OutFile", out, "-Voice", voice || DEFAULT_VOICE.sapi,
      "-Rate", String(sapiRate)],
    { encoding: "utf8" },
  );
  rmSync(textFile, { force: true });
  rmSync(ps1, { force: true });
  if (res.status !== 0 || !existsSync(out)) {
    throw new Error("sapi 合成失败：" + (res.stderr || res.stdout || out));
  }
}

/** edge：python -m edge_tts 出 mp3（调用方统一转 wav）。 */
function speakEdge({ voice, text, out, python, ffmpeg, rate }) {
  const mp3 = out.replace(/\.wav$/i, "") + ".edge.mp3";
  const args = ["-m", "edge_tts", "--voice", voice || DEFAULT_VOICE.edge];
  if (rate) args.push("--rate", String(rate));
  args.push("--text", text, "--write-media", mp3);
  const res = spawnSync(python, args, { encoding: "utf8" });
  if (res.status !== 0 || !existsSync(mp3)) {
    throw new Error("edge-tts 合成失败：" + (res.stderr || res.stdout || mp3));
  }
  const conv = spawnSync(
    ffmpeg,
    ["-y", "-i", mp3, "-ar", "22050", "-ac", "1", "-c:a", "pcm_s16le", out],
    { encoding: "utf8" },
  );
  rmSync(mp3, { force: true });
  if (conv.status !== 0) throw new Error("mp3→wav 转换失败：" + (conv.stderr || ""));
}

/**
 * 单段合成。provider=off 抛错（不合成，调用方按估读时长走纯字幕）。
 * edge 失败（无网等）→ 自动降级 sapi 并返回 degraded 标记（phase-0 口径）。
 */
export function speakSegment({ provider, voice, text, out, ffmpeg, ffprobe, python, workDir, rate }) {
  if (provider === "off") throw new Error("provider=off 不合成语音");
  const ff = ffmpeg || resolveFfmpeg();
  const fp = ffprobe || resolveFfprobe();
  mkdirSync(dirname(out), { recursive: true });
  if (provider === "edge") {
    const py = python || resolvePython(["edge_tts"]);
    if (!py) {
      speakSapi({ voice: voice || DEFAULT_VOICE.sapi, text, out, workDir, rate });
      return { file: out, durationMs: probeDurationMs(fp, out), degraded: "sapi" };
    }
    /* edge 网络偶发超时（实测）：同段重试 2 次再降级——混声比慢更伤成品 */
    let lastErr = null;
    for (let i = 0; i < 3; i++) {
      try {
        speakEdge({ voice, text, out, python: py, ffmpeg: ff, rate });
        return { file: out, durationMs: probeDurationMs(fp, out), degraded: null };
      } catch (e) {
        lastErr = e;
        if (i < 2) console.warn(`[tts] edge 失败（${String(e.message).split("\n")[0]}），重试 ${i + 1}/2`);
      }
    }
    console.warn("[tts] edge 多次失败（" + String(lastErr && lastErr.message).split("\n")[0] + "），降级 sapi");
    speakSapi({ voice: voice || DEFAULT_VOICE.sapi, text, out, workDir, rate });
    return { file: out, durationMs: probeDurationMs(fp, out), degraded: "sapi" };
  }
  speakSapi({ voice, text, out, workDir, rate });
  return { file: out, durationMs: probeDurationMs(fp, out), degraded: null };
}

/**
 * 整轨拼接：每段（file 或纯静音）按 holdMs 补齐 → concat。
 * 音轨总长 = Σ holdMs = 画面总长（语音驱动节奏，无死区、不串步）。
 * segments: [{ file?, holdMs }]
 */
export function buildNarration({ segments, workDir, out, ffmpeg, ffprobe }) {
  const ff = ffmpeg || resolveFfmpeg();
  const fp = ffprobe || resolveFfprobe();
  mkdirSync(workDir, { recursive: true });
  mkdirSync(dirname(out), { recursive: true });
  const pads = [];
  segments.forEach((seg, i) => {
    const dur = (seg.holdMs / 1000).toFixed(3);
    const padded = resolve(workDir, `pad-${i + 1}.wav`);
    // apad 补静音 + -t 定长：段长精确等于 holdMs（尾帧坑对策：每段独立时长核对）
    const src = seg.file
      ? ["-i", seg.file]
      : ["-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono"];
    const res = spawnSync(
      ff,
      ["-y", ...src, "-af", "apad", "-t", dur, "-ar", "22050", "-ac", "1", "-c:a", "pcm_s16le", padded],
      { encoding: "utf8" },
    );
    if (res.status !== 0) throw new Error("补静音失败：" + (res.stderr || padded));
    pads.push(padded);
  });
  const listFile = resolve(workDir, "concat.txt");
  writeFileSync(listFile, pads.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n"), "utf8");
  const res = spawnSync(
    ff,
    ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c:a", "pcm_s16le", out],
    { encoding: "utf8" },
  );
  if (res.status !== 0) throw new Error("整轨拼接失败：" + (res.stderr || out));
  const totalMs = probeDurationMs(fp, out);
  pads.forEach((p) => rmSync(p, { force: true }));
  rmSync(listFile, { force: true });
  return { file: out, totalMs };
}

// ---------- CLI ----------
if (process.argv[1] && process.argv[1].endsWith("tts.mjs")) {
  const args = process.argv.slice(2);
  const opt = {};
  for (let i = 0; i < args.length; i++) {
    const k = args[i];
    if (k === "--provider") opt.provider = args[++i];
    else if (k === "--voice") opt.voice = args[++i];
    else if (k === "--text") opt.text = args[++i];
    else if (k === "--out") opt.out = args[++i];
    else if (k === "--rate") opt.rate = args[++i];
    else if (k === "--segments") opt.segments = args[++i];
    else if (k === "--work-dir") opt.workDir = args[++i];
  }
  try {
    if (opt.segments) {
      const segments = JSON.parse(readFileSync(opt.segments, "utf8"));
      const r = buildNarration({ segments, workDir: opt.workDir || dirname(opt.out), out: opt.out });
      console.log(`✓ 整轨 ${r.file} 总时长 ${r.totalMs}ms（${segments.length} 段）`);
    } else if (opt.text && opt.out) {
      const r = speakSegment({ provider: opt.provider || "edge", voice: opt.voice, text: opt.text, out: opt.out, rate: opt.rate });
      console.log(`✓ ${r.file} ${r.durationMs}ms${r.degraded ? "（降级 " + r.degraded + "）" : ""}`);
    } else {
      console.log("用法：node tts.mjs --provider edge [--rate \"+25%\"] --text \"…\" --out x.wav | --segments segs.json --out narration.wav");
      process.exit(1);
    }
  } catch (e) {
    console.error("✗ " + e.message);
    process.exit(1);
  }
}
