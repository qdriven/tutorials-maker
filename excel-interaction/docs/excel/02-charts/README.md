# 02 · 8 类图表

> 8 类图表各回答一类问题：看趋势、比类别、做排名、看占比、找关系、看分布、量率同看、看构成变化。

来源：`src/data/course.ts` 中的 `chartLessons`。每个图表回答一类问题：看趋势、比类别、做排名、看占比、找关系、看分布、量率同看、看构成变化。每篇文档给出问题、数据要求、适用与误用场景、Excel 操作路径、示例数据与读图结论。

| 图表 | 用途 | 文档 |
| --- | --- | --- |
| 折线图 | 看趋势 | [01-line.md](01-line.md) |
| 簇状柱形图 | 比类别 | [02-column.md](02-column.md) |
| 条形图 | 做排名 | [03-bar.md](03-bar.md) |
| 饼图／环形图 | 看占比 | [04-pie.md](04-pie.md) |
| XY 散点图 | 找关系 | [05-scatter.md](05-scatter.md) |
| 直方图 | 看分布 | [06-histogram.md](06-histogram.md) |
| 组合图 | 量率同看 | [07-combo.md](07-combo.md) |
| 堆积柱形图 | 看构成变化 | [08-stacked.md](08-stacked.md) |

## 🎯 本课重点

- **重点用什么**：插入 → 图表菜单（折线图、簇状柱形图、簇状条形图、饼图／圆环图、XY 散点图、统计图表 → 直方图、组合图、堆积柱形图）
- **完成什么**：能为“趋势／类别／排名／占比／关系／分布／量率／构成”这 8 类问题各选对一张图，并用配套数据做出图表、写出读图结论

## 📦 配套数据

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 折线图示例数据 | [chart-line/chart.csv](../data/lessons/chart-line/chart.csv) | 6 行 × 2 列 | 折线图的趋势与拐点 |
| 柱形图示例数据 | [chart-column/chart.csv](../data/lessons/chart-column/chart.csv) | 4 行 × 2 列 | 簇状柱形图的类别比较 |
| 条形图示例数据 | [chart-bar/chart.csv](../data/lessons/chart-bar/chart.csv) | 5 行 × 2 列 | 条形图的销售额排名 |
| 饼图示例数据 | [chart-pie/chart.csv](../data/lessons/chart-pie/chart.csv) | 2 行 × 2 列 | 饼图／环形图的渠道占比 |
| 散点图示例数据 | [chart-scatter/chart.csv](../data/lessons/chart-scatter/chart.csv) | 10 行 × 2 列 | XY 散点图的折扣与毛利率关系 |
| 直方图示例数据 | [chart-histogram/chart.csv](../data/lessons/chart-histogram/chart.csv) | 5 行 × 2 列 | 直方图的分箱分布 |
| 组合图示例数据 | [chart-combo/chart.csv](../data/lessons/chart-combo/chart.csv) | 6 行 × 3 列 | 组合图的销售额与利润率 |
| 堆积柱形图示例数据 | [chart-stacked/chart.csv](../data/lessons/chart-stacked/chart.csv) | 3 行 × 3 列 | 堆积柱形图的线上／门店构成 |

数据说明：8 个 CSV 与 `src/data/course.ts` 中 `chartLessons` 的 `data` 字段一一对应，示例数据与 [../01-learning-path/README.md](../01-learning-path/README.md) 的教学订单一致（月度、地区、商品、渠道汇总），每份 CSV 都是“表头 + 数据行”的扁平结构。

## 🧱 基础操作

1. **先按问题类型选图**：趋势用折线图，比类别用簇状柱形图，排名用条形图，占比用饼图／环形图，找关系用 XY 散点图，看分布用直方图，量率同看用组合图，看构成变化用堆积柱形图。
2. **确认数据要求**：折线图要有序时间字段＋数值系列；柱形图要少量离散类别＋数值；条形图要已排序类别＋数值；饼图要单一系列、非负值、合计为 100%；散点图每行两个数值变量；直方图要连续数值字段并明确分箱；组合图要共享类别轴且两个指标单位不同；堆积图要有序类别＋多个非负构成系列。
3. **注意误用边界**：类别没有自然顺序不要硬连成线；类别太多或文字太长改用横向条形图；需要精确比较相近类别时排序条形图更清楚；相关不等于因果；分箱宽度会改变解读；双轴可能制造虚假相关；非底层堆积系列没有共同基线。
4. **Excel 插入路径**：插入 → 折线图／簇状柱形图／簇状条形图／饼图或圆环图／XY 散点图／统计图表 → 直方图／组合图（柱形＋折线）／堆积柱形图。
5. **统一读图习惯**：读图时先看横轴与系列口径，再看数据点与趋势，最后把结论写成一句话，对应每篇文档里的“读图结论”。

## 🛠 实战操作

1. 按上表把 8 份 CSV 各自下载到本地，用 Excel 打开（编码选 UTF-8，逗号分隔）。
2. 逐篇打开对应文档，用“本课重点”里的 Excel 路径插入图表，用“实战操作”里的步骤核对系列与坐标轴。
3. 每张图都要落到一句可验证的结论，例如折线图的“6 月达到 ¥2,190，连续第三个月上升”、饼图的“线上占 64.5%”。
4. 图表操作练习见 [../05-workspace-lessons/](../05-workspace-lessons/) 中的 `02-luke-charts` 与 `06-maf-charts`。

## 相关内容

- 选图原则见学习路径第 5 步：[../01-learning-path/05-visualize.md](../01-learning-path/05-visualize.md)
- 示例数据与 [../01-learning-path/README.md](../01-learning-path/README.md) 的教学订单一致（月度、地区、商品、渠道汇总）。图表操作练习见 [../05-workspace-lessons/](../05-workspace-lessons/) 中的 `02-luke-charts` 与 `06-maf-charts`。

## ✅ 总结

- 8 类图表各自对应一类问题：趋势、类别、排名、占比、关系、分布、量率、构成。
- 每类图都有明确的数据要求，先确认数据形态再选图。
- Excel 插入路径统一从“插入”菜单进入，双轴与分箱是最容易出问题的地方。
- 误用边界要记住：不要硬连线、不要用饼图做精确比较、相关不等于因果。
- 每张图都要写出一句可验证的读图结论。
