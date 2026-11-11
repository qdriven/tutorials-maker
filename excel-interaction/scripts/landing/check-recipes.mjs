#!/usr/bin/env node
// check-recipes.mjs — landing 目录新鲜度校验（零依赖）。
// 口径：重建一次聚合产物，与磁盘上的 recipes.json 逐字节比对——
//   不一致 = 有人改了 courses/*.json 但没重跑聚合（landing 页会静默过期）→ FAIL。
// 同时校验：live 条目的 app 路径真实存在；todo 占位卡不与任何契约 id 冲突。
// 用法：node scripts/landing/check-recipes.mjs   （全绿 exit 0）
import { readFileSync, writeFileSync, rmSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { rebuild } from "./recipes-lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "src", "data", "recipes.json");
const problems = [];

/* 1) 新鲜度：重建 → 与磁盘比对（重建临时写盘后读回，再还原原文件） */
if (!existsSync(OUT)) {
  problems.push("recipes.json 不存在——跑 pnpm recipes 生成");
} else {
  const onDisk = readFileSync(OUT, "utf8");
  writeFileSync(OUT, "\u0000PENDING\u0000"); // 占位，rebuild 会整体覆写
  const r = rebuild(ROOT);
  const fresh = readFileSync(OUT, "utf8");
  if (fresh === "\u0000PENDING\u0000") problems.push("rebuild 未写出文件（异常）");
  else if (fresh !== onDisk) {
    problems.push("recipes.json 已过期（courses/ 有变更未重跑聚合）——跑 pnpm recipes");
    writeFileSync(OUT, onDisk); // 还原磁盘原样：校验不产生副作用
  }
}

/* 2) 结构与引用：live 的 app 路径存在；todo 不与契约 id 冲突 */
if (existsSync(OUT)) {
  const d = JSON.parse(readFileSync(OUT, "utf8"));
  const contractIds = new Set(
    readdirSafe(join(ROOT, "courses")).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(ROOT, "courses", f), "utf8")).id)
  );
  let todo = 0;
  let live = 0;
  for (const cat of d.categories ?? []) {
    for (const r of cat.recipes ?? []) {
      if (r.status === "live") {
        live++;
        const full = resolve(ROOT, String(r.app ?? "").replace(/^\/+/, ""));
        if (!r.app || !existsSync(full) || !statSync(full).isFile()) problems.push(`live 卡 ${r.id}: app 文件不存在 ${r.app}`);
        if (r.mp4) {
          const m = resolve(ROOT, r.mp4.replace(/^\/+/, ""));
          if (!existsSync(m) || !statSync(m).isFile()) problems.push(`live 卡 ${r.id}: mp4 不存在 ${r.mp4}`);
        }
      } else if (r.status === "todo" || r.status === "blocked") {
        todo++;
        if (r.status === "blocked" && !r.note) problems.push(`blocked 卡 ${r.id} 缺 note（引擎边界说明）`);
        if (contractIds.has(r.id)) problems.push(`${r.status} 占位卡 ${r.id} 与已有契约 id 冲突——应转正为 live`);
      } else {
        problems.push(`未知 status：${r.status}（${r.id}）`);
      }
    }
  }
  const s = d.stats ?? {};
  if (s.live !== live || s.todo !== todo) problems.push(`stats 计数不符（live ${s.live}/${live} · todo ${s.todo}/${todo}）`);

  /* 合集（E 类）：成员课必须全部在架（live），无悬空引用 */
  const liveIds = new Set();
  for (const cat of d.categories ?? []) {
    for (const r of cat.recipes ?? []) if (r.status === "live") liveIds.add(r.id);
  }
  for (const col of d.collections ?? []) {
    if (!col.lessons || !col.lessons.length) problems.push(`合集 ${col.id}: 成员为空`);
    for (const id of col.lessons ?? []) {
      if (!liveIds.has(id)) problems.push(`合集 ${col.id}: 成员 ${id} 不在架`);
    }
  }
}

function readdirSafe(p) {
  try { return require("node:fs").readdirSync(p); } catch { return []; }
}

if (problems.length) {
  for (const p of problems) console.error("✗ " + p);
  console.error(`recipes 校验失败：${problems.length} 处`);
  process.exit(1);
}
console.log("✓ recipes 校验通过：新鲜度 · live 引用 · todo 无冲突 · 计数一致");
