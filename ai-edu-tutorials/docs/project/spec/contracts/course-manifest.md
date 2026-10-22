# Contract: course-manifest

**Version:** v1.0  
**Date:** 2026-07-10  
**Parties:** Composer（生产）↔ Quiz Builder（增广）↔ Import/Export（序列化）↔ Runtime（消费）  
**Issues:** edu-course-manifest, edu-roles-config, edu-course-composer-v1, edu-quiz-builder-v1, edu-course-import-export, edu-sample-course, edu-agent-sop-pdf2stage

## 提供方承诺（Composer / IO）

Composer 产出符合本 schema 的 `CoursePackage` 对象；IO 以 `.edu-course.json` 文件序列化/反序列化同一对象。`schemaVersion` 必须 = `1`。

```ts
type CoursePackage = {
  schemaVersion: 1
  meta: {
    id: string
    title: string
    description: string
    audience: string
    durationMinutes: number
    sourcePdf?: string
    version: string
  }
  roles: Role[]            // ≥1 teacher + ≥1 peer（MVP #3）
  scenes: Scene[]          // 顺序即播放顺序
  quizzes: Quiz[]          // 可挂在 scene 或课程末
  mastery: MasteryCheckpoint[]
}

type Role = {
  id: string
  name: string
  kind: "teacher" | "peer" | "ta"
  persona: string
  openingLine?: string
}

type Scene = {
  id: string
  title: string
  kind: "slide" | "interactive" | "pbl"
  roleIds: string[]        // 必须引用 roles[].id
  slide?: SlideContent        // kind="slide" 时必填
  interactive?: InteractiveContent  // kind="interactive" 时必填
  pbl?: PblContent            // kind="pbl" 时必填
  quizId?: string             // 可选，引用 quizzes[].id
}

type Quiz = {
  id: string
  sceneId?: string         // 课程末测验可省略
  title: string
  questions: Question[]
  passThresholdPct: number // 0..100
}

type Question =
  | { id: string; kind: "choice"; prompt: string; options: string[]; correctIndex: number; points: number; explanation?: string }
  | { id: string; kind: "open"; prompt: string; rubric: string; referenceAnswer?: string; points: number }
  | { id: string; kind: "task"; prompt: string; roleIds: string[]; gradingNotes: string; points: number }

type MasteryCheckpoint = {
  id: string
  label: string
  quizIds: string[]        // 引用 quizzes[].id
  requiredPct: number      // 0..100
}
```

`SlideContent` / `InteractiveContent` / `PblContent` 细节见 `desktop/src/lib/course-manifest.ts`。

## 消费方需求

| 消费方 | 用到的字段 |
|---|---|
| Quiz Builder | `quizzes[].questions`、`passThresholdPct`；回写 `mastery` |
| Runtime（壳内播放） | `scenes` 顺序、`roleIds`、`slide/interactive/pbl` 内容 |
| Import/Export | 整对象序列化；导入必须过 `validateCoursePackage()` |
| pdf2stage SOP | 输出 `scenes[]`，对齐 `Scene` 结构 |

## 校验规则（validateCoursePackage）

1. 顶层 `schemaVersion === 1`。
2. `meta` 各字段非空；`durationMinutes > 0`。
3. `roles` 至少 1 个 `teacher` + 1 个 `peer`；`id` 唯一。
4. `scenes` 每个 `roleIds` 都引用存在的 `role.id`；`kind` 与对应 content 字段一致。
5. `quizzes` 每个 `sceneId`（若有）引用存在的 `scene.id`；`passThresholdPct ∈ [0,100]`。
6. `mastery[].quizIds` 都引用存在的 `quiz.id`。
7. `Question` 按 `kind` 校验必填字段（choice 需 `options` 与合法 `correctIndex`）。

## 示例

见 `desktop/src/lib/sample-course.ts`（`SAMPLE_COURSE`），过校验器。

## 变更记录

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2026-07-10 | 初稿：meta/roles/scenes/quizzes/mastery + 校验规则 |
