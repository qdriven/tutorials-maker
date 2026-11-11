# onlyoffice 模板

**定位**：功能全档——FILTER / XLOOKUP / 原生透视 / 图表类教程的**唯一**选择（onlyoffice-only
场景见 engine-matrix）。

## 能力边界（= engine-matrix）

- ✅ 全部矩阵能力：动态数组、FILTER/XLOOKUP、数据透视、图表、多表
- 代价：**依赖重**（需 ONLYOFFICE Document Server）、启动慢——非必要不选。

## 依赖形态（docserver 方案，修正自"npm SDK 打包"旧设想）

- **编辑器由 ONLYOFFICE Document Server 服务**：页面动态加载
  `http://localhost:8080/web-apps/apps/api/documents/api.js`（可用 `window.OO_DOC_SERVER` 覆盖），
  前端自身零 npm 依赖、无打包产物。
- 本地起服务（二选一）：

  ```
  docker run -d --name onlyoffice-ds -p 8080:80 \
    -e JWT_ENABLED=false -e ALLOW_PRIVATE_IP_ADDRESS=true onlyoffice/documentserver
  # 或 docker compose（旧域 apps/onlyoffice-excel/docker-compose.yml 同款）
  ```

  JWT 仅限本地教程；生产必须开。

## 生成后形态

```
apps/<id>/onlyoffice/
  plugin/          # 教学驱动插件（config.json / index.html / plugin.js / icon.png，模板自带）
  docs/blank.xlsx  # 空文档（seed 铺契约数据；docserver 从本机静态服务下载）
  engine.js        # 接线：同 handsontable 四 API（+ 透视/图表扩展点位）
```

## 引擎接线点（同一最小 API + 扩展）

| API | 语义 |
| --- | --- |
| `mount(el, sheets)` | DocsAPI.DocEditor + 插件自启 + seed 铺样例数据 |
| `setFormula(addr, formula)` | 真写公式（FILTER/XLOOKUP 真算，值由 docserver 计算） |
| `readValue(addr)` | 回读引擎计算结果（值缓存，异步回填） |
| `focusCell(addr)` | 聚焦/选中 |
| `renderPivot(spec)` / `renderChart(spec)` | 扩展位：透视/图表（契约 guide 有需求时启用） |

桥协议：宿主 ⇄ 插件 `postMessage`（`oo-host`/`oo-tutorial`）→ `Asc.plugin.callCommand`
（动作层：ping/seed/setValue/setFormula/getValue/getFormula/focus）。

## 验证状态（docserver 实测通过，2026-11-10）

- ✅ 桥骨架（postMessage + callCommand + 插件自启）沿用旧域 `apps/onlyoffice-excel`
  已跑通的实现（4 个演示课实拍）。
- ✅ **四 API 动作层 docserver 端到端实测通过**：`scripts/recorder/drive-oo.py` **8/8**
  （连跑两轮）——seed 铺数 → setFormula 真算（SUM=3600）→ getValue 回读 → getFormula
  编辑栏 → focus → 练习态 500ms 轮询验收（外部文档改动检出 → 缓存刷新 → 验收通过）→
  console 零错误。前提：`docker run -d --name onlyoffice-ds -p 8080:80 -e JWT_ENABLED=false
  -e ALLOW_PRIVATE_IP_ADDRESS=true onlyoffice/documentserver` + 静态服务 4173。
- 实测钉死的边界（改模板均已回写）：
  1. **callCommand 并发争用**：连发 6 条只执行 1 条（diag-burst 探针 1/6）——engine `send()`
     必须**串行队列**，否则轮询 Promise.all 永不 settle；
  2. 插件 ready 晚于 document ready（seed 抢跑失败）——send 内 15s 等就绪；
  3. Docker 内 `localhost`=容器自身（"下载失败"）——`document.url` 走
     `?fileOrigin=http://host.docker.internal:4173`；`pluginsData` 由浏览器抓、必须走页
     origin（Chromium 私网 IP 走系统代理会 ERR_EMPTY_RESPONSE）；
  4. 编辑器 iframe（8080）跨域取插件 config——静态服务须回 `Access-Control-Allow-Origin: *`；
  5. blank.xlsx 预置 4 张演示表名与契约不符——seed 按**索引改名复用**（`ws.Name` 可写），
     超出预置数才 `Api.AddSheet`（`InsertSheet`/`SetName` 不存在，探针实证）；
  6. `reset()` 销毁重建编辑器+插件——外部驱动必须等**新** ready（`__pwCount` 计数）再发命令；
  7. 插件 i18n 404——`plugin/translations/langs.json`（JSON 数组）+ `zh-CN.json` 必备；
  8. `unmount` 清 formulaCache 后轮询只刷值——`startPoll` 须**双读** getValue+getFormula。
- `onChange` 无单元格事件可用（Docs API 边界）：练习态用 500ms 值差+公式差轮询（已实测）；
  出片不依赖。
- `onSelection` 同边界：接口位保留、不回抛（公式栏联动在本引擎暂缺）。
- FILTER/XLOOKUP 等 onlyoffice-only 函数**只允许**出现在本模板的课程里；
  写契约阶段若发现教程需要它们，引擎字段必须直接定 `onlyoffice`。

**启用 checklist**：① 起 docserver（端口 8080，见上）② `node scripts/serve/serve.mjs` 起静态
服务（自带 CORS）③ 生成/打开 `apps/<id>/index.html`（Docker 场景加 `?fileOrigin=`）④ 跑
`python scripts/recorder/drive-oo.py` 四 API 验收（测试课 oo-test）。
