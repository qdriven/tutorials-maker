# chartref — 图表真对象基线（C 方案：ONLYOFFICE Document Builder，免 Docker）

**定位**：图表课的 QC 基线产出器。课页动画里的图表是**画布模拟渲染**（A 方案，
`templates/handsontable/chart-layer.js`，视觉正确、数据取自契约、可断言序列）；
本目录用 Document Builder 生成带**真 Excel 图表对象**的 xlsx，作为对照基准——
断言「图表存在、类型正确、数据序列 = 契约」不再只靠模拟层自证。

## 为什么不用 Docker docserver

Document Builder 是**单文件可执行程序**（Windows exe / Linux binary，免费），
命令行 headless 跑 `.docbuilder` 脚本（语法即 JS），秒级产出 xlsx——
**零 Docker、零常驻服务**，与仓库「零依赖出片」哲学一致。
Docker docserver（方案 B）只在需要「浏览器内交互真图表」时才需要（缓行，issue 跟踪）。

## 启用步骤（本机首次）

1. 下载 Document Builder：https://www.onlyoffice.com/download-builder.aspx（Windows .exe）
2. 安装后记下 `docbuilder.exe` 路径（默认 `%ProgramFiles%\ONLYOFFICE\Document Builder\docbuilder.exe`）
3. 生成基线：`docbuilder.exe scripts/chartref/line-chart.docbuilder`
4. 验收：`scripts/chartref/check-chartref.mjs`（断言 xlsx 内含 line 图表对象 + 数据序列）

## 文件

| 文件 | 说明 |
| --- | --- |
| `line-chart.docbuilder` | 折线图基线脚本（数据与 `courses/chart-line.json` 契约一致，末值 2190） |
| `line-chart.xlsx` | 脚本产物（gitignore：由脚本确定性再生，不入库） |
| `check-chartref.mjs` | 基线校验：xlsx 存在 + 内含 chart 对象（zip 结构断言，零依赖） |

## 边界（诚实口径）

- Document Builder 的 `AddChart` API 按官方文档编写，**未实测**（本机未装 Builder）；
  装好后跑一次脚本即为实测。若 API 有出入，以官方
  [Document Builder 文档](https://api.onlyoffice.com/docs/docbuilder/api/) 为准修订脚本。
- 课页内的图表**始终是模拟渲染**（画布），不因本基线而改变——基线只服务 QC 与
  「真图表对象长什么样」的对照，不给课页增加运行时依赖。
- 8 类图表 = 8 份 `.docbuilder` 脚本，按课程转写进度逐个补（折线图为试点）。
