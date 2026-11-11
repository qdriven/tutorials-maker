# task-06 · 语音合成：edge-tts 首选 / sapi 离线兜底

## 做什么

确认无废话讲解视频的配音通道就绪：**edge-tts**（神经语音，首选）与
**Windows sapi**（离线兜底）双 provider。

## 功能定义

- edge-tts：`python -m edge_tts` 可合成中文语音（pip 模块已装）。
- sapi：Windows 系统 System.Speech 通道可用（PowerShell 调用，含中文音色）。

## 验证点

1. `python -m edge_tts --version` 输出版本行，check.mjs 判 PASS。
2. sapi 中文音色存在：PowerShell 枚举已装语音，含 Microsoft Huihui Desktop（或同级中文音色）。

## 前置与依赖

- task-03（Python 3，edge-tts 的载体）。

## 范围外

- TTS 排期/混音管线（出片阶段的 provider 抽象，phase-6）；
- 其他语音云服务 provider。
