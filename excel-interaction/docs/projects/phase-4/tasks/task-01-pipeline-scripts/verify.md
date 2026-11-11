# task-01 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

## 验证点 1 · check-manifest 正/坏契约

- **命令**：`node scripts/tutorial/check-manifest.mjs`（好契约）；构造 `courses/_bad_tmp.json`
  （id 不符/非法 engine/theme/缺字段/guide 1 步四要素全缺/checks 空）后重跑
- **实际输出**（坏契约场景）：
  ```
  ✗ _bad_tmp.json
      - id 与文件名不一致（id=bad）
      - 缺字段 title / level / seed / data
      - engine 非法：excel
      - theme 非法：rainbow
      - guide 应 4 步，实为 1
      - guide[0] 缺 cell / menu / formula / expect
      - checks 为空
  ✓ vlookup-basic.json
  ----
  2 份契约，1 通过 / 1 失败
  bad EXIT=1
  ```
  好契约单独跑：`✓ vlookup-basic.json … 1 份契约，1 通过 / 0 失败，good EXIT=0`
- **结论**：**PASS**（好契约 exit 0；坏契约 exit 1 且逐问题指出，12 条问题全命中）

## 验证点 2 · new.mjs 生成目录形态

- **命令**：`node scripts/tutorial/new.mjs --id vlookup-basic --config courses/vlookup-basic.json --force` + `find apps/vlookup-basic -type f`
- **实际输出**：
  ```
  ✓ apps/vlookup-basic/ 已生成（引擎 handsontable · 主题 kimi · vendor 4 件）
  apps/vlookup-basic/course.config.json
  apps/vlookup-basic/handsontable/engine.js
  apps/vlookup-basic/handsontable/vendor/{handsontable.full.min.js,handsontable.min.css,ht-theme-main.min.css,hyperformula.full.min.js}
  apps/vlookup-basic/{index.html,lesson.js,theme.css}
  ```
- **结论**：**PASS**（9 文件与模板契约「生成后目录形态」一一对应）。
  附：首轮曾按旧版包布局找 `handsontable.full.min.js.map` 报缺失（v18 无 sourcemap），
  已从 vendor 清单移除后通过。

## 验证点 3 · serve.mjs 静态服务

- **命令**：起 `serve.mjs --dir apps --port 4199`，curl 三类资源 + 越权路径
- **实际输出**：
  ```
  index.html: 200
  course.config.json: 200
  vendor js: 200
  越权 ../package.json: 404
  ```
- **结论**：**PASS**（资源可达；路径穿越被挡）

## 总结

3/3 PASS。
