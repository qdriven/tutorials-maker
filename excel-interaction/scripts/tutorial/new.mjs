#!/usr/bin/env node
// new.mjs — 教程生成器：courses/<id>.json + skill/excel-tutorial-maker/templates/<engine>/
//   → apps/<id>/（生成物，不手改）。零依赖。
// 用法：node scripts/tutorial/new.mjs --id <id> --config courses/<id>.json [--force]
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { upsertItem } from "../showcase/registry.mjs";
import { ensureShared, sharedize, SHARED_ENGINES } from "./engine-assets.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const TEMPLATES = join(ROOT, "skill", "excel-tutorial-maker", "templates");

// 引擎 vendored 依赖清单（生成时从 node_modules 拷入，离线可跑、版本锁定）
const VENDOR = {
  handsontable: [
    ["handsontable/dist/handsontable.full.min.js", "handsontable.full.min.js"],
    ["handsontable/styles/handsontable.min.css", "handsontable.min.css"],
    ["handsontable/styles/ht-theme-main.min.css", "ht-theme-main.min.css"],
    ["hyperformula/dist/hyperformula.full.min.js", "hyperformula.full.min.js"],
    ["hyperformula/dist/languages/enGB.js", "hyperformula-enGB.js"],
  ],
  /* univer/onlyoffice：依赖已预构建进模板 dist/（univer-kit，构建源 out/univer-build），
   * 不走 node_modules——仓库 pnpm-lock 永不为出片引擎引入依赖 */
  univer: [],
  onlyoffice: [],
};

// 模板自带目录（一并拷入引擎层）：univer 的 dist/ 预构建产物、onlyoffice 的插件/空文档
const TPL_DIRS = {
  univer: ["dist"],
  onlyoffice: ["plugin", "docs"],
};

function usage(code) {
  console.log(`教程生成器 —— 契约 + 模板 → apps/<id>/

用法：
  node scripts/tutorial/new.mjs --id <id> --config courses/<id>.json [--force]

  --id <id>        课程 id（= apps/<id>/ 目录名，须与契约 id 一致）
  --config <path>  契约 json 路径
  --force          覆盖已存在的 apps/<id>/
  --help           本说明`);
  process.exit(code);
}

const args = process.argv.slice(2);
const opt = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--help") usage(0);
  else if (args[i] === "--force") opt.force = true;
  else if (args[i].startsWith("--")) opt[args[i].slice(2)] = args[++i];
  else usage(2);
}
if (!opt.id || !opt.config) usage(2);

const configPath = resolve(ROOT, opt.config);
if (!existsSync(configPath)) {
  console.error(`✗ 契约不存在：${opt.config}`);
  process.exit(1);
}
const contract = JSON.parse(readFileSync(configPath, "utf8"));
if (contract.id !== opt.id) {
  console.error(`✗ id 不一致：--id ${opt.id} ≠ 契约 id ${contract.id}`);
  process.exit(1);
}
const engine = contract.engine;
const tplDir = join(TEMPLATES, engine);
if (!existsSync(tplDir)) {
  console.error(`✗ 无此引擎模板：${engine}（可用：${readdirSync(TEMPLATES).filter((d) => !d.includes(".")).join(", ")}）`);
  process.exit(1);
}

const outDir = join(ROOT, "apps", opt.id);
if (existsSync(outDir)) {
  if (!opt.force) {
    console.error(`✗ apps/${opt.id}/ 已存在（--force 覆盖）`);
    process.exit(1);
  }
  rmSync(outDir, { recursive: true });
}

// 根层三件（模板契约的生成后目录形态）
// 共享化（2026-11-10）：handsontable 等共享引擎不逐课拷贝——lesson.js/theme.css/engine/vendor
//   全部引用 apps/_shared/<engine>/（43 门实测完全相同），课目录只留 index.html + course.config.json；
//   index.html 引用改写为 ../_shared/<engine>/…（两种服务根下相对路径都通）。
//   onlyoffice/univer 保持逐课拷贝（plugin/docs 路径与课 URL 耦合，见 engine-assets.mjs 头注）。
mkdirSync(outDir, { recursive: true });
const useShared = SHARED_ENGINES.has(engine);
if (useShared) {
  ensureShared(ROOT, engine); /* _shared 缺失/过期自动重建（幂等） */
  writeFileSync(join(outDir, "index.html"), sharedize(readFileSync(join(tplDir, "index.html"), "utf8"), engine));
} else {
  for (const f of ["index.html", "lesson.js", "theme.css"]) {
    cpSync(join(tplDir, f), join(outDir, f));
  }
}
// 引擎层：engine.js / formula-assist.js 等模板辅助（README 与根层三件除外）+ vendor/
// （共享引擎的引擎层已在 _shared，课目录不建）
const engineDir = join(outDir, engine);
if (!useShared) mkdirSync(join(engineDir, "vendor"), { recursive: true });
const ROOT_FILES = new Set(["index.html", "lesson.js", "theme.css", "README.md"]);
if (!useShared) {
  for (const f of readdirSync(tplDir)) {
    if (ROOT_FILES.has(f)) continue;
    if (existsSync(join(tplDir, f)) && !statSync(join(tplDir, f)).isDirectory()) {
      cpSync(join(tplDir, f), join(engineDir, f));
    }
  }
}
const nm = join(ROOT, "node_modules");
let vendorOk = 0;
if (!useShared) {
  for (const [src, dest] of VENDOR[engine] ?? []) {
    const from = join(nm, ...src.split("/"));
    if (!existsSync(from)) {
      console.error(`✗ vendored 依赖缺失：${src}（先 pnpm install）`);
      process.exit(1);
    }
    cpSync(from, join(engineDir, "vendor", dest));
    vendorOk++;
  }
  // 模板预构建目录（univer 的 dist/ 等）：目录不走上面的逐文件拷贝
  for (const d of TPL_DIRS[engine] ?? []) {
    const from = join(tplDir, d);
    if (existsSync(from)) {
      cpSync(from, join(engineDir, d), { recursive: true });
      vendorOk++;
    }
  }
} else {
  vendorOk = -1; /* 共享：vendor 在 _shared（日志标注 shared） */
}
// 契约副本（生成物只读）
writeFileSync(join(outDir, "course.config.json"), JSON.stringify(contract, null, 2) + "\n");

// 展示层登记（build-checklist 阶段 7）：app 条目 upsert 进 src/data/tutorials.json
// （iframe src 显式 index.html——目录 URL 会 404）
upsertItem(ROOT, {
  id: contract.id,
  type: "app",
  title: contract.title,
  description: (contract.summary && contract.summary.oneLiner) || "交互动画课（契约单源生成）",
  path: `/apps/${contract.id}/index.html`,
});

console.log(`✓ apps/${opt.id}/ 已生成（引擎 ${engine} · 主题 ${contract.theme} · vendor ${vendorOk} 件）`);
console.log(`  查看：node scripts/serve/serve.mjs --dir apps --port 4173 → http://localhost:4173/${opt.id}/index.html`);

/* landing 目录自动上架（新课即时进 home 页目录，流水线零手工登记）
 * 注意：动态 import 相对 new.mjs 所在目录解析——scripts/tutorial/ → ../landing/ */
import("../landing/recipes-lib.mjs")
  .then((m) => m.rebuild(ROOT))
  .catch(() => {}); /* 聚合失败不阻塞生成 */
