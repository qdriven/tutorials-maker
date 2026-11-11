// recipes-lib.mjs — landing 目录聚合逻辑（build-recipes.mjs CLI 与 new.mjs 生成钩子共用）。
// courses/*.json → src/data/recipes.json。零依赖。
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/* ---------- 占位卡：批量二/三的预告（转写自 docs/excel 文档，引擎白名单已探针验证） ---------- */
const PLACEHOLDERS = [
  { id: "xlookup", fn: "XLOOKUP", category: "查找引用", oneLiner: "XLOOKUP：拿一个值去一列里找，取回同一行另一列的值——比 VLOOKUP 少写列号。" },
  { id: "trim-clean", fn: "TRIM＋CLEAN", category: "文本清理", oneLiner: "TRIM＋CLEAN：去掉文本前后的空格和不可见字符，让查找和匹配不再失灵。" },
  { id: "index-match", fn: "INDEX＋MATCH", category: "查找引用", oneLiner: "INDEX＋MATCH：先找到在第几行，再取那一行的值——可以向左查，不受列序限制。" },
  { id: "iferror", fn: "IFERROR", category: "逻辑判断", oneLiner: "IFERROR：公式报错时返回兜底值——除零、查不到，都不再满屏 #N/A。" },
  { id: "text-format", fn: "TEXT", category: "文本清理", note: "引擎边界：HyperFormula 格式串与 Excel 有偏差（探针 0.0%→0.9%）——待 onlyoffice 引擎实测后转正", oneLiner: "TEXT：把数字按格式变成文本——1234.5 显示成 1,234.50，报表口径统一。" },
  { id: "concat", fn: "TEXTJOIN／&", category: "文本清理", note: "引擎边界：HyperFormula 不支持 TEXTJOIN（探针 #NAME?）——待 onlyoffice 引擎实测后转正", oneLiner: "TEXTJOIN：把多格文本连成一句，自动跳过空格和空值。" },
  { id: "chart-histogram", fn: "直方图", category: "图表选型", oneLiner: "直方图：看分布——连续数值分箱统计，看数据集中在哪一段。" },
  { id: "chart-combo", fn: "组合图", category: "图表选型", oneLiner: "组合图：量率同看——柱形管数量、折线管比率，双轴一图两读。" },
];

/* ---------- 合集（E 类场景：不新做课，串已有原子课 + 桥接叙事） ----------
 * sprint 第 4 节优先级：合集页零成本先验证"组合学习"需求真伪。 */
const COLLECTIONS = [
  {
    id: "col-lookup-lab",
    title: "查找实验三题",
    category: "查找引用",
    desc: "同一张商品表三种查找动作：向右查（VLOOKUP 列序号）→ 免列号（XLOOKUP 数组分离）→ 反查自由（INDEX＋MATCH）。",
    lessons: ["vlookup-basic", "xlookup", "index-match"],
  },
  {
    id: "col-conditional-sum",
    title: "条件汇总三件套",
    category: "条件求和",
    desc: "按条件算数的三板斧：SUMIFS 求和 → COUNTIFS 计数 → AVERAGEIF 求均——条件成对写，一套骨架。",
    lessons: ["sumifs", "countifs", "averageif"],
  },
  {
    id: "col-kpi-judge",
    title: "KPI 判定三件套",
    category: "逻辑判断",
    desc: "把数字变结论的三级判断：IF 单条件打标 → AND 多条件合判 → IFERROR 出错兜底。",
    lessons: ["if-mark", "and", "iferror"],
  },
];

/* ---------- 分类顺序（任务动词，菜谱式目录的组织轴） ---------- */
const CATEGORY_ORDER = ["查找引用", "求和统计", "条件求和", "条件统计", "计数统计", "逻辑判断", "文本清理", "图表选型", "其他"];

export function rebuild(root) {
  const COURSES = join(root, "courses");
  const OUT = join(root, "src", "data", "recipes.json");

  const files = readdirSync(COURSES).filter((f) => f.endsWith(".json")).sort();
  const byCat = new Map();
  let live = 0;

  for (const f of files) {
    const c = JSON.parse(readFileSync(join(COURSES, f), "utf8"));
    // 从契约投影 recipe 卡片：id/一句话/分类（可选字段）/视频路径（登记清单约定）
    const mp4 = `/src/standalone/public/showcase/${c.id}.mp4`;
    const item = {
      id: c.id,
      fn: c.fn || (function (t) {
        var head = String(t).split("：")[0] || c.id;
        var m = /^([A-Za-z0-9＋&]+) (.+)$/.exec(head);
        if (m && !/[一-鿿]/.test(m[1])) return m[1];
        return head;
      })(c.title),
      category: c.category || "其他",
      oneLiner: (c.summary && c.summary.oneLiner) || c.title,
      explain: (c.summary && c.summary.explain) || "",
      level: c.level || "初级",
      durationMin: c.durationMin || 4,
      status: "live",
      app: `/apps/${c.id}/index.html`,
      mp4: existsSync(join(root, mp4.replace(/^\//, ""))) ? mp4 : null,
    };
    live++;
    if (!byCat.has(item.category)) byCat.set(item.category, []);
    byCat.get(item.category).push(item);
  }

  /* 占位卡兜底：与在架课同 id 的占位自动丢弃（转正后预告即退役），避免目录双卡 */
  const liveIds = new Set();
  byCat.forEach((arr) => arr.forEach((r) => { if (r.status === "live") liveIds.add(r.id); }));
  const placeholders = PLACEHOLDERS.filter((p) => !liveIds.has(p.id));
  for (const p of placeholders) {
    if (!byCat.has(p.category)) byCat.set(p.category, []);
    byCat.get(p.category).push({ ...p, status: p.note ? "blocked" : "todo", app: null, mp4: null });
  }

  // 分类排序 + 组内排序：live 在前按 id，todo 在后按 id
  const categories = [...byCat.keys()]
    .sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    })
    .map((cat) => ({
      category: cat,
      recipes: byCat
        .get(cat)
        .sort((a, b) => (a.status === b.status ? a.id.localeCompare(b.id) : a.status === "live" ? -1 : 1)),
    }));

  /* 合集（E 类）：解析成员课为卡（仅 live 在架的成员；引用完整性由 check-recipes 校验）
   * liveIds 已在占位退役处构建（line ~82），直接复用 */
  const collections = COLLECTIONS.map((col) => ({
    id: col.id,
    title: col.title,
    category: col.category,
    desc: col.desc,
    lessons: col.lessons.filter((id) => liveIds.has(id)),
    missing: col.lessons.filter((id) => !liveIds.has(id)),
  }));

  const out = {
    $comment: "landing 目录聚合（scripts/landing/build-recipes.mjs 产物，勿手改）：courses/*.json 自动投影 + 占位卡 + 合集卡。重跑 node scripts/landing/build-recipes.mjs 上架新课。",
    generatedAt: new Date().toISOString().slice(0, 10),
    stats: { live, todo: placeholders.length, total: live + placeholders.length, collections: collections.length },
    categories,
    collections,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  return { live, todo: placeholders.length, out: OUT };
}
