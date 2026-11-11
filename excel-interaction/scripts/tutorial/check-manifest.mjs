#!/usr/bin/env node
// check-manifest.mjs — 课程契约清单校验（courses/*.json）。零依赖。
// 校验规则：JSON 可解析 / id 与文件名一致 / 4 步指南四要素非空 / checks 非空 /
//   seed 存在 / engine·theme 枚举合法 / 公式单源一致（guide ↔ checks）/
//   formulaArgs 参数逐位说明（part 必须出现在公式原文中）。
// 用法：node scripts/tutorial/check-manifest.mjs   （全绿 exit 0，任一 FAIL exit 1）
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const COURSES = join(ROOT, "courses");
const ENGINES = new Set(["handsontable", "univer", "onlyoffice"]);
const THEMES = new Set(["kimi", "green", "vivid"]);
const FOUR = ["cell", "menu", "formula", "expect"];

const files = readdirSync(COURSES).filter((f) => f.endsWith(".json")).sort();
if (files.length === 0) {
  console.log("（courses/ 无契约，清单为空）");
  process.exit(0);
}

let failed = 0;
for (const file of files) {
  const problems = [];
  let c = null;
  try {
    c = JSON.parse(readFileSync(join(COURSES, file), "utf8"));
  } catch (e) {
    problems.push("JSON 解析失败：" + e.message);
  }
  if (c) {
    if (c.id + ".json" !== file) problems.push(`id 与文件名不一致（id=${c.id}）`);
    for (const k of ["id", "title", "level", "theme", "engine", "seed", "data", "guide", "checks"]) {
      if (c[k] == null) problems.push(`缺字段 ${k}`);
    }
    if (c.engine && !ENGINES.has(c.engine)) problems.push(`engine 非法：${c.engine}`);
    if (c.theme && !THEMES.has(c.theme)) problems.push(`theme 非法：${c.theme}`);
    if (c.seed && !existsSync(join(COURSES, c.seed))) problems.push(`seed 不存在：${c.seed}`);
    if (Array.isArray(c.guide)) {
      /* N 步契约：每公式 4 步一块（选中→输入→确认→复核），guide 长度须为 4 的倍数 ≥4 */
      if (c.guide.length < 4 || c.guide.length % 4 !== 0) problems.push(`guide 应为 4 的倍数（每公式 4 步一块），实为 ${c.guide.length}`);
      c.guide.forEach((g, i) => {
        for (const k of FOUR) {
          if (!g[k]) problems.push(`guide[${i}] 缺 ${k}`);
        }
      });
      // 公式单源：checks.formula 必须出现在 guide 公式中（复合课逐块对应，全量校验）
      const guideFormulas = new Set(c.guide.map((g) => g.formula).filter((f) => String(f).startsWith("=")));
      for (const ck of c.checks ?? []) {
        if (!guideFormulas.has(ck.formula)) problems.push(`checks 公式不在 guide 中：${ck.formula}`);
        if (ck.value == null) problems.push("checks 缺 value");
      }
      // 复合课：checks 数应 ≤ 块数（每块至多一个验收锚点）
      if (Array.isArray(c.checks) && c.checks.length > c.guide.length / 4) {
        problems.push(`checks 数（${c.checks.length}）超过公式块数（${c.guide.length / 4}）`);
      }
    } else if (c.guide != null) {
      problems.push("guide 非数组");
    }
    if (Array.isArray(c.checks) && c.checks.length === 0) problems.push("checks 为空");
    // formulaArgs 参数逐位说明：每项 part/meaning 齐全，part 出现在某条真实公式中
    if (c.formulaArgs != null) {
      if (!Array.isArray(c.formulaArgs) || c.formulaArgs.length === 0) {
        problems.push("formulaArgs 非数组或为空");
      } else {
        // 图表课边界：非公式步骤（action=chart）的 formula 也计入候选源——
        // 图表课无公式原文，参数说明挂在其映射描述（如「月份(横轴)→销售额(纵轴)」）上
        const formulas = (Array.isArray(c.guide) ? c.guide : [])
          .map((g) => String(g.formula ?? ""))
          .filter((f) => f.startsWith("=") || (c.chart != null && f.length > 0));
        c.formulaArgs.forEach((a, i) => {
          if (!a || !a.part || !a.meaning) problems.push(`formulaArgs[${i}] 缺 part/meaning`);
          else if (!formulas.some((f) => f.includes(a.part)))
            problems.push(`formulaArgs[${i}].part 不在公式原文中：${a.part}`);
        });
      }
    }
  }
  const ok = problems.length === 0;
  if (!ok) failed++;
  console.log(`${ok ? "✓" : "✗"} ${file}${ok ? "" : "\n    - " + problems.join("\n    - ")}`);
}
console.log(`----\n${files.length} 份契约，${files.length - failed} 通过 / ${failed} 失败`);
process.exit(failed ? 1 : 0);
