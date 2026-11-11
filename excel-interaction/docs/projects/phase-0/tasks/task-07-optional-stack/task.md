# task-07 · 可选组件：Playwright / Hyperframes / OpenScreen

## 做什么

盘点三个**可选**组件的现状（不阻塞主线）：Playwright（浏览器录屏式）、
Hyperframes（HTML→视频）、OpenScreen（真实鼠标录制）。

## 功能定义

- Playwright：hot 浏览器录屏式（锁屏可录）。
- Hyperframes：HTML 动画零改造上视频（第四渲染引擎）。
- OpenScreen：WGC 抓窗录制 + JSON 后期（真实鼠标轨迹）。

## 验证点

1. Playwright 探测（`python -m playwright --version`）出版本或明确缺失。
2. Hyperframes 探测出版本或明确缺失（可选，允许 WARN）。
3. OpenScreen 存在性探测成功（禁用 `--version` 探针——GUI 挂起坑）。

## 前置与依赖

- task-03（Playwright 的载体）。

## 范围外

- 三个组件的实际接入（phase-2/6 按需另立 task）。
