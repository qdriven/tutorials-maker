# Task log: edu-agent-sop-pdf2stage

Issue：[`issues/edu-agent-sop-pdf2stage.md`](../../issues/edu-agent-sop-pdf2stage.md)

---

## 2026-07-10 - claude-code - opened

**做了：** 建 issue 与日志。  
**证据：** -  
**未做：** -  
**给下一 Agent：** manifest 落地后写 SOP；示例须真实可校验。  
**状态：** todo

---

## 2026-07-10 - claude-code - done

**做了：** spec/sop/pdf-to-stage.md：工序 + 校验点 + 端到端示例（对齐 sample-course）。
**证据：** commit f1d8168；bun run typecheck + cargo check 均 clean。
**给下一 Agent：** 可选：pdf2stage.ts outlineToScenes 纯函数。
**状态：** done
