# output · task-07 可选组件（hand-off）

## 产出

无新增文件（环境盘点类 task）。

## 完成功能

可选组件现状确认：Playwright 1.63.0 ✅ / OpenScreen ✅（WindowsApps 别名）/
Hyperframes ⏳（未装，按需装 0.9.11）。

## 要点（交接）

1. **主线不依赖三者**：渲染式出片只要 task-04/05/06；这三个都是增量能力。
2. **Hyperframes 接入时**：`npm install -g hyperframes@0.9.11`（旧域实测版本）；
   确定性约束（禁 Math.random/无限 repeat）会约束动画写法。
3. **OpenScreen 使用纪律**：只做存在性探测；录制需真实桌面会话；文字注解别依赖
   （导出黑块坑），文字层统一 ffmpeg drawtext。
4. **Playwright**：hot 录屏式锁屏可用，是"真实点击"场景的兜底通道。
