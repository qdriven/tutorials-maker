#!/usr/bin/env node
// func-batch.mjs — 函数课批量流水线（批量三）：10 门单函数课 转写→生成→出片→上架。
// 用法：node scripts/batch/func-batch.mjs [--only id,id2] [--skip-video] [--dry-run]
// 设计：确定性程序化执行（无 LLM 参与）——契约/seed 由本文件定义模板生成，
//   生成/校验/出片复用现有零依赖脚本；fail-fast，全绿才收尾。
// 前置：全部公式已过 HyperFormula 终验探针（见 index-log 批量三记录）。
import { spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const COURSES = join(ROOT, "courses");
const SEEDS = join(COURSES, "seeds");

const argv = process.argv.slice(2);
const opt = { only: null, skipVideo: false, dryRun: false };
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--only") opt.only = argv[++i].split(",");
  else if (argv[i] === "--skip-video") opt.skipVideo = true;
  else if (argv[i] === "--dry-run") opt.dryRun = true;
}
const want = (id) => !opt.only || opt.only.includes(id);

/* ---------- 共享数据集：订单表（A订单号 B地区 C渠道 D销售额 E结果） ---------- */
const ORDERS = {
  A1: "订单号", B1: "地区", C1: "渠道", D1: "销售额", E1: "结果",
  A2: "SO-1001", B2: "华东", C2: "线上", D2: 960,
  A3: "SO-1002", B3: "华北", C3: "门店", D3: 400,
  A4: "SO-1003", B4: "华东", C4: "线上", D4: 800,
  A5: "SO-1004", B5: "华南", C5: "线上", D5: 840,
  A6: "SO-1005", B6: "华北", C6: "门店", D6: 1200,
};

/* ---------- 10 门课定义（探针全过） ---------- */
const COURSE_DEFS = [
  {
    id: "average", fn: "AVERAGE", title: "AVERAGE 平均值：五笔销售的平均水平",
    category: "求和统计", level: "初级", durationMin: 3,
    sheet: "订单表", cells: ORDERS, cell: "E2",
    formula: "=AVERAGE(D2:D6)", value: 840, display: "840",
    args: [{ part: "D2:D6", meaning: "求平均的数值区域：只算数字，文本自动跳过" }],
    oneLiner: "AVERAGE：把一片区域的数字加起来再除以个数，得到平均水平。",
    explain: "就像写 SQL：SELECT AVG(销售额) FROM 订单，整列取平均。",
    outro: "总结：AVERAGE 只吃数字——平均值要有意义，先看数据是不是同一口径。",
    scenario: "五笔销售额摆在面前，想知道平均卖了多少——不用一个个加再除，一条公式直接算。",
    note: "AVERAGE 只统计数值单元格；区域里混进文本会被跳过（分母也跟着变小），口径要说清楚。",
  },
  {
    id: "max", fn: "MAX", title: "MAX 最大值：找出最高的那笔销售",
    category: "求和统计", level: "初级", durationMin: 3,
    sheet: "订单表", cells: ORDERS, cell: "E2",
    formula: "=MAX(D2:D6)", value: 1200, display: "1200",
    args: [{ part: "D2:D6", meaning: "取最大值的数值区域" }],
    oneLiner: "MAX：在一串数字里挑出最大的那个——极值一眼看到。",
    explain: "就像写 SQL：SELECT MAX(销售额) FROM 订单，找峰值。",
    outro: "总结：MAX 取最大、MIN 取最小；极值连着数据口径一起读。",
    scenario: "五笔里卖得最好的一笔是多少——不用逐个比，一条公式挑出最大值。",
    note: "MAX 只认数字；区域里有文本不影响结果，但空区域会返回 0。",
  },
  {
    id: "min", fn: "MIN", title: "MIN 最小值：找出最低的那笔销售",
    category: "求和统计", level: "初级", durationMin: 3,
    sheet: "订单表", cells: ORDERS, cell: "E2",
    formula: "=MIN(D2:D6)", value: 400, display: "400",
    args: [{ part: "D2:D6", meaning: "取最小值的数值区域" }],
    oneLiner: "MIN：在一串数字里挑出最小的那个——谷值同样重要。",
    explain: "就像写 SQL：SELECT MIN(销售额) FROM 订单，找谷值。",
    outro: "总结：MIN 取最小值；和 MAX 配对看，一眼掌握波动范围。",
    scenario: "最差的一笔是多少——MIN 和 MAX 一配对，销售区间就出来了。",
    note: "MIN/MAX 配对最常见：先看区间，再看平均，数据轮廓就有了。",
  },
  {
    id: "maxifs", fn: "MAXIFS", title: "MAXIFS 条件最大：华北最高的订单",
    category: "条件统计", level: "中级", durationMin: 4,
    sheet: "订单表", cells: ORDERS, cell: "E2",
    formula: '=MAXIFS(D2:D6,B2:B6,"华北")', value: 1200, display: "1200",
    args: [
      { part: "D2:D6", meaning: "求值区域：从中取最大值的数" },
      { part: "B2:B6", meaning: "条件区域：按地区筛行，与求值区域同高" },
      { part: '"华北"', meaning: "条件：只看华北的行" },
    ],
    oneLiner: "MAXIFS：先按条件筛行，再从剩下的数里取最大——条件版 MAX。",
    explain: "就像写 SQL：SELECT MAX(销售额) FROM 订单 WHERE 地区='华北'。",
    outro: "总结：MAXIFS = 条件 + 极值；条件成对写，和 SUMIFS 同一套骨架。",
    scenario: "华北最高的订单金额是多少——先按地区筛，再取最大值，一条公式两步做完。",
    note: "MAXIFS 与 SUMIFS/COUNTIFS 同族：条件区域与求值区域必须同高；单条件场景不用数组公式。",
  },
  {
    id: "averageif", fn: "AVERAGEIF", title: "AVERAGEIF 条件均值：华东订单的平均销售额",
    category: "条件统计", level: "中级", durationMin: 4,
    sheet: "订单表", cells: ORDERS, cell: "E2",
    formula: '=AVERAGEIF(B2:B6,"华东",D2:D6)', value: 880, display: "880",
    args: [
      { part: "B2:B6", meaning: "条件区域：按地区筛行（在前！和 SUMIFS 顺序相反）" },
      { part: '"华东"', meaning: "条件：只看华东的行" },
      { part: "D2:D6", meaning: "求平均区域：被平均的销售额" },
    ],
    oneLiner: "AVERAGEIF：只把符合条件的行拿来求平均——条件版 AVERAGE。",
    explain: "就像写 SQL：SELECT AVG(销售额) FROM 订单 WHERE 地区='华东'。",
    outro: "总结：AVERAGEIF 按条件求均值；分组平均比总平均更诚实。",
    scenario: "华东的平均单笔销售额是多少——条件筛选加求平均，一条公式完成。",
    note: "参数顺序：AVERAGEIF(条件区域, 条件, 求平均区域)——条件区域在前，和 SUMIFS 相反。",
  },
  {
    id: "left", fn: "LEFT", title: "LEFT 文本提取：从原始记录拆出姓名",
    category: "文本清理", level: "初级", durationMin: 3,
    sheet: "客户资料",
    cells: { A1: "原始记录", B1: "姓名", A2: "张三|13800138000|上海" },
    cell: "B2",
    formula: "=LEFT(A2,2)", value: "张三", display: "张三",
    args: [
      { part: "A2", meaning: "源文本：要拆的原始记录" },
      { part: "2", meaning: "取前 2 个字符：中文姓名定长 2" },
    ],
    oneLiner: "LEFT：从文本左边数几个字符取出来——定长字段拆分第一步。",
    explain: "就像 SQL：SUBSTR('张三|138...',1,2)，按位置截取。",
    outro: "总结：LEFT 从左取、RIGHT 从右取、MID 从中间取；位置数错一个字符就错。",
    scenario: "客户系统导出的记录把姓名、手机号、地区挤在一列——先把姓名拆出来。",
    note: "LEFT 按字符数截取；配合 FIND 找分隔符位置，才能拆不规则文本。",
  },
  {
    id: "substitute", fn: "SUBSTITUTE", title: "SUBSTITUTE 文本替换：批量改编号前缀",
    category: "文本清理", level: "初级", durationMin: 3,
    sheet: "编号表",
    cells: { A1: "原始编号", B1: "规范编号", A2: "SO-1001" },
    cell: "B2",
    formula: '=SUBSTITUTE(A2,"SO-","订单")', value: "订单1001", display: "订单1001",
    args: [
      { part: "A2", meaning: "原文本：要改写的原始编号" },
      { part: '"SO-"', meaning: "旧文本：要被替换掉的部分" },
      { part: '"订单"', meaning: "新文本：替换成的内容" },
    ],
    oneLiner: "SUBSTITUTE：把文本里的一段字精确替换成另一段——批量改写不求人。",
    explain: "就像 SQL：REPLACE('SO-1001','SO-','订单')，按内容替换。",
    outro: "总结：SUBSTITUTE 按内容替换；按位置截取用 LEFT/MID，先定位用 FIND。",
    scenario: "系统导出的订单号带英文前缀，报表要统一成中文编号——批量替换一条公式。",
    note: "SUBSTITUTE 是全量替换（所有出现都换）；只想换第一个用 REPLACE(文本,旧,新,1)。",
  },
  {
    id: "value", fn: "VALUE", title: "VALUE 文本转数：文本金额变成可算的数",
    category: "文本清理", level: "初级", durationMin: 3,
    sheet: "金额表",
    cells: { A1: "文本金额", B1: "数值金额", A2: "1200" },
    cell: "B2",
    formula: "=VALUE(A2)", value: 1200, display: "1200",
    args: [{ part: "A2", meaning: "文本形式的数字：看着像数，其实是文本（左对齐）" }],
    oneLiner: "VALUE：把看起来像数字的文本转成真数字——文本不转，SUM 都不认。",
    explain: "就像 SQL：CAST('1200' AS INT)，类型转换后再参与计算。",
    outro: "总结：VALUE 转数字、TEXT 转文本；先看单元格类型，再决定转不转。",
    scenario: "从系统粘过来的金额是文本——SUM 加不上它，VALUE 转一次就恢复可算。",
    note: "判断类型看对齐：数字默认右对齐、文本左对齐；ISNUMBER() 可以程序化判断。",
  },
  {
    id: "round", fn: "ROUND", title: "ROUND 四舍五入：小数保留一位",
    category: "求和统计", level: "初级", durationMin: 3,
    sheet: "数据表",
    cells: { A1: "原始值", B1: "保留1位", A2: 1234.567 },
    cell: "B2",
    formula: "=ROUND(A2,1)", value: 1234.6, display: "1234.6",
    args: [
      { part: "A2", meaning: "原始数值：要修约的数" },
      { part: "1", meaning: "小数位数：保留 1 位" },
    ],
    oneLiner: "ROUND：四舍五入到指定位数——报表数字的最后一步。",
    explain: "就像 SQL：ROUND(1234.567,1) → 1234.6，展示口径统一。",
    outro: "总结：ROUND(数, 位数)；先算后修约，别拿修约过的数继续算。",
    scenario: "计算结果一长串小数，报表里要统一保留一位——ROUND 收口。",
    note: "ROUND 是四舍五入；ROUNDDOWN/ROUNDUP 分别是截断和进位，口径按业务定。",
  },
  {
    id: "and", fn: "AND", title: "AND 组合判断：两个条件同时成立",
    category: "逻辑判断", level: "初级", durationMin: 3,
    sheet: "看板",
    cells: { A1: "指标", B1: "实际", C1: "目标", D1: "达标且超额", A2: "销售额", B2: 1200, C2: 1000 },
    cell: "D2",
    formula: "=AND(B2>=C2,B2>=1000)", value: true, display: "true",
    args: [
      { part: "B2>=C2", meaning: "条件1：实际不低于目标" },
      { part: "B2>=1000", meaning: "条件2：实际也达到绝对线" },
    ],
    oneLiner: "AND：所有条件都为真才返回 TRUE——一票否决的组合判断。",
    explain: "就像 SQL：WHERE 实际>=目标 AND 实际>=1000，两个门槛都要过。",
    outro: "总结：AND 全真才真、OR 一真就真；和 IF 组合把判断变成标签。",
    scenario: "考核要同时满足两个条件：不低于目标、且达到绝对线——AND 把两道门槛并成一个判断。",
    note: "AND 返回 TRUE/FALSE；送进 IF 就变成标签：=IF(AND(...),\"达标\",\"未达标\")。",
  },
];

/* ---------- 工具 ---------- */
function run(cmd, args, label) {
  const res = spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8", shell: process.platform === "win32" });
  if (res.status !== 0) {
    console.error(`✗ ${label} 失败：\n${(res.stderr || res.stdout || "").slice(-600)}`);
    process.exit(1);
  }
  return res.stdout;
}

function colIdx(s) {
  let c = 0;
  for (const ch of s) c = c * 26 + (ch.charCodeAt(0) - 64);
  return c;
}

function cellsToTable(cells) {
  let maxR = 0, maxC = 0;
  const grid = {};
  for (const [addr, v] of Object.entries(cells)) {
    const m = /^([A-Z]+)(\d+)$/.exec(addr);
    const r = +m[2], c = colIdx(m[1]);
    grid[r + "," + c] = v;
    if (r > maxR) maxR = r;
    if (c > maxC) maxC = c;
  }
  const lines = [];
  for (let r = 1; r <= maxR; r++) {
    const row = [];
    for (let c = 1; c <= maxC; c++) row.push(grid[r + "," + c] ?? "");
    if (r === 1) {
      lines.push("| " + row.join(" | ") + " |");
      lines.push("|" + row.map(() => " --- ").join("|") + "|");
    } else {
      lines.push("| " + row.join(" | ") + " |");
    }
  }
  return lines.join("\n");
}

function contractOf(d) {
  return {
    $comment: `函数课契约（批量三转写）：素材取自 excel-animation docs/excel，公式已过 HyperFormula 终验探针（func-batch 程序化生成）。字段语义见 skill/excel-tutorial-maker/references/contract-schema.md`,
    id: d.id,
    fn: d.fn,
    title: d.title,
    category: d.category,
    level: d.level,
    durationMin: d.durationMin,
    theme: "kimi",
    engine: "handsontable",
    seed: `seeds/${d.id}.md`,
    data: { sheets: [{ name: d.sheet, cells: d.cells }] },
    guide: [
      { step: 1, cell: d.cell, menu: `选中 ${d.cell}`, formula: "定位结果单元格", expect: `${d.cell} 被选中，输入框激活` },
      { step: 2, cell: d.cell, menu: "输入框输入公式", formula: d.formula, expect: `${d.cell} 显示公式原文 ${d.formula}` },
      { step: 3, cell: d.cell, menu: "回车确认", formula: d.formula, expect: `${d.cell} 显示 ${d.display}` },
      { step: 4, cell: d.cell, menu: `选中 ${d.cell} 查看编辑栏`, formula: d.formula, expect: `编辑栏回显 ${d.formula}，${d.cell} 显示 ${d.display}` },
    ],
    formulaArgs: d.args.map((a) => ({ part: a.part, meaning: a.meaning })),
    summary: { oneLiner: d.oneLiner, explain: d.explain, outro: d.outro },
    checks: [{ cell: d.cell, formula: d.formula, value: d.value }],
    narration: { style: "brief", gapMs: 200 },
  };
}

function seedOf(d) {
  const argBullets = d.args.map((a) => `- \`${a.part}\`：${a.meaning}。`).join("\n");
  return `# ${d.title}

> seed——契约 \`courses/${d.id}.json\` 的来源原文。转写自 excel-animation docs/excel（批量三，程序化生成；公式已过探针）。

## 适用场景

${d.scenario}

## 准备数据

在一张工作表（名称「${d.sheet}」）里录入：

${cellsToTable(d.cells)}

- ${d.cell} 留给结果。

## 核心公式

\`\`\`
${d.formula}
\`\`\`

${argBullets}

## 操作步骤

1. 选中 ${d.cell}；
2. 输入 \`${d.formula}\`；
3. 回车确认，${d.cell} 显示 ${d.display}；
4. 选中 ${d.cell} 查看编辑栏，回显公式原文。

## 记

${d.note}
`;
}

/* ---------- 流水线 ---------- */
console.log("═".repeat(60));
console.log("函数课批量流水线（批量三）");
console.log("═".repeat(60));

const made = [];
for (const d of COURSE_DEFS) {
  if (!want(d.id)) continue;
  made.push(d);
  if (opt.dryRun) {
    console.log(`[dry-run] ${d.id}: 将写 courses/${d.id}.json + seeds/${d.id}.md`);
    continue;
  }
  writeFileSync(join(COURSES, d.id + ".json"), JSON.stringify(contractOf(d), null, 2) + "\n");
  writeFileSync(join(SEEDS, d.id + ".md"), seedOf(d));
  console.log(`✓ 契约+seed 落盘：${d.id}`);
}
if (made.length === 0) {
  console.error("没有匹配的课程（--only 过滤）");
  process.exit(1);
}
if (opt.dryRun) {
  console.log("dry-run 结束，不执行生成/校验。");
  process.exit(0);
}

console.log("\n── 生成 ──");
for (const d of made) {
  run("node", ["scripts/tutorial/new.mjs", "--id", d.id, "--config", `courses/${d.id}.json`, "--force"], "generate " + d.id);
  console.log(`✓ apps/${d.id}/ 已生成`);
}

console.log("\n── 校验 ──");
console.log(run("node", ["scripts/tutorial/check-manifest.mjs"], "check-manifest").trim());
console.log(run("node", ["scripts/showcase/check-tutorials.mjs"], "check-tutorials").trim());

if (!opt.skipVideo) {
  console.log("\n── 出片（plan → video → qc）──");
  for (const d of made) {
    run("node", ["scripts/recorder/build-plan.mjs", "--config", `courses/${d.id}.json`, "--tts", "edge"], "plan " + d.id);
    console.log(`✓ plan  out/${d.id}/plan.json`);
    run("node", ["scripts/recorder/render-video.mjs", "--plan", `out/${d.id}/plan.json`], "video " + d.id);
    console.log(`✓ video out/${d.id}/${d.id}.mp4`);
    run("node", ["scripts/recorder/qc.mjs", "--plan", `out/${d.id}/plan.json`], "qc " + d.id);
    console.log(`✓ qc    out/${d.id}/qc/`);
  }
} else {
  console.log("\n（--skip-video：跳过出片）");
}

console.log("\n── 收尾 ──");
console.log(run("node", ["scripts/landing/build-recipes.mjs"], "recipes").trim());
console.log(run("node", ["scripts/landing/check-recipes.mjs"], "check-recipes").trim());

console.log("\n" + "═".repeat(60));
console.log(`✓ 批量完成：${made.length} 门函数课全链就绪（${made.map((d) => d.id).join(", ")}）`);
console.log("═".repeat(60));
