#!/usr/bin/env node
// batch.mjs — 图表课批量流水线：转写 → 生成 → 校验 → 回归，一条命令跑完。
// 用法：node scripts/batch/chart-batch.mjs [--only id,id2] [--skip-video] [--dry-run]
// 设计：确定性程序化执行（无 LLM 参与）——契约由本文件内的模板数据转写，
//   生成/校验复用现有零依赖脚本；任一环 FAIL 立即退出（fail-fast），全绿才收尾。
import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const COURSES = join(ROOT, "courses");
const SEEDS = join(COURSES, "seeds");

/* ---------- CLI ---------- */
const argv = process.argv.slice(2);
const opt = { only: null, skipVideo: false, dryRun: false };
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--only") opt.only = argv[++i].split(",");
  else if (argv[i] === "--skip-video") opt.skipVideo = true;
  else if (argv[i] === "--dry-run") opt.dryRun = true;
}
const want = (id) => !opt.only || opt.only.includes(id);

/* ---------- 图表课定义（转写自 excel-animation docs/excel/02-charts，数据 CSV 同源） ----------
 * 每门：契约对象 + oneLiner 等文案。数据列与 docs/excel/data/lessons/chart-<kind>/chart.csv 一致。 */
const DATA = {
  column: {
    labels: ["一月", "二月", "三月"],
    series: [2120, 2690, 4810],
    xTitle: "月份",
    yTitle: "销售金额",
  },
  bar: {
    labels: ["华东", "华北", "华南", "西南", "东北"],
    series: [2000, 1600, 1590, 900, 600],
    xTitle: "地区",
    yTitle: "销售额",
  },
  pie: {
    labels: ["线上", "门店"],
    series: [3410, 1880],
    xTitle: "渠道",
    yTitle: "销售额",
  },
  scatter: {
    labels: ["0.9", "0.85", "0.8", "0.75", "0.7", "0.65", "0.6", "0.55"],
    series: [62, 58, 61, 57, 55, 52, 54, 50],
    xTitle: "折扣",
    yTitle: "毛利率",
  },
  stacked: {
    labels: ["四月", "五月", "六月"],
    series: [880, 1040, 1310], // 线上
    series2: [1240, 1650, 880], // 门店
    xTitle: "月份",
    yTitle: "销售金额",
  },
};

const DATA_HIST = {
  labels: ['0–400', '400–800', '800–1200', '1200–1600', '1600+'],
  series: [4, 9, 6, 3, 1],
  xTitle: '分箱',
  yTitle: '订单数',
};
const DATA_COMBO = {
  labels: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月'],
  series: [980, 1120, 1050, 1360, 1640, 2190],
  series2: [31, 30, 28, 27, 25, 23],
  series2Name: '利润率',
  twoSeries: true,
  xTitle: '月份',
  yTitle: '销售额',
};

/* 折线课已存在（chart-line），此处只量产其余 5 门（饼图/散点/堆积为二系列或无序类别样本） */
const CHARTS = [
  {
    id: "chart-column",
    type: "bar", // 画布层 bar = 柱形渲染器（簇状柱形图）
    chartTypeCn: "簇状柱形图",
    usage: "比类别",
    fn: "簇状柱形图",
    data: DATA.column,
    oneLiner: "簇状柱形图：比类别——几根柱子排在一起，谁高谁低一眼见分晓。",
    explain: "就像写 SQL：SELECT 月份, SUM(金额) GROUP BY 月份，按类别分组计数再画柱。",
    outro: "总结：比较类别高低用柱形图；类别名太长改用条形图。",
    read: "六月最高 4810，三月是三月的两倍多。",
    formulaArgsNote: "月份(横轴)=离散类别，销售金额(纵轴)=数值",
  },
  {
    id: "chart-bar",
    type: "bar", // 横向条形复用柱形渲染器（视觉差异在文档说明中）
    chartTypeCn: "条形图",
    usage: "做排名",
    fn: "条形图",
    data: DATA.bar,
    oneLiner: "条形图：做排名——横向条形从长到短排，类别多、名字长也看得清。",
    explain: "就像写 SQL：SELECT 地区, SUM(销售额) GROUP BY 地区 ORDER BY 2 DESC，排好序再画横条。",
    outro: "总结：排名用排序后的条形图；精确比较相近类别时它比柱形更清楚。",
    read: "华东最长 2000，东北最短 600，排名从上到下一目了然。",
    formulaArgsNote: "地区(横轴)=已排序类别，销售额(纵轴)=数值",
  },
  {
    id: "chart-pie",
    type: "pie",
    chartTypeCn: "饼图／环形图",
    usage: "看占比",
    fn: "饼图",
    data: DATA.pie,
    oneLiner: "饼图：看占比——单系列非负值，每块扇形占整个圆的百分比。",
    explain: "就像写 SQL：SELECT 渠道, SUM(销售额) GROUP BY 渠道，算每渠道占总量的比例。",
    outro: "总结：占比用饼图；类别太多或值有负数就别用，改柱形。",
    read: "线上占 64.5%，门店占 35.5%——线上是主要渠道。",
    formulaArgsNote: "渠道(分类)=扇形，销售额(数值)=扇形大小",
  },
  {
    id: "chart-scatter",
    type: "line", // 画布层暂用折线渲染器承载（点距均匀，视觉近似散点趋势；边界记档）
    chartTypeCn: "XY 散点图",
    usage: "找关系",
    fn: "XY 散点图",
    data: DATA.scatter,
    oneLiner: "散点图：找关系——两个数值变量各占一轴，看点是聚在一起还是散开。",
    explain: "就像写 SQL：SELECT 折扣, 毛利率 FROM 订单，每行一个点，看两列怎么共变。",
    outro: "总结：找两列数值的关系用散点；相关不等于因果。",
    read: "折扣越高毛利率越低，负相关趋势明显。",
    formulaArgsNote: "折扣(横轴)=数值变量1，毛利率(纵轴)=数值变量2",
  },
  {
    id: "chart-stacked",
    type: "bar", // 堆积暂用柱形渲染器承载（构成对比；多系列渲染边界记档）
    chartTypeCn: "堆积柱形图",
    usage: "看构成变化",
    fn: "堆积柱形图",
    data: DATA.stacked,
    twoSeries: true,
    oneLiner: "堆积柱形图：看构成变化——每根柱子分两段，总量和构成一起看。",
    explain: "就像写 SQL：SELECT 月份, 渠道, SUM(金额) GROUP BY 月份, 渠道，按渠道堆叠分段。",
    outro: "总结：看构成怎么变用堆积柱形；非底层系列没有共同基线，比较构成别比较总数。",
    read: "总量五月最高；线上占比逐月上升。",
    formulaArgsNote: "月份(横轴)=有序类别，线上/门店(分段)=构成系列",
  },
  {
    id: 'chart-histogram',
    type: 'histogram',
    chartTypeCn: '直方图',
    usage: '看分布',
    fn: '直方图',
    data: DATA_HIST,
    oneLiner: '直方图：看分布——连续数值按区间分箱，每箱一根柱，看数据集中在哪段。',
    explain: '就像写 SQL：SELECT 分箱, COUNT(*) GROUP BY 分箱，按区间统计频数再画柱。',
    outro: '总结：分布用直方图；分箱宽度会改变解读，箱宽是口径的一部分。',
    read: '多数订单集中在 400–800 段（9 笔），大额订单较少。',
    formulaArgsNote: '分箱(横轴)=连续区间分桶，订单数(纵轴)=频数',
  },
  {
    id: 'chart-combo',
    type: 'combo',
    chartTypeCn: '组合图',
    usage: '量率同看',
    fn: '组合图',
    data: DATA_COMBO,
    twoSeries: true,
    combo: true,
    oneLiner: '组合图：量率同看——柱形管数量（左轴），折线管比率（右轴），一张图两种口径。',
    explain: '就像写 SQL：SELECT 月份, SUM(金额), AVG(率) GROUP BY 月份，金额画柱、比率画线。',
    outro: '总结：双口径一图看——柱是规模、线是效率；双轴别造虚假相关，先看各自口径。',
    read: '销售额逐月上升（980→2190），利润率却从 31% 降到 23%——量增率降。',
    formulaArgsNote: '月份(横轴)=有序类别，销售额(左轴)=柱形，利润率(右轴)=折线',
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

function a1Col(i) {
  let s = "";
  let c = i + 1;
  while (c > 0) {
    s = String.fromCharCode(65 + ((c - 1) % 26)) + s;
    c = Math.floor((c - 1) / 26);
  }
  return s;
}

function cellsOf(d) {
  const cells = {};
  cells["A1"] = d.xTitle;
  cells["B1"] = d.yTitle;
  if (d.twoSeries) cells["C1"] = d.series2Name || "门店";
  d.labels.forEach((lb, i) => {
    const r = i + 2;
    const isNum = d.type === "line" || d.id === "chart-scatter"; // 散点横轴数值
    cells["A" + r] = isNum ? Number(lb) : lb;
    cells["B" + r] = d.series[i];
    if (d.twoSeries) cells["C" + r] = d.series2[i];
  });
  return cells;
}

function lastRow(d) {
  return d.labels.length + 1;
}

function contractOf(c) {
  const d = c.data;
  const last = lastRow(d);
  const lastLabelCell = "A" + last;
  const lastValCell = "B" + last;
  const colEnd = d.twoSeries ? "C" : "B";
  return {
    $comment: `图表课契约（批量转写）：从 excel-animation docs/excel/02-charts ${c.chartTypeCn} 篇转写（chart-batch 程序化生成）。模拟渲染边界见 templates/handsontable/README.md「图表模拟层」`,
    id: c.id,
    fn: c.fn,
    title: `${c.chartTypeCn}${c.usage}：${d.xTitle}对${d.yTitle}`,
    category: "图表选型",
    level: "初级",
    durationMin: 4,
    theme: "kimi",
    engine: "handsontable",
    seed: `seeds/${c.id}.md`,
    data: { sheets: [{ name: `${d.xTitle}表`, cells: cellsOf(d) }] },
    guide: [
      { step: 1, cell: "A1:" + colEnd + last, menu: "选中数据区（含表头）", formula: "=B" + last, expect: "A1:" + colEnd + last + " 被选中（数据区高亮）" },
      { step: 2, cell: "A1:" + colEnd + last, menu: "插入 → " + c.chartTypeCn, formula: "=B" + last, expect: "图表菜单展开，" + c.chartTypeCn + "入口可见" },
      { step: 3, action: "chart", cell: "A1:" + colEnd + last, menu: "点击" + c.chartTypeCn, formula: c.formulaArgsNote, expect: "画布渲染" + c.chartTypeCn + "：" + c.read },
      { step: 4, action: "chart", cell: "A1:" + colEnd + last, menu: "读图", formula: c.formulaArgsNote, expect: "读图结论标注：" + c.read },
    ],
    chart: {
      type: c.type,
      title: `${d.xTitle}${c.usage}`,
      xAxis: "A2:" + lastLabelCell,
      series: d.twoSeries
        ? [
            { name: d.yTitle, values: "B2:" + lastValCell },
            { name: d.series2Name || "门店", values: "C2:C" + last },
          ]
        : [{ name: d.yTitle, values: "B2:" + lastValCell }],
    },
    formulaArgs: c.formulaArgsNote.split("，").map(function (seg) {
      return { part: seg.split("=")[0], meaning: seg };
    }),
    summary: { oneLiner: c.oneLiner, explain: c.explain, outro: c.outro },
    checks: [{ cell: lastValCell, formula: "=" + lastValCell, value: d.series[d.series.length - 1] }],
    narration: { style: "brief", gapMs: 200 },
  };
}

function seedOf(c) {
  const d = c.data;
  const last = lastRow(d);
  const rows = d.labels
    .map((lb, i) => `| ${i + 2} | ${lb} | ${d.series[i]} |${d.twoSeries ? ` ${d.series2[i]} |` : ""}`)
    .join("\n");
  return `# ${c.chartTypeCn}（${c.usage}）：${d.xTitle}对${d.yTitle}

> seed——契约 \`courses/${c.id}.json\` 的来源原文。转写自 excel-animation \`docs/excel/02-charts\`（chart-batch 程序化生成）。

## 适用场景

${c.oneLiner.replace(c.fn + "：", "")}不要手工比对，一条插入操作把数字变成图。

## 准备数据

| | A | B${d.twoSeries ? " | C |" : ""}
| --- | --- | ---${d.twoSeries ? " --- |" : ""}
| 1 | ${d.xTitle} | ${d.yTitle}${d.twoSeries ? " | 门店 |" : ""}
${rows}

- A 列是${d.type === "line" && c.id === "chart-scatter" ? "数值变量" : "类别字段"}；B 列是数值系列。${d.twoSeries ? "C 列是第二构成系列。" : ""}

## 操作步骤

1. 选中 A1:B${last}（含表头）；
2. 插入 → ${c.chartTypeCn}；
3. 确认横轴是${d.xTitle}、纵轴是${d.yTitle}；
4. 读图：${c.read}

## 读图结论

${c.read}
`;
}

/* ---------- 流水线 ---------- */
console.log("═".repeat(60));
console.log("图表课批量流水线");
console.log("═".repeat(60));

const made = [];
for (const c of CHARTS) {
  if (!want(c.id)) continue;
  const contract = contractOf(c);
  const seed = seedOf(c);

  if (opt.dryRun) {
    console.log(`[dry-run] ${c.id}: 将写 courses/${c.id}.json + seeds/${c.id}.md`);
    made.push(c.id);
    continue;
  }

  writeFileSync(join(COURSES, c.id + ".json"), JSON.stringify(contract, null, 2) + "\n");
  writeFileSync(join(SEEDS, c.id + ".md"), seed);
  console.log(`✓ 契约+seed 落盘：${c.id}`);
  made.push(c.id);
}
if (made.length === 0) {
  console.error("没有匹配的课程（--only 过滤）");
  process.exit(1);
}

if (opt.dryRun) {
  console.log("dry-run 结束，不执行生成/校验。");
  process.exit(0);
}

/* 2) 逐课生成 */
console.log("\n── 生成 ──");
for (const id of made) {
  run("node", ["scripts/tutorial/new.mjs", "--id", id, "--config", `courses/${id}.json`, "--force"], "generate " + id);
  console.log(`✓ apps/${id}/ 已生成`);
}

/* 3) 契约校验 + 展示层 + recipes 新鲜度 */
console.log("\n── 校验 ──");
console.log(run("node", ["scripts/tutorial/check-manifest.mjs"], "check-manifest").trim());
console.log(run("node", ["scripts/showcase/check-tutorials.mjs"], "check-tutorials").trim());
console.log(run("node", ["scripts/landing/check-recipes.mjs"], "check-recipes").trim());

/* 4) 出片（渲染式；抓窗式图表动作待 WP2，此处渲染式先行——画布图表入画） */
if (!opt.skipVideo) {
  console.log("\n── 出片（渲染式：plan → video → qc）──");
  for (const id of made) {
    run("node", ["scripts/recorder/build-plan.mjs", "--config", `courses/${id}.json`, "--tts", "edge"], "plan " + id);
    console.log(`✓ plan  out/${id}/plan.json`);
    run("node", ["scripts/recorder/render-video.mjs", "--plan", `out/${id}/plan.json`], "video " + id);
    console.log(`✓ video out/${id}/${id}.mp4`);
    run("node", ["scripts/recorder/qc.mjs", "--plan", `out/${id}/plan.json`], "qc " + id);
    console.log(`✓ qc    out/${id}/qc/`);
  }
} else {
  console.log("\n（--skip-video：跳过出片）");
}

/* 5) 收尾：recipes 重排 + 全链 verify */
console.log("\n── 收尾 ──");
console.log(run("node", ["scripts/landing/build-recipes.mjs"], "recipes").trim());
console.log(run("npm", ["run", "verify", "--silent"], "verify").trim());

console.log("\n" + "═".repeat(60));
console.log(`✓ 批量完成：${made.length} 门图表课全链就绪（${made.join(", ")}）`);
console.log("═".repeat(60));
