# verify · task-06 语音合成

> 执行环境：Windows 11，2026-11-08。

### 1. edge-tts 版本可读、check 判 PASS

- 命令：`python -m edge_tts --version`
- 实际输出：`edge-tts 7.3.1`；check.mjs `[PASS] edge-tts（可选） python -m edge_tts · edge-tts 7.3.1`
- 结论：**PASS**

### 2. sapi 中文音色存在

- 命令：
  ```powershell
  powershell -NoProfile -Command 'Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name }'
  ```
- 实际输出：
  ```
  Microsoft Huihui Desktop
  Microsoft Zira Desktop
  ```
- 结论：**PASS**（含中文音色 Huihui）

## 总结

2/2 PASS。双 provider 就绪：edge-tts 7.3.1（神经语音）+ sapi（Huihui 中文，离线）。
备注：sapi 是平台内置组件，无需安装（验证点 2 即完成判据）；edge-tts 走 pip。
