# output · task-03 产物规则与 git 归属（hand-off）

## 产出

| 文件 | 内容 |
| --- | --- |
| `.gitignore` | 产物规则一条：`out/*` + `!out/README.md` 例外 |

## 完成功能

媒体产物（视频/配音/帧/录制计划）不入库、说明文件保留；git 归属确认随外层仓库
统一管理（`!domains/excel-interaction` 例外已生效，新文件对 git 可见）。

## 要点（交接）

1. **产物去向**：`out/` 只是中转（不入库）；需要留存的成片复制进展示层
   `src/.../public/` 并登记清单（phase-7）。
2. **build-checklist 适配**：「git init 首提交」在本仓 SKIP（外层统一管理）——
   后续 phase 凡遇「独立建仓/独立初始化」类步骤，都按此适配口径处理。
3. 新增产物类目录（如中间缓存）时，在本 .gitignore 追加，保持「一条规则管一类产物」。
