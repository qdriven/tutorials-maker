#!/usr/bin/env node
// capstone-gen.mjs — L2 压轴课批量生成：retail-ops（真实数据子集）/ apple-finance（三表勾稽）/
// free-excel（全类型：清洗+判断+条件汇总+跨表图表）。块→4 步展开，公式全部过 HyperFormula 探针。
import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dry = process.argv.includes("--dry-run");

const LESSONS = [
  /* ═══ retail-ops：UCI 真实数据 10 行子集（整数 GBP 避浮点坑），六步清洗链压缩为 4 块 ═══ */
  {
    id: "retail-ops",
    fn: "零售清洗链",
    title: "零售真实数据清洗链：判有效 → 洗编码 → 汇总 → 计数",
    category: "场景实战",
    level: "高级",
    durationMin: 8,
    sheet: "订单",
    cells: {
      A1: "InvoiceNo", B1: "StockCode", C1: "Quantity", D1: "UnitPrice", E1: "LineSales", F1: "Valid", G1: "Country", H1: "清洗链",
      A2: 546306, B2: "21733", C2: 2, D2: 3, E2: 6, F2: 1, G2: "United Kingdom", H2: "① 判首行有效",
      A3: 557055, B3: "23203", C3: 20, D3: 2, E3: 40, F3: 1, G3: "Germany", H3: "② 洗第5行编码",
      A4: 572516, B4: "22336", C4: -71, D4: 1, E4: 0, F4: 0, G4: "United Kingdom", H4: "③ 有效行汇总",
      A5: 556484, B5: " 21670", C5: 1, D5: 1, E5: 1, F5: 1, G5: "United Kingdom", H5: "④ 有效行计数",
      A6: 579187, B6: "90200d", C6: 1, D6: 4, E6: 4, F6: 1, G6: "United Kingdom",
      A7: 559552, B7: "22068", C7: 2, D7: 2, E7: 4, F7: 1, G7: "France",
      A8: 574356, B8: "20723", C8: 48, D8: 2, E8: 96, F8: 1, G8: "United Kingdom",
      A9: 580727, B9: "22423", C9: 10, D9: 6, E9: 60, F9: 1, G9: "Germany",
      A10: 569594, B10: "21733", C10: -40, D10: 3, E10: 0, F10: 0, G10: "United Kingdom",
      A11: 573126, B11: "22633", C11: 6, D11: 5, E11: 30, F11: 1, G11: "France",
    },
    blocks: [
      {
        cell: "H2", formula: "=IF(AND(C2>0,D2>0),1,0)", display: "1",
        args: [
          { part: "C2>0", meaning: "条件1：数量为正（-71 的退货行不过）" },
          { part: "D2>0", meaning: "条件2：单价为正——AND 全真才判有效" },
        ],
        expect: "H2 显示 1（数量2>0 且单价3>0，首行有效）",
      },
      {
        cell: "H3", formula: "=UPPER(TRIM(B6))", display: "90200D",
        args: [
          { part: "TRIM(B6)", meaning: "内层：去空格（B6 原文 90200d 小写）" },
          { part: "UPPER(", meaning: "外层：统一大写——商品编码规范化" },
        ],
        expect: "H3 显示 90200D（小写编码统一为大写）",
      },
      {
        cell: "H4", formula: "=SUMIFS(E2:E11,F2:F11,1)", display: "241",
        args: [
          { part: "E2:E11", meaning: "求和区域：行销售额（负数量行已预置 0）" },
          { part: "F2:F11", meaning: "条件区域：Valid 标记列（就是按①的逻辑逐行算的）" },
          { part: "1", meaning: "条件：只加有效行——退货/异常行被排除" },
        ],
        expect: "H4 显示 241（8 个有效行合计，排除 2 个负数量行）",
      },
      {
        cell: "H5", formula: "=COUNTIFS(F2:F11,1)", display: "8",
        args: [
          { part: "F2:F11", meaning: "计数区域：Valid 列" },
          { part: "1", meaning: "条件：数出有效行数——与汇总同口径" },
        ],
        expect: "H5 显示 8（10 行里 8 行有效，2 行退货）",
      },
    ],
    checks: [
      { cell: "H2", formula: "=IF(AND(C2>0,D2>0),1,0)", value: 1 },
      { cell: "H3", formula: "=UPPER(TRIM(B6))", value: "90200D" },
      { cell: "H4", formula: "=SUMIFS(E2:E11,F2:F11,1)", value: 241 },
      { cell: "H5", formula: "=COUNTIFS(F2:F11,1)", value: 8 },
    ],
    oneLiner: "零售清洗链：IF+AND 判有效、UPPER+TRIM 洗编码、SUMIFS 按标记汇总、COUNTIFS 同口径计数——UCI 真实数据 10 行子集。",
    explain: "就像真实 ETL：先打有效标记（Valid 列），再让汇总与计数都吃这个标记——口径一处定义、处处复用。",
    outro: "总结：真实数据先判有效性再汇总；汇总与计数共用同一标记列，口径才不会两张皮。",
    scenario: "UCI 在线零售样本（2011 年英国/德国/法国发票）：有负数量退货行、带空格与小写的商品编码——四步走完判有效、洗编码、汇总、计数。",
    note: "Valid 列（F）是①的逻辑逐行算好的（教学子集预置）——③④的汇总计数都吃它，这就是'口径一处定义'。",
    seedNote: "真实数据子集（10 行，整数 GBP 口径，负数量行 Valid=0/E=0）；原始 20000 行见 docs/excel/data/real/。",
    label: "判有效",
  },
  /* ═══ apple-finance：三表勾稽（跨表减法 → 三表差 → IF+ABS 判定） ═══ */
  {
    id: "apple-finance",
    fn: "三表勾稽",
    title: "Apple 三表勾稽：跨表毛利复算 → 资产负债差 → ABS 判定",
    category: "场景实战",
    level: "高级",
    durationMin: 7,
    sheet: "核对",
    cells: {
      A1: "核对项", B1: "结果",
      A2: "毛利复算（利润表）", A3: "资产负债差", A4: "勾稽判定",
    },
    sheets2: [
      {
        name: "利润表",
        cells: { A1: "科目", B1: "FY2025", A2: "总收入", B2: 416161, A3: "销售成本", B3: 220960, A4: "净利润", B4: 112010 },
      },
      {
        name: "资产负债表",
        cells: { A1: "项目", B1: "金额", A2: "资产总计", B2: 359241, A3: "负债合计", B3: 285508, A4: "股东权益", B4: 73733 },
      },
    ],
    blocks: [
      {
        cell: "B2", formula: "='利润表'!B2-'利润表'!B3", display: "195201",
        args: [
          { part: "'利润表'!B2", meaning: "跨表直引：总收入 416,161（USD millions）" },
          { part: "'利润表'!B3", meaning: "跨表直引：销售成本 220,960——相减得毛利" },
        ],
        expect: "B2 显示 195201（416161−220960，与 Apple 10-K 毛利一致）",
      },
      {
        cell: "B3", formula: "='资产负债表'!B2-'资产负债表'!B3-'资产负债表'!B4", display: "0",
        args: [
          { part: "'资产负债表'!B2", meaning: "资产总计 359,241" },
          { part: "'资产负债表'!B3", meaning: "负债合计 285,508" },
          { part: "'资产负债表'!B4", meaning: "股东权益 73,733——资产−负债−权益应为 0" },
        ],
        expect: "B3 显示 0（359241−285508−73733=0，资产负债平衡）",
      },
      {
        cell: "B4", formula: '=IF(ABS(B3)<1,"平衡","失衡")', display: "平衡",
        args: [
          { part: "ABS(B3)", meaning: "绝对值：差额不管正负都取 magnitude" },
          { part: "<1", meaning: "容差：|差|<1（USD millions 取整误差内）判平衡" },
          { part: '"平衡"', meaning: "条件为真的返回值——勾稽通过" },
        ],
        expect: 'B4 显示 平衡（B3=0，引用第②块产出自动判定）',
      },
    ],
    checks: [
      { cell: "B2", formula: "='利润表'!B2-'利润表'!B3", value: 195201 },
      { cell: "B3", formula: "='资产负债表'!B2-'资产负债表'!B3-'资产负债表'!B4", value: 0 },
      { cell: "B4", formula: '=IF(ABS(B3)<1,"平衡","失衡")', value: "平衡" },
    ],
    oneLiner: "三表勾稽：跨表减法复算毛利、三表相减验平衡、IF+ABS 自动判定——Apple FY2025 真实财报数字。",
    explain: "就像审计复核：每个数都要能从原始报表重新算出来，差额为 0 才叫勾稽通过。",
    outro: "总结：跨表取数复算、差额归零验证、ABS 容差判定——三表勾稽的完整链条。",
    scenario: "Apple FY2025 Form 10-K 三张报表做一次复算：毛利润 195,201、资产负债 359,241=285,508+73,733——用公式把三条连接亲手算通。",
    note: "数字口径 USD millions（百万美元）；勾稽差 <1 判平衡是审计常用容差——精确相等在取整数据里反而脆弱。",
    seedNote: "真实财报数据（Apple FY2025 10-K 子集，USD millions）；全量三表见 docs/excel/data/real/apple-*.csv。",
    label: "毛利复算",
  },
  /* ═══ free-excel：全类型压轴（清洗+判断+条件汇总+跨表图表） ═══ */
  {
    id: "free-excel",
    fn: "六步实战",
    title: "六步实战压缩：洗编码 → 判渠道 → 条件汇总 → 跨表趋势图",
    category: "场景实战",
    level: "高级",
    durationMin: 9,
    sheet: "订单",
    cells: {
      A1: "ProductCode", B1: "地区", C1: "渠道", D1: "销售额", E1: "实战任务", F1: "结果",
      A2: " cp002 ", B2: "华东", C2: "线上", D2: 960, E2: "① 洗编码",
      A3: "P-102", B3: "华北", C3: "门店", D3: 400, E3: "② 判有效渠道",
      A4: "p-103", B4: "华东", C4: "线上", D4: 800, E4: "③ 华东汇总",
      A5: "P-104", B5: "华南", C5: "线上", D5: 840,
      A6: "P-105", B6: "华东", C6: "门店", D6: 240,
      A7: "P-106", B7: "华北", C7: "线上", D7: 1200,
      A8: "P-107", B8: "华南", C8: "门店", D8: 750,
      A9: "P-108", B9: "华东", C9: "线上", D9: 1050,
    },
    sheets2: [
      {
        name: "月度",
        cells: {
          A1: "月份", B1: "销售额",
          A2: "1月", B2: 980, A3: "2月", B3: 1120, A4: "3月", B4: 1050,
          A5: "4月", B5: 1360, A6: "5月", B6: 1640, A7: "6月", B7: 2190,
        },
      },
    ],
    blocks: [
      {
        cell: "F2", formula: "=UPPER(TRIM(A2))", display: "CP002",
        args: [
          { part: "TRIM(A2)", meaning: "内层：去首尾空格（A2 原文带空格小写）" },
          { part: "UPPER(", meaning: "外层：统一大写——商品编码规范化第一步" },
        ],
        expect: "F2 显示 CP002（空格与小写一次洗净）",
      },
      {
        cell: "F3", formula: '=IF(OR(C2="线上",C2="门店"),1,0)', display: "1",
        args: [
          { part: 'C2="线上"', meaning: "条件1：线上渠道" },
          { part: 'C2="门店"', meaning: "条件2：门店渠道——OR 任一成立即有效" },
        ],
        expect: "F3 显示 1（C2=线上，OR 成立判有效）",
      },
      {
        cell: "F4", formula: '=SUMIFS(D2:D9,B2:B9,"华东")', display: "3050",
        args: [
          { part: "D2:D9", meaning: "求和区域：销售额列" },
          { part: "B2:B9", meaning: "条件区域：地区列" },
          { part: '"华东"', meaning: "条件：只加华东——960+800+240+1050" },
        ],
        expect: "F4 显示 3050（华东四笔订单合计）",
      },
      { /* 图表块：数据源=月度副表 */
        cell: "A1:D9", chart: true,
        formula: "月度!A2:B7 → 折线图",
        args: [],
        expect: "画布渲染折线图：横轴 1月→6月（取自月度表），末点 2190",
      },
    ],
    chart: {
      type: "line",
      title: "半年销售趋势（数据：月度表）",
      xAxis: "月度!A2:A7",
      series: [{ name: "销售额", values: "月度!B2:B7" }],
    },
    checks: [
      { cell: "F2", formula: "=UPPER(TRIM(A2))", value: "CP002" },
      { cell: "F3", formula: '=IF(OR(C2="线上",C2="门店"),1,0)', value: 1 },
      { cell: "F4", formula: '=SUMIFS(D2:D9,B2:B9,"华东")', value: 3050 },
    ],
    oneLiner: "六步实战压缩：UPPER+TRIM 洗编码、IF+OR 判渠道、SUMIFS 条件汇总、跨表折线看趋势——一份数据走完全流程。",
    explain: "就像分析日报的四连招：清洗输入 → 标记口径 → 分组汇总 → 趋势呈现——每步产出都是下一步的地基。",
    outro: "总结：真实流程是链式的——洗完再判、判完再算、算完看图；每步都能核对，链才可信。",
    scenario: "拿到一份订单数据（编码带空格小写、渠道混杂）+ 一张月度表：四步走完清洗、判断、汇总，最后让副表数据画出趋势图——六步方法的最小实战复刻。",
    note: "图表数据源在副表（月度!区域语法）——与 luke-charts 同款跨表图表；TEXT 生成月份是原六步的一环，因引擎边界（TEXT 格式串偏差）以跨表月度表替代。",
    seedNote: "六步实战压缩版（4 块 16 步，TEXT 环节按 sprint 记档绕过）；原六步见 docs/excel/01-learning-path/。",
    label: "洗编码",
  },
];

/* ---------- 4 步/块展开（图表块：选中→菜单→渲染→读图） ---------- */
function expandGuide(blocks) {
  const guide = [];
  let step = 0;
  for (const b of blocks) {
    if (b.chart) {
      guide.push({ step: ++step, cell: b.cell, menu: "选中数据区（含表头）", formula: b.formula, expect: b.cell + " 被选中（数据区高亮）" });
      guide.push({ step: ++step, cell: b.cell, menu: "插入 → 折线图", formula: b.formula, expect: "图表菜单展开，折线图入口可见" });
      guide.push({ step: ++step, action: "chart", cell: b.cell, menu: "点击折线图", formula: "月份(横轴)→销售额(纵轴)", expect: b.expect });
      guide.push({ step: ++step, action: "chart", cell: b.cell, menu: "读图", formula: "月份(横轴)→销售额(纵轴)", expect: "读图结论标注：6 月达到 2190，连续第三个月上升" });
    } else {
      guide.push({ step: ++step, cell: b.cell, menu: `选中 ${b.cell}`, formula: `定位${b.cell} 结果格`, expect: `${b.cell} 被选中，输入框激活` });
      guide.push({ step: ++step, cell: b.cell, menu: "输入框输入公式", formula: b.formula, expect: `${b.cell} 显示公式原文 ${b.formula}` });
      guide.push({ step: ++step, cell: b.cell, menu: "回车确认", formula: b.formula, expect: b.expect });
      guide.push({ step: ++step, cell: b.cell, menu: `选中 ${b.cell} 查看编辑栏`, formula: b.formula, expect: `编辑栏回显 ${b.formula}，${b.cell} 显示 ${b.display}` });
    }
  }
  return guide;
}

function contractOf(L) {
  const formulaArgs = [];
  L.blocks.forEach((b, k) => {
    const stepNo = 4 * k + 2;
    for (const a of b.args || []) formulaArgs.push({ part: a.part, meaning: a.meaning, step: stepNo });
  });
  const sheets = L.sheets2
    ? [{ name: L.sheet, cells: L.cells }, ...L.sheets2]
    : [{ name: L.sheet, cells: L.cells }];
  const c = {
    $comment: `L2 压轴课（${L.seedNote}）公式已过 HyperFormula 终验探针（capstone-gen 程序化生成）。字段语义见 skill/excel-tutorial-maker/references/contract-schema.md`,
    id: L.id,
    fn: L.fn,
    title: L.title,
    category: L.category,
    level: L.level,
    durationMin: L.durationMin,
    theme: "kimi",
    engine: "handsontable",
    seed: `seeds/${L.id}.md`,
    data: { sheets },
    guide: expandGuide(L.blocks),
    formulaArgs,
    summary: { oneLiner: L.oneLiner, explain: L.explain, outro: L.outro },
    checks: L.checks,
    narration: { style: "brief", gapMs: 600 },
  };
  if (L.chart) c.chart = L.chart;
  return c;
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
    const argBullets = (b.args || []).map((a) => `- \`${a.part}\`：${a.meaning}。`).join("\n");
    if (b.chart) {
      return `### 第 ${k + 1} 块 · 跨表趋势图\n\n5. 看参考表「月度」——6 行数据就是图表数据源；\n6. 插入 → 折线图；\n7. 点击折线图——画布渲染；\n8. 读图：6 月达到 2190，连续第三个月上升。`;
    }
    return `### 第 ${k + 1} 块 · ${b.cell}（${b.label || ""}）\n\n1. 选中 ${b.cell}；\n2. 输入 \`${b.formula}\`；\n3. 回车确认，${b.expect}；\n4. 选中 ${b.cell} 查看编辑栏。\n\n${argBullets}`;
  }).join("\n\n");
  const sheetSections = L.sheets2
    ? L.sheets2.map((s) => `**${s.name}**（副表）：\n\n${cellsTable(s.cells)}\n`).join("\n")
    : "";
  return `# ${L.title}

> seed——契约 \`${L.id}.json\` 的来源原文。${L.seedNote}（capstone-gen 程序化生成，公式已过探针）。

## 适用场景

${L.scenario}

## 准备数据

**${L.sheet}**（主表）：

${cellsTable(L.cells)}

${sheetSections}
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
    console.log(`[dry-run] ${L.id}: ${c.guide.length} 步 / ${c.checks.length} checks / sheets=${c.data.sheets.length}`);
    continue;
  }
  writeFileSync(join(ROOT, "courses", L.id + ".json"), JSON.stringify(c, null, 2) + "\n");
  writeFileSync(join(ROOT, "courses", "seeds", L.id + ".md"), seedOf(L));
  console.log(`✓ ${L.id}: ${c.guide.length} 步契约+seed 落盘（${c.data.sheets.length} 表${c.chart ? " +图表" : ""}）`);
}
console.log("═".repeat(60));
