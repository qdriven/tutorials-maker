#!/usr/bin/env node
// record.mjs — 真机/浏览器录屏式出片（modes.md 的 record 档），零依赖。
// 浏览器录屏式（hot 引擎，--mode browser）：Playwright 实时重演录像 → 去片头 → 挂 TTS → mp4。
// 抓窗式（--mode capture，LibreOffice）：UNO 逐步真算重演 + 窗口实录（gdigrab）——
//   需解锁会话；自动化一律渲染式（pitfalls #6），本档为"真软件质感"手动档。
// 用法：node scripts/recorder/record.mjs --plan out/<id>/plan.json --mode browser|capture
//        [--out out/<id>/<id>-<mode>.mp4] [--port 4322] [--seconds N]
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveFfmpeg, resolveFfprobe, resolvePython } from "./bin.mjs";
import { resolveSoffice, resolveLibreOfficePython } from "./lo-paths.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

function parseArgs(argv) {
  const opt = { mode: "browser", port: 4322 };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--plan") opt.plan = argv[++i];
    else if (k === "--mode") opt.mode = argv[++i];
    else if (k === "--out") opt.out = argv[++i];
    else if (k === "--port") opt.port = Number(argv[++i]);
    else if (k === "--seconds") opt.seconds = Number(argv[++i]);
    else if (k === "--mouse") opt.mouse = true; /* 鼠标编排（遗留 #2）：轨迹/点击节奏入画 */
  }
  return opt;
}

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function run(cmd, args, label) {
  const res = spawnSync(cmd, args, { encoding: "utf8" });
  if (res.status !== 0) throw new Error(label + " 失败：" + (res.stderr || res.stdout || "").slice(-400));
  return res.stdout;
}

function ffprobeDuration(ffprobe, file) {
  const res = spawnSync(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
    { encoding: "utf8" });
  return Math.round(parseFloat(res.stdout.trim()) * 1000);
}

function ffprobeKinds(ffprobe, file) {
  const res = spawnSync(ffprobe, ["-v", "error", "-show_entries", "stream=codec_type,codec_name", "-of", "json", file],
    { encoding: "utf8" });
  return JSON.parse(res.stdout).streams.map((s) => `${s.codec_type}/${s.codec_name}`).join(" + ");
}

function startServer(port, probePath) {
  const child = spawn(process.execPath, [join(ROOT, "scripts", "serve", "serve.mjs"),
    "--dir", "apps", "--port", String(port)], { stdio: "ignore" });
  const nullDev = process.platform === "win32" ? "NUL" : "/dev/null";
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const probe = spawnSync("curl", ["-s", "-o", nullDev, "-w", "%{http_code}",
      `http://localhost:${port}${probePath}`], { encoding: "utf8" });
    if (probe.stdout && probe.stdout.trim() === "200") return child;
    sleepSync(1000);
  }
  child.kill();
  throw new Error("静态服务 20s 未就绪");
}

function stopServer(child) {
  if (!child || !child.pid) return;
  if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { encoding: "utf8" });
  else child.kill();
}

/** 探 LibreOffice 窗口标题（抓窗式 gdigrab 用；窗口出现后才有标题）。
 * PowerShell 输出强制 UTF-8——GBK 控制台会把中文标题打成乱码（gdigrab 找不到窗）。 */
function probeWindowTitle(like, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  const ps = `[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; ` +
    `Get-Process | Where-Object { $_.MainWindowTitle -like '*${like}*' } | ` +
    `Select-Object -First 1 -ExpandProperty MainWindowTitle`;
  while (Date.now() < deadline) {
    const res = spawnSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", ps],
      { encoding: "utf8" });
    const title = `${res.stdout || ""}`.trim();
    if (title) return title;
    sleepSync(1000);
  }
  return null;
}

function mux(ffmpeg, ffprobe, videoIn, audioIn, out, leadMs, totalMs, label) {
  const args = ["-y"];
  if (leadMs > 0) args.push("-ss", (leadMs / 1000).toFixed(3));
  args.push("-i", videoIn);
  if (audioIn && existsSync(audioIn)) args.push("-i", audioIn);
  args.push("-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p");
  if (audioIn && existsSync(audioIn)) args.push("-c:a", "aac", "-b:a", "128k", "-shortest");
  else args.push("-an");
  args.push(out);
  run(ffmpeg, args, label);
  const dur = ffprobeDuration(ffprobe, out);
  const drift = Math.abs(dur - totalMs) / totalMs;
  console.log(`✓ ${out}`);
  console.log(`  流 ${ffprobeKinds(ffprobe, out)}｜时长 ${dur}ms vs ΣholdMs ${totalMs}ms（偏差 ${(drift * 100).toFixed(1)}%${drift < 0.05 ? "，<5% ✓" : "，超 5%（实时录屏节奏漂移，见 output 口径）"}）`);
}

async function main() {
  const opt = parseArgs(process.argv.slice(2));
  if (!opt.plan) {
    console.log("用法：node scripts/recorder/record.mjs --plan out/<id>/plan.json --mode browser|capture");
    process.exit(1);
  }
  const plan = JSON.parse(readFileSync(opt.plan, "utf8"));
  const ffmpeg = resolveFfmpeg();
  const ffprobe = resolveFfprobe();
  const outDir = resolve(join(ROOT, "out", plan.id));
  const totalMs = (plan.segments || plan.steps).reduce((a, s) => a + s.holdMs, 0);
  const out = opt.out ? resolve(opt.out) : join(outDir, `${plan.id}-${opt.mode}.mp4`);
  mkdirSync(outDir, { recursive: true });

  if (opt.mode === "browser") {
    // 浏览器录屏式：Playwright 实时录像（片头=载入+复位，用 leadMs 裁掉）
    const python = resolvePython();
    if (!python) throw new Error("找不到 python（hot-driver 运行时）");
    const videoDir = join(outDir, "video-browser");
    rmSync(videoDir, { recursive: true, force: true });
    let server = null;
    try {
      server = startServer(opt.port, `/${plan.id}/index.html`);
      const drv = spawnSync(python, [join(HERE, "hot-driver.py"), "--url",
        `http://localhost:${opt.port}/${plan.id}/index.html`, "--plan", opt.plan,
        "--video", videoDir, "--realtime", ...(opt.mouse ? ["--mouse"] : [])], { encoding: "utf8" });
      if (drv.status !== 0) throw new Error("hot-driver 录像失败：" + (drv.stderr || drv.stdout || "").slice(-400));
      const rec = JSON.parse(drv.stdout.trim().split(/\r?\n/).pop());
      if (!rec.video || !existsSync(rec.video)) throw new Error("未拿到录像文件");
      mux(ffmpeg, ffprobe, rec.video, plan.narrationTrack, out, rec.leadMs || 0, totalMs, "浏览器录屏式合成");
    } finally {
      stopServer(server);
    }
    return;
  }

  if (opt.mode === "capture") {
    // 抓窗式：LibreOffice 真窗口 + UNO 逐步真算重演（--pace）+ gdigrab 窗口实录
    const soffice = resolveSoffice();
    const loPy = resolveLibreOfficePython();
    if (!soffice || !loPy) throw new Error("抓窗式需要 LibreOffice（soffice + 自带 python）");
    const raw = join(outDir, "capture-raw.mp4");
    const seconds = opt.seconds || Math.ceil(totalMs / 1000) + 12; // +12s 覆盖桥起动/铺数据前摇
    const drv = spawn(loPy, [join(HERE, "uno-driver.py"), "--plan", opt.plan,
      "--pace", "--hold-open-ms", "2000", ...(opt.mouse ? ["--mouse"] : [])], { stdio: ["ignore", "pipe", "inherit"] });
    let drvJson = "";
    drv.stdout.on("data", (d) => (drvJson += d));
    // exit 监听必须先于阻塞的 gdigrab 挂上——驱动可能先结束，晚挂会漏事件（mux 不执行）
    const done = new Promise((r) => drv.on("exit", r));
    const title = probeWindowTitle("LibreOffice Calc"); // 不要只匹配 "LibreOffice"——会抓到启动中心窗
    if (!title) {
      drv.kill();
      throw new Error("未探到 LibreOffice 窗口（需解锁会话）");
    }
    console.log(`[capture] 窗口标题：${title}`);
    // gdigrab 只录该窗口（不录整屏，避免无关内容入片）；-draw_mouse 显式入画（鼠标编排 #2）
    const tGrab = Date.now(); // 起录时刻：与 uno-driver paceStartMs 同一墙钟，换算 leadMs
    run(ffmpeg, ["-y", "-f", "gdigrab", "-framerate", "10", "-draw_mouse", "1", "-i", `title=${title}`,
      "-t", String(seconds), "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", raw],
      "gdigrab 窗口实录");
    await done;
    const check = JSON.parse(drvJson.trim().split(/\r?\n/).pop() || "{}");
    console.log(`[capture] UNO 重演 ${check.ok ? "✓ checks 全过" : "✗ checks 未过：" + drvJson.slice(-200)}`);
    // leadMs = 起录→开步前摇（桥起动+铺数据 ~3-8s）；裁掉后音画从第 1 拍对齐（否则口播错位+尾段被裁）
    const leadMs = check.paceStartMs ? Math.max(0, check.paceStartMs - tGrab - 200) : 0;
    if (leadMs > 500) console.log(`[capture] 前摇 ${leadMs}ms，合成时裁片头对齐`);
    mux(ffmpeg, ffprobe, raw, plan.narrationTrack, out, leadMs, totalMs, "抓窗式合成");
    rmSync(raw, { force: true });
    return;
  }

  console.log("mode 只支持 browser | capture");
  process.exit(1);
}

main().catch((e) => {
  console.error("✗ " + e.message);
  process.exit(1);
});
