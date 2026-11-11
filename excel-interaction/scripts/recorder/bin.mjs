#!/usr/bin/env node
// bin.mjs — 外部工具解析（ffmpeg/ffprobe/python），零依赖。
// 坑位对齐（pitfalls.md）：.cmd 垫片不能直接 spawn（CVE-2024-27980，解析真实 exe）；
// GUI 工具只做存在性探测；choco 装的 ffmpeg 在私有目录。
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const CHOCO_FFMPEG =
  "C:/ProgramData/chocolatey/lib/ffmpeg-full/tools/ffmpeg/bin";

/** where/which 候选里挑可 spawn 的真 exe（.exe 优先，跳过 .cmd/.bat 垫片）。 */
function which(name) {
  const probe = process.platform === "win32" ? "where" : "which";
  const res = spawnSync(probe, [name], { encoding: "utf8" });
  if (res.status !== 0) return null;
  const candidates = res.stdout
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const exe = candidates.find((p) => /\.exe$/i.test(p));
  return exe || candidates.find((p) => /\.(cmd|bat)$/i.test(p) === false) || null;
}

export function resolveFfmpeg(override) {
  if (override && existsSync(override)) return override;
  const found = which("ffmpeg");
  if (found) return found;
  const choco = `${CHOCO_FFMPEG}/ffmpeg.exe`;
  if (existsSync(choco)) return choco;
  throw new Error("找不到 ffmpeg（安装或用 --ffmpeg 传绝对路径）");
}

export function resolveFfprobe(override) {
  if (override && existsSync(override)) return override;
  const found = which("ffprobe");
  if (found) return found;
  const choco = `${CHOCO_FFMPEG}/ffprobe.exe`;
  if (existsSync(choco)) return choco;
  throw new Error("找不到 ffprobe（安装或用 --ffprobe 传绝对路径）");
}

/** 解析可用的 python：`python`/`py`，可选校验某模块已装（如 edge_tts）。 */
export function resolvePython(modules = []) {
  for (const cand of ["python", "py"]) {
    const bin = which(cand);
    if (!bin) continue;
    if (modules.length === 0) return bin;
    const res = spawnSync(bin, ["-c", modules.map((m) => `import ${m}`).join(";")], {
      encoding: "utf8",
    });
    if (res.status === 0) return bin;
  }
  return null;
}
