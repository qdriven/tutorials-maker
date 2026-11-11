# output · task-01 初始化脚本（hand-off）

## 产出

| 文件 | 内容 |
| --- | --- |
| `scripts/check.mjs` | 环境检查脚本（11 组件、人读/JSON 双输出、退出码语义） |
| `scripts/install.mjs` | 环境安装脚本（包管理器探测、dry-run 默认、best-effort 执行） |
| `scripts/README.md` | 用法文档（运行方式、参数、平台注意事项、坑位表） |

## 由什么功能完成

- 命令探测：`where`/`which` 解析真实路径 + 候选排序（.exe > .cmd/.bat > 跳过 sh 垫片），
  `.cmd` 经 shell 执行（绕开 CVE-2024-27980 限制）；退出码纳入判定。
- 平台适配：包管理器探测矩阵（winget/choco/scoop、brew、apt/dnf/pacman）；
  Python 解释器探测（win: python/py，posix: python3/python）；引擎已知路径兜底
  （LibreOffice/Excel/WPS 常见安装位置）。
- 安全边界：install.mjs 默认 dry-run，`--apply` 显式授权外部副作用；GUI 工具
  （OpenScreen）只做存在性探针，永不启动。

## 要点（交接给后续 task / phase）

1. **环境自检入口**：任何 phase 开工前跑 `node scripts/check.mjs`，exit 0 才继续；
   CI 可用 `--json` 消费。
2. **新组件接入**：往 check.mjs 的 `COMPONENTS` 数组与 install.mjs 的 `PM_CMD`/`LABEL`
   各加一条即可，两个清单要同步。
3. **勿改探针语义**：GUI 工具只能用 probeExists；probeSpawn 的退出码判定不能去掉
   （去掉会重现 Hyperframes 假阳性）。
4. **Windows 排查口诀**：命令找不到先 `where <cmd>` 看返回行——`.cmd` 要 shell、
   无扩展名 sh 垫片不可直启、商店别名 existsSync 无效。
