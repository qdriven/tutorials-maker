# phase-7 · task-03 · output（产出交接）

## 什么功能完成了

**「如何构建」撤下教程页**（用户 task-19 反馈闭环）——教程页只放教程：四节定稿
概览 → 动画演示 → 动手练习 → 总结；构建命令只留 README.md / docs。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `src/standalone/showcase.js` | 删 build 节与 buildHTML；四节定稿 |
| `src/standalone/showcase.css` | 死样式清理（.build-* / .step/.arg 等） |

## 要点（hand-off 给下游）

1. **口径反转留档**：task-17 曾定「如何构建放最后一节」，task-19 用户改为
   「构建内容不进教程/视频页面」——教程页 = 纯教学内容（概览/动画/练习/总结），
   构建/开发文档一律 README、docs。
2. 后续勿再往教程页加命令块/开发者入口；sidebar 的「参考文档」两条链接保留
   （用户未点名；如要去除一句话的事）。

## 下游接线

- 取证驱动 `../task-02-showcase-sidebar/drive-02.py` 检查点已固化四节口径；
- 新课文章自动按四节渲染。
