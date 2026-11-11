# task-03 · Python 3（驱动脚本运行时）

## 做什么

确认 Python 3 就绪——后续驱动脚本（表格引擎自动化）与 pip 模块
（edge-tts、playwright）的运行时。

## 功能定义

- Python 3.x 解释器可执行（win: `python`/`py`，posix: `python3`）。
- pip 模块安装通道可用（`python -m pip install --user`）。

## 验证点

1. `python --version`（或 `python3 --version`）输出 3.x，check.mjs 判 PASS。
2. `python -m pip --version` 可执行（模块安装通道）。

## 前置与依赖

- 无。

## 范围外

- 具体 Python 版本锁定；虚拟环境方案（先用 `--user` 级安装，phase-2 若需隔离再议）。
