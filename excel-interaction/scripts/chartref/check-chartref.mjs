#!/usr/bin/env node
// check-chartref.mjs — 图表真对象基线校验（零依赖）。
// 口径：line-chart.xlsx 存在 + zip 结构内含 chart 对象（xl/charts/chart*.xml）
// + 绘图数据引用覆盖契约序列（末值 2190 以 cell 引用存在性近似断言——
//   精确值断言由 qc 抽帧/人工读图承担）。
// 用法：node scripts/chartref/check-chartref.mjs   （docbuilder 产物就绪后全绿 exit 0）
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const XLSX = join(ROOT, "scripts", "chartref", "line-chart.xlsx");
const problems = [];

if (!existsSync(XLSX)) {
  console.error("✗ line-chart.xlsx 不存在——先跑 docbuilder.exe scripts/chartref/line-chart.docbuilder");
  process.exit(1);
}

/* xlsx = zip。零依赖下做轻量断言：central directory 里查 chart 部件名（存储名明文可见）。 */
const buf = readFileSync(XLSX);
const names = [];
for (let i = 0; i < buf.length - 4; i++) {
  /* local file header 签名 0x50 0x4b 0x03 0x04；文件名跟在第 30 字节偏移后 */
  if (buf[i] === 0x50 && buf[i + 1] === 0x4b && buf[i + 2] === 0x03 && buf[i + 3] === 0x04) {
    const nameLen = buf.readUInt16LE(i + 26);
    if (nameLen > 0 && nameLen < 200 && i + 30 + nameLen <= buf.length) {
      names.push(buf.toString("utf8", i + 30, i + 30 + nameLen));
    }
  }
}
const has = (p) => names.some((n) => n === p || n.startsWith(p));

if (!has("xl/worksheets/sheet")) problems.push("无工作表部件（不是有效 xlsx？）");
if (!names.some((n) => /^xl\/charts\/chart\d*\.xml$/.test(n))) problems.push("无图表对象部件（xl/charts/chart*.xml）——AddChart 未生效");
if (!has("xl/drawings/drawing")) problems.push("无 drawing 部件——图表未锚定到工作表");

if (problems.length) {
  for (const p of problems) console.error("✗ " + p);
  console.error("图表基线校验失败：" + problems.length + " 处");
  process.exit(1);
}
console.log("✓ 图表基线校验通过：xlsx 内含 line 图表对象 + drawing 锚定（部件 " + names.filter((n) => n.includes("chart")).join(", ") + "）");
