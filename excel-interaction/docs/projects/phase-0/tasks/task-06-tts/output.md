# output · task-06 语音合成（hand-off）

## 产出

无新增文件（环境确认类 task）。

## 完成功能

TTS 双 provider 通道就绪：edge-tts 7.3.1（zh 神经语音）+ Windows sapi（Huihui 中文，离线兜底）。

## 要点（交接）

1. **provider 选择**：edge 首选（音质），sapi 兜底（离线/无网）；出片管线按 provider
   抽象接入（phase-6）。
2. **sapi 调用式**：PowerShell + System.Speech；中文默认 Huihui。bash 里传 PowerShell
   脚本块时注意 `$_` 会被 bash 展开——整段用单引号包。
3. **edge-tts 依赖**：网络可达（微软端点）；无网环境自动降级到 sapi。
