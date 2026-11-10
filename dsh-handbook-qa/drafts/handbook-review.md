---
template: doc
title: DeepSeek Harness Handbook 站点评价
subtitle: 证据纪律极强的运维手册；新手路径与体量是主要代价
file: dsh-handbook-review
cols: 3
source: sandbaseai/deepseek-harness-handbook v0.5.261
---
Lead: 定位是 operator field guide（运维现场手册），不是入门课程。最大差异化是证据纪律：每条版本敏感结论都钉住源码修订并区分观察与推断。

## A 总体定位与规模
```callout ok 结论
对「带着故障或选型问题来的人」，这是目前最好的 DeepSeek Harness 中文/英文资料源。
对「想系统学习 Agent runtime 的人」，它提供零件而非课程，需要自己组织阅读顺序。
```

```kv
维护方: SandBase 社区（非 DeepSeek 官方，声明清晰）
协议: Apache-2.0
权威内容: 173 篇英文 canonical 指南
本地化: 202 篇（zh-CN 深度最高，ja/ko/es 为导航级草稿）
排障章节: 104 篇，按症状组织
版本口径: rc.2（b150a551）+ alpha.1（cd5ef814），逐页标注
```

## B 引导方式：按目标路由，不按功能罗列
```flow
用户到达 -> {带着什么来?}
{带着什么来?} -> 想跑起来: 五分钟 quickstart
{带着什么来?} -> 想评估选型: Agent Harness Scorecard
{带着什么来?} -> 有故障: Failure Router 交互分诊
{带着什么来?} -> 想装环境: Install Doctor 生成分诊命令
```

- README 首屏是「Run / Evaluate / Debug」三列入口，直链到工具页。
- 「Start with your goal」表按任务路由：每行一个目标对应一条最短路径。
- 完整任务索引 100+ 行放进折叠块，不占首屏。
- 排障不靠搜索靠分诊：七层隔离顺序（Process → Persistence）先定第一个失效边界。

## C 证据纪律：与普通社区文档的分水岭
| 机制 | 状态 | 作用 |
|---|---|---|
| 逐页 frontmatter 标 `verified_at` 与 `content_revision` | ok | 页面会过期，但过期可见 |
| 版本敏感结论钉 commit SHA | ok | 读者可回到精确源码核对 |
| observed / source-verified / inferred / proposed 四级标注 | ok | 区分事实与提案，不混写 |
| 每篇给验收门槛（acceptance gates） | ok | 不是只给 happy path 复制粘贴 |
| CI 跑 `npm run check` 验证链接与清单 | ok | 内容有生产管线，非手工堆砌 |
| 症状表附「first evidence to collect」 | ok | 反重装哲学：先取证再动手 |

## D 内容组织：症状优先的零件库
- 15 个章节覆盖安装、架构、模式、插件、集成、运维、安全、排障。
- 单篇只解一个症状（如 Markdown 单波浪线渲染），不合并主题。
- 深度真实：session 存储格式、写入不变量、zstd 帧性能有源码级测量。
- 多语言诚实：不假装对等，翻译页声明自己的修订与评审状态。

## E 设计：克制的工程文档风
| 界面 | 状态 | 评价 |
|---|---|---|
| 站点首页（hero + 工具导航） | ok | 墨绿纸张风，信息密度与留白平衡 |
| Failure Router 交互页 | ok | 症状按钮 + 分步证据收集，纯前端可用 |
| GitHub README | warn | 489 行，首屏信息过载，靠折叠块救 |
| 三套界面（README / docs 源 / site 页） | warn | 同一内容三处呈现，维护成本与迷路风险 |

## F 弱点清单
| 弱点 | 状态 | 影响 |
|---|---|---|
| 无课程式学习路径 | no | 新手要自己拼 quickstart → what-is → architecture |
| README 体量与重复入口 | warn | 多张相似表格，首次到访者难判断从哪进 |
| 中文为机辅草稿待审 | warn | 中文读者深度不均，关键页仍需读英文 |
| star CTA 与商业链接穿插 | warn | 技术页内出现 SandBase 产品入口，有噪音 |
| 开发者预览导致内容快过期 | warn | 有 verified_at 缓解，但读者须自查日期 |
| 排障 104 篇离开 Router 难浏览 | warn | 分诊工具是刚需而非装饰 |

## G 怎么用最有效
```callout info 用法
故障进场先开 Failure Router，选最早可观察的症状，按它给的第一证据收集。
学习按 what-is → quickstart → architecture → tool pipeline 顺序读英文页。
选型看 Scorecard 与 field-status，不要只看包描述。
```

- 中文速览可配合本仓 `dsh-handbook-qa/` 九页问答，按学习线到排障线排列。
- 引用其结论时带上页面标注的修订号，不要脱离版本转述。
- 给它提 issue 的路径也是证据导向：要求带精确版本与首个失效边界。
