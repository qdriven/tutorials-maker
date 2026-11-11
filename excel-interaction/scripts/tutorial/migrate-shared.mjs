#!/usr/bin/env node
// migrate-shared.mjs — 一次性迁移：43 门 handsontable 课的共享资产收进 apps/_shared/
// （幂等可重跑）：建 _shared → 各课 index.html 引用改写 ../_shared/… → 删逐课拷贝。
// 边界：onlyoffice（oo-test）不迁移（plugin/docs 路径与课 URL 耦合，见 engine-assets.mjs）。
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureShared, sharedize, SHARED_ENGINES } from "./engine-assets.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const APPS = join(ROOT, "apps");

/* 1) 构建/刷新共享目录 */
for (const engine of SHARED_ENGINES) {
  const { dir, vendor } = ensureShared(ROOT, engine);
  console.log(`✓ _shared/${engine}（vendor ${vendor} 件）`);
}

/* 2) 各课：index.html 引用改写 + 删冗余拷贝 */
let migrated = 0, skipped = 0;
for (const id of readdirSync(APPS)) {
  if (id === "_shared") continue;
  const dir = join(APPS, id);
  const cfgPath = join(dir, "course.config.json");
  if (!existsSync(cfgPath)) continue;
  const engine = JSON.parse(readFileSync(cfgPath, "utf8")).engine;
  if (!SHARED_ENGINES.has(engine)) { skipped++; continue; } /* onlyoffice 等保持拷贝 */

  const idx = join(dir, "index.html");
  if (existsSync(idx)) {
    const html = readFileSync(idx, "utf8");
    const out = sharedize(html, engine); /* 幂等：已改写的引用不再匹配 */
    if (out !== html) writeFileSync(idx, out);
  }
  /* 删逐课共享件（index.html/course.config.json 保留） */
  for (const f of ["lesson.js", "theme.css"]) rmSync(join(dir, f), { force: true });
  rmSync(join(dir, engine), { recursive: true, force: true });
  migrated++;
}
console.log(`✓ 迁移 ${migrated} 门（跳过非共享引擎 ${skipped} 门）→ apps/_shared/`);
