#!/usr/bin/env node
// l2-gen.mjs — L2 复合课契约生成器：块定义 → 4 步/块展开 → 契约+seed。
// 用法：node scripts/batch/l2-gen.mjs [--dry-run]
// 公式全部已过 HyperFormula 终验探针（见 index-log）。
import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dry = process.argv.includes("--dry-run");

/* 每课：blocks=[{cell, formula, display, args:[{part,meaning}]}]，4 步/块机械展开 */
const LESSONS = [
  {
    id: "dirty-data",
    fn: "脏数据清洗",
    title: "脏数据清洗四连：转数 → 洗空格 → 改编号 → 打标签",
    category: "场景实战",
    level: "中级",
    durationMin: 8,
    sheet: "脏数据",
    cells: {
      A1: "订单号", B1: "金额(文本)", C1: "地区", D1: "编号", E1: "清洗任务", F1: "结果",
      A2: "SO-1001", B2: "1200", C2: " 华东 ", D2: "SO-1001", E2: "① 文本金额转数",
      A3: "SO-1002", B3: "800", C3: "华北", D3: "SO-1002", E3: "② 地区清空格",
      A4: "SO-1003", B4: "1760", C4: " 华南 ", D4: "SO-1003", E4: "③ 编号改前缀",
      A5: "SO-1004", B5: "960", C5: "华东", D5: "SO-1004", E5: "④ 按金额打标签",
    },
    blocks: [
      {
        cell: "F2", formula: "=VALUE(B2)", display: "1200",
        args: [{ part: "B2", meaning: "文本形式的数字：看着像数，其实是文本（左对齐）" }],
        menu: "输入框输入公式", expect: "F2 显示 1200（文本变真数，SUM 才认）",
      },
      {
        cell: "F3", formula: "=TRIM(CLEAN(C2))", display: "华东",
        args: [
          { part: "CLEAN(C2)", meaning: "内层：去掉不可打印字符" },
          { part: "TRIM(", meaning: "外层：去掉首尾空格——CLEAN 在内 TRIM 在外" },
        ],
        menu: "输入框输入公式", expect: "F3 显示 华东（空格洗净，可匹配可汇总）",
      },
      {
        cell: "F4", formula: '=SUBSTITUTE(D2,"SO-","订单")', display: "订单1001",
        args: [
          { part: "D2", meaning: "原文本：要改写的原始编号" },
          { part: '"SO-"', meaning: "旧文本：要被替换掉的部分" },
          { part: '"订单"', meaning: "新文本：替换成的内容" },
        ],
        menu: "输入框输入公式", expect: 'F4 显示 订单1001（前缀批量改写）',
      },
      {
        cell: "F5", formula: '=IF(F2>=1000,"大额","常规")', display: "大额",
        args: [
          { part: "F2>=1000", meaning: "判断条件：引用第①步的转数结果（链式依赖）" },
          { part: '"大额"', meaning: "条件为真的返回值" },
        ],
        menu: "输入框输入公式", expect: 'F5 显示 大额（1200≥1000，用的是第①步产出）',
      },
    ],
    checks: [
      { cell: "F2", formula: "=VALUE(B2)", value: 1200 },
      { cell: "F3", formula: "=TRIM(CLEAN(C2))", value: "华东" },
      { cell: "F4", formula: '=SUBSTITUTE(D2,"SO-","订单")', value: "订单1001" },
      { cell: "F5", formula: '=IF(F2>=1000,"大额","常规")', value: "大额" },
    ],
    oneLiner: "脏数据四连：VALUE 转数、TRIM+CLEAN 洗空格、SUBSTITUTE 改编号、IF 打标签——每步产出喂下一步。",
    explain: "就像数据清洗流水线：类型修正 → 文本规范 → 编号统一 → 业务标记，链式依赖一步不能少。",
    outro: "总结：真实数据四种病一次治——转数、洗格、改号、打标；链式流程每步产出都能验。",
    scenario: "系统导出的订单表四种脏法齐全：金额是文本、地区带空格、编号前缀不统一、缺业务标签——一条链四步治完。",
    note: "第④步引用第①步的产出（F2）——复合课的块间依赖：顺序不能乱，练习也按序放行。",
    seedNote: "本课 4 公式 16 步，每步产出是下一步的输入——真实清洗流程的最小复刻。",
  },
  {
    id: "customer-rfm",
    fn: "RFM 分层",
    title: "客户 RFM 分层：频次 → 金额 → 最近月 → 合成标签",
    category: "场景实战",
    level: "中级",
    durationMin: 8,
    sheet: "客户表",
    cells: {
      A1: "客户", B1: "消费月", C1: "金额", D1: "RFM 任务", E1: "结果",
      A2: "张三", B2: 4, C2: 300, D2: "F 频次（张三订单数）",
      A3: "张三", B3: 5, C3: 500, D3: "M 金额（张三总消费）",
      A4: "李四", B4: 4, C4: 800, D4: "R 最近（张三最后消费月）",
      A5: "李四", B5: 5, C5: 200, D5: "标签（频次≥2 且金额≥500）",
      A6: "李四", B6: 6, C6: 600,
    },
    blocks: [
      {
        cell: "E2", formula: '=COUNTIFS(A2:A6,"张三")', display: "2",
        args: [
          { part: "A2:A6", meaning: "条件区域：客户列覆盖全部记录" },
          { part: '"张三"', meaning: "条件：只数张三的行" },
        ],
        menu: "输入框输入公式", expect: "E2 显示 2（张三有 2 笔订单）",
      },
      {
        cell: "E3", formula: '=SUMIFS(C2:C6,A2:A6,"张三")', display: "800",
        args: [
          { part: "C2:C6", meaning: "求和区域：金额列（放第一参数）" },
          { part: "A2:A6", meaning: "条件区域：客户列" },
          { part: '"张三"', meaning: "条件：只加张三的行" },
        ],
        menu: "输入框输入公式", expect: "E3 显示 800（300+500）",
      },
      {
        cell: "E4", formula: '=MAXIFS(B2:B6,A2:A6,"张三")', display: "5",
        args: [
          { part: "B2:B6", meaning: "求值区域：消费月列，取最大=最近" },
          { part: "A2:A6", meaning: "条件区域：客户列" },
          { part: '"张三"', meaning: "条件：只看张三的行" },
        ],
        menu: "输入框输入公式", expect: "E4 显示 5（张三最后消费在 5 月）",
      },
      {
        cell: "E5", formula: "=AND(E2>=2,E3>=500)", display: "true",
        args: [
          { part: "E2>=2", meaning: "条件1：频次达标（引用第①步产出）" },
          { part: "E3>=500", meaning: "条件2：金额达标（引用第②步产出）——AND 全真才真" },
        ],
        menu: "输入框输入公式", expect: "E5 显示 true（2≥2 且 800≥500，可打高价值标签）",
      },
    ],
    checks: [
      { cell: "E2", formula: '=COUNTIFS(A2:A6,"张三")', value: 2 },
      { cell: "E3", formula: '=SUMIFS(C2:C6,A2:A6,"张三")', value: 800 },
      { cell: "E4", formula: '=MAXIFS(B2:B6,A2:A6,"张三")', value: 5 },
      { cell: "E5", formula: "=AND(E2>=2,E3>=500)", value: true },
    ],
    oneLiner: "RFM 分层：COUNTIFS 数频次、SUMIFS 加金额、MAXIFS 取最近、AND 合成标签——三维度逐步成型。",
    explain: "就像 SQL：按客户 GROUP BY 后 COUNT/SUM/MAX 三个聚合，最后 CASE WHEN 打分层标签。",
    outro: "总结：RFM 就是三个聚合加一个判断——每个维度独立算，标签引用维度结果合成。",
    scenario: "运营要按客户价值分层：先算每个人的订单频次、总消费、最近消费月，再合成'高价值'标签——一条链四步。",
    note: "第④步 AND 引用第①②步的产出（E2/E3）——维度独立算、标签合成用，RFM 的结构就藏在依赖关系里。",
    seedNote: "本课 4 公式 16 步；数据为教学模型（5 行 3 列客户消费记录）。",
  },
];

/* ---------- 4 步/块机械展开 ---------- */
function expandGuide(blocks) {
  const guide = [];
  let step = 0;
  for (const b of blocks) {
    guide.push({ step: ++step, cell: b.cell, menu: `选中 ${b.cell}`, formula: `定位${b.cell} 结果格`, expect: `${b.cell} 被选中，输入框激活` });
    guide.push({ step: ++step, cell: b.cell, menu: b.menu || "输入框输入公式", formula: b.formula, expect: `${b.cell} 显示公式原文 ${b.formula}` });
    guide.push({ step: ++step, cell: b.cell, menu: "回车确认", formula: b.formula, expect: b.expect });
    guide.push({ step: ++step, cell: b.cell, menu: `选中 ${b.cell} 查看编辑栏`, formula: b.formula, expect: `编辑栏回显 ${b.formula}，${b.cell} 显示 ${b.display}` });
  }
  return guide;
}

function contractOf(L) {
  const formulaArgs = [];
  L.blocks.forEach((b, k) => {
    const stepNo = 4 * k + 2; /* 该块输入步 */
    for (const a of b.args) formulaArgs.push({ part: a.part, meaning: a.meaning, step: stepNo });
  });
  return {
    $comment: `L2 复合课（N 步契约）：${L.seedNote || ""} 公式已过 HyperFormula 终验探针（l2-gen 程序化生成）。字段语义见 skill/excel-tutorial-maker/references/contract-schema.md`,
    id: L.id,
    fn: L.fn,
    title: L.title,
    category: L.category,
    level: L.level,
    durationMin: L.durationMin,
    theme: "kimi",
    engine: "handsontable",
    seed: `seeds/${L.id}.md`,
    data: { sheets: [{ name: L.sheet, cells: L.cells }] },
    guide: expandGuide(L.blocks),
    formulaArgs,
    summary: { oneLiner: L.oneLiner, explain: L.explain, outro: L.outro },
    checks: L.checks,
    narration: { style: "brief", gapMs: 600 },
  };
}

function cellsTable(cells) {
  const parsed = {};
  let maxR = 0, maxC = 0;
  const colIdx = (s) => { let c = 0; for (const ch of s) c = c * 26 + (ch.charCodeAt(0) - 64); return c; };
  for (const [addr, v] of Object.entries(cells)) {
    const m = /^([A-Z]+)(\d+)$/.exec(addr);
    const r = +m[2], c = colIdx(m[1]);
    parsed[r + "," + c] = v;
    maxR = Math.max(maxR, r); maxC = Math.max(maxC, c);
  }
  const lines = [];
  for (let r = 1; r <= maxR; r++) {
    const row = [];
    for (let c = 1; c <= maxC; c++) row.push(parsed[r + "," + c] ?? "");
    if (r === 1) { lines.push("| " + row.join(" | ") + " |"); lines.push("|" + row.map(() => " --- ").join("|") + "|"); }
    else lines.push("| " + row.join(" | ") + " |");
  }
  return lines.join("\n");
}

function seedOf(L) {
  const blockSections = L.blocks.map((b, k) => {
    const argBullets = b.args.map((a) => `- \`${a.part}\`：${a.meaning}。`).join("\n");
    return `### 第 ${k + 1} 块 · ${b.cell}\n\n1. 选中 ${b.cell}；\n2. 输入 \`${b.formula}\`；\n3. 回车确认，${b.expect}；\n4. 选中 ${b.cell} 查看编辑栏。\n\n${argBullets}`;
  }).join("\n\n");
  return `# ${L.title}

> seed——契约 \`courses/${L.id}.json\` 的来源原文。${L.seedNote || ""}（l2-gen 程序化生成，公式已过探针）。

## 适用场景

${L.scenario}

## 准备数据

在一张工作表（名称「${L.sheet}」）里录入：

${cellsTable(L.cells)}

## 操作链（每块 4 步）

${blockSections}

## 记

${L.note}
`;
}

console.log("═".repeat(60));
for (const L of LESSONS) {
  const c = contractOf(L);
  if (dry) {
    console.log(`[dry-run] ${L.id}: ${c.guide.length} 步 / ${c.checks.length} checks / ${c.formulaArgs.length} args`);
    continue;
  }
  writeFileSync(join(ROOT, "courses", L.id + ".json"), JSON.stringify(c, null, 2) + "\n");
  writeFileSync(join(ROOT, "courses", "seeds", L.id + ".md"), seedOf(L));
  console.log(`✓ ${L.id}: ${c.guide.length} 步契约+seed 落盘`);
}
console.log("═".repeat(60));
