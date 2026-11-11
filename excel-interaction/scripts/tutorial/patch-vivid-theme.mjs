// patch-vivid-theme.mjs — 把 flashcard 的 vivid-dsh teal 色板落为第三套 theme
// 范围：三引擎 theme.css + check-manifest 枚举 + templates/README token 表
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const TPL = join(ROOT, "skill", "excel-tutorial-maker", "templates");

const VIVID_BLOCK = `
/* vivid · flashcard teal 纸面系（第三套主题，2026-11-10）
 * token 提取自 examples/flashcard 的 vivid-dsh 色板（--paper/--ink/--teal 词汇）：
 * 青纸面 + 深青墨字 + 主青强调；高亮填充位（表头带/步码）用 teal-light；
 * 圆角中档 6/4；附 vivid 扩展 token（新拟态柔影/红点，作用域自用不入共享契约）。 */
#lesson[data-theme="vivid"], html:has(#lesson[data-theme="vivid"]) {
  --bg: #e9f1f2;            /* 纸面 paper */
  --panel: #f4fafb;         /* 卡面（纸面提亮） */
  --sheet: #f7fcfc;         /* 表格纸面 surface-inset */
  --band: #dcebec;          /* 行列头带 surface-progress */
  --fg: #014e60;            /* 深青墨 ink */
  --soft: #436e7d;          /* muted ink-3 */
  --line: #d6e7e9;
  --accent: #019b98;        /* 主青 teal：选区/链接/当前步 */
  --accent-strong: #017a78; /* teal-deep */
  --accent-soft: #d5f7f5;   /* teal-soft */
  --gold: #55ccc9;          /* 高亮填充位 = teal-light（表头带/步码/总结框） */
  --gold-soft: #eefbfa;     /* teal-wash */
  --code-bg: #014e60; --code-fg: #e9f1f2;
  --formula-bg: #d5f7f5; --formula-fg: #017a78;
  --edit-bg: #ffffff;
  --radius: 6px;
  --radius-control: 4px;
  /* vivid 扩展（作用域自用）：新拟态柔影 / 红点强调 */
  --shadow-soft: 9px 10px 22px rgb(1 78 96 / 0.055), -7px -7px 18px rgb(255 255 255 / 0.86);
  --hot: #dd0025;
}
`;

const OLD_HEAD = "/* theme.css — 两套主题 token（templates/README.md 的 token 表），禁第三套 */";
const NEW_HEAD = "/* theme.css — 三套主题 token（templates/README.md 的 token 表），不得发明第四套 */";

/* 1) 三引擎 theme.css：头注释 + vivid 块（green 块 8/6 radius 之后插入） */
for (const engine of ["handsontable", "onlyoffice", "univer"]) {
  const p = join(TPL, engine, "theme.css");
  let s = readFileSync(p, "utf8");
  if (s.includes('data-theme="vivid"')) { console.log(`  跳过 ${engine}（已有 vivid）`); continue; }
  if (!s.includes(OLD_HEAD)) { console.error(`✗ ${engine} 头注释未命中`); process.exit(1); }
  s = s.replace(OLD_HEAD, NEW_HEAD);
  const anchor = "  --radius: 8px;\n  --radius-control: 6px;\n}";
  if (!s.includes(anchor)) { console.error(`✗ ${engine} green 块尾未命中`); process.exit(1); }
  s = s.replace(anchor, anchor + "\n" + VIVID_BLOCK);
  writeFileSync(p, s);
  console.log(`✓ ${engine}/theme.css + vivid`);
}

/* 2) check-manifest theme 枚举 */
const cm = join(ROOT, "scripts", "tutorial", "check-manifest.mjs");
let c = readFileSync(cm, "utf8");
const oldEnum = 'const THEMES = new Set(["kimi", "green"]);';
if (!c.includes(oldEnum)) { console.error("✗ 枚举未命中"); process.exit(1); }
c = c.replace(oldEnum, 'const THEMES = new Set(["kimi", "green", "vivid"]);');
writeFileSync(cm, c);
console.log("✓ check-manifest THEMES + vivid");

/* 3) templates/README.md：token 表加列 + 两套→三套 */
const rm = join(ROOT, "skill", "excel-tutorial-maker", "templates", "README.md");
let r = readFileSync(rm, "utf8");
const oldTableHead = "| 变量 | 含义 | `kimi` | `green` |\n| --- | --- | --- | --- |";
const newTableHead = "| 变量 | 含义 | `kimi` | `green` | `vivid` |\n| --- | --- | --- | --- | --- |";
if (!r.includes(oldTableHead)) { console.error("✗ token 表头未命中"); process.exit(1); }
r = r.replace(oldTableHead, newTableHead);

/* 表体逐行加 vivid 列（行内容以行首变量名匹配，防错位） */
const rows = [
  ["| `--bg` / `--panel` / `--sheet` / `--band` |", " teal 纸面 #e9f1f2 / #f4fafb / #f7fcfc / #dcebec"],
  ["| `--fg` / `--soft` / `--line` |", " 深青墨 #014e60 / #436e7d / #d6e7e9"],
  ["| `--accent`（+strong/soft） |", " 主青 #019b98（teal）"],
  ["| `--gold`（+soft） |", " teal-light #55ccc9（高亮填充位）"],
  ["| `--code-bg·fg` / `--formula-bg·fg` / `--edit-bg` |", " 青墨底纸字 / teal-soft / 白"],
  ["| `--radius` / `--radius-control` |", " 6px / 4px（中圆角）"],
];
for (const [prefix, vividVal] of rows) {
  const line = r.split("\n").find((l) => l.startsWith(prefix));
  if (!line) { console.error("✗ 表行未命中: " + prefix); process.exit(1); }
  r = r.replace(line, line + " |" + vividVal + " |");
}
/* 字体行同左 */
const fontLine = r.split("\n").find((l) => l.startsWith("| `--font-ui` / `--font-mono` |"));
if (fontLine) r = r.replace(fontLine, fontLine + " 同左 |");

r = r.replace(
  "主题名来自契约 `theme` 字段；模板按上表出两套值，不得发明第三套。",
  "主题名来自契约 `theme` 字段；模板按上表出三套值，不得发明第四套（新主题须同时更新本表与 check-manifest 枚举）。"
);
r = r.replace(
  "- **kimi = 格数同款**：",
  "- **vivid = flashcard 同款**：teal 纸面 + 深青墨 + 主青强调，提取自 `examples/flashcard` 的 vivid-dsh 色板；高亮填充位用 teal-light，附新拟态柔影扩展 token。\n- **kimi = 格数同款**："
);
writeFileSync(rm, r);
console.log("✓ README token 表 + vivid 列");
console.log("═ done");
