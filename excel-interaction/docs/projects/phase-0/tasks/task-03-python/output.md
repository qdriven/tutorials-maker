# output · task-03 Python 3（hand-off）

## 产出

无新增文件（环境确认类 task）。

## 完成功能

Python 3.14.7 + pip 模块通道就绪，后续驱动脚本与 pip 工具（edge-tts/playwright）可安装运行。

## 要点（交接）

1. **win 命令名**：本机 `python` 与 `python3` 都指向 3.14.7；脚本探测已兼容两种命名。
2. **模块级安装**用 `python -m pip install --user`（不引入 venv 依赖）；如后续需锁定
   依赖再引入 requirements.txt（phase-2 议）。
3. **uno 桥注意**：LibreOffice 的 UNO 绑定若用系统 Python，后续驱动脚本可能需要
   `pyoo`/UNO 路径注入——届时单独 task 处理（phase-2/4）。
