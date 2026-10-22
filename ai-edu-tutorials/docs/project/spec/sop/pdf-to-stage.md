# SOP: PDF -> verifiable Stage

**Issue:** [edu-agent-sop-pdf2stage](../../issues/edu-agent-sop-pdf2stage.md)  
**Contract:** [course-manifest](../contracts/course-manifest.md)  
**Goal (MVP #5):** 从一份 PDF 可复现地产出能过 `validateCoursePackage()` 的 `scenes[]`。

## 输入

- 一份 PDF（MVP：STEM 短课，≤30 页），路径写入 `meta.sourcePdf`。
- （由执行 Agent 现场决定）一个 LLM，用于把段落转成场景草稿。

## 输出

- `CoursePackage`，至少含：
  - `meta`：标题/受众/时长/来源 PDF。
  - `roles`：1 teacher + 1 peer（可扩）。
  - `scenes`：≥2 个场景，覆盖 `slide` + `interactive`（+ 可选 `pbl`）。
  - `quizzes`：≥1 个 quiz，含 `choice` + `open`（+ 可选 `task`）。
  - `mastery`：≥1 检查点。

## 工序（pipeline）

1. **抽取文本** - 用 OpenMAIC 现有 PDF provider（`unpdf` 优先；扫描件用 `MinerU`）。把抽取结果（段落 + 章节结构）记入 `notes/baselines/openmaic.md` 的 "Sample PDF" 段。**不要**在本仓自写 PDF 解析。
2. **切块** - 按章节/小节切成教学单元；每个单元映射到 1 个 `slide` 场景（标题 + 正文要点）。
3. **生成场景草稿** - 对每个单元产出：
   - 1 个 `slide`：`title` = 小节标题，`body` = 要点（markdown，≤200 字）。
   - 选择性插 1 个 `interactive`：用 peer 角色抛出该单元的典型 misconception，`expectedOutcome` 写明澄清点。
   - 末尾或重点单元插 1 个 `pbl`：`task` 引用原文练习或自造。
4. **配角色** - teacher 的 `persona` 对齐 PDF 语气；peer 的 `openingLine` 点出第 1 个 misconception。`roleIds` 必须引用已定义角色。
5. **配题** - 每个重点场景挂 1 个 `quiz`：
   - `choice`：4 选项，`correctIndex` 对，附 `explanation`。
   - `open`：`rubric` 写明判分点，`referenceAnswer` 可选。
   - `task`：`roleIds` 含 peer，`gradingNotes` 写明。
   - `passThresholdPct` 建议 60–70。
6. **设掌握度** - `mastery` 一个检查点，`quizIds` 覆盖所有 quiz，`requiredPct` 70。
7. **校验** - 跑 `validateCoursePackage(pkg)`。**必须** `ok: true` 才算完成。

## 校验点（逐条对照 contract）

- [ ] `schemaVersion === 1`
- [ ] `roles` ≥1 teacher + ≥1 peer，`id` 唯一
- [ ] 每个 `scene.roleIds` 引用存在的 `role.id`
- [ ] `scene.kind` 与 content 字段一致（slide→slide，interactive→interactive，pbl→pbl）
- [ ] `quiz.sceneId`（若有）引用存在的 `scene.id`
- [ ] `choice` 题 `options.length ≥ 2` 且 `correctIndex` 在范围内
- [ ] `mastery[].quizIds` 都引用存在的 `quiz.id`
- [ ] 所有 `passThresholdPct` / `requiredPct` ∈ [0,100]

## 失败处理

- **PDF 抽取失败** - 切换 provider（unpdf ↔ MinerU）；仍失败则在 baseline 笔记记失败点，降级为手工粘贴文本。
- **LLM 草稿字段缺失** - 以校验器错误路径为准，逐条补齐；不要放宽 schema。
- **场景数 <2** - 至少把「概念 + 互动」拆成两幕。

## 端到端示例（节选）

输入段落（PDF 摘录）：

> Newton's second law: F = ma. Net force equals mass times acceleration. A 2 kg cart under 6 N accelerates at 3 m/s².

产出（对齐 `desktop/src/lib/sample-course.ts`）：

```json
{
  "id": "scene-slide-recap",
  "title": "Recap: what is F = ma",
  "kind": "slide",
  "roleIds": ["teacher", "peer"],
  "slide": { "title": "F = ma", "body": "Net force = mass × acceleration.\n- F in N\n- m in kg\n- a in m/s^2" }
}
```

对应 quiz（`quiz-cart`）含 choice（6 N / 2 kg → ?）+ open（力翻倍会怎样）。该样例**已过** `validateCoursePackage()`。

## 落点

- SOP 本文件。
- （可选）`desktop/src/lib/pdf2stage.ts`：纯函数 `outlineToScenes(outline)` 便于 Agent 复用与单测；不强求 LLM 在内。
