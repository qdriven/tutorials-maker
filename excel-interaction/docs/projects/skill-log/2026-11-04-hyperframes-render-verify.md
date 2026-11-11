---
date: 2026-11-04
skill: hyperframes
kind: verify
status: partial
---

# Hyperframes 渲染现有 HTML 动画：零改造可行性验证

## 目标

验证 Hyperframes（HTML→视频）能否把仓库里现成的 `showcase/animation/index.html` 交互动画**零改造**渲染成视频，评估它作为第四渲染引擎的价值。

## 做法

```bash
mkdir workspace/hf-demo && cd workspace/hf-demo
npx hyperframes@0.9.11 init        # 空白模板探针：300 帧出片基线
npx hyperframes@0.9.11 render      # 10s / 1920x1080 / 300 帧
```

真实动画接入：复制 `showcase/animation/index.html` 到试点项目，只注入 4 个
`data-composition-*` / `data-start` / `data-duration` 属性 + `window.__timelines`
契约，不改动画代码本身（确定性规则：禁 Math.random / 无限 repeat，与本仓动效规则一致）。

## 结果

| 项 | 实测 |
| --- | --- |
| 空白模板 300 帧 / 10s | 18.8s 出片 |
| 真实动画 HTML | 渲染成功，262KB mp4（10s / 1920×1080），抽帧核对中文与布局正常 |
| 改造成本 | 仅 4 个 data 属性，动画代码零改动 |

产物：`workspace/hf-demo/renders/hf-demo_2026-11-04_19-02-06.mp4`（gitignore，不入库）。

## 结论与坑

- **结论**：已有 HTML 动画资产上视频的最短路径，适合作渲染引擎之一；但**动手教程（交互练习+验收）它不管**，需与 excel-desktop-recorder 组合。
- **差距**（接入主线要补三步）：① 交互页需自动播放脚本；② `window.__timelines` 要可 seek；③ 时长与配音需外接（本仓 TTS provider 可复用）。
- **坑**：composition 契约是硬性的，缺属性直接不渲染；确定性约束会拒绝 `setInterval`/无限 repeat 的页面。

## 关联

- 调研结论：`../motion/05-research/remotion-hyperframes-top10.md`
- 选型分析：`../skill-fit-analysis.md`（B 类 HTML→视频，★★☆）
