#!/usr/bin/env node
// sync-shared.mjs — 构建/刷新共享资产目录 apps/_shared/<engine>/
// 用法：node scripts/tutorial/sync-shared.mjs [--engine handsontable]
// 共享化背景见 engine-assets.mjs 文件头；改模板共享源后跑本脚本一键同步
//   （替代过去"cp 模板 → 44 个 apps/<id>/"的批量拷贝）。
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureShared, SHARED_ENGINES } from "./engine-assets.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const args = process.argv.slice(2);
let engines = [...SHARED_ENGINES];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--engine") engines = [args[++i]];
}

for (const engine of engines) {
  const { dir, vendor } = ensureShared(ROOT, engine);
  console.log(`✓ ${dir.replace(ROOT, ".")}（vendor ${vendor} 件）`);
}
console.log("提示：改模板共享源后重跑本脚本即可同步全部课（课目录只引用、不拷贝）");
