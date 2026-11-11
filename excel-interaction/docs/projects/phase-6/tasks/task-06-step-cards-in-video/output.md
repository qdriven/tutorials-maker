# phase-6 · task-06 · output（产出交接）

## 什么功能完成了

**分步讲解迁入讲解视频 + 展示层去分步 + 视频有声**（用户 task-18 反馈闭环）——
视频成为自带分步讲解的完整教程（每步一张卡：步码/公式/参数/预期），展示页不再重复列步骤；
页面播放有声。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/render-video.mjs` | `buildStepCards` 步骤卡烧入（默认开，`--no-ass` 关） |
| `src/standalone/showcase.js` | 五节文章（去分步讲解）+ 视频有声自动播（playing 解除静音） |
| `docs/projects/phase-6/tasks/task-06-step-cards-in-video/shots/card-step2.png` | 步骤卡入片取证帧 |

## 要点（hand-off 给下游）

1. **步骤卡数据单源**：`plan.steps`（步码/单元格/菜单/公式/预期）+ 契约 `formulaArgs`
   （参数逐位，只挂首个公式步）——改契约即改卡，无第二份文案。
2. **卡不占时长**：随动作段常驻（口播窗内），视频仍 <30s；`--no-ass` 可出无卡版本。
3. **ASS 两坑已踩平**：盒色实现不一（字奶油/盒双墨位兼容）；Windows 盘符冒号——
   合成走 `cwd=workDir` 相对 `ass=subs.ass`。
4. **有声自动播模式**：`autoplay muted` 起播 + `playing` 事件 `muted=false`——
   静音只为过 autoplay 策略，别忘了解除（否则「视频没有声音」）。
5. 展示文章固定五节：概览 → 动画演示 → 动手练习 → 总结 → 如何构建（收尾）。

## 下游接线

- 新课出片自动带步骤卡（契约 formulaArgs 驱动），展示页自动少一节；
- 取证驱动 `phase-7/tasks/task-02-showcase-sidebar/drive-02.py` 已更新为五节 + 有声检查点；
- 卡样式如需调（位置/字号/配色）只动 buildStepCards 的 Style 行。
