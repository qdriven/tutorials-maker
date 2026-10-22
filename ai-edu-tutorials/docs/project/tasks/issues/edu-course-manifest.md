# Task log: edu-course-manifest

Issue：[`issues/edu-course-manifest.md`](../../issues/edu-course-manifest.md)

---

## 2026-07-10 - claude-code - opened

**做了：** 建 issue 与日志；规划 contract + TS schema + sample 三件产出。  
**证据：** -  
**未做：** 实际产出（待开工）。  
**给下一 Agent：** 先写 contract md，再落 TS 类型与校验器，最后 sample；sample 须能过校验器。  
**状态：** todo

---

## 2026-07-10 - claude-code - done

**做了：** contract course-manifest.md + course-manifest.ts（类型 + validateCoursePackage，无 zod）+ sample-course.ts（过校验）。
**证据：** commit f1d8168；bun run typecheck + cargo check 均 clean。
**给下一 Agent：** 下游 composer/quiz/io 已基于此实现。
**状态：** done
