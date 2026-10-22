# Baseline: DeepTutor

**Status:** runbook ready - run pending (env-gated)  
**Repo:** `D:\copy-modify\ai-edu\DeepTutor`  
**Issue:** [edu-baseline-deeptutor](../../docs/project/issues/edu-baseline-deeptutor.md)

> 这些步骤需要开发机 + DeepTutor（pip 包或源码仓）。实跑后回填空字段，并与 OpenMAIC 同材料对照。

## 前置

- Python 3.x
- DeepTutor：`pip install deeptutor` 或源码仓 `D:\copy-modify\ai-edu\DeepTutor`
- 确认 `deeptutor` 在 PATH：`deeptutor --version`

> `edu-deeptutor-hook` 的 Rust 命令 `run_deeptutor_chat` 直接 `Command::new("deeptutor")`，所以 CLI 必须在 PATH。实跑后若真实子命令不同（如 `deeptutor chat` 而非 `deeptutor run chat`），回填并据此改 `lib.rs`。

## 建 KB + chat（与 OpenMAIC 同一份 PDF）

```powershell
cd D:\copy-modify\ai-edu\DeepTutor
# 或任意工作目录
deeptutor kb create <name> --doc <sample.pdf>
deeptutor run chat "Explain the main idea of the document" --kb <name>
```

## Same material as OpenMAIC

- PDF path: _(填：与 openmaic.md 同一份 PDF)_
- KB name: _(填)_
- Chat result: _(贴关键回答 / 是否可复现)_
- Optional mastery_path: _(若有 mastery 子命令，记录)_

## CLI 子命令实况（供 edu-deeptutor-hook 对齐）

实跑后确认真实子命令，列出：

- 建 KB: `deeptutor kb create ...` ? _(待确认)_
- chat: `deeptutor run chat ... --kb ...` ? _(待确认)_
- mastery: _(若有)_

## Diff vs OpenMAIC (≤5)

1. _(待填：定位差异 - 课堂 vs KB 问答)_
2. _(待填：交互形态)_
3. _(待填：评分/掌握度能力)_
4. _(待填：对 PDF 的依赖与抽取方式)_
5. _(待填：集成成本)_
