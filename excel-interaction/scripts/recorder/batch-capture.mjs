// batch-capture.mjs — P2 批量抓窗式出片：回归(单表公式) + 跨表 + 其余图表课。
// 用法：node scripts/recorder/batch-capture.mjs [--only id1,id2] [--skip-done]
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const argv = process.argv.slice(2);
let only = null;
for (let i = 0; i < argv.length; i++) if (argv[i] === "--only") only = argv[++i].split(",");

/* 顺序：先回归（单表公式课）→ 跨表新能力 → 其余图表课 */
const QUEUE = [
  "sum-basic",              // 回归：单表公式课抓窗（改造前已通，验证多表加载改动零破坏）
  "portfolio-dashboard",    // 新能力：跨表（多表铺数 + '利润表'!B4 跨表公式真机）
  "chart-column",           // 竖柱（BarDiagram Vertical=False 路径）
  "chart-pie",              // 饼图
  "chart-scatter",          // XY 散点（菜单定型路径）
  "chart-histogram",        // 直方图（竖柱）
  "chart-combo",            // 组合图（降级折线，记边界）
  "chart-stacked",          // 堆积柱形（Stacked=True 路径）
].filter((id) => !only || only.includes(id));

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8", shell: process.platform === "win32" });
  const out = `${r.stdout || ""}${r.stderr || ""}`;
  if (r.status !== 0) {
    console.error(`✗ ${label} 失败：\n${out.slice(-600)}`);
    process.exit(1);
  }
  return out;
}

console.log("═".repeat(60));
console.log(`P2 批量抓窗（${QUEUE.length} 门）`);
console.log("═".repeat(60));

const results = [];
for (const id of QUEUE) {
  const capture = join(ROOT, "out", id, `${id}-capture.mp4`);
  console.log(`\n── ${id} ──`);
  // 1) plan（TTS edge，音轨与渲染式同口径）
  run("node", ["scripts/recorder/build-plan.mjs", "--config", `courses/${id}.json`, "--tts", "edge"], `plan ${id}`);
  console.log("  ✓ plan");
  // 2) 抓窗录屏（真 LibreOffice 窗口 + UNO 重演 + gdigrab）
  const rec = run("node", ["scripts/recorder/record.mjs", "--plan", `out/${id}/plan.json`, "--mode", "capture"], `capture ${id}`);
  const okLine = rec.split(/\r?\n/).find((l) => l.includes("capture]") || l.includes("✓")) || "";
  console.log("  " + okLine.trim());
  const pass = existsSync(capture) && rec.includes("checks 全过");
  results.push({ id, pass, file: existsSync(capture) });
}

console.log("\n" + "═".repeat(60));
const failed = results.filter((r) => !r.pass);
console.log(`抓窗完成：${results.length - failed.length}/${results.length} 通过`);
for (const r of results) console.log(`  ${r.pass ? "✓" : "✗"} ${r.id} → out/${r.id}/${r.id}-capture.mp4`);
console.log("═".repeat(60));
process.exit(failed.length ? 1 : 0);
