# phase-6 · task-06 · task（步骤讲解入片 + 展示层去分步，用户 task-18）

## 背景（用户反馈原文）

> 有了视频其实不需要分解步骤了。分解步骤不如直接放到视频里面，请修复，并且把分解步骤可以加入到视频。
> 还有一问题是视频没有声音。

三点：① 展示页的「分步讲解」与视频重复——**撤掉**；② 分步讲解内容**直接放进视频**
（步骤卡随动画同步展示）；③ **视频没有声音**——修。

## 做什么

1. **展示层去分步讲解**：showcase 文章六节 → 五节（概览 → 动画演示 → 动手练习 → 总结 →
   如何构建），本课目录同步；步骤内容不再页面罗列。
2. **步骤卡烧进视频**（render-video 默认开，`--no-ass` 关）：每个动作段悬浮一张讲解卡——
   金色表头「第 N 步 · 单元格 · 菜单」+ 公式原文 + 参数逐位行（首个公式步，取契约
   formulaArgs）+ 预期；口播期间常驻，intro/outro 不叠（画面已有总结卡）。
   数据单源：plan.steps + 契约 formulaArgs（plan.config）。
3. **视频有声**：mp4 音轨本身正常（volumedetect mean -20.6dB）——根因是展示页
   `<video autoplay muted>` 静音起播后**没解除静音**；改为 `playing` 事件即 `muted=false`
   （静音只用来过 autoplay 策略）。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `scripts/recorder/render-video.mjs` | `buildStepCards`（ASS 步骤卡，默认烧入）；`--no-ass`；合成 cwd=workDir 绕盘符转义坑 |
| `src/standalone/showcase.js` | 删「分步讲解」节/目录项；video playing 即解除静音 |
| `src/data/tutorials.json` | demo 描述随 upsert 更新（+步骤讲解卡） |

## 验证点

1. 双课视频各 **4 张步骤卡**入片，抽帧可见（金头/公式/参数 1-4/预期），时长仍 <30s、漂移 <5%。
2. 展示文章五节固定、`#sec-steps` 不存在；步骤内容在视频内可读。
3. 展示页视频 **muted:false + paused:false**（有声自动播）；mp4 音轨 volumedetect 有声。
4. `pnpm verify` 全绿。
