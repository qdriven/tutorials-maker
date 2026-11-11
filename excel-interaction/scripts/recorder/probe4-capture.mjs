// probe4-capture.js — 在探针4窗口存活期内探标题 + gdigrab 截帧（record.mjs 同款口径）。
import { spawn, spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const FFMPEG = "C:\\ProgramData\\chocolatey\\lib\\ffmpeg-full\\tools\\ffmpeg\\bin\\ffmpeg.exe";
const LOPY = "C:\\Program Files\\LibreOffice\\program\\python.exe";

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
function probeWindowTitle(like, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  const ps = `[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; ` +
    `Get-Process | Where-Object { $_.MainWindowTitle -like '*${like}*' } | ` +
    `Select-Object -First 1 -ExpandProperty MainWindowTitle`;
  while (Date.now() < deadline) {
    const res = spawnSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", ps], { encoding: "utf8" });
    const title = `${res.stdout || ""}`.trim();
    if (title) return title;
    sleepSync(1000);
  }
  return null;
}

// 1) 起探针（后台，输出到 log）
const logFd = join(HERE, "probe4.log");
const out = spawn(LOPY, [join(HERE, "uno-chart-probe4.py")], {
  stdio: ["ignore", "pipe", "pipe"],
});
let log = "";
out.stdout.on("data", (d) => { log += d; process.stdout.write(d); });
out.stderr.on("data", (d) => { log += d; process.stdout.write(d); });

// 2) 等 READY
const waitReady = setInterval(() => {
  if (log.includes("READY_FOR_CAPTURE")) {
    clearInterval(waitReady);
    doCapture();
  }
}, 500);
setTimeout(() => { if (!log.includes("READY")) { console.log("ERR: 60s 未 READY"); process.exit(1); } }, 60000);

async function doCapture() {
  // 3) 探窗口标题
  const title = probeWindowTitle("Calc", 10000);
  if (!title) { console.log("ERR: 未探到 Calc 窗口"); out.kill(); process.exit(1); }
  console.log(`窗口标题: ${title}`);
  // 4) gdigrab 截帧（截 3 秒取最后帧，图表已渲染）
  const shot = join(HERE, "probe4-shot.png");
  const r = spawnSync(FFMPEG, ["-y", "-f", "gdigrab", "-framerate", "5", "-i", `title=${title}`,
    "-t", "3", "-frames:v", "1", shot], { encoding: "utf8", timeout: 20000 });
  console.log(r.status === 0 ? `✓ 截帧 → ${shot}` : `✗ ffmpeg: ${(r.stderr || "").slice(-300)}`);
  out.kill();
  process.exit(0);
}
