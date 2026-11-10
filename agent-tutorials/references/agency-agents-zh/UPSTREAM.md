# 上游版本追踪

记录本项目对应的上游 [agency-agents](https://github.com/msitarzewski/agency-agents) 版本，方便同步更新。

## 当前状态（2026-10-21 核对）

- **上游仓库**：https://github.com/msitarzewski/agency-agents
- **同步基线**：2026-10-20，上游 [`4e3ac3c`](https://github.com/msitarzewski/agency-agents/tree/4e3ac3c)（此前为 2026-10-19 的 `652b269`、2026-06-16 的 `3f78a30`）。
- **本地实际角色数**：**328**，其中目录标注翻译 **261**、原创 **67**。来源分类以 [AGENT-LIST.md](AGENT-LIST.md) 为准，不等同于当前上游覆盖数。
- **覆盖状态**：路径层面已追平 `4e3ac3c`，上游自 `3f78a30` 以来对同名角色的改动均已同步。但 2026-10-20 按代码块逐个比对时发现，部分译文早于 `3f78a30`，本就落后于当时的上游，按"基线之后的改动"同步时漏不出来；清单与处理进度见 [差异审计](UPSTREAM-AUDIT.md)。上游的 README、CONTRIBUTING 与 integrations 文档按本地项目自行维护，不逐字同步。
- **遗留事项**：`engineering/engineering-security-engineer.md` 与 `engineering/engineering-threat-detection-engineer.md` 在上游已改名迁入 `security/`，本地新旧两份并存。暂时保留旧文件并在开头注明新路径。Agency Orchestrator 的 5 个中文工作流已在 AO 提交 `1168eb4` 中改用新路径（尚未发版）；`en/pr-review.yaml` 用的是 AO 随包的英文角色库，仍引用旧路径，与本仓库无关。待 AO 带着新路径发版、旧版本基本不再使用后，再删除这两个旧文件。
- **本次完成**：根据 [issue #97](https://github.com/jnMetaCode/agency-agents-zh/issues/97) 标题补充嵌入式算法、嵌入式应用两个原创角色；同步简繁 README、名单、速查表与包描述，修正部门和来源计数，并将计数检查接入 CI。

## 翻译覆盖

| 本地来源分类 | 数量 |
|-------------|------|
| 翻译 | 261 |
| 原创 | 67 |
| **合计** | **328** |

新增或改名的上游角色需要先检查路径映射与职责重叠，再决定翻译、合并或保留本地原创。不能只比较上下游总数判断是否同步。

### 上下游路径差异（已映射）

下列 5 个上游 agent 在本地以不同文件名存在，已映射不算缺失：

| 上游路径 | 本地路径 |
|---------|---------|
| `engineering/engineering-china-network-engineer.md` | `engineering/engineering-network-engineer-china.md`（本地原创，需比较正文） |
| `marketing/marketing-bilibili-content-strategist.md` | `marketing/marketing-bilibili-strategist.md` |
| `specialized/customer-service.md` | `support/support-support-responder.md`（拆分） |
| `specialized/sales-outreach.md` | `sales/sales-outbound-strategist.md` |
| `specialized/supply-chain-strategist.md` | `supply-chain/supply-chain-strategist.md` |

## 中国市场原创智能体

本项目除翻译外，包含 67 个针对中国市场原创的智能体（小红书/抖音/微信/B站/快手/微博/飞书/钉钉/百度SEO/政务ToG/医疗合规/高考志愿/留学规划/Qt 上位机/养殖档案核对等）。

完整列表见 [AGENT-LIST.md](./AGENT-LIST.md) 中标记为 `原创` 的条目。

## 本地额外目录

下列目录是本地扩展部门（是否出现在当前上游需随同步重新核实）：

- `hr/` — 招聘专家、绩效管理专家（2 个）
- `legal/` — 合同审查专家、制度文件撰写专家（2 个）
- `supply-chain/` — 库存预测/供应商评估/物流路线优化及供应链策略（5 个）

## 同步说明

- 跟踪上游 `main` 分支
- 新增的上游智能体会逐步翻译
- 上游如果有大的结构调整（目录重命名等），一周内同步
- 上游版本号每次同步后由维护者更新本文件

## 2026-10-17 第二批内容更新

新增 4 个上游角色的中文精编版，保留职责、规则、工作流与验收要点，并补充本地验证场景。不是逐行全文翻译；本批不改变历史全库同步基线。来源按本次读取的上游 main 页面记录，未取得不可变 commit，后续仍需固定版本复核。

| 本地文件 | 上游来源 |
|----------|----------|
| `engineering/engineering-rag-pipeline-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-rag-pipeline-engineer.md) |
| `engineering/engineering-identity-access-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-identity-access-engineer.md) |
| `engineering/engineering-payments-billing-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-payments-billing-engineer.md) |
| `testing/testing-test-automation-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-test-automation-engineer.md) |

## 2026-10-17 起第三至十八批完整翻译

逐段完整翻译 45 个上游角色（保留代码示例，注释译为中文；省略本地不使用的 `vibe` 字段）。`ats-validator-architect` 原文中的葡萄牙语示例（评分表用词与导出提示词）已译为中文；`product-dx-engineer` 中作为英文 API 示例的错误信息保留英文原文，并附中文释义；`gaussdb-expert` 原文连接示例中缺失的主机、密码、数据库名占位符（疑被当作 HTML 标签吞掉）已补为中文占位符；`network-engineer`（国外厂商设备）开头增加了指向本地原创国内网络工程师的说明；`healthcare/` 三个角色开头增加了适用范围说明（海外监管语境、不提供医疗/法律建议），英文的 doctor/clinician/provider 用语约定改写为中文的"医生/临床工作者/医疗服务提供方"，两个禁用破折号的角色在中文正文中同样不使用破折号；`section-508-specialist` 与 `uswds-developer` 开头注明仅适用于美国联邦/公共部门语境（国内无障碍可参照 GB/T 37668），USWDS 规定必须原样显示的官方横幅等界面文字保留英文；`focus-music-architect` 中给 Suno/Udio 的提示词保留英文，并在开头注明双耳节拍等神经声学效果证据仍有争议、不提供医疗建议；`aging-parent-care-companion` 的急救与危机热线处同时标出中国大陆号码（120、12356），`fedramp-rmf-compliance` 开头注明文中项目状态与日期以原文撰写时为准、需核实最新状态。原文固定于上游 commit [`652b269`](https://github.com/msitarzewski/agency-agents/tree/652b2692f8d8ec2b1f1a38e559073e287dfdc469)，可按此版本复核。

| 本地文件 | 上游来源 |
|----------|----------|
| `engineering/engineering-desktop-app-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-desktop-app-engineer.md) |
| `security/security-ai-generated-code-auditor.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/security/security-ai-generated-code-auditor.md) |
| `security/security-secrets-credential-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/security/security-secrets-credential-engineer.md) |
| `engineering/engineering-api-platform-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-api-platform-engineer.md) |
| `engineering/engineering-database-reliability-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-database-reliability-engineer.md) |
| `engineering/engineering-platform-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-platform-engineer.md) |
| `engineering/engineering-developer-tooling-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-developer-tooling-engineer.md) |
| `engineering/engineering-finops-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-finops-engineer.md) |
| `engineering/engineering-privacy-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-privacy-engineer.md) |
| `engineering/engineering-i18n-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-i18n-engineer.md) |
| `engineering/engineering-knowledge-graph-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-knowledge-graph-engineer.md) |
| `engineering/engineering-search-relevance-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-search-relevance-engineer.md) |
| `engineering/engineering-llm-post-training-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-llm-post-training-engineer.md) |
| `engineering/engineering-realtime-collaboration-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-realtime-collaboration-engineer.md) |
| `engineering/engineering-webassembly-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-webassembly-engineer.md) |
| `engineering/engineering-video-streaming-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-video-streaming-engineer.md) |
| `engineering/engineering-mobile-release-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-mobile-release-engineer.md) |
| `engineering/engineering-data-visualization-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-data-visualization-engineer.md) |
| `engineering/engineering-iot-fleet-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-iot-fleet-engineer.md) |
| `engineering/engineering-rust-refactoring-specialist.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-rust-refactoring-specialist.md) |
| `engineering/engineering-pdf-engine-architect.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-pdf-engine-architect.md) |
| `engineering/engineering-universal-document-compiler.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-universal-document-compiler.md) |
| `engineering/engineering-ats-validator-architect.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-ats-validator-architect.md) |
| `design/design-ui-finish-gate-reviewer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/design/design-ui-finish-gate-reviewer.md) |
| `marketing/marketing-developer-community-builder.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/marketing/marketing-developer-community-builder.md) |
| `product/product-dx-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/product/product-dx-engineer.md) |
| `engineering/engineering-network-engineer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-network-engineer.md) |
| `engineering/engineering-gaussdb-expert.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-gaussdb-expert.md) |
| `engineering/engineering-wordpress-performance.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-wordpress-performance.md) |
| `engineering/engineering-drupal-performance.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-drupal-performance.md) |
| `research/research-synthesist.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/research/research-synthesist.md) |
| `healthcare/healthcare-clinical-evidence-agent.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/healthcare/healthcare-clinical-evidence-agent.md) |
| `healthcare/healthcare-innovation-strategist.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/healthcare/healthcare-innovation-strategist.md) |
| `healthcare/healthcare-sovereign-health-systems-agent.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/healthcare/healthcare-sovereign-health-systems-agent.md) |
| `engineering/engineering-section-508-specialist.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-section-508-specialist.md) |
| `engineering/engineering-servicenow-developer-mentor.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-servicenow-developer-mentor.md) |
| `engineering/engineering-uswds-developer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/engineering/engineering-uswds-developer.md) |
| `specialized/resume-tailor.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/specialized/resume-tailor.md) |
| `specialized/specialized-master-plan-architect.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/specialized/specialized-master-plan-architect.md) |
| `specialized/specialized-codebase-archaeologist.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/specialized/specialized-codebase-archaeologist.md) |
| `academic/academic-statistician.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/academic/academic-statistician.md) |
| `game-development/economy-designer.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/game-development/economy-designer.md) |
| `specialized/specialized-focus-music-architect.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/specialized/specialized-focus-music-architect.md) |
| `specialized/healthcare-aging-parent-care-companion.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/specialized/healthcare-aging-parent-care-companion.md) |
| `specialized/specialized-fedramp-rmf-compliance.md` | [上游原文](https://github.com/msitarzewski/agency-agents/blob/652b2692f8d8ec2b1f1a38e559073e287dfdc469/specialized/specialized-fedramp-rmf-compliance.md) |

## 2026-10-21 四个精编版补全

第二批四个精编版已恢复完整章节与代码示例，并保留本地验收说明。原文 blob 与固定 `652b269` 树匹配，至 `4e3ac3c` 未变；来源及验证结果见 [审计记录](UPSTREAM-AUDIT.md)。角色总数不变。

| 本地文件 | 上游 Git blob（校验原文，不是中文文件哈希） |
|----------|------------------------------------------|
| `engineering/engineering-identity-access-engineer.md` | `51c01ce994e46ccfc29d51b093acf9a8d77f50a8` |
| `engineering/engineering-payments-billing-engineer.md` | `4ffffc09e63586aced1c715607d11bf6eb13b036` |
| `engineering/engineering-rag-pipeline-engineer.md` | `6f468dc0fd516ed825966de2d0bd6af2247e2d7d` |
| `testing/testing-test-automation-engineer.md` | `59650291b60ed280f8f5d5da69f15fec2aea3dca` |
