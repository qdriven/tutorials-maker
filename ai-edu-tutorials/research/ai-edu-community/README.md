# AI + 互动教育（社区/教程/兴趣型）深度调研

**调研时间：** 2026-07-13
**核心问题：** AI + 互动教育方向，如何以非产品/非 SaaS 的社区/教程/兴趣型模式切入

本目录是清理后唯一存放该主题的目录。原先散落在仓库根目录、`research/`、`docs/research/` 的 20+ 个文件已全部并入此树下，并清除了 4 个完全重复副本。

## 先读什么

| 顺序 | 文件 | 用途 | 体量 |
|---|---|---|---|
| 1 | [`SUMMARY.md`](./SUMMARY.md) | **结论提炼**：7 条洞察 + 优先级 + 置信度 + 证据锚点 | 短 |
| 2 | [`ANALYSIS.md`](./ANALYSIS.md) | **结论分析**：结论落到本仓（ai-edu-tutorials）后的映射、差距与风险 | 中 |
| 3 | [`ACTIONS.md`](./ACTIONS.md) | **可执行操作**：分层动作、负责人、依赖、验收标准 | 中 |
| 4 | [`report/ai-edu-community-research-report.md`](./report/ai-edu-community-research-report.md) | 完整报告（15 章 + 334 条引用），论证过程 | 长（233 KB） |

## 目录结构

```text
ai-edu-community/
  README.md                # 本文件
  SUMMARY.md               # 结论提炼
  ANALYSIS.md              # 结论分析
  ACTIONS.md               # 可执行操作
  report/
    ai-edu-community-research-report.md      # ★ 权威报告（15 章，233 KB）
    ai-edu-community-research-report.docx   # 同内容 Word 版（217 KB）
  sources/                 # 原始素材与分析中间产物（不改结论先改这里）
    wide01.md .. wide05.md # 5 个宽口径探索（W1 开源生态 / W2 亲子共学 / W3 成人社区 / W4 商业模式 / W5 技术栈）
    dim_decomposition.md   # 10 个深度研究维度的分解
    cross_verification.md  # ★ 交叉验证：高/中/低置信度分级 + 4 处数据冲突
    insight.md             # ★ Phase 6 洞察提取（7 条洞察原文）
    charts/
      fig_sec01_global_ai_edu_market.png
    notes/                 # 第 10–15 章的原始调研笔记与撰写稿
      no_code_ai_edu.md / spanish_ai_edu.md / global_south_ai_edu.md
      civil_exam_ai.md / interactive_tools_ecosystem.md
      supplement_chapters_10_12.md / supplement_chapters_13_15.md
  drafts/                  # 已并入 report 的中间稿（归档备查，可不读）
    outline.md                 # 报告大纲
    plan-supplement.md         # 第 10–15 章的补充调研计划（已执行完毕）
    agent-final-ch1-9.md       # 第 1–9 章初稿（脚注按章重编号）
    renumbered-ch1-9.md        # 第 1–9 章脚注全局重编号稿（= report 的前 1150 行）
    chapters/sec01..sec09.md   # 第 1–9 章按章拆分的中间稿
    docx/base-ch1-9.docx       # 第 1–9 章 Word 稿（两个版本内容相同）
    docx/report-ch1-9.docx    # 同上
```

## 文件谱系（怎么读出来的）

```text
sources/wide01..05.md ──┐
sources/dim_decomposition ─┼─→ drafts/outline.md ──→ drafts/agent-final-ch1-9.md
sources/cross_verification ┤            （第1–9章，脚注按章重编号）
sources/insight.md ───────┘                 │
                              ┌──────────────┴──────────────┐
                              │                             │
              drafts/renumbered-ch1-9.md          drafts/chapters/sec01..09.md
              （脚注全局重编号）                    （按章拆分）
                              │
                              └──────────────┬──────────────┘
                                             ▼
sources/notes/supplement_chapters_10_12.md  ┐
sources/notes/supplement_chapters_13_15.md  ┼─→ report/…-research-report.md  ← 权威版
sources/notes/*（5 篇原始笔记）              ┘        │
                                                      ▼
                                          report/…-research-report.docx
```

**已核验的事实：**

- `renumbered-ch1-9.md` 的全文是 `report/…-research-report.md` 的**逐行前缀**（前 1150 行），后者在其后追加第 10–15 章。
- `agent-final-ch1-9.md` **不是**前缀 —— 它的脚注按章重新编号（最大 `[^22]`），合并成单篇时会冲突；`renumbered` 是它的脚注全局重编号修复版（最大 `[^117]`）。
- `chapters/sec01..09.md` 是 `agent-final` 的按章切片，内容与正式报告第 1–9 章一致，但脚注编号体系不同。
- `docx/base-ch1-9.docx` 与 `docx/report-ch1-9.docx` 提取正文后**完全相同**（46,461 字符），仅容器元数据不同；两者都只含第 1–9 章。
- 正式 `.docx` 提取正文 88,187 字符，含第 10–15 章，是当前唯一完整的 Word 版本。

## 清理记录

| 操作 | 对象 | 原因 |
|---|---|---|
| 移动 | 仓库根 11 个 `ai-edu-community*` 文件 | 根目录只放产品入口，调研物料归 `research/` |
| 移动 | `research/ai-edu-community_*` 8 个文件 | 与根目录同族文件合并 |
| 移动 | `docs/research/ai-edu-community-research-report.{md,docx}` | 归入本主题目录，`docs/research/` 只留架构相关研究 |
| 移动 | `docs/research/research_notes/` 7 个文件 | 第 10–15 章的原始笔记 |
| 移动 | `plan.md` | 该计划针对第 10–15 章补充调研，已执行完毕 |
| **删除** | `docs/research/…-report-final.md` | 与正式报告 **MD5 完全一致**（`906AE06F…`） |
| **删除** | `docs/research/…-report-final.docx` | 与正式 docx **MD5 完全一致**（`8632B221…`） |
| **删除** | `start-all.ps1` / `start-all.sh` | 仓库根的陈旧重复启动脚本：端口写 3000（现为 3230）、仓库路径写旧址 `D:\innate-works\projects\…`，且无任何引用；`start.sh` + `Taskfile.yml` 已完整覆盖 |
| 修正 | 4 个文件的相对链接 | 移动后图表与交叉验证引用路径失效，已改为 `../sources/…` |

删除项均通过可恢复回收站（mavis-trash）处理，未做永久删除。
