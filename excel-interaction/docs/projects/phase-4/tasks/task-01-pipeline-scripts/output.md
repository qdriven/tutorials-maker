# task-01 · output（产出交接）

## 什么功能完成了

**流水线三脚本建成并跑通**：`scripts/tutorial/new.mjs`（生成器：契约+模板→apps/<id>/）、
`scripts/tutorial/check-manifest.mjs`（清单校验，exit 0/1）、`scripts/serve/serve.mjs`
（零依赖静态服务）；package.json 挂 `generate` / `verify:manifest` / `serve` / `verify` 链。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/tutorial/new.mjs` | 生成器：复制模板三件 + engine.js + vendored 依赖 + 契约副本；`--force` 覆盖 |
| `scripts/tutorial/check-manifest.mjs` | 契约校验：四要素/枚举/seed/公式单源，坏契约逐问题指出 |
| `scripts/serve/serve.mjs` | 静态服务（--dir/--port），路径穿越防护 |
| `package.json` | generate / verify:manifest / serve / verify（env+manifest 链） |

## 要点（hand-off 给下游）

1. **vendored 依赖清单在 new.mjs 的 `VENDOR` 表**（handsontable 18.1.2 + hyperformula 3.5.0，
   devDeps 锁版本）；v18 包布局注意：CSS 在 `styles/`（无 full.min.css、无 sourcemap）。
2. **生成物不手改**：模板修复后必须重跑 `new.mjs --force`（本次两处 bug 修复即此流程）。
3. **check-manifest 是 verify:manifest 命令**——新契约入库即跑（courses/README 登记表可对照）。
4. **Windows 端口清理坑**：bash `kill $SRV` 不一定杀掉 node——残留服务会 EADDRINUSE，
   用 `netstat -ano | grep :<port>` + `taskkill //PID` 收尾（本次实测两次踩中）。
5. 文档构建（scripts/docs/）按合并里程碑口径推迟到 phase-7 展示层统一做。

## 下游接线

- task-02：模板实现是 new.mjs 的复制源。
- task-03：`generate` + `serve` + drive.py 浏览器验收。
