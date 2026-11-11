#!/usr/bin/env node
// aclass-gen.mjs — L2 A 类场景课批量生成（sprint §4 剩余 7 场景）：
// power-query(跨表合并) / eda-outliers(探索) / plans(套餐建模) / two-way-lookup(二维查找) /
// inventory-reorder(补货模型) / supply-quality(加权口径) / text-date(文本拆分, TEXT 环节记 blocked)。
// 公式全部过 HyperFormula 终验探针（含修正：XLOOKUP 嵌套需 3 参 INDEX）。
import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dry = process.argv.includes("--dry-run");

const LESSONS = [
  /* ═══ 1. power-query：跨表 XLOOKUP 合并 → 计算列 → IF+OR 校验（3 块 12 步，链式） ═══ */
  {
    id: "power-query",
    fn: "合并查询",
    title: "合并查询三连：XLOOKUP 跨表带价 → 计算列 → 有效标记",
    category: "场景实战",
    level: "中级",
    durationMin: 7,
    sheet: "订单",
    cells: {
      A1: "订单号", B1: "SKU", C1: "数量", D1: "单价", E1: "销售额", F1: "有效标记",
      A2: "SO-1001", B2: "P-101", C2: 8,
      A3: "SO-1002", B3: "P-103", C3: 4,
      A4: "SO-1003", B4: "P-102", C4: 3,
    },
    sheets2: [{
      name: "商品表",
      cells: {
        A1: "SKU", B1: "商品", C1: "类别", D1: "单价", E1: "库存",
        A2: "P-101", B2: "冷萃咖啡", C2: "饮品", D2: 120, E2: 36,
        A3: "P-102", B3: "精品茶", C3: "饮品", D3: 80, E3: 58,
        A4: "P-103", B4: "咖啡豆", C4: "原料", D4: 200, E4: 24,
        A5: "P-104", B5: "保温杯", C5: "周边", D5: 150, E5: 42,
        A6: "P-105", B6: "手冲壶", C6: "器具", D6: 260, E6: 12,
      },
    }],
    blocks: [
      {
        cell: "D2",
        formula: "=XLOOKUP(B2,'商品表'!$A$2:$A$6,'商品表'!$D$2:$D$6,\"未匹配\")",
        display: "120",
        args: [
          { part: "B2", meaning: "查找值：本行 SKU（相对引用，向下填充自动跟着走）" },
          { part: "'商品表'!$A$2:$A$6", meaning: "查找数组：商品表 SKU 列（$ 锁定，中文表名单引号）" },
          { part: "'商品表'!$D$2:$D$6", meaning: "返回数组：单价列——与查找数组分离，合并即带价" },
        ],
        expect: "D2 显示 120（从商品表带出 P-101 单价）",
      },
      {
        cell: "E2",
        formula: "=C2*D2",
        display: "960",
        args: [
          { part: "C2", meaning: "数量：本行 8" },
          { part: "D2", meaning: "单价：第①块 XLOOKUP 带回的 120（链式依赖）" },
        ],
        expect: "E2 显示 960（8×120，计算列随源数据更新）",
      },
      {
        cell: "F2",
        formula: "=IF(OR(C2<=0,D2<=0),0,1)",
        display: "1",
        args: [
          { part: "C2<=0", meaning: "条件1：数量非正（退货行）" },
          { part: "D2<=0", meaning: "条件2：单价非正——OR 任一成立即判无效" },
        ],
        expect: "F2 显示 1（数量 8、单价 120 都为正，行有效）",
      },
    ],
    checks: [
      { cell: "D2", formula: "=XLOOKUP(B2,'商品表'!$A$2:$A$6,'商品表'!$D$2:$D$6,\"未匹配\")", value: 120 },
      { cell: "E2", formula: "=C2*D2", value: 960 },
      { cell: "F2", formula: "=IF(OR(C2<=0,D2<=0),0,1)", value: 1 },
    ],
    oneLiner: "合并查询三连：XLOOKUP 跨表把单价带进订单、计算列算销售额、IF+OR 打有效标记——用公式复现 Power Query 的 merge/custom/validate。",
    explain: "就像 SQL 三连：LEFT JOIN 商品表带价 → SELECT 数量*单价 新列 → WHERE 数量>0 校验。",
    outro: "总结：合并（跨表带值）→ 计算（新列派生）→ 校验（规则打标）——数据管道的三步最小闭环。",
    scenario: "订单表只有 SKU 没有单价，商品表才有价——三步把单价跨表带进来、算出销售额、标出有效行。",
    note: "第②块引用第①块的 D2（链式依赖）——合并完才能计算，计算完才能校验，顺序即数据管道。",
    seedNote: "A 类场景课（3 块 12 步，跨表+链式）；素材 docs/excel/05-workspace-lessons/07-power-query.md。",
    label: "跨表带价",
  },
  /* ═══ 2. eda-outliers：AVERAGE/MAX/COUNTBLANK/IF 探索四查（4 块 16 步） ═══ */
  {
    id: "eda-outliers",
    fn: "数据探索",
    title: "数据探索四查：平均 → 极值 → 空值 → 异常复核",
    category: "场景实战",
    level: "中级",
    durationMin: 8,
    sheet: "订单",
    cells: {
      A1: "订单号", B1: "金额 GBP",
      A2: "A01", B2: 120, A3: "A02", B3: 350, A4: "A03", B4: 80,
      A5: "A04", B5: 500, A6: "A05", B6: 1200, A7: "A06", B7: 90,
      A8: "A07", A9: "A08", B9: 240, A10: "A09", B10: 4000, A11: "A10", B11: 160,
      D1: "探索任务", E1: "结果",
      D2: "① 平均金额", D3: "② 最大金额", D4: "③ 空值数量", D5: "④ A09 复核",
    },
    blocks: [
      {
        cell: "E2", formula: "=ROUND(AVERAGE(B2:B11),2)", display: "748.89",
        args: [
          { part: "B2:B11", meaning: "区域：10 笔金额——A07 空单元格被 AVERAGE 跳过（不按 0 算）" },
        ],
        expect: "E2 显示 748.89（9 个非空值平均，空值不参与）",
      },
      {
        cell: "E3", formula: "=MAX(B2:B11)", display: "4000",
        args: [{ part: "B2:B11", meaning: "区域：最大值是复核线索，不是自动判错" }],
        expect: "E3 显示 4000（A09 是极端值，复核对象）",
      },
      {
        cell: "E4", formula: "=COUNTBLANK(B2:B11)", display: "1",
        args: [{ part: "B2:B11", meaning: "区域：只数真正空的单元格——空值与 0 含义不同" }],
        expect: "E4 显示 1（A07 是空行，不是 0 元订单）",
      },
      {
        cell: "E5", formula: "=IF(B10>1000,\"重点复核\",\"常规\")", display: "重点复核",
        args: [
          { part: "B10>1000", meaning: "条件：A09 金额 4000 > 1000（业务规则：超额需复核）" },
        ],
        expect: "E5 显示 重点复核（4000>1000，按规则标记）",
      },
    ],
    checks: [
      { cell: "E2", formula: "=ROUND(AVERAGE(B2:B11),2)", value: 748.89 },
      { cell: "E3", formula: "=MAX(B2:B11)", value: 4000 },
      { cell: "E4", formula: "=COUNTBLANK(B2:B11)", value: 1 },
      { cell: "E5", formula: "=IF(B10>1000,\"重点复核\",\"常规\")", value: "重点复核" },
    ],
    oneLiner: "数据探索四查：AVERAGE 看集中、MAX 找极值、COUNTBLANK 数空行、IF 按规则标异常——动手分析前的四个标准动作。",
    explain: "就像 SQL 四连：AVG/MAX 聚合 + COUNT(NULL) 查缺失 + CASE WHEN 打复核标记。",
    outro: "总结：先平均看轮廓、再极值找线索、空值单独数、规则化复核——探索的固定起手式。",
    scenario: "拿到 10 笔金额订单（含 1 个空行、1 个 4000 极端值）：四查摸清分布，再按'金额>1000 需复核'规则标记异常。",
    note: "空值与 0 是两回事：AVERAGE 跳过空、COUNTBLANK 数空、SUM 把空当 0——口径必须说清楚。",
    seedNote: "A 类场景课（4 块 16 步）；素材 docs/excel/05-workspace-lessons/08-eda-outliers.md。",
    label: "平均",
  },
  /* ═══ 3. plans：MAX(0,..) 套餐建模 ×3 + INDEX+MATCH 选最优（4 块 16 步，链式） ═══ */
  {
    id: "plans",
    fn: "套餐建模",
    title: "套餐建模四步：三档费用公式 → MIN+INDEX 挑最优",
    category: "场景实战",
    level: "高级",
    durationMin: 8,
    sheet: "套餐比较",
    cells: {
      A1: "套餐", B1: "固定费", C1: "包含GB", D1: "超额单价/GB",
      A2: "A", B2: 29, C2: 5, D2: 3,
      A3: "B", B3: 49, C3: 20, D3: 2,
      A4: "C", B4: 79, C4: 50, D4: 1,
      A6: "每月用量GB", B6: 25,
      A7: "A 套餐费用", A8: "B 套餐费用", A9: "C 套餐费用", A10: "最低费用套餐",
    },
    blocks: [
      {
        cell: "B7", formula: "=B2+MAX(0,$B$6-C2)*D2", display: "89",
        args: [
          { part: "B2", meaning: "固定费 29（套餐 A 行）" },
          { part: "MAX(0,$B$6-C2)", meaning: "超额量：25−5=20；没超时 MAX 兜 0，不出现负超额费" },
          { part: "$B$6", meaning: "用量 25——绝对引用，三档公式共用同一个用量格" },
        ],
        expect: "B7 显示 89（29 + max(0,25−5)×3 = 29+60）",
      },
      {
        cell: "B8", formula: "=B3+MAX(0,$B$6-C3)*D3", display: "59",
        args: [
          { part: "B3", meaning: "固定费 49（套餐 B 行，相对引用逐行下移）" },
          { part: "C3", meaning: "包含 20GB——25−20=5GB 超额" },
        ],
        expect: "B8 显示 59（49 + max(0,25−20)×2 = 49+10）",
      },
      {
        cell: "B9", formula: "=B4+MAX(0,$B$6-C4)*D4", display: "79",
        args: [
          { part: "C4", meaning: "包含 50GB——25<50 没超，MAX(0,−25)=0 只付固定费" },
        ],
        expect: "B9 显示 79（没超量，只付固定费 79——MAX 兜底生效）",
      },
      {
        cell: "B10",
        formula: "=INDEX(A2:A4,MATCH(MIN(B7:B9),B7:B9,0))",
        display: "B",
        args: [
          { part: "MIN(B7:B9)", meaning: "三档费用里找最小值 59" },
          { part: "MATCH(MIN(B7:B9),B7:B9,0)", meaning: "定位最小值在第几档（0=精确匹配）" },
          { part: "A2:A4", meaning: "返回区域：套餐名——INDEX 按位置取名字" },
        ],
        expect: "B10 显示 B（59 最低，INDEX+MATCH 返回套餐名 B）",
      },
    ],
    checks: [
      { cell: "B7", formula: "=B2+MAX(0,$B$6-C2)*D2", value: 89 },
      { cell: "B8", formula: "=B3+MAX(0,$B$6-C3)*D3", value: 59 },
      { cell: "B9", formula: "=B4+MAX(0,$B$6-C4)*D4", value: 79 },
      { cell: "B10", formula: "=INDEX(A2:A4,MATCH(MIN(B7:B9),B7:B9,0))", value: "B" },
    ],
    oneLiner: "套餐建模：固定费+MAX(0,超额)×单价写成三档公式，MIN 找最低、INDEX+MATCH 挑名字——用量一改全表重算。",
    explain: "就像定价引擎：cost = base + max(0, usage - quota) * overage_rate，再 argmin 出最优方案。",
    outro: "总结：先让公式算三档成本，再让 INDEX+MATCH 从结果里挑名字——不能凭感觉选方案。",
    scenario: "每月 25GB 用量，三个套餐（固定费+包含量+超额单价）——把规则写成公式，算出 A=89、B=59、C=79，自动返回最优 B。",
    note: "MAX(0,…) 是建模关键：用量没超时不出现负超额费；$B$6 绝对引用让三档共用同一用量格。",
    seedNote: "A 类场景课（4 块 16 步，链式：费用→最优）；素材 docs/excel/05-workspace-lessons/09-plans.md。",
    label: "A费用",
  },
  /* ═══ 4. two-way-lookup：两 MATCH 交叉 → XLOOKUP 变体 → IF 判断（3 块 12 步） ═══ */
  {
    id: "two-way-lookup",
    fn: "二维查找",
    title: "二维查找三步：双 MATCH 交叉 → XLOOKUP 变体 → 阈值判断",
    category: "场景实战",
    level: "高级",
    durationMin: 7,
    sheet: "销售矩阵",
    cells: {
      A1: "商品", B1: "2026-09", C1: "2026-10", D1: "2026-11",
      A2: "冷萃咖啡", B2: 12000, C2: 15000, D2: 18000,
      A3: "精品茶", B3: 9000, C3: 11000, D3: 13000,
      A4: "咖啡豆", B4: 18000, C4: 20000, D4: 23000,
      A6: "商品", B6: "咖啡豆",
      A7: "月份", B7: "2026-11",
      A8: "INDEX＋MATCH 结果", A9: "XLOOKUP 结果", A10: "是否高于2万",
    },
    blocks: [
      {
        cell: "B8",
        formula: "=INDEX(B2:D4,MATCH(B6,A2:A4,0),MATCH(B7,B1:D1,0))",
        display: "23000",
        args: [
          { part: "MATCH(B6,A2:A4,0)", meaning: "第一个 MATCH：商品'咖啡豆'在第 3 行" },
          { part: "MATCH(B7,B1:D1,0)", meaning: "第二个 MATCH：月份'2026-11'在第 3 列" },
          { part: "B2:D4", meaning: "数据区：INDEX(区, 行号, 列号) 取交叉格" },
        ],
        expect: "B8 显示 23000（第 3 行 × 第 3 列的交叉值）",
      },
      {
        cell: "B9",
        formula: "=INDEX(XLOOKUP(B6,A2:A4,B2:D4),1,MATCH(B7,B1:D1,0))",
        display: "23000",
        args: [
          { part: "XLOOKUP(B6,A2:A4,B2:D4)", meaning: "XLOOKUP 取商品整行（返回数组，第 3 参数 1=取该行）" },
          { part: "MATCH(B7,B1:D1,0)", meaning: "MATCH 找月份列号——行已由 XLOOKUP 定位" },
        ],
        expect: "B9 显示 23000（XLOOKUP 整行 + MATCH 列号，同一结果）",
      },
      {
        cell: "B10",
        formula: "=IF(B8>20000,\"高于2万元\",\"不高于2万元\")",
        display: "高于2万元",
        args: [{ part: "B8>20000", meaning: "条件：直接引用第①块结果（23000>20000），不重填金额" }],
        expect: "B10 显示 高于2万元（引用 B8 判断，链条可复核）",
      },
    ],
    checks: [
      { cell: "B8", formula: "=INDEX(B2:D4,MATCH(B6,A2:A4,0),MATCH(B7,B1:D1,0))", value: 23000 },
      { cell: "B9", formula: "=INDEX(XLOOKUP(B6,A2:A4,B2:D4),1,MATCH(B7,B1:D1,0))", value: 23000 },
      { cell: "B10", formula: "=IF(B8>20000,\"高于2万元\",\"不高于2万元\")", value: "高于2万元" },
    ],
    oneLiner: "二维查找三步：双 MATCH 定行列交叉取值、XLOOKUP 整行变体同解、IF 引用结果做阈值判断。",
    explain: "就像 SQL：行条件 + 列条件的二维 WHERE——INDEX(区,行,列) 是矩阵的坐标取值。",
    outro: "总结：行一个 MATCH、列一个 MATCH；判断引用查到的格，不重填数字——链条才可复核。",
    scenario: "销售矩阵（商品×月份）要查'咖啡豆 2026-11'的值：两种写法取到 23000，再判断是否高于 2 万。",
    note: "XLOOKUP 变体里 INDEX 第 2 参数写 1（HyperFormula 口径：行数组需显式行号）；两种写法结果必须一致互为复核。",
    seedNote: "A 类场景课（3 块 12 步）；素材 docs/excel/05-workspace-lessons/11-two-way-lookup.md。",
    label: "交叉取值",
  },
  /* ═══ 5. inventory-reorder：补货点模型 → MAX 兜底 → IF 状态（3 块 12 步，链式） ═══ */
  {
    id: "inventory-reorder",
    fn: "补货模型",
    title: "库存补货模型三步：补货点 → 建议量 → 状态",
    category: "场景实战",
    level: "中级",
    durationMin: 6,
    sheet: "库存",
    cells: {
      A1: "商品", B1: "当前库存", C1: "日均销量", D1: "补货周期", E1: "安全天数", F1: "补货点", G1: "建议补货量", H1: "状态",
      A2: "咖啡豆", B2: 80, C2: 12, D2: 5, E2: 3,
      A3: "精品茶", B3: 200, C3: 8, D3: 4, E3: 2,
      A4: "手冲壶", B4: 40, C4: 6, D4: 7, E4: 3,
    },
    blocks: [
      {
        cell: "F2", formula: "=C2*(D2+E2)", display: "96",
        args: [
          { part: "C2", meaning: "日均销量 12" },
          { part: "(D2+E2)", meaning: "补货周期 5 + 安全天数 3 = 8 天覆盖期" },
        ],
        expect: "F2 显示 96（补货点 = 12×8，周期内要备的货）",
      },
      {
        cell: "G2", formula: "=MAX(0,F2-B2)", display: "16",
        args: [
          { part: "F2-B2", meaning: "补货点 96 − 库存 80 = 16（缺口）" },
          { part: "MAX(0,", meaning: "兜底：库存充足时差为负，强制 ≥0——不出现'补 −112'" },
        ],
        expect: "G2 显示 16（缺 16 件；MAX 保证不为负）",
      },
      {
        cell: "H2", formula: "=IF(G2>0,\"补货\",\"观察\")", display: "补货",
        args: [{ part: "G2>0", meaning: "条件：引用第②块建议量——大于 0 才补货" }],
        expect: "H2 显示 补货（16>0，咖啡豆需补）",
      },
    ],
    checks: [
      { cell: "F2", formula: "=C2*(D2+E2)", value: 96 },
      { cell: "G2", formula: "=MAX(0,F2-B2)", value: 16 },
      { cell: "H2", formula: "=IF(G2>0,\"补货\",\"观察\")", value: "补货" },
    ],
    oneLiner: "补货模型三步：日均×(周期+安全天)算补货点、MAX(0,缺口)算建议量、IF 出状态——规则写成可更新公式。",
    explain: "就像库存策略：reorder_point = daily_sales * (lead_time + safety_days)，order_qty = max(0, rp - stock)。",
    outro: "总结：补货点是模型、建议量带兜底、状态从量推导——三格公式，数据变了全自动。",
    scenario: "三个商品的库存表：按'补货点=日均×(周期+安全天)'算出咖啡豆要补 16 件并标'补货'——整行公式可复制复用。",
    note: "MAX(0,…) 防负数：精品茶 48−200=−152 会被兜成 0 → 状态'观察'——建议补货量不能是负的。",
    seedNote: "A 类场景课（3 块 12 步，链式）；素材 docs/excel/05-workspace-lessons/16-inventory-reorder.md。",
    label: "补货点",
  },
  /* ═══ 6. supply-quality：加权缺陷率 → 单位成本 → 简单平均 → 口径差（4 块 16 步，链式） ═══ */
  {
    id: "supply-quality",
    fn: "加权口径",
    title: "供应链质量四算：加权缺陷率 → 单位成本 → 简单平均 → 口径差",
    category: "场景实战",
    level: "高级",
    durationMin: 8,
    sheet: "供应商",
    cells: {
      A1: "供应商", B1: "生产量", C1: "缺陷数", D1: "出货量", E1: "运输成本", F1: "缺陷率",
      A2: "美妆一号", B2: 1000, C2: 20, D2: 800, E2: 4000, F2: 0.02,
      A3: "美妆二号", B3: 2000, C3: 80, D3: 1600, E3: 9600, F3: 0.04,
      A4: "美妆三号", B4: 1500, C4: 15, D4: 1200, E4: 4500, F4: 0.01,
      A6: "整体缺陷率（加权）", A7: "单位运输成本", A8: "简单平均缺陷率", A9: "加权−简单口径差",
    },
    blocks: [
      {
        cell: "B6", formula: "=ROUND(SUM(C2:C4)/SUM(B2:B4),4)", display: "0.0256",
        args: [
          { part: "SUM(C2:C4)", meaning: "缺陷总数 115（先加总分子）" },
          { part: "SUM(B2:B4)", meaning: "生产总量 4500（先加总分母）——加权口径：不能直接平均三个百分比" },
        ],
        expect: "B6 显示 0.0256（115÷4500≈2.56%，整体缺陷率）",
      },
      {
        cell: "B7", formula: "=ROUND(SUM(E2:E4)/SUM(D2:D4),4)", display: "5.0278",
        args: [
          { part: "SUM(E2:E4)", meaning: "运输总成本 18100" },
          { part: "SUM(D2:D4)", meaning: "出货总量 3600——总成本÷总量=每件运费" },
        ],
        expect: "B7 显示 5.0278（18100÷3600 元/件）",
      },
      {
        cell: "B8", formula: "=ROUND(AVERAGE(F2:F4),4)", display: "0.0233",
        args: [{ part: "AVERAGE(F2:F4)", meaning: "三家缺陷率的简单平均（0.02/0.04/0.01）——对照口径" }],
        expect: "B8 显示 0.0233（简单平均，供与加权对照）",
      },
      {
        cell: "B9", formula: "=ROUND(B6-B8,4)", display: "0.0023",
        args: [{ part: "B6-B8", meaning: "加权 0.0256 − 简单 0.0233（引用第①③块产出）" }],
        expect: "B9 显示 0.0023（两种口径差 0.23 个百分点——大供应商权重更高）",
      },
    ],
    checks: [
      { cell: "B6", formula: "=ROUND(SUM(C2:C4)/SUM(B2:B4),4)", value: 0.0256 },
      { cell: "B7", formula: "=ROUND(SUM(E2:E4)/SUM(D2:D4),4)", value: 5.0278 },
      { cell: "B8", formula: "=ROUND(AVERAGE(F2:F4),4)", value: 0.0233 },
      { cell: "B9", formula: "=ROUND(B6-B8,4)", value: 0.0023 },
    ],
    oneLiner: "加权口径四算：SUM/SUM 算整体缺陷率与单位成本、AVERAGE 做简单对照、相减看口径差——比率必须按量加权。",
    explain: "就像 SQL：SUM(col)/SUM(col) 聚合比 vs AVG(ratio) 行均比——分组聚合前不能平均比率。",
    outro: "总结：比率类指标先加总分子分母再相除；简单平均只做对照——口径差本身就是分析结论。",
    scenario: "三家供应商的产量/缺陷/运费：算出整体缺陷率 2.56%、每件运费 5.03 元，再和简单平均对照——发现 0.23 个点的口径差。",
    note: "缺陷率列（F）是各行缺陷数÷产量（已算好供对照）——加权与简单的差说明：量大的供应商对整体影响更大。",
    seedNote: "A 类场景课（4 块 16 步，链式：加权→对照→口径差）；素材 docs/excel/05-workspace-lessons/17-supply-quality.md。",
    label: "加权缺陷率",
  },
  /* ═══ 7. text-date 拆分版：LEFT/MID/RIGHT+FIND 三拆（3 块 12 步；TEXT 月份环节记 blocked） ═══ */
  {
    id: "text-date",
    fn: "文本拆分",
    title: "文本拆分三件套：LEFT 定名 → MID 取号 → RIGHT 截区",
    category: "文本清理",
    level: "中级",
    durationMin: 6,
    sheet: "客户资料",
    cells: {
      A1: "原始记录", B1: "客户姓名", C1: "手机号", D1: "地区",
      A2: "张三|13800138000|上海",
      A3: "李四|13900139000|北京",
      F1: "拆分任务", G1: "结果",
      F2: "① 姓名（第1段）", F3: "② 手机号（第2段）", F4: "③ 地区（末段）",
    },
    blocks: [
      {
        cell: "G2", formula: "=LEFT(A2,FIND(\"|\",A2)-1)", display: "张三",
        args: [
          { part: "FIND(\"|\",A2)", meaning: "定位第一个分隔符位置（3）——拆分的基准" },
          { part: "LEFT(", meaning: "从左取 3−1=2 个字符 → 张三" },
        ],
        expect: "G2 显示 张三（第一个 | 之前的部分）",
      },
      {
        cell: "G3",
        formula: "=MID(A2,FIND(\"|\",A2)+1,11)",
        display: "13800138000",
        args: [
          { part: "FIND(\"|\",A2)+1", meaning: "从第一个 | 后一位起（4）" },
          { part: "MID(", meaning: "固定取 11 位——手机号定长 11" },
        ],
        expect: "G3 显示 13800138000（中段 11 位手机号）",
      },
      {
        cell: "G4",
        formula: "=RIGHT(A2,LEN(A2)-FIND(\"|\",A2,FIND(\"|\",A2)+1))",
        display: "上海",
        args: [
          { part: "FIND(\"|\",A2,FIND(\"|\",A2)+1)", meaning: "带起始位的 FIND：定位第 2 个 |（15）" },
          { part: "RIGHT(", meaning: "从右取 LEN−15=2 个字符 → 上海（末段不定长，用 LEN 差）" },
        ],
        expect: "G4 显示 上海（第 2 个 | 之后的末段）",
      },
    ],
    checks: [
      { cell: "G2", formula: "=LEFT(A2,FIND(\"|\",A2)-1)", value: "张三" },
      { cell: "G3", formula: "=MID(A2,FIND(\"|\",A2)+1,11)", value: "13800138000" },
      { cell: "G4", formula: "=RIGHT(A2,LEN(A2)-FIND(\"|\",A2,FIND(\"|\",A2)+1))", value: "上海" },
    ],
    oneLiner: "文本拆分三件套：FIND 定位分隔符、LEFT/MID/RIGHT 按位截取——'张三|手机|上海'一条记录拆成三个可筛选字段。",
    explain: "就像 SQL：SPLIT(col, '|') 的手工版——先 FIND 找位置，再按位置 LEFT/MID/RIGHT 截。",
    outro: "总结：FIND 是拆分基准、定长用 MID、不定长用 LEN 差配 RIGHT——三招拆完管道数据。",
    scenario: "客户系统导出的姓名/手机/地区挤在一列（| 分隔）：三步拆成独立字段，每步都能回读核对。",
    note: "原六步的'TEXT 生成月份'环节因引擎边界（TEXT 格式串偏差）记 blocked（见 #14 留言）——本课聚焦拆分三件套，注册日期列已备好供后续。",
    seedNote: "A 类场景课（3 块 12 步；TEXT 环节 blocked 记档）；素材 docs/excel/05-workspace-lessons/13-text-date.md。",
    label: "姓名",
  },
];

/* ---------- 4 步/块展开（图表块支持） ---------- */
function expandGuide(blocks) {
  const guide = [];
  let step = 0;
  for (const b of blocks) {
    if (b.chart) {
      guide.push({ step: ++step, cell: b.cell, menu: "选中数据区（含表头）", formula: b.formula, expect: b.cell + " 被选中（数据区高亮）" });
      guide.push({ step: ++step, cell: b.cell, menu: "插入 → 折线图", formula: b.formula, expect: "图表菜单展开，折线图入口可见" });
      guide.push({ step: ++step, action: "chart", cell: b.cell, menu: "点击折线图", formula: "月份(横轴)→销售额(纵轴)", expect: b.expect });
      guide.push({ step: ++step, action: "chart", cell: b.cell, menu: "读图", formula: "月份(横轴)→销售额(纵轴)", expect: b.read || b.expect });
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
    $comment: `L2 A 类场景课（${L.seedNote}）公式已过 HyperFormula 终验探针（aclass-gen 程序化生成）。字段语义见 skill/excel-tutorial-maker/references/contract-schema.md`,
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
      return `### 第 ${k + 1} 块 · 跨表趋势图\n\n5. 看参考表数据源；\n6. 插入 → 折线图；\n7. 点击折线图——画布渲染；\n8. 读图。`;
    }
    return `### 第 ${k + 1} 块 · ${b.cell}（${b.label || ""}）\n\n1. 选中 ${b.cell}；\n2. 输入 \`${b.formula}\`；\n3. 回车确认，${b.expect}；\n4. 选中 ${b.cell} 查看编辑栏。\n\n${argBullets}`;
  }).join("\n\n");
  const sheetSections = L.sheets2
    ? L.sheets2.map((s) => `**${s.name}**（副表）：\n\n${cellsTable(s.cells)}\n`).join("\n")
    : "";
  return `# ${L.title}

> seed——契约 \`${L.id}.json\` 的来源原文。${L.seedNote}（aclass-gen 程序化生成，公式已过探针）。

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
  console.log(`✓ ${L.id}: ${c.guide.length} 步契约+seed 落盘（${c.data.sheets.length} 表）`);
}
console.log("═".repeat(60));
