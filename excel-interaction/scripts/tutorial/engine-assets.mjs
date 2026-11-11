#!/usr/bin/env node
// engine-assets.mjs — 引擎共享资产（new.mjs 与 sync-shared.mjs 共用）
// 背景（用户需求 2026-11-10）：43 门课的 lesson.js/theme.css/engine/vendor 逐课拷贝完全相同
//   → 抽到 apps/_shared/<engine>/ 一处，课目录只留 index.html + course.config.json。
// 边界：只对 handsontable 走共享（43 门全同实证）；onlyoffice 的 plugin/docs 路径与
//   课 URL 耦合（engine.js base 拼 location.pathname），保持逐课拷贝；univer 仅 smoke 用。
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// 引擎 vendored 依赖清单（从 node_modules 拷入，离线可跑、版本锁定）
export const VENDOR = {
  handsontable: [
    ["handsontable/dist/handsontable.full.min.js", "handsontable.full.min.js"],
    ["handsontable/styles/handsontable.min.css", "handsontable.min.css"],
    ["handsontable/styles/ht-theme-main.min.css", "ht-theme-main.min.css"],
    ["hyperformula/dist/hyperformula.full.min.js", "hyperformula.full.min.js"],
    ["hyperformula/dist/languages/enGB.js", "hyperformula-enGB.js"],
  ],
  /* univer/onlyoffice：依赖已预构建进模板 dist/，不走 node_modules */
  univer: [],
  onlyoffice: [],
};

// 模板自带目录（一并拷入引擎层）
export const TPL_DIRS = {
  univer: ["dist"],
  onlyoffice: ["plugin", "docs"],
};

// 走共享目录的引擎（见文件头边界说明）
export const SHARED_ENGINES = new Set(["handsontable"]);

/** 模板 index.html 引用 → ../_shared/<engine>/ 相对引用（课目录 URL 下两种服务根都通） */
export function sharedize(html, engine) {
  return html
    .replace(/(href|src)="theme\.css"/g, `$1="../_shared/${engine}/theme.css"`)
    .replace(/(href|src)="lesson\.js"/g, `$1="../_shared/${engine}/lesson.js"`)
    .replace(new RegExp(`(href|src)="${engine}/`, "g"), `$1="../_shared/${engine}/`);
}

/** 构建/刷新 apps/_shared/<engine>/（先清后拷，保证与模板+node_modules 同步） */
export function ensureShared(ROOT, engine) {
  const tplDir = join(ROOT, "skill", "excel-tutorial-maker", "templates", engine);
  const sharedDir = join(ROOT, "apps", "_shared", engine);
  if (!existsSync(tplDir)) throw new Error(`无此引擎模板：${engine}`);

  rmSync(sharedDir, { recursive: true, force: true });
  mkdirSync(sharedDir, { recursive: true });

  /* 根层共享件：lesson.js / theme.css（index.html 由各课生成时 sharedize，不进共享） */
  for (const f of ["lesson.js", "theme.css"]) {
    if (existsSync(join(tplDir, f))) cpSync(join(tplDir, f), join(sharedDir, f));
  }
  /* 引擎层文件（非目录）：engine.js / chart-layer.js / formula-assist.js … */
  const ROOT_FILES = new Set(["index.html", "lesson.js", "theme.css", "README.md"]);
  for (const f of readdirSync(tplDir)) {
    if (ROOT_FILES.has(f)) continue;
    const p = join(tplDir, f);
    if (existsSync(p) && !statSync(p).isDirectory()) cpSync(p, join(sharedDir, f));
  }
  /* vendored 依赖（node_modules → vendor/） */
  const nm = join(ROOT, "node_modules");
  mkdirSync(join(sharedDir, "vendor"), { recursive: true });
  let n = 0;
  for (const [src, dest] of VENDOR[engine] ?? []) {
    const from = join(nm, ...src.split("/"));
    if (!existsSync(from)) throw new Error(`vendored 依赖缺失：${src}（先 pnpm install）`);
    cpSync(from, join(sharedDir, "vendor", dest));
    n++;
  }
  return { dir: sharedDir, vendor: n };
}
